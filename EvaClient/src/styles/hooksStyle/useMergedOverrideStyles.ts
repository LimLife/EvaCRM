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

    const final = useStyledOverrides(base, (baseStyles) =>
    {
        let result = { ...baseStyles };

        const apply = (override?: CSSObject | ((b: CSSObject) => CSSObject)) =>
        {
            if (!override) return;
            try
            {
                if (typeof override === "function")
                {
                    const applied = override(result);
                    if (applied && typeof applied === "object")
                    {
                        result = { ...result, ...applied };
                    }
                } else if (typeof override === "object")
                {
                    result = { ...result, ...override };
                }
            } catch (err)
            {
                console.error(`Error applying override in ${componentName}:`, err);
            }
        };

        apply(serverOverride);
        apply(localOverride);

        return result;
    });

    return final;
};

