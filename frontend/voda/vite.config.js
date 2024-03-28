import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',  // 직접 sw.js를 넣어주는 방식
      srcDir: '/',
      filename: 'voda-sw.js',
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "VODA",
        short_name: "VODA",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#ffffff",
        background_color: "#FFFAE1",
        start_url: "/",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: { // 번들링의 입력 파일을 정의
      input: {
        main: "./index.html",  // React 애플리케이션의 진입점
        sw: "public/voda-sw.js",  // Service Worker 파일
      },
    },
  },
});
