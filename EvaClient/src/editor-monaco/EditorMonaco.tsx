/* eslint-disable react/no-inline-styles */

import * as monacoType from "monaco-editor";
import * as CO from "./ts-options.ts/compilerOptions";
import React, { useState, Suspense, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { addExtraLibFromPackage } from "./loadExtraLib";
import { useResizable } from "../Shared/customHooks/Resizable/useResizable";
import { template } from "./template";
import { Container, NavBar, Button, LeftPanel, ResizeHandle, RightPanel } from "../styles/UI";
import { compileModule } from "../utils/compileModule";
///TODO В компиляторе надо передать типы для переменных для path сделать файл и псевдонимы
//А также сделать генератор файловой системы для модулей и сделать view дерево 
import * as esbuild from "esbuild-wasm";

//await esbuild.initialize({ wasmURL: "path/compile/esbuild.wasm" })

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
    // loadBaseLib(monaco);
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
    <Container id="container">
      <NavBar id="nav-bar">
        <Button onClick={compiling} id="run-button">  Run ▶ </Button>
      </NavBar>
      <LeftPanel style={{ width }}>
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
      </LeftPanel>
      <ResizeHandle id="resize-panel" style={{ left: width }} onMouseDown={handleMouseDown}>
      </ResizeHandle>
      <RightPanel style={{ width }}>
        {
          <Suspense fallback={<div>Loading .... </div>}>
            {Component && <Component />}
            {"Any content"}
          </Suspense>}
      </RightPanel>
    </Container>
  );
};

export default EditorMonaco;



