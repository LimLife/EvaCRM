import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Page from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    react(),
    Page({
      dirs: "src/pages",
      extensions: ["tsx"],
      routeStyle: 'next'
    })
  ],
})
