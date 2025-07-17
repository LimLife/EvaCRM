import { fileLabel } from './FileLabel.css.ts';
import React from 'react';

export interface IFileLabelProps extends React.HTMLAttributes<HTMLLabelElement>
{
    className?: string;
}

const FileLabel: React.FC<IFileLabelProps> = ({ className = '', ...props }) => (
    <label className={`${fileLabel} ${className}`} {...props} />
);

export default FileLabel;