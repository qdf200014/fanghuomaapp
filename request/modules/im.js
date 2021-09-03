/**
 * 系统消息相关api
 */
//#ifdef APP-PLUS
import {
	sqlite
} from '@/common/sqlite';
const imConnect = new sqlite.im(); // 区域选择
//#endif

export default {
	/**
	 * data 参数形式
	 * {
		 page:1,
		 limit:20,
		 query:{
			 ...(原selectSession查询条件)
		 }
	 }
	 */
	getSessionList: (data) => { // 查询im消息列表
		//#ifdef APP-PLUS
		let params = Object.assign({}, data.query, {
			'limit': [data.page-1, data.page-1 + data.limit]
		});
		return imConnect.selectSession(data.userId, params, true);
		//#endif
		//#ifndef APP-PLUS
		return notApp();
		//#endif
	}
}

function notApp(){
	return new Promise((reject, resolve) => {
		resolve({
			msg: '非app环境下，不支持im消息！！！'
		})
	})
}
