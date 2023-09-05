import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "TranslationSystem",
      formats: ["es", "umd"],
      fileName: (format) => `translation-system.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  resolve: {
    alias: {
      "locales": fileURLToPath(new URL("./src/locales", import.meta.url)),
      "interfaces": fileURLToPath(new URL("./src/interfaces", import.meta.url)),
    },
  },
});
