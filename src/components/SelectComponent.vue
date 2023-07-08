<template>
  <div class="select-container">
    <el-select v-model="internalValue" filterable @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.symbol"
        :label="item.pair"
        :value="item.symbol"
      />
    </el-select>
    <ul class="option-list">
      <li v-for="item in options" :key="item.symbol" @click="handleOptionClick(item.symbol)">
        {{ item.pair }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SelectComponent",
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    },
    internalValue(newValue) {
      this.$emit("update:value", newValue);
    },
  },
  methods: {
    handleChange(newValue) {
      this.internalValue = newValue;
      this.$emit("change", newValue);
    },
    handleOptionClick(value) {
      this.internalValue = value;
      this.$emit("change", value);
    },
  },
});
</script>

<style scoped>
.select-container {
  display: flex;
  justify-content: flex-end;
}

.select-container .el-select {
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
}

.option-list-container {
  /* position: absolute; */
  /* top: 100%; */
  right: 0;
  max-height: 200px; /* 根据需要设置最大高度 */
  overflow-y: auto;
  background-color: #f5f5f5;
}

.option-list {
  padding: 0;
  /* margin: 0; */
  list-style: none;
}

.option-list li {
  padding: 5px;
  cursor: pointer;
}

.option-list li:hover {
  background-color: #e0e0e0;
}
</style>