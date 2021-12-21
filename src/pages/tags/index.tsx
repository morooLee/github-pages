import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Blog, { Category, Post } from '../../lib/blog';

interface CategoriesProps {
  posts: Post[];
  categories: Category[];
  tags: string[];
}
export default function Tags({ tags }: CategoriesProps) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <ul>
        {tags.map((tag) => {
          return (
            <li key={tag}>
              <p>{tag}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blog = Blog.getBlog();
  return {
    props: {
      ...blog,
    },
  };
};
