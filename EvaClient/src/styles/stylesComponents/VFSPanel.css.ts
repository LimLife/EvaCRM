import { style } from '@vanilla-extract/css';

export const vfsPanel = style({
    height: '100%',
    width: 280,
    minWidth: 180,
    maxWidth: 400,
    background: '#23272e',
    borderRight: '1px solid #ccc',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
    overflow: 'auto',
});

export const vfsPanelCollapsed = style({
    transform: 'translateX(-100%)',
});

export const vfsPanelToggle = style({
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 3,
    background: '#2d323b',
    border: '2px solid #888',
    borderRadius: '0 4px 4px 0',
    width: 32,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 22,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transition: 'right 0.2s cubic-bezier(.4,0,.2,1), background 0.2s',
});

export const vfsPanelToggleCollapsed = style({
    right: -32,
    top: 20,
    borderRadius: '0 4px 4px 0',
    background: '#2d323b',
}); 