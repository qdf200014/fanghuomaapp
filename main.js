import Vue from 'vue'
import App from './App'
import store from './store/index.js'
//配置公共方法
// import common from './common/common.js'
// Vue.prototype.$noMultipleClicks = common.noMultipleClicks;

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;

const app = new Vue({
    ...App,
	store
})
app.$mount()