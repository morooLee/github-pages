import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import { RiMenuFill, RiMoonLine, RiSunLine } from 'react-icons/ri';
import { Media } from '../Media';

interface Props {
  menuOnclick: () => void;
}
export default function Header({ menuOnclick }: Props) {
  const [isDarkMode, toggleDarkMode] = useDarkModeContext();

  return (
    <div className="h-full lg:max-w-content px-4 py-3 mx-auto flex flex-row items-center justify-items-stretch gap-4 bg-header text-header-logo text-base font-semibold">
      <Link href="/">
        <a className="h-10 w-10 justify-self-start relative cursor-pointer">
          <Image src="/moroo.png" alt="Moroo Logo" layout="fill" />
        </a>
      </Link>
      <nav className="h-10 flex-auto justify-self-start flex flex-row items-center gap-5">
        <Link href="/profile">
          <a>PROFILE</a>
        </Link>
        <Link href="/categories">
          <a>CATEGORIES</a>
        </Link>
        <Link href="/tags">
          <a>TAGS</a>
        </Link>
      </nav>
      <div className="h-10 xl:w-62 2xl:w-80 pl-5 lg:px-5 flex flex-row text-2xl gap-5">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <RiMoonLine /> : <RiSunLine />}
        </button>
        <Media lessThan="lg">
          <button onClick={menuOnclick} className="text-4xl">
            <RiMenuFill className="hover:scale-100" />
          </button>
        </Media>
      </div>
    </div>
  );
}
