import { typeaheadPodcast } from "./typeaheadPodcast";

export interface Typeahead {
    terms: string[];
    genres: any[];
    podcasts: typeaheadPodcast[];
}
