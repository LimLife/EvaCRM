import { init } from '../core/init';
import { runtime } from '../core/runtime';

export const loadModuleLazy = async (moduleName: string) =>
{
    const module = (await import(`https://localhost:3000/${moduleName}`)) as React.FC;
    const { Component: Component } = init(runtime, module);
    return {
        default: Component,
    };
};

