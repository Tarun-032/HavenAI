from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import subprocess
import os
import uuid
import logging
import whisper 

from gtts import gTTS  # gTTS for text-to-speech

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

# Function to transcribe audio using Whisper
def transcribe_audio(audio_file):
    model = whisper.load_model("base")  # Load the Whisper model
    result = model.transcribe(audio_file)
    return result['text']

# Function to convert text to speech using gTTS
def text_to_speech(text, output_filename):
    tts = gTTS(text=text, lang='en')
    tts.save(output_filename)

@app.post("/run-model")
async def run_model(file: UploadFile = File(...)):
    input_filename = f"input_{uuid.uuid4()}.wav"
    output_filename = f"output_{uuid.uuid4()}.wav"

    try:
        # Save the uploaded audio file
        with open(input_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"Saved input file: {input_filename}")

        # Step 1: Transcribe audio using Whisper
        logger.info("Transcribing audio")
        transcribed_text = transcribe_audio(input_filename)
        logger.info(f"Transcribed text: {transcribed_text}")

        # Step 2: Run the Ollama model with the transcribed text
        logger.info("Running Ollama model")
        result = subprocess.run(
            ["ollama", "run", "HavenAI", f"Respond to this text: {transcribed_text}"],
            capture_output=True,
            text=True,
            check=True
        )
        response_text = result.stdout.strip()
        logger.info(f"Ollama model response: {response_text}")

        # Step 3: Convert the response text to audio using gTTS
        logger.info("Converting response text to speech")
        text_to_speech(response_text, output_filename)
        logger.info(f"Created output file: {output_filename}")

        # Return the response text and the path to the output audio file
        return {
            "response_text": response_text,
            "audio_file": output_filename
        }
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running Ollama model: {e.stderr}")
        raise HTTPException(status_code=500, detail=f"Error running Ollama model: {e.stderr}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    finally:
        # Clean up input file
        if os.path.exists(input_filename):
            os.remove(input_filename)
            logger.info(f"Cleaned up input file: {input_filename}")

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    if not os.path.exists(filename):
        logger.error(f"Audio file not found: {filename}")
        raise HTTPException(status_code=404, detail="Audio file not found")
    return FileResponse(filename)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
