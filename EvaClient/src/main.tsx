import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { VFSProvider } from "./vfs/vfsProvider.tsx"
import "./styles/normalize.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <VFSProvider>
        <App />
      </VFSProvider>
    </BrowserRouter>
  </StrictMode>,
)
