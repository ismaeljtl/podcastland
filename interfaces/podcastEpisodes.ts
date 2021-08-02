import { Episode } from "./episode";
import { Extra } from "./extra";

export interface PodcastEpisodes {
    id: string;
    title: string;
    publisher: string;
    image: string;
    thumbnail: string;
    listennotes_url: string;
    listen_score: string;
    listen_score_global_rank: string;
    total_episodes: number;
    explicit_content: boolean;
    description: string;
    itunes_id: number;
    rss: string;
    latest_pub_date_ms: number;
    earliest_pub_date_ms: number;
    language: string;
    country: string;
    website: string;
    extra: Extra;
    is_claimed: boolean;
    email: string;
    type: string;
    genre_ids: number[];
    episodes: Episode[];
    next_episode_pub_date: number;
}
