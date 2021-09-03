import store from '@/store/index.js'

// 接受别人邀请
export function signalingAccept({
	state,
	commit
}, options) {
	console.log(options);
	const nim = state.nim
	nim.signalingAccept();
}

export function signalingCall({
	state,
	commit
}, options) {
	let tempOpt = Object.assign({}, options);
	const nim = state.nim
	nim.signalingCall(tempOpt);
}
const routeReg = /pages\/rtc\/liveroom\//ig;
function isInCallPage(){	// 判断是否通话页面
	const currentPage = getCurrentPages().reverse()[0];
	return routeReg.test(currentPage.route);
}

function leaveRoom(){	// 离开房间
	setTimeout(() => {
		uni.navigateBack();
	}, 1500)
}

export function signalingNotifyHandler(event) {
	console.log("signalingOnlineNotify: ", event);
	switch (event.eventType) {
		case "ROOM_CLOSE":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			  */
			uni.showToast({
				title: "当前通话已结束",
				icon: 'none'
			})
			leaveRoom();
			console.log("独立呼叫信令：房间关闭事件");
			break;
		case "ROOM_JOIN":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			    event.member 新加入的成员信息
			  */
			if (!store.state.call.isAccept) {
				store.commit('call/updateAccept', {
					flag: true
				})

				console.log("有人加入房间开始聊天");
			}
			console.log("独立呼叫信令：加入房间事件");
			break;
		case "INVITE":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			    event.toAccount 接收者的账号
			    event.requestId 邀请者邀请的请求id，用于被邀请者回传request_id_作对应的回应操作
			    event.pushInfo 推送信息
			  */
			 
			 // 标记消息已读
			store.getters['initNim/nim'].signalingMarkMsgRead({
				msgid: event.msgid
			})
			
			// store.getters['initNim/nim'].signalingGetChannelInfo({
			// 	channelName: event.channelName
			// }).then(res => {
				
			// })
			
			let attachExt = JSON.parse(event.attachExt)

			console.log('接受到邀请的信令， 解析其传递的内容', attachExt);

			// 如果收到邀请时，存在正在的会话， 发送忙线的信息
			if (getApp().globalData.isCall) {
				if (attachExt.scene === 'p2p') {
					// 接收人，发送取消单聊通话的信令
					store.getters['initNim/nim'].signalingReject({
						channelId: attachExt.channelId,
						account: attachExt.from,
						requestId: attachExt.roomId
					}).then(res => {
						// 发送消息
					});
				}
				return;
			}


			setTimeout(() => {
				// 音频
				if (event.type == '1') {
					if (attachExt.scene === 'p2p') {
						uni.navigateTo({
							url: '/pages/rtc/liveroom/liveaudioroom?sigData=' + encodeURIComponent(event.attachExt) + '&isCreator=0'
						});
					} else {
						uni.navigateTo({
							url: '/pages/rtc/liveroom/liveaudioroom-team?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) +
								'&isCreator=0'
						});
					}
				} else if (event.type == '2') { // 视频
					if (attachExt.scene === 'p2p') {
						uni.navigateTo({
							url: '/pages/rtc/liveroom-0416/liveroom?sigData=' + encodeURIComponent(event.attachExt) + '&isCreator=0'
						});
					} else {
						uni.navigateTo({
							url: '/pages/rtc/liveroom/liveroom-team?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) +
								'&isCreator=0'
						});
					}
				}
			}, 1500)

			console.log("独立呼叫信令： 邀请事件");
			break;
		case "CANCEL_INVITE":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			    event.toAccount 接收者的账号
			    event.requestId 邀请者邀请的请求id，用于被邀请者回传request_id_作对应的回应操作
			  */
			getApp().globalData.signalingEventType = 'CANCEL_INVITE'

			if (!store.state.call.isAccept) {
				uni.showToast({
					title: "对方取消了此次邀请",
					icon: 'none'
				})
				leaveRoom();
			}

			console.log("独立呼叫信令：取消邀请事件");
			break;
		case "REJECT":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			    event.toAccount 接收者的账号
			    event.requestId 邀请者邀请的请求id，用于被邀请者回传request_id_作对应的回应操作
			  */
			// 发送群聊时，对方不接受邀请会携带attachExt字段。
			//  isIgnore如果为true，不执行退出页面等待其他人。
			if (event.attachExt) {
				let attachExt = JSON.parse(event.attachExt)
				if (attachExt.isIgnore) {
					break;
				}
			}


			uni.showToast({
				title: "对方拒绝了您的邀请",
				icon: 'none'
			})
			leaveRoom();
			console.log("独立呼叫信令：拒绝邀请事件");
			break;
		case "ACCEPT":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性1211588934057417 1211588934057417
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			    event.toAccount 接收者的账号
			    event.requestId 邀请者邀请的请求id，用于被邀请者回传request_id_作对应的回应操作
			  */
			store.commit('call/updateAccept', {
				flag: true
			})

			console.log("独立呼叫信令：接受邀请事件");
			break;
		case "LEAVE":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			  */
			console.log("独立呼叫信令：离开房间事件");
			break;
		case "CONTROL":
			/* 该事件的通知内容
			    event.eventType 事件类型
			    event.channelInfo 房间信息属性
			    event.fromAccountId 操作者
			    evnet.attachExt 操作者附加的自定义信息，透传给你
			    event.time 操作的时间戳
			  */
			if (event.attachExt) {
				let _attachExt = JSON.parse(event.attachExt)
				switch (_attachExt.type) {
					// 1 结束单人视频通话的事件
					case 1:
						console.log('signalingEventType', getApp().globalData.signalingEventType);
						// if (getApp().globalData.signalingEventType != 'CONTROL') {
							uni.showToast({
								title: "通话已结束",
								icon: 'none'
							})

							leaveRoom();
						// }
						getApp().globalData.signalingEventType = ''
						break;
						// 有人拒绝了通话
					case 2:
						console.log('收到有人拒绝了通话', _attachExt);
						store.commit('call/updataRefuseCallList', {
							roomId: _attachExt.roomId,
							userId: _attachExt.userId
						})
						break;
				}
			}
			console.log("独立呼叫信令：自定义控制事件");
			break;
	}
}

export function signalingUnreadMessageSyncNotify(data) {
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	console.log('收到未读信令消息通知', data)
	console.log('收到未读信令消息通知', data)
	// 如果最新未读存在可用会话 显示此次结果
	if (data[0] && !data[0].channelInValid) {
		signalingNotifyHandler(data[0])
	}
	let ids = data.map(item => item.msgid)
	// 标记消息已读
	store.getters['initNim/nim'].signalingMarkMsgRead({
		msgid: ids
	});
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
