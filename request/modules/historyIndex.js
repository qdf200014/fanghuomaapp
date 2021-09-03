/**
 * 历史上的今天api
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
	//根据日期获取历史上今天
	"gethistodaybydate": (params) => {
		return http.get('/api/apphistoday/gethistodaybydate', {
			params
		})
	},
	// 根据省份获取防火周期
	"getcyclebycity": (params) => {
		return http.get('/api/apphistoday/getcyclebycity', {
			params
		})
	}
}