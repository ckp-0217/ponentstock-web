<template>
  <div>
    <div class="chart1">
      <p>Echart 一般图表</p>
      <ECharts ref="chart1" :option="cntbData" />
      <hr />
    </div>
    <div class="chart2">
      <p>Echart K线图</p>
      <ECharts ref="chart2" :option="k1" />
      <hr />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, h } from "vue";
import * as echarts from "echarts";
import { createComponent } from "echarts-for-vue";
import { cntbData } from "@/api/mock/cntb.js";
import { k1 } from "@/api/mock/kline-k1.js";

export default defineComponent({
  name: "DemoEchart",
  components: {
    ECharts: createComponent({
      echarts,
      h,
    }), // 作为组件使用
  },
  data() {
    return {
      cntbData: cntbData.option,
      k1: k1,
    };
  },
  methods: {},

  setup() {
    console.log("setup");
    // onMounted(() => {
    //     updateWidget();
    // })
    // onUnmounted(() => {
    //     dispose('basic-k-line')
    // })
  },
});
</script>
<style lang="less" scoped>
.chart1 {
  width: 200px;
  height: 100px;
  margin: 50px 0;
}

.chart2 {
  width: 200px;
  height: 100px;
  margin: 50px 0;
}
</style>
