let config = {
	// 提示文字
	tipText: '敬请期待正式上线~',
	// 首页菜单禁用的选项
	// homeMenuDisable: [],	// innerShare为分享按钮
	homeMenuDisable: ['jinshan', 'huishang', 'yujing', 'lishi', 'weixin', 'luntan', 'xuexi', 'innerShare'],	// innerShare为分享按钮
	// 中间通讯录按钮是否禁用
	// middleBtnDisable: true,
	//分享通讯录好友按钮是否禁用
	// dangerBtnDisable: true,
	
	// 是否是测试版
	ISALPHA: true,
	
	// 是否禁用底部某个 tabBar 栏
	tabBarDisable: [0,1,2,3],
	// tabBarDisable: [],
	// 绘制的禁用tabBar区域
}

// function initConfig() {
// 	if (config.tabBarDisable.length > 0) {
// 		// createTabBarView()
// 	}
// }

// function createTabBarView() {
// 	config.tabBarDisable.map(item => {
// 		let postion = [{
// 			bottom: '0px',
// 			left: '15px'
// 		}, {
// 			bottom: '0px',
// 			left: '81px'
// 		}, {
// 			bottom: '0px',
// 			left: '230px'
// 		}, {
// 			bottom: '0px',
// 			left: '300px'
// 		}]
		
// 		let view = new plus.nativeObj.View('test',{bottom: postion[item].bottom, left: postion[item].left, height:'50px',width:'50px'}, `tabBarView${item}`);
// 			view.interceptTouchEvent(true)
// 			view.addEventListener('click', e => {
// 				console.log('点击成功', e);
// 				uni.showToast({
// 					title: config.tipText,
// 					icon: 'none'
// 				})
// 			})
// 			// 绘制矩形
// 			view.drawRect({color:'#FF0000'}, {top:'0px',left:'0px',width:'100%',height:'100%'});
// 			view.show();
		
// 	})
// }

// initConfig()

export default config