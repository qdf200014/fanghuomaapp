import { sqlite } from '@/common/sqlite';

import Push from './wt-push.js';

const sysMsgConnect = new sqlite.sysMsg();	//  系统消息存储器
// initSysMsgTable();
function handlerPush(payload, type) {
	// 消息处理器
	console.log('this is handler', payload, type);
	// 原click消息处理
	// uni.showModal({
	// 	title: payload.title || 'test',
	// 	content:`data: ${JSON.stringify(payload.data)},
	// 	type:${payload.type},
	// 	roomId:${payload.roomId},
	// 	sigData:${payload.sigData}
	// 	`
	// });
	
	if (type === 'click') {
		switch (payload.type) {
			//  预警事件
			case 1:
				break;
			case 2:
				break;
			case 3: // 单聊推送
				// Push.showMessage(payload.data.fromNick, payload.data.body, payload)
				break;
			case 4: // 群聊推送
				// Push.showMessage(payload.data.fromNick, payload.data.body, payload)
				break;
			case 5:		//  系统消息-系统通知
			sysMsgConnect.addSysMsg([payload]);
				break;
			case 10:	//  系统消息-审批提醒
			sysMsgConnect.addSysMsg([payload]);
				break;
			case 11:	//  系统消息-被审批提醒
			sysMsgConnect.addSysMsg([payload]);
				break;
			case 12:
			uni.navigateTo({
				url:'/components/easy-chat/session-forum.vue'
			})
				break;
			case 13:
			uni.navigateTo({
				url:'/components/easy-chat/session-forum.vue'
			})
				break;
			case 14:
			uni.navigateTo({
				url:'/components/easy-chat/session-forum.vue'
			})
				break;
			default:
				break;
		}
	} else if (type === 'receive') {
		switch (payload.type) {
			//  预警事件
			case 1:
				break;
			case 2:
				break;
			case 3: // 单聊推送
				if (!getApp().globalData.isAppHide) {
					console.error('应用没有切换到后台不做处理');
					return ;
				}
				plus.push.createMessage(`${payload.data.fromNick}:${payload.data.body}`, payload,
				{
					cover: false,
					delay: 1,
					sound: 'system'
				})
				break;
			case 4: // 群聊推送
				if (!getApp().globalData.isAppHide) {
					console.error('应用没有切换到后台不做处理');
					return ;
				}
				plus.push.createMessage(`${payload.data.fromNick}:${payload.data.body}`, payload,
				{
					cover: false,
					delay: 1,
					sound: 'system'
				})
				break;
			case 5:		//  系统消息-系统通知
			sysMsgConnect.addSysMsg([payload]);
				break;
			case 10:	//  系统消息-审批提醒
			sysMsgConnect.addSysMsg([payload]);
			case 11:	//  系统消息-被审批提醒
			sysMsgConnect.addSysMsg([payload]);
				break;
			default:
				break;
		}
		
	}
	
}

function push() { // Push
	//#ifdef APP-PLUS

	let myPush = new Push({
		clickCallBack: (e) => {
			try{
				let payload = e.payload;
				if (payload == null) return false;
				if (typeof payload == 'string') {
					payload = JSON.parse(e.payload);
				}
				if (!Object.prototype.hasOwnProperty.call(payload, 'type')) {
					try {
						if (typeof payload == 'string') {
							payload = JSON.parse(payload);
						}
					} catch (err) {
						console.warn(err);
						return false;
					}
				}
				console.log('clickCallBack', e, payload);
				handlerPush(payload, 'click');
			}catch(err){
				console.log('clickCallBack_ERR', err);
			}
		},
		receiveCallBack: (e) => {
			try{
				let payload, json;
				json = e.payload;
				if (typeof json == 'object') {
				
				} else {
					json = JSON.parse(json);
				}
				if (json.isRead) return false;
				json.isRead = true;
				payload = json;
				payload.isRead = true;
				console.log('receiveCallBack', e, payload);
				// myPush.showMessage(payload.title, payload.content, JSON.stringify(payload));
				handlerPush(payload, 'receive');
			}catch(err){
				console.log('receiveCallBack_ERR', err);
			}
		}
	});
	return myPush;

	//#endif
}

// function initSysMsgTable(){
// 	// 初始化系统消息
// 	const payload_sysmsg = {
// 		"title": "欢迎使用防火码",
// 		"data": {
// 			"fromNick": null,
// 			"msgType": null,
// 			"fromAccount": null,
// 			"eventType": null,
// 			"body": "欢迎使用防火码",
// 			"convType": null,
// 			"msgTimestamp": null,
// 			"to": null
// 		},
// 		"type": 999,
// 		"roomId": 0,
// 		"sysmsgRead":1,
// 		"sigData": "",
// 		"isRead": true
// 	}
	
// 	sysMsgConnect.addSysMsg(payload_sysmsg, 2)
// 	.then(()=>{
// 		console.log('initSysMsgTable_RES');
// 	})
// 	.catch(err=>{
// 		console.log('initSysMsgTable_ERR', err);
// 	})
	
// }

export default push;
