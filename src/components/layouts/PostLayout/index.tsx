import React, { ReactNode, useEffect, useRef, useState } from 'react';
import MainMenu from '../../MainMenu';
import Footer from '../../Footer';
import Header from '../../Header';
import TocAside from '../../TocAside';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Media } from '../../Media';
import ScrollProgressBar from '../../ScrollProgressBar';

interface Props {
  children: ReactNode;
  toc: MDXRemoteSerializeResult | undefined;
  blog: Blog;
  currentPost: Post;
}
export default function PostLayout({
  children,
  blog,
  toc,
  currentPost,
}: Props) {
  const intersectingListRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map()
  );
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const rootElement = document.getElementById('post-content');

    if (rootElement === null) {
      return;
    }

    const headingElements = Array.from(
      (rootElement ?? document).querySelectorAll('h1, h2, h3, h4, h5, h6')
    );

    const intersectingList = intersectingListRef.current;
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        intersectingList.set(entry.target.id, entry);
      });

      const visibleHeadings: IntersectionObserverEntry[] = [];
      intersectingList.forEach((value) => {
        if (value.isIntersecting) {
          visibleHeadings.push(value);
        }
      });

      if (visibleHeadings.length > 0) {
        setActiveHeadingId(visibleHeadings[0].target.id);
      }
    };

    const rem = Number(
      window
        .getComputedStyle(document.documentElement)
        .fontSize.replace('px', '')
    );

    const observer: IntersectionObserver = new IntersectionObserver(callback, {
      // root: postContentElement,
      rootMargin: `${-(rem * 4)}px 0px 0px 0px`,
      threshold: 1,
    });

    headingElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      intersectingList.clear();
    };
  }, [toc]);

  return (
    <>
      <Header blog={blog} currentPost={currentPost} />
      <ScrollProgressBar />
      <div className="mt-16 w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] flex flex-col">
        <div className="hidden lg:block fixed w-full mx-auto">
          <aside className="absolute w-full lg:w-62 lg:left-0 2xl:w-80 overflow-y-scroll scrollbar-hide">
            <MainMenu isExpand={true} blog={blog} currentPost={currentPost} />
          </aside>
        </div>
        <main
          id="main"
          className="max-w-screen mx-auto lg:w-3xl lg:ml-auto lg:mr-0 xl:mx-auto pt-5"
        >
          {children}
        </main>
        <Media
          greaterThan="lg"
          className="fixed lg:w-[79rem] lg:mx-auto xl:mx-auto 2xl:w-[88rem]"
        >
          <aside className="absolute w-full lg:w-62 lg:right-0 2xl:w-80 h-aside overflow-y-scroll scrollbar-hide">
            <TocAside toc={toc} activeHeadingId={activeHeadingId} />
          </aside>
        </Media>
      </div>
      <Footer />
    </>
  );
}
