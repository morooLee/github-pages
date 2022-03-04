import React from 'react';
import Anchor from './Anchor';
import Code from './Code';
import Table from './Table';

const MarkdownComponents = {
  code: Code,
  inlineCode: Code,
  table: Table,
  a: Anchor,
};
export default MarkdownComponents;
