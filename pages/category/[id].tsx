import { GetServerSideProps } from 'next';
import styles from '../../styles/Category.module.css'
import { CategoryPodcasts } from '../../interfaces/category';
import ImageCard from '../../components/ImageCard';
import { useState } from 'react';
import Loader from "../../components/Loader";
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

export default function Category (props: {data: CategoryPodcasts, id: string}) {
    const title = props.data.name;
    const [categoryPodcasts, setCategoryPodcasts] = useState(props.data.podcasts);
    const [indexPage, setIndexPage] = useState(2);
    const id = props.id;

    const loadMorePodcasts = async () => {
        const data: CategoryPodcasts = await (
            await fetch(
                `https://listen-api.listennotes.com/api/v2//best_podcasts?genre_id=${id}&region=us&safe_mode=0&&page=${indexPage}`,
            {
                method: "GET",
                headers: { "X-ListenAPI-Key": process.env.NEXT_PUBLIC_KEY! },
            }
            )
        ).json();
        setCategoryPodcasts([...categoryPodcasts, ...data.podcasts]);
        setIndexPage(indexPage + 1);
    };

    return (
        <InfiniteScroll
            dataLength={categoryPodcasts.length}
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
                <h4 className={styles.title}>
                    Showing the best podcasts in the CategoryPodcasts of <label className={styles.category}>{title}</label>
                </h4>

                <div className={styles.podcasts}>
                    {categoryPodcasts.map(podcast => (
                        <ImageCard podcast={podcast} key={podcast.id} /> 
                    ))}
                </div>
            </div>
        </InfiniteScroll>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.params!.id; 

    const data: CategoryPodcasts = await (await fetch(`${process.env.BASE_URL}/best_podcasts?genre_id=${id}&page=1&region=us&safe_mode=0`, {
        method: 'GET',
        headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })).json();
  
    // Pass data to the page via props
    return { props: { data, id } }
  }