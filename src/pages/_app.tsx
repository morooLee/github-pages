import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import DarkModeProvider from '../lib/DarkModeContext';
import { MediaContextProvider } from '../components/Media';
import { DefaultSeo } from 'next-seo';
// import SEO from '../../next-seo.config';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import gtag from 'src/lib/gtag';

const DEFAULT_SEO = {
  title: 'Moroo Blog',
  description: 'Software QA 및 테스트 자동화에 대한 이야기',
  twitter: {
    handle: '@lee_moroo',
    site: '@lee_moroo',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'Moroo Blog',
    defaultTitle: 'Moroo Blog',
    description: 'Software QA 및 테스트 자동화에 대한 이야기',
    locale: 'ko_KR',
    site_name: 'Moroo Blog',
    profile: {
      firstName: 'Soon Han',
      lastName: 'Lee',
      username: 'moroo',
      gender: 'male',
    },
    images: [
      {
        url: 'https://blog.moroo.dev/assets/blog_cover_image.jpg',
        alt: 'Cover Image',
        type: 'image/jpg',
        width: 1200,
        height: 424,
      },
    ],
  },
  additionalMetaTags: [
    {
      property: 'NaverBot',
      content: 'All',
    },
    {
      name: 'NaverBot',
      content: 'index,follow',
    },
    {
      property: 'Yeti',
      content: 'All',
    },
    {
      name: 'Yeti',
      content: 'index,follow',
    },
    // {
    //   name: 'facebook-domain-verification',
    //   content: '9wvjinz2dotboiz2f3m2sdgqish34f',
    // },
    {
      property: 'fb:app_id',
      content: '736749940650920',
    },
  ],
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-PJDMBXV' });
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url);
  //   };
  //   //When the component is mounted, subscribe to router changes
  //   //and log those page views
  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...DEFAULT_SEO} />
      <MediaContextProvider>
        <DarkModeProvider>
          {/* <GlobalStyles /> */}
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
