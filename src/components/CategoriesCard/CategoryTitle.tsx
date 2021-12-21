import React from 'react';
import FoldingArrow from '../FoldingArrow';

interface Props {
  categoryTitle: string;
  isFolding: boolean;
  toggleFolding: () => void;
  isMain: boolean;
}
export default function CategoryTitle({
  categoryTitle,
  isFolding,
  toggleFolding,
  isMain,
}: Props) {
  return (
    <div className="w-full flex flex-row justify-between gap-5">
      <p
        className={`py-2 leading-none ${
          isMain ? 'text-xl font-bold' : 'text-base font-semibold'
        }`}
      >
        {categoryTitle}
      </p>
      <button onClick={toggleFolding} className="text-2xl leading-none">
        <FoldingArrow isFolding={isFolding} />
      </button>
    </div>
  );
}
