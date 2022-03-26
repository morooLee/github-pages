import React, { useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogoJsonLd, NextSeo } from 'next-seo';
import MainLayout from 'src/components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostCard from 'src/components/PostCard';
import PostLargeCard from 'src/components/PostLargeCard';
import Link from 'next/link';
import { generateRssFeed } from 'src/lib/generateRssFeed';

interface Props {
  blog: Blog;
}
export default function Home({ blog }: Props) {
  const router = useRouter();
  const title = 'Home | Moroo Blog';
  // const description = "Moroo's Blog";
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);

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
        }}
      />
      <MainLayout blog={blog}>
        <section className="pb-10">
          <Location title="hello">
            <h1 className="text-5xl font-bold">
              Hello! 👋
              <p className="text-3xl font-normal">
                Welcome to the <mark className="font-bold">Moroo Blog</mark>
              </p>
            </h1>
            <img
              src="https://capsule-render.vercel.app/api?type=slice&color=EF4424&height=300&section=header&text=%23moroo&fontColor=21262d&fontSize=90&desc=Software%20Quality%20Assurance&descSize=30&descAlignY=68"
              alt="cover image"
              className="mt-5 w-full border rounded-md"
            />
            {/* <div className="pt-5 text-xl">
              <p>안녕하세요.</p>
              <p>제 블로그에 방문해 주셔서 감사드립니다.</p>
              <p>
                저는 테스트 자동화에 관심이 있는 Software QA 엔지니어입니다.
              </p>
              <p>
                이 블로그는 Quality Assurance 및 Test Automation에 관련된 주제를
                다룰 예정입니다.
              </p>
              <p>포스트 내</p>
              <p>
                문의사항이 있으시거나 저에 대해 궁금하신 점이 있다면
                <Link href="/profile" as="/profile">
                  <a> 프로필 페이지</a>
                </Link>
                를 참조해 주세요.
              </p>
            </div> */}
          </Location>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Latest Post</p>
          <div className="py-5">
            <PostLargeCard post={blog.posts[0]} />
          </div>
        </section>
        <section className="px-5 pb-10">
          <p className="text-3xl font-bold">Posts</p>
          <ul className="py-5 flex gap-5 overflow-y-auto snap-x">
            {blog.posts.map((post) => {
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
                  <Link
                    href={{ pathname: '/tags', query: { tag: tag.name } }}
                    // href="/tags/[tag]" as={`/tags/${tag.name}`}
                  >
                    <a
                      className={`inline-block rounded-full px-3 py-2 text-center align-middle bg-btn border-red-500 group-hover:border-btn-hover group-hover:bg-btn-hover border text-btn text-xs font-semibold leading-none`}
                    >
                      <p title={tag.name}>{tag.name}</p>
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

  // await generateRssFeed(blog);

  return {
    props: {
      blog,
    },
  };
};
