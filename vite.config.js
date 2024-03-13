import { resolve } from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'calculator': resolve(__dirname, 'calculator.html')
      }
    }
  }
})
