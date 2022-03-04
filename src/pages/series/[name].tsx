import React, { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import MainLayout from '../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostSummary from 'src/components/PostLargeCard';
import SearchInput from 'src/components/SearchInput';
import { NextSeo } from 'next-seo';
import DataListContainer from 'src/components/DataListContainer';
import SortingList from 'src/components/SortingList';
import NoDateMessage from 'src/components/NoDataMessage';
import Link from 'next/link';

interface Props {
  series: Series;
  posts: Post[];
  blog: Blog;
}
export default function Series({ series, posts, blog }: Props) {
  const router = useRouter();
  const title = `Moroo's Blog | Series - ${series.name}`;
  // const description = `Moroo's Blog Series - [ ${series.name} ]`;
  const url = `https://blog.moroo.dev${router.asPath}`;

  const [searchPosts, setSearchPosts] = useState<Post[]>([...posts]);

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value) {
      const findPosts = blog.posts.filter(
        ({ title, content }) => title.includes(value) || content.includes(value)
      );

      if (findPosts.length) {
        setSearchPosts([...findPosts]);
      } else {
        setSearchPosts([]);
      }
    } else {
      setSearchPosts([...posts]);
    }
  }

  useEffect(() => {
    setSearchPosts([...posts]);
  }, [posts]);

  return (
    <>
      <NextSeo
        title={title}
        // description={description}
        openGraph={{
          title,
          // description,
          url,
        }}
      />
      <MainLayout blog={blog}>
        <section>
          {/* <Location title={`Series - ${series.name}`}>
            {'Series - '}
            <mark className="text-accent">{`[ ${series.name} ]`}</mark>
          </Location> */}
          <Location title="Series" />
          <details className="bg-btn border rounded-md m-5 p-5" open>
            <summary className="text-3xl align-middle focus:outline-none list-none cursor-pointer">
              <span className="font-extrabold" title={series.name}>
                {series.name}
              </span>
            </summary>
            <ul className="list-decimal list-inside pt-3">
              {posts.map((post) => {
                return (
                  <li key={post.slug}>
                    <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                      <a className="inline-block text-lg font-semibold ml-1">
                        <p>{post.title}</p>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        </section>
        <section className="z-10 flex justify-between items-center gap-5 p-5 bg-canvas sticky top-16">
          <SortingList
            defaultSortType={'number'}
            useSortTypes={['number', 'recent', 'name']}
            data={searchPosts}
            handleDataSortingFunc={setSearchPosts}
          />
          <SearchInput
            placeholder="제목 또는 내용 검색..."
            dataList={posts.map(({ slug, title }) => {
              return {
                key: slug,
                value: title,
                text: title,
              };
            })}
            onChange={onSearchChange}
          />
        </section>
        <section className="max-w-none px-5 pb-5">
          {searchPosts.length > 0 ? (
            <ul className="flex flex-col gap-10">
              {searchPosts.map((post) => {
                return (
                  <li key={post.slug}>
                    <PostSummary post={post} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <NoDateMessage />
          )}
        </section>
      </MainLayout>
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

  const series = blog.series.find(({ name }) => {
    return name === params.name;
  });

  if (!series) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const posts = blog.posts.filter((post) => post.series?.name === series.name);

  return {
    props: {
      series,
      posts,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.series.map((series) => {
      return {
        params: {
          name: series.name,
        },
      };
    }),
    fallback: false,
  };
};
