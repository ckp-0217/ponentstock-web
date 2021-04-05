<template>
  <div>
    <TradingviewCard />
  </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted
} from 'vue'

import TradingviewCard from '@/components/TradingviewCard.vue';
import dayjs from 'dayjs'

export default defineComponent({
    components: {
        TradingviewCard,
    },
    setup() {
        console.log('setup')
        // onMounted(() => {
        //   console.log('setup-onMounted')
        // })
        // console.log(dayjs('2018-05-05').locale('zh-cn').format())
    },

})
</script>

<style scoped lang="less">

</style>
