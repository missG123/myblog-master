import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { prismjsPlugin } from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  prismjsPlugin({
    languages: ["json", "js"],
    //  languages: 'all',
    plugins: ["line-numbers"], //配置显示行号插件
    theme: "solarizedlight", //主题名称
    css: true,
  })
  ],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,

      }
    }
  },

  resolve: {
    // 引用src路径下的东西可以通过@/
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
    }]

  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: 'always',
        globalVars: {
          mainColor: "red"
        }
      }
    }
  }
})
