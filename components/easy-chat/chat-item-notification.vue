<template>
	<view ref="chatItemNotification" style="transform: scale(0);" class="im-flex im-flex-wrap im-justify-center im-align-center im-my-3 im-px-5">
		<text class="im-text-center im-bg-white im-font-28 im-font-light im-round-1 im-p-1 im-px-2 im-flex im-flex-wrap" style="max-width: 620rpx;">{{ content }}</text>
	</view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation');
	// 动画执行时间
	const ANTIME = 200
	
	export default {
		computed: {
			content() {
				let text = '群通知消息'
				let msg = this.$attrs.msg
				let attach = msg.attach
				let type = attach.type
				switch (type) {
					case 'acceptTeamInvite':
						text = `${msg.fromNick} 加入了本群`
						break;
					case 'leaveTeam':
						text = `${msg.fromNick} 退出了本群`
						break;
					case 'removeTeamMembers':
						let remove_user = attach.users.slice(0, -1)
						let remove_userText = remove_user.map(item => item.nick).join()
						text = `${msg.fromNick} 踢出了 ${remove_userText}`
						break;
					case 'addTeamMembers':
						let add_user = attach.users.slice(0, -1)
						let add_userText = add_user.map(item => item.nick).join()
						text = `${msg.fromNick} 邀请了 ${add_userText} 加入了${attach.team.type === 'advanced' ? '会商' : '群聊'}`
						break;
					case 'updateTeam':
						text = `${msg.fromNick} 更新了本群`
						if (attach.team.name) {
							text = `${msg.fromNick} 将本群昵称改为 ${attach.team.name}`
						} else if (attach.team.hasOwnProperty('mute')) {
							text = `${msg.fromNick} ${attach.team.mute ? '开启' : '关闭'}了全员禁言模式`
						} else if (attach.team.hasOwnProperty('avatar')) {
							text = `${msg.fromNick} 更改了本群的头像`
						}
						break;
					case 'dismissTeam':
						text = `${msg.fromNick} 解散了本群`
						break;
					case 'transferTeam':
						text = `${attach.users[0].nick} 转移主持人身份给 ${attach.users[1].nick}`
						break;
				}
				return text
			}
		},
		mounted() {
			this.ShowAn()
		},
		methods: {
			// 展示动画
			ShowAn() {
				let _self = this
				_self.$nextTick(function(){
					animation.transition(
						_self.$refs.chatItemNotification,
						{
							styles: {
								transform: 'scale(1)'
							},
							duration: ANTIME, //ms
							timingFunction: 'ease',
							needLayout: false,
							delay: 0 //ms
						},
						function() {
							// console.log('动画走完了');
						}
					);
				})
			}
		}
	}
</script>

<style>
</style>
