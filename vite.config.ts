import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        'openai',
        '@openai/agents',
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'util',
        'buffer',
        'events',
        'http',
        'https',
        'url',
        'zlib',
        'net',
        'tls',
        'child_process',
      ],
    },
  },
});