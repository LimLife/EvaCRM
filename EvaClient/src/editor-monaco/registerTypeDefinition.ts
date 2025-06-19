import { Monaco } from "@monaco-editor/react";
import { DeclarerPackageType } from "../api/typeApi/declarerPackageType";

export async function registerTypeDefinition(monaco: Monaco, typeDeclarer: DeclarerPackageType | null)
{
    if (!typeDeclarer) return;
    const uri = monaco.Uri.parse(`file:///${typeDeclarer.pathFolder}`);
    monaco.languages.typescript.typescriptDefaults.addExtraLib(typeDeclarer.dataDeclarer, uri.toString());
    if (!monaco.editor.getModel(uri))
    {
        monaco.editor.createModel(typeDeclarer.dataDeclarer, "typescript", uri);
    };
    const compileOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();
    compileOptions.types?.push(...(compileOptions.types || []), typeDeclarer.nickName);
    compileOptions.paths = { ...compileOptions.paths, [typeDeclarer.nickName]: [typeDeclarer.pathFolder] };
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compileOptions)
    // monaco.editor.getModel(uri)?.setValue(typeDeclarer.dataDeclarer);
}

