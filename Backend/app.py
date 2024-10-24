from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pymongo import MongoClient
from passlib.context import CryptContext
from pydantic import BaseModel
from jose import jwt
import shutil
import subprocess
import os
import uuid
import logging
import pyttsx3  # Text-to-speech

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "cde07be619784cf0fbb8753080360255ed403377e690fc7f03b0b7ed38d0f5aa"

# MongoDB connection
client = MongoClient("mongodb+srv://Sanika:Sanika1234@cluster0.a8enq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['mydatabase']
users_collection = db['users']

# Authentication Models
class User(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Helper functions for password and token handling
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")

# Signup route
@app.post("/signup")
async def signup(user: User):
    existing_user = users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
   
    hashed_password = get_password_hash(user.password)
    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    })
    return {"message": "User created successfully"}

# Login route
@app.post("/login")
async def login(user: UserLogin):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    if not verify_password(user.password, db_user['password']):
        raise HTTPException(status_code=400, detail="Invalid credentials")
   
    # Generate JWT token
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


def clean_response(text: str) -> str:
    """Clean the response text by removing console mode warnings."""
    if not text:
        return ""
    
    warnings = [
        "failed to get console mode for stdout: The handle is invalid.",
        "failed to get console mode for stderr: The handle is invalid.",
        "The handle is invalid."
    ]
    
    cleaned_text = text
    for warning in warnings:
        cleaned_text = cleaned_text.replace(warning, "")
    
    cleaned_text = " ".join(cleaned_text.split())
    return cleaned_text.strip()

@app.post("/run-model")
async def run_model(file: UploadFile = File(...)):
    input_filename = f"input_{uuid.uuid4()}.wav"
    output_filename = f"output_{uuid.uuid4()}.wav"

    try:
        # Save the uploaded audio file with an absolute path
        input_file_path = os.path.abspath(input_filename)
        with open(input_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"Saved input file: {input_file_path}")

        # Log the directory content to ensure file is present
        logger.info(f"Files in current directory: {os.listdir(os.getcwd())}")

        # Ensure the file exists before transcribing
        if not os.path.exists(input_file_path):
            logger.error(f"Input file not found: {input_file_path}")
            raise HTTPException(status_code=404, detail="Input file not found")

        # Transcribe the audio using Whisper
        logger.info("Transcribing audio")
        result = subprocess.run(
            ["whisper", input_file_path, "--language", "en"],
            capture_output=True,
            text=True,
            check=True
        )
        transcribed_text = result.stdout.strip()
        logger.info(f"Transcribed text: {transcribed_text}")

        # Run the LLM model (Ollama, etc.)
        logger.info("Running LLM model")
        model_result = subprocess.run(
            ["ollama", "run", "HavenAI", f"Respond to this text: {transcribed_text}"],
            capture_output=True,
            text=True,
            check=True
        )
        response_text = clean_response(model_result.stdout.strip())
        logger.info(f"Clean model response: {response_text}")

        # Convert clean response to speech using pyttsx3
        if response_text:
            logger.info("Converting clean response text to speech")
            engine = pyttsx3.init()
            engine.save_to_file(response_text, output_filename)
            engine.runAndWait()
            logger.info(f"Created output file: {output_filename}")

        return {
            "response_text": response_text,
            "audio_file": output_filename
        }
    except subprocess.CalledProcessError as e:
        error_message = clean_response(e.stderr)
        logger.error(f"Error running model: {error_message}")
        raise HTTPException(status_code=500, detail=f"Error running model: {error_message}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    finally:
        # Clean up input file
        if os.path.exists(input_file_path):
            os.remove(input_file_path)
            logger.info(f"Cleaned up input file: {input_file_path}")

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    if not os.path.exists(filename):
        logger.error(f"Audio file not found: {filename}")
        raise HTTPException(status_code=404, detail="Audio file not found")
    return FileResponse(filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
