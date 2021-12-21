import React, { SVGProps } from 'react';

export default function Tistory(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        style={{
          stroke: 'currentColor',
          fillRule: 'evenodd',
          fill: 'currentColor',
        }}
        d="M6.84 3.418a3.42 3.42 0 1 1-6.842.002 3.42 3.42 0 0 1 6.842-.002ZM15.418 3.418A3.42 3.42 0 0 1 12 6.84 3.42 3.42 0 0 1 12 0a3.42 3.42 0 0 1 3.418 3.418ZM15.418 12a3.42 3.42 0 0 1-6.836 0 3.42 3.42 0 0 1 6.836 0ZM15.418 20.582a3.42 3.42 0 1 1-6.838-.002 3.42 3.42 0 0 1 6.838.002ZM24 3.418a3.42 3.42 0 1 1-6.84.004A3.42 3.42 0 0 1 24 3.418Zm0 0"
      />
    </svg>
  );
}
