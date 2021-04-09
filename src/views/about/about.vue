<template>
  <div class="about">
    <input type="text" v-model="age" />
  </div>
</template>

<script lang="ts">
import defineComponent from "./about";
export default defineComponent;
</script>

<style lang="less">
@import "./about.less";
</style>
