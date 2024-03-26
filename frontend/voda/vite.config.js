import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //react(),
    VitePWA({
      //selfDestroying: true, //임시용 나중에 삭제해야됨
      strategies: 'injectManifest',
      srcDir: '/',
      swSrc: 'voda-sw.js',
      swDest: 'dist/voda-sw.js',
      filename: 'voda-sw.js',
      manifest: '/pwa-manifest.json',
      manifestFilename: 'pwa-manifest.json',
      injectRegister: 'none',   // 스크립트 자동 삽입 비활성화
      registerType: "prompt",
      //registerType: "autoUpdate",
      includeAssets: ['**/*.(js|css|svg|ico|png'],
      devOptions: {
        enabled: true,
      },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        sw: "./voda-sw.js",
      },
    },
  },
});
