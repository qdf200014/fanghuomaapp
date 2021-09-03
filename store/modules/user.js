const state = {
  info:(uni.getStorageSync('userInfo') || {}),	// 用户详情
  selectedList:[],								// 已选择用户列表
  provinceCodeList:['全部','国家级'],							//省区域码
  cityCodeList:['全部'],								//市区域码
  countryCodeList:['全部'],								//市区域码
}
const getters = {
  info: (state) => {
	  return state.info;
  },
  selectedList:(state)=> {
	  return state.selectedList;
  },
  provinceCodeList:(state)=> {
  	  return state.provinceCodeList;
  },
  cityCodeList:(state)=> {
  	  return state.cityCodeList;
  },
  countryCodeList:(state)=> {
  	  return state.countryCodeList;
  }
}
const mutations = {
  setAreaCode(state,areaCode){
	  state.provinceCodeList = areaCode
	  console.log(state.provinceCodeList)
  },
  setCityAreaCode(state,areaCode){
  	  state.cityCodeList = areaCode
  	  console.log(state.cityCodeList)
  },
  setCountryCode(state,areaCode){
  	  state.countryCodeList = areaCode
  	  console.log(state.countryCodeList)
  },
  setInfo(state, changedInfo){
	  let userInfo = state.info;
	  userInfo = Object.assign({}, userInfo, changedInfo);
	  uni.setStorageSync('userInfo', userInfo);
	  state.info = userInfo;
  },
  clearInfo(state){
	  console.log('info', state.info);
	  state.info = {};
  },
  
  /**
   * 通讯录相关操作
   */
  // 清除选中人员
  clearSelectedList(state){
	  state.selectedList = [];
  },
  
  // 添加选中人员
  selectUser(state, list){
	  let _list = state.selectedList;
	  
	  list.forEach((item)=>{
		  _list = _list.filter(_item=>_item.userId != item.userId);
		  _list.unshift(item);
	  })
	  
	  state.selectedList = _list;
  },
  
  // 移除选中人员
  unSelectUser(state, list){
	  let _list = state.selectedList;
	  list.forEach(item=>{
		  _list = _list.filter(_item=>_item.userId != item.userId);
	  })
	  state.selectedList = _list;
  },
   
}
const actions = {
  getUserInfo({ commit }) {	// get user's information
	  uni.$api.user.getuserinfo()
	  	.then(res => {
			console.log('getuserinfo_RES', res);
			commit('setInfo', res.data.data);
	  	})
	  	.catch(err => {
	  		console.log('getuserinfo_ERR', err);
	  	});
  },
  //获取区域码
  getareacodelist({commit},areaData) {	// get user's information
  	  uni.$api.user.getareacodelist({
  		  attr: areaData.attr > 3 ? 10 : areaData.attr,
  		  Area: areaData.attr > 3 ? 10 : areaData.Area
  	  })
  	  	.then(res => {
  			console.log('setAreaCode', res)
			areaData.attr == 1 ? commit('setAreaCode', res.data.data) : areaData.attr == 2 ? commit('setCityAreaCode', res.data.data) : areaData.attr == 3 ? commit('setCountryCode', res.data.data) : ''
  	  	})
  	  	.catch(err => {
  	  		console.log('getuserinfo_ERR', err);
  	  	});
  },
  
  resetInfo({ commit }){	// reset user's information
	  commit('clearInfo');
	  commit('setInfo', uni.getStorageSync('userInfo') || {} );
  },
  /**
   * 通讯录选中人员相关
   */
  clearSelected({ commit }){
	  commit('clearSelectedList');
  },
  selectUser({ commit }, list){
	  commit('selectUser', list);
  },
  unSelectUser({ commit }, list){
	  commit('unSelectUser', list);
  }
}
export default { namespaced: true,  state, getters, mutations, actions }