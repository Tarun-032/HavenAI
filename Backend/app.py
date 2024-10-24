from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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
