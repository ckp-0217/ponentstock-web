import { h } from 'vue'
import app from '@/core/app'
import * as echarts from 'echarts'
import { plugin } from 'echarts-for-vue'

app.use(plugin, { echarts, h })