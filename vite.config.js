import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import { terser } from "rollup-plugin-terser"; // 压缩代码
var args = process.argv ? process.argv.slice(2) : [];
// console.log('args', args);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    terser({
      compress: {
        // remove console.log
        pure_funcs: ["console.log"]
      }
    })
  ],
  base: './'
  /*build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/components/Vue3CountryIntl.vue'), // 入口文件
      name: 'vue3CountryIntl',
      // fileName: 'vue3CountryIntl'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        assetFileNames: "vue3-country-intl.css", // rollup-plugin-styles插件生成的css文件的名称
      }
    }
  }*/
})
