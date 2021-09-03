import {
	request
} from '@/request/index.js';

export default{
	//获取组织机构
	"getRoleTree": (params) => {
		return request.get('/statistics/get-role-tree')
	},
	
	// "getGoodsInfo": (data, params) => {
	// 	return request.middleware({
	// 		method: 'POST', // 必须大写
	// 		url: '/api/user/update',
	// 		data: data,
	// 		params: params,
	// 		custom: {
	// 			auth: true
	// 		}
	// 	})
	// }
}