import { navBar } from './NavBar.css';
import React from 'react';

interface INavBarProps extends React.HTMLAttributes<HTMLElement>
{
    className?: string;
}

const NavBar: React.FC<INavBarProps> = ({ className = '', ...props }) => (
    <nav className={`${navBar} ${className}`} {...props} />
);

export default NavBar;