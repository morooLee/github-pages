import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import getRandomPastelColor from './getRandomPastelColor';

export class Blog {
  private static readonly _POST_DIR = join(process.cwd(), 'src/_posts');
  private static _isInit: boolean = false;
  private static _posts: Post[] = [];
  private static _categories: Category[] = [];
  private static _tags: Tag[] = [];
  private static _series: Series[] = [];

  static get isInit() {
    return this._isInit;
  }
  static get posts() {
    return this._posts;
  }
  static get categories() {
    return this._categories;
  }

  static get tags() {
    return this._tags;
  }

  static get series() {
    return this._series;
  }

  static getBlog(): Blog {
    if (!this._isInit) {
      this.init();
    }
    return {
      posts: this._posts.sort((a, b) => {
        return new Date(a.updatedAt) > new Date(b.updatedAt)
          ? -1
          : new Date(a.updatedAt) < new Date(b.updatedAt)
          ? 1
          : 0;
      }),
      categories: this._categories,
      tags: this._tags,
      series: this._series,
    };
  }

  static init() {
    const fileNames = fs.readdirSync(this._POST_DIR);
    fileNames.forEach((fileName) => {
      const post = this.createPost(fileName);
      this._posts.push(post);
    });
    this._isInit = true;
  }
  private static createPost(fileName: string): Post {
    const prefix = fileName.replace(/\.(md|mdx)$/, '');
    const [id, slug] = prefix.split('_');
    const source = fs.readFileSync(join(this._POST_DIR, fileName), 'utf8');
    const { data, content } = matter(source) as any as {
      data: Frontmatter;
      content: string;
    };
    const coverBackgroundColor = getRandomPastelColor();

    this.addCategory(data.category, Number(id));
    data.tags.forEach((tag) => {
      this.addTag(tag, Number(id));
    });
    if (data.series) {
      this.addSeries(data.series, Number(id));
    }

    return {
      id: Number(id),
      slug,
      title: data.title,
      description: data.description,
      coverImageUrl: data.coverImageUrl,
      coverBackgroundColor,
      createdAt: new Date(data.createdAt).toLocaleDateString('ko-KR'),
      updatedAt: new Date(data.updatedAt).toLocaleDateString('ko-KR'),
      category: data.category,
      tags: data.tags,
      content,
      series: data.series,
    };
  }
  private static addCategory(
    {
      main: mainCategoryName,
      sub: subCategoryName,
    }: { main: string; sub: string },
    postId: number
  ) {
    const findMainCategory = this._categories.find((category) => {
      return category.name === mainCategoryName;
    });

    if (findMainCategory) {
      findMainCategory.postIds.push(postId);

      const findSubCategory = this._categories.find((category) => {
        return category.name === subCategoryName;
      });

      if (findSubCategory) {
        findSubCategory.postIds.push(postId);
      } else {
        const newSubCategory: Category = {
          name: subCategoryName,
          parent: mainCategoryName,
          children: [],
          postIds: [postId],
        };
        this._categories.push(newSubCategory);

        findMainCategory.postIds.push(postId);
        findMainCategory.children.push(subCategoryName);
      }
    } else {
      const newMainCategory: Category = {
        name: mainCategoryName,
        parent: null,
        children: [subCategoryName],
        postIds: [postId],
      };
      const newSubCategory: Category = {
        name: subCategoryName,
        parent: mainCategoryName,
        children: [],
        postIds: [postId],
      };
      this._categories.push(newMainCategory);
      this._categories.push(newSubCategory);
    }
  }
  private static addTag(tagName: string, postId: number) {
    const findTag = this._tags.find((tag) => {
      return tag.name === tagName;
    });

    if (findTag) {
      findTag.postIds.push(postId);
    } else {
      this._tags.push({ name: tagName, postIds: [postId] });
    }
  }
  private static addSeries(
    {
      name: seriesName,
      number: seriesNumber,
    }: { name: string; number: number },
    postId: number
  ) {
    const findSeries = this._series.find((series) => {
      return series.name === seriesName;
    });

    if (findSeries) {
      if (findSeries.postIds.length < seriesNumber) {
        findSeries.postIds.length = seriesNumber;
      }
      findSeries.postIds.splice(seriesNumber - 1, 1, postId);
    } else {
      const postIds = new Array(seriesNumber);
      postIds.splice(seriesNumber - 1, 1, postId);
      this._series.push({ name: seriesName, postIds });
    }
  }
}
