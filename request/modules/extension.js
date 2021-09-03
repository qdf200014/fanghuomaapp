/**
 * 推广指标api
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
	//推广评价-卡口启用率
	"getentrance": (params) => {
		return request.get('/kpi/entrance', {
			params
		})
	},
	// 推广评价-地域覆盖率
	"getarea": (params) =>{
		return request.get('/kpi/area', {
			params
		})
	},
	// 推广评价-场景应用率
	"getscene": (params) =>{
		return request.get('/kpi/scene', {
			params
		})
	},
}