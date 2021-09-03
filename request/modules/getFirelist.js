/**
 * 商品相关api
 */
import {
	http
} from '@/request/index.js';

export default {

	/**
	 * App登录
	 * @param {Object} params - 查询参数  
	 */
	getFirelist: (params) => {
		return http.get('/api/appwarningarticles/getpages')
	},
}
