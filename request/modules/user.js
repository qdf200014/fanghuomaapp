/**
 * user相关api
 */
import {
	http,
	refreshTokenUrl
} from '@/request/index.js';
//#ifdef APP-PLUS
import { sqlite } from '@/common/sqlite';
const areaConnect = new sqlite.area();	// 区域选择
//#endif

// 获取区域数据
function getareacodelist(data, params){
	//#ifdef APP-PLUS
	return new Promise((resolve, reject)=>{
		areaConnect.getAreaList(data)
		.then(res1=>{
			if(res1.length<=0){
				return Promise.reject();
			}
			resolve({data:{data:res1}});
		})
		.catch(err=>{
			return http.middleware({
				method: 'GET', // 必须大写
				url: '/api/user/getareacodelist',
				data: data,
				params: params,
			})
			.then(res=>{
				areaConnect.createAreaTable()
				.then(()=>{
					areaConnect.addAreaList(res.data.data);
				});
				resolve(res);
			})
			.catch(err=>{
				reject(err)
			})
		});
	})
	.then(res=>{
		if(data.types == 1 && res.data.data.length == 1){
			let municipality = res.data.data[0] || {};
			if(municipality.level == 2 && municipality.name == '市辖区'){
				return Promise.resolve( getareacodelist({
					// "types": data.types,
					"attr": municipality.level + 1,
					"Area": municipality.code
				}) );
			}
		}
		return res;
	})
	.catch(err=>{
		return Promise.reject(err);
	});
	//#endif
}

export default {
	/**
	 * app登录
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	login: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/applogin',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 用户注册接口
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	register: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/adduserinfo',
			data: data,
			params: params,
		})
	},
	/**
	 * 获取单位所属层级
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	getunitlevel: (data, params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getunitlevel',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 获取场景组织
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	getparkarealist: (data, params) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getparkarealist',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 发送验证码
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	sendcode: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appsms/sendcode',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 用户注销
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	logoffuser: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/logoffuser',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 获取区域码
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	getareacodelist: (data, params) => {
		//#ifdef APP-PLUS
		return getareacodelist(data);
		//#endif
		/**
		 * 非手机端不使用缓存结构
		 */
		//#ifndef APP-PLUS
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/user/getareacodelist',
			data: data,
			params: params,
		})
		//#endif
	},
	
	/**
	 * 获取用户信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	getuserinfo: (data) => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getuserinfo',
			data: data
			
		})
	},
	
	/**
	 * 上传文件
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	uploadfile: (filePath) => {
		return http.middleware({
			method: 'UPLOAD', // 必须大写
			url: '/api/localfiles/uploadfile',
			filePath,
			name:'file',
			formData:{
				type:1
			}
		})
	},
	
	/**
	 * 重新申请用户信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	upduserinfo: (data) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/upduserinfo',
			data: data
		})
	},
	
	/**
	 * 修改用户信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	modifyuserinfo: (data,params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/modifyuserinfo',
			data: data,
			params: params
		})
	},
	
	/**
	 * 确认用户信息
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	confirmuserinfo: (data,params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/confirmuserinfo',
			data: data,
			params: params
		})
	},
	
	/**
	 * 修改密码
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	upduserpassword: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/upduserpassword',
			data: data,
			params: params,
		})
	},
	
	/**
	 * 获取积分列表
	 * @param {Object} data - 查询数据
	 * @param {Object} params - 查询params参数
	 */
	getuserintegral: () => {
		return http.middleware({
			method: 'GET', // 必须大写
			url: '/api/appuser/getuserintegral'
		})
	},
	
	/**
	 * 刷新token
	 * @param {String} key - 长token
	 */
	refreshtoken: (data, params) => {
		return http.middleware({
			method: 'POST',
			url: refreshTokenUrl,
			data: data,
			params: params,
		})
	},
	
	//上传图片
	uploadHeader: (file,name) => {
		return http.upload("/api/appuser/uploaduserheadurl",{
			filePath:file,
			name: name
		})
	},
	
	// 删除用户
	delappuser: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/delappuser',
			data: data,
			params: params,
		})
	},
	// 添加取消收藏
	addusercollection: (data, params) => {
		return http.middleware({
			method: 'POST', // 必须大写
			url: '/api/appuser/addusercollection',
			data: data,
			params: params,
		})
	},
	// 获取收藏列表
	"getusercollection": (params) => {
		return http.get('/api/appuser/getusercollection', {
			params
		})
	},
}
