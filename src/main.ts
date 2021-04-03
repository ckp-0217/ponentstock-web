import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as echarts from 'echarts'
import { plugin } from 'echarts-for-vue'

import "@/theme/theme.less"

const app = createApp(App)


app.use(store)
app.use(router)
app.use(plugin, { echarts, h })
app.mount('#app')
