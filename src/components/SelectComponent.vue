<template>
  <div class="select-container">
    <div class="select-wrapper">
      <el-select v-model="selectedSymbolType" filterable @change="handleSymbolTypeChange" placeholder="预设组别" >
        <el-option v-for="item in symbolTypes" :key="item" :value="item" :label="item" />
      </el-select>

      <el-select v-model="internalValue" filterable @change="handleChange" placeholder="查询">
        <el-option v-for="item in options" :key="item.symbol" :label="item.pair" :value="item.symbol" />
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
          <tr v-for="item in options" :key="item.symbol" :class="{ 'selected': internalValue === item.symbol }"
            @click="handleOptionClick(item.symbol)">
            <td>{{ item.symbol }}</td>
            <td>{{ item.name }}</td>
            <td>{{ "0.00" }}</td>
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
    symbolTypes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      internalValue: this.value,
      selectedSymbolType: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.internalValue = newValue;
      },
    },
    internalValue: {
      immediate: true,
      handler(newValue) {
        this.$emit("update:value", newValue);
      },
    },
  },

  methods: {
    handleChange(newValue) {
      this.internalValue = newValue;
      this.$emit("change", newValue);
    },
    handleSymbolTypeChange(newValue) {
      console.log(newValue)
      this.selectedSymbolType = newValue;
      this.$emit('fetchData', newValue);
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
  width: 25%;
  margin-left: auto;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  /* Display the select boxes in a row */
  align-items: center;
  /* Center align the items horizontally */
}

.select-wrapper .el-select {
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 4px;

}

.option-list-container {
  width: 25%;
  position: fixed;
  margin-left: auto;
  right: 0;
  top: 5%;
  max-height: 95%;
  overflow-y: auto;
  /* 显示滚动条 */
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

tr {
  text-align: left;
}

.option-list tbody tr:hover {
  background-color: #e0e0e0;
}

.option-list tbody tr.selected {
  background-color: #007bff;
  /* 修改选中行的背景颜色 */
  color: #fff;
  /* 修改选中行的文本颜色 */
}
</style>
