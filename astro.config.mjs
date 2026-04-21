import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

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
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: false,
        includeAssets: [
          "favicon.svg",
          "apple-touch-icon.png",
          "robots.txt"
        ],
        manifest: {
          id: "/",
          name: "Latento AC",
          short_name: "Latento",
          description: "Web corporativa de Latento AC",
          start_url: "/",
          scope: "/",
          display: "standalone",
          orientation: "portrait-primary",
          lang: "es-ES",
          theme_color: "#CE3061",
          background_color: "#f7f6f2",
          icons: [
            {
              src: "/icons/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "/icons/maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,webp,ico,woff2}"],
          navigateFallback: "/",
          cleanupOutdatedCaches: true
        },
        devOptions: {
          enabled: true
        }
      })
    ]
  },
});
