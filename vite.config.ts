import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 👈 1. Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // 👈 2. Add the plugin here
  base: '/OnTime/',   // 👈 3. Keep your base path for GitHub Pages
});
