import { useStyledOverrides } from "./useStyledOverrides";
import { useServerOverride } from "./useServerOverride";
import { CSSObject } from "styled-components";

export const useMergedOverrideStyles = (
    componentName: string,
    base: CSSObject,
    localOverride?: CSSObject | ((base: CSSObject) => CSSObject)
): CSSObject =>
{
    const serverOverride = useServerOverride(componentName);
    const merged = useStyledOverrides(
        base,
        (baseStyles) =>
        {
            let result = baseStyles;
            if (typeof serverOverride === "function") result = serverOverride(result);
            else if (serverOverride) result = { ...result, ...serverOverride };
            if (typeof localOverride === "function") result = localOverride(result);
            else if (localOverride) result = { ...result, ...localOverride };
            return result;
        }
    );
    return merged;
};
