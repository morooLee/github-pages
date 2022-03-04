import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Table({ children }: Props) {
  return (
    <div className="overflow-y-auto">
      <table>{children}</table>
    </div>
  );
}
