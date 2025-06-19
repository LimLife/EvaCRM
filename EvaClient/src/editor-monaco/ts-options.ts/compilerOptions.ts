import * as monacoType from "monaco-editor";

const tsCompilerOptions =
{
    jsx: monacoType.languages.typescript.JsxEmit.React,
    moduleResolution: monacoType.languages.typescript.ModuleResolutionKind.NodeJs,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    allowNonTsExtensions: true,
    allowJs: true,
    noEmit: false,
    module: monacoType.languages.typescript.ModuleKind.ESNext,
    target: monacoType.languages.typescript.ScriptTarget.Latest,
    baseUrl: "file:///node_module/@types/react/",
    lib: ["ES2020", "dom"],
    types: ["react", "react-dom"],
    typeRoots: ["file:///node_module/@types/react/"],
    paths: {
        //"react": ["react.d.ts"],
        //"react-dom": ["index-dom.d.ts"]
        //"react": ["global.d.ts"],
    },
}

const tsModeConfiguration = {
    definitions: true,
    completionItems: true,
    documentSymbols: true,
    codeActions: true,
    diagnostics: true,
    onTypeFormattingEdits: true,
    signatureHelp: true
}
const tsDiagnosticsOptions = {
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false
}

export { tsCompilerOptions, tsModeConfiguration, tsDiagnosticsOptions }