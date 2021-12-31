import { useState, useRef, useEffect, useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef<HTMLAudioElement>(null); // reference of audio component
    const progressBar = useRef<HTMLInputElement>(null); // reference to progress bar
    const animationRef = useRef(0);

    const [audio, setAudio] = useState('');
    const { value } = useContext(PodcastContext);

    useEffect(() => {
        setAudio(value);
    }, [value])

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
                src={audio} 
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