import { ulTreeList } from './ULTreeList.css';
import React from 'react';

export interface IULTreeListProps extends React.HTMLAttributes<HTMLUListElement>
{
    className?: string;
}

const ULTreeList: React.FC<IULTreeListProps> = ({ className = '', ...props }) => (
    <ul className={`${ulTreeList} ${className}`} {...props} />
);

export default ULTreeList;