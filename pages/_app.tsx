import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import NextNprogress from 'nextjs-progressbar';
import { PodcastContext } from '../context/PodcastContext';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url :any) => {
    // @ts-ignore
    window.gtag('config', '[Tracking ID]', {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const [value, setValue] = useState(undefined);

  return (
    <PodcastContext.Provider value={{value, setValue}}>
      <Layout>
        {/* componente para barra de progreso */}
        <NextNprogress
          color="#539CED"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </PodcastContext.Provider>
  )
}
export default MyApp
