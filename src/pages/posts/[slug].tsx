import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import ReactUtterances from '../../components/ReactUtterances';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import PostLayout from '../../components/layouts/PostLayout';
import MDXContent from '../../components/MDXContent';
import PostLargeCard from '../../components/PostLargeCard';
import compiledSource from '../../lib/compiledSource';
import { NextSeo } from 'next-seo';
import Location from 'src/components/Location';
import SeriesPostLinks from 'src/components/SeriesLinks';
import Link from 'next/link';

interface Props {
  post: Post;
  series?: Series;
  content: MDXRemoteSerializeResult;
  toc: MDXRemoteSerializeResult | undefined;
  blog: Blog;
}
export default function Post({ post, series, content, toc, blog }: Props) {
  const router = useRouter();
  const title = `Moroo's Blog | Post - ${post.title}`;
  // const description = `Moroo's Blog Sub Category - [ ${category.name} ]`;
  const url = `https://blog.moroo.dev${router.asPath}`;
  const images = post.coverImageUrl
    ? [{ url: post.coverImageUrl, alt: post.title }]
    : undefined;

  const [isDarkMode] = useDarkModeContext();

  return (
    <>
      <NextSeo
        title={title}
        // description={description}
        openGraph={{
          title,
          // description,
          url,
          images,
          article: {
            authors: ['https://blog.moroo.dev/profile'],
            publishedTime: post.updatedAt,
            section: post.category.sub,
            tags: post.tags,
          },
        }}
      />
      <PostLayout blog={blog} currentPost={post} toc={toc}>
        <section>
          {/* <Location title={`Post - [ ${post.title} ]`}>
            {'Post - '}
            <mark className="text-accent">{`[ ${post.title} ]`}</mark>
          </Location> */}
          <Location title="Post" />
          {/* <mark className="text-4xl font-extrabold px-5">{post.title}</mark> */}
        </section>
        <section className="mx-5 mt-5 mb-10">
          <PostLargeCard post={post} />
        </section>
        <article
          id="post-content"
          className="markdown dark:markdown-invert max-w-none p-5"
        >
          <MDXContent content={content} />
        </article>
        {post.series ? (
          <section className="mx-5 pt-5 mb-10 border-t">
            <Link href="/series/[name]" as={`/series/${post.series.name}`}>
              <a className="inline-block text-3xl font-bold">
                <p>{post.series.name}</p>
              </a>
            </Link>
            <p className="inline-block ml-2 text-3xl font-thin">series</p>
            <SeriesPostLinks
              series={series}
              previous={blog.posts.find(
                ({ id }) => id === series?.postIds[post.series!.number - 1 - 1]
              )}
              next={blog.posts.find(
                ({ id }) => id === series?.postIds[post.series!.number - 1 + 1]
              )}
            />
          </section>
        ) : null}
        <ReactUtterances
          repo="morooLee/github-pages"
          type="pathname"
          label="comments"
          theme={isDarkMode ? 'github-dark' : 'github-light'}
        />
      </PostLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = (await import('public/blog.json')).default;

  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const post = blog.posts.find(({ slug }) => {
    return slug === params.slug;
  });

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const series = blog.series.find(({ name }) => name === post.series?.name);

  const { content, toc } = await compiledSource(post.content, {
    isAutoLinkHeading: true,
  });

  return {
    props: {
      post,
      series,
      content,
      toc,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
