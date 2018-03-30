// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/util/axiosApi'
import ElementUI from 'element-ui'
import store from '@/store/store'
import { deepDelete } from './util/common'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.less'
import VueI18N from 'vue-i18n'

Vue.use(VueI18N)
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.lang = 'zh-cn'

/* eslint-disable no-new */

Vue.filter('tableFilter', (list, keyList) => {
  if (keyList.length && list && (list.constructor === Array || list.constructor === Object)) {
    let obj = JSON.parse(JSON.stringify(list))
    deepDelete(obj, keyList)
    return obj
  } else {
    return list
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
