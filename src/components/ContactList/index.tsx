import React from 'react';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from 'react-icons/ri';
import Tistory from '../Tistory';
import ContactItem from './ContactItem';

export default function ContactList() {
  return (
    <ul className="list-none flex flex-row gap-3 items-center text-2xl">
      <ContactItem>
        <a href="https://github.com/morooLee" target="_blank">
          <RiGithubFill />
        </a>
      </ContactItem>
      <ContactItem>
        <a href="https://www.linkedin.com/in/moroolee" target="_blank">
          <RiLinkedinBoxFill />
        </a>
      </ContactItem>
      <ContactItem>
        <a href="mailto:moroo.lee@gmail.com">
          <RiMailFill />
        </a>
      </ContactItem>
      <ContactItem>
        <a href="https://tistory.moroo.dev" target="_blank">
          <Tistory className="text-xl" />
        </a>
      </ContactItem>
    </ul>
  );
}
