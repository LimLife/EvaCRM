import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { StyleOverrideProvider } from "./styles/StyleOverrideContext.tsx";
import { baseStylesRegistry } from "./styles/baseStylesRegistry.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StyleOverrideProvider overrides={baseStylesRegistry}>
        <App />
      </StyleOverrideProvider>
    </BrowserRouter>
  </StrictMode>,
)
