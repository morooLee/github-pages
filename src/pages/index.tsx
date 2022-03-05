import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import MainLayout from 'src/components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostCard from 'src/components/PostCard';
import PostLargeCard from 'src/components/PostLargeCard';
import Link from 'next/link';

interface Props {
  blog: Blog;
}
export default function Home({ blog }: Props) {
  const router = useRouter();
  const title = "Moroo's Blog";
  // const description = "Moroo's Blog";
  const url = `https://blog.moroo.dev${router.asPath}`;

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
        <section className="px-5 pb-10">
          <p className="text-5xl font-bold">Hello! 👋</p>
          <p className="text-xl">Welcome to My Blog!</p>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Latest Post</p>
          <div className="py-5">
            <PostLargeCard
              post={
                blog.posts.sort((a, b) => {
                  if ('updatedAt' in a && 'updatedAt' in b) {
                    return new Date(a.updatedAt) > new Date(b.updatedAt)
                      ? -1
                      : 1;
                  }
                  return 0;
                })[0]
              }
            />
          </div>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Posts</p>
          <ul className="py-5 flex gap-5 overflow-y-auto snap-x">
            {blog.posts
              .sort((a, b) => {
                if ('updatedAt' in a && 'updatedAt' in b) {
                  return new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1;
                }
                return 0;
              })
              .map((post) => {
                return (
                  <li key={post.slug} className="snap-start scroll-ml-5">
                    <PostCard post={post} />
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Series</p>
          <ul className="py-5 flex flex-row gap-5">
            {blog.series.map((series) => {
              return (
                <li key={series.name}>
                  <Link href="/series/[name]" as={`/series/${series.name}`}>
                    <a className="block text-xl font-semibold bg-btn p-2 border rounded-md transform transition-transform duration-200 hover:scale-105 hover:text-accent">
                      <span title={series.name}>{series.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Categories</p>
          <ul className="py-5 flex flex-row flex-wrap gap-10">
            {blog.categories
              .filter(({ parent }) => {
                return parent === null;
              })
              .map((mainCategory) => {
                return (
                  <li key={mainCategory.name}>
                    <Link
                      href="/categories/[main]"
                      as={`/categories/${mainCategory.name}`}
                    >
                      <a className="block text-xl font-bold pb-2">
                        <p title={mainCategory.name}>{mainCategory.name}</p>
                      </a>
                    </Link>
                    <ul>
                      {blog.categories
                        .filter(({ parent }) => {
                          return parent === mainCategory.name;
                        })
                        .map((subCategory) => {
                          return (
                            <li
                              className="ml-1 pl-2 border-l-2"
                              key={subCategory.name}
                            >
                              <Link
                                href="/categories/[main]/[sub]"
                                as={`/categories/${mainCategory.name}/${subCategory.name}`}
                              >
                                <a className="block text-lg">
                                  <p title={subCategory.name}>
                                    {subCategory.name}
                                  </p>
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Tags</p>
          <ul className="list-none py-5 flex flex-row flex-wrap gap-2">
            {blog.tags.map((tag) => {
              return (
                <li key={tag.name} className="group">
                  <Link href="/tags/[tag]" as={`/tags/${tag.name}`}>
                    <a
                      className={`inline-block rounded-full px-3 py-2 text-center align-middle bg-btn border-red-500 group-hover:border-btn-hover group-hover:bg-btn-hover border text-btn text-xs font-semibold leading-none`}
                    >
                      <p title={`#${tag.name}`}>{`#${tag.name}`}</p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    props: {
      blog,
    },
  };
};
