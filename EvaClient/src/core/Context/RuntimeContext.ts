import { createContext, useContext } from 'react';
import Runtime from '../IRuntime';


export const RuntimeContext = createContext<Runtime | null>(null);

export const useRuntime = (): Runtime =>
{
    const ctx = useContext(RuntimeContext);
    if (!ctx) throw new Error("RuntimeContext not found");
    return ctx;
};
