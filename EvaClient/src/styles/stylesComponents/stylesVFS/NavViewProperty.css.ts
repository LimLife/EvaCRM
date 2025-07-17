import { style } from '@vanilla-extract/css';

export const navViewProperty = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
}); 