/**
 * wgt更新资源
 */
function APPReplace() {
	return uni.$api.cloudConnect.getConfig({
			versionCode: Number(plus.runtime.versionCode) + 1
		})
		.then(res => {
			console.log('.cloudConnect.getConfig_', res);
			let data = res.data;
			if(data.id && data.url){	// 资源存在
				installWgt(data);
			}
		})
		.catch(err => {
			console.log('.cloudConnect.getConfig_ERR', err);
		});
}

/**
 * @param {Object} url wgt资源
 */function installWgt(data){
	let wgt_key = `wgt_${data.id}`;
	let wgt_load = uni.getStorageSync(wgt_key) || false;
	if(wgt_load) return true;	// 资源已安装
	if (!(/\.wgt$/i.test(data.url)))return false;	// 校验资源
	let dtask = plus.downloader.createDownload(data.url, {
	    filename: "_doc/update/"
	}, function(download, status) {
	    if (status == 200) {
	        plus.runtime.install(download.filename, {}, res=> {
	            console.log('静默安装成功！！！');
				uni.setStorageSync(wgt_key, true);
	        }, function(e) {
	            console.log('静默安装失败！！！');
	        });
	    } else {
			console.log('下载失败！！！');
		}
	});
	dtask.start();
}

export default function() {
	return APPReplace();
}
