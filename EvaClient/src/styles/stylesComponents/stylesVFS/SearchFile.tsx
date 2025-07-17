import { searchFile } from './SearchFile.css';
import React from 'react';

export interface ISearchFileProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const SearchFile: React.FC<ISearchFileProps> = ({ className = '', ...props }) => (
    <div className={`${searchFile} ${className}`} {...props} />
);

export default SearchFile;