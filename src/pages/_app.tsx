import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import DarkModeProvider from '../lib/DarkModeContext';
import { MediaContextProvider } from '../components/Media';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <MediaContextProvider>
        <DarkModeProvider>
          <GlobalStyles />
          <Component {...pageProps} />
          <ToastContainer newestOnTop />
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

//   let blog: BlogData | undefined = undefined;
//   if (appContext.ctx.res) {
//     console.log(appContext.ctx.res);
//     // blog = Blog.getBlog();
//   }

//   return { ...appProps, blog };
// };

export default MyApp;
