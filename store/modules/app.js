const state = {
  runtime: getRuntime(),
  shareUrl:'http://118.25.137.52:9002/h5/index.html#/'	// https://static-33953337-2bdb-4106-84da-f365ec4a1b5f.bspapp.com/#/
}
const getters = {
  getRuntime: (state) => {
	  return state.runtime;
  }
}
const mutations = {
  setRuntime(state, nRuntime){
	  state.runtime = nRuntime;
  }
}
const actions = {
  setRuntime({ commit }) {	// 获取RoleTree
	  
  },
}

function getRuntime(){
	//#ifdef APP-PLUS
	return plus.runtime;
	//#endif
	//#ifndef APP-PLUS
	return {
		"appid": "__UNI__B1A8336",
		"arguments": "",
		"version": "0.0.0",
		"innerVersion": "0",
		"uniVersion": "0",
		"launchLoadedTime": 0,
		"launcher": "default",
		"origin": "default",
		"processId": "0",
		"startupTime": 0,
		"restart": ()=>{},
		"install": ()=>{},
		"getProperty": ()=>{},
		"quit": ()=>{},
		"openURL": ()=>{},
		"launchApplication": ()=>{},
		"setBadgeNumber": ()=>{},
		"openFile": ()=>{},
		"isStreamValid": ()=>{},
		"openWeb": ()=>{},
		"isApplicationExist": ()=>{},
		"processDirectPage": ()=>{},
		"isCustomLaunchPath": ()=>{},
		"updateInfo": ()=>{},
		"getDCloudId": ()=>{},
		"agreePrivacy": ()=>{},
		"disagreePrivacy": ()=>{},
		"isAgreePrivacy": ()=>{},
		"downloadFile": ()=>{},
		"versionCode": "0",
		"channel": ""
	};
	//#endif
}

export default { state, getters, mutations, actions }