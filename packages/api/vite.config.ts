import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      outDir: "dist",
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
      staticImport: true,
      clearPureImport: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["ts-custom-error"],
      output: {
        globals: {
          "ts-custom-error": "ts-custom-error",
        },
      },
    },
    sourcemap: true,
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
