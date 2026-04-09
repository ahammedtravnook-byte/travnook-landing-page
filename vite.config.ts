import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const currentMode = mode || 'schengen';
  const buildTime = new Date().toISOString();
  const buildDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Set the base path to relative subfolder for deployment inside WordPress
  // Except for schengen which might be root, or if you want it in /schengen/
  return {
    plugins: [react()],
    base: `/${currentMode}/`,
    define: {
      __BUILD_TIME__: JSON.stringify(buildTime),
      __BUILD_DATE__: JSON.stringify(buildDate),
      __COUNTRY_MODE__: JSON.stringify(currentMode),
    },
    build: {
      outDir: `dist/${currentMode}`,
      emptyOutDir: true,
    }
  };
})
