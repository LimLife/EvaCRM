import { folderLabel } from './FolderLabel.css.ts';
import React from 'react';

export interface IFolderLabelProps extends React.HTMLAttributes<HTMLLabelElement>
{
    className?: string;
}

const FolderLabel: React.FC<IFolderLabelProps> = ({ className = '', ...props }) => (
    <label className={`${folderLabel} ${className}`} {...props} />
);

export default FolderLabel;