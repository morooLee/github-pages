import fs from 'fs';
import { Feed } from 'feed';
import { join } from 'path';
import compiledSource from './compiledSource';
import { marked } from 'marked';
import emoji from 'node-emoji';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import createSVGCoverImage from './createSVGCoverImage';

export function generateRssFeed(blog: Blog) {
  const date = new Date();
  const author = {
    name: 'moroo',
    email: 'moroo.lee@gmail.com',
    link: 'https://blog.moroo.dev/profile',
  };

  const mainCategories = blog.categories.filter(
    ({ parent }) => parent === null
  );

  // mainCategories.forEach((mainCategory) => {
  //   const feed = new Feed({
  //     title: 'Moroo Blog',
  //     description: 'Software QA 및 테스트 자동화에 대한 이야기',
  //     id: 'https://blog.moroo.dev',
  //     link: 'https://blog.moroo.dev',
  //     language: 'ko-KR',
  //     image: 'https://blog.moroo.dev/assets/cover_image.jpg',
  //     favicon: 'https://blog.moroo.dev/assets/favicon.png',
  //     copyright: `All rights reserved ${date.getFullYear()}, Moroo`,
  //     updated: date,
  //     generator: 'Feed for Node.js',
  //     feedLinks: {
  //       rss2: 'https://blog.moroo.dev/rss/feed.xml',
  //       json: 'https://blog.moroo.dev/rss/feed.json',
  //       atom: 'https://blog.moroo.dev/rss/atom.xml',
  //     },
  //     author,
  //   });
  // });

  const feed = new Feed({
    title: 'Moroo Blog',
    description: 'Software QA 및 테스트 자동화에 대한 이야기',
    id: 'https://blog.moroo.dev',
    link: 'https://blog.moroo.dev',
    language: 'ko-KR',
    image: 'https://blog.moroo.dev/assets/cover_image.jpg',
    favicon: 'https://blog.moroo.dev/assets/favicon.png',
    copyright: `All rights reserved ${date.getFullYear()}, Moroo`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: 'https://blog.moroo.dev/rss/feed.xml',
      json: 'https://blog.moroo.dev/rss/feed.json',
      atom: 'https://blog.moroo.dev/rss/atom.xml',
    },
    author,
  });

  feed.addCategory('Tech');
  feed.addCategory('Technology');
  feed.addCategory('IT');

  for (const category of blog.categories) {
    feed.addCategory(category.name);
  }

  for (const post of blog.posts) {
    marked.setOptions({
      highlight: function (code, lang) {
        loadLanguages([lang]);
        return Prism.highlight(code, Prism.languages[lang], lang);
      },
    });

    const replacer = (match: string) => {
      if (match.startsWith('`') && match.endsWith('`')) {
        return match;
      } else {
        return emoji.emojify(match);
      }
    };
    const markdown = post.content.replace(/(.:[^:]+:.)/g, replacer);
    const html = marked.parse(markdown);

    const url = decodeURI(`https://blog.moroo.dev/posts/${post.slug}`);
    const description = post.description;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      // description,
      content: html,
      author: [author],
      date: new Date(post.updatedAt),
      image:
        post.coverImageUrl ??
        createSVGCoverImage({
          isLarge: true,
          title: post.title,
          coverBackgroundColor: post.coverBackgroundColor,
        }),
      category: [
        {
          name: 'Tech',
          domain: 'https://blog.moroo.dev/categories',
        },
        {
          name: 'Technology',
          domain: 'https://blog.moroo.dev/categories',
        },
        {
          name: 'IT',
          domain: 'https://blog.moroo.dev/categories',
        },
        {
          name: post.category.main,
          domain: decodeURI(
            `https://blog.moroo.dev/categories/${post.category.main}`
          ),
        },
        {
          name: post.category.sub,
          domain: decodeURI(
            `https://blog.moroo.dev/categories/${post.category.main}/${post.category.sub}`
          ),
        },
      ],
    });
  }

  // blog.posts.forEach((post) => {
  //   const url = `https://blog.moroo.dev/posts/${post.slug}`;
  //   const description =
  //     post.description ?? post.content.split('\n').slice(0, 9).join('\n');

  //   feed.addItem({
  //     title: post.title,
  //     id: url,
  //     link: url,
  //     description,
  //     content: post.content,
  //     author: [author],
  //     contributor: [author],
  //     date: new Date(post.updatedAt),
  //     image: post.coverImageUrl ?? undefined,
  //   });
  // });

  fs.mkdirSync(join(process.cwd(), 'public/rss'), { recursive: true });
  fs.writeFileSync(join(process.cwd(), 'public/rss/feed.xml'), feed.rss2());
  fs.writeFileSync(join(process.cwd(), 'public/rss/atom.xml'), feed.atom1());
  fs.writeFileSync(join(process.cwd(), 'public/rss/feed.json'), feed.json1());
}
