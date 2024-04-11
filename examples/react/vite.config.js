import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import flairmd from "vite-plugin-flairmd";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), flairmd()],
});
