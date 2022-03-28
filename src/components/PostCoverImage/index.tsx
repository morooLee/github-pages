import React from 'react';
import createSVGCoverImage from 'src/lib/createSVGCoverImage';

interface Props {
  isLarge: boolean;
  title: string;
  coverImageUrl: string;
  coverBackgroundColor?: string;
}

const LARGE_WIDTH = 686;
const LARGE_HEIGHT = 361;
const DEFAULT_WIDTH = 246;
const DEFAULT_HEIGHT = 129;

export default function PostCoverImage({
  isLarge,
  coverImageUrl,
  coverBackgroundColor,
  title,
}: Props) {
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

  return (
    <img
      src={coverImageUrl}
      alt={`${title} Cover Image`}
      className={`object-fill w-[${width}px] h-[${height}px] rounded-md`}
      width={width}
      height={height}
    />
  );
  // return coverImageUrl ? (
  //   <img
  //     src={coverImageUrl}
  //     alt={`${title} Cover Image`}
  //     className={`object-fill w-[${width}px] h-[${height}px] rounded-md`}
  //     width={width}
  //     height={height}
  //   />
  // ) : (
  //   <img
  //     src={createSVGCoverImage({ isLarge, title, coverBackgroundColor })}
  //     alt={`${title} Cover Image`}
  //     className={`object-fill w-[${width}px] h-[${height}px] rounded-md`}
  //     width={width}
  //     height={height}
  //   />
  // <svg
  //   width={width}
  //   height={height}
  //   xmlns="http://w3.org/2000/svg"
  //   version="1.1"
  //   viewBox={`0 0 ${width} ${height}`}
  // >
  //   <rect
  //     x="0"
  //     y="0"
  //     rx="6"
  //     ry="6"
  //     width={width}
  //     height={height}
  //     // width="246"
  //     // height="129"
  //     fill={coverBackgroundColor}
  //     strokeWidth="1"
  //   ></rect>
  //   <text
  //     x="50%"
  //     y="50%"
  //     textAnchor="middle"
  //     alignmentBaseline="middle"
  //     // fontSize="2.25rem"
  //     // fontWeight="900"
  //     // fill="#000000"
  //     className={`px-5 break-words text-center text-black ${
  //       isLarge ? 'text-4xl' : 'text-sm'
  //     } ${isLarge ? 'font-black' : 'font-bold'}`}
  //     // transform="translate(100, 100)"
  //   >
  //     {coverWords.map((word, index, array) => {
  //       const isEven = array.length % 2 === 0;
  //       const middleIndex = Math.ceil(array.length / 2) - 1;
  //       let dy = 0;

  //       if (isEven) {
  //         switch (-(middleIndex - index)) {
  //           case 0: {
  //             dy = -(fontSizeForRem / 2);
  //             break;
  //           }
  //           case 1: {
  //             dy = fontSizeForRem / 2;
  //             break;
  //           }
  //           default: {
  //             dy = -(middleIndex - index) * fontSizeForRem;
  //           }
  //         }
  //       } else {
  //         dy = -(middleIndex - index) * fontSizeForRem;
  //       }
  //       return (
  //         <tspan
  //           x="50%"
  //           y="50%"
  //           dy={dy + 'rem'}
  //           textAnchor="middle"
  //           alignmentBaseline="middle"
  //           key={word}
  //         >
  //           {word}
  //         </tspan>
  //       );
  //     })}
  //   </text>
  // </svg>

  // <div
  //   className="relative mx-auto border pb-[47.5%] rounded-md h-0 w-full"
  //   style={{
  //     backgroundColor: coverBackgroundColor,
  //   }}
  // >
  //   <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
  //     <span
  //       className={`px-5 break-words text-center text-black ${
  //         fontSize || 'text-4xl'
  //       } ${fontWeight || 'font-black'}`}
  //     >
  //       {title}
  //     </span>
  //   </div>
  // </div>
  // );
}
