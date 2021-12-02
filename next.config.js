/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   // Fixes packages that depend on fs/module module
  //   if (!isServer) {
  //     config.node = { fs: 'empty', module: 'empty' };
  //   }

  //   return config;
  // },
});

// module.exports = {
//   reactStrictMode: true,
// };
