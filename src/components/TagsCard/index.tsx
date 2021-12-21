import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CardSummary from '../CardSummary';

interface Props {
  tags: string[];
  currentTags: string[];
}
export default function TagListCard({ tags, currentTags }: Props) {
  const [isFolding, handleFolding] = useState(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  useEffect(() => {
    const { matches } = matchMedia('screen and (min-width: 1024px)');
    if (!matches) {
      handleFolding(true);
    }
  }, []);

  return (
    <section className="w-full xl:w-62 2xl:w-80 bg-canvas border rounded-md p-5 divide-y">
      <CardSummary
        title="태그 전체"
        isFolding={isFolding}
        toggleFolding={toggleFolding}
      />
      {!isFolding && (
        <ul className="list-none mt-5 pt-5 flex flex-row flex-wrap gap-2">
          {tags.map((tag) => {
            return (
              <li key={tag} className="">
                <Link href={`/tags/${encodeURIComponent(tag)}`}>
                  <a>
                    <p
                      className={`rounded-full px-3 py-2 text-center align-middle ${
                        currentTags.includes(tag)
                          ? 'bg-canvas border-red-500'
                          : 'bg-btn border-btn'
                      } hover:border-btn-hover hover:bg-btn-hover border text-btn text-xs font-semibold subpixel-antialiase leading-none`}
                    >
                      #{tag}
                    </p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
