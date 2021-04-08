<template>
  <div class="about">
    <h1>This is an about page {{ userID }}</h1>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  watchEffect,
  getCurrentInstance,
} from "vue";

import { name } from "./about";

export default defineComponent({
  setup() {
    const userID = "111";
    return {
      ...name(userID),
    };

    // onMounted(() => {

    // });
  },
});
</script>

<style lang="less">
@import "./about.less";
</style>
