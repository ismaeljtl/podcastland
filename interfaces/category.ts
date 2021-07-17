import { Podcast } from './podcast';

export interface CategoryPodcasts {
    id: number;
    name: string;
    parent_id: number;
    podcasts: Podcast[];
    total: number;
    has_next: boolean;
    has_previous: boolean;
    page_number: number;
    previous_page_number: number;
    next_page_number: number;
    listennotes_url: string;
}
