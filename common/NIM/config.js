const config = {
	NIMSDK: 'NIM_Web_SDK_miniapp_v8.2.0.js',
	// 是否开启调试, 如果开启调试, 将会在控制台输出一些log。默认false不输出日志, 可以传true来开启日志。
	ISDEBUG: false,
	// secure 模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true
	ISSECURE: true,
	// 在云信管理后台查看应用的 appKey
	APPKEY: '19e2704ba9af0b4db2ba239bb0147115',
	// 是否使用数据库
	USEDb: false,
	// 默认用户头像
	defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
	// 默认普通群头像
	defaultGroupIcon: '/static/easy-chat/team/putongqun@2x.png',
	// 默认高级群头像
	defaultAdvancedIcon: '/static/easy-chat/team/advanced/1.png',
	// 是否需要tabBar 显示会话中所有的未读消息计数
	isShowtabBarUnread: true,
	// tabBar计数的位置
	tabBarUnreadIndex: 1
}

export default config