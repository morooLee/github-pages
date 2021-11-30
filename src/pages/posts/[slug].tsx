import React from 'react';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import Script from 'next/script';
import { GetStaticProps, GetStaticPaths } from 'next';
import Blog, { Frontmatter } from '../../lib/blog';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

interface PostProps {
  frontmatter: Frontmatter;
  source: any;
}
export default function Post({ frontmatter, source }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <MDXRemote {...source} />
      {/* <article>{content}</article> */}
      <Script
        src="https://utteranc.es/client.js"
        repo="morooLee/github-pages"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const post = Blog.getPost(params.slug as string);
  // const content = await markdownToHtml(post.content || '');
  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const mdxSource = await serialize(post.content, {
    scope: { ...post.frontmatter },
  });

  return {
    props: {
      frontmatter: post.frontmatter,
      source: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  Blog.init();

  return {
    paths: Blog.posts.map((post) => {
      return {
        params: {
          slug: post.frontmatter.slug,
        },
      };
    }),
    fallback: false,
  };
};
