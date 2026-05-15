/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }
          if (id.includes("@mui") || id.includes("@emotion")) {
            return "mui";
          }
          if (id.includes("@tanstack/react-query")) {
            return "react-query";
          }
          if (id.includes("react-router")) {
            return "router";
          }
          if (id.includes("formik") || id.includes("yup")) {
            return "forms";
          }
          if (id.includes("axios")) {
            return "http";
          }
          if (id.includes("react") || id.includes("scheduler")) {
            return "react";
          }
          return "vendor";
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
