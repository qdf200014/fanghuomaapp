function keepOn(){
		console.log('keepScreenOn——true');
		uni.setKeepScreenOn({
		    keepScreenOn: true
		});
	}
function keepOff(){
		uni.setKeepScreenOn({
		    keepScreenOn: false
		});
	}
function isKeepOn(){
		//#ifdef APP-PLUS
		return plus.device.isWakelock();
		//#endif
		return false
	}


export default{
	keepOn,
	keepOff,
	isKeepOn
}