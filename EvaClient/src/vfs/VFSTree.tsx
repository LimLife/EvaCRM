import { useState } from 'react';
import { VFSFile } from '../types/VFSFile';
import { ULTreeList, TreeItem, FolderLabel, FileLabel } from "../styles/VFSUI";

export function VFSTree({ files, level }: { files: VFSFile[]; level: number })
{
    return (
        <ULTreeList>
            {files.map((file, index) => (
                <TreeNode key={`${file.name}-${index}`} file={file} level={level} />
            ))}
        </ULTreeList>
    );
}

function TreeNode({ file, level }: { file: VFSFile; level: number })
{
    const [open, setOpen] = useState(true);
    return (
        <TreeItem style={{ paddingLeft: `${level * 10}px` }}>
            {file.type === "folder" ? (
                <>
                    <FolderLabel onClick={() => setOpen(!open)}>
                        {open ? '📂' : '📁'} {file.name}
                    </FolderLabel>
                    {open && file.children && file.children.length > 0 && (
                        <ULTreeList>
                            {file.children.map((child, idx) => (
                                <TreeNode key={`${child.name}-${idx}`} file={child} level={level + 1} />
                            ))}
                        </ULTreeList>
                    )}
                </>
            ) : (
                <FileLabel>
                    📄 {file.name}
                </FileLabel>
            )}
        </TreeItem>
    );
}
