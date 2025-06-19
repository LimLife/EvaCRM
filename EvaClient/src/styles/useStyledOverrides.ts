import { useMemo } from "react";
import { CSSObject } from "styled-components";
import { applyOverrideStyles } from "./toolsStyle/applyOverrideStyles";

export const useStyledOverrides = (base: CSSObject, override?: CSSObject | ((base: CSSObject) => CSSObject)): CSSObject =>
{
    return useMemo(() => applyOverrideStyles(base, override), [base, override]);
};