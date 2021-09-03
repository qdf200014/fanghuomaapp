// 该文件为项目的自配置文件
let config = {
	sdk: 'NIM_Web_SDK_miniapp_v7.8.1.js',
	// 用户logo地址
	logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
	// 默认用户头像
	defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
	// 默认普通群头像
	defaultGroupIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-group.png',
	// 默认高级群头像
	defaultAdvancedIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-advanced.png',
	// 系统通知图标
	noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
	// 我的手机图标
	myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
	// 本地消息显示数量，会影响性能
	localMsglimit: 36,
	useDb: false,
	// 是否打开调试显示console.log
	isDebug: false,
	// 用户的appkey
	appkey: 'fa52793da28cb2cedf86577c46a022de',
	postUrl: 'https://api.netease.im/nimserver',
	// 自定义sqlite存储路径
	sqlPath: 'wtsql',
	sqlName: 'wtsql',
	// 判断是否为测试版本 可选两个值 【Beta（测试）、Official（正式）】，不填默认正式
	VERSION: 'Official' 
}
if (uni.getStorageSync('debugVERSION')) {
	config.VERSION = uni.getStorageSync('debugVERSION')
}
export default config
