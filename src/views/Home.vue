<template>
  <div>
    <el-main v-if="symbol">
      <SelectComponent :options="symbolList.value" :listTypes="listTypes.value" :listValue="'全部'" v-model="symbol"
        @change="changeHandler" />      
        <KLineWidget :symbolInfo="symbolInfo" :symbol="symbol.toUpperCase()" ref="kLineRef" />
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import KLineWidget from '@/components/DemoTradingview/KLineWidget.vue';
import { getSymbols, getSymbolTypes } from '@/api/stock';
import SelectComponent from '@/components/SelectComponent.vue';

export default defineComponent({
  name: 'Home',
  components: {
    KLineWidget,
    SelectComponent,
  },
  setup() {
    const symbolList = reactive({ value: [] as any });
    const symbol = ref('');
    const symbolInfo = ref(null);
    const kLineRef = ref(null as any);
    const listTypes = reactive({ value: [] as any });
    onMounted(async () => {
      const getSymbolsData = await getSymbols();
      symbolList.value = getSymbolsData.list;
      symbol.value = getSymbolsData.data;
      symbolInfo.value = getSymbolsData.list[0];
      let response = await getSymbolTypes();
      response.data.unshift({ 'typename': '全部', 'symbol': symbolList.value });
      listTypes.value = response.data;
      console.log("symbolList.value", symbolList.value)
      console.log("listTypes.value", listTypes.value)
    });

    const changeHandler = (e) => {
      if (typeof e === "string") {
        symbol.value = e;
        console.log("eeeeeeeeeeeeeee", e)
        kLineRef.value.setSymbol(e);
      } else {
        console.log("e is not a string, its type is", e);
      }
    };


    return {
      symbol,
      symbolList,
      symbolInfo,
      changeHandler,
      kLineRef,
      listTypes
    };
  },
});
</script>
