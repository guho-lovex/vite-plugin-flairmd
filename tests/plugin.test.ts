import MarkdownIt from "markdown-it/dist/markdown-it.js";
import { describe, expect, it } from "vitest";
import flairmd from "../src";

const customSyntaxMarkdown = `---
title: 标题
---

# 标题

## 子标题

> 这是注解 hasdas

::: custom
*这里是自定义内容*
:::

\`\`\`js
console.log("Hello, world!");
\`\`\`;

`;

const imageAndLinkMarkdown = `
![alt text](/path/to/image.png)
[Example link](URL_ADDRESS)
`;

// 测试默认插件

describe("flairmd", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});

// 测试自定义插件
describe("ViteMarkdownPlugin with custom plugins", () => {
  it("should handle custom containers", () => {
    const markdownIt = new MarkdownIt().use(
      require("markdown-it-container"),
      "warning"
    );
    const plugin = flairmd({
      markdownItSetup(md) {
        md.use(require("markdown-it-container"), "warning");
      },
    });
    const result = (plugin.transform as any)?.(
      customSyntaxMarkdown,
      "custom.md"
    );

    console.log("-----result--", result);
  });

  it("should handle images and links", () => {
    const plugin = flairmd();
    const result = (plugin.transform as any)?.(
      imageAndLinkMarkdown,
      "image-link.md"
    );
    console.log("-----result++", result);
  });

  // 添加更多测试用例，例如测试不同的 Markdown 插件组合、Markdown 扩展等
});
