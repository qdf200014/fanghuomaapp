class Push {
	constructor(arg) {
		/* this.clickCallBack = arg.clickCallBack || null;
		this.receiveCallBack = arg.receiveCallBack || null; */
		this.$options = {};
		this.$ready = false;
		this.$queue = [];
		Object.assign(this.$options, arg);
		this.init();
	}
	init() { // 初始化
		this.getProvider();
		this.pageGetReady();
		this.getClientId();
		// this.permissions();
	}
	pageGetReady(){
		uni.$once('pushPageReady',()=>{
			console.log('pageReady,openPushPage!');
			this.$ready = true;
			this.queue();
		})
	}
	queue(){
		if(this.$options.clickCallBack){
			this.$queue.forEach(qurue=>{
				this.$options.clickCallBack(qurue);
			});
			this.$queue = [];
		}else{
			console.warn('无回调抛出');
		}
	}
	getClientId(){
		let cid = uni.getStorageSync('cid') || false;
		if(cid == null || cid == false || cid == 'null' || cid == undefined){
			cid = plus.push.getClientInfo().clientid;
			uni.setStorageSync('cid', cid);
		}
		console.log('getClientId', cid);
		return cid;
	}
	getProvider() {
		uni.getProvider({ //获取推送通道
			service: 'push',
			success: e => {
				console.log('获取推送通道成功:' + JSON.stringify(e));
				this.addEventListener();
			},
			fail: e => {
				console.log("获取推送通道失败:" + JSON.stringify(e));
			}
		})
		plus.push.setAutoNotification(false); //透传消息显示
	}
	addEventListener() { // 监听消息
		plus.push.addEventListener('click', (e) => {
			if(this.$ready){
				if(this.$options.clickCallBack){
					this.$options.clickCallBack(e);
				}
			}else{
				this.$queue.push(e);
			}
		});
		plus.push.addEventListener('receive', (e) => {
			// console.log('onReceive', e);
			let payload = e.payload;
			if(typeof payload == 'object'){
				if(payload == null || payload.isRead)return false;
			}else{
				if(JSON.parse(payload).isRead)return false;
			}
			// console.log(e);
			if(this.$options.receiveCallBack){
				// console.log('receiveCallBack');
				this.$options.receiveCallBack(e);
			}else{
				// console.log('receiveCallBack');
				this.showMessage(e.title, e.content, e.payload);
			}
		});
	}
	showMessage(title, content, payload) { // 显示消息
		let temp = '防火码';
		let opt = {
			'cover': true
		}
		opt.title = title || temp;
		opt.content = content;
		plus.push.createMessage((content || temp), (JSON.stringify(payload) || temp), opt);
	}
	setBadge(number){
		if(typeof number == 'number'){
			plus.runtime.setBadgeNumber(number);
		}else{
			plus.runtime.setBadgeNumber(0);
		}
	}
	isPermissions(){ // 是否开启推送权限 <Boolean> true/false
		let _permissions = false;
		// #ifdef APP-PLUS  
		if (plus.os.name == 'Android') { // 判断是Android
			var main = plus.android.runtimeMainActivity();
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
			var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
			_permissions = areNotificationsEnabled;
		} else if (plus.os.name == 'iOS') { // 判断是ISO
			var isOn = undefined;
			var types = 0;
			var app = plus.ios.invoke('UIApplication', 'sharedApplication');
			var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
			if (settings) {
				types = settings.plusGetAttribute('types');
				plus.ios.deleteObject(settings);
			} else {
				types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
			}
			plus.ios.deleteObject(app);
			isOn = (0 != types);
			_permissions = isOn;
		}
		// #endif  
		return _permissions;
	}
	settingPermissions(){ // 打开设置页面
		// #ifdef APP-PLUS  
		if (plus.os.name == 'Android') { // 判断是Android
			var main = plus.android.runtimeMainActivity();
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
			
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			
			
			var Intent = plus.android.importClass('android.content.Intent');
			var Build = plus.android.importClass("android.os.Build");
			//android 8.0引导  
			if (Build.VERSION.SDK_INT >= 26) {
				var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
			} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
				var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra("app_package", pkName);
				intent.putExtra("app_uid", uid);
			} else { //(<21)其他--跳转到该应用管理的详情页  
				intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
				var uri = Uri.fromParts("package", main.getPackageName(), null);
				intent.setData(uri);
			}
			// 跳转到该应用的系统通知设置页  
			main.startActivity(intent);
		} else if (plus.os.name == 'iOS') {
			var app = plus.ios.invoke('UIApplication', 'sharedApplication');
			var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
			plus.ios.invoke(app, 'openURL:', setting);
			plus.ios.deleteObject(setting);
			plus.ios.deleteObject(app);
		}
		// #endif  
	}
	// permissions() { // 开启推送权限
	// 	// 
	// 	if (plus.os.name == 'Android') { // 判断是Android
	// 		var main = plus.android.runtimeMainActivity();
	// 		var pkName = main.getPackageName();
	// 		var uid = main.getApplicationInfo().plusGetAttribute("uid");
	// 		var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
	// 		var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
	// 		// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
	// 		if (!areNotificationsEnabled) {
	// 			uni.showModal({
	// 				// title: '通知权限开启提醒',
	// 				// content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
	// 				// cancelText: '取消',
	// 				// confirmText: '去设置',
	// 				success: e => {
	// 					if (e.confirm) {
	// 						var Intent = plus.android.importClass('android.content.Intent');
	// 						var Build = plus.android.importClass("android.os.Build");
	// 						//android 8.0引导  
	// 						if (Build.VERSION.SDK_INT >= 26) {
	// 							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
	// 							intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
	// 						} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
	// 							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
	// 							intent.putExtra("app_package", pkName);
	// 							intent.putExtra("app_uid", uid);
	// 						} else { //(<21)其他--跳转到该应用管理的详情页  
	// 							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
	// 							var mainActivity = plus.android.runtimeMainActivity();
	// 							var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
	// 							intent.setData(uri);
	// 						}
	// 						// 跳转到该应用的系统通知设置页  
	// 						main.startActivity(intent);
	// 					}
	// 				},
	// 				fail: (res) => {},
	// 				complete: () => {}
	// 			});
	// 		}
	// 	} else if (plus.os.name == 'iOS') { // 判断是ISO
	// 		var isOn = undefined;
	// 		var types = 0;
	// 		var app = plus.ios.invoke('UIApplication', 'sharedApplication');
	// 		var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
	// 		if (settings) {
	// 			types = settings.plusGetAttribute('types');
	// 			plus.ios.deleteObject(settings);
	// 		} else {
	// 			types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
	// 		}
	// 		plus.ios.deleteObject(app);
	// 		isOn = (0 != types);
	// 		if (isOn == false) {
	// 			uni.showModal({
	// 				// title: '通知权限开启提醒',
	// 				// content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
	// 				// cancelText: '取消',
	// 				// confirmText: '去设置',
	// 				success: e => {
	// 					if (e.confirm) {
	// 						var app = plus.ios.invoke('UIApplication', 'sharedApplication');
	// 						var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
	// 						plus.ios.invoke(app, 'openURL:', setting);
	// 						plus.ios.deleteObject(setting);
	// 						plus.ios.deleteObject(app);
	// 					}
	// 				},
	// 				fail: () => {},
	// 				complete: () => {}
	// 			});
	// 		}
	// 	}
	// 	// 
	// }
}
export default Push;
