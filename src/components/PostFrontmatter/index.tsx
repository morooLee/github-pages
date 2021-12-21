import React from 'react';
import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Frontmatter } from '../../lib/blog';

interface Props {
  frontmatter: Frontmatter;
}
export default function PostFrontmatter({ frontmatter }: Props) {
  return (
    <>
      <div
        className="flex justify-center items-center min-w-[700px] max-w-[700px] min-h-[350px] max-h-[350px] mt-10 mb-14 mx-auto"
        style={{ backgroundColor: frontmatter.coverBackgroundColor }}
      >
        {frontmatter.coverImageUrl ? (
          <img
            src={frontmatter.coverImageUrl}
            width="700"
            height="350"
            alt={frontmatter.title}
            className="object-cover max-w-[700px] max-h-[350px]"
          />
        ) : (
          <span className="break-words text-center text-4xl text-black font-black">
            {frontmatter.title}
          </span>
        )}
      </div>
      <div className="text-lg font-semibold">
        <span>{frontmatter.mainCategory}</span>
        <RiArrowRightSLine className="mx-1 inline-block" />
        <span>{frontmatter.subCategory}</span>
      </div>
      <h1 className="py-2 text-4xl font-bold">{frontmatter.title}</h1>
      <div>
        <span>{frontmatter.date.toLocaleDateString()}</span>
      </div>
      {frontmatter.tags.length > 0 && (
        <div className="mt-5">
          <ul className="list-none flex flex-row flex-wrap gap-2">
            {frontmatter.tags.map((tag) => {
              return (
                <li key={tag} className="">
                  <Link href={`/tags/${encodeURIComponent(tag)}`}>
                    <a>
                      <p className="rounded-full px-3 py-2 text-center align-middle bg-btn border-red-500 hover:border-btn-hover hover:bg-btn-hover border text-btn text-xs font-semibold subpixel-antialiase leading-none">
                        #{tag}
                      </p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
