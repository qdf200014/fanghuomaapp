export class WTVersion {
	constructor(arg) {
	    this.init(arg);
	}
	init(option){
		this.$localVersion = option;
		this.$localVersion.devices = this.checkDevices();
	}
	checkVersion(netVersion){
		console.log(netVersion.versionCode ,this.$localVersion.versionCode);
		if(netVersion.versionCode > this.$localVersion.versionCode){
			this.updataModel(netVersion);
		}
		return this.$localVersion;
	}
	updataModel(netVersion){
		uni.showModal({
			title: netVersion.version,
			content: netVersion.content,
			showCancel:false,
			confirmText: '立即更新',
			success: res => {
				// if(res.cancel)return false;
				this.updataRun(netVersion);
			},
			fail: () => {},
			complete: () => {}
		});
	}
	updataRun(netVersion){
		plus.runtime.openURL(netVersion.url);
	}
	checkDevices(){
		let devices;
		if (uni.getSystemInfoSync().platform == "ios") {
			devices = 1;
		}else{
			devices = 2;
		}
		return devices;
	}
}
