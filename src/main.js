/*
 * @Author: devlan0126 wyang0126@163.com
 * @Date: 2024-05-16 14:53:49
 * @LastEditors: devlan0126 wyang0126@163.com
 * @LastEditTime: 2024-05-29 17:15:21
 * @FilePath: \bc-web-ui\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../components/css/SpreadFormCard.scss'
import SpreadFormCard from  '../components/lib/SpreadFormCard/index'
Vue.use(SpreadFormCard)

import '../components/css/SpreadFormPage.scss'
import SpreadFormPage from  '../components/lib/SpreadFormPage/index'
Vue.use(SpreadFormPage)

import '../components/css/SpritTable.scss'
import SpritTable from  '../components/lib/SpritTable/index'
Vue.use(SpritTable)

import '../components/css/TableCololumsConf.scss'
import TableCololumsConf from  '../components/lib/TableCololumsConf/index'
Vue.use(TableCololumsConf)

Vue.use(ElementUI, {
  size:   'small' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
