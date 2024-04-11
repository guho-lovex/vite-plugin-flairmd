import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 设置你的测试选项
    globals: true,
    environment: "node",
  },
});
