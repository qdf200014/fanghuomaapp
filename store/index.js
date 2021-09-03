import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

const store = new Vuex.Store({
	modules
	// 内存数据状态，UI可通过this.$store.state.* 获得数据
	// state,
	// 唯一拥有更改内存数据的接口，不可进行异步操作
	// mutations,
	// 与mutation通讯，ui层写入内存数据的接口，可异步操作
	// actions
	
})

export default store
