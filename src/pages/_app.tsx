import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import '../styles/globals.css';
import DarkModeProvider from '../lib/DarkModeContext';
import { MediaContextProvider } from '../components/Media';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MediaContextProvider>
        <DarkModeProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </DarkModeProvider>
      </MediaContextProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
