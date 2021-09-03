/**
 * 进山统计api
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
	//统计-进山、车辆
	"getrangcount": (params) => {
		return request.get('/statistics/range-count-v2', {
			params
		})
	},
	// 进山统计-每月
	"getmonthly": (params) => {
		return request.get('/statistics/register-monthly', {
			params
		})
	},
	// 进山统计-每周
	"getweekly": (params) => {
		return request.get('/statistics/register-weekly', {
			params
		})
	},
	// 进山统计-每日
	"getdaily": (params) => {
		return request.get('/statistics/register-daily-v2', {
			params
		})
	},
	// 统计-进山排行
	"getrank": (params) => {
		return request.get('/statistics/register-rank', {
			params
		})
	},
	//登记列表(仅限防火责任区级别)
	"registerList": (params) => {
		return request.get('/register/index', {
			params
		})
	},
	//登记同行人员
	"getpeers": (params) => {
		return request.get('/register/peers', {
			params
		})
	},
}