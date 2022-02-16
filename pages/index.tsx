import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Genre } from "../interfaces/genre";
import { GetServerSideProps } from "next";
import Search from "../components/Search";
import { CuratedListElement } from "../interfaces/curatedList";
import ImageCard from "../components/ImageCard";
import Link from "next/link";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props: {
  genres: Genre[];
  curatedPodcasts: CuratedListElement[];
}) {
  const [curatedPodcasts, setCuratedPodcasts] = useState(props.curatedPodcasts);
  const [indexPage, setIndexPage] = useState(2);

  const loadMorePodcasts = async () => {
    const data = await (
      await fetch(
        `https://listen-api.listennotes.com/api/v2/curated_podcasts?page=${indexPage}`,
        {
          method: "GET",
          headers: { "X-ListenAPI-Key": process.env.NEXT_PUBLIC_KEY! },
        }
      )
    ).json();
    setCuratedPodcasts([...curatedPodcasts, ...data.curated_lists]);
    setIndexPage(indexPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={curatedPodcasts.length}
      next={loadMorePodcasts}
      hasMore={true}
      loader={<Loader />}
      endMessage={""}
      style={{ background: "#2c124f", overflow: 'unset' }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.strong}>
              Looking for a podcast to entertain you?
            </h1>
            <h1 className={styles.subtitle}>You've come to the right place.</h1>
            <h4>
              Here you will find everything from comedy to tech channels.{" "}
            </h4>
            <h4>Go ahead and listen 🎧</h4>
          </div>

          <Search />

          <h3>Category of Channels</h3>
          {props.genres.map((el) => (
            <Link href={`/category/${el.id}`} key={el.id}>
              <a className={styles.category}>{el.name + " "}</a>
            </Link>
          ))}
        </header>

        {curatedPodcasts.map((podcast) => (
          <div className={styles.genreRow} key={podcast.id}>
            <h4 className="title">{podcast.title}</h4>
            <div className={styles.podcasts}>
              {podcast.podcasts.map((el) => (
                <ImageCard podcast={el} key={el.id} />
              ))}
              <Link href={`/curated/${podcast.id}`}>
                <a className={styles.viewMore}>View more...</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await Promise.all([
    fetch(`${process.env.BASE_URL}/genres?top_level_only=1`, {
      method: "GET",
      headers: { "X-ListenAPI-Key": process.env.NEXT_PUBLIC_KEY! },
    }),
    fetch(`${process.env.BASE_URL}/curated_podcasts`, {
      method: "GET",
      headers: { "X-ListenAPI-Key": process.env.NEXT_PUBLIC_KEY! },
    }),
  ]);

  const data1: any = await res[0].json();
  const data2: any = await res[1].json();
  const genres: Genre[] = data1.genres;
  const curatedPodcasts: CuratedListElement[] = data2.curated_lists;

  // Pass data to the page via props
  return { props: { genres, curatedPodcasts } };
};
