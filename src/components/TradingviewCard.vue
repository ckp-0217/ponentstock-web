<template>
<div>
    <div class="chart1">
        <ECharts ref="chart1" :option="cntbData" />
        <hr />         
    </div>
  <!--   <div class="chart2">
        <ECharts ref="chart2" :option="k1" />
        <hr />
    </div> -->
    <div>
        <!-- <s-tradingview-pc :marketName="marketName" :marketId="marketId" :wsUrl="wsUrl" :decimal="decimal" class="tradingviewView" /> -->
    </div>

</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    h
} from "vue";
import * as echarts from "echarts";
import {
    createComponent
} from "echarts-for-vue";
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineChart,
    LineSeriesOption,
} from "echarts/charts";
import {
    cntbData
} from "../api/mock/cntb";
import {
    k1
} from "../api/mock/kline";

export default defineComponent({
    components: {
        ECharts: createComponent({
            echarts,
            h,
        }), // 作为组件使用
    },
    data() {
        return {
            cntbData: cntbData.option,
            k1: k1.option,
        };
    },
    methods: {},
    /* setup() {

            const cntbData: any = ref(aa);

            onMounted(() => { //需要获取到element,所以是onMounted的Hook

            })
            return {
                cntbData:cntbData
            }
        }, */
});
</script>

<style lang="less" scoped>
.chart1 {
    width: 600px;
    height: 500px;
}
</style>
