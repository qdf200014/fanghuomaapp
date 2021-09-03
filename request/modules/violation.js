/**
 * 违规举报api
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
	//违规举报列表
	"getviolation": (params) => {
		return request.get('/violation-report/index', {
			params
		})
	},
	// 违规举报详情
	"getviolationdetail": (params) =>{
		return request.get('/violation-report/view', {
			params
		})
	},
	// 违规举报标记处理
	"violationmark": (data, params) => {
		return request.middleware({
			method: 'POST', // 必须大写
			url: '/violation-report/mark-handled',
			params:data,
		})
	},
}