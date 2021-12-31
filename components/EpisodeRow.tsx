import { useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { Episode } from '../interfaces/episode';
import styles from './EpisodeRow.module.css';

export default function EpisodeRow(props: { episode: Episode }) {
    const { setValue } = useContext(PodcastContext);
    
    return (
        <div className={styles.container} onClick={() => setValue(props.episode.audio)} >
            {props.episode.title}
        </div>
    )
}