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
  return (
    <div
      className="relative mx-auto border pb-[47.5%] rounded-md"
      style={{
        backgroundColor: coverImageUrl ? 'inherit' : coverBackgroundColor,
        width: '100%',
        paddingBottom: coverImageUrl ? '0px' : '47.5%',
      }}
    >
      {coverImageUrl ? (
        <img
          src={coverImageUrl}
          alt={title}
          className="object-fill max-w-full rounded-md"
        />
      ) : (
        <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span
            className={`break-words text-center text-black ${
              fontSize || 'text-4xl'
            } ${fontWeight || 'font-black'}`}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
