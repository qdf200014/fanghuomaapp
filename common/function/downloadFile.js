// 下载任务的方法
// 创建的下载会话，唯一
let downloadTask = null
// 所有下载任务的会话
let AllDownloadTaskArr = []
// 提示内容
let pushTip = {}
// 将要更新的版本号
let __versionCode = ''
// 用于控制调用下载进度显示的频率
let showMessageFlag = 0
// 显示正在下载的遮罩
let showUpgradeLoading = false

// 检查点击立即更新后是否要创建下载任务，或者断点续传
// 更新app方法的入口（唯一）
export function checkIsDownLoadUpgradeApp(obj) {
	if (!obj || !obj.url) {
		console.log('checkIsDownLoadUpgradeApp传递的参数错误');
		return;
	}
	pushTip.content = obj.content || ''
	pushTip.version = obj.version || ''
	__versionCode = obj.versionCode
	let ReadyUpgradeApp = uni.getStorageSync('ReadyUpgradeApp') || null
	if (ReadyUpgradeApp) {
		if (ReadyUpgradeApp.version == __versionCode) {
			installApp(ReadyUpgradeApp.filePath)
			return;
		} else {
			deleteUpgradeApp(ReadyUpgradeApp.filePath)
			removeUpgradeInfo()
		}

	}

	let tasksId = uni.getStorageSync('UpgradeTasksId') || null
	// 如果存在就检查是否要断点续传
	if (tasksId) {
		plus.downloader.enumerate(function(tasks) {
			console.log("Unfinished task count: ", tasks);
			AllDownloadTaskArr = tasks
			AllDownloadTaskArr.map(item => {
				if (item.id === tasksId && item.state != 4) {
					item.addEventListener("statechanged", onStateChanged, false);
					item.pause()
					item.resume()
				} else if (item.id === tasksId && item.state == 4) {
					uniSaveFile(item.filename)
				}
			})
		}, -1);
	} else {
		createDown(obj.url)
	}
}

export function createDown(src) {
	if (!src || src == '') {
		uni.showToast({
			title: '创建下载任务失败',
			icon: 'none'
		})
		return;
	}
	// 文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 uni.saveFile，才能在应用下次启动时访问得到
	downloadTask = plus.downloader.createDownload(src, {}, function(d, status) {
		// 下载完成
		if (status == 200) {
			console.log("Download success: " + d.filename);
		} else {
			console.log("Download failed: " + status);
		}
	});

	downloadTask.addEventListener("statechanged", onStateChanged, false);
	saveTasksId()
	downloadTask.start()
}


// 监听下载任务状态 
function onStateChanged(download, status) {
	// console.log('监听到下载任务状态改变', download, status);
	try {
		let progress = null
		if (download.state == 3) {
			if (showMessageFlag % 200 == 0) {
				progress = ((download.downloadedSize / download.totalSize) * 100).toFixed(2)
				plus.push.createMessage(`更新进度${progress}%，${pushTip.content}`, '消息承载的内容', {
					'cover': true,
					'title': `${pushTip.version}`,
					'sound': 'none'
				})
				// plus.nativeUI.closeWaiting();
				// plus.nativeUI.showWaiting(`正在下载安装包，进度${progress}%`);
			}
		}
		if (download.state == 4 && status == 200) {
			// 下载完成 
			// plus.nativeUI.closeWaiting();
			console.log("Download success: " + download.getFileName());
			plus.push.createMessage(`${pushTip.content}`, '消息承载的内容', {
				'cover': true,
				'title': `更新包下载完成`
			})
			// 清除已完成的下载任务
			// plus.downloader.clear(4);
			uniSaveFile(download.filename)
		}
		if (download.state == 5) {
			console.log('监听到下载任务暂停');
			// plus.nativeUI.closeWaiting();
		}
		
		if (!showUpgradeLoading) {
			// plus.nativeUI.showWaiting('正在下载安装包···');
			showUpgradeLoading = true
		}

		showMessageFlag++
	} catch (e) {
		//TODO handle the exception
		console.log('onStateChanged err', e);
	}

}

// 成功创建下载任务后，保存当前更新任务的会话id，方便下次断点续传
function saveTasksId() {
	plus.downloader.enumerate(function(tasks) {
		console.log("Unfinished task count: ", tasks);
		try {
			AllDownloadTaskArr = tasks
			let arrLength = 0
			let tasksId = ''
			arrLength = AllDownloadTaskArr.length - 1
			if (arrLength < 0 && AllDownloadTaskArr[arrLength]) {
				console.log('下载会话队列异常');
				return;
			}
			tasksId = AllDownloadTaskArr[AllDownloadTaskArr.length - 1].id
			if (tasksId) {
				uni.setStorageSync('UpgradeTasksId', tasksId)
			}
		} catch (e) {
			//TODO handle the exception
			console.log('saveTasksId err', e);
			UpgradeErr()
		}

	}, -1);
}

// 枚举所有下载任务
// undefined: (undefined 类型 )下载任务未开始
// 通过plus.downloader.createDownload()方法创建下载任务后的初始状态，此时可调用其start()方法开始下载。

// 0: (Number 类型 )下载任务开始调度
// 调用下载任务的start()方法之后处于此状态，此时下载任务处于可调度下载状态。

// 1: (Number 类型 )下载任务开始请求
// 下载任务建立网络连接，发送请求到服务器并等待服务器的响应。

// 2: (Number 类型 )下载任务请求已经接收
// 下载任务网络连接已建立，服务器返回响应，准备传输数据内容。

// 3: (Number 类型 )下载任务接收数据
// 下载任务接收数据，监听statechanged事件时可多次触发此状态。

// 4: (Number 类型 )下载任务已完成
// 下载任务完成数据传输并断开连接，下载成功或失败都会设置为此状态。

// 5: (Number 类型 )下载任务已暂停
// 调用下载任务的pause()方法将任务暂停，此时可调用其resume()方法重新开始下载。

// -1: (Number 类型 )枚举任务状态
// 非下载任务状态，泛指所有下载任务的状态，用于enumerate()和clear()操作时指定作用于所有下载任务。
function getAllDownloader() {
	plus.downloader.enumerate(function(tasks) {
		console.log("Unfinished task count: ", tasks);
		AllDownloadTaskArr = tasks
	}, -1);
}

// 前往安装App
export function installApp(filePath) {
	filePath = plus.io.convertLocalFileSystemURL(filePath);
	plus.runtime.install(filePath, {}, (res) => {
		console.log('安装成功', res);
	}, (err) => {
		console.log('安装失败', err);
		UpgradeErr()
	});
}

export function uniSaveFile(src) {
	uni.saveFile({
		tempFilePath: src,
		success: (res) => {
			console.log('uni保存文件成功', res);
			// 保存下载完成的包的信息
			uni.setStorageSync('ReadyUpgradeApp', {
				filePath: res.savedFilePath,
				version: __versionCode
			})
			installApp(res.savedFilePath)
		},
		fail: (err) => {
			console.log('uni保存文件失败', err);
			UpgradeErr()
		}
	});
}

// 更新时错误处理
function UpgradeErr() {
	// plus.nativeUI.closeWaiting();
	uni.showToast({
		title: '更新遇到错误，请重新下载安装！',
		icon: 'none'
	})
	removeUpgradeInfo()
}

// 删除某个缓存包
function deleteUpgradeApp(path) {
	console.log('删除某个缓存包');
	uni.removeSavedFile({
		filePath: path,
		success: (res) => {
			console.log('删除缓存包成功', res);
		},
		fail: (err) => {
			console.log('删除缓存包失败', err);
		},
		complete: function(res) {
			console.log(res);
		}
	});
}

// 清除本地记录的缓存信息
function removeUpgradeInfo() {
	uni.removeStorageSync('UpgradeTasksId')
	uni.removeStorageSync('ReadyUpgradeApp')
}
