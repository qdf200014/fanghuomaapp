/**
 * 高危预警api
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
	//高危人群预警列表
	"getriskhigh": (params) => {
		return request.get('/risk-warning/index', {
			params
		})
	},
	// 高危人群预警详情
	"getriskhighdetail": (params) =>{
		return request.get('/risk-warning/view', {
			params
		})
	},
	// 高危人群预警同行人员
	"getriskhighpeople": (params) =>{
		return request.get('/risk-warning/peers', {
			params
		})
	},
	// 高危人群标记处理
	"riskmark": (data, params) => {
		return request.middleware({
			method: 'POST', // 必须大写
			url: '/risk-warning/mark-handled',
			params:data,
		})
	},
}