import { Episode } from '../interfaces/episode';
import styles from './EpisodeRow.module.css';

export default function EpisodeRow(props: { episode: Episode }) {
    
    return (
        <div className={styles.container} onClick={() => console.log(props.episode)} >
            {props.episode.title}
        </div>
    )
}