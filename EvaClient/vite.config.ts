import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    /*
  viteExternalsPlugin({
    react: 'React', 
    'react-dom': 'ReactDOM', 
  }),
  */
],
})
