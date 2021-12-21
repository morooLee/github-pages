import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function ContactItem({ children }: Props) {
  return <li className="list-none text-icon">{children}</li>;
}
