import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MarkdownStyledComponents from '../Markdown';

interface Props {
  source: MDXRemoteSerializeResult;
}
export default function PostContent({ source }: Props) {
  return source ? (
    <MDXRemote {...source} components={MarkdownStyledComponents} />
  ) : null;
}
