import React, { ReactNode } from 'react';
import { useActiveHeadingContext } from '../../lib/ActiveHeadingContext';

interface Props {
  href: string;
  children: ReactNode;
}
export function TocLink({ href, children }: Props) {
  const [activeHeadingId] = useActiveHeadingContext();

  return (
    <a href={href}>
      <p
        className={`truncate subpixel-antialiased${
          activeHeadingId === href.replace('#', '')
            ? ' text-accent font-semibold'
            : ''
        }`}
      >
        {children}
      </p>
    </a>
  );
}
