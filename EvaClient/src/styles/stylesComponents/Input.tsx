import { input } from './Input.css';
import React from 'react';

interface IInputStyles extends React.InputHTMLAttributes<HTMLInputElement>
{
    className?: string;
}

const Input: React.FC<IInputStyles> = ({ className = '', ...props }) => (
    <input className={`${input} ${className}`} {...props} />
);

export default Input;