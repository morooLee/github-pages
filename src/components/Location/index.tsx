import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  children?: ReactNode;
}

export default function Location({ title, children }: Props) {
  const router = useRouter();
  const paths = router.asPath.split('/').slice(1);

  return (
    <>
      <nav className="px-5 flex flex-row font-semibold text-sm">
        <Link href="/" as="/">
          <a>
            <p title="home">HOME</p>
          </a>
        </Link>
        {paths.map((path, index, array) => {
          const link = array
            .slice(0, index + 1)
            .join('/')
            .split('#')[0];
          const pathName = path.split('#')[0];
          return pathName ? (
            <Link key={pathName} href={`/${link}`} as={`/${link}`}>
              <a className="before:content-['›'] before:text-muted before:mx-2">
                <p title={pathName} className="inline">
                  {pathName}
                </p>
              </a>
            </Link>
          ) : null;
        })}
      </nav>
      <p title={title} className="px-5 text-3xl font-extrabold">
        {children ? children : title}
      </p>
    </>
  );
}
