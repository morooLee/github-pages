import React from 'react';
import Link from 'next/link';
import { Post } from '../../lib/blog';
import { useRouter } from 'next/router';

interface Props {
  posts: Post[];
}
export default function PostList({ posts }: Props) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li
            key={post.frontmatter.slug}
            className={`ml-1 pl-3 border-l-2 ${
              slug === post.frontmatter.slug && 'border-red-500'
            }`}
          >
            <Link
              href="/posts/[slug]"
              as={`/posts/${post.frontmatter.slug}`}
              passHref
            >
              <a>
                <p
                  className={`py-1 mr-6 text-sm text-btn ${
                    slug === post.frontmatter.slug && 'font-bold'
                  } text-ellipsis subpixel-antialiase`}
                  title={post.frontmatter.title}
                >
                  {post.frontmatter.title}
                </p>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
