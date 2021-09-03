/**
 * 会商api
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
	//app获取会商列表
	"getappconsultations": (params) => {
		return http.get('/api/appconsultation/getappconsultations', {
			params
		})
	},
	// 查看会商结论
	"getconsultationconclusion": (params) => {
		return http.get('/api/appconsultation/getconsultationconclusion', {
			params
		})
	},
	// 创建会商
	"addconsultation": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appconsultation/addconsultation',
			data: data,
			params: params,
		})
	},
	// 结束会商
	"updconsultation": (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appconsultation/updconsultation',
			data: data,
			params: params
		})
	},
	// 获取历史记录
	"gethistory": (params) => {
		return http.get('/api/appvote/gethistory', {
			params
		})
	},
	// 会商增减人员
	"updconsultationsusers": (data, params) => {
		return http.middleware({
			method: 'POST',
			url: '/api/appconsultation/updconsultationsusers',
			data: data,
			params: params
		})
	},
	"isconsultation": (data, params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/appconsultation/isconsultation',
			data: data,
			params: params
		})
	}
}