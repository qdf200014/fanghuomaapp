/**
 * app版本相关
 */
import {
	http
} from '@/request/index.js';

export default {
	/**
	 * 获取最新版本
	 */
	"appversion": (params) => {
		return http.get('/api/sysversion/appversion', {
			params
		})
	},
}