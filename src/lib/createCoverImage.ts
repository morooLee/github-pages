import fs from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import getRandomPastelColor from './getRandomPastelColor';
// import fetch from 'cross-fetch';

interface CreatePostCoverImageOptions {
  dir: string;
  title: string;
  coverImageUrl?: string | null;
  coverBackgroundColor?: string | null;
  series?: {
    name: string;
    number: number;
  } | null;
}

export default function createPostCoverImage(
  options: CreatePostCoverImageOptions
) {
  const rootDir = join(process.cwd(), 'public/assets/posts');
  const postDir = rootDir + '/' + options.dir;
  const path = postDir + '/cover_image.jpeg';

  if (fs.existsSync(path)) {
    console.log(`${options.title}'s cover image is exists`);
    return;
  }

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir);
  }

  if (options.coverImageUrl) {
    fetch(options.coverImageUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const buffer = Buffer.from(new Uint8Array(arrayBuffer));

        sharp({
          create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: options.coverBackgroundColor ?? '#ffffff',
          },
        })
          .composite([
            {
              input: buffer,
            },
          ])
          .jpeg()
          .toFile(path)
          .then(() => {
            console.log('RESULT', path);
          })
          .catch((error: any) => console.error(error));
      })
      .catch((error) => console.log('error:', error));
  } else {
    const svg = createSVG({
      title: options.title,
      series: options.series,
    });
    // console.log('SVG', svg);

    sharp(join(process.cwd(), 'public/assets/moroo.png'))
      .resize(180, 180)
      .toBuffer()
      .then((logo) => {
        sharp(Buffer.from(svg))
          .composite([
            {
              input: logo,
              top: 430,
              left: 1000,
            },
          ])
          .jpeg()
          .toFile(path)
          .then(() => {
            console.log('RESULT', path);
          })
          .catch((error: any) => console.error(error));
      });
  }
}

interface IOptions {
  title: string;
  series?: {
    name: string;
    number: number;
  } | null;
}

export function createSVG({ title, series }: IOptions) {
  const fontPixel = 60;
  const width = 1200;
  const height = 630;
  const words = title.split(' ');
  const lineBreaksForWords: string[] = [];

  if (series) {
    lineBreaksForWords.push(`${series.name} 시리즈`);
    lineBreaksForWords.push(`No. ${series.number}`);
    lineBreaksForWords.push('');
  }

  words.reduce((pre: string, cur: string, index, array) => {
    const merge = (pre ? pre + ' ' : '') + cur;

    if (merge.length > 16) {
      lineBreaksForWords.push(pre + ' ');
      if (array.length - 1 === index) {
        lineBreaksForWords.push(cur);
      }
      return cur;
    } else {
      if (array.length - 1 === index) {
        lineBreaksForWords.push(merge);
      }
      return merge;
    }
  }, '');

  const textSpanList = lineBreaksForWords.map((word, index, array) => {
    const isSeries = Boolean(series && index < 2);
    const isEven = array.length % 2 === 0;
    const middleIndex = Math.ceil(array.length / 2) - 1;
    const lineBreakIndex = -(middleIndex - index);
    const fontHeight = fontPixel;
    let dy = 0;

    if (isEven) {
      switch (true) {
        case lineBreakIndex < 0: {
          dy = -(fontHeight / 2) + lineBreakIndex * fontHeight;
          break;
        }
        case lineBreakIndex === 0: {
          dy = -(fontHeight / 2);
          break;
        }
        case lineBreakIndex === 1: {
          dy = fontHeight / 2;
          break;
        }
        case lineBreakIndex > 1: {
          dy = fontHeight / 2 + (lineBreakIndex - 1) * fontHeight;
          break;
        }
      }
    } else {
      dy = lineBreakIndex * fontHeight;
    }
    return `<tspan x="50%" y="50%" dy="${
      dy + 'px'
    }" text-anchor="middle" alignment-baseline="middle" class="${
      isSeries ? 'series' : 'title'
    } font-sans">${word}</tspan>`;
  });

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${width} ${height}">
    <style>
      .font-sans { font-family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"; }
      .title { fill: #21262d; font-size: ${fontPixel}px; font-weight: 900;}
      .series { fill: #000000; font-size: ${fontPixel}px; font-weight: 900;}
    </style>
    <rect x="0" y="0" width="${width}" height="${height}" fill="${getRandomPastelColor()}"></rect>
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">${textSpanList.join(
      ''
    )}</text>
  </svg>
  `;
  return svg;
}
