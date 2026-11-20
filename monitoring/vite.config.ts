import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Сайт лежит в подпапке репозитория: https://duckiexd.github.io/react-kurss/
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-kurss/',
})