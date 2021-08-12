import { Episode } from '../interfaces/episode';
import styles from './EpisodeRow.module.css';

export default function EpisodeRow(props: { episode: Episode }) {
    
    return (
        <div className={styles.container}>
            {props.episode.title}
        </div>
    )
}