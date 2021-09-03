const AREA = {	// 主消息表
	/**
	 * 	"code": "110000000000",
		"name": "北京市",
		"level": 1,
		"parentCode": "0"
	 */
	table: {
		'id': `INTEGER PRIMARY KEY AUTOINCREMENT`,
		'code': `VARCHAR(20) UNIQUE`,			// String 区域码
		"name": `VARCHAR`,				// String 区域名
		'level': `INTEGER`,				// Integer 区域级别	[1省|2市|3县|4乡|5村]
		"parentCode": `VARCHAR(20)`,	// String 区域父级码
		/**
		 * 自定义时间字段，防止时序错误（用户无需关心）
		 */
		'createdTime': `TIMESTAMP default (datetime('now', 'localtime'))`,
	},
	key: []	// obj对象的key
}

export {
	AREA
}
