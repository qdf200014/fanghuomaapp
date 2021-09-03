/**
 * 首页搜索
 */
import {
	http
} from '@/request/index.js';

export default {
	//首页搜索
	"firesearch": (params) => {
		return http.get('/api/appuser/firesearch', {
			params
		})
	},
	/**
	 * 获取热门搜索关键字
	 * page
	 * limit
	 */
	getfiresearchkey:(params)=>{
		return http.get('/api/appuser/getfiresearchkey', {
			params
		})
	}
}