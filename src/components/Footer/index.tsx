import React from 'react';
import Link from 'next/link';
import ContactList from '../ContactList';

export default function Footer() {
  return (
    <footer className="w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem]">
      <div className="h-full lg:max-w-[63.5rem] 2xl:max-w-[68rem] flex flex-row justify-end items-center gap-3 mr-auto p-5">
        <ContactList />
        <p>@moroo</p>
        <Link href="/">
          <a className="h-10 w-10 relative cursor-pointer">
            <img src="/assets/moroo.png" alt="Moroo Logo" />
          </a>
        </Link>
      </div>
    </footer>
  );
}
