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
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Location from 'src/components/Location';
import SeriesPostLinks from 'src/components/SeriesLinks';
import Link from 'next/link';
import Adsense from 'src/components/Adsense';
import { Blog } from 'src/lib/blog';

interface Props {
  post: Post;
  series?: Series;
  content: MDXRemoteSerializeResult;
  toc: MDXRemoteSerializeResult | undefined;
  blog: BlogData;
}
export default function Post({ post, series, content, toc, blog }: Props) {
  const router = useRouter();
  const title = `${post.title} | Moroo Blog`;
  const description = post.description;
  // const description =
  //   post.description ?? post.content.split('\n').slice(0, 9).join('\n');
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);
  const images = [
    {
      url: `https://blog.moroo.dev${post.coverImageUrl}`,
      alt: `${post.title} Cover Image`,
    },
  ];

  const [isDarkMode] = useDarkModeContext();

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          title,
          description,
          url,
          images,
          article: {
            authors: ['https://blog.moroo.dev/profile'],
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            section: post.category.sub,
            tags: post.tags,
          },
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={images ? images.map((image) => image.url) : []}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
        authorName={['moroo']}
        publisherName="moroo"
        publisherLogo="https://blog.moroo.dev/assets/cover_image.jpg"
        description={description}
      />
      <PostLayout blog={blog} currentPost={post} toc={toc}>
        <div>
          {/* <Location title={`Post - [ ${post.title} ]`}>
            {'Post - '}
            <mark className="text-accent">{`[ ${post.title} ]`}</mark>
          </Location> */}
          <Location title="Post">Post</Location>
          {/* <mark className="text-4xl font-extrabold px-5">{post.title}</mark> */}
        </div>
        <div className="mx-5 mt-5 mb-10">
          <PostLargeCard post={post} />
        </div>
        <article
          id="post-article"
          className="daum-wm-content markdown dark:markdown-invert max-w-none p-5"
        >
          {/* <Adsense
            style={{ display: 'block', textAlign: 'center' }}
            adClient="ca-pub-5229752344777211"
            adSlot={3625286179}
            adLayout="in-article"
            adFormat="fluid"
          /> */}
          <MDXContent content={content} />
        </article>
        {post.series ? (
          <div className="mx-5 pt-5 mb-10 border-t">
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
          </div>
        ) : null}
        {/* <Adsense
          style={{ display: 'block', textAlign: 'center' }}
          adClient="ca-pub-5229752344777211"
          adSlot={3257760132}
          adLayout="in-article"
          adFormat="fluid"
        /> */}
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
  const source = Blog.getPostContent(post.slug);

  const series = blog.series.find(({ name }) => name === post.series?.name);

  if (!source) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { content, toc } = await compiledSource(source, {
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
