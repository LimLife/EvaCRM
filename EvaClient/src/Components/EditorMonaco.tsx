import React, { useCallback, useEffect, useState, Suspense } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monacoType from "monaco-editor";
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
    const response = await fetch(`http://localhost:5152/Worker/npm?package=${packageName}`, { method: "GET" });
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
  const TestCode = "const Test = () => { function Ex() { console.log('Hello world'); } useEffect(() => { }, []); Ex(); return (React.createElement(React.Fragment, null, 'Hello World!!!')); };"
  const [Component, setComponent] = useState<React.FC>();


  useEffect(() =>
  {
    const executeComponent = (componentString: string, exportName: string, dependencies: Record<string, unknown> = {}): React.FC =>
    {
      const exports = {};
      const module = { exports };

      const allDependencies = { React, ...dependencies };

      const dependencyNames = Object.keys(allDependencies).join(', ');
      const dependencyValues = Object.values(allDependencies);

      const code = `
      ${componentString}
      if (typeof ${exportName} !== 'undefined') {
        module.exports = ${exportName};
      } else if (typeof exports.default !== 'undefined') {
        module.exports = exports.default;
      } else {
        throw new Error('Export not found');
      }`;

      new Function('exports', 'module', dependencyNames, code)(
        exports,
        module,
        ...dependencyValues
      );

      return module.exports as React.FC;
    };
    const component = executeComponent(TestCode, "Test", { React, useEffect });
    setComponent(() => component);
  }, [TestCode]);

  const [width, setWidth] = useState<number>(960);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) =>
  {
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
  };
  const handleMouseMove = useCallback((e: React.MouseEvent) =>
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
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh'
        }}
      >
        <div
          style={{
            width: `${width}px`,
            height: '100%',
            padding: '10px',
            borderRight: '1px solid #ccc'
          }}
        >
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
              links: true
            }}
            value={defaultEditorValue}
            onMount={handleEditorMount}
          />
        </div>
        <div id="resize"
          onMouseDown={handleMouseDown}
          style={{
            position: 'absolute',
            left: `${width}px`,
            cursor: 'ew-resize',
            width: '5px',
            marginLeft: '29px',
            height: '100%',
            backgroundColor: '##c3dced',
          }}
        />
        <div
          style={{
            width: `calc(100% - ${width}px)`,
            flex: 1,
            padding: '10px',
            borderLeft: '1px solid #ccc'
          }}
        >
          <div >
            <Suspense fallback={<div>Loading .... </div>}>
              {Component && <Component />}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorMonaco;



