let audioChunks = [];
let mediaRecorder;
let stream;

const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const playRecordButton = document.getElementById('playRecord');

startRecordButton.addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    startRecordButton.disabled = true;
    stopRecordButton.disabled = false;
});

stopRecordButton.addEventListener('click', () => {
    mediaRecorder.stop();
    stream.getTracks().forEach(track => track.stop());

    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
    playRecordButton.disabled = false;
});

mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
};

mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);

    playRecordButton.addEventListener('click', () => {
        const audio = new Audio(audioUrl);
        audio.play();
    });
};
