import { Monaco } from "@monaco-editor/react";
import { registerTypeDefinition } from "./registerTypeDefinition";
import { declarerPackage } from "../api/declarerPackage";

export const addExtraLibFromPackage = async (monaco: Monaco, packageName: string, loadedLibs: Set<string>) =>
{
    if (loadedLibs.has(packageName)) return;
    const type = await declarerPackage(packageName);
    await registerTypeDefinition(monaco, type);
    loadedLibs.add(packageName);
};