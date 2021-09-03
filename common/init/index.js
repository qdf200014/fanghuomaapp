import { bindInterface, bindInterfaceToUni } from '@/request/api.js';
import { addMiddleListener } from '../middlePage/index.js';
import { securityPolicy } from '@/common/wt-security/index.js';
//#ifdef APP-PLUS
import {sqlite} from '@/common/sqlite/index.js';
// import { WTVersion } from '../wt-version/index.js';
import APPUpdate from "@/js_sdk/zhouWei-APPUpdate/APPUpdate";
import APPReplace from "@/js_sdk/zhouWei-APPUpdate/APPReplace";
import push from '@/common/wt-push/index.js';

import { initShareFile } from '@/common/shareFile/index.js';
//#endif

function init(){
	bindInterface();	// 接口全局挂载globaldata
	bindInterfaceToUni();	// 接口挂载全局uni
	addMiddleListener();	// 添加中间按钮监听
	loadFont();				// 添加字体文件
	screenLock();
	securityPolicy();
	checkVersionAndUpdate();
	//#ifdef APP-PLUS
	push();
	initShareFile();
	//#endif
}
function loadFont() {	// 添加字体文件
	//#ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
		'fontFamily': "Oswald-Regular",
		'src': "url('/static/font/Oswald-Regular.ttf')"
	});
	//#endif
}
function checkVersionAndUpdate(){	// 检测版本更新
	//#ifdef APP-PLUS
	APPUpdate();
	APPReplace();
	// let myVersion = new WTVersion(plus.runtime),
	// 	type = uni.getSystemInfoSync().platform == "ios" ? 1 : 2;
	// uni.$api.version.appversion({type})
	// .then(res=>{
	// 	console.log(res);
	// 	let netVersion = res.data.data;
		
	// 	myVersion.checkVersion(res.data.data);
	// })
	// .catch(err=>{
	// 	console.log(err);
	// })
	// /**
	//  * 请求后台,并将后台版本抛入version模块处理
	//  * myVersion.checkVersion();
	//  */
	//#endif
}
function screenLock(){
	//本段代码方便调试-屏幕常亮
	//#ifdef APP-PLUS
	!plus.device.isWakelock() && plus.device.setWakelock(true);
	//#endif
}
export default init;