import os
from pathlib import Path
directory = Path(r"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio")
# หาไฟล์ทั้งหมดในไดเรกทอรี
files = os.listdir(directory)
# เรียงลำดับไฟล์ตามเวลาแก้ไขล่าสุด
files.sort(key=lambda x: os.path.getmtime(os.path.join(directory, x)), reverse=True)
# เลือกไฟล์ที่เพิ่มมาล่าสุด
latest_file = files[0]
print("ไฟล์ที่เพิ่มมาล่าสุด:", latest_file)
path = Path(rf"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio\ques\{latest_file}")
print("Path: ",path)