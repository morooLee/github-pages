import React, { useEffect, useState } from 'react';
import { Category, Post } from '../../lib/blog';
import CardSummary from '../CardSummary';
import CategoryList from './CategoryList';

interface Props {
  categories: Category[];
  posts: Post[];
}
export default function CategoriesCard({ categories, posts }: Props) {
  const [isFolding, handleFolding] = useState(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  useEffect(() => {
    const { matches } = matchMedia('screen and (min-width: 1024px)');
    if (!matches) {
      handleFolding(true);
    }
  }, []);

  return (
    <section className="w-full lg:w-62 2xl:w-80 bg-canvas border rounded-md p-5 divide-y">
      <CardSummary
        title="카테고리"
        isFolding={isFolding}
        toggleFolding={toggleFolding}
      />
      {!isFolding && (
        <nav className="mt-5 pt-2">
          {categories.map((category) => (
            <CategoryList
              key={category.name}
              category={category}
              posts={posts}
              isMain={true}
            />
          ))}
        </nav>
      )}
    </section>
  );
}
