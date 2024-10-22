import { useState } from "react";

export default function AudioRecorder({ fileReady }) {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const onMicrophoneClick = async () => {
        if (recording) {
            setRecording(false);
            if (mediaRecorder) {
                mediaRecorder.stop();
                setMediaRecorder(null);
            }
            return;
        }
        setRecording(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const newMediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            newMediaRecorder.addEventListener("dataavailable", (e) => {
                chunks.push(e.data);
            });

            newMediaRecorder.addEventListener("stop", (e) => {
                let audioBlob = new Blob(chunks, {
                    type: "audio/ogg; codecs=opus",
                });
                let audioFile = new File([audioBlob], "recorder_audio.ogg", {
                    type: "audio/ogg; codecs=opus",
                });

                const url = URL.createObjectURL(audioFile);
                fileReady(audioFile, url);
            });

            newMediaRecorder.start();
            setMediaRecorder(newMediaRecorder);
        } catch (e) {
            setRecording(false);
            console.error("Error accessing microphone: ", e);
        }
    };

    return (
        <button
            className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            onClick={onMicrophoneClick}
        >
            {recording && (
                <i className="ri-record-circle-fill text-2xl text-error"></i>
            )}
            {!recording && <i className="ri-mic-fill text-2xl"></i>}
        </button>
    );
}
