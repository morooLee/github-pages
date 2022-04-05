import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactList from '../ContactList';

export default function Footer() {
  return (
    <footer className="w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem]">
      <div className="h-full lg:max-w-[63.5rem] 2xl:max-w-[68rem] flex flex-row justify-end items-center gap-3 mr-auto p-5">
        <ContactList />
        <p>@moroo</p>
        <Link href="/" as="/">
          <a className="h-10 w-10 cursor-pointer">
            <Image
              src="/assets/moroo.svg"
              alt="Moroo Logo"
              layout="responsive"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </a>
        </Link>
      </div>
    </footer>
  );
}
