import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import '@/assets/font/iconfont.js'

import VueMarkdownEditor from '@kangc/v-md-editor';
import VMPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import '@/mock/index.ts'
import 'animate.css'
import 'animate.css/animate.compat.css'

import { createPinia } from 'pinia'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
VMPreview.use(vuepressTheme, {
    Prism
})

const pinia = createPinia();

const app = createApp(App)
app.use(ElementPlus)
app.use(router);
app.use(pinia)
app.use(VueMarkdownEditor);
app.use(VMPreview)



app.mount('#app');