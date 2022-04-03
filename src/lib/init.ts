import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import getRandomPastelColor from './getRandomPastelColor';
import { Blog } from './blog';
import { generateRssFeed } from './generateRssFeed';
import createSVGCoverImage from './createSVGCoverImage';
import sharp from 'sharp';
import svgToMiniDataURI from 'mini-svg-data-uri';
import { createBlogCoverImage } from './createCoverImage';

(() => {
  Blog.init();
  const blog = Blog.getBlog();

  fs.writeFileSync(
    join(process.cwd(), 'public/blog.json'),
    JSON.stringify(blog, null, 2)
  );

  createBlogCoverImage();
  generateRssFeed(blog);
})();

function createPost(postsDir: string, fileName: string): Post {
  const prefix = fileName.replace(/\.(md|mdx)$/, '');
  const [id, slug] = prefix.split('_');
  const source = fs.readFileSync(join(postsDir, fileName), 'utf8');
  const { data, content } = matter(source) as any as {
    data: Frontmatter;
    content: string;
  };
  const coverBackgroundColor = getRandomPastelColor();

  return {
    id: Number(id),
    slug,
    title: data.title,
    description: data.description!,
    coverImageUrl:
      data.coverImageUrl ??
      createSVGCoverImage({
        isLarge: true,
        title: data.title,
        coverBackgroundColor,
      }),
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    updatedAt: new Date(data.updatedAt).toLocaleDateString(),
    category: data.category,
    tags: data.tags,
    content,
    series: data.series,
    published: data.published,
  };
}
