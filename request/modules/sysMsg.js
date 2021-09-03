/**
 * 系统消息相关api
 */
//#ifdef APP-PLUS
import {
	sqlite
} from '@/common/sqlite';
const sysMsgConnect = new sqlite.sysMsg(); // 区域选择
//#endif

export default {
	getSysMsgList: (data) => { // 查询系统消息列表
		//#ifdef APP-PLUS
		return sysMsgConnect.selectSysMsgList({
			// id: -1,
			'order-d': 'id',
			'limit': [data.page-1, data.page-1 + data.limit]
		})
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	},
	/**
	 *  // 查询指定id的系统消息
	 * data object 请求参数
	 * {roomId:'abcd'} roomid string 系统消息id
	 */
	getSysMsgById: (data) => {
		//#ifdef APP-PLUS
		return sysMsgConnect.selectSysMsgList({
			roomId:data.roomId
		})
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	},
	clearSysMsg: () => { // 清空系统消息
		//#ifdef APP-PLUS
		return sysMsgConnect.clearSysMsg();
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	},
	getLastSysMsg() { // 查询最后一条消息
	
	// 是否已读不要用isRead
	// 应使用sysmsgRea 判断 [0|1];
		//#ifdef APP-PLUS
		return sysMsgConnect.isReadSysMsg();
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	},
	readSysMsg() {	// 消息已读
		//#ifdef APP-PLUS
		return new Promise((reject, resolve)=>{
			sysMsgConnect.isReadSysMsg()
			.then(res=>{
				if(res.data.data.length==0){
					return reject({
						code:0,
						success:true,
						msg:'消息已读'
					});
				}
				let lastMsg = res.data.data[0];
				
				lastMsg.sysmsgRead = 1;
				sysMsgConnect.addSysMsg([lastMsg])
				.then(response=>{
					reject({
						code:0,
						success:true,
						msg:'消息已读'
					})
				})
				.catch(error=>{
					resolve({
						code:1,
						success:false,
						msg:error
					})
				})
			})
			.catch(err=>{
				resolve({
					code:2,
					success:false,
					msg:err
				})
			})
		})
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	}
}

function notApp(){
	return new Promise((reject, resolve) => {
		resolve({
			msg: '非app环境下，不支持系统消息！！！'
		})
	})
}
