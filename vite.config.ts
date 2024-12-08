import { resolve } from 'path'
import { defineConfig } from 'vite'

const input = {
  main: resolve(__dirname, './vite/index.html'),
}

// "routing"
const pages = ['home', 'rm-map']
for (const page of pages) {
  input[page] = resolve(__dirname, `./vite/${page}.html`)
}

export default defineConfig({
  root: './vite',
  build: {
    rollupOptions: {
      input,
    },
  },
})
