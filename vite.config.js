import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  }
});
