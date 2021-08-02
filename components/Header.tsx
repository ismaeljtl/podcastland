import Head from "next/head";
import Image from 'next/image'
import Link from "next/link";
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
                <Link href={'/'}>
                    <a className={styles.category}>
                        <Image className={styles.logo} src="/logo.png" alt="PodcastLand Logo" width={300} height={140} />
                    </a>
                </Link>
            </nav>
        </div>
    )
}