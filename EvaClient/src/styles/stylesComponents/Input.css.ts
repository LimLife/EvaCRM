import { style } from '@vanilla-extract/css';

export const input = style({
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    selectors: {
        '&::placeholder': {
            color: 'black',
        },
    },
}); 