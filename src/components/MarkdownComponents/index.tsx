import React from 'react';
import Anchor from './Anchor';
import Button from './Button';
import Code from './Code';
import Table from './Table';

const MarkdownComponents = {
  code: (props: any) => <Code {...props} />,
  inlineCode: (props: any) => <Code {...props} />,
  table: (props: any) => <Table {...props} />,
  a: (props: any) => <Anchor {...props} />,
  button: (props: any) => <Button {...props} />,
};
export default MarkdownComponents;
