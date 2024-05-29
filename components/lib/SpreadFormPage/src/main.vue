<template>
  <transition name="el-fade-in-linear">
    <div class="child-form-page">
      <div class="my-children-page-wrapper">
        <div class="content">
          <slot />
        </div>
        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BcSpreadFormPage',
  model: {
    prop: 'show',
    event: 'closeAll'
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$emit('closeAll', false)
    }
  }
}
</script>
