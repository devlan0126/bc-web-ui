<template>
  <div class="table-header-setting">
    <el-popover placement="left-start" title="" trigger="click" @show="show" popper-class="table-header-setting-popover" v-model="visible">
      <el-button slot="reference" type="primary" plain size="mini" class="form-btn" style="font-size: 12px" title="字段设置">
        <i class="fa fa-stream" aria-hidden="true"></i>
      </el-button>
      <div class="list-wrap">
        <div class="columns-content" v-loading="loading">
          <div class="columns-wrap" v-for="(cols, outIndex) in list" :key="`list-${outIndex}`">
            <table class="itxst">
              <tr>
                <th></th>
                <th>序号</th>
                <th style="text-align: left; padding-left: 10px">指标</th>
              </tr>
              <draggable
                v-model="splitCols[`tb${outIndex}`]"
                :group="group"
                animation="1000"
                force-fallback
                handle=".move"
                style="width: 100%"
                ghost-class="ghost"
                chosen-class="chosen"
                element="tbody"
                filter=".unmover"
                @start="startEvent($event, cols)"
                @end="endEvent($event, cols)"
                @add="addEvent($event, cols)"
                @remove="removeEvent($event, cols)"
              >
                <tr v-for="(item, index) in cols" :key="index" :class="item.fixedable || item.fixed ? 'unmover' : 'move'">
                  <td style="width: 40px">
                    <el-checkbox v-model="item.checked" @change="changeEvent"> </el-checkbox>
                  </td>
                  <td style="width: 40px">
                    {{ index + outIndex * 20 + 1 }}
                  </td>
                  <td style="width: auto; text-align: left; padding-left: 10px;padding:0 5px;">
                    {{ item[prop.label] }}
                  </td>
                </tr>
              </draggable>
            </table>
          </div>
        </div>
      </div>
      <div class="btn-wrap" v-loading="saveLoading">
        <div class="btn-group">
          <el-button @click="cancelEvent" title="取消当前的操作">取消设置</el-button>
          <el-button type="primary" @click="saveEvent" title="保存当前的设置">保存设置</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

const isChinese = char => {
  const chineseMatch = new RegExp('[\u4e00-\u9fa5]+')
  return chineseMatch.test(char)
}

const calStringsWidth = str => {
  let width = 0
  for (let i = 0; i < str.length; i++) {
    width += isChinese(str[i]) ? 18 : 8
  }
  return width
}

const initColumnWidth = col => {
  const sortableWidth = 20
  if (col.label.length < 3) {
    return 90 + sortableWidth
  }
  if (col.label.length < 5) {
    return col.label.length * 25 + sortableWidth
  }
  return calStringsWidth(col.label) + sortableWidth
}

const rowCnt = 20
const splitColumns = (columns, rowCnt) => {
  const result = []
  let temp = []
  let count = 0
  columns.forEach(column => {
    if (count >= rowCnt) {
      result.push(temp)
      temp = []
      count = 0
    }
    temp.push(column)
    count++
  })
  if (temp.length > 0) {
    result.push(temp)
  }
  return result
}

export default {
  name: 'TableCololumsConf',
  model: {
    prop: 'value', // 默认是value
    event: 'input' // 默认是input
  },
  props: {
    title: {
      type: String,
      default: '字段设置'
    },
    originColumns: {
      type: Array,
      default() {
        return []
      }
    },
    prop: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    menuId: {
      type: String,
      default: ''
    },
    isRemote: {
      type: Boolean,
      default: false
    },
    saveFieldsRequest:{
      type:Function,
    },
    getFieldsRequest:{
      type:Function,
    },
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: [],
      isIndeterminate: true,
      allCheck: false,
      leftFixedColumns: [],
      splitCols: {},
      group: {
        name: 'itxst',
        pull: true, //可以拖出
        put: true //可以拖入
      },
      shouldArrange: false,
      isCrossGroup: false,
      sourceColumns: [],
      timer: null,
      saveLoading: false,
      columnSource: {
        list: [],
        defaultChecked: false
      }
    }
  },
  components: {
    draggable
  },
  computed: {},
  watch: {
    originColumns: {
      handler() {
        this.encodeColumns(this.originColumns)
      },
      deep: true,
      immediate: true
    },

    'columnSource.list': {
      handler(v) {
        if (v.length > 0) {
          this.init()
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.menuId) {
      this.$nextTick(() => {
        if (this.isRemote) {
          this.getFields({ menuId: this.menuId })
        } else {
          this.getFieldsByJSON()
        }
      })
    }
  },
  methods: {
    encodeColumns(columns, defaultChecked) {
      this.leftFixedColumns = columns.filter(ele => ele.fixedable || ele.fixed)
      const restColumns = columns.filter(ele => !ele.fixedable || ele.fixed)
      const temp = restColumns.map(ele => {
        return {
          ...ele,
          ...(defaultChecked && {
            checked: true
          })
        }
      })
      this.list = splitColumns(temp, rowCnt)
      for (let i = 0; i < this.list.length; i++) {
        this.splitCols[`tb${i}`] = this.list[i]
      }
    },
    show() {
      this.update()
    },
    emitValue() {
      let allList = []
      this.list.forEach(item => {
        allList = allList.concat(item)
      })
      const fields = [...this.leftFixedColumns, ...this.filter(allList)]
      this.$emit('input', fields)
      this.$nextTick(() => {
        this.$emit('doLayout')
      })
    },
    filter(list) {
      if (list?.length > 0) {
        return list.filter(ele => ele.checked)
      }
      return []
    },
    changeEvent() {
      this.update()
    },
    allCheckChange(v) {
      this.isIndeterminate = false
      this.list.forEach(item => {
        item.checked = v
      })
      this.update()
      // this.emitValue();
    },
    update() {
      let checkedCount = 0
      this.list.forEach(item => {
        if (item.checked) {
          checkedCount++
        }
      })
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
      if (checkedCount === this.list.length) {
        this.allCheck = true
      }
    },
    addEvent(e, v) {
      this.isCrossGroup = true
      const {
        newIndex,
        item: { _underlying_vm_ }
      } = e
      v.splice(newIndex, 0, _underlying_vm_)
      if (v.length > rowCnt) {
        this.shouldArrange = true
      }
    },
    removeEvent(e, v) {
      const { oldIndex } = e
      v.splice(oldIndex, 1)
      if (v.length === 0) {
        this.shouldArrange = true
      }
      this.$nextTick(() => {
        this.arrangeColumns()
      })
    },
    arrangeColumns() {
      this.shouldArrange = false
      this.loading = true
      let allList = []
      this.list.forEach(item => {
        allList = allList.concat(item)
      })

      this.list = splitColumns(allList, rowCnt)
      for (let i = 0; i < this.list.length; i++) {
        this.splitCols[`tb${i}`] = this.list[i]
        this.loading = false
      }
    },
    endEvent(e, cols) {
      if (!this.isCrossGroup) {
        const { newIndex, oldIndex } = e
        if (newIndex !== oldIndex) {
          const temp = cols[oldIndex]
          cols.splice(oldIndex, 1)
          cols.splice(newIndex, 0, temp)
        }
        this.arrangeColumns()
      }
      this.isCrossGroup = false
    },
    startEvent() {},
    saveEvent() {
      this.emitValue()
      if (this.isRemote) {
        let allList = []
        this.list.forEach(item => {
          allList = allList.concat(item)
        })
        this.saveFields([...this.leftFixedColumns, ...allList])
      } else {
        this.cancelEvent()
      }
    },
    async saveFields(fields) {
      if (this.menuId) {
        this.saveLoading = true
        const { code } = await this.saveFieldsRequest({
          menuId: this.menuId,
          json: JSON.stringify(fields)
        })
        if (code === 200) {
          this.$message.success('保存成功')
          this.cancelEvent()
        }
        this.saveLoading = false
      }
    },
    async getFields(params) {
      const { code, data } = await this.getFieldsRequest(params)
      if (code === 200) {
        if (data) {
          const lst = JSON.parse(data.json)
          this.columnSource.list = lst.map(ele => {
            const originColumn = this.originColumns.find(col => col.prop === ele.prop)
            return {
              ...ele,
              ...originColumn,
              label: originColumn.label,
              minWidth: initColumnWidth(originColumn)
            }
          })
          this.columnSource.defaultChecked = false
        } else {
          this.getFieldsByJSON()
        }
      }
    },
    getFieldsByJSON() {
      this.columnSource.list = this.originColumns.map(ele => {
        return {
          ...ele,
          label: ele.label,
          minWidth: initColumnWidth(ele)
        }
      })
      this.columnSource.defaultChecked = true
    },
    cancelEvent() {
      this.visible = false
    },
    init() {
      this.encodeColumns(this.columnSource.list, this.columnSource.defaultChecked)
      this.emitValue()
    }
  }
}
</script>

