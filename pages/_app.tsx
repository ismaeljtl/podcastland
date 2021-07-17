import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}
export default MyApp
