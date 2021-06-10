import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Genre } from '../interfaces/genre';
import { GetServerSideProps } from 'next';
import Search from '../components/Search';
import { CuratedListElement } from '../interfaces/curatedList';

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

      <nav><img className={styles.logo} src="./logo.png" alt="PodcastLand Logo"/></nav>

      <header>
        <div className={styles.titleContainer}>
          <h1 className={styles.strong}>¿Buscabas un podcasts para entretenerte?</h1>
          <h1 className={styles.subtitle}>Llegaste al sitio correcto</h1>
        </div>

        <Search />
        
        <h3>Categorías de Canales</h3>
        {genres.map(el => (<label className={styles.category} key={el.id}>{el.name + ' '}</label>))}
      </header>

      <h3><strong>¿No sabes qué escuchar?</strong></h3>
      <h3>Prueba con las siguientes listas</h3>

      {curatedPodcasts.map(podcast => (
        <div>
          <p>{podcast.title}</p>
          <div>{podcast.podcasts.map(el => (
            <img src={el.image} width="160" />
          ))}</div>
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