// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/main.less'
Vue.config.productionTip = false
import store1 from './vuex/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store1,
  components: { App },
  template: '<App/>'
})
