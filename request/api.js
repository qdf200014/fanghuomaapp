const ctx = require.context(`./modules`, false, /.js$/);

let interfaceList = {};
const reg = /^\.\/(.*)\.js$/;
ctx.keys().forEach((key) => {
	let modulesName = reg.exec(key)[1].trim();
	interfaceList[modulesName] = ctx(key).default;	// 合并模块
})

function bindInterface(){
	getApp({allowDefault: true}).api = interfaceList;	// api全局挂载
}

function bindInterfaceToUni(){
	uni.$api = interfaceList;
}

export {
	bindInterface,
	interfaceList,
	bindInterfaceToUni
};