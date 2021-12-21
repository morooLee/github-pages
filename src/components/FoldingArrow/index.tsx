import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface Props {
  isFolding: boolean;
}
export default function FoldingArrow({ isFolding }: Props) {
  return isFolding ? <RiArrowUpSLine /> : <RiArrowDownSLine />;
}
