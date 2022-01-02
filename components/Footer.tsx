import { useContext } from "react";
import styles from './Footer.module.css';
import { PodcastContext } from "../context/PodcastContext";
import AudioPlayer from "./AudioPlayer";

export default function Footer() {
  const { value } = useContext(PodcastContext);

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.innerContainer}>
                { value && <AudioPlayer />}
                <div className={styles.footer}>
                    <small>This Project was Designed and Developed with 💚 by Gabriela Tochón & Ismael Teixeira</small>
                    <small>July 2021</small>
                </div>
            </div>
        </footer>
    )
}