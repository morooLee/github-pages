import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MarkdownComponents from '../MarkdownComponents';
import { useDarkModeContext } from 'src/lib/DarkModeContext';

interface Props {
  content: MDXRemoteSerializeResult;
}
export default function MDXContent({ content }: Props) {
  const [isDarkMode] = useDarkModeContext();

  return content ? (
    <MDXRemote {...content} components={MarkdownComponents} />
  ) : null;
}
