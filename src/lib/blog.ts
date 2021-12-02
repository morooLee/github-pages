import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogData {
  posts: Post[];
  categories: Category[];
  tags: string[];
}
export interface Category {
  name: string;
  parent?: Category;
  sub: Category[];
}
export interface Frontmatter {
  slug: string;
  title: string;
  date: Date;
  mainCategory: string;
  subCategory: string;
  tags: string[];
}
export interface Post {
  frontmatter: Frontmatter;
  content: string;
}

export default class Blog {
  private static _postsDirectory = join(process.cwd(), 'src/_posts');
  private static _categories: Category[] = [];
  private static _tags: string[] = [];
  private static _posts: Post[] = [];
  private static _isInit = false;

  static get categories() {
    return this._categories;
  }
  static get tags() {
    return this._tags;
  }
  static get posts() {
    return this._posts;
  }
  static get isInit() {
    return this._isInit;
  }
  static init() {
    if (Blog.isInit) {
      return;
    }

    // Date.prototype.toJSON;
    Blog._posts = [...Blog.getAllPosts()];
    Blog.posts.forEach(({ frontmatter, content }) => {
      Blog.addCategory(frontmatter.mainCategory, frontmatter.subCategory);
      frontmatter.tags.forEach((tag) => {
        Blog.addTag(tag);
      });
    });
    Blog._isInit = true;
  }

  private static getPostByFileName(fileName: string) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = join(Blog._postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: {
        title: data.title,
        slug,
        date: new Date(data.date),
        mainCategory: data.mainCategory,
        subCategory: data.subCategory,
        tags: [...data.tags],
        series: data.series || null,
      },
      content,
    } as Post;
  }
  private static addCategory(
    mainCategoryName: string,
    subCategoryName: string
  ) {
    const findMainCategory = Blog.categories.find(
      (category) => category.name === mainCategoryName
    );

    if (findMainCategory) {
      const findSubCategory = findMainCategory.sub.find(
        (subCategory) => subCategory.name === subCategoryName
      );
      if (!findSubCategory) {
        const newSubCategory: Category = {
          name: subCategoryName,
          parent: findMainCategory,
          sub: [],
        };
        findMainCategory.sub.push(newSubCategory);
      }
    } else {
      const newMainCategory: Category = {
        name: mainCategoryName,
        sub: [],
      };
      const newSubCategory: Category = {
        name: subCategoryName,
        parent: newMainCategory,
        sub: [],
      };
      newMainCategory.sub.push(newSubCategory);
      Blog._categories.push(newMainCategory);
    }
  }
  private static addTag(tag: string) {
    const findTag = Blog.tags.find((_tag) => _tag === tag);
    if (!findTag) {
      Blog._tags.push(tag);
    }
  }
  private static getAllPosts() {
    const fileNames = fs.readdirSync(Blog._postsDirectory);
    return (
      fileNames
        .map((fileName) => Blog.getPostByFileName(fileName))
        // sort posts by date in descending order
        .sort((post1, post2) =>
          post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
        )
    );
  }

  static getPost(slug: string) {
    if (!Blog.isInit) {
      Blog.init();
    }
    return Blog.posts.find((post) => post.frontmatter.slug === slug);
  }
  static getBlog() {
    if (!Blog.isInit) {
      Blog.init();
    }
    return {
      posts: [...Blog.posts],
      categories: [...Blog.categories],
      tags: [...Blog.tags],
    };
  }
}
