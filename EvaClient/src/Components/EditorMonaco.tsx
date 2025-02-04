import React, { useCallback, useEffect, useState, Suspense } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monacoType from "monaco-editor";
import ReactDOM from 'react-dom';

import { LeftPanel, Container, ResizeHandle, RightPanel } from "./EditorStyle"
const urlPackage = import.meta.env.VITE_URL_PACKAGE;
const urlModule = import.meta.env.VITE_URL_MODULE;
window.React = React;
window.ReactDOM = ReactDOM;



const tsCompilerOptions = {
  jsx: monacoType.languages.typescript.JsxEmit.React,
  moduleResolution: monacoType.languages.typescript.ModuleResolutionKind.NodeJs,
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsxFactory: "React.createElement",
  jsxFragmentFactory: "React.Fragment",
  reactNamespace: "React",
  allowNonTsExtensions: true,
  allowJs: true,
  noEmit: true,
  module: monacoType.languages.typescript.ModuleKind.ESNext,
  target: monacoType.languages.typescript.ScriptTarget.Latest,
  baseUrl: "./",
  lib: ["ES2020", "dom"],
  types: ["react", "react-dom"],
  paths: {
    "react-dom": ["index-dom.d.ts"],
    "react": ["index.d.ts"]
  }
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
const addExtraLibFromPackage = async (monaco: Monaco, packageName: string, fileName: string) =>
{
  try
  {
    const response = await fetch(urlPackage + packageName, { method: "GET" });
    if (!response.ok)
    {
      throw new Error(`Failed to fetch ${packageName}`);
    }
    const data = await response.text();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(data, fileName);
  } catch (error)
  {
    console.error(`Error loading extra lib for ${packageName}:`, error);
  };
}

const defaultEditorValue = 'import React from' + "'react';" + '\n' + "import * as ReactDOM from " + "'react-dom';";

const EditorMonaco = () =>
{
  const [Component, setComponent] = useState<React.FC>();
  useEffect(() =>
  {
    import(urlModule + "moduleA").then((module: Module) =>
    {
      const ImportComponent = module.default;
      setComponent(() => ImportComponent)
    }).catch((error) =>
    {
      console.error('Failed to load module:', error);
    });
  }, [Component]);

  const [width, setWidth] = useState<number>(960);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () =>
  {
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
  };
  const handleMouseMove = useCallback((e: MouseEvent) =>
  {
    if (isResizing)
    {
      const newWidth = e.clientX;
      setWidth(newWidth > 100 ? newWidth : 100);
    }
  }, [isResizing]);


  useEffect(() =>
  {
    if (isResizing)
    {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else
    {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () =>
    {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);
  const handleMouseUp = () =>
  {
    setIsResizing(false);
    document.body.style.cursor = 'default';
  };


  const handleEditorMount = async (editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) =>
  {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(tsCompilerOptions);
    monaco.languages.typescript.typescriptDefaults.setModeConfiguration(tsModeConfiguration);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(tsDiagnosticsOptions);

    await addExtraLibFromPackage(monaco, "react-dom", "index-dom.d.ts");
    await addExtraLibFromPackage(monaco, "react", "index.d.ts");
  };
  return (
    <Container overrideStyles={{ position: "absolute" }} id="container">
      <LeftPanel width={width}>
        <Editor
          height="90vh"
          width={width}
          theme="vs-dark"
          language="typescript"
          path={'file:///index.tsx'}
          options={{
            automaticLayout: true,
            minimap: { enabled: true },
            hover: { enabled: true },
            links: true,
          }}
          value={defaultEditorValue}
          onMount={handleEditorMount}
        />
      </LeftPanel>
      <ResizeHandle id="resize-panel" width={width} onMouseDown={handleMouseDown} />
      <RightPanel width={width}>
        <div>
          <Suspense fallback={<div>Loading .... </div>}>
            {Component && <Component />}
            {"Any content"}
          </Suspense>
        </div>
      </RightPanel>
    </Container>
  );
};

export default EditorMonaco;



