import { leftPanel } from './LeftPanel.css';
import React from 'react';

interface ILeftPanelProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const LeftPanel: React.FC<ILeftPanelProps> = ({ className = '', ...props }) => (
    <div className={`${leftPanel} ${className}`} {...props} />
);

export default LeftPanel;