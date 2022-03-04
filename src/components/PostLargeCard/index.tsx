import React from 'react';
import Link from 'next/link';
import { RiArrowRightSLine, RiCalendar2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import PostCoverImage from '../PostCoverImage';

interface Props {
  post: Post;
}
export default function PostLargeCard({ post }: Props) {
  const { query } = useRouter();

  return (
    <div className="w-full bg-btn rounded-md border p-5">
      <PostCoverImage
        title={post.title}
        coverImageUrl={post.coverImageUrl}
        coverBackgroundColor={post.coverBackgroundColor}
      />
      <div className="mt-8 text-lg font-semibold">
        <Link
          href="/categories/[main]"
          as={`/categories/${post.category.main}`}
        >
          <a className="inline-block">
            <p>{post.category.main}</p>
          </a>
        </Link>
        <RiArrowRightSLine className="mx-1 inline-block" />
        <Link
          href="/categories/[main]/[sub]"
          as={`/categories/${post.category.main}/${post.category.sub}`}
        >
          <a className="inline-block">
            <p>{post.category.sub}</p>
          </a>
        </Link>
      </div>
      {query.slug === post.slug ? (
        <h1 className="py-2 text-4xl font-bold">{post.title}</h1>
      ) : (
        <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
          <a className="inline-block py-2 text-4xl font-bold">
            <p>{post.title}</p>
          </a>
        </Link>
      )}

      <div className="flex flex-row items-center gap-3">
        {/* <RiCalendar2Line className="text-lg" /> */}
        <div className="flex flex-row items-center gap-1">
          <RiCalendar2Line className="text-lg" />
          <label className="text-md" title="포스트 작성일">
            포스트 생성일 :
          </label>
          {/* <RiCalendar2Line className="text-lg" /> */}
          <p className="text-md font-semibold" title={post.createdAt}>
            {post.createdAt}
          </p>
        </div>
        <div>|</div>
        <div className="flex flex-row items-center gap-1">
          <RiCalendar2Line className="text-lg" />
          <label className="text-md" title="최근 수정일">
            최근 수정일 :
          </label>
          {/* <RiCalendar2Line className="text-lg" /> */}
          <p className="text-md font-semibold" title={post.updatedAt}>
            {post.updatedAt}
          </p>
        </div>
      </div>
      {post.tags.length > 0 ? (
        <div className="mt-5">
          <ul className="list-none flex flex-row flex-wrap gap-2">
            {post.tags.map((tag) => {
              return (
                <li key={tag}>
                  <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                    <a>
                      <p
                        className="rounded-full px-3 py-2 text-center align-middle bg-btn border-red-500 hover:border-btn-hover hover:bg-btn-hover border text-btn text-xs font-semibold leading-none"
                        title={tag}
                      >
                        {tag}
                      </p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {post.series ? (
        <div className="text-2xl text-right mt-5">
          <Link href="/series/[series]" as={`/series/${post.series.name}`}>
            <a className="inline-block font-bold">
              <p>{post.series.name}</p>
            </a>
          </Link>
          <p className="inline-block pl-2 font-thin">series</p>
        </div>
      ) : null}
    </div>
  );
}
