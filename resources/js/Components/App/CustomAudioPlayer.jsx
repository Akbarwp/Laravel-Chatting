import { formatMediaPlayerTime } from "@/helper";
import { useRef, useState } from "react";

export default function CustomAudioPlayer({ file, showVolume = true }) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            setDuration(audio.duration);
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const volume = e.target.value;
        audioRef.current.volume = volume;
        setVolume(volume);
    };
    const handleTimeUpdate = (e) => {
        const audio = audioRef.current;
        setDuration(audio.duration);
        setCurrentTime(e.target.currentTime);
    };

    const handleLoadedMetadata = (e) => {
        setDuration(e.target.duration);
    };

    const handleSeekChange = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    return (
        <div className="flex w-full items-center gap-2 rounded-md bg-gray-300 px-3 py-2 dark:bg-gray-600">
            <audio
                ref={audioRef}
                src={file.url}
                controls
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="hidden"
            />
            <button onClick={togglePlayPause}>
                {isPlaying ? (
                    <i className="ri-pause-circle-line text-2xl text-gray-800 dark:text-gray-200"></i>
                ) : (
                    <i className="ri-play-circle-line text-2xl text-gray-800 dark:text-gray-200"></i>
                )}
            </button>
            {showVolume && (
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                />
            )}
            <input
                type="range"
                min={0}
                max={duration}
                step={0.01}
                value={currentTime}
                onChange={handleSeekChange}
                className="range range-xs flex-1 transition range-success"
            />
            <span className="text-xs text-gray-800 dark:text-gray-200">
                {formatMediaPlayerTime(currentTime)} / {formatMediaPlayerTime(duration)}
            </span>
        </div>
    );
}
