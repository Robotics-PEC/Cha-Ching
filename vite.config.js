import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 8000,
  },
  preview: {
    port: 8000,
  },
  // optimizeDeps: {
  //   exclude: ["pdfjs-dist"],
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        dir: "./dist",
      },
    },
  },
});
