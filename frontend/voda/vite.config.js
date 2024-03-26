import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //react(),
    VitePWA({
      //selfDestroying: true, //임시용 나중에 삭제해야됨
      strategies: 'injectManifest',
      srcDir: '/',
      filename: 'voda-sw.js',
      manifest: 'src/pwa-manifest.json',
      manifestFilename: 'pwa-manifest.json',
      injectRegister: 'script',
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
