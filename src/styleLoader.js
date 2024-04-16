/**
 *
 * @param {创建动态默认样式加载函数} styleString
 * @param {创建动态highlight代码样式加载函数} url
 */
export function injectStyles(url, styleString) {
  const styleId = "vite-plugin-flairmd-style";

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

  if (!document.getElementById(styleId)) {
    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = styleString;
    document.head.appendChild(styleElement);
  }
}
