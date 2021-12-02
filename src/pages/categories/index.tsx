import React from 'react';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import Script from 'next/script';
import { GetStaticProps, GetStaticPaths } from 'next';
import Blog, { Category, Frontmatter, Post } from '../../lib/blog';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

interface CategoriesProps {
  posts: Post[];
  categories: Category[];
  tags: string[];
}
export default function Categories({ categories }: CategoriesProps) {
  const router = useRouter();
  const { slug } = router.query;
  console.log(categories);

  return (
    <>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.name}>
              <p>{category.name}</p>
              {category.sub.length > 0 && (
                <ul>
                  {category.sub.map((subCategory) => (
                    <li key={subCategory.name}>{subCategory.name}</li>
                  ))}
                </ul>
              )}
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
