import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Goals Tracker',
        short_name: 'Goals',
        description: 'Goals Tracker',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'target_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'target_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'mobile_screenshot.png',
            sizes: '390x844',
            type: 'image/png',
            label: 'Мобильная версия',
          },
          {
            src: 'desktop_screenshot.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Десктоп версия',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html}',
          '**/*.{png,ico,svg,json}',
          '**/*.{woff,woff2,ttf}',
        ],
        globIgnores: [
          '**/node_modules/**/*',
          'sw.js',
          'workbox-*.js',
          '**/*.map',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      pages: path.resolve(__dirname, 'src/pages'),
      widgets: path.resolve(__dirname, 'src/widgets'),
      features: path.resolve(__dirname, 'src/features'),
      entities: path.resolve(__dirname, 'src/entities'),
      shared: path.resolve(__dirname, 'src/shared'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          primevue: ['primevue'],
          'vue-vendor': ['vue', 'vue-router', 'vuefire'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          utils: ['yup'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
