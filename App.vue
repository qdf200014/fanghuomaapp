<script>
	// #ifndef MP-ALIPAY || MP-WEIXIN
	import init from '@/common/init/index.js';
	// #endif
	
	import appConfig from '@/common/appConfig/appConfig.js'
	// #ifdef APP-PLUS
	import APPUpdate from "@/js_sdk/zhouWei-APPUpdate/APPUpdate/index.js";
	// #endif
	
export default {
	globalData:{
		api:null	,// 接口挂载
		// 节流函数
		throttle: function(fn, wait = 500, isImmediate = false) {
			let flag = true;
			if (isImmediate) {
				return function() {
					if (flag) {
						fn.apply(this, arguments);
						flag = false;
						setTimeout(() => {
							flag = true;
						}, wait);
					}
				};
			}
			return function() {
				if (flag == true) {
					flag = false;
					setTimeout(() => {
						fn.apply(this, arguments);
						flag = true;
					}, wait);
				}
			};
		},
		// 防抖函数
		debounce: function(fn, wait = 500, isImmediate = false) {
			let timerId = null;
			let flag = true; 
			if (isImmediate) {
				return function() {
					clearTimeout(timerId);
					if (flag) {
						fn.apply(this, arguments);
						flag = false;
					}
					timerId = setTimeout(() => {
						flag = true;
					}, wait);
				};
			}
			return function() {
				// console.log(timerId);
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					fn.apply(this, arguments);
				}, wait);
			};
		},
		// 判断是否正在通话
		isCall: false,
		signalingEventType: '',
		// app放后台的计时器
		appHideInterval: null,
		// 判断APP是否在后台
		isAppHide: false,
		// 重连循环
		reConnectObj: {
			interval: null,
			reNum: 0
		}
	},
	onLaunch: function() {
		console.log('App Launch', uni.getSystemInfoSync().safeArea);
		// 是否是测试版本
		if (true) {
			uni.showToast({
				title: '当前正在使用内部测试版',
				icon: 'none',
				duration: 5000
			})
		}
		
		
		// #ifndef MP-ALIPAY || MP-WEIXIN
		init();	// app初始化
		// #endif
		
		// #ifdef APP-PLUS
		APPUpdate(true);
		// #endif
		
		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow() {
		console.log('App Show');
		getApp().globalData.isAppHide = false
		clearInterval(getApp().globalData.appHideInterval)
		this.$store.dispatch('initNim/nimReConnect')
	},
	onHide: function() {
		console.log('App Hide');
		getApp().globalData.isAppHide = true
		clearInterval(getApp().globalData.appHideInterval)
		// getApp().globalData.appHideInterval = setInterval(() => {
		// 	console.log('60 S 后自动把自己杀掉');
		// 	plus.runtime.quit();
		// 	clearInterval(getApp().globalData.appHideInterval)
		// }, 1000 * 30)
	},
	onError(err) {
		console.warn('App Error_', err);
		// this.$store.state.initNim.errCommon.uploadInfo(err)
	}
};
</script>

<style>
/*每个页面公共css */ 
@import '@/common/free.css';
@import '@/common/theme.css';
@import '@/common/NIM/easyChat.css';

/* #ifdef MP-WEIXIN || MP-ALIPAY */
page{
	background-color: #FFFFFF;
}
/* #endif */

/* #ifdef APP-PLUS ||MP-WEIXIN */
		checkbox .wx-checkbox-input  {
			border-radius: 50% !important;
			/* color: #ffffff !important; */
		}
	
		checkbox .wx-checkbox-input.wx-checkbox-input-checked {
			color: #fff;
			background: #09C2C9;
		}
	
		checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
			font-size: 32rpx;
		}
	
/* #endif */
</style>
