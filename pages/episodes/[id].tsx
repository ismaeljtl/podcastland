import { GetServerSideProps } from 'next';
import styles from '../../styles/Episodes.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { PodcastEpisodes } from '../../interfaces/podcastEpisodes';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../components/Loader";
import { useState } from 'react';

export default function Episodes (props: {data: PodcastEpisodes, id: string}) {
    const id = props.id;
    const [episodes, setEpisodes] = useState(props.data.episodes);
    const [pubDate, setPubDate] = useState(props.data.next_episode_pub_date);
    
    const myLoader = ({ src }: any) => {
        return `${src}`
    }

    const loadMorePodcasts = async () => {
        const data: PodcastEpisodes = await (
        await fetch(
            `https://listen-api.listennotes.com/api/v2/podcasts/${id}?next_episode_pub_date=${pubDate}`,
            {
                method: "GET",
                headers: { "X-ListenAPI-Key": "47fae8b32d2b4c57b681a292de58f553" },
            }
        )
        ).json();
        setEpisodes([...episodes, ...data.episodes]);
        setPubDate(data.next_episode_pub_date);
    };

    return (
        <InfiniteScroll
            dataLength={episodes.length}
            next={loadMorePodcasts}
            hasMore={true}
            loader={<Loader />}
            endMessage={""}
            style={{ background: "#2c124f", overflow: 'unset' }}
        >
            <div className={styles.container}>
                <Link href={'/'}>
                    <a className='back'>← Go back</a>
                </Link>

                <div className={styles.gridContainer}>
                    <div className="podcast">
                        <Image 
                            loader={myLoader} 
                            src={props.data.image} 
                            alt={props.data.title} 
                            width={160} 
                            height={160} 
                            layout="responsive" 
                        />
                        <p>{props.data.title}</p>
                    </div>

                    <div className="episodes">
                        {episodes.map(episode => (
                            <p key={episode.id}>{episode.title}</p>
                        ))}
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.params!.id; 

    const data = await (await fetch(`${process.env.BASE_URL}/podcasts/${id}`, {
        method: 'GET',
        headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })).json();
  
    // Pass data to the page via props
    return { props: { data, id } }
  }