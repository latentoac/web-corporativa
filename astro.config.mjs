import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://latentoac.com",
  integrations: [],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
