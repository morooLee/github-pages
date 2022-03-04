import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  as: string;
  className: string;
  children: ReactNode;
}
export function TocLink({ href, as, className, children }: Props) {
  function handleOnClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const hash = decodeURI(event.currentTarget.hash);
    document.querySelector(hash)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  return (
    <Link href={href} as={as}>
      <a
        onClick={handleOnClick}
        className={`${className} inline-block w-full pl-2 align-top text-muted`}
      >
        <p title={children as string} className="text-ellipsis overflow-hidden">
          {children}
        </p>
      </a>
    </Link>
  );
}
