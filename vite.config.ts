import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const currentMode = mode || 'schengen';
  
  // Set the base path to relative subfolder for deployment inside WordPress
  // Except for schengen which might be root, or if you want it in /schengen/
  return {
    plugins: [react()],
    base: `/${currentMode}/`,
    build: {
      outDir: `dist/${currentMode}`,
      emptyOutDir: true,
    }
  };
})
