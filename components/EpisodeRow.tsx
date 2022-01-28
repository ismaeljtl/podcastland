import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Episode } from "../interfaces/episode";
import styles from "./EpisodeRow.module.css";

export default function EpisodeRow(props: { episode: Episode }) {
  const { value, setValue } = useContext(PodcastContext);
  const [container, setContainer] = useState("");

  const selected =
    value && props.episode.id === value.id ? styles.active : styles.container;

  useEffect(() => {
    value && value !== undefined
      ? setContainer(styles.containerWithPlayer)
      : setContainer(styles.container);
  }, [value]);

  return (
    // <div className={styles.container} onClick={() => setValue(props.episode.audio)} >
    <div
      className={`${selected} ${container}`}
      onClick={() => setValue(props.episode)}
    >
      {props.episode.title}
    </div>
  );
}
