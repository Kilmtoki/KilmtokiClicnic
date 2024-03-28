# Server side (Flask application)
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from Model_speech_to_text import pipe
import librosa
import os
from pathlib import Path
import requests
app = Flask(__name__)
CORS(app)

# Initial data
data = {
    "PID": "",
    "answer": {
        "ans1": None,
        "ans2": None,
        "ans3": None,
        "ans4": None,
        "ans5": None,
        "ans6": None,
        "ans7": None,
        "ans8": None
    },
    "audio": {
        "audio1": None,
        "audio2": None,
        "audio3": None,
        "audio4": None,
        "audio5": None,
        "audio6": None,
        "audio7": None,
        "audio8": None
    },
    "question": {
        "1": {
            "text": "ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?",
            "audio": None
        },
        "2": {
            "text": "เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?",
            "audio": None
        },
        "3": {
            "text": "ได้ทานยาอะไรมาบ้างคะ?",
            "audio": None
        },
        "4": {
            "text": "มีอาการแพ้ยาอะไรบ้าง?",
            "audio": None
        },
        "5": {
            "text": "มีกิจกรรมการออกกำลังกายอยู่ไหมคะ?",
            "audio": None
        },
        "6": {
            "text": "มีอาการอื่นๆ ร่วมด้วยหรือไม่?",
            "audio": None
        },
        "7": {
            "text": "มีอาการรุนแรงหรือส่งผลต่อชีวิตประจำวันหรือไม่?",
            "audio": None
        },
        "8": {
            "text": "เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?",
            "audio": None
        },
    },
    "datetime": ""
}

@app.route('/')
def hello():
    return "Hello world"

@app.route('/data')
def get_data():
    return jsonify(data)

@app.route('/audio', methods=['GET'])
def get_audio():
    key = request.args.get('key')
    if key in data["audio"]:
        return jsonify(data["audio"][key])
    else:
        return jsonify({ "error": "Invalid key" })

@app.route('/answer', methods=['POST'])
def receive_answer():
    req_data = request.get_json()
    if req_data and len(req_data) == 1:
        key = list(req_data.keys())[0]
        if key in data["answer"]:
            data["answer"][key] = req_data[key]
            payload = {'AnswerNo': key, 'Message': req_data[key]}
            print(payload)
            try:
                # Send POST request to the other server
                response = requests.post("http://127.0.0.1:5001/answer", json=payload)
                response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
                return jsonify({"message": "Answer received successfully"})
            except requests.RequestException as e:
                return jsonify({"error": str(e)}), 500
        else:
            return jsonify({"error": "Invalid key"})
    else:
        return jsonify({"error": "Invalid data format"})

@app.route('/PID', methods=['POST'])
def receive_pid():
    req_data = request.get_json()
    if req_data and "PID" in req_data:
        data["PID"] = req_data["PID"]
        return jsonify({ "message": "PID received successfully" })
    else:
        return jsonify({ "error": "Invalid data format or missing PID" })


@app.route('/transcription', methods=['GET'])
def get_transcripttion():
    key = request.args.get('key')
    if key in data["answer"]:
        directory = Path(r"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio")
        # หาไฟล์ทั้งหมดในไดเรกทอรี
        files = os.listdir(directory)
        # เรียงลำดับไฟล์ตามเวลาแก้ไขล่าสุด
        files.sort(key=lambda x: os.path.getmtime(os.path.join(directory, x)), reverse=True)
        # เลือกไฟล์ที่เพิ่มมาล่าสุด
        latest_file = files[0]
        print("ไฟล์ที่เพิ่มมาล่าสุด:", latest_file)
        # Load your own audio file
        path =rf"C:\Users\USER\OneDrive\เดสก์ท็อป\SmartClinic\WEBAI-main\src\Model\Audio\{latest_file}"
        # Load the audio and its sampling rate
        audio_array, sampling_rate = librosa.load(path, sr=16000, mono=True)
        # Transcribe the audio
        result = pipe({"raw": audio_array, "sampling_rate": sampling_rate})
        # Print the transcribed text
        Transcribed_text = result["text"]
        data["answer"][key] = Transcribed_text
        payload = {'AnswerNo': key, 'Message': Transcribed_text}
        # Send POST request to the other server
        response = requests.post("http://127.0.0.1:5001/answer", json=payload)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return jsonify(Transcribed_text)
    else:
        return jsonify({ "error": "Invalid key" })
    
@app.route('/audioques', methods=['POST'])
def post_audioques():
    try:
        # Get base64 audio data and key from JSON payload
        audio_base64 = request.json.get('audioBase64')
        key = request.json.get('key')

        # Check if audio data and key exist
        if not audio_base64:
            return jsonify({ "error": "No audio data sent" }), 400
        if key not in data["question"]:
            return jsonify({ "error": "Invalid key" }), 400

        # Update data with audio data for the specified key
        data["question"][key]['audio'] = audio_base64

        # Return success message
        return jsonify({ "message": "Audio received and saved successfully" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@app.route('/senddata', methods=['POST'])
def senddata():
    data = request.getjson()  # Assume the data is in JSON format
    # Send data to server2
    url = 'http://127.0.0.1:5001/receive_data'
    response = requests.post(url, json=data)
    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)
