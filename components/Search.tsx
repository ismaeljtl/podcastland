import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { Typeahead } from '../interfaces/typeahead';
import { typeaheadPodcast } from '../interfaces/typeaheadPodcast';
import debounce from '../utils/debounce';
import styles from './Search.module.css';

export default function Search() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [data, setData] = useState<Typeahead>();

    useEffect(
        () => {
            if (input.trim() !== "") {
                verify(input);
            }
        }, 
        [input]
    );

    const verify = useCallback(
        debounce((input: any) => {
          fetchSearch(encodeURIComponent(input));
        }, 500),
        []
    );

    const fetchSearch = async (search: string) => {
        const res = await fetch(`https://listen-api.listennotes.com/api/v2/typeahead?q=${search}&show_podcasts=1&show_genres=1&safe_mode=0`, {
            method: 'GET',
            headers:{ 'X-ListenAPI-Key': '47fae8b32d2b4c57b681a292de58f553'}
        });
        const data: Typeahead = await res.json();
        setData(data);
    }

    const handleSearch = (podcast: typeaheadPodcast) => {
        router.push(`/episodes/${podcast.id}`);
    }
    
    return (
        <main className={styles.searchbox}>
            <input
                placeholder="Search your favorite Podcast Channel"
                value={input}
                type="search"
                onChange={(e) => setInput(e.target.value)}
            />
            <button>Search</button>
            <div className={styles.suggestion}>
                {data !== undefined && data.podcasts.map(podcast => (
                    <div 
                        className="item" 
                        onClick={() => handleSearch(podcast)} 
                        key={podcast.id}
                    >{podcast.publisher_original}</div>
                ))}
            </div>
        </main>
    )

}