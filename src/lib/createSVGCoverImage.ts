import svgToMiniDataURI from 'mini-svg-data-uri';
import getRandomPastelColor from './getRandomPastelColor';

const LARGE_WIDTH = 686;
const LARGE_HEIGHT = 361;
const DEFAULT_WIDTH = 246;
const DEFAULT_HEIGHT = 129;

interface Options {
  isLarge: boolean;
  title: string;
  coverBackgroundColor?: string;
}
export default function createSVGCoverImage(options: Options) {
  const { isLarge, title, coverBackgroundColor } = options;
  const fontSizeForRem = isLarge ? 2.25 : 0.875;
  const width = isLarge ? LARGE_WIDTH : DEFAULT_WIDTH;
  const height = isLarge ? LARGE_HEIGHT : DEFAULT_HEIGHT;
  const words = title.split(' ');
  const coverWords: string[] = [];

  words.reduce((pre: string, cur: string, index, array) => {
    const merge = (pre ? pre + ' ' : '') + cur;

    if (merge.length > 16) {
      coverWords.push(pre + ' ');
      if (array.length - 1 === index) {
        coverWords.push(cur);
      }
      return cur;
    } else {
      if (array.length - 1 === index) {
        coverWords.push(merge);
      }
      return merge;
    }
  }, '');

  const textSpanList = coverWords.map((word, index, array) => {
    const isEven = array.length % 2 === 0;
    const middleIndex = Math.ceil(array.length / 2) - 1;
    let dy = 0;

    if (isEven) {
      switch (-(middleIndex - index)) {
        case 0: {
          dy = -(fontSizeForRem / 2);
          break;
        }
        case 1: {
          dy = fontSizeForRem / 2;
          break;
        }
        default: {
          dy = -(middleIndex - index) * fontSizeForRem;
        }
      }
    } else {
      dy = -(middleIndex - index) * fontSizeForRem;
    }
    return `<tspan x="50%" y="50%" dy="${
      dy + 'rem'
    }" text-anchor="middle" alignment-baseline="middle">${word}</tspan>`;
  });

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${width} ${height}"><rect x="0" y="0" rx="6" ry="6" width="${width}" height="${height}" fill="${
    coverBackgroundColor ?? getRandomPastelColor()
  }" stroke-width="1"></rect><text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="${
    isLarge ? '2.25rem' : '0.875rem'
  }" font-weight="${isLarge ? '900' : '700'}">${textSpanList.join(
    ''
  )}</text></svg>`;
  return svgToMiniDataURI(svg);
}
