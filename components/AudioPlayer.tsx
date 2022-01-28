import { useState, useRef, useEffect, useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Episode } from "../interfaces/episode";
import styles from "./AudioPlayer.module.css";
import Image from "next/image";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null); // reference of audio component
  const progressBar = useRef<HTMLInputElement>(null); // reference to progress bar
  const volumeBar = useRef<HTMLInputElement>(null); // reference to volume bar
  const animationRef = useRef(0);

  const [audio, setAudio] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  const podcast = useContext(PodcastContext);
  const podcastContext: Episode = podcast.value;

  useEffect(() => {
    if (!podcastContext) {
      return;
    }
    setAudio(podcastContext.audio);
    setDuration(podcastContext.audio_length_sec);
  }, [podcastContext]);

  useEffect(() => {
    if (!podcastContext) {
      return;
    }

    setIsPlaying(false);
    if (!audioLoading) {
      audioPlayer.current!.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [audioLoading]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current!.duration);
    progressBar.current!.max = seconds.toString();
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current!.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current!.pause();
      //  cancelAnimationFrame(animationRef.current); <- esta funcion cancela la animcacion
    }
  };

  const calculateDuration = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changePlayerCurrentTime = () => {
    progressBar.current!.style.setProperty(
      "--seek-before-width",
      `${(parseFloat(progressBar.current!.value) / duration) * 100}%`
    );
    setCurrentTime(parseFloat(progressBar.current!.value));
  };

  const whilePlaying = () => {
    progressBar.current!.value = audioPlayer.current!.currentTime.toString();
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current!.currentTime = parseFloat(progressBar.current!.value);
    changePlayerCurrentTime();
  };

  const changeVolumeRange = () => {
    audioPlayer.current!.volume = parseFloat(volumeBar.current!.value) / 100;
  };

  const backTenSecs = () => {
    progressBar.current!.value = String(
      parseFloat(progressBar.current!.value) - 10
    );
    changeRange();
  };

  const forwardTenSecs = () => {
    progressBar.current!.value = String(
      parseFloat(progressBar.current!.value) + 10
    );
    changeRange();
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src={audio}
        preload="metadata"
        onLoadStart={() => audio && setAudioLoading(true)}
        onCanPlayThrough={() => audio && setAudioLoading(false)}
      ></audio>

      <div className={styles.imageContainer}>
        <Image
          loader={() => podcastContext.thumbnail}
          src={podcastContext.thumbnail}
          alt="thumbnail"
          width={80}
          height={80}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.transparent} onClick={backTenSecs}>
          <Image src="/backward.png" alt="play" width={59} height={40} />
        </button>

        {audioLoading && <button disabled>Loading...</button>}
        {!audioLoading && (
          <button
            className={isPlaying ? styles.pause : styles.play}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Image src="/pause.png" alt="pause" width={11} height={16} />
            ) : (
              <Image src="/play.png" alt="play" width={14} height={16} />
            )}
          </button>
        )}

        <button className={styles.transparent} onClick={forwardTenSecs}>
          <Image src="/forward.png" alt="play" width={59} height={40} />
        </button>
      </div>

      {/* current time */}
      <div className={styles.timer}>{calculateDuration(currentTime)}</div>

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
      <div className={styles.timer}>
        {duration && !isNaN(duration) ? calculateDuration(duration) : "00:00"}
      </div>

      {/* volume bar */}
      {/* styles to volume bar: https://stackoverflow.com/questions/15935837/how-to-display-a-range-input-slider-vertically */}
      <div className={styles.volumeBarContainer}>
        <Image src="/volume.png" alt="volume" width={34} height={34} />
        <div className={styles.inputContainer}>
          <input
            // @ts-ignore
            orient={"vertical"}
            ref={volumeBar}
            onChange={changeVolumeRange}
            type="range"
            className={styles.volumeBar}
            defaultValue="100"
          />
        </div>
      </div>
    </div>
  );
}
