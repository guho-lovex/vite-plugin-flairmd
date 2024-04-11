import { Plugin } from "vite";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import hljs from "highlight.js"; // 用于代码块的语法高亮
import markdownItAnchor from "markdown-it-anchor"; // 为标题添加锚点
import markdownItTocDoneRight from "markdown-it-toc-done-right"; // 自动生成目录
import markdownItContainer from "markdown-it-container"; // 自定义容器
import markdownItAttrs from "markdown-it-attrs"; // 添加自定义属性
import markdownItReplaceLink from "markdown-it-replace-link"; // 替换链接

interface vitePluginFlairMdOptions {
  markdownItOptions?: MarkdownIt.Options;
  /** Array of [plugin, ...params] */
  markdownItUsers?: Array<[any, ...any[]]>;
  /** 进一步自定义 markdown-it 的方法*/
  markdownItSetup?: (md: MarkdownIt) => void;
}

export default function VitePluginFlairMd(
  options: vitePluginFlairMdOptions = {}
): Plugin {
  const markdown = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    linkify: true,
    typographer: true,
    highlight(str, lang, attrs) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang, ignoreIllegals: true })
            .value;
        } catch (__) {}
      }
      return ""; // 使用外部的 highlight.js 库
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

        const code = `export default { frontmatter: ${JSON.stringify(
          frontmatter
        )};
        content: ${JSON.stringify(htmlContent)} }`;

        return { code, map: null };
      }
    },
  };
}
