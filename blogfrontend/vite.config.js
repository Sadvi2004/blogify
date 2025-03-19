import { defineConfig } from 'vite'
import { config } from 'dotenv';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
config();
export default defineConfig({
  plugins: [
    tailwindcss(
    ),
    react()
  ],
})