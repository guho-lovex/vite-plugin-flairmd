import { Plugin } from "vite";
import { fileURLToPath } from "url";
import fs from "fs";
import path, { join } from "path";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import hljs from "highlight.js"; // 用于代码块的语法高亮
import markdownItAnchor from "markdown-it-anchor"; // 为标题添加锚点
import markdownItTocDoneRight from "markdown-it-toc-done-right"; // 自动生成目录
import markdownItContainer from "markdown-it-container"; // 自定义容器
import markdownItAttrs from "markdown-it-attrs"; // 添加自定义属性
import markdownItReplaceLink from "markdown-it-replace-link"; // 替换链接

import "./index.css";
interface vitePluginFlairMdOptions {
  /** Users can specify style paths or false to disable the default style */
  themStyles?: string | false;
  /** Custom highlight theme styles */
  highlightThemeStyle?: string | false;
  markdownItOptions?: MarkdownIt.Options;
  /** Array of [plugin, ...params] */
  markdownItUsers?: Array<[any, ...any[]]>;
  /** 进一步自定义 markdown-it 的方法*/
  markdownItSetup?: (md: MarkdownIt) => void;
}

export default function VitePluginFlairMd(
  options: vitePluginFlairMdOptions = {
    themStyles: false,
    highlightThemeStyle: false,
  }
): Plugin {
  const markdown: MarkdownIt = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      // const code = hljs
      //   .highlight(str, { language: lang, ignoreIllegals: true })
      //   .value.split("\n") // 将字符串分割成行
      //   .map((line) => line.trimStart()) // 移除每行开头的空白
      //   .join("\n"); // 重新组合行

      // const wrappedCode = `<pre class="hljs"><code>${code}</code></pre>`;
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
        } catch (__) {}
      }
      return `<pre class='hljs'><code>${markdown.utils.escapeHtml(
        str
      )}</code></pre>`;
    },
    ...options.markdownItOptions,
  });

  // 使用 Markdown-it 插件
  markdown
    .use(markdownItAnchor)
    .use(markdownItTocDoneRight)
    .use(markdownItContainer, "custom")
    .use(markdownItAttrs)
    .use(markdownItReplaceLink);

  // 应用用户提供的插件
  if (options.markdownItUsers) {
    for (const [plugin, ...params] of options.markdownItUsers) {
      markdown.use(plugin, ...params);
    }
  }

  // 用户自定义 markdown-it 设置
  if (options.markdownItSetup) {
    options.markdownItSetup(markdown);
  }

  return {
    name: "vite-plugin-flairmd",
    transform(src, id) {
      if (id.endsWith(".md")) {
        const { data: frontmatter, content } = matter(src);
        const htmlContent = markdown.render(content);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // 获取样式加载器模块路径
        const styleLoaderPath = JSON.stringify(
          path.resolve(__dirname, "styleLoader.js")
        );

        // 构建默认样式模块路径
        const defaultStylesPath = join(__dirname, "index.css");

        const highlightThemePath =
          options.highlightThemeStyle !== false &&
          options.highlightThemeStyle !== undefined
            ? options.highlightThemeStyle
            : "highlight.js/styles/googlecode.min.css";

        const themeStylePath =
          options.themStyles !== false && options.themStyles !== undefined
            ? fs.readFileSync(options.themStyles, "utf-8")
            : fs.readFileSync(defaultStylesPath, "utf-8");

        const code = `
        import { injectStyles } from ${styleLoaderPath};
        injectStyles(${JSON.stringify(highlightThemePath)}, ${JSON.stringify(
          themeStylePath
        )});
        export default { frontmatter: ${JSON.stringify(frontmatter)},
        content: ${JSON.stringify(`<div>${htmlContent}</div>`)} }`;

        return { code, map: null };
      }
    },
  };
}
