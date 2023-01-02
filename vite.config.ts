// import { URL, fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons } from 'unocss'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    })
  ],
  resolve: {
    alias: {
      "@": "http://127.0.0.1:5173/src",
    }
  },
})
