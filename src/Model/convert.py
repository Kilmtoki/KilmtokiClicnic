# from pydub import AudioSegment

# def convert_m4a_to_wav(m4a_file, wav_file):
#     # Load the M4A file
#     audio = AudioSegment.from_file(m4a_file, format="webm")

#     # Export the audio to WAV format
#     audio.export(wav_file, format="wav")

# # Example usage
# m4a_file = r"Audio\เสียง2.m4a"
# wav_file = r"Audio\เสียง2.m4a.wav"
# convert_m4a_to_wav(m4a_file, wav_file)

# import ffmpeg

# # Input and output file paths
# input_file = 'recorded_audio (3).webm'
# output_file = 'recorded_audio (3).wav'

# # Full path to the FFmpeg executable
# ffmpeg_exe = r'C:\path\to\ffmpeg.exe'

# # Convert WebM to WAV
# ffmpeg.input(input_file).output(output_file, acodec='pcm_s16le').run(ffmpeg_path=ffmpeg_exe)

import os

directory = r'C:\Users\66968\Desktop\AI\APP\src\Model\Audio'

# หาไฟล์ทั้งหมดในไดเรกทอรี
files = os.listdir(directory)

# เรียงลำดับไฟล์ตามเวลาแก้ไขล่าสุด
files.sort(key=lambda x: os.path.getmtime(os.path.join(directory, x)), reverse=True)

# เลือกไฟล์ที่เพิ่มมาล่าสุด
latest_file = files[0]

print("ไฟล์ที่เพิ่มมาล่าสุด:", latest_file)






