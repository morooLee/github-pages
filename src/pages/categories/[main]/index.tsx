import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import MainLayout from '../../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import SubCategoryList from 'src/components/SubCategoryList';

interface Props {
  category: Category;
  posts: Post[];
  blog: Blog;
}
export default function MainCategories({ category, posts, blog }: Props) {
  const router = useRouter();
  const title = `Moroo's Blog | Main Category - ${category.name}`;
  // const description = `Moroo's Blog Main Category - [ ${category.name} ]`;
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
        <section>
          {/* <Location title={`Main Category - ${category.name}`}>
            {'Main Category - '}
            <mark>{`[ ${category.name} ]`}</mark>
          </Location> */}
          <Location title="Main Category" />
        </section>
        <section className="max-w-none px-5 pb-5">
          <SubCategoryList
            mainCategory={category}
            posts={posts}
            isAllFolding={false}
            hasLink={false}
          />
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

  const category = blog.categories.find(({ name }) => {
    return name === params.main;
  });

  const posts = blog.posts.filter((post) => {
    return post.category.main === params.main;
  });

  return {
    props: {
      category,
      posts,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.categories.map((category) => {
      return {
        params: {
          main: category.name,
        },
      };
    }),
    fallback: false,
  };
};
