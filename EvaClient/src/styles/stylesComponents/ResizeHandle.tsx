import { resizeHandle } from './ResizeHandle.css';
import React from 'react';

interface IResizeHandleProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
    onMouseDown?: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<IResizeHandleProps> = ({ className = '', ...props }) => (
    <div className={`${resizeHandle} ${className}`} {...props} />
);

export default ResizeHandle;