import React from 'react';
import { GetStaticProps } from 'next';
import MainLayout from '../../components/layouts/MainLayout';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import compiledSource from '../../lib/compiledSource';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Location from 'src/components/Location';
import MDXContent from 'src/components/MDXContent';

interface Props {
  content: MDXRemoteSerializeResult;
  blog: Blog;
}
export default function Profile({ content, blog }: Props) {
  const router = useRouter();
  const title = 'Profile | Moroo Blog';
  // const description = "Moroo's Profile with Github";
  const url = `https://blog.moroo.dev${router.asPath}`;
  // const images = [
  //   {
  //     url: 'https://blog.moroo.dev/assets/pages/profile/profile.png',
  //     alt: title,
  //     type: 'image/png',
  //     width: 854,
  //     height: 300,
  //   },
  // ];

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        // description={description}
        openGraph={{
          title,
          // description,
          url,
          // images,
        }}
      />
      <MainLayout blog={blog}>
        <section>
          <Location title="Profile" />
        </section>
        <article
          id="profile-content"
          className="markdown dark:markdown-invert max-w-none px-5 pb-5"
        >
          <MDXContent content={content} />
        </article>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = (await import('public/blog.json')).default;

  const response = await fetch(
    'https://raw.githubusercontent.com/morooLee/morooLee/main/README.md'
  );
  const source = await response.text();
  const { content } = await compiledSource(source, {
    isAutoLinkHeading: false,
  });

  return {
    props: {
      content,
      blog,
    },
  };
};
