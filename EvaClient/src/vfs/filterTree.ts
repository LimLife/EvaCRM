import { VFSFile } from "../types/VFSFile";

export function filterTree(files: VFSFile[], query: string): VFSFile[]
{
    return files
        .map(file =>
        {
            if (file.type === 'folder' && file.children)
            {
                const filteredChildren = filterTree(file.children, query);
                if (filteredChildren.length > 0)
                {
                    return { ...file, children: filteredChildren };
                }
            }

            if (file.name.toLowerCase().includes(query))
            {
                return { ...file };
            }

            return null;
        })
        .filter((file): file is VFSFile => file !== null);
}
