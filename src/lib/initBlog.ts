import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import getRandomPastelColor from './getRandomPastelColor';
import superjson from 'superjson';

const POSTS_BASE_PATH = join(process.cwd(), 'src/_posts');

export interface Blog {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
}
export interface Category {
  name: string;
  parent?: Category;
  sub: Category[];
  posts: Post[];
}
export interface Frontmatter {
  slug: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  coverBackgroundColor?: string;
  date: Date;
  category: {
    main: string;
    sub: string;
  };
  tags: string[];
}
export interface Post {
  frontmatter: Frontmatter;
  content: string;
  originalSource: string;
  category: {
    main: Category;
    sub: Category;
  };
  tags: Tag[];
}
export interface Tag {
  name: string;
  posts: Post[];
}

export default function initBlog(): Blog {
  const posts = initPosts();
  const tags = initTags(posts);
  const categories = initCategories(posts);

  return {
    posts,
    categories,
    tags,
  };
}

export function getPostByFileName(fileName: string) {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = join(POSTS_BASE_PATH, `${slug}.md`);
  const originalSource = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(originalSource) as any as {
    data: Frontmatter;
    content: string;
  };
  const coverBackgroundColor = getRandomPastelColor();

  return {
    frontmatter: {
      title: data.title,
      description: data.description,
      slug,
      coverImageUrl: data.coverImageUrl,
      coverBackgroundColor,
      date: new Date(data.date),
      category: {
        main: data.category.main,
        sub: data.category.sub,
      },
      tags: [...data.tags],
      // series: data.series || null,
    },
    content,
    originalSource,
  } as Post;
}

export function initPosts() {
  const fileNames = fs.readdirSync(POSTS_BASE_PATH);
  return (
    fileNames
      .map((fileName) => getPostByFileName(fileName))
      // sort posts by date in descending order
      .sort((post1, post2) =>
        post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
      )
  );
}

export function initCategories(posts: Post[]): Category[] {
  const newCategories: Category[] = [];

  posts.forEach((post) => {
    const newMainCategory: Category = {
      name: post.frontmatter.category.main,
      sub: [],
      posts: [post],
    };
    const newSubCategory: Category = {
      name: post.frontmatter.category.sub,
      parent: newMainCategory,
      sub: [],
      posts: [post],
    };
    newMainCategory.sub.push(newSubCategory);

    const findMainCategory = newCategories.find((mainCategory) => {
      return mainCategory.name === newMainCategory.name;
    });

    if (findMainCategory) {
      const findSubCategory = findMainCategory.sub.find((subCategory) => {
        return subCategory.name === newSubCategory.name;
      });

      if (findSubCategory) {
        const findPostInSubCategory = findSubCategory.posts.find(
          ({ frontmatter }) => {
            return frontmatter.slug === post.frontmatter.slug;
          }
        );

        if (!findPostInSubCategory) {
          post.category = {
            main: findMainCategory,
            sub: findSubCategory,
          };
          findSubCategory.posts.push(post);
        }
      } else {
        post.category = {
          main: findMainCategory,
          sub: newSubCategory,
        };
        findMainCategory.sub.push(newSubCategory);
      }
    } else {
      post.category = {
        main: newMainCategory,
        sub: newSubCategory,
      };
      newCategories.push(newMainCategory);
    }
  });

  return newCategories;
}

export function initTags(posts: Post[]): Tag[] {
  const newTags: Tag[] = [];

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      const findTag = newTags.find(({ name }) => {
        return name === tag;
      });

      if (findTag) {
        const findPost = findTag.posts.find(({ frontmatter: { slug } }) => {
          return slug === post.frontmatter.slug;
        });
        if (!findPost) {
          post.tags = [];
          post.tags.push(findTag);
          findTag.posts.push(post);
        }
      } else {
        const newTag: Tag = {
          name: tag,
          posts: [post],
        };
        post.tags = [];
        post.tags.push(newTag);
        newTags.push(newTag);
      }
    });
  });

  newTags.forEach((tag) => {
    tag.posts.sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
  });

  return newTags;
}

export function writeJson(object: any) {
  const json = superjson.stringify(object);

  fs.writeFileSync(
    join(process.cwd(), 'public/blog_data.json'),
    superjson.stringify(object)
  );
}
