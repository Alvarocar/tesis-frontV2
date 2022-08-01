import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@router', replacement: path.resolve(__dirname, 'src', 'router') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src', 'pages') },
      { find: '@components', replacement: path.resolve(__dirname, 'src', 'components') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src', 'styles') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src', 'assets') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/global.scss";`,
      }
    },
  },
})
