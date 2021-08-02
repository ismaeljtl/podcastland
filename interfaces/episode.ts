export interface Episode {
    id: string;
    title: string;
    description: string;
    pub_date_ms: any;
    audio: string;
    audio_length_sec: number;
    listennotes_url: string;
    image: string;
    thumbnail: string;
    maybe_audio_invalid: boolean;
    listennotes_edit_url: string;
    explicit_content: boolean;
    link: string;
    guid_from_rss: string;
}