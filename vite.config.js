import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue2";
import vueJSX from '@vitejs/plugin-vue2-jsx'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  build: {
    manifest: true,
    assetsDir: 'assets'
  },
  plugins: [
    createHtmlPlugin({
      minify: false,
      pages: [
        {
          entry: "src/main.js",
          filename: 'index.html',
          template: 'index.html',
          injectOptions: {
            data: {
              title: 'Index',
            },
          },
        },
      ],
    }),
    vue(),
    vueJSX()
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
