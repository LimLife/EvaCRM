import * as monacoType from "monaco-editor";
import * as CO from "./ts-options.ts/compilerOptions";
import React, { useState, Suspense, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { addExtraLibFromPackage } from "./loadExtraLib";
import { useResizable } from "../Shared/customHooks/Resizable/useResizable";
import { template } from "./template";
import * as UI from "../styles/UI";
import { compileModule } from "../utils/compileModule";
///TODO В компиляторе надо передать типы для переменных для path сделать файл и псевдонимы
//А также сделать генератор файловой системы для модулей и сделать view дерево 

const EditorMonaco: React.FC = () =>
{
  const loadedLibs = new Set<string>();
  const monacoRef = useRef<Monaco | null>(null);

  const { width, handleMouseDown } = useResizable(
    {
      initialWith: 920,
      minWidth: 400,
      maxWidth: 1700
    }
  );

  const loadBaseLib = async (monaco: Monaco) =>
  {
    if (!monaco) return;
    await addExtraLibFromPackage(monaco, "react", loadedLibs);
  }

  const handleEditorMount = async (_editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) =>
  {
    monacoRef.current = monaco;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(CO.tsCompilerOptions);
    monaco.languages.typescript.typescriptDefaults.setModeConfiguration(CO.tsModeConfiguration);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(CO.tsDiagnosticsOptions);
    loadBaseLib(monaco);
  };
  const [Component, setComponent] = useState<React.FC>();
  const compiling = async () =>
  {
    const ComponentCompiling = await compileModule(template);
    if (ComponentCompiling)
    {
      setComponent(ComponentCompiling);
    }
  }

  return (
    <UI.Container id="container">
      <UI.NavBar id="nav-bar">
        <UI.Button onClick={compiling} id="run-button">  Run ▶ </UI.Button>
      </UI.NavBar>
      <UI.LeftPanel overrideStyles={(base) => ({ ...base, width: width })}>
        <Editor
          height="100vh"
          width={width}
          theme="vs-dark"
          language="typescript"
          path='file:///index.tsx'
          defaultPath="file:///node_modules/@type/react/"
          options={{
            automaticLayout: true,
            minimap: { enabled: true },
            hover: { enabled: true },
            links: true
          }}
          value={template}
          onMount={handleEditorMount}
        />
      </UI.LeftPanel>
      <UI.ResizeHandle id="resize-panel"
        overrideStyles={(base) => ({ ...base, left: width })}
        onMouseDown={handleMouseDown}>
      </UI.ResizeHandle>
      <UI.RightPanel overrideStyles={(base) => ({ ...base, width: width })}>
        {
          <Suspense fallback={<div>Loading .... </div>}>
            {Component && <Component />}
            {"Any content"}
          </Suspense>}
      </UI.RightPanel>
    </UI.Container>
  );
};

export default EditorMonaco;



