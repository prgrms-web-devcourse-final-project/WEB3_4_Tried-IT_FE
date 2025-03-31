/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST ? reactRouter() : undefined],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./app"),
    },
  },
  optimizeDeps: {
    include: ["@repo/ui", "@repo/design-system"],
  },
  build: {
    commonjsOptions: {
      include: [/@repo\/ui/, /repo\/design-system/, /node_modules/],
    },
  },
  test: {
    environment: "jsdom",
    passWithNoTests: true,
  },
});
