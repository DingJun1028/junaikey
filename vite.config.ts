import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['openai', 'd3', 'three', 'fs', 'path', 'http', 'https', 'stream', 'zlib', 'util', 'buffer', 'url', 'crypto', 'net', 'tls', 'child_process', 'os'],
    },
  },
});