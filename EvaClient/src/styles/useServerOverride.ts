import { useContext } from "react";
import { CSSObject } from "styled-components";
import { StyleOverrideContext } from "./StyleOverrideContext";

export const useServerOverride = (componentName: string): CSSObject | ((base: CSSObject) => CSSObject) | undefined =>
{
    const ctx = useContext(StyleOverrideContext);
    return ctx[componentName];
};
