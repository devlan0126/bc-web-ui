<template>
  <div id="app">
    <SpreadFormCard title="基本信息" domId="basicInfo">
      <div>SpreadFormCard 基本信息</div>
    </SpreadFormCard>
    <SpritTable :headers="headers" :datas="datas" style="width: 600px;"/>
    <TableCololumsConf style="display: inline-block" :origin-columns="originColumns" v-model="columns" menuId="operate-hosp-index" />
    <ul>
      <li v-for="item in columns" :key="item.prop">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      headers: [
        {
          label: "发起数量",
          prop: "a",
        },
        {
          label: "审核中数量",
          prop: "b",
        },
        {
          label: "审核通过数量",
          prop: "c",
        },
        {
          label: "审核未通过数量",
          prop: "d",
        },
      ],
      datas: [
        {
          'row-caption': "申请",
          a: "44",
          b: "12",
          c: "123",
          d: "1234",
        },
        {
          'row-caption': "申诉",
          a: "12",
          b: "12",
          c: "123",
          d: "1234",
        },
        {
          'row-caption': "复议",
          a: "12",
          b: "12",
          c: "123",
          d: "1234",
        },
      ],
      originColumns:[
        { label: '医保区划', prop: 'drgAdmdvsName' },
        { label: '医疗机构名称', prop: 'fixmedinsName' },
        { label: '医疗机构编码', prop: 'fixmedinsCode' },
        { label: '结算ID', prop: 'setlId' },
        { label: '退出医疗费总额', prop: 'exitFundPayamt' },
        { label: '支付标准', prop: 'payStd' },
        { label: '月结DRG/DIP基金支付', prop: 'monDrgFundPay' },
        { label: '年清DRG/DIP基金支付', prop: 'yearDrgFundPay' },
        { label: '就诊ID', prop: 'mdtrtId' },
        { label: '人员编号', prop: 'psnNo' },
        { label: '人员姓名', prop: 'psnName' },
        { label: '证件号码', prop: 'certno' }
      ],
      columns: []
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
