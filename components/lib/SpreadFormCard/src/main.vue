<template>
  <div class="spread-card" :id="domId">
    <el-collapse v-model="activeName" @change="handleChange" class="spread-card-collapse">
      <el-collapse-item :title="title" :name="domId">
        <template slot="title"
          ><span class="spread-card-title"> {{ title }}</span>
        </template>
        <div class="spread-card-content"><slot /></div> </el-collapse-item
    ></el-collapse>
  </div>
</template>

<script>
const time = new Date().getTime()
const domId = `spreadCard-${time}`

export default {
  name: 'SpreadFormCard',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    domId: {
      type: String,
      default: domId
    }
  },
  data() {
    return {
      activeName: domId
    }
  },
  watch: {
    domId: {
      handler(val) {
        this.activeName = val
      },
      immediate: true
    }
  },
  methods: {
    handleChange() {}
  }
}
</script>

