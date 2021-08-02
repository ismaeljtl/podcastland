import { GetServerSideProps } from 'next';
import styles from '../../styles/Category.module.css'
import { CuratedListElement } from '../../interfaces/curatedList';
import ImageCard from '../../components/ImageCard';
import Link from 'next/link';

export default function Category (props: {data: CuratedListElement}) {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <a className='back'>← Go back</a>
            </Link>

            <h4 className={styles.title}>{props.data.title}</h4>

            <div className={styles.podcasts}>
                {props.data.podcasts.map(podcast => (
                    <ImageCard podcast={podcast} key={podcast.id} /> 
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.params!.id; 

    const data: CuratedListElement = await (await fetch(`${process.env.BASE_URL}/curated_podcasts/${id}`, {
        method: 'GET',
        headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })).json();
  
    // Pass data to the page via props
    return { props: { data } }
  }