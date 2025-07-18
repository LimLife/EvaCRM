import { createContext, useEffect, useState, ReactNode } from 'react';
import * as BrowserFS from 'browserfs';
import FSModule from "browserfs/dist/node/core/FS"


interface VFSProviderProps
{
    children: ReactNode;
}
export const VFSContext = createContext<FSModule | null>(null);

export function VFSProvider({ children }: VFSProviderProps)
{
    const [fs, setFs] = useState<FSModule | null>(null);

    useEffect(() =>
    {
        BrowserFS.configure({ fs: 'InMemory', options: undefined }, (err) =>
        {
            if (err)
            {
                console.error('Error initializing BrowserFS', err);
                return;
            }
            const bfs = BrowserFS.BFSRequire('fs')
            setFs(bfs);
        });
    }, []);

    if (!fs)
    {
        return <div>Loading virtual file system...</div>;
    }

    return <VFSContext.Provider value={fs}>{children}</VFSContext.Provider>;
}

