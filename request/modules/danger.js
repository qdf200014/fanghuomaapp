/**
 * 隐患整改api
 */
import {
	http
} from '@/request/index.js';

export default {
	//获取问题清单
	"getquestions": (params) => {
		return http.get('/api/apphiddendanger/getquestions', {
			params
		})
	},
	updhiddendanger:(data)=>{
		return http.middleware({
			method: 'POST',
			url: 'api/apphiddendanger/updhiddendanger',
			data: data
		})
	},
	// 获取文号编号
	"getnumber": (params) => {
		return http.get('/api/apphiddendanger/getnumber', {
			params
		})
	},
	// 获取隐患整改列表
	"getlist": (params) => {
		return http.get('/api/apphiddendanger/getlist', {
			params
		})
	},
	"gethiddendanger": (params) => {
		return http.get('/api/apphiddendanger/gethiddendanger', {
			params
		})
	},
	"gethiddendangerpdf": (params) => {
		return http.get('/api/apphiddendanger/gethiddendangerpdf', {
			params
		})
	},
	"getfhiddeninfo": (params) => {
		return http.get('/api/apphiddendanger/getfhiddeninfo', {
			params
		})
	}
}