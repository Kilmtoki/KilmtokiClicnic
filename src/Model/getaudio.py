import requests
from pydub import AudioSegment
from pydub.playback import play
import base64
import os
import io
import base64
import numpy as np
import librosa
urlget = 'http://127.0.0.1:5000/data'  # URL for uploading
audio_folder = ".\\src\\Model\\Audio"  # Path to the folder where audio files will be saved

try:
    response = requests.get(urlget)
    if response.status_code == 200:
        data = response.json()  # Convert response to JSON format
        
        # Loop through the audio data
        for key, value in data["audio"].items():
            # Decode base64 audio data
            audio_bytes = base64.b64decode(value)
            # Create file path
            filename = f"{key}.wav"
            filepath = os.path.join(audio_folder, filename)
            # Write audio data to WAV file
            with open(filepath, "wb") as file:
                file.write(audio_bytes)
            # print(f"Audio file '{filename}' saved successfully.")
            
            audio_array, sr = librosa.load(io.BytesIO(filepath), sr=None)    
            print(audio_array.shape)
    else:
        print(f'Error: {response.status_code}')
except Exception as e:
    print(f'Error: {e}')
