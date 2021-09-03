/**
 * 人员审批api
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
	//app获取审批人员列表
	"getappuserinfoapproval": (params) => {
		return http.get('/api/appuser/getappuserinfoapproval', {
			params
		})
	},
	// 审批用户
	"approvaluserinfo": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/approvaluserinfo',
			data: data,
			params: params,
		})
	},
}