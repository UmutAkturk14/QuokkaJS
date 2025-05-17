import { defineConfig } from "vitest/config";
import path from 'path';

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
