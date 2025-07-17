export interface VFSFile
{
    name: string;
    path: string;
    content?: string | null;
    size?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    type?: "file" | "folder";
    folderName?: string
    children?: VFSFile[];
}
/*
type VFSFile =
    | {
        name: string;
        path: string;
        type: 'file';
        content: string | null;
    }
    | {
        name: string;
        path: string;
        type: 'folder';
        content: null;
        children: VFSFile[];
    };
    */