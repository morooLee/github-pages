import React, { useState } from 'react';
import { Category, Post } from '../../lib/blog';
import CategoryTitle from './CategoryTitle';
import PostList from './PostList';

interface Props {
  category: Category;
  posts: Post[];
  isMain: boolean;
}
export default function CategoryList({ category, posts, isMain }: Props) {
  const [isFolding, handleFolding] = useState(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  function filteringPosts(subCategoryName: string) {
    return posts.filter((post) => {
      return post.frontmatter.subCategory === subCategoryName;
    });
  }

  return (
    <ul
      className={`${
        isMain
          ? 'list-none flex flex-col'
          : 'list-none pl-2 lg:ml-1 lg:pl-1 2xl:ml-2 2xl:pl-2'
      }`}
    >
      <li key={category.name}>
        <CategoryTitle
          categoryTitle={category.name}
          isFolding={isFolding}
          toggleFolding={toggleFolding}
          isMain={isMain}
        />
        {!isFolding &&
          (category.sub.length > 0 ? (
            category.sub.map((subCategory) => {
              return (
                <CategoryList
                  key={subCategory.name}
                  category={subCategory}
                  posts={filteringPosts(subCategory.name)}
                  isMain={false}
                />
              );
            })
          ) : (
            <PostList posts={posts} />
          ))}
      </li>
    </ul>
  );
}
