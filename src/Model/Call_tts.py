import requests
from Model_text_to_speech import processor, model
import torch
import base64
import numpy as np
import sounddevice as sd
import torchaudio
import os
import json
from pathlib import Path
# Function to convert audio to base64
def audio_to_base64(audio_tensor):
    # Convert audio tensor to numpy array
    audio_array = audio_tensor.numpy()
    # Convert numpy array to bytes
    audio_bytes = audio_array.tobytes()
    # Encode bytes to base64
    audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
    return audio_base64

# Function to save audio file
def save_audio_file(audio_array, filename):
    try:
        # Create path to save the audio file
        filepath = os.path.join(audio_folder, filename)
        print("Saving audio file to:", filepath)  # Debug statement
        # Save the audio file
        torchaudio.save(filepath, audio_array, sample_rate=16000)
    except Exception as e:
        print(f'Error saving audio file: {e}')

urlget = 'http://127.0.0.1:5001/question/get'  # URL for uploading
audio_folder = Path(r"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio\ques")

try:
    response = requests.get(urlget)
    if response.status_code == 200:
        data = response.json()  # Convert response to JSON format
        question_list = []  # Initialize list to store questions
        # Loop through questions in the data
        for item in data:
            question = {
                'question_key': item['QuestionsNo'],
                'question_text': item['Message'].encode('utf-8').decode('utf-8')  # Updated key here
            }
            question_list.append(question)  # Add question to list
        # Convert text to speech for each question and save the audio to a file
        for question in question_list:
            text = question['question_text'].encode('utf-8').decode('utf-8')
            # Generate audio from text using the model
            text_inputs = processor(text=text, src_lang="tha", return_tensors="pt")
            audio_tensor = model.generate(**text_inputs, tgt_lang="tha")[0]
            # Save the audio to a WAV file
            save_audio_file(audio_tensor, f"question_{question['question_key']}.wav")
    else:
        print(f'Error: {response.status_code}')
except Exception as e:
    print(f'Error: {e}')
