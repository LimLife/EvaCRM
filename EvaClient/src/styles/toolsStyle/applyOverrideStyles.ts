import { CSSObject } from "styled-components";

export const applyOverrideStyles = (base: CSSObject, override?: CSSObject | ((base: CSSObject) => CSSObject)): CSSObject =>
{
    if (!override) return base;
    return typeof override === 'function' ? override(base) : { ...base, ...override };
}
