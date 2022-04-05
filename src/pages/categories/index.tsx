import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import MainLayout from '../../components/layouts/MainLayout';
import MainCategoryList from '../../components/MainCategoryList';
import Location from 'src/components/Location';
import SearchInput from 'src/components/SearchInput';
import FoldingArrow from 'src/components/FoldingArrow';
import SortingList from 'src/components/SortingList';

interface Props {
  blog: BlogData;
}
export default function Categories({ blog }: Props) {
  const router = useRouter();
  const title = 'Categories | Moroo Blog';
  // const description = "Moroo's Blog Categories";
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);

  const [searchCategories, setSearchCategories] = useState<Category[]>([
    ...blog.categories,
  ]);
  const [isAllFolding, setIsAllFolding] = useState<boolean>(false);

  function toggleAllFolding() {
    setIsAllFolding(!isAllFolding);
  }

  // function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value;
  //   if (value) {
  //     const findCategories = blog.categories.filter(({ name, postIds }) => {
  //       const categoryPosts = blog.posts.filter(({ id }) =>
  //         postIds.includes(id)
  //       );
  //       const findPosts = categoryPosts.filter(
  //         ({ title, content }) =>
  //           title.includes(value) || content.includes(value)
  //       );
  //       return name.includes(value) || findPosts.length > 0;
  //     });

  //     if (findCategories.length) {
  //       setSearchCategories([...findCategories]);
  //     } else {
  //       setSearchCategories([]);
  //     }
  //   } else {
  //     setSearchCategories([...blog.categories]);
  //   }
  // }

  useEffect(() => {
    setSearchCategories([...blog.categories]);
  }, [blog.categories]);

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
        <div>
          <Location title="Categories"></Location>
        </div>
        <div className="z-10 flex flex-wrap justify-between items-center gap-5 p-5 bg-canvas sticky top-16">
          <div className="grow">
            <SortingList
              defaultSortType={'posts'}
              useSortTypes={['posts', 'name']}
              data={searchCategories}
              handleDataSortingFunc={setSearchCategories}
            />
          </div>
          {/* <SearchInput
            placeholder="이름 또는 내용 검색..."
            dataList={blog.categories.map(({ name }) => {
              return {
                key: name,
                value: name,
                text: name,
              };
            })}
            onChange={onSearchChange}
          /> */}
          <div
            onClick={toggleAllFolding}
            className="ml-auto group hover:cursor-pointer"
          >
            <span className="inline-block text-sm group-hover:text-accent">
              {isAllFolding ? '모두 펼치기' : '모두 접기'}
            </span>
            <FoldingArrow
              isFolding={isAllFolding}
              className="inline-block text-2xl group-hover:text-accent"
            />
          </div>
        </div>
        <div className="max-w-none px-5 pb-5">
          <MainCategoryList
            categories={searchCategories}
            posts={blog.posts}
            isAllFolding={isAllFolding}
          />
        </div>
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
