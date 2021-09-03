const FileShare = uni.requireNativePlugin('life-FileShare');

const SHARE_CONFIG = {
	filename: 'myfile.pdf',
	type: 'SYSTEM',
	url: ''
}

/**
 * 分享文件
 * @param {Object} options = {} 分享文件参数
 * @property {String} url 分享文件的网络地址
 * @property {String} type 分享文件QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
 * @property {String} filename 分享文件命名，默认为myfile.pdf
 */

function shareFile(options) {
	let _config = Object.assign({}, SHARE_CONFIG, options);
	let _filePath = '_doc/pdf/';
	return new Promise((resolve, reject) => {
		if(!_config.url)return reject({msg:'url is null'});
		isExistence(_filePath + _config.filename)
		.then(()=>{
			var dtask = plus.downloader.createDownload(_config.url, {
				filename: _filePath + _config.filename
			}, function(d, status) {
				console.log('下载完成', d.filename);
				// 下载完成
				if (status == 200) {
					FileShare.render({
						type: _config.type,
						filePath: plus.io.convertLocalFileSystemURL(d.filename),
					}, result => {
						resolve(result)
					});
				} else {
					reject(result);
					console.log("Download failed: " + status);
				}
			});
			dtask.start();
		})
		.catch(err=>{
			reject(err);
		})
	})
}


/**
 * 判断文件是否存在，并执行清除操作,避免文件名被改写
 * @param {Object} filepath	文件路径
 */
function isExistence(filepath){
	return new Promise((resolve, reject)=>{
		// 打开目标文件
		plus.io.resolveLocalFileSystemURL( filepath, entry=>{
			console.log('resolveLocalFileSystemURL_RES', entry.name);
			// 已存在则删除
			entry.remove( res=>{
				// console.log(entry.name+'已删除！');
				resolve();
			}, err=>{
				reject({msg:entry.name+'已存在！'});
			} );
		}, err=>{
			// console.log('resolveLocalFileSystemURL_ERR', err);
			// 不存在则回调成功
			resolve();
		} );
	})
}

function initShareFile() {
	uni.$shareFile = shareFile;
}

export {
	shareFile,
	initShareFile
};
