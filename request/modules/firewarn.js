/**
 * 火情报警api
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
	//火情报警列表
	"getfirewarn": (params) => {
		return request.get('/fire-alarm/index', {
			params
		})
	},
	// 火情报警详情
	"getfiredetail": (params) =>{
		return request.get('/fire-alarm/view', {
			params
		})
	},
	// 火情标记处理
	"firemark": (data, params) => {
		return request.middleware({
			method: 'POST', // 必须大写
			url: '/fire-alarm/mark-handled',
			params:data,
		})
	},
}