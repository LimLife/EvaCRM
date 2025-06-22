import { init } from '../core/init';
import { runtime } from '../core/runtime';
const type = import.meta.env.VITE_URL_TYPE;
export const loadModuleLazy = async (moduleName: string) =>
{
    const module = (await import(`${type}/${moduleName}`)) as React.FC;
    const { Component: Component } = init(runtime, module);
    return {
        default: Component,
    };
};

