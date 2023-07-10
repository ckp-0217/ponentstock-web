<template>
  <div>
    <el-main v-if="symbol">
      <SelectComponent :options="symbolTypesList"  :symbolTypes="symbolTypesList" @update:value="symbolTypesList = $event" @change="fetchData"
        placeholder="预设组别" />
      <SelectComponent :options="symbolList.value" v-model="symbol"  @change="changeHandler"  />
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
    
    const symbolTypesList = reactive({ value: [] as any });
    const selectedSymbolType = ref('');

    onMounted(async () => {
      const getSymbolsData = await getSymbols();
      symbolList.value = getSymbolsData.list;
      symbol.value = getSymbolsData.data;
      symbolInfo.value = getSymbolsData.list[0];

      const getSymbolTypesData = await getSymbolTypes();
      symbolTypesList.value=getSymbolTypesData
      console.log(getSymbolTypesData)

    });

    const changeHandler = (e) => {
      symbol.value = e;
      kLineRef.value.setSymbol(e);
    };

    const fetchData = async (selectedType) => {
      // const allSymbolsData = await getSymbols();
      // const selectedSymbolsData = allSymbolsData.list.filter(group => group.name === selectedType);

      // if (selectedSymbolsData.length > 0) {
      //   symbolList.value = selectedSymbolsData[0].data;
      //   symbol.value = selectedSymbolsData[0].data[0].symbol;
      //   symbolInfo.value = selectedSymbolsData[0].data[0];
      // }
    };

    return {
      symbol,
      symbolList,
      symbolInfo,
      changeHandler,
      kLineRef,
      symbolTypesList, // Include symbolTypesList in the return object
      // selectedSymbolType,
      fetchData,
    };
  },
});

</script>
