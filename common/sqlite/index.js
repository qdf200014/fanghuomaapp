const ctx = require.context(`./modules`, true, /index.js$/);

let sqlite = {};

//#ifdef APP-PLUS
const reg = /^\.\/(.*)\/index\.js$/;
ctx.keys().forEach((key) => {
	let modulesName = reg.exec(key)[1].trim();
	// console.log(key, modulesName, ctx(key).default);
	sqlite[modulesName] = ctx(key).default;	// 合并模块
})
//#endif

export {
	sqlite
} ;