import { useRef, useCallback, useState } from "react";
import { Monaco } from "@monaco-editor/react";
import { addExtraLibFromPackage } from "./loadExtraLib";

export interface MonacoLibInfo
{
    packageName: string;
    nickName: string;
    path: string;
}

export function useMonacoLibs(monaco: Monaco | null)
{
    // Храним загруженные библиотеки и их информацию
    const loadedLibs = useRef<Set<string>>(new Set());
    const [libs, setLibs] = useState<MonacoLibInfo[]>([]);

    // Добавить библиотеку
    const addLib = useCallback(async (packageName: string) =>
    {
        if (!monaco) return;
        if (loadedLibs.current.has(packageName)) return;
        await addExtraLibFromPackage(monaco, packageName, loadedLibs.current);
        // Получаем псевдоним и путь из typeDeclarer (через registerTypeDefinition)
        // Для простоты: после загрузки ищем модель по uri и добавляем в список
        // (В реальном проекте лучше возвращать info из addExtraLibFromPackage)
        // Здесь просто обновим список
        setLibs(prev => [...prev, { packageName, nickName: packageName, path: `file:///node_modules/@types/${packageName}/` }]);
    }, [monaco]);

    // Удалить библиотеку
    const removeLib = useCallback((packageName: string) =>
    {
        loadedLibs.current.delete(packageName);
        setLibs(prev => prev.filter(lib => lib.packageName !== packageName));
        // Monaco API не поддерживает удаление extraLib напрямую, но можно удалить модель
        if (monaco)
        {
            const uri = monaco.Uri.parse(`file:///node_modules/@types/${packageName}/`);
            const model = monaco.editor.getModel(uri);
            if (model) model.dispose();
        }
    }, [monaco]);

    // Обновить псевдоним или путь библиотеки
    const updateLib = useCallback((packageName: string, newNickName: string, newPath: string) =>
    {
        setLibs(prev => prev.map(lib => lib.packageName === packageName ? { ...lib, nickName: newNickName, path: newPath } : lib));
        // Для Monaco можно обновить compilerOptions, если нужно
    }, []);

    // Получить информацию о библиотеке
    const getLib = useCallback((packageName: string) =>
    {
        return libs.find(lib => lib.packageName === packageName);
    }, [libs]);

    return { addLib, removeLib, updateLib, getLib, libs };
} 