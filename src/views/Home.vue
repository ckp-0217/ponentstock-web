<template>
  <div>
    <el-select v-model="symbol" filterable @change="changeHallder">
      <el-option
        v-for="item in symbolList.value"
        :key="item.symbol"
        :label="item.pair"
        :value="item.symbol"
      />
    </el-select>
    <el-main v-if="symbol">
      <KLineWidget
        :symbolInfo="symbolInfo"
        :symbol="symbol.toLocaleUpperCase()"
        ref="kLineRef"
      />
    </el-main>
    <DemoEchart />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import DemoEchart from "@/components/DemoEchart/DemoEchart.vue";
import KLineWidget from "@/components/DemoTradingview/KLineWidget.vue";

import { ws } from "@/api/socket";
import { getSymbols } from "@/api/stock";
// import { getSymbols } from "@/api/huobi";

export default defineComponent({
  name: "Home",
  components: {
    // DemoEchart,
    KLineWidget,
  },
  setup() {
    const symbolList = reactive({ value: [] as any });
    const symbol = ref("");
    const symbolInfo = ref(null);
    const kLineRef = ref(null as any);
    onMounted(async () => {
      ws.initWebSocket();
      const getSymbolsData = await getSymbols();
      symbolList.value = getSymbolsData.list;
      symbol.value = getSymbolsData.data;
      symbolInfo.value = getSymbolsData.list[0];
    });
    const changeHallder = (e) => {
      console.log('eeeeeee',e)
      symbol.value = e;
      kLineRef.value.setSymbol(e);
    };

    return {
      symbol,
      symbolList,
      symbolInfo,
      changeHallder,
      kLineRef,
    };
  },
});
</script>

<style scoped lang="less"></style>
