import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Genre } from '../interfaces/genre';
import { GetServerSideProps } from 'next';
import Search from '../components/Search';
import { CuratedListElement } from '../interfaces/curatedList';
import ImageCard from '../components/ImageCard';
import Image from 'next/image'
import Footer from '../components/Footer';

export default function Home(props: { genres: Genre[], curatedPodcasts: CuratedListElement[] }) {
  
  const [genres, setGenres] = useState(props.genres);
  const [curatedPodcasts, setCuratedPodcasts] = useState(props.curatedPodcasts);

  useEffect(()=>{console.log(props.curatedPodcasts), []});

  return (
    <div className={styles.container}>
      <Head>
        <title>PodcastLand</title>
        <meta name="description" content="Your entertainment site" />
        <link rel="icon" href="/favicon.ico" /> 
      </Head>

      <nav><Image className={styles.logo} src="/logo.png" alt="PodcastLand Logo" width={300} height={140} /></nav>

      <header>
        <div className={styles.titleContainer}>
          <h1 className={styles.strong}>Looking for a podcast to entertain you?</h1>
          <h1 className={styles.subtitle}>You've come to the right place.</h1>
          <h5>Here you will find everything from comedy to tech channels. </h5>
          <h5>Go ahead and listen 🎧</h5>
        </div>

        <Search />
        
        <h3>Categorías de Canales</h3>
        {genres.map(el => (<label className={styles.category} key={el.id}>{el.name + ' '}</label>))}
      </header>

      {curatedPodcasts.map(podcast => (
        <div className={styles.genreRow} key={podcast.id}>
          <h4 className='title'>{podcast.title}</h4>
          <div className={styles.podcasts}>
            {podcast.podcasts.map(el => <ImageCard podcast={el} key={el.id} /> )}
          </div>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await Promise.all([
    fetch(`${process.env.BASE_URL}/genres?top_level_only=1`, {
      method: 'GET',
      headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    }),
    fetch(`${process.env.BASE_URL}/curated_podcasts`, {
      method: 'GET',
      headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })
  ]);

  const data1: any = await res[0].json();
  const data2: any = await res[1].json();
  const genres: Genre[] = data1.genres;
  const curatedPodcasts: CuratedListElement[] = data2.curated_lists;

  // Pass data to the page via props
  return { props: { genres, curatedPodcasts } }
}