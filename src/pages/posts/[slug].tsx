import React from 'react';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import Script from 'next/script';
import { GetStaticProps, GetStaticPaths } from 'next';
import Blog, { Frontmatter } from '../../lib/blog';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import MarkdownStyledComponents from '../../components/Markdown';

interface PostProps {
  frontmatter: Frontmatter;
  source: MDXRemoteSerializeResult;
}
export default function Post({ frontmatter, source }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{`Moroo - ${frontmatter.title}`}</title>
      </Head>
      <MarkdownStyledComponents.body>
        <MDXRemote {...source} components={MarkdownStyledComponents} />
      </MarkdownStyledComponents.body>
      <Script
        strategy="afterInteractive"
        src="https://utteranc.es/client.js"
        // @ts-expect-error
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

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const post = Blog.getPost(params.slug);
  // const content = await markdownToHtml(post.content || '');
  // const post = blog.posts.find((_post: any) => _post.slug === params.slug);
  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content, {
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
