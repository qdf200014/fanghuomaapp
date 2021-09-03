import appConfig from '@/common/appConfig/appConfig.js'

function addMiddleListener(){
	uni.onTabBarMidButtonTap(()=>{
		// if (appConfig.middleBtnDisable) {
		// 	uni.showToast({
		// 		title: appConfig.tipText,
		// 		icon: 'none'
		// 	})
		// 	return;
		// }
		uni.navigateTo({
			url: '/pages/addrBook/index',	// /pages/addrBook/index /pages/addrBook/provDetail
			animationType:'slide-in-bottom'
		});
	})
}

export {
	addMiddleListener
}