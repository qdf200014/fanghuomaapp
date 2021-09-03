import {
	wtSql
} from '@/common/sqlite/sql/wt-sqlite.js';
import { MSG } from './config.js';
import deepClone from '@/common/sqlite/utils/js-deep-clone';

export default class sysMsgConnect extends wtSql {
	getMsgList(data){
		return this.selectBy(this.$sysName, data);
	}
	getSysName(){
		let user = uni.getStorageSync('userInfo') || false;
		if(!user) {
			console.error('not find user!!!')
		}
		this.$sysName = 'sysMsg_' + user.userId;
		return this.$sysName;
	}
	addSysMsg(list, insertType = 1){
		let name = this.getSysName();
		list = this.obj2json(list, MSG.key, MSG.refer); // 增加table用于校验字段完整性
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
				this.add(name, list, insertType)
				.then(res=>{
					resolve(res)
				})
				.catch(err=>{
					reject(err)
				});
			} else {
				this.createSysMsgTable(name)
				.then(()=>{
					return this.add(name, list, insertType)
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
	selectSysMsgList(order){
		let name = this.getSysName();
		order = order || {};
		return new Promise((resolve, reject)=>{
			this.selectBy(name,order).then((res)=>{
				resolve({
					data:{
						data:this.json2obj(res, MSG.key)
					}
				});
			}).catch(err=>{
				reject({
					data:{
						code:1,
						success:false,
						data:[],
						err
					}
				});
			})
		})
	}
	isReadSysMsg(){
		return this.selectSysMsgList({
			'id-a': -1, 		// 所有id
			'order-d': 'id',	// id倒序
			'limit': [0, 1] // 分页1条,
		})
	}
	createSysMsgTable(name){
		name = name || this.getSysName();
		return this.createTable(name, MSG.table);
	}
	clearSysMsg(){
		return this.execute(`delete from ${this.getSysName()}`)
	}
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