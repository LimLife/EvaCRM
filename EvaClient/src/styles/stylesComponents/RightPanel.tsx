import { rightPanel } from './RightPanel.css';
import React from 'react';

interface IRightPanelProps extends React.HTMLAttributes<HTMLDivElement>
{
    className?: string;
}

const RightPanel: React.FC<IRightPanelProps> = ({ className = '', ...props }) => (
    <div className={`${rightPanel} ${className}`} {...props} />
);

export default RightPanel;