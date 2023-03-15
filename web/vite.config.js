import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const { resolve } = require('path') //必须要引入resolve 

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src', 'components'),
      '@utils': resolve(__dirname, 'src', 'utils'),
      '@config': resolve(__dirname, 'src', 'config'),
    },
  },
  plugins: [react()]
})