// 创建动态默认样式加载函数
export function injectStyles(styleString: string) {
  const styleId = "vite-plugin-flairmd-style";

  if (!document.getElementById(styleId)) {
    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = styleString;
    document.head.appendChild(styleElement);
  }
}

// 创建动态highlight代码样式加载函数
export function loadStyle(url: string) {
  // 检查样式是否已经加载
  if (
    !document.querySelector(
      'link[data-style-highlight-loaded="true"][href="${url}"]'
    )
  ) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute("data-style-highlight-loaded", "true");
    document.head.appendChild(link);
  }
}
