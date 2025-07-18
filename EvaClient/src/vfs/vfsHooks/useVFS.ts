import { useContext } from "react";
import { VFSContext } from "../vfsProvider";
import { FSModule } from "browserfs/dist/node/core/FS";

export function useVFS(): FSModule
{
    const fs = useContext(VFSContext) as FSModule;
    if (!fs)
    {
        throw new Error('useVFS must be used within VFSProvider');
    }
    return fs;
}
