import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import Notifications from '../components/Notification';
import { Footer } from '../components/Footer';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Solana Token Creator</title>
            <meta name="description" content="Create and manage Solana tokens with ease. Mint, update metadata, and manage your tokens in one place." />
            <meta property="og:title" content="Solana Token Creator" />
            <meta property="og:description" content="Create and manage Solana tokens with ease. Mint, update metadata, and manage your tokens in one place." />
            <meta property="og:image" content="/token_image.png" />
            <meta property="og:url" content="https://token-creator.com" />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <div className="fixed top-0 right-0 p-4 z-50">
                <Notifications />
              </div>
              <AppBar/>
              <ContentContainer>
                <Component {...pageProps} />
              </ContentContainer>
              <Footer />
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
