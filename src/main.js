// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Axios from 'axios'

import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import '@/assets/css/scrollbar.css'

Vue.use(ElementUI)

// Axios.defaults.baseURL = "https://api.jiebangbang.cn/manager";
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

Axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 接口错误拦截
Axios.interceptors.response.use(res => {
  return res.data
}, err => {
  app.$notify.error({
    title: '服务错误',
    message: '服务器响应错误 ' + err.message
  })
  return Promise.reject(err)
})


Vue.prototype.$http = Axios
Vue.http = Axios

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

window.app = app
