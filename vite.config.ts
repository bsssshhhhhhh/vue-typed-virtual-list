import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      fileName: 'vue-big-list',
      entry: './src/main.ts',
      formats: ['es'],
      name: 'VueBigList'
    },

    rollupOptions: {
      external: ['vue', 'lodash', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
    },

    sourcemap: true
  },


  plugins: [
    vue(),
    vueJsx(),
    dts()
  ]
});
