/**
 * @version 3.0.4
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-2.7.14 alpha-2.8.0
 */
import Request from '@/js_sdk/luch-request/luch-request/index.js';

import {
	getHeader,
	getStaticHeader
} from './header.js';
import {
	gotoLogin
} from './response.js';

import appConfig from '@/common/appConfig/appConfig.js'

const ISALPHA = appConfig.ISALPHA;

// const baseURL = ISALPHA ? 'http://118.25.137.52:9002' : 'https://api.fanghuoma.com';
const baseURL = ISALPHA ? 'http://118.25.137.52:9002' : 'https://api.fanghuoma.com';

const refreshTokenUrl = '/api/appuser/refreshtoken';


const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {}
	return token
}
uni.$isDeveloper = false;
const request = new Request() //一期
/**
 * 修改全局配置示例
 const request = new Request({
	header: {a:1}, // 举例
	baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
	validarequestatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
		return statusCode >= 200 && statusCode < 300
	}
})
 request.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

request.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = ISALPHA ? 'https://openfhm-dev.limefamily.cn' : 'https://openfhm-dev.limefamily.cn';
	config.header = {
		...config.header,
	}
	Object.assign(config.header, getStaticHeader()); // 合并静态请求头
	config.custom = {
		// auth: false, // 是否传token
		// loading: false // 是否使用loading
	}
	return config
})

const http = new Request() // 二期
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = baseURL /* 根域名不同 */
	config.header = {
		...config.header,
	}
	Object.assign(config.header, getStaticHeader()); // 合并静态请求头
	return config
})

request.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作  */
	config.header = {
		...config.header,
		token: getTokenStorage()
	}
	/**
	 * custom {Object} - 自定义参数
	 */
	// if (config.custom.auth) {
	//   config.header.token = '123456'
	// }
	// if (config.custom.loading) {
	//   uni.showLoading()
	// }
	
	// disProxy();
	
	//#ifdef APP-PLUS
	if(plus.networkinfo.isSetProxy() && !uni.$isDeveloper){
		return Promise.reject({
			err:'is proxy!!!'
		})
	}
	//#endif
	
	Object.assign(config.header, getHeader(1)); // 合并请求头
	
	if((null == config.header.Authorization && null == config.header.token) || ('' == config.header.Authorization && '' == config.header.token)){
		/**
		 * 一期请求全部校验token再决定发送请求
		 */
		return Promise.reject(config)
	}
	return config
}, (config) => {
	return Promise.reject(config)
})


request.interceptors.response.use((response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	return partOne(response);
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	// if (response.config.custom.loading) {
	//    uni.hideLoading()
	//  }
	return Promise.reject(response)
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
		token: getTokenStorage()
	}
	// disProxy();
	//#ifdef APP-PLUS
	if(plus.networkinfo.isSetProxy() && !uni.$isDeveloper){
		return Promise.reject({
			err:'is proxy!!!'
		})
	}
	//#endif
	Object.assign(config.header, getHeader()); // 合并请求头
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	return partTwo(response);
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	console.log(response)
	if (!response.statusCode) {
		uni.showToast({
			title: '网络问题，请确认网络良好再试',
			icon: 'none'
		})
	}
	return Promise.reject(response)
});

function partOne(response) { // 一期返回数据拦截
	let _statusCode = response.statusCode,
		_success = response.data.success;
	if (_statusCode !== 200) {
		if (_statusCode == 401) {	//  一期不应该出现401除非后台没有返回正确的一期token
			// gotoLogin();
		}
		return Promise.reject(response)
	} else if (!_success) {
		//  一期接口401直接忽略
		response.data.data && response.data.data.message && uni.showToast({
			title: response.data.data.message,
			icon: 'none'
		});
		return Promise.reject(response)
	}
	return response;
}

function partTwo(response) { // 二期数据拦截
	let _statusCode = response.data.statusCode;
	if (_statusCode !== 200) {
		if (_statusCode == 401) {	//    登录失效
			//#ifdef H5
			return;	// h5不校验用户权限
			//#endif
			let _config = response.config, userInfo = uni.getStorageSync('userInfo') || {};
			return uni.$api.user.refreshtoken({
				key:(userInfo.refreshtoken || '')
			})
			.then(res=>{
				// console.log('onRefreshToken_', res);
				let token = res.data.data.token;
				userInfo.refreshtoken = res.data.data.refreshtoken;
				_config.header.token = _config.header.Authorization = token;
				uni.setStorageSync('token', token);
				uni.setStorageSync('userInfo', userInfo);
				return http.request(_config)
			})
			.catch(err=>{
				response.data.message && uni.showToast({
					title: response.data.message,
					icon: 'none'
				});
				if(400 == response.data.statusCode){
					uni.removeStorageSync('token');
					uni.removeStorageSync('userInfo');
				}
				gotoLogin();
				return Promise.reject(err)
			});
			
		} else if(_statusCode == 999) {		// 应急预案
			uni.showModal({
				title: '提示',
				content: response.data.message,
				showCancel: false,
				confirmText: '确定'
			});
		} else {
			response.data.message && uni.showToast({
				title: response.data.message,
				icon: 'none'
			});
		}
		return Promise.reject(response)
	} else {
		return response;
	}
}

// 刷新getToken
async function refreshToken (config) {
	
}

function disProxy(){	// 代理拦截
	//#ifdef APP-PLUS
	if(plus.networkinfo.isSetProxy()){
		return Promise.reject({
			err:'is proxy!!!'
		})
	}
	//#endif
}

export {
	http,
	request,
	refreshTokenUrl
}
