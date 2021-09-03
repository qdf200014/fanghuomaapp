/**
 * 首页火警api
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
	//火情预警列表
	"getpages": (params) => {
		return http.get('/api/appwarningarticles/getpages', {
			params
		})
	},
	//获取火情预警详情
	"getcontent": (params) =>{
		return http.get('/api/appwarningarticles/getcontent', {
			params
		})
	},
	// 获取火险预警
	"getlistfilesbyrange": (params) =>{
		return http.get('/api/appwarningarticles/getlistfilesbyrange', {
			params
		})
	},
	// 获取火情评论列表
	"getcomment": (params) =>{
		return http.get('/api/appwarningarticles/getcomment', {
			params
		})
	},
	// 删除火情评论
	"delcomment": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appwarningarticles/delcomment',
			data: data,
			params: params,
		})
	},
	// 创建火情评论
	"addcomment": (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appwarningarticles/addcomment',
			data: data,
			params: params,
		})
	},
}