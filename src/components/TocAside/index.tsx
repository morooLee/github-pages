import React, { useState, MouseEvent } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { RiArrowUpCircleLine } from 'react-icons/ri';
import SectionSummary from '../SectionSummary';
import SectionContent from '../SectionContent';
import { TocLink } from './TocLink';
import { TocItem } from './TocItem';
import Adsense from '../Adsense';
import Anchor from '../MarkdownComponents/Anchor';

interface Props {
  toc?: MDXRemoteSerializeResult;
  activeHeadingId?: string;
}
export default function TocAside({ toc, activeHeadingId }: Props) {
  const [isFolding, handleFolding] = useState<boolean>(false);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  function handleOnClick(event: MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = event;

    if (target === currentTarget) {
      toggleFolding();
    }
  }

  return (
    <div className="w-full lg:py-5 flex flex-col gap-2">
      <div className="bg-canvas border rounded-md">
        <SectionSummary
          isFolding={isFolding}
          toggleFolding={toggleFolding}
          onClick={handleOnClick}
        >
          <p
            className="text-accent text-xl font-semibold inline-block cursor-text"
            title="목차"
          >
            목차
          </p>
        </SectionSummary>
        <SectionContent isFolding={isFolding}>
          <div className="p-5">
            <a href="#" className="group inline-block">
              <RiArrowUpCircleLine className="inline-block text-2xl group-hover:text-link-accent" />
              <span className="inline-block ml-1 align-middle group-hover:underline group-hover:text-link-accent">
                맨위로
              </span>
            </a>
            {toc ? (
              <MDXRemote
                {...toc}
                components={{
                  a: (props: any) => (
                    <TocLink
                      className={`${props.className} ${
                        `#${activeHeadingId}` === props.href ? 'active' : ''
                      }`}
                      href={props.href}
                      as={props.as}
                    >
                      {props.children}
                    </TocLink>
                  ),
                  li: TocItem,
                }}
              />
            ) : null}
          </div>
        </SectionContent>
      </div>
      {/* <section className="bg-canvas border rounded-md">
        <SectionSummary isFolding={false}>
          <p className="text-accent text-xl font-semibold inline-block cursor-text">
            AD
          </p>
        </SectionSummary>
        <SectionContent isFolding={false}>
          <div className="p-5">
            <Adsense adClient="ca-pub-5229752344777211" adSlot={9218864958} />
          </div>
        </SectionContent>
      </section> */}
    </div>
  );
}
