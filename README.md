# vite-plugin-flairmd

[![npm](https://img.shields.io/npm/v/vite-plugin-flairmd.svg)](https://www.npmjs.com/package/vite-plugin-flairmd)

A Vite plugin to parse complex Markdown files with frontmatter support and extendable parsing features.

## Features

- Parses Markdown files and converts them to HTML.
- Extracts frontmatter as a separate export.
- Supports code syntax highlighting.
- Extensible with `markdown-it` plugins.
- Configurable options for `markdown-it`.

## Installation

```bash
npm install vite-plugin-flairmd --save-dev
```

Or if you are using yarn or pnpm:

```bash
yarn add -D vite-plugin-flairmd
pnpm add -D vite-plugin-flairmd
```

## Usage

Add the plugin to your vite.config.js or vite.config.ts:

```js
// vite.config.js
import { defineConfig } from "vite";
import flairmd from "vite-plugin-flairmd";

export default defineConfig({
  plugins: [
    flairmd({
      // Your custom options here
    }),
  ],
});
```

Now you can import Markdown files in your Vite project:

```js
import { frontmatter, content } from "./path/to/file.md";

console.log(frontmatter); // Parsed frontmatter as an object
console.log(content); // Parsed Markdown content as HTML string
```

## Options

You can pass options to the markdown-it parser:

```js
flairmd({
  markdownItOptions: {
    // markdown-it options
  },
  markdownItUses: [
    // Array of markdown-it plugins to use
  ],
  markdownItSetup(md) {
    // A function to further customize markdown-it
  },
});
```

The plugin accepts an options object with the following properties

For more details on markdown-it options, please refer to the [markdown-it documentation](https://github.com/markdown-it/markdown-it).

## Contributing

Contributions are welcome. Please open an issue or a pull request.

## License

This plugin is open-sourced software licensed under the MIT license.
