import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import analyzer from "rollup-plugin-analyzer";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      viteCompression({ algorithm: "gzip", deleteOriginFile: true }),
      analyzer({ summaryOnly: true }),
      svgr({ include: "**/*.svg?react", exclude: "", svgrOptions: {} })
    ],
    build: {
      sourcemap: env.VITE_BASE_STAGE === "prod" ? false : false,
      minify: "terser",
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("commonjsHelpers")) return "commonjsHelpers";
            if (id.includes("radix")) return "radix";
            if (id.includes("zod") || id.includes("react-hook-form")) return "libs";
            if (id.includes("react-router-dom") || id.includes("react-router") || id.includes("@remix-run"))
              return "react-router";
            if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "react";
          }
        }
      }
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  };
});