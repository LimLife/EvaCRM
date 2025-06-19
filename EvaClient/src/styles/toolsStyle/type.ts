import { CSSObject } from "styled-components";

export interface IOverrideProps
{
    overrideStyles?: CSSObject | ((base: CSSObject) => CSSObject);
}