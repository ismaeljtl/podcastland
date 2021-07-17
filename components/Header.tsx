import Head from "next/head";
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div>
            <Head>
                <title>PodcastLand</title>
                <meta name="description" content="Your entertainment site" />
                <link rel="icon" href="/favicon.ico" /> 
            </Head>

            <nav className={styles.header}>
                <Image className={styles.logo} src="/logo.png" alt="PodcastLand Logo" width={300} height={140} />
            </nav>
        </div>
    )
}