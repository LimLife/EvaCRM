/* eslint-disable react/no-inline-styles */
import * as monacoType from "monaco-editor";
import * as CO from "./ts-options.ts/compilerOptions";
import React, { useState, Suspense, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useResizable } from "../Shared/customHooks/Resizable/useResizable";
import { template } from "./template";
import { Container, NavBar, Button, LeftPanel, ResizeHandle, RightPanel } from "../styles/UI";
import { compileModule } from "../utils/compileModule";
///TODO В компиляторе надо передать типы для переменных для path сделать файл и псевдонимы
//А также сделать генератор файловой системы для модулей и сделать view дерево 
import * as esbuild from "esbuild-wasm";
import { useMonacoLibs } from "./useMonacoLibs";
import VFSPanel from "../styles/stylesComponents/VFSPanel";
import { VFSExplorer } from "../vfs/VFSExplorer";
import { vfsPanelToggle, vfsPanelToggleCollapsed } from "../styles/stylesComponents/VFSPanel.css";

//await esbuild.initialize({ wasmURL: "path/compile/esbuild.wasm" })

const EditorMonaco = () =>
{
  const monacoRef = useRef<Monaco | null>(null);

  const { width, handleMouseDown } = useResizable(
    {
      initialWith: 920,
      minWidth: 400,
      maxWidth: 1700
    }
  );

  const { addLib } = useMonacoLibs(monacoRef.current);
  const loadBaseLib = async () =>
  {
    await addLib("react");
  }

  const handleEditorMount = async (_editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) =>
  {
    monacoRef.current = monaco;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(CO.tsCompilerOptions);
    monaco.languages.typescript.typescriptDefaults.setModeConfiguration(CO.tsModeConfiguration);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(CO.tsDiagnosticsOptions);
    await loadBaseLib();
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

  const [vfsCollapsed, setVfsCollapsed] = useState(false);

  return (
    <Container id="container">
      <VFSPanel collapsed={vfsCollapsed}>
        <VFSExplorer />
      </VFSPanel>
      <div
        className={
          `${vfsPanelToggle} ${vfsCollapsed ? vfsPanelToggleCollapsed : ''}`
        }
        onClick={() => setVfsCollapsed(v => !v)}
        title={vfsCollapsed ? 'Показать VFS' : 'Скрыть VFS'}
        aria-label={vfsCollapsed ? 'Показать файловую панель' : 'Скрыть файловую панель'}
        tabIndex={0}
        role="button"
        style={{ outline: 'none', position: 'absolute', left: vfsCollapsed ? 0 : 280, top: 20, zIndex: 10 }}
      >
        {vfsCollapsed ? '⮞' : '⮜'}
      </div>
      <NavBar id="nav-bar">
        <Button onClick={compiling} id="run-button">  Run ▶ </Button>
      </NavBar>
      <LeftPanel style={{ width, marginLeft: vfsCollapsed ? 0 : 280 }}>
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
      <ResizeHandle id="resize-panel" style={{ left: width + (vfsCollapsed ? 0 : 280) }} onMouseDown={handleMouseDown}>
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



