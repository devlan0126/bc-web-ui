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

Vue.use(ElementUI, {
  size:   'small' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
