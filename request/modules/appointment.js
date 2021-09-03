/**
 * 预约办证api
 */
import {
	request
} from '@/request/index.js';

export default {
	//电子证列表
	"getindex": (params) => {
		return request.get('/mount-cert/index', {
			params
		})
	},
	// 电子证详情
	"getview": (params) =>{
		return request.get('/mount-cert/view', {
			params
		})
	},
	// 电子证审批
	"appointmask": (data, params) => {
		return request.middleware({
			method: 'POST', // 必须大写
			url: '/mount-cert/approve',
			data:data,
			params: params,
		})
	},
	// 电子证同行人员
	"getpeers": (params) =>{
		return request.get('/mount-cert/peers', {
			params
		})
	},
	// 车辆信息
	"getvehicle": (params) =>{
		return request.get('/mount-cert/vehicle', {
			params
		})
	},
	// 电子证-卡口列表
	"entranceList": (params) =>{
		return request.get('/entrance/list', {
			params
		})
	},
	// 电子证查询(检查权限、有效期)
	check:(params)=>{
		return request.get('/mount-cert/check', {
			params
		})
	},
	// 确认用户信息（扫码通过）
	userPass:(params, data)=>{
		return request.middleware({
			method: 'POST',
			url: '/mount-cert/pass',
			data,
			params
		})
	}

}