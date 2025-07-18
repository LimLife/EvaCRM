import { useEffect, useState } from 'react';
import { VFSTree } from './VFSTree';
import json from "../FackeData/fakeExplorer.json";
import { VFSFile } from '../types/VFSFile';
import { SearchFile } from "../styles/VFSUI";
import { Input } from "../styles/UI";
import { filterTree } from './filterTree';
function parseDates(file: any): VFSFile
{
    const parsed: VFSFile = {
        ...file,
        createdAt: file.createdAt ? new Date(file.createdAt) : undefined,
        modifiedAt: file.modifiedAt ? new Date(file.modifiedAt) : undefined,
        children: file.children?.map(parseDates),
    };
    return parsed;
}
export function VFSExplorer()
{
    /*
    const { files, readVfsTree, loading, error } = useVfsTree();

    useEffect(() =>
    {
        readVfsTree('/');
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;
    */
    const FakeData: VFSFile[] = json.map(parseDates);
    const [filteredTree, setFilteredTree] = useState<VFSFile[]>(FakeData);
    const [inputValue, setInputValue] = useState('');
    useEffect(() =>
    {
        if (inputValue.trim() === '')
        {
            setFilteredTree(FakeData);
        } else
        {
            const result = filterTree(FakeData, inputValue.trim().toLowerCase());
            setFilteredTree(result);
        }
    }, [inputValue]);
    return ( //Добавить обертку и настроить как мне нужно только это нужно сделать в 2ух места и тут как экспортируемое дерево и в самом редакторе
        <div>
            <SearchFile>
                <label aria-label='file-search' htmlFor="file-search">Folder</label>
                <Input id="file-search"
                    type="search"
                    value={inputValue}
                    placeholder="search file"
                    onChange={(e) => setInputValue(e.target.value)} />
            </SearchFile>
            <VFSTree files={filteredTree} level={0} />
        </div>
    );
}


