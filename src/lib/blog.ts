import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface Frontmatter {
  title: string;
  slug: string;
  date: Date;
  category: string;
  subCategory: string;
  tags: string[];
  series: string | null;
}
export interface Post {
  frontmatter: Frontmatter;
  content: string;
}

export default class Blog {
  static postsDirectory = join(process.cwd(), 'src/_posts');
  static categories = new Set<string>();
  static tags = new Set<string>();
  static posts: Post[] = [];
  static isInit = false;

  static init() {
    if (Blog.isInit) {
      return;
    }

    Date.prototype.toJSON;
    Blog.posts = [...Blog.getAllPosts()];
    Blog.posts.forEach(({ frontmatter, content }) => {
      if (frontmatter.category) {
        Blog.categories.add(frontmatter.category);
      }
      Blog.tags.forEach((tag) => {
        Blog.tags.add(tag);
      });
    });
    Blog.isInit = true;
  }
  static getAllPosts() {
    const fileNames = fs.readdirSync(Blog.postsDirectory);
    return (
      fileNames
        .map((fileName) => Blog.getPostByFileName(fileName))
        // sort posts by date in descending order
        .sort((post1, post2) =>
          post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
        )
    );
  }
  static getPostByFileName(fileName: string) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = join(Blog.postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: {
        title: data.title,
        slug,
        date: new Date(data.date),
        category: data.category,
        subCategory: data.subCategory,
        tags: [...data.tags],
        series: data.series || null,
      },
      content,
    } as Post;
  }
  static getPost(slug: string) {
    return Blog.posts.find((post) => post.frontmatter.slug === slug);
  }
}
