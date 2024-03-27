import React from 'react';
import axios from 'axios';

// นำเข้าฟังก์ชัน bufferToBase64 และ base64ToBuffer มาใช้งาน
const bufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

// const base64ToBuffer = (base64) => {
//     const binary = window.atob(base64);
//     const buffer = new ArrayBuffer(binary.length);
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < binary.length; i++) {
//         bytes[i] = binary.charCodeAt(i) & 0xFF;
//     }
//     return buffer;
// };

function Page13() {
    const handleTestAudioAPI = async () => {
        try {
            const file = await fetchAudioFile('./src/Model/Audio/audio2.wav');
            const base64Data = bufferToBase64(await convertToBuffer(file)); // แปลง Buffer เป็น Base64
            console.log(base64Data);
            const response = await axios.post('http://localhost:5000/wave', { audio8: base64Data }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API response:', response.data);
            // ทำอย่างอื่น ๆ หลังจากที่ได้รับข้อมูลจาก API
        } catch (error) {
            console.error('Error testing API:', error);
        }
    };

    const fetchAudioFile = async (filePath) => {
        const response = await fetch(filePath);
        const blob = await response.blob();
        return blob;
    };

    const convertToBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // ไม่ต้องตัดส่วนข้อมูล Base64 ออก
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file); // ใช้ readAsArrayBuffer เพื่อให้ได้ Buffer
        });
    };

    return (
        <div>
            <header>เทส api</header>
            <div className="button-container">
                <button onClick={handleTestAudioAPI}>ทดสอบ api</button>
            </div>
        </div>
    );
}

export default Page13;
