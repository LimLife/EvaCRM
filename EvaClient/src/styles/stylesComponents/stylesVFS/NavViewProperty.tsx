import { navViewProperty } from './NavViewProperty.css';
import React from 'react';

export interface INavViewPropertyProps extends React.HTMLAttributes<HTMLElement>
{
    className?: string;
}

const NavViewProperty: React.FC<INavViewPropertyProps> = ({ className = '', ...props }) => (
    <nav className={`${navViewProperty} ${className}`} {...props} />
);

export default NavViewProperty;