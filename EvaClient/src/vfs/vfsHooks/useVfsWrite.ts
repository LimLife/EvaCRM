import { useCallback, useState } from 'react';
import type { VFSFile } from '../../types/VFSFile';
import { useVFS } from './useVFS';
import * as BrowserFS from 'browserfs';

const path = BrowserFS.BFSRequire('path');

export function useVfsWrite()
{
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const fs = useVFS();

    const writeVfsFile = useCallback((file: VFSFile): Promise<void> =>
    {
        setSaving(true);
        setError(null);
        return new Promise((resolve, reject) =>
        {
            if (file.type === 'folder')
            {
                fs.mkdir(file.path, { recursive: true }, (err?: Error | null) =>
                {
                    if (err && (err as any).code !== 'EEXIST')
                    {
                        setError(err);
                        setSaving(false);
                        return reject(err);
                    }
                    setSaving(false);
                    resolve();
                });
            } else
            {
                const dir = path.dirname(file.path);

                fs.mkdir(dir, { recursive: true }, (mkErr?: Error | null) =>
                {
                    if (mkErr && (mkErr as any).code !== 'EEXIST')
                    {
                        setError(mkErr);
                        setSaving(false);
                        return reject(mkErr);
                    }

                    const cb = (err?: Error | null) =>
                    {
                        if (err)
                        {
                            setError(err);
                            setSaving(false);
                            reject(err);
                        } else
                        {
                            setSaving(false);
                            resolve();
                        }
                    };

                    fs.writeFile(file.name, file.content ?? '', { encoding: 'utf8' }, cb);
                });
            }
        });
    }, []);

    return { writeVfsFile, saving, error };
}
