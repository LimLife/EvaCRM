import { folders } from './Folders.css.ts';
import React from 'react';

export interface IFoldersProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const Folders: React.FC<IFoldersProps> = ({ className = '', ...props }) => (
    <div className={`${folders} ${className}`} {...props} />
);

export default Folders;