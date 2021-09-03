import {
	wtSql
} from '@/common/sqlite/sql/wt-sqlite.js';
import { SESSION, SESSION_LIST } from './config.js';	// 表结构
import deepClone from '@/common/sqlite/utils/js-deep-clone';

// 聊天存储模块
export default class connect extends wtSql {
	/**
	 * 创建sqlite实例时自动调用该方法，作为会话列表
	 */
	createAdminTable(){
		return this.createTable(this.$name, SESSION_LIST.table);
	}
	/**
	 * 创建会话表
	 * @param {Object} name 会话名称
	 */
	createSession(name){
		return this.createTable(name, SESSION.table);
	}
	/**
	 * 添加消息记录
	 * @param {Object} name	会话名称
	 * @param {Object} list 存储消息内容可存单条或多条
	 */
	addSesstion(_name, list){
		let name = 'session_' + _name;
		list = this.obj2json(list, SESSION.key, SESSION.refer); // 增加table用于校验字段完整性
		if(list.length==0)return Promise.reject({
			err:'msg is []!!!'
		});
		return new Promise((resolve, reject)=>{
			// console.log('table_', this.$tableList.findIndex(a=>a==name));
			/**
			 * 检测是否存在指定表，加快存储速度	
			 * add()第三参数作为同一消息的忽略操作，加快操作速度
			 */
			if(this.$tableList.findIndex(a=>a==name)>=0){
				this.add(name, list, 2)
				.then(res=>{
					resolve(res)
				})
				.catch(err=>{
					reject(err)
				});
			} else {
				this.createSession(name)
				.then(()=>{
					return this.add(name, list, 2)
				})
				.then(res=>{
					resolve(res)
				})
				.catch(err=>{
					reject(err)
				})
			}
		})
	}
	/**
	 * 查询消息记录
	 * @param {Object} name 会话名称
	 * @param {Object} order 查询条件
	 */
	selectSession(_name, order, isApi){
		let name = 'session_' + _name;
		order = order || {};
		return new Promise((resolve, reject)=>{
			this.selectBy(name,order).then((res)=>{
				const data = this.json2obj(res, SESSION.key);
				const response = isApi ? {data:{data}}:data;
				resolve(response);
			}).catch(err=>{
				reject(err);
			})
		})
	}
	// 以下两个方法为存储obj使用的数据处理方法
	/**
	 * 数据存储转换
	 * @param {Object} list_res 消息数据，可为array或object
	 * @param {Object} list_key 消息体需要转换的key
	 */
	obj2json(list_res, list_key, refer){	// 原数据转为json方便存储
		let list_res_copy = deepClone(list_res);	//拷贝原数据避免污染
		!(Object.prototype.toString.call(list_res_copy) === '[object Array]') && (list_res_copy = [list_res_copy]);	// 对象转数组
		for (var i = 0, len_r = list_res_copy.length; i < len_r; i++) {
			list_res_copy[i] = Object.assign({}, refer, list_res_copy[i]);
			list_key.forEach(key=>{
				list_res_copy[i][key] = JSON.stringify(list_res_copy[i][key]);
			})
		};
		return list_res_copy;
	}
	json2obj(list_res, list_key){	// json数据转为原数据格式
		for (var i = 0, len_r = list_res.length; i < len_r; i++) {
			list_key.forEach(key=>{
				list_res[i][key] && (list_res[i][key] = JSON.parse(list_res[i][key]));
			})
		};
		return list_res;
	}
	
}