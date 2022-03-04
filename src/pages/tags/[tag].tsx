import React, { useState, ChangeEvent, useEffect } from 'react';
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

interface Props {
  tag: Tag;
  posts: Post[];
  blog: Blog;
}
export default function Tag({ tag, posts, blog }: Props) {
  const router = useRouter();
  const title = `Moroo's Blog | Tag - ${tag.name}`;
  // const description = `Moroo's Blog Tag - [ ${tag.name} ]`;
  const url = `https://blog.moroo.dev${router.asPath}`;
  const [searchPosts, setSearchPosts] = useState<Post[]>([...posts]);

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value) {
      const findPosts = posts.filter(({ title }) => title.includes(value));
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
          {/* <Location title={`Tag - [ ${tag.name} ]`}>
            {'Tag - '}
            <mark>{`[ ${tag.name} ]`}</mark>
          </Location> */}
          <Location title="Tag" />
          <mark className="text-4xl font-extrabold px-5">{tag.name}</mark>
        </section>
        <section className="z-10 flex justify-between items-center p-5 bg-canvas sticky top-16">
          <SortingList
            defaultSortType={'recent'}
            useSortTypes={['recent', 'name']}
            data={searchPosts}
            handleDataSortingFunc={setSearchPosts}
          />
          <SearchInput
            placeholder="포스트 제목 검색..."
            dataList={posts.map((post) => {
              return {
                key: post.slug,
                value: post.title,
                text: post.title,
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
                    <div className="w-full bg-btn rounded-md border p-5">
                      <PostSummary post={post} />
                    </div>
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
        destination: '/404',
        permanent: false,
      },
    };
  }

  const tag = blog.tags.find(({ name }) => {
    return name === params.tag;
  });

  if (!tag) {
    return {
      redirect: {
        destination: '/204',
        permanent: false,
      },
    };
  }

  const posts = blog.posts.filter((post) => post.tags.includes(tag.name));

  return {
    props: {
      tag,
      posts,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.tags.map((tag) => {
      return {
        params: {
          tag: tag.name,
        },
      };
    }),
    fallback: false,
  };
};
