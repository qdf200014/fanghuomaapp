import {
	http,
	refreshTokenUrl
} from '@/request/index.js';


export default {
	/**
	 * 创建会商
	 * @param {String} key - 长token
	 */
	addconsultation: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appconsultation/addconsultation',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 获取会商详情
	 * @param {String} key - 长token
	 */
	getepilogmodel: (data, params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getepilogmodel',
			data: data,
			params: params,
		})
	},
	
	
	/**
	 * 获取结论详情
	 * @param {String} key - 长token
	 */
	getappconsultationdetail: ( params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appconsultation/getappconsultationdetail',
			params: params,
		})
	},
	
	
	/**
	 * 会商群表决、结论列表
	 * @param {String} key - 长token
	 */
	getvotebyconid: (data, params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getvotebyconid',
			data: data,
			params: params,
		})
	},
	
	
	/**
	 * 会商群表决、结论列表
	 * @param {String} key - 长token
	 */
	getepilog: (data, params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appvote/getepilog',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 会商签到
	 * @param {String} key - 长token
	 */
	consultationsingin: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appconsultation/consultationsingin',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 获取会商签到成员
	 * @param {String} key - 长token
	 */
	getappconsultationusers: (data, params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appconsultation/getappconsultationusers',
			data: data,
			params: params,
		})
	},
}
