import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactList from '../ContactList';

export default function Footer() {
  return (
    <div className="h-full flex flex-row justify-end items-center gap-3 mx-5 py-5">
      <ContactList />
      <p>@moroo</p>
      <Link href="/">
        <a className="h-10 w-10 relative cursor-pointer">
          <Image src="/moroo.png" alt="Moroo Logo" layout="fill" />
        </a>
      </Link>
    </div>
  );
}
