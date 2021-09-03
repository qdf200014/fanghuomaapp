const MSG = {	// 系统消息表
	table: {
		'id': `INTEGER PRIMARY KEY AUTOINCREMENT`,
		
		"title": `VARCHAR(20)`,		// string  标题
		"data": `VARCHAR`,			// string  消息体
		"type": `INTEGER`,			// Integer 系统消息类型	[10]
		"sysmsgRead":`BOOLEAN`,		// boolean 系统消息是否已读
		"roomId": "INTEGER UNIQUE",	// string  系统消息唯一标志 ----作为唯一约束
		"sigData": "VARCHAR",		// string  无效附加字段
		"isRead":`BOOLEAN`,			// boolean 无效附加字段
		/**
		 * 自定义时间字段，防止时序错误（用户无需关心）
		 */
		'createdTime': `TIMESTAMP default (datetime('now', 'localtime'))`,
	},
	refer: {
		"title": null,
		"data": null,
		"type": 10,
		"sysmsgRead":false,
		"roomId": null,
		"sigData": null,
		"isRead": false,
	},
	key: ['data']	// 需转换的key
}

export {
	MSG
}
