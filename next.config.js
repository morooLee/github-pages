/** @type {import('next').NextConfig} */
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

module.exports = {
  reactStrictMode: true,
  // experimental: { esmExternals: 'loose' },
  // webpack: (config, { isServer }) => {
  //   // Fixes packages that depend on fs/module module
  //   if (!isServer) {
  //     config.node = { fs: 'empty', module: 'empty' };
  //   }

  //   return config;
  // },
};
