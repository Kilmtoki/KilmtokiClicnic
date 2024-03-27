

import os
from Model_speech_to_text import pipe
import librosa
directory = r'C:\Users\66968\Desktop\AI\APP\src\Model\Audio'

# หาไฟล์ทั้งหมดในไดเรกทอรี
files = os.listdir(directory)

# เรียงลำดับไฟล์ตามเวลาแก้ไขล่าสุด
files.sort(key=lambda x: os.path.getmtime(os.path.join(directory, x)), reverse=True)

# เลือกไฟล์ที่เพิ่มมาล่าสุด
latest_file = files[0]

print("ไฟล์ที่เพิ่มมาล่าสุด:", latest_file)


# Load your own audio file
path = rf'C:\Users\66968\Desktop\AI\APP\src\Model\Audio\{latest_file}'

# Load the audio and its sampling rate
audio_array, sampling_rate = librosa.load(path, sr=16000, mono=True)

# Transcribe the audio
result = pipe({"raw": audio_array, "sampling_rate": sampling_rate})

# Print the transcribed text
print("Transcribed text:", result["text"])

print(audio_array.dtype)