import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Page from "vite-plugin-pages";
import eslint from "vite-plugin-eslint2";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    Page({
      dirs: "src/pages",
      extensions: ["tsx"],
      routeStyle: 'next'
    }),
    // eslint()
  ],
})
