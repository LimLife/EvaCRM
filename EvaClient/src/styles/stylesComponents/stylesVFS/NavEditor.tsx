import { navEditor } from './NavEditor.css';
import React from 'react';

export interface INavEditorProps extends React.HTMLAttributes<HTMLElement>
{
    className?: string;
}

const NavEditor: React.FC<INavEditorProps> = ({ className = '', ...props }) => (
    <nav className={`${navEditor} ${className}`} {...props} />
);

export default NavEditor;