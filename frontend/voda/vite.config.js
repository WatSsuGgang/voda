import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: './',
      filename: 'voda-sw.js',
      injectRegister: 'script',
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      includeAssets: ['**/*.(js|css|svg|ico|png'],
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
