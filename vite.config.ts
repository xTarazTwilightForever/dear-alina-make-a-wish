import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'github-pages' ? '/dear-alina-make-a-wish/' : './',
  server: { port: 5173, strictPort: true },
}));
