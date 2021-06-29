import { Podcast } from './podcast';

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
