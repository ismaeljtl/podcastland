import { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef<HTMLAudioElement>(null); // reference of audio component
    const progressBar = useRef<HTMLInputElement>(null); // reference to progress bar
    const animationRef = useRef(0);

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current!.duration);
        setDuration(seconds);
        progressBar.current!.max = seconds.toString();
    }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current!.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current!.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }
    
    const calculateDuration = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const changePlayerCurrentTime = () => {
        progressBar.current!.style.setProperty('--seek-before-width', `${parseFloat(progressBar.current!.value) / duration * 100}%`)
        setCurrentTime(parseFloat(progressBar.current!.value));
    }

    const whilePlaying = () => {
        progressBar.current!.value = audioPlayer.current!.currentTime.toString();
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current!.currentTime = parseFloat(progressBar.current!.value);
        changePlayerCurrentTime();
    }

    const backTenSecs = () => {
        progressBar.current!.value = String(parseFloat(progressBar.current!.value) - 10);
        changeRange();
    }

    const forwardTenSecs = () => {
        progressBar.current!.value = String(parseFloat(progressBar.current!.value) + 10);
        changeRange();
    }

    return (
        <div className={styles.audioPlayer}>
            
            <audio 
                ref={audioPlayer}
                src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" 
                preload="metadata"
            ></audio>
            <button onClick={backTenSecs}>back 10</button>

            <button onClick={togglePlayPause} >
                {isPlaying ? 'pause' : 'play'}
            </button>

            <button onClick={forwardTenSecs}>forward 10</button>

            {/* current time */}
            <div>{calculateDuration(currentTime)}</div>

            {/* progress bar */}
            <div className={styles.progressBarContainer}>
                <input 
                    ref={progressBar} 
                    onChange={changeRange} 
                    type="range" 
                    className={styles.progressBar} 
                    defaultValue="0" 
                />
            </div>

            {/* duration */}
            <div className={styles.duration}>{(duration && !isNaN(duration)) ? calculateDuration(duration) : '00:00'}</div>

        </div>
    )
}