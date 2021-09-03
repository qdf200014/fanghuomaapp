function uniCloudConnect(branch, data) {
	return new Promise((resolve, reject)=>{
		uniCloud.callFunction({
			name: 'fanghuoma',
			data: {
				branch,
				data
			}
		})
		.then(res=>{
			resolve(res.result);
		})
		.catch(err=>{
			reject(err);
		})
	})
}

export default {
	// 基本配置获取
	"getConfig": (data) => {
		return uniCloudConnect('getConfig', data);
	},
}
