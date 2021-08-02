import { Podcast } from "../interfaces/podcast";
import styles from "./ImageCard.module.css";
import Image from 'next/image'
import Link from "next/link";

export default function ImageCard(props: { podcast: Podcast }) {
    const myLoader = ({ src }: any) => {
        return `${src}`
    }

    return (
        <div className={styles.card}>
            <Link href={`/episodes/${props.podcast.id}`}>
                <a className={styles.link}>
                    <Image 
                        loader={myLoader} 
                        src={props.podcast.image} 
                        alt={props.podcast.title} 
                        width={160} 
                        height={160} 
                        layout="responsive" 
                    />
                    <small className={styles.title}>{props.podcast.title}</small>
                </a>
            </Link>

        </div>
    )
}