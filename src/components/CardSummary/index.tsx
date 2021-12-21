import React, { ReactNode } from 'react';
import FoldingArrow from '../FoldingArrow';

interface Props {
  title?: string;
  isFolding: boolean;
  toggleFolding: () => void;
  className?: string;
  children?: ReactNode;
}

export default function CardSummary({
  title,
  isFolding,
  toggleFolding,
  className,
  children,
}: Props) {
  return (
    <div className={className || 'w-full flex flex-row justify-between'}>
      {title && (
        <p className="text-accent text-xl font-semibold inline-block">
          {title}
        </p>
      )}
      {children}
      <button onClick={toggleFolding} className="inline-block text-2xl">
        <FoldingArrow isFolding={isFolding} />
      </button>
    </div>
  );
}
