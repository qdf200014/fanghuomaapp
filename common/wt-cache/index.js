//#ifdef APP-PLUS
import {
	sqlite
} from '@/common/sqlite/index.js';
const areaConnect = new sqlite.area(); // 区域选择
//#endif
class WTCache {
	constructor(arg) {
		this.init();
	}
	init() {

	}
	formatSize() {
		return new Promise(function(resolve, reject) {
			let fileSizeString = '0B';
			plus.cache.calculate(function(size) {
				let sizeCache = parseInt(size);
				if (sizeCache == 0) {
					fileSizeStringfileSizeString = "0B";
				} else if (sizeCache < 1024) {
					fileSizeString = sizeCache + "B";
				} else if (sizeCache < 1048576) {
					fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
				} else if (sizeCache < 1073741824) {
					fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
				} else {
					fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
				}
				console.log('catch_RES', fileSizeString);
				resolve(fileSizeString);
			});
		})
	}
	clearSqlTable() {
		//#ifdef APP-PLUS
		return areaConnect.dropAreaTable()
			.then(() => {
				areaConnect.createAreaTable();
			})
		//#endif
	}
	clearCache() {
		this.clearSqlTable();
		return new Promise(function(resolve, reject) {
			if (plus.os.name == 'Android') {
				let main = plus.android.runtimeMainActivity();
				let sdRoot = main.getCacheDir();
				let files = plus.android.invoke(sdRoot, "listFiles");
				let len = files.length;
				for (let i = 0; i < len; i++) {
					let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
					plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
						if (entry.isDirectory) {
							entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
								uni.showToast({
									title: '缓存清理完成',
									duration: 2000
								});
								resolve();
							}, function(e) {
								console.log(e.message)
							});
						} else {
							entry.remove();
						}
					}, function(e) {
						console.log('文件路径读取失败')
					});
				}
			} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
				plus.cache.clear(function() {
					uni.showToast({
						title: '缓存清理完成',
						duration: 2000
					});
					console.log('缓存清理完成');
					resolve();
				});
			}
		}).then(()=>{
			this.clearDoc();
		})
	}
	clearDoc(){
		let filepath = '_doc/';
		return new Promise((resolve, reject)=>{
			// 打开目标文件
			plus.io.resolveLocalFileSystemURL( filepath, entry=>{
				// 递归删除
				entry.removeRecursively( res=>{
					resolve({msg:'删除成功！'});
				}, err=>{
					reject({msg:'删除失败！'});
				} );
			}, err=>{
				// 不存在则回调成功
				resolve({msg:'目录打开失败！'});
			} );
		})
	}
}
export default WTCache
