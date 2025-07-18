import { useCallback, useState } from 'react';
import type { VFSFile } from '../../types/VFSFile';
import { useVFS } from './useVFS';
export function useVfsRead()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [files, setFiles] = useState<VFSFile[]>([]);
    const fs = useVFS();
    const readVfsFiles = useCallback((folderPath: string): Promise<VFSFile[]> =>
    {
        setLoading(true);
        setError(null);

        return new Promise((resolve, reject) =>
        {
            fs.readdir(folderPath, (err, files) =>
            {
                if (err || !files) return reject(err);

                const fileReadPromises = files.map((fileName) =>
                {
                    const fullPath = `${folderPath}/${fileName}`;
                    return new Promise<VFSFile>((res) =>
                    {
                        fs.readFile(fullPath, 'utf8', (err, data) =>
                        {
                            res({
                                name: fileName,
                                path: fullPath,
                                content: data ?? ''
                            });

                        });
                    });
                });
                Promise.all(fileReadPromises)
                    .then(resolve =>
                    {
                        try
                        {
                            console.log(resolve, "Files");
                            setFiles(resolve);
                            setLoading(false);
                        }
                        catch (e)
                        {
                            setError(e as Error);
                        }
                    })
                    .catch(reject);

            });
        });
    }, []);

    return { readVfsFiles, loading, error, files };
}
