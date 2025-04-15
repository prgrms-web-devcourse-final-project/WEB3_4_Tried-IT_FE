/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST ? reactRouter() : undefined,
    basicSsl(),
  ],
  server: {
    host: "admin-local.dementor.site",
    allowedHosts: ["dementor.site"],
    port: 5174,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./app"),
    },
  },
  define: {
    global: "window",
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
