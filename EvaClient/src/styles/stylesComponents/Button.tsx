import { button } from './Button.css';
import React from 'react';

interface IButtonStyles extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    className?: string;
}

const Button: React.FC<IButtonStyles> = ({ className = '', ...props }) => (
    <button className={`${button} ${className}`} {...props} />
);

export default Button;