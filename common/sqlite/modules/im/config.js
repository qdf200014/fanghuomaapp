const SESSION = {	// 主消息表
	table: {
		'id': `INTEGER PRIMARY KEY AUTOINCREMENT`,
		'scene': `VARCHAR(10)`,			// String 场景
		"from": "VARCHAR",				// String 消息发送方, 帐号
		'fromNick': `VARCHAR(20)`,		// String 消息发送方的昵称
		"fromClientType": "VARCHAR(15)",	// String 发送方的设备类型 ['Android' (安卓)|'iOS' (苹果)|'PC' (桌面)|'WindowsPhone' (微软)|'Web' (浏览器)]
		"fromDeviceId": "VARCHAR",		// String 发送端设备id
		"to": "VARCHAR",				// String 消息接收方, 帐号或群id
		"time": `INTEGER`,				// Integer 时间戳
		"userUpdateTime": `INTEGER`,	// Integer 发送方信息更新时间
		'type': `VARCHAR(10)`,			// String 消息类型 ['p2p' (单人聊天)|'team' (群聊)|'superTeam' (超大群聊天)]
		"sessionId": "VARCHAR",			// String 消息所属的会话的ID
		"target": "VARCHAR",			// String 聊天对象, 账号或者群id
		'flow': `VARCHAR(5)`,			// Strinf 消息的流向 [in|out]
		"status": "VARCHAR",			// String 消息发送状态 ['sending' 发送中|'success' 发送成功|'fail' 发送失败]
		'text': `VARCHAR(255)`,			// String 文本消息的文本内容
		'file': 'VARCHAR',				// Object 文件消息的文件对象
		"geo": `VARCHAR`,				// Object 地理位置消息
		'tip': `VARCHAR`,				// String 提醒消息的内容
		'content': `VARCHAR`,			// String 自定义消息的消息内容, 开发者可以自行扩展, 建议封装成JSON格式
		'attach': `VARCHAR`,			// Object 群通知消息的附加信息
		'idClient': `VARCHAR(20) UNIQUE`,// String SDK生成的消息id  -------------------------------------作为唯一约束
		"idServer": "VARCHAR",			// String 服务器用于区分消息用的ID(此字段可能没有)
		"isMuted":`BOOLEAN`,			// Boolean 该消息在接收方是否应该被静音
		"resend": `BOOLEAN`,			// Boolean 是否是重发的消息
		'custom': `VARCHAR`,			// String 扩展字段
		'pushContent': 'VARCHAR',		// String 自定义推送文案
		"pushPayload":"VARCHAR",		// String 自定义的推送属性
		"apns":`VARCHAR`,				// Object 特殊推送选项, 只在群会话中使用
		"localCustom":`VARCHAR`,		// String 本地自定义扩展字段
		"isHistoryable": `BOOLEAN`,		// Boolean 是否存储云端历史
		"isRoamingable": `BOOLEAN`,		// Boolean 是否存储漫游
		"isSyncable": `BOOLEAN`,		// Boolean 是否支持发送者多端同步
		"cc": `BOOLEAN`,				// Boolean 是否支持抄送
		"isPushable": `BOOLEAN`,		// Boolean 是否需要推送
		"isOfflinable": `BOOLEAN`,		// Boolean 是否要存离线
		"isUnreadable": `BOOLEAN`,		// Boolean 是否计入消息未读数
		"isReplyMsg": `BOOLEAN`,		// Boolean 是否为应答消息（用于机器人等类似场景等应答消息内容）
		'tempTeamMemberCount': `INTEGER`,	// Integer 群已读消息快照大小
		"needPushNick": `BOOLEAN`,		// Boolean 是否需要推送昵称
		"isLocal": `BOOLEAN`,			// Boolean 是否是本地消息
		"replyMsgFromAccount":`VARCHAR`,	// String 被回复消息的发送者账号
		"replyMsgToAccount":`VARCHAR`,	// String 被回复消息的接受者账号
		"replyMsgTime":`INTEGER`,		// Integer 被回复消息的time
		"replyMsgIdServer":`VARCHAR`,	// String 被回复消息idServer
		"replyMsgIdClient":`VARCHAR`,	// String 被回复消息的idClient
		"threadMsgFromAccount":`VARCHAR`,	// String thread消息的发送者账号
		"threadMsgToAccount":`VARCHAR`,	// String thread消息的接受者账号
		"threadMsgTime":`INTEGER`,		// Integer thread消息的time
		"threadMsgIdServer":`VARCHAR`,	// String thread消息的idServer
		"threadMsgIdClient":`VARCHAR`,	// String thread消息的idClient
		"delete":`BOOLEAN`,				// Boolean 表该消息是否已被撤回或单向删除，获取thread消息列表时会用到表该消息是否已被撤回或单向删除，获取thread消息列表时会用到
		"callbackExt":`VARCHAR`,		// String 服务器第三方回调的扩展字段
		"subType":`INTEGER`,			// Integer 开发者自定义的消息子类型，格式为大于0的整数
		"env":`INTEGER`,				// Integer 环境变量，用于指向不同的抄送、第三方回调等配置

		/**
		 * 以下为原有扩展字段，目前保留，语义不详
		 */

		"needMsgReceipt": `BOOLEAN`,
		'isLock': `BOOLEAN`,
		'likeList': `VARCHAR`,
		
		/**
		 * 自定义时间字段，防止时序错误（用户无需关心）
		 */
		'createdTime': `TIMESTAMP default (datetime('now', 'localtime'))`,
		'updataTime': `TIMESTAMP default (datetime('now', 'localtime'))`,
		
	},
	refer:{
		'scene': null,
		"from": null,
		'fromNick': null,
		"fromClientType": null,
		"fromDeviceId": null,
		"to": null,
		"time": null,
		"userUpdateTime": null,
		'type': null,
		"sessionId": null,
		"target": null,
		'flow': null,
		"status": null,
		'text': null,
		'file': null,
		"geo": null,
		'tip': null,
		'content': null,
		'attach': null,
		'idClient': null,
		"idServer": null,
		"isMuted": null,
		"resend": null,
		'custom': null,
		'pushContent': null,
		"pushPayload": null,
		"apns": null,
		"localCustom": null,
		"isHistoryable": null,
		"isRoamingable": null,
		"isSyncable": null,
		"cc": null,
		"isPushable": null,
		"isOfflinable": null,
		"isUnreadable": null,
		"isReplyMsg": null,
		'tempTeamMemberCount': null,
		"needPushNick": null,
		"isLocal": null,
		"replyMsgFromAccount": null,
		"replyMsgToAccount": null,
		"replyMsgTime": null,
		"replyMsgIdServer": null,
		"replyMsgIdClient": null,
		"threadMsgFromAccount": null,
		"threadMsgToAccount": null,
		"threadMsgTime": null,
		"threadMsgIdServer": null,
		"threadMsgIdClient": null,
		"delete": null,
		"callbackExt": null,
		"subType": null,
		"env": null,
	},
	key: ['file', 'geo', 'attach', 'apns']	// obj对象存储时转为json
}
const SESSION_LIST = {	// 会话列表
	table: {
		ident:`VARCHAR`,
		name:`VARCHAR`,
		avatar:`VARCHAR`,
		id:`PRIMARY KEY`,
		name: `CHAR(50)`,
		lastMsg:`VARCHAR`,
		msgReceiptTime:'VARCHAR',
		scene:'VARCHAR',
		to:'VARCHAR',
		unread:'VARCHAR',
		updateTime: `VARCHAR`,
		isLock:'BOOLEAN',
		isTop:'BOOLEAN',
		lockPassWord:'VARCHAR',
		createdTime: `TIMESTAMP default (datetime('now', 'localtime'))`
	},
	key: []
}

export {
	SESSION,
	SESSION_LIST
}
