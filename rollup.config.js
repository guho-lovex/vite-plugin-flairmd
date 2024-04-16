import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true,
    }),
    terser({
      compress: {
        drop_console: true,
      },
      output: {
        comments: "some",
      },
    }),
  ],
  external: [
    // 指定外部依赖，这些依赖不会被打包进输出文件
    "gray-matter",
    "highlight.js",
    "markdown-it",
    "markdown-it-anchor",
    "markdown-it-attrs",
    "markdown-it-container",
    "markdown-it-replace-link",
    "markdown-it-toc-done-right",
  ],
};
