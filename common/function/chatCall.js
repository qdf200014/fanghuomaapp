// 打电话

function createTime() {
	return '13' + (Date.now() + '').substr(5);
}

function api_AddChatRecord(Members, RoomId) {
	if (!Members || !RoomId) {
		uni.showToast({
			title: 'Members 或 RoomId 错误',
			icon: 'none'
		})
		return ;
	}
	uni.$api.rtc.AddChatRecord({
		'Members': Members,
		'RoomId': RoomId
	}).then(res => {
		console.log(res);
	}).catch(err => {
		console.log(err);
	})
}

let chatCall = {
	p2p: {
		// 单聊语音通话
		audioCall(self, to) {
			let time = createTime()
		
			self.$store.state.initNim.nim.signalingCreateAndJoin({
				type: 1
			}).then(res => {
				let attachExt = {
					roomId: time,
					scene: 'p2p',
					nickName: self.$store.getters['initNim/nimUserInfo'].nick,
					avatar: self.$store.getters['initNim/nimUserInfo'].avatar,
					from: res.creator,
					to: to,
					channelName: res.channelName,
					channelId: res.channelId
				}
		
				self.$store.state.initNim.nim.signalingInvite({
					channelId: res.channelId,
					account: to,
					requestId: time,
					offlineEnabled: true,
					attachExt: JSON.stringify(attachExt)
				})
				// 接口需要的参数
				let _callParam = {
					FromUid: self.$store.getters['initNim/nimUserInfo'].account,
					FromNick: self.$store.getters['initNim/nimUserInfo'].nick,
					ToUid: to,
					Type: 2,
					CallType: 1,
					roomId: time,
					sigData: ''
				};
		
				uni.$api.rtc.callpush(_callParam)
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
				uni.navigateTo({
					url: '/pages/rtc/liveroom/liveaudioroom?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) + '&isCreator=1'
				});
		
				return;
			});
		},
		// 单聊视频通话
		videoCall(self, to) {
			let time = createTime()

			self.$store.state.initNim.nim.signalingCreateAndJoin({
				type: 2,
			}).then(res => {
				console.log(res);

				let attachExt = {
					roomId: time,
					scene: 'p2p',
					nickName: self.$store.getters['initNim/nimUserInfo'].nick,
					avatar: self.$store.getters['initNim/nimUserInfo'].avatar,
					from: res.creator,
					to: to,
					channelName: res.channelName,
					channelId: res.channelId
				}

				self.$store.state.initNim.nim.signalingInvite({
					channelId: res.channelId,
					account: to,
					requestId: time,
					offlineEnabled: true,
					attachExt: JSON.stringify(attachExt)
				})
				// 接口需要的参数
				let _callParam = {
					FromUid: self.$store.getters['initNim/nimUserInfo'].account,
					FromNick: self.$store.getters['initNim/nimUserInfo'].nick,
					ToUid: to,
					Type: 2,
					CallType: 2,
					roomId: time,
					sigData: JSON.stringify(res)
				};

				uni.$api.rtc.callpush(_callParam)
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});

				uni.navigateTo({
					url: '/pages/rtc/liveroom-0416/liveroom?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) + '&isCreator=1'
				});

				return;
			});
		}
	},
	team: {
		// 群聊语音通话
		audioCall(self, selectList, teamInfo) {
			self.$store.state.initNim.nim.signalingCreateAndJoin({
				type: 1 // 必填字段 通话类型,1:音频;2:视频;3:其他
			}).then(res => {
			
				let time = createTime()
				let _teamAccounts = selectList;
			
				console.log('发送信令邀请并创建房间', res, selectList, teamInfo);
			
				let attachExt = {
					roomId: time,
					scene: 'team',
					nickName: teamInfo.name,
					avatar: teamInfo.avatar,
					from: res.creator,
					channelName: res.channelName,
					channelId: res.channelId,
					teamId: teamInfo.teamId,
					teamAccounts: _teamAccounts
				}
				_teamAccounts.map((item, index) => {
					let sendOjb = {
						channelId: res.channelId,
						account: item,
						requestId: time,
						// 传入的自定义内容，用于区分场景
						attachExt: JSON.stringify(attachExt),
						offlineEnabled: true,
						pushInfo: '群语音聊天'
					};
					self.$store.state.initNim.nim.signalingInvite(sendOjb).then(res => {
						console.log(res);
					});
				});
				api_AddChatRecord(_teamAccounts.join(), time)
				// 接口需要的参数
				let _callParam = {
					FromUid: self.$store.state.user.info.userId,
					FromNick: teamInfo.name,
					ToUid: _teamAccounts.join(),
					Type: 1,
					CallType: 1,
					roomId: time,
					sigData: ''
				};
				// uni.$api.rtc.callpush(_callParam)
				// 	.then(res => {
				// 		console.log(res);
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});
				uni.navigateTo({
					url: '/pages/rtc/liveroom/liveaudioroom-team?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) +
						'&isCreator=1',
						fail: (err) => {
							console.log(err);
						}
				});
			
			});
		},
		// 群聊视频通话
		videoCall(self, selectList, teamInfo) {

			self.$store.state.initNim.nim.signalingCreateAndJoin({
				type: 2 // 必填字段 通话类型,1:音频;2:视频;3:其他
			}).then(res => {

				let time = createTime()
				let _teamAccounts = selectList;

				console.log('发送信令邀请并创建房间', res, selectList, teamInfo);

				let attachExt = {
					roomId: time,
					scene: 'team',
					nickName: teamInfo.name,
					avatar: teamInfo.avatar,
					from: res.creator,
					channelName: res.channelName,
					channelId: res.channelId,
					teamId: teamInfo.teamId,
					teamAccounts: _teamAccounts
				}

				_teamAccounts.map((item, index) => {
					let sendOjb = {
						channelId: res.channelId,
						account: item,
						requestId: time,
						// 传入的自定义内容，用于区分场景
						attachExt: JSON.stringify(attachExt),
						offlineEnabled: true,
						pushInfo: '群视频聊天'
					};

					self.$store.state.initNim.nim.signalingInvite(sendOjb).then(res => {
						console.log(res);
					});
				});

				api_AddChatRecord(_teamAccounts.join(), time)

				// 接口需要的参数
				let _callParam = {
					FromUid: self.$store.state.user.info.userId,
					FromNick: teamInfo.name,
					ToUid: _teamAccounts.join(),
					Type: 1,
					CallType: 2,
					roomId: time,
					sigData: ''
				};
				console.log('dsadas', _callParam);
				// uni.$api.rtc.callpush(_callParam)
				// 	.then(res => {
				// 		console.log(res);
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});

				uni.navigateTo({
					url: '/pages/rtc/liveroom/liveroom-team?sigData=' + encodeURIComponent(JSON.stringify(attachExt)) +
						'&isCreator=1'
				});

			});
		}
	}
}

export default chatCall
