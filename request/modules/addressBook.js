/**
 * 商品相关api
 */
import {
	http,
	refreshTokenUrl
} from '@/request/index.js';

export default {
	/**
	 * 刷新token
	 * @param {String} key - 长token
	 */
	refreshtoken: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: refreshTokenUrl,
			data: data,
			params: params,
		})
	},
	// 获取通讯录
	getmaillistuserlist: (data) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getmaillistuserlist',
			data: data
		})
	},
	
	// 获取违规类型
	getviolationtype: (data) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appreport/getviolationtype',
			data: data
		})
	},
	
	// 创建举报信息
	addreport: (data,params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appreport/addreport',
			data: data,
			params: params,
		})
	},
	
	//搜索所有下级用户
	getmailloweruserlist: (data) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appuser/getmailloweruserlist',
			data: data
		})
	},
	
	//创建群
	addteam: (data,params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appuser/addteam',
			data: data,
			params: params
		})
	}
}
