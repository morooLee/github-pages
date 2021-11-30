import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface Post {
  title: string;
  date: string;
  category: string;
  tags: string[];
  series?: string;
  content: string;
}
const postsDirectory = join(process.cwd(), '_posts');

export function getPostBySlug(fileName: string) {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    category: data.category,
    tags: (data.tags as string)
      .split(';')
      .map((tag) => tag.trim())
      .filter((tag) => Boolean(tag)),
    series: data.series || undefined,
    content: content,
  } as Post;
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return (
    fileNames
      .map((fileName) => getPostBySlug(fileName))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}
