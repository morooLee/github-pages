import React, { ReactNode } from 'react';
import MainMenu from '../../MainMenu';
import Footer from '../../Footer';
import Header from '../../Header';

interface Props {
  children: ReactNode;
  blog: Blog;
}
export default function MainLayout({ children, blog }: Props) {
  return (
    <>
      <Header blog={blog} />
      <div className="mt-16 w-full lg:w-[63.5rem] lg:mx-auto 2xl:w-[68rem] flex flex-col">
        <div className="hidden lg:block fixed w-full mx-auto">
          <aside className="absolute w-full lg:w-62 lg:left-0 2xl:w-80 overflow-y-scroll scrollbar-hide">
            <MainMenu isExpand={true} blog={blog} />
          </aside>
        </div>
        <main className="w-full mx-auto lg:w-3xl lg:ml-auto lg:mr-0 pt-5">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
