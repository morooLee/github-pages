import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Blog, { Post } from '../../lib/blog';

interface CategoriesProps {
  posts: Post[];
}
export default function Tag({ posts }: CategoriesProps) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.frontmatter.slug}>
              <p>{post.frontmatter.title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  Blog.init();

  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const posts = Blog.posts.filter((post) => {
    return post.frontmatter.tags.includes(
      decodeURIComponent((params as any).tag)
    );
  });

  return {
    props: {
      posts: [...posts],
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  Blog.init();

  return {
    paths: Blog.tags.map((tag) => {
      return {
        params: {
          tag: encodeURIComponent(tag),
        },
      };
    }),
    fallback: false,
  };
};
