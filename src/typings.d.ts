declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "markdown-it-replace-link" {
  import { PluginSimple, PluginWithOptions } from "markdown-it/lib";
  const markdownItReplaceLink: PluginSimple | PluginWithOptions;
  export default markdownItReplaceLink;
}
