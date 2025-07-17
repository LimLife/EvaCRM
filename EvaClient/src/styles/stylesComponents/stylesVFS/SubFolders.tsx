import { subFolders } from './SubFolders.css';
import React from 'react';

export interface ISubFoldersProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const SubFolders: React.FC<ISubFoldersProps> = ({ className = '', ...props }) => (
    <div className={`${subFolders} ${className}`} {...props} />
);

export default SubFolders;