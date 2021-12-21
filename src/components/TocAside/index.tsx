import React, { useState } from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { RiArrowUpCircleLine } from 'react-icons/ri';
import CardSummary from '../CardSummary';
import TocList from './TocList';
import ActiveHeadingProvider from '../../lib/ActiveHeadingContext';

interface Props {
  toc: MDXRemoteSerializeResult | undefined;
}
export default function TocAside({ toc }: Props) {
  const [isFolding, handleFolding] = useState(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  return (
    <div className="w-full pt-2 lg:py-5 flex flex-col gap-2">
      {toc && (
        <section className="w-full xl:w-62 2xl:w-80 bg-canvas border rounded-md p-5 divide-y">
          <CardSummary
            title="목차"
            isFolding={isFolding}
            toggleFolding={toggleFolding}
          />
          {!isFolding && (
            <div className="mt-5 pt-5">
              <a href="#" className="group">
                <div>
                  <RiArrowUpCircleLine className="inline-block text-2xl group-hover:text-link-accent" />
                  <span className="ml-1 align-middle group-hover:underline group-hover:text-link-accent">
                    맨위로
                  </span>
                </div>
              </a>
              <ActiveHeadingProvider>
                <TocList toc={toc} />
              </ActiveHeadingProvider>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
