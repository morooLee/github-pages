/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     providerImportSource: '@mdx-js/react',
//     remarkPlugins: [
//       // import('remark-gfm'),
//       // import('remark-grid-tables'),
//       // import('remark-toc'),
//       [import('remark-parse'), { gfm: true }],
//     ],
//     rehypePlugins: [],
//   },
// });
// module.exports = withMDX({
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
//   reactStrictMode: true,
//   // webpack: (config, { isServer }) => {
//   //   // Fixes packages that depend on fs/module module
//   //   if (!isServer) {
//   //     config.node = { fs: 'empty', module: 'empty' };
//   //   }

//   //   return config;
//   // },
// });

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        // these are the default values so you don't have to provide them if they are good enough for your use-case.
        // but you can overwrite them here with any valid value you want.
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        removeOriginalExtension: false,
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
          quality: 80,
        },
        optipng: {
          optimizationLevel: 3,
        },
        pngquant: false,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3,
        },
        svgo: {
          // enable/disable svgo plugins here
        },
        webp: {
          preset: 'default',
          quality: 75,
        },
      },
    ],
  ],
  {
    images: {
      domains: ['raw.githubusercontent.com'],
    },
    // experimental: { esmExternals: 'loose' },
    // webpack: (config, { isServer }) => {
    //   // Fixes packages that depend on fs/module module
    //   if (!isServer) {
    //     config.node = { fs: 'empty', module: 'empty' };
    //   }

    //   return config;
    // }
  }
);
