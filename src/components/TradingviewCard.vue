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
        <p>KLineChart k线图</p>
        <div id="basic-k-line" class="k-line-chart"></div>
        <hr />
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
} from "../api/mock/kline-k1";
import {
    dispose,
    init
} from "klinecharts";
import generatedKLineDataList from '@/api/mock/generatedKLineDataList'

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
    methods: {},
    mounted: function () {
        const kLineChart = init('basic-k-line')
        kLineChart?.applyNewData(generatedKLineDataList())
    },
    setup() {
        /* onMounted(() => {
            //需要获取到element,所以是onMounted的Hook
            const kLineChart = init("basic-k-line")
            kLineChart ? .applyNewData(generatedKLineDataList())
        }); */
        onUnmounted(() => {
            dispose('basic-k-line')
        });
    },
});
</script>

<style lang="less" scoped>
.chart1 {
    width: 600px;
    height: 500px;
}

.chart2 {
    width: 600px;
    height: 500px;
}

.chart3 {
    width: 600px;
    height: 500px;
}
</style>
