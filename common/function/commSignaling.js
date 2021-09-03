// 关于信令的一些方法

// 信令错误处理 根据错误码返回对应的信息
// 错误码包含如下
/*
10201	执行的操作已经成功，只是对方不在线（推送可达，但是离线）
10202	执行的操作已经成功，只是对方推送不可达
10404	对应的频道不存在
10405	对应的频道已存在
10406	不在频道内
10407	已经在频道内
10408	邀请不存在或已过期
10409	邀请已经拒绝
10410	邀请已经接受了
10417	加入频道uid 冲突
10419	频道人数超限
10420	已经在频道内（自己的其他端）
*/
export function errHandleSign(err) {
	if (!err.code) {
		console.log('errcode不存在');
		return ;
	}
	let text = '未识别的错误'
	switch(err.code) {
		case 10404:
			text = '聊天通话已经结束'
			break;
		case 10405:
			text = '对应的频道已存在'
			break;
		case 10408:
			text = '邀请不存在或已过期'
			break;
		case 10417:
			text = '加入频道uid 冲突'
			break;
		case 10409:
			text = '邀请已经拒绝'
			break;
		case 10410:
			text = '邀请已经接受了'
			break;
	}
	uni.showToast({
		title: text,
		icon: 'none'
	})
}