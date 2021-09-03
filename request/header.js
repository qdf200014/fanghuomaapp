let getToken = (index) => { // 获取token
	let _token = '', _index = index || 0;
	switch (_index){
		case 0:
		_token = uni.getStorageSync('token') || '';
			break;
		case 1:
		let userInfo = uni.getStorageSync('userInfo') || false;
		_token = userInfo ? userInfo.oldToken : '';
			break;
		default:
			break;
	}
	return _token;
}

let getUuid = () => { // 获取uuid
	let uuid = uni.getStorageSync('uuid') || false;
	if (!uuid) {
		let s = [];
		let hexDigits = "0123456789abcdef";
		for (let i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
		let stamp = new Date().getTime();
		uuid = s.join("") + stamp;
		uni.setStorageSync('uuid', uuid);
	}
	return uuid;
}

let getHeader = (phaseIndex) => { // 获取请求头
	let header = {
		cid: uni.getSystemInfoSync().platform
	};
	header.Authorization = header.token = getToken(phaseIndex);

	//#ifdef APP-PLUS
	header.cid = (uni.getStorageSync('cid') || plus.push.getClientInfo().clientid || '') // 设置cid
	//#endif

	return header;
}
let getStaticHeader = () => { // 获取静态请求头
	let staticHeader = { //  通用静态头
		'X-Requested-With': 'XMLHttpRequest',
		"Content-Type": "application/json; charset=UTF-8",
		versionCode: uni.getSystemInfoSync().platform,
		version: uni.getSystemInfoSync().platform,
	};
	staticHeader.uuid = getUuid() || '';
	staticHeader.platform = uni.getSystemInfoSync().platform || 'app';
	staticHeader.source = 'app';
	//#ifdef APP-PLUS
	staticHeader.versionCode = plus.runtime.versionCode; // 版本号
	staticHeader.version = plus.runtime.version;
	//#endif

	return staticHeader;
}
export {
	getToken,
	getUuid,
	getHeader,
	getStaticHeader
}
