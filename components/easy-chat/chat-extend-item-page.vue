<template>
	<view class="im-flex-column">
		<swiper class="im-bottom-menu-box" :circular="false" :indicator-dots="true" indicator-active-color="#ffffff">
			<swiper-item v-for="(swiper, index) in main_menuList" :key="index" class="im-flex im-flex-wrap im-align-start im-py-2">
				<view class="im-flex-column im-align-center im-ml-3 im-mb-2" v-for="(item, index2) in swiper" :key="item.id">
					<view @tap="clickMenu(item)" class="im-bg-white im-p-4 im-round-2" hover-class="im-bg-grey-3">
						<image :src="item.icon" mode="aspectFill" style="width: 70rpx;height: 70rpx;"></image>
					</view>
					<text @tap="clickMenu(item)" class="im-font-28 im-mt-1 im-font-black">{{ item.name }}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
let _self = null;
import chatCall from '@/common/function/chatCall.js'	// rtc 打电话相关

let burnReadText = '阅后即焚'

export default {
	data() {
		return {
			menuList: [
				{
					id: 1,
					name: '图片',
					icon: '/static/easy-chat/chat/tupian.png',
					identity: 'album'
				},
				{
					id: 2,
					name: '视频',
					icon: '/static/easy-chat/chat/shipin.png',
					identity: 'shooting'
				},
				{
					id: 3,
					name: '语音通话',
					icon: '/static/easy-chat/chat/yuyintonghua.png',
					identity: 'audioCall'
				},
				{
					id: 4,
					name: '视频通话',
					icon: '/static/easy-chat/chat/shipintonghua.png',
					identity: 'videoCall'
				},
				{
					id: 5,
					name: '文件',
					icon: '/static/easy-chat/chat/yuehoujifen.png',
					identity: ''
				},
				{
					id: 6,
					name: '阅后即焚',
					icon: '/static/easy-chat/chat/yuehoujifen.png',
					identity: 'burnRead'
				},
				{
					id: 10,
					name: '提醒消息', 
					icon: '/static/easy-chat/chat/yuehoujifen.png',
					identity: 'tipmsg'
				},{
					id: 6,
					name: '阅后即焚',
					icon: '/static/easy-chat/chat/yuehoujifen.png',
					identity: 'burnRead'
				},
				{
					id: 10,
					name: '提醒消息', 
					icon: '/static/easy-chat/chat/yuehoujifen.png',
					identity: 'tipmsg'
				}
			]
		};
	},
	mounted() {
		_self = this;
		// 动态添加菜单项
		this.changeMenu()
	},
	methods: {
		changeMenu() {
			if (this.scene === 'team' && this.teamInfo.owner === this.userUID && this.teamInfo.type === 'advanced') {
				// 是群组 且 自己是群主 且 群为高级群
				this.menuList.push({
					id: 8,
					name: '发起表决',
					icon: '/static/easy-chat/chat/faqibiaojue@2x.png',
					identity: 'biaojue'
				}, {
					id: 9,
					name: '确认结论',
					icon: '/static/easy-chat/chat/querenjielun.png',
					identity: 'conclusion'
				})
			}
			
			if (this.scene === 'team' && this.teamInfo.owner === this.userUID) {
				// 是群组 且 自己是群主
				this.menuList.push({
					id: 11,
					name: `${this.teamInfo.mute ? '关闭全员禁言' : '全员禁言' }`,
					icon: '/static/easy-chat/chat/jinyan@2x.png',
					identity: 'allForbidden'
				},
				{
					id: 12,
					name: '转让主持人',
					icon: '/static/easy-chat/chat/zhuanrang@2x.png',
					identity: 'transferOwner'
				})
			}
		},
		clickMenu: getApp().globalData.debounce(item => {
			console.log(item);
			let type = item.identity || '';
			switch (type) {
				case 'transferOwner':
					uni.navigateTo({
						url: '/pages/easy-chat/team-member-list?model=changeOwner'
					})
					console.log('点击转让');
					break;
				case 'allForbidden':
					_self.$store.dispatch('initNim/nimMuteTeamAll', {
						teamId: _self.to,
						mute: !_self.teamInfo.mute
					})
					_self.$emit('clickScrollView')
					console.log('点击禁言');
					break;
				case 'biaojue':
					console.log('点击表决');
					uni.navigateTo({
						url:'/pages/vote/create/create?voteType=1'+'&ConsId=' + _self.currentSessionId.split('-')[1]
					})
					break;
				case 'conclusion':
					console.log('点击结论');
					uni.$api.discussion.getvotebyconid({
						where: _self.currentSessionId.split('-')[1], 
						types: 2
					}).then(res => {
						console.log(res.data.data)
						
						if(res.data.data.length > 0){
							uni.navigateTo({
								// url:'./participant/participant?option='+index+'&voteId='+_self.voteId
								url:'/pages/vote/vote?lookDetail=0&voteId='+res.data.data[0].voteId+ '&voteType=' + res.data.data[0].voteType
							})
						}else{
							uni.navigateTo({
								url:'/pages/vote/create/create?voteType=2'+ '&ConsId=' + _self.currentSessionId.split('-')[1] + '&voteId' + res.data.data.voteId
							})
						}
					}).catch(err => {
						console.log(err)
					})
					break;
				case 'votes':
					console.log('点击投票');
					// 发送一个投票消息
					let votes_content = {
						type: 'votes',
						data: {
							// 跳转的地址
							url: '/pageBook?id=1002',
							// 标题
							title: '# 孙晓华发起投票',
							// 详细内容
							detail: '针对四川凉山处理结果的投票',
							// 封面
							cover: '/static/easy-chat/other/votes@2x.png'
						}
					};
					_self.$store.dispatch('initNim/nimSendCustomMsg', {
						scene: _self.currentSessionId.split('-')[0],
						to: _self.currentSessionId.split('-')[1],
						content: JSON.stringify(votes_content)
					});
					break;
				case 'msgCard':
					// 发送一个卡片消息
					let msgCard_content = {
						type: 'msgCard',
						data: {
							// 跳转的地址
							url: '/pageBook?id=1001',
							// 标题
							title: '四川凉山西昌发生森林大火是什么原因引起的呢？',
							// 详细内容
							detail: '一大早就看到弹出新闻一大早就看到弹 出新闻一大早就看到弹出新闻一大早就 看到弹出新闻…',
							// 封面
							appName: '防火码'
						}
					};
					
					_self.$store.dispatch('initNim/nimSendCustomMsg', {
						scene: _self.currentSessionId.split('-')[0],
						to: _self.currentSessionId.split('-')[1],
						content: JSON.stringify(msgCard_content)
					});
					break;
				case 'album':
					console.log('点击照片');
					uni.chooseImage({
						count: 9, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: res => {
							console.log('从相册选择', res);
							if (res.tempFilePaths) {
								res.tempFilePaths.map(item => {
									
									// 阅后即焚模式
									if (_self.burnReadModel) {
										_self.$store.dispatch('initNim/nimPreviewFile', {
											type: 'image',
											filePath: item
										}).then(res => {
											_self.$store.dispatch('initNim/nimSendburnReadMsg', {
												scene: _self.currentSessionId.split('-')[0],
												to: _self.currentSessionId.split('-')[1],
												// 阅后即焚的消息类型
												type: 'image',
												// 文件对象
												file: res
											})
										})
										return ;
									}
									
									_self.$store.dispatch('initNim/nimSendFile', {
										type: 'image',
										filePath: item,
										scene: _self.currentSessionId.split('-')[0],
										to: _self.currentSessionId.split('-')[1]
									});
								})
							}
						},
						fail: err => {
							console.log('选择相册失败', err);
						}
					});
					break;
				case 'shooting':
					console.log('点击视频');
					uni.chooseVideo({
						count: 1,
						maxDuration: 60,
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log('视频选择', res);
							if (res.tempFilePath) {
								
								// 阅后即焚模式
								if (_self.burnReadModel) {
									_self.$store.dispatch('initNim/nimPreviewFile', {
										type: 'video',
										filePath: res.tempFilePath
									}).then(res => {
										_self.$store.dispatch('initNim/nimSendburnReadMsg', {
											scene: _self.currentSessionId.split('-')[0],
											to: _self.currentSessionId.split('-')[1],
											// 阅后即焚的消息类型
											type: 'video',
											// 文件对象
											file: res
										})
									})
									return ;
								}
								
								_self.$store.dispatch('initNim/nimSendFile', {
									type: 'video',
									filePath: res.tempFilePath,
									scene: _self.currentSessionId.split('-')[0],
									to: _self.currentSessionId.split('-')[1]
								})
							}
						},
						fail: err => {
							console.log('选择视频失败', err);
						}
					});
					break;
				case 'audioCall':		/// 语音
					console.log('点击语音通话', _self.currentSessionId);
					if('team' == _self.currentSessionType[0]){
						_self.callPhoneTeam('audioCall');
					}else{
						_self.callPhoneP2p('audioCall');
					}
					break;
				case 'videoCall':	// 视频
					console.log('点击语音通话');
					if('team' == _self.currentSessionType[0]){
						_self.callPhoneTeam('videoCall');
					}else{
						_self.callPhoneP2p('videoCall');
					}
					break;
				case 'burnRead':
					console.log('阅后即焚');
					_self.$store.commit('initNim/changeBurnReadModel')
					break;
			}
		}, 500),
		callPhoneP2p(callType){	// 单聊
			chatCall.p2p[callType](this, this.currentSessionType[1]);
		},
		callPhoneTeam(callType){	// 群聊
			// this.$store.actions['initNim/nimGetTeamMembers'](this.currentSessionType[1]);
			uni.navigateTo({
				url: '../../pages/easy-chat/team-member-list?model='+callType
			});
		}
	},
	computed: {
		main_menuList() {
			let newArr = [];
			for (let i = 0; i < this.menuList.length; i += 8) {
				newArr.push(this.menuList.slice(i, i + 8));
			}
			
			for (let i = 0; i < this.menuList.length; i++) {
				if (this.menuList[i].identity === 'burnRead') {
					this.menuList[i].name = this.burnReadModel ? '关闭阅后即焚' : '阅后即焚'
				}
			}
			
			// console.log(newArr);
			return newArr;
		},
		teamObj() {
			return this.$store.getters['initNim/teamObj']
		},
		scene() {
			return this.currentSessionId.split('-')[0]
		},
		to() {
			return this.currentSessionId.split('-')[1]
		},
		userUID() {
			return this.$store.getters['initNim/userUID']
		},
		// 当前群的详细信息
		teamInfo() {
			if (this.scene === 'team' && this.teamObj[this.to]) {
				return this.teamObj[this.to]
			}
			return {}
		},
		// 当前会话的id
		currentSessionId() {
			return this.$store.getters['initNim/currentSessionId']
		},
		// 当前会话类型
		currentSessionType(){
			let type = this.currentSessionId.split('-');
			return type;
		},
		// 阅后即焚模式
		burnReadModel() {
			return this.$store.getters['initNim/burnReadModel']
		}
	}
};
</script>

<style scoped></style>
