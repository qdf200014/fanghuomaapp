const state = {
  roleTree:[]	// 组织机构
}
const getters = {
  roleTree: (state, codeArr) => {
	  let _list = state.roleTree;
	  codeArr = codeArr || [];
	  codeArr.forEach(code=>{
		  _list = _list[code].children;
	  });
	  return _list;
  }
}
const mutations = {
  setRoleTree(state, roleTree){
	  state.roleTree = roleTree;
  }
}
const actions = {
  setRoleTree({ commit }) {	// 获取RoleTree
	  uni.$api.onePhase.getRoleTree()
	  	.then(res => {
			// console.log('getRoleTree_RES', res);
			let _roleTreeList = res.data.data;
			if(Array.isArray(_roleTreeList)){
				commit('setRoleTree', _roleTreeList);
			}
	  	})
	  	.catch(err => {
	  		console.log('getRoleTree_ERR', err);
			commit('setRoleTree', []);
	  	});
  },
  clearRoleTree({ commit }){
	  commit('setRoleTree', []);
  }
}
export default { state, getters, mutations, actions }