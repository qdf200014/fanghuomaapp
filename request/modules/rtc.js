/**
 * RTC
 */
import {
	http
} from '@/request/index.js';

export default {
	// 以下两个防止报错
	"callpush": (params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/app/receiveMsg/callpush',
			data: params
		})
	},
	"AddChatRecord": (params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/AddChatRecord',
			data: params
		})
	},
	"GetChatUserList": (params) => {
		return http.get('/api/appuser/GetChatUserList', {params})
	},
	"RefuseChat": (params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/RefuseChat',
			params: params
		})
	},
	"signature": (params) => {
		return http.middleware({
			method: 'GET',
			url: '/api/tx/signature',
			params: params
		})
	}
}