<template>
  <el-table
    class="sprite-table"
    :data="datas"
    :border="true"
    :fit="true"
    :style="{ width: '100%' }"
    :cell-class-name="cellClassName"
    header-row-class-name="header-row"
  >
    <el-table-column
      align="center"
      prop="row-caption"
      label-class-name="row-caption-label"
      width="90px"
    >
      <template slot="header">
        <div class="sprite-table-header"></div>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, index) in headers"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      header-align="center"
      align="center"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "BcSpritTable",
  props: {
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    cellClassName({ columnIndex }) {
      if (columnIndex === 0) {
        return "caption-cell";
      }
    },
  },
};
</script>
