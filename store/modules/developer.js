const state = {
  isDeveloper:false	,// 是否开发者
  testNum:0,
  timer:null
}
const getters = {
  isDeveloper: (state) => {
	  return state.isDeveloper;
  }
}
const mutations = {
  setDeveloper(state){
		state.testNum = (state.testNum + 1) % 8;
		state.isDeveloper = state.testNum == 7;
		state.isDeveloper && uni.showToast({
			icon:'none',
			title:'您已进入开发者模式'
		});
		uni.$isDeveloper = state.isDeveloper;
		if(state.timer)clearTimeout(state.timer);
		state.timer = setTimeout(()=>{
			state.testNum = 0;
			clearTimeout(state.timer);
			state.timer = null;
		}, 1500)
  }
}
const actions = {
  setDeveloper({ commit }) {
	  if(state.testNum != 7){
		  commit('setDeveloper');
	  }
  }
}
export default { state, getters, mutations, actions }