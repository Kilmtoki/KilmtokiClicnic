import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AiFillSound } from "react-icons/ai";
import './Page.css';
import { downloadWav } from 'webm-to-wav-converter';
import axios from 'axios';

function Page5() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const mediaStream = useRef(null);
    const audioChunks = useRef([]);
    const [texttranscription, setTextTranscription] = useState('');
    const [audioURL, setAudioURL] = useState(null);

    const startRecording = async () => {
        setIsRecording(true);
        const constraints = { audio: true, video: false };

        try {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaStream.current = stream;
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };

            recorder.onstop = () => {
                const combinedBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                downloadWav(combinedBlob, false);
                audioChunks.current = []; // Clear audioChunks after downloading
            };

            setMediaRecorder(recorder);
            recorder.start();
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaStream.current.getTracks().forEach(track => track.stop());
        }
        try {
            const key = 'ans3';
            const response = await axios.get(`http://127.0.0.1:5000/transcription?key=${key}`);
            const data = response.data;
            console.log(data);
            setTextTranscription(data);
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
    };

    const playAudio = async () => {
        if (!audioURL) {
            await handleFetchAudio();
        }
        if (audioURL) {
            const audio = new Audio(audioURL);
            audio.volume = 0.35; // กำหนดระดับเสียงเป็น 80%
            audio.play();
        }
    };

    const base64ToBlob = (base64, contentType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const handleFetchAudio = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/data');
            const audioData = response.data.question[3].audio;
            console.log(audioData);
            // Create a Blob object from the base64 string
            const blob = base64ToBlob(audioData, 'audio/wav');

            // Create a URL for the Blob object
            const audioURL = URL.createObjectURL(blob);

            // Set the audio URL to state
            setAudioURL(audioURL);
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
    };

    return (
        <div>
            <header>
                     ได้ทานยาอะไรมาบ้างคะ?
                    <span className="button-gap"></span>
                    <span className="button-gap"></span>
                    <button onClick={playAudio}><AiFillSound  /></button>
            </header>
            <div className="input-container">
                <input
                    type="text"
                    value={texttranscription}
                    onChange={(e) => setTextTranscription(e.target.value)}
                />
            </div>
            <div className="button-container">
                <div>
                    <FontAwesomeIcon
                        icon={isRecording ? faStopCircle : faMicrophone}
                        style={{ cursor: 'pointer' }}
                        size="6x"
                        onClick={isRecording ? stopRecording : startRecording}
                    />
                </div>
                <span className="button-gap"></span>
                <span className="button-gap"></span>
                <Link to="/choosepage5">
                    <button>เลือกคำตอบ</button>
                </Link>
                <span className="button-gap"></span>
                <span className="button-gap"></span>
                <Link to="/page6">
                    <button>ถัดไป</button>
                </Link>
                <span className="button-gap"></span>
            </div>
        </div>
    );
}

export default Page5;

