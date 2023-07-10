<template>
  <div class="select-container">
    <div class="select-wrapper">
      <el-select v-model="internalValue" filterable @change="handleChange">
        <el-option
          v-for="item in options"
          :key="item.symbol"
          :label="item.pair"
          :value="item.symbol"
        />
      </el-select>
    </div>
    <div class="option-list-container">
      <table class="option-list">
        <thead>
          <tr>
            <th>代码</th>
            <th>名字</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in options"
            :key="item.symbol"
            :class="{ 'selected': internalValue === item.symbol }" 
            @click="handleOptionClick(item.symbol)"
          >
            <td>{{ item.symbol }}</td>
            <td>{{ item.name }}</td>
            <td>{{ "0.00"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

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

.select-wrapper {
  width: 30%;
  margin-left: auto;
  position: fixed;
  right: 0;
  top: 0;
}

.select-wrapper .el-select {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.option-list-container {
  width: 30%;
  position: fixed;
  margin-left: auto;
  right: 0;
  top: 5%;
  max-height: 95%;
  overflow-y: auto; /* 显示滚动条 */
}

.option-list {
  width: 100%;
  padding: 0;
  list-style: none;
  right: 0;
  /* top: 4%; */
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}

.option-list tbody tr {
  cursor: pointer;
}

.option-list tbody tr:hover {
  background-color: #e0e0e0;
}
.option-list tbody tr.selected {
  background-color: #007bff; /* 修改选中行的背景颜色 */
  color: #fff; /* 修改选中行的文本颜色 */
}
</style>
