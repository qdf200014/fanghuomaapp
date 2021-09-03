import config from '../configs/index.js'

// 提示信息
export function tipToast({
	title,
	time,
	mask,
	icon
}) {
	uni.showToast({
		title: title,
		duration: time || 1500,
		mask: mask || false,
		icon: icon || 'none'
	});
}

// 网易云信图片的更改
export function _chageImage(src) {
	return src + '&imageView&quality=50&interlace=1&thumbnail=300z300'
}

// 判断当前登录的用户是不是上一次登录的用户，如果不是就清空快捷登录方式
export function checkLastLoginUser(res) {
	let _lastRes = uni.getStorageSync('lastAppLoginUser') || {}
	console.log("当前登录的uid", res.uid, '上一次登录的uid', _lastRes.uid);
	if (_lastRes.uid !== res.uid) {
		uni.removeStorageSync('apiSoterAuthentication')
		// 清楚手势密码
		uni.removeStorageSync('gesturePassWord')
		// 指纹登录推荐弹窗
		uni.removeStorageSync('recommendOpenQuickLogin')
		// 最后一个用户登录方式
		uni.removeStorageSync('lastUserLoginType')
	}
}

// 检查用户是否开通指纹登录，没有进行弹窗推荐
// 每天提醒一次，提醒三次
export function checkLoginUserIsOpenGesture() {
	let Nowdate = new Date()
	let Today = Nowdate.getFullYear() + "/" + (Nowdate.getMonth() + 1) + "/" + Nowdate.getDate()
	// recommendOpenQuickLogin 数据格式
	// {
	// 	type: 1
	// 	day: '2020/8/6',
	// 	num: 1
	// }
	let recommendObj = uni.getStorageSync('recommendOpenQuickLogin') || {}
	console.log("检查用户是否开通指纹登录，没有进行弹窗推荐次数", recommendObj);
	if (recommendObj && recommendObj.num > 3) {
		return;
	}
	if (recommendObj.day == Today) {
		return;
	}
	let objData = readApiSoterAuthenticationCode() || {}
	// 先进行权限判断，查看是否有权限开通指纹登录
	uni.checkIsSupportSoterAuthentication({
		success(res) {
			// console.log('checkIsSupportSoterAuthentication', res);
			let index1 = res.supportMode.indexOf('fingerPrint')
			let index2 = res.supportMode.indexOf('facial')

			if (index1 > -1 && !objData[2]) {

				uni.setStorageSync('recommendOpenQuickLogin', {
					type: 2,
					day: Today,
					num: recommendObj.num + 1
				})

				showRecommendModel(2)
			} else if (index2 > -1 && !objData[3]) {

				uni.setStorageSync('recommendOpenQuickLogin', {
					type: 3,
					day: Today,
					num: recommendObj.num + 1
				})

				showRecommendModel(3)
			} else if (!objData[1]) {
				uni.setStorageSync('recommendOpenQuickLogin', {
					type: 1,
					day: Today,
					num: recommendObj.num + 1
				})

				showRecommendModel(1)
			}
		},
		fail(err) {
			console.log(err);
		},
		complete(res) {
			console.log(res);
		}
	});

}

// 显示推荐的弹窗
export function showRecommendModel(type) {}

// 记录用户最后一次的登录方式
export function saveLastUserLoginType(type) {
	uni.setStorageSync('lastUserLoginType', type)
}

// 读取用户最后一次的登录方式
export function readLastUserLoginType() {
	let type = uni.getStorageSync('lastUserLoginType') || 0
	return Number(type)
}

// 切换用户的默认登录方式(关闭所有页面跳转)
export function changeUserLoginType() {
	// 判断用户最后一次的登录方式进行跳转

	let loginType = Number(readLastUserLoginType())
	console.log("当前的登录方式", loginType);

	let objData = readApiSoterAuthenticationCode() || {}

	if (!objData[loginType]) {
		return;
	}

	switch (loginType) {
		case 0:
			break;
		case 1:
			let pass = uni.getStorageSync('gesturePassWord')
			uni.redirectTo({
				url: "/pages/login/gesture-login?type=1" + '&pwd=' + pass,
			})
			break;
		case 2:
			uni.redirectTo({
				url: "/pages/login/fingerprint-login"
			})
			break;
		case 3:
			uni.redirectTo({
				url: "/pages/login/face-login"
			})
			break;
		default:
			break;
	}
}

// 切换用户的默认登录方式(保留页面跳转)
// 用在 用户跳转去解锁
// !!!!!! 现在不在使用navigateTo
export function changeUserLoginTypeNavigateTo() {
	// 判断用户最后一次的登录方式进行跳转

	let loginType = Number(readLastUserLoginType())
	console.log("当前的登录方式", loginType);

	let objData = readApiSoterAuthenticationCode() || {}

	// 没有设置快捷登录，默认跳转登录页面
	if (!objData[loginType]) {
		uni.redirectTo({
			url: "/pages/login/index"
		})
		return;
	}

	switch (loginType) {
		case 0:
			uni.redirectTo({
				url: "/pages/login/index"
			})
			break;
		case 1:
			let pass = uni.getStorageSync('gesturePassWord')
			uni.redirectTo({
				url: "/pages/login/gesture-login?type=1" + '&pwd=' + pass,
			})
			break;
		case 2:
			uni.redirectTo({
				url: "/pages/login/fingerprint-login"
			})
			break;
		case 3:
			uni.redirectTo({
				url: "/pages/login/face-login"
			})
			break;
		default:
			uni.redirectTo({
				url: "/pages/login/index"
			})
			break;
	}
}

// uni生物识别失败的提示处理
export function failSoterAuthentication(err) {
	let text = '识别认证失败';
	let noShowText = false
	switch (err.errCode) {
		case 90011:
			text = '监测到您的手机还未录入指纹';
			break;
		case 90003:
			text = '请求使用的生物认证方式不支持';
			break;
		case 90010:
			text = '因错误次数过多，请稍后重新尝试'
			break;
		case 10000:
			text = '认证超时'
			break;
		case 98989:
			noShowText = true
			break;
	}
	if (noShowText) {
		noShowText = false
		return;
	}
	uni.showToast({
		title: text,
		icon: 'none'
	});
}


// 本地保存/更新生物识别的特征码
// type 1手势解锁 2指纹解锁 3人脸识别
// code 接口返回的字符串，有代表开启对应的登录方式
export function addApiSoterAuthenticationCode(type, code) {
	if (!type || !code) {
		uni.showToast({
			title: '参数不完整',
			icon: 'none'
		})
		return;
	}
	let apiData = uni.getStorageSync('apiSoterAuthentication') || {}
	apiData[type] = code
	uni.setStorageSync('apiSoterAuthentication', apiData)
	// uni.showToast({
	// 	title: '添加成功！',
	// 	icon: 'none'
	// })
}

// 读取本地生物识别码
export function readSoterAuthenticationCode() {
	let data = uni.getStorageSync('soterAuthentication')
	if (data) {
		return data
	} else {
		// uni.showToast({
		// 	title: '读取失败',
		// 	icon: 'none'
		// })
		return null
	}
}

// 读取存入本地，接口返回的字符串
export function readApiSoterAuthenticationCode() {
	let apiData = uni.getStorageSync('apiSoterAuthentication')
	if (apiData) {
		console.log("apiData", apiData);
		return apiData
	} else {
		// uni.showToast({
		// 	title: '读取失败',
		// 	icon: 'none'
		// })
		return null
	}
}

// 删除本地保存的快捷登录特征码
export function deleteApiSoterAuthenticationCode(type) {
	let apiData = uni.getStorageSync('apiSoterAuthentication') || {}
	if (!apiData[type]) {
		uni.showToast({
			title: '删除失败',
			icon: 'none'
		})
		return;
	}

	delete apiData[type]
	uni.setStorageSync('apiSoterAuthentication', apiData)
}

// 存储手势密码
export function saveGesturePassWord(pass) {
	uni.setStorageSync('gesturePassWord', pass)
}

// app加锁
export function createLockApp() {
	uni.setStorageSync('LockApp', true)
}

// app解锁
export function UnlockApp(that) {
	uni.setStorageSync('LockApp', false)
	console.log('UnlockApp Run');
	uni.redirectTo({
		url: '/pages/index/index'
	});
	console.log(typeof(getApp().globalData.unlockAppFunction) == 'function');
	console.log('getApp().globalData.unlockAppFunction', getApp().globalData.unlockAppFunction);
	if (typeof(getApp().globalData.unlockAppFunction) == 'function') {
		getApp().globalData.unlockAppFunction()
		getApp().globalData.unlockAppFunction = null
	}

}

// 检查今天是否展示过动画
export function TodayShowCharacterAnimation() {
	let Nowdate = new Date()
	let Today = Nowdate.getFullYear() + "/" + (Nowdate.getMonth() + 1) + "/" + Nowdate.getDate()

	let animationDay = uni.getStorageSync('TodayShowCharacterAnimation') || null

	if (animationDay == Today) {
		return 'showOk'
	} else {
		uni.setStorageSync('TodayShowCharacterAnimation', Today)
		return 'showNo'
	}

}

// 临时保存token
export function saveLoginToken(res) {
	console.log('进入了saveLoginToken', res);
	uni.setStorageSync('accessToken', res.accessToken);
	uni.setStorageSync('refreshToken', res.refreshToken);
}

// 检查app是否处于维护状态
export function checkAppMaintenance() {}