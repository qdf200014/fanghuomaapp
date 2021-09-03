/**
 * 日报api
 */
import {
	http
} from '@/request/index.js';

export default {
	// 通用请求方法middleware 演示。文档：https://www.quanzhan.co/luch-request/guide/3.x/#middleware
	/**
	 * 查询商品信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	//日报列表
	"getdaily": (params) => {
		return http.get('/api/appdaily/getdaily', {
			params
		})
	},
	// 创建日报
	"createdaily": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appdaily/createdaily',
			data: data,
			params: params,
		})
	},
	//日报详情
	"getdailydetail": (params) => {
		return http.get('/api/appdaily/getdailydetail', {
			params
		})
	},
	// 已读列表
	"getdailyread": (params) => {
		return http.get('/api/appdaily/getdailyread', {
			params
		})
	},
	// 点赞列表
	"getdailyprise": (params) => {
		return http.get('/api/appdaily/getdailyprise', {
			params
		})
	},
	// 获取日报模板
	"getdailymould": (params) => {
		return http.get('/api/appdaily/getdailymould', {
			params
		})
	},
	// 点赞日报
	"addprise": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appdaily/addprise',
			data: data,
			params: params,
		})
	},
	// 取消点赞
	"delprise": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appdaily/delprise',
			data: data,
			params: params,
		})
	},
	// 创建日报评论
	"createdailycomment": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appdaily/createdailycomment',
			data: data,
			params: params,
		})
	},
	// 日报评论列表
	"getdailycomment": (params) => {
		return http.get('/api/appdaily/getdailycomment', {
			params
		})
	},
	// 删除评论列表
	"delcomment": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appdaily/delcomment',
			data: data,
			params: params,
		})
	},
}