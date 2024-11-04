import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import { MotionPlugin } from '@vueuse/motion'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/index.css'
import './styles/tailwind.css'
import 'element-plus/dist/index.css'
import { inputLengthLimit } from '@/inputEvent'
import { resize } from '@/directives'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(MotionPlugin)
// 全局注册 resize 指令
app.directive('resize', resize)
setupStore(app)

app.mount('#app')

inputLengthLimit()
