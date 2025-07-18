import { useCallback, useState } from 'react';
import type { VFSFile } from '../../types/VFSFile';
import { useVFS } from './useVFS';
import * as BrowserFS from 'browserfs';

const path = BrowserFS.BFSRequire('path');

function useVfsTree()
{
    const fs = useVFS();
    const [files, setFiles] = useState<VFSFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const readFolder = useCallback((folderPath: string): Promise<VFSFile> =>
    {
        return new Promise((resolve, reject) =>
        {
            fs.readdir(folderPath, (err, entries) =>
            {
                if (err || !entries) return reject(err);

                const promises = entries.map((entry) =>
                {
                    const fullPath = path.join(folderPath, entry);

                    return new Promise<VFSFile>((res, rej) =>
                    {
                        fs.stat(fullPath, (err, stats) =>
                        {
                            if (err || !stats) return rej(err);

                            if (stats.isDirectory())
                            {
                                readFolder(fullPath)
                                    .then((childrenTree) =>
                                    {
                                        res({
                                            name: entry,
                                            path: fullPath,
                                            type: 'folder',
                                            content: null,
                                            children: childrenTree.children ?? [],
                                        });
                                    })
                                    .catch(rej);
                            } else
                            {
                                res({
                                    name: entry,
                                    path: fullPath,
                                    type: 'file',
                                    content: null,
                                });
                            }
                        });
                    });
                });

                Promise.all(promises)
                    .then((children) =>
                    {
                        resolve({
                            name: folderPath === '/' ? '/' : path.basename(folderPath),
                            path: folderPath,
                            type: 'folder',
                            content: null,
                            children,
                        });
                    })
                    .catch(reject);
            });
        });
    }, [fs]);

    const readVfsTree = useCallback(async (root: string = '/') =>
    {
        setLoading(true);
        setError(null);

        try
        {
            const tree = await readFolder(root);
            setFiles([tree]);
        } catch (e)
        {
            setError(e as Error);
        } finally
        {
            setLoading(false);
        }
    }, [readFolder]);

    const readFileContent = useCallback((filePath: string): Promise<string> =>
    {
        return new Promise((resolve, reject) =>
        {
            fs.readFile(filePath, 'utf8', (err, data) =>
            {
                if (err) return reject(err);
                resolve(data ?? '');
            });
        });
    }, [fs]);

    return {
        files,
        readVfsTree,
        readFileContent,
        loading,
        error,
    };
}

export { useVfsTree }