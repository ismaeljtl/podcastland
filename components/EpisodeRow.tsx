import { useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { Episode } from '../interfaces/episode';
import styles from './EpisodeRow.module.css';

export default function EpisodeRow(props: { episode: Episode }) {
    const { value, setValue } = useContext(PodcastContext);
    
    return (
        // <div className={styles.container} onClick={() => setValue(props.episode.audio)} >
        <div className={value && props.episode.id === value.id ? styles.active : styles.container} onClick={() => setValue(props.episode)} >
            {props.episode.title}
        </div>
    )
}