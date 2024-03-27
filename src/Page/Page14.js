import React, { useState } from 'react';
import axios from 'axios';

function Page14() {
    const [audioURL, setAudioURL] = useState(null);

    const handleFetchAudio = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/data');
            const audioData = response.data.audio.audio1;
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

    function base64ToBlob(base64, contentType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }

    return (
        <div>
            <header>Get Audio from Base64</header>
            <div className="button-container">
                <button onClick={handleFetchAudio}>Fetch Audio</button>
            </div>
            {audioURL && (
                <div>
                    <audio controls>
                        <source src={audioURL} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default Page14;
