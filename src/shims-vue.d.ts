/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'echarts-for-vue' {
  import { createComponent, plugin } from 'echarts-for-vue'
  export { createComponent, plugin }
}

declare module 'view-design' {
  const iview: any;
  export default iview;
}
