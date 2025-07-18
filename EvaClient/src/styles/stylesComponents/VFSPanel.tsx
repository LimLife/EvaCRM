import React from 'react';
import { vfsPanel, vfsPanelCollapsed, vfsPanelToggle, vfsPanelToggleCollapsed } from './VFSPanel.css';

interface IVFSPanelProps extends React.HTMLAttributes<HTMLDivElement>
{
    collapsed?: boolean;
    onToggle?: () => void;
}

const VFSPanel: React.FC<IVFSPanelProps> = ({ collapsed = false, onToggle, children, className = '', ...props }) => (
    <div className={`${vfsPanel} ${collapsed ? vfsPanelCollapsed : ''} ${className}`} {...props}>
        {onToggle && (
            <div
                className={
                    `${vfsPanelToggle} ${collapsed ? vfsPanelToggleCollapsed : ''}`
                }
                onClick={onToggle}
                title={collapsed ? 'Показать VFS' : 'Скрыть VFS'}
                aria-label={collapsed ? 'Показать файловую панель' : 'Скрыть файловую панель'}
                tabIndex={0}
                role="button"
                style={{ outline: 'none' }}
            >
                {collapsed ? '⮞' : '⮜'}
            </div>
        )}
        {/* Контент панели только если не скрыта */}
        {!collapsed && children}
    </div>
);

export default VFSPanel; 