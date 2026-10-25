import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/app.family.yahtzee/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Kids Yahtzee',
        short_name: 'Yahtzee',
        description: 'A fun multiplayer Yahtzee game for kids',
        theme_color: '#ff579a',
        background_color: '#f7fff7',
        display: 'fullscreen',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-icon.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: 'pwa-icon.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      }
    })
  ],
});
