export interface Typeahead {
    terms: string[];
    genres: any[];
    podcasts: Podcast[];
}

interface Podcast {
    title_highlighted: string;
    title_original: string;
    publisher_highlighted: string;
    publisher_original: string;
    image: string;
    thumbnail: string;
    id: string;
    explicit_content: boolean;
}