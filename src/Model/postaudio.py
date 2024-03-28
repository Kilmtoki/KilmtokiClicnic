import os
import requests
import base64
from pathlib import Path
# Specify the folder location where audio files are stored
audio_folder = Path(r"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio\ques")

# Loop through all files in the audio folder
for idx, filename in enumerate(os.listdir(audio_folder), start=1):
    if filename.endswith(".wav"):  # Check if the file extension is .wav
        file_path = os.path.join(audio_folder, filename)
        
        # Read the audio file data and encode it as base64
        with open(file_path, "rb") as audio_file:
            audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")

        # Use the file name (excluding extension) as the QuestionsNo
        key = os.path.splitext(filename)[0].split("_")[-1]

        try:
            # Prepare the payload
            payload = {'audioBase64': audio_base64, 'key': key}

            # ส่ง POST request ไปยังเซิร์ฟเวอร์
            response = requests.post("http://127.0.0.1:5000/audioques", json=payload)

            # ตรวจสอบสถานะการร้องขอ
            if response.status_code == 200:
                print(f'POST request for {filename} succeeded.')
            else:
                print(f'Error: {response.status_code} for {filename}')
        except Exception as e:
            print(f'Error: {e} for {filename}')
