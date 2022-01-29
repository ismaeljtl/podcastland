import Document, { Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M1430073BZ"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-M1430073BZ');          
            `,
          }}
        />
      </Head>
    );
  }
}