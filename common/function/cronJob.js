// 定时任务函数
// 包含了 监控用户长时间操作执行函数
import {createLockApp, changeUserLoginTypeNavigateTo} from '@/common/function/index.js'

// 执行登出操作
// 创建退出登录的计时器
// that 页面中的this 用来访问vuex
export function createSetIntervalLoginOut(that) {
	let time = 600 // 10分钟
	// console.log("创建成功   创建退出登录的计时器");
	let _Runtime = 0
	// 检查当前是否已经显示了弹窗
	let isShowModel = false
	
	setInterval(() => {
		_Runtime++
		// console.log('_Runtime_Runtime_Runtime', _Runtime);
		// console.log('检查用户是否进行了操作!!!!', getApp().globalData.isUserActions);
		
		if (getApp().globalData.isStopAppAutoLoginOut) {
			console.log("当前已停止监控");
			_Runtime = 0
		}
		
		if (getApp().globalData.isUserActions) {
			_Runtime = 0
			// console.log("归零归零归零归零归零归零归零归零");
			getApp().globalData.isUserActions = false;
		}
			
		
		if (time == _Runtime) {
			_Runtime = 0
			if (that.$store.state.userUID && !getApp().globalData.isUserActions && !isShowModel) {
				// that.$store.dispatch('logout');
				isShowModel = true
				uni.showModal({
				    title: '自动退出登录',
				    content: '应用长时间未使用，当前已自动锁定',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							isShowModel = false
							// that.$store.dispatch('logout');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							isShowModel = false
							// that.$store.dispatch('logout');
				        }
				    },
					complete: () => {
						isShowModel = false
						createLockApp()
						// 切换用户的默认登录方式
						changeUserLoginTypeNavigateTo()
					}
				});
			} else {
				
			}
		}
	}, 1000)
}

// 停止当前长时间不操作退出登录的监控
export function stopSetIntervalLoginOut() {
	getApp().globalData.isStopAppAutoLoginOut = true
}

// 开始当前长时间不操作退出登录的监控
export function beginSetIntervalLoginOut() {
	getApp().globalData.isStopAppAutoLoginOut = false
}

// 临时关闭应用锁，此时不会进入应用锁
export function temporaryCloseAppLock() {
	console.log('临时关闭应用锁，此时不会进入应用锁');
	stopSetIntervalLoginOut()
	setTimeout(() => {
		console.log('重新打开应用锁');
		beginSetIntervalLoginOut()
	}, 1500)
}

// 建立一个震动, 只有手动才会停止
export function createVibrateLong() {
	getApp().globalData.VibrateSetInterval = setInterval(() => {
		uni.vibrateLong({
		    success: function () {
		        console.log('success');
		    },
			fail: () => {
				console.log('fail');
			}
		});
	}, 1000)
}

// 停止震动
export function clearVibrate() {
	clearInterval(getApp().globalData.VibrateSetInterval)
	getApp().globalData.VibrateSetInterval = null
}