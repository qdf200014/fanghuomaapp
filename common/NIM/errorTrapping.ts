// 错误捕获函数

// 错误信息的格式
interface errInfo {
	info: string;
	appInfo: object;
	appVersion: string;
	level: number;
}

class NimErrorTrap {
	private isShowTips: boolean = true; // 监测到错误是否显示友好提示
	private tipInfo: string = ''; // 错误提示的内容
	private appInfo: object = {}; // app的信息
	private appVersion: string = ''; // app版本信息
	readonly private timeInterval: number = 2000; // 逐个显示错误信息的速度
	private logCache: [] = []; // 错误缓存
	private logNum: number = 0; // 错误日志的数量
	private postUrl: string = ''; // 上传错误日志的接口地址
	private errTimeout: any = null;
	private userInfo: object = {}; // 当前登录用户的信息
	private infoError: any = {}; // 当前错误的原始信息
	private errorTag: [] = []; // 报错时 生成的tag标签
	
	readonly private ExceptionKey: string = 'iD6eJV15IDNdqT77IRFCFdkbX5ctJkptRNkqqYml'; // 错误上报的key
	
	constructor(isShowTips: boolean = true) {
		console.log(isShowTips);
		this.isShowTips = isShowTips;
	}
	
	/**
	 * 上传错误的信息
	 *
	 * @memberof NimErrorTrap
	 */
	async uploadInfo(info: any = '', level?: number = 4) : void {
		// console.log(info.toString())
		this.infoError = info
		let json_info = info.toString()
		let _info : errInfo = await this.formatInfo(json_info, level)
		this.logCache.push(_info)
		this.logNum++
		
		// console.log('计时器开始', this.logCache, this.errTimeout)
		this.timeOut()
	}
	/**
	 * 计时器
	 *
	 * @memberof NimErrorTrap
	 */
	timeOut(): void {
		// 不存在timeout
		if (!this.errTimeout) {
			if (this.logCache.length <= 0) { // 没有数据 执行完成
				this.logNum = 0
				this.logCache = []
				console.log('执行完了')
				return;
			}
			
			// console.log('处理', this.logCache)
			let firstInfo: errInfo = this.logCache[0]
			this.showTips(firstInfo.info, firstInfo.level)
			this.apiException(firstInfo.info, firstInfo.level)
			this.logCache.shift()
			this.logNum--
			
			clearTimeout(this.errTimeout)
			this.errTimeout = setTimeout(() => {
				this.errTimeout = null
				this.timeOut()
			}, this.timeInterval)
		}
	}
	/**
	 * 整合错误信息
	 *
	 * @memberof NimErrorTrap
	 */
	formatInfo(info: string = '', level?: number = 4) : errInfo {
		this.getAppInfo()
		let obj = {
			info: info,
			appInfo: this.appInfo,
			appVersion: this.appVersion,
			level: level
		}
		return obj
	}
	/**
	 * 获取当前app的信息，准备上报
	 *
	 * @memberof NimErrorTrap
	 */
	getAppInfo() : void {
		this.appInfo = uni.getSystemInfoSync();
		this.appVersion = `Version ${plus.runtime.version} · ${plus.runtime.versionCode}`
		this.userInfo = uni.getStorageSync('userInfo') || {}
		
		let arr = []
		arr.push(this.appVersion)
		arr.push(this.appInfo.brand)
		arr.push(this.appInfo.model)
		arr.push(this.appInfo.platform)
		arr.push(this.userInfo.name)
		arr.push(this.userInfo.userId)
		
		this.errorTag = arr
		
		// console.log('获取用户信息', res)
	}
	/**
	 * 展示成功的提示信息
	 *
	 * @memberof NimErrorTrap
	 */
	async successInfo(info: any = ''): void {
		let json_info = info.toString()
		let _info : errInfo = await this.formatInfo(json_info, 2)
		this.logCache.push(_info)
		this.logNum++
		this.timeOut()
	}
	/**
	 * 展示警告的提示信息
	 *
	 * @memberof NimErrorTrap
	 */
	async warningInfo(info: any = ''): void {
		let json_info = info.toString()
		let _info : errInfo = await this.formatInfo(json_info, 3)
		this.logCache.push(_info)
		this.logNum++
		this.timeOut()
	}
	/**
	 * 展示默认的提示信息
	 *
	 * @memberof NimErrorTrap
	 */
	async primaryInfo(info: any = ''): void {
		let json_info = info.toString()
		let _info : errInfo = await this.formatInfo(json_info, 1)
		this.logCache.push(_info)
		this.logNum++
		this.timeOut()
	}
	/**
	 * 展示最终的信息
	 * level 
	 * 1 : 提示
	 * 2 : 成功
	 * 3 ： 警告
	 * 4: ： 错误
	 * @memberof NimErrorTrap
	 */
	showTips(info: string = '', level?: number = 4): void {
		this.tipInfo = info;
		if (!this.isShowTips) {
			// plus.nativeUI.toast(`<div style="color: #ffffff;font-size: 15px;text-align:center;">IMTip：遇到一个错误， 已经自动上报进行处理中</div>`, {
			// 	type: 'richtext',
			// 	verticalAlign: 'bottom',
			// 	duration: 'short',
			// 	background: '#909399'
			// });
			return;
		}
		let color = level >= 4 ? '#fa3534' : level === 3 ? '#f90' : level === 2 ? '#19be6b' : '#909399'
		plus.nativeUI.toast(`<div style="color: #ffffff;font-size: 15px;text-align:center;">IMTip：${this.tipInfo}</div>`, {
			type: 'richtext',
			verticalAlign: 'bottom',
			duration: 'short',
			background: color
		});
		// uni.showToast({
		// 	title: `ImErr：${this.tipInfo}`,
		// 	icon: 'none',
		// 	duration: this.timeInterval
		// });
		// NimErrorTrap.throwError('wucuole');
	}
	
	/**
	 * 
	 *
	 * @memberof NimErrorTrap
	 */
	apiException(info: string = '', level?: number = 4): void {
		// console.log('asddssdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.appVersion, this.appInfo)
		if (level !== 4) {
			return;
		}
		uni.request({
			url: 'http://123.57.172.229:5000/api/v2/events', //仅为示例，并非真实接口地址。
			method: 'POST',
			data: {
				"Id": `${plus.runtime.versionCode}-${parseInt(Math.random() * 999999999)}`,
				"Type": "error",
				"Source":"LXZ前端测试", 
				"Date": new Date(),
				"Version": this.appVersion,
				"AppInfo": this.appInfo,
				"UserInfo": this.userInfo,
				"Message": info,
				"Tags": this.errorTag,
				"@simple_error": this.infoError
			},
			header: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.ExceptionKey}`
			}
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.error(err);
		})
	}
	
	/**
	 * 异常处理
	 * @static
	 * @param {*} message   错误消息
	 * @memberof NimErrorTrap
	 */
	static throwError(message) {
		throw new Error(message);
	}
}

function sayHello(person: string): void {
	return 'Hello, ' + person;
}

export default NimErrorTrap;
