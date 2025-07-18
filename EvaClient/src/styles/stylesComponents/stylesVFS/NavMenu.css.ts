import { style } from '@vanilla-extract/css';

export const navMenu = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
}); 