import React from 'react';
import { BlogData, Frontmatter } from '../../lib/blog';
import CategoriesCard from '../CategoriesCard';
import ProfileCard from '../ProfileCard';
import TagListCard from '../TagsCard';

interface Props {
  blog: BlogData;
  frontmatter: Frontmatter;
}
export default function MainAside({ blog, frontmatter }: Props) {
  return (
    <>
      <div className="w-full pt-2 lg:py-5 flex flex-col gap-2">
        <ProfileCard />
        <CategoriesCard categories={blog.categories} posts={blog.posts} />
        <TagListCard tags={blog.tags} currentTags={frontmatter.tags} />
      </div>
    </>
  );
}
