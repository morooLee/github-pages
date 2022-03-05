import React from 'react';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from 'react-icons/ri';
import Tistory from '../Tistory';

interface Props {
  className?: string;
}
export default function ContactList({ className }: Props) {
  return (
    <address className={className}>
      <ul className="list-none flex flex-row gap-1 items-center text-2xl">
        <li className="list-none text-icon">
          <a
            href="https://github.com/morooLee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill />
          </a>
        </li>
        <li className="list-none text-icon">
          <a
            href="https://www.linkedin.com/in/moroolee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiLinkedinBoxFill />
          </a>
        </li>
        <li className="list-none text-icon">
          <a href="mailto:moroo.lee@gmail.com">
            <RiMailFill />
          </a>
        </li>
        {/* <li className="list-none text-icon">
          <a
            href="https://tistory.moroo.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tistory className="text-xl" />
          </a>
        </li> */}
      </ul>
    </address>
  );
}
