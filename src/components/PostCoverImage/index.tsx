import React from 'react';

interface Props {
  title: string;
  coverImageUrl: string | null;
  coverBackgroundColor?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
}
export default function PostCoverImage({
  coverImageUrl,
  coverBackgroundColor,
  title,
  fontSize,
  fontWeight,
}: Props) {
  return coverImageUrl ? (
    <img
      src={coverImageUrl}
      alt={title}
      className="object-fill w-full rounded-md"
    />
  ) : (
    <div
      className="relative mx-auto border pb-[47.5%] rounded-md h-0 w-full"
      style={{
        backgroundColor: coverBackgroundColor,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <span
          className={`px-5 break-words text-center text-black ${
            fontSize || 'text-4xl'
          } ${fontWeight || 'font-black'}`}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
