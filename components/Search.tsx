import { useCallback, useEffect, useState } from 'react';
import { Typeahead } from '../interfaces/typeahead';
import debounce from '../utils/debounce';
import styles from './Search.module.css';

export default function Search() {
    const [input, setInput] = useState('');
    const [data, setData] = useState<Typeahead>();

    useEffect(
        () => {
            if (input !== "") {
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
    
    return (
        <main className={styles.searchbox}>
            <input
                placeholder="Busca tu Canal de Podcast Favorito"
                value={input}
                type="search"
                onChange={(e) => setInput(e.target.value)}
            />
            <button>Buscar</button>
            <div className={styles.suggestion}>
                {data !== undefined && data.podcasts.map(podcast => (
                    <div 
                        className="item" 
                        onClick={() => setInput(podcast.publisher_original)} 
                        key={podcast.id}
                    >{podcast.publisher_original}</div>
                ))}
            </div>
        </main>
    )

}