<template>
  <div>
    <el-main v-if="symbol">
      <SelectComponent
        :options="symbolList.value"
        v-model="symbol"
        @change="changeHandler"
      />
      <KLineWidget :symbolInfo="symbolInfo" :symbol="symbol.toUpperCase()" ref="kLineRef" />
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import KLineWidget from '@/components/DemoTradingview/KLineWidget.vue';
import { getSymbols } from '@/api/stock';
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

    onMounted(async () => {
      const getSymbolsData = await getSymbols();
      symbolList.value = getSymbolsData.list;
      symbol.value = getSymbolsData.data;
      symbolInfo.value = getSymbolsData.list[0];
    });

    const changeHandler = (e) => {
      symbol.value = e;
      kLineRef.value.setSymbol(e);
    };

    return {
      symbol,
      symbolList,
      symbolInfo,
      changeHandler,
      kLineRef,
    };
  },
});
</script>
