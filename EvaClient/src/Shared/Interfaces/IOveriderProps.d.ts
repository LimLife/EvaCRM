import { CSSProperties } from 'styled-components';

declare global
{
    interface IOverrideProps extends CSSProperties
    {
        overrideStyles?: ((baseStyles: CSSProperties) => CSSProperties) | CSSProperties | CSSProperties;
    }
}

export { }