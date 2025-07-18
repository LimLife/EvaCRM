import { container } from './Container.css';
import React from 'react';

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const Container: React.FC<IContainerProps> = ({ className = '', ...props }) => (
    <div className={`${container} ${className}`} {...props} />
);

export default Container;