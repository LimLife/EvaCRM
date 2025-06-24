import React, { createContext } from "react";
import { CSSObject } from "styled-components";

type OverrideMap = Record<string, CSSObject>;

const StyleOverrideContext = createContext<OverrideMap>({});

export const StyleOverrideProvider: React.FC<{ overrides: OverrideMap, children: React.ReactNode }> = ({ overrides, children }) =>
{
    return (
        <StyleOverrideContext.Provider value={overrides}>
            {children}
        </StyleOverrideContext.Provider>
    );
};

export { StyleOverrideContext };
