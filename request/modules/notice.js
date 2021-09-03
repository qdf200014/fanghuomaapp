/**
 * 消息通知api
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
	// 获取系统通知详情
	"getsysnoticedetail": (params) => {
		return http.get('/api/appuser/getsysnoticedetail', {
			params
		})
	},
}