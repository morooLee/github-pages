// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const fields = [
    {
      loc: 'https://blog.moroo.dev', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://blog.moroo.dev/posts', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://blog.moroo.dev/categories', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://blog.moroo.dev/series', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://blog.moroo.dev/tags', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ];
  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
