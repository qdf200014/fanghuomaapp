// 收集错误日志
import config from '@/common/configs/index.js'
export function errUploadLog(title, info) {
	try {
		if (title) {
			title = JSON.stringify(title)
			// 日志 正式测试的标识
			// config.ISALPHA ? title = '测试 =====' + title : title = '正式 =====' + title
		}
		if (info) {
			if (!Array.isArray(info)) {
				info = [info];
			}
			info = JSON.stringify(info)
		}
		apiUploadDebugLog(title, info)
	} catch (e) {
		if (e && !Array.isArray(e)) {
			e = [e]
		}
		//TODO handle the exception
		apiUploadDebugLog('日志信息转化错误', JSON.stringify(e))
	}
}

function apiUploadDebugLog(title, info) {
	let userInfo = ''
	try {
		userInfo = uni.getStorageSync('appUserInfo') || ''
		userInfo = JSON.stringify(userInfo)
	} catch (e) {
		//TODO handle the exception
	}
	uni.request({
		url: 'http://118.25.137.52:8088/api/user/writeLog', //仅为示例，并非真实接口地址。
		data: {
			title: title || '',
			info: info || '',
			version: `Version ${plus.runtime.version} · ${plus.runtime.versionCode}`,
			ambient: config.VERSION === 'Beta' ? '测试' : '正式',
			userInfo: userInfo
		},
		method: 'POST',
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		success: (res) => {
			console.log('日志上报成功', res);
		},
		fail: (err) => {
			console.log('日志上报失败', err);
		}
	});
}
