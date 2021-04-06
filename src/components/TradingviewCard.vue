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

    <div class="chart3">
     <p>tradingview K线图</p>
        <div id="chart_container" class="f-fill"></div>
    </div>
     
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
    reactive,
    h
} from "vue"
import * as echarts from "echarts"
import {
    createComponent
} from "echarts-for-vue"
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineChart,
    LineSeriesOption,
} from "echarts/charts"
import {
    cntbData
} from "@/api/mock/cntb.js"
import {
    k1
} from "@/api/mock/kline-k1.js"
 


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
            k1: k1,
        };
    },
    methods: {
         
    },
     
    setup() {
         onMounted(() => {
            //需要获取到element,所以是onMounted的Hook
            console.log('qqqqqqqqq')
             
        }); 
        // onUnmounted(() => {
        //     dispose('basic-k-line')
        // });
    },
});
</script>

<style lang="less" scoped>
.chart1 {
    width: 600px;
    height: 500px;
    margin:50px 0;
}

.chart2 {
    width: 600px;
    height: 500px;
    margin:50px 0;
}

.chart3 {
    width: 600px;
    height: 500px;
    margin:50px 0;
}
</style>
