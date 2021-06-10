export interface CuratedListElement {
    id:              string;
    title:           string;
    description:     string;
    source_url:      string;
    source_domain:   string;
    pub_date_ms:     number;
    podcasts:        Podcast[];
    total:           number;
    listennotes_url: string;
}

interface Podcast {
    id:                       string;
    title:                    string;
    publisher:                string;
    image:                    string;
    thumbnail:                string;
    listennotes_url:          string;
    listen_score:             string;
    listen_score_global_rank: string;
}
