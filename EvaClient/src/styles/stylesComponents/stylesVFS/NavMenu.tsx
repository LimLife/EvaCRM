import { navMenu } from './NavMenu.css';
import React from 'react';

export interface INavMenuProps extends React.HTMLAttributes<HTMLElement>
{
    className?: string;
}

const NavMenu: React.FC<INavMenuProps> = ({ className = '', ...props }) => (
    <nav className={`${navMenu} ${className}`} {...props} />
);

export default NavMenu;