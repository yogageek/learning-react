import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "chapter-08",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    // include: /chapter-08\/src\/.*\.js$/
  },
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  }
});
