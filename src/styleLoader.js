/**
 *
 * @param {创建动态默认样式加载函数} styleString
 * @param {创建动态highlight代码样式加载函数} url
 */
export function injectStyles(url, styleString) {
  const styleId = "vite-plugin-flairmd-style";
  const highlightStyleLoaded = document.querySelector(
    'link[data-style-highlight-loaded="true"]'
  );

  if (!highlightStyleLoaded) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute("data-style-highlight-loaded", "true");

    // 如果样式加载成功，再添加默认样式
    link.onload = () => {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = styleString;
      document.head.appendChild(styleElement);
    };

    // 如果样式加载失败，则使用默认样式
    link.onerror = () => {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = styleString;
      document.head.appendChild(styleElement);
    };

    document.head.appendChild(link);
  } else {
    // 如果样式已经加载，则更新样式
    highlightStyleLoaded.href = url;
    // 如果 link 元素已经存在，直接添加style样式
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = styleString;
      document.head.appendChild(styleElement);
    }
  }
}
