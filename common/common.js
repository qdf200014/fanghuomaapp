export function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1500
	}

	let _lastTime = null

	// 返回新的函数
	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments) //将this和参数传给原函数
			_lastTime = _nowTime
		}
	}
}

// 处理多次点击
// export function noMultipleClicks(methods) {
//     let that = this;
    
//     if (that.noClick) {
//         that.noClick= false;
//         methods();
//         setTimeout(function () {
//             that.noClick= true;
//         }, 2000)
//     } else {
//         console.log("请稍后点击")
//     }
// }