import React, { ReactNode, useEffect, useState } from 'react';
import MainAside from '../../MainAside';
import Footer from '../../Footer';
import Header from '../../Header';
import { BlogData, Frontmatter } from '../../../lib/blog';
import TocAside from '../../TocAside';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Media } from '../../Media';
import ScrollProgressBar from '../../ProgressBar';

interface Props {
  children: ReactNode;
  blog: BlogData;
  toc: MDXRemoteSerializeResult | undefined;
  frontmatter: Frontmatter;
}
export default function PostLayout({
  children,
  blog,
  toc,
  frontmatter,
}: Props) {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [onMobileMenu, setOnMobileMenu] = useState<boolean>(false);

  function handleResize() {
    if (window.innerHeight === innerHeight) {
      return;
    }

    setInnerHeight(window.innerHeight);
  }

  function handleMobileMenuOnclick() {
    setOnMobileMenu(!onMobileMenu);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setInnerHeight(window.innerHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 max-h-16 bg-header">
        <Header menuOnclick={handleMobileMenuOnclick} />
      </header>
      <ScrollProgressBar />
      <div className="mt-16 w-full lg:min-w-3xl lg:max-w-3xl lg:ml-auto xl:mx-auto">
        {onMobileMenu === true && (
          <div className="fixed w-full mx-auto">
            <Media lessThan="lg">
              <div className="fixed left-0 top-16 right-0 bottom-0 bg-black/20 backdrop-blur-sm overflow-hidden" />
            </Media>
            <aside
              style={
                innerHeight
                  ? { maxHeight: `calc(${innerHeight}px - 4rem)` }
                  : {}
              }
              className="absolute w-full lg:w-62 2xl:w-80 lg:-left-62 2xl:-left-80 overflow-y-scroll scrollbar-hide"
            >
              <MainAside blog={blog} frontmatter={frontmatter} />
            </aside>
          </div>
        )}
        <Media greaterThan="md">
          <div className="fixed w-full mx-auto">
            <Media lessThan="lg">
              <div className="fixed left-0 top-16 right-0 bottom-0 bg-black/20 backdrop-blur-sm overflow-hidden" />
            </Media>
            <aside
              style={
                innerHeight
                  ? { maxHeight: `calc(${innerHeight}px - 4rem)` }
                  : {}
              }
              className="absolute w-full lg:w-62 2xl:w-80 lg:-left-62 2xl:-left-80 overflow-y-scroll scrollbar-hide"
            >
              <MainAside blog={blog} frontmatter={frontmatter} />
            </aside>
          </div>
        </Media>
        <Media greaterThan="lg">
          <div className="fixed min-w-3xl max-w-3xl mx-auto">
            <aside className="absolute w-full lg:w-62 2xl:w-80 lg:-right-62 2xl:-right-80 h-aside overflow-y-scroll scrollbar-hide">
              <TocAside toc={toc} />
            </aside>
          </div>
        </Media>
        <div className="min-w-3xl max-w-3xl mx-auto">{children}</div>
      </div>
      <footer className="min-w-3xl max-w-3xl mx-auto lg:ml-auto lg:mr-0 xl:mx-auto  max-h-20">
        <Footer />
      </footer>
    </>
  );
}
