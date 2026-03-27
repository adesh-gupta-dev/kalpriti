import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
// import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),

    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  server: {
    port: 5173,
  },
});
