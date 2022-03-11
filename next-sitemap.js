/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://blog.moroo.dev',
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: ['204'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    // additionalSitemaps: [
    //   'https://blog.moroo.dev/server-sitemap.xml', // <==== Add here
    // ],
  },
};