// 密码加密
import { LoginReady } from '@/common/request/api/index.js';
import JSEncrypt from '@/common/jsencrypt.min.js';

let encryption = Object.create(null)
let public_key = ''

encryption.create = async (pwd) => {
	if (pwd && pwd != '') {
		await LoginReady({}).then(res => {
			console.log('res', res);
			if (res.data.code == 0) {
				public_key = res.data.data
				const encrypt = new JSEncrypt();
				encrypt.setPublicKey(public_key);
				pwd = encrypt.encrypt(pwd)
				return pwd
			}
		}).catch(err => {
			console.log(err);
		})
	} else {
		uni.showToast({
			title: '加密密码为空',
			icon: 'none'
		})
	}
	return pwd
}

export default encryption