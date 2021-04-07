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

function name(str) {
  let userID = ref(str);
  return {
    userID,
  };
}
export default defineComponent({
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  setup() {
    const userID = "111";
    return {
      ...name(userID)
    };

    // onMounted(() => {

    // });
  },
});
</script>
