import Vue from 'vue'
import App from './App'
import request from '@/utils/request.js'
Vue.use(request, {
  //后台公共接口
  baseURL:'https://api-ugo-dev.itheima.net/api/public/v1/'
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
