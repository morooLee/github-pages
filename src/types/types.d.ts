declare module 'public/blog.json' {
  const blog: Blog;
  export default blog;
}

interface Frontmatter {
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  coverImageUrl: string | null;
  category: {
    main: string;
    sub: string;
  };
  tags: string[];
  series: {
    name: string;
    number: number;
  } | null;
  published: boolean;
}

interface Tag {
  name: string;
  postIds: number[];
}
interface Series {
  name: string;
  postIds: number[];
}
interface Category {
  name: string;
  parent: string | null;
  children: string[];
  postIds: number[];
}
interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl: string | null;
  coverBackgroundColor: string;
  category: {
    main: string;
    sub: string;
  };
  tags: string[];
  series: { name: string; number: number } | null;
  published: boolean;
  content: string;
}
interface Blog {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  series: Series[];
}

type BlogDataType = Post | Tag | Category | Series;
