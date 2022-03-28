import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import { RiMenuFill, RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import MainMenu from '../MainMenu';
import { Media } from '../Media';

interface Props {
  blog: Blog;
  currentPost?: Post;
}
export default function Header({ blog, currentPost }: Props) {
  const router = useRouter();

  const [isDarkMode, toggleDarkMode] = useDarkModeContext();
  const [onMobileMenu, setOnMobileMenu] = useState<boolean>(false);

  function handleMobileMenuOnclick() {
    setOnMobileMenu(!onMobileMenu);
  }

  useEffect(() => {
    function handleRouteChangeComplete() {
      setOnMobileMenu(false);
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    function handleResize() {
      const { matches } = window.matchMedia('screen and (min-width: 1024px)');
      if (matches) {
        setOnMobileMenu(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('resize', handleResize);
    };
  }, [router.events]);

  useEffect(() => {
    if (onMobileMenu) {
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }
  }, [onMobileMenu]);

  return (
    <>
      <header className="z-20 fixed top-0 left-0 right-0 max-h-16 bg-header">
        <div className="h-full w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] px-4 py-3 mx-auto flex flex-row items-center justify-between gap-4 bg-header text-header-logo text-base font-semibold">
          <Link href="/" as="/">
            <a className="h-10 w-10 justify-self-start relative cursor-pointer">
              <img src="/assets/moroo.png" alt="Moroo Logo" />
            </a>
          </Link>
          <nav className="hidden h-10 flex-auto justify-self-start sm:flex flex-row items-center gap-5">
            <Link href="/profile" as="/profile">
              <a
                className={`inline-block ${
                  router.pathname === '/profile'
                    ? 'text-header-logo'
                    : 'text-muted'
                }`}
              >
                <p title="PROFILE">PROFILE</p>
              </a>
            </Link>
            <Link href="/categories" as="/categories">
              <a
                className={`inline-block ${
                  router.pathname.startsWith('/categories')
                    ? 'text-header-logo'
                    : 'text-muted'
                }`}
              >
                <p title="CATEGORIES">CATEGORIES</p>
              </a>
            </Link>
            <Link href="/tags" as="/tags">
              <a
                className={`inline-block ${
                  router.pathname.startsWith('/tags')
                    ? 'text-header-logo'
                    : 'text-muted'
                }`}
              >
                <p title="TAGS">TAGS</p>
              </a>
            </Link>
            <Link href="/series" as="/series">
              <a
                className={`inline-block ${
                  router.pathname.startsWith('/series')
                    ? 'text-header-logo'
                    : 'text-muted'
                }`}
              >
                <p title="SERIES">SERIES</p>
              </a>
            </Link>
            <Link href="/posts" as="/posts">
              <a
                className={`inline-block ${
                  router.pathname.startsWith('/posts')
                    ? 'text-header-logo'
                    : 'text-muted'
                }`}
              >
                <p title="POSTS">POSTS</p>
              </a>
            </Link>
          </nav>
          <div className="h-10 xl:w-62 2xl:w-80 pl-5 lg:px-5 flex flex-row justify-end text-2xl gap-5">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <RiMoonLine aria-label="Dark Mode" />
              ) : (
                <RiSunLine aria-label="Light Mode" />
              )}
            </button>
            <Media lessThan="lg">
              <button
                onClick={handleMobileMenuOnclick}
                className="text-4xl align-middle"
              >
                <RiMenuFill
                  className="hover:scale-100"
                  aria-label="Hamburger Menu"
                />
              </button>
            </Media>
          </div>
        </div>
      </header>
      {onMobileMenu ? (
        <div className="z-20 fixed w-full mx-auto">
          <div
            className="fixed left-0 top-16 right-0 bottom-0 bg-overlay/20 backdrop-blur-sm overflow-y-scroll overscroll-none"
            onClick={() => setOnMobileMenu(false)}
          />
          <div className="px-2 pt-3 mb-3 absolute w-full overflow-y-scroll overscroll-none">
            <MainMenu isExpand={false} blog={blog} currentPost={currentPost} />
          </div>
        </div>
      ) : null}
    </>
  );
}
