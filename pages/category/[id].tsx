import { GetServerSideProps } from 'next';
import styles from '../../styles/Category.module.css'
import { CategoryPodcasts } from '../../interfaces/category';
import ImageCard from '../../components/ImageCard';

export default function Category (props: {data: CategoryPodcasts}) {
    return <div className={styles.container}>
        <h4 className={styles.title}>Showing the best podcasts in the CategoryPodcasts of <label className={styles.category}>{props.data.name}</label></h4>

        <div className={styles.podcasts}>
            {props.data.podcasts.map(podcast => (
                <ImageCard podcast={podcast} key={podcast.id} /> 
            ))}
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.params!.id; 

    const data: CategoryPodcasts = await (await fetch(`${process.env.BASE_URL}/best_podcasts?genre_id=${id}&page=1&region=us&safe_mode=0`, {
        method: 'GET',
        headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })).json();
  
    // Pass data to the page via props
    return { props: { data } }
  }