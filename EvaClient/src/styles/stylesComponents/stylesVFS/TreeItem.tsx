import { treeItem } from './TreeItem.css';
import React from 'react';

export interface ITreeItemProps extends React.HTMLAttributes<HTMLLIElement>
{
    className?: string;
}

const TreeItem: React.FC<ITreeItemProps> = ({ className = '', ...props }) => (
    <li className={`${treeItem} ${className}`} {...props} />
);

export default TreeItem;