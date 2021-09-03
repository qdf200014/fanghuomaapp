/**
 * 论坛相关api
 */
import {
	http,
	refreshTokenUrl
} from '@/request/index.js';


export default {
	
	//免登录
	autologin: (data) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appforum/autologin',
			data: data
		})
	},
	
	//首页帖子列表
	getindexthread: (data) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appforum/getindexthread',
			data: data
		})
	},
	
	//获取论坛消息列表
	getnotices: (data,params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getnotices',
			data: data,
			params:params
		})
	},
	
	//清空未读消息
	clearnotices: (data,params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/clearnotices',
			data: data,
			params:params
		})
	},
	
	
	//获取通知列表
	getnotices: (data,params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getnotices',
			data: data,
			params:params
		})
	},
	
	//获取通知列表
	getnoticesbyid: (data,params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getnoticesbyid',
			data: data,
			params:params
		})
	},
	
}