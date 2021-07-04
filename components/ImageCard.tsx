import { Podcast } from "../interfaces/podcast";
import styles from "./ImageCard.module.css";
import Image from 'next/image'

export default function ImageCard(props: { podcast: Podcast }) {
    const myLoader = ({ src }: any) => {
        return `${src}`
    }

    return (
        <div className={styles.card}>
            <Image 
                loader={myLoader} 
                src={props.podcast.image} 
                alt={props.podcast.title} 
                width={160} 
                height={160} 
                layout="responsive" 
            />
            <small>{props.podcast.title}</small>
        </div>
    )
}