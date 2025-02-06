import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    "testURL": "http://localhost/"
  },
});
