/**
 *  投票相关api
 */
import {
	http
} from '@/request/index.js';

export default {
	/**
	 * 创建投票
	 */
	createvote: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appvote/createvote',
			data: data,
			params: params,
		})
	},
	/**
	 * 我发起的投票列表
	 */
	getvotebyuser: (params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getvotebyuser',
			params
		})
	},
	/**
	 * 我参与的投票列表
	 */
	getcastvotebyuser: (params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getcastvotebyuser',
			params
		})
	},
	/**
	 * 删除投票
	 */
	deletevote: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appvote/deletevote',
			data: data,
			params: params,
		})
	},
	/**
	 * 投票明细
	 */
	getvotedetail: (params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getvotedetail',
			params
		})
	},
	/**
	 * 参与投票
	 * **/
	 castvote: (data, params) => {
	 	return http.middleware({
	 		method: 'POST',
	 		url: '/api/appvote/castvote',
	 		data: data,
	 		params: params,
	 	})
	 },
	/**
	 * 参与人详情
	 * **/
	 castuserlist: (params) => {
	 	return http.middleware({
	 		method: 'GET',
	 		url: '/api/appvote/castuserlist',
	 		params
	 	})
	 },
	 

}
