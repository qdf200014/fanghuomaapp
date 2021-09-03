/**
 * 紧急求救api
 */
import {
	request
} from '@/request/index.js';

export default {
	// 通用请求方法middleware 演示。文档：https://www.quanzhan.co/luch-request/guide/3.x/#middleware
	/**
	 * 查询商品信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	//紧急求救列表
	"getsos": (params) => {
		return request.get('/sos/index', {
			params
		})
	},
	// 紧急求助详情
	"getsosdetail": (params) =>{
		return request.get('/sos/view', {
			params
		})
	},
	// 紧急求救标记处理
	"sosmark": (data, params) => {
		return request.middleware({
			method: 'POST', // 必须大写
			url: '/sos/mark-handled',
			params:data,
		})
	},
}