import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, "github-pages"),
  base: command === "serve" ? "/" : "/august172026/",
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "dist-pages"),
    emptyOutDir: true,
  },
  publicDir: resolve(__dirname, "public"),
}));
