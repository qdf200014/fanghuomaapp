<template>
	<scroll-view ref="extendScroll" class="im-flex im-align-center im-w-100 im-px-3"
		style="transform: translateX(-100%);" :scroll-x="true" :show-scrollbar="false">
		<view class="" v-for="item in menuList" :key="item.id">
			<view v-if="item.isShow"
				class="im-flex im-align-center im-px-2 im-py-1 im-border im-round-3 im-mx-1 im-my-1"
				@tap="onClick(item, $event)">
				<image :src="item.icon" mode="aspectFill" style="width: 32rpx;height: 32rpx;"></image>
				<text class="im-font-28 im-font-black im-pl-1">{{ item.name }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation');
	// 动画执行时间
	const ANTIME = 250

	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			isShow(n) {
				console.log(n);
				if (n) {
					this.showNode = true
					this.ShowAn()
				} else {
					this.HideAn()
				}
			},
		},
		data() {
			return {
				menuList: [{
					id: 'biaojue',
					isShow: false,
					name: '参与表决',
					icon: '/static/easy-chat/bottom-extend/vote@2x.png'
				}, {
					id: 'conclusion',
					isShow: false,
					name: '确认结论',
					icon: '/static/easy-chat/bottom-extend/conclusion.png'
				}, {
					id: 'sign',
					isShow: true,
					name: '签到',
					icon: '/static/easy-chat/bottom-extend/sign.png'
				}],
				showNode: false,
				// 判断是否有结论列表
				isHasConclusion: false,
				isHasBiaoJue: false,
				nameText:''
			}
		},
		computed: {
			// 当前会话的id
			currentSessionId() {
				return this.$store.getters['initNim/currentSessionId']
			},
			scene() {
				return this.currentSessionId.split('-')[0]
			},
			to() {
				return this.currentSessionId.split('-')[1]
			},
			// 当前群的详细信息
			teamInfo() {
				if (this.scene === 'team' && this.teamObj[this.to]) {
					return this.teamObj[this.to]
				}
				return {}
			},
			teamObj() {
				return this.$store.getters['initNim/teamObj']
			},
			userUID() {
				return this.$store.getters['initNim/userUID']
			}
		},
		mounted() {
			this.showNode = true
			this.ShowAn()
			this.api_getConclusion()
			this.api_getBiaoJue()
			this.addUpdateLister()
			this.changeMenu();
		},
		beforeDestroy() {
			uni.$off('chatBottomExtendAPi')                 
		},
		methods: {
			// 向menulist里面添加禁言
			changeMenu(){
				if (this.scene === 'team' && this.teamInfo.owner === this.userUID) {
					if(this.teamInfo.mute==0){
						this.nameText = '开启全员禁言'
					}else if(this.teamInfo.mute==1){
						this.nameText = '取消全员禁言'
					}
					// 是群组 且 自己是群主 
						this.menuList.push({
							id: 'forbidden',
							isShow: true,
							name:  this.nameText,
							icon: '/static/easy-chat/bottom-extend/forbidden.png',
						})
					
				}
				
			},
			// 添加数据更新的监听
			addUpdateLister() {
				let _this = this
				uni.$off('chatBottomExtendAPi')
				uni.$on('chatBottomExtendAPi', () => {
					console.log('监听更新接口', );
					this.api_getConclusion()
					this.api_getBiaoJue()
				})
			},
			// 调用接口判断 是否展示确认结论
			api_getConclusion() {
				uni.$api.discussion.getvotebyconid({
					where: this.currentSessionId.split('-')[1],
					types: 2
				}).then(res => {
					if (res.data.data.length > 0) {
						this.isHasConclusion = true
						this.menuList = this.menuList.map(item => {
							let obj = Object.assign({}, item)
							if (item.id === 'conclusion') {
								obj.isShow = true
							}
							return obj
						})
					} else {
						this.isHasConclusion = false

						// console.log('!!!!!!!!!!!!', this.menuList);

					}

				})
			},
			// 调用接口判断 是否展示发起表决
			api_getBiaoJue() {
				uni.$api.discussion.getvotebyconid({
					where: this.currentSessionId.split('-')[1],
					types: 1
				}).then(res => {
					if (res.data.data.length > 0) {
						this.isHasBiaoJue = true
						this.menuList = this.menuList.map(item => {
							let obj = Object.assign({}, item)
							if (item.id === 'biaojue') {
								obj.isShow = true
							}
							return obj
						})

					} else {
						this.isHasBiaoJue = false

						// console.log('!!!!!!!!!!!!', this.menuList);

					}

				})
			},
			onClick(item, e) {
				switch (item.id) {
					case 'biaojue':
						console.log('表决消息');
						uni.navigateTo({
							url: '/pages/discussion/voteList?perfectMsg=' +
								encodeURIComponent(JSON.stringify({
									'title': '表决列表',
									'sourceType': 1,
									'itemId': this.currentSessionId.split('-')[1]
								})),
						})

						return;

						// 发送一个表决消息
						let joinBiaoJue_content = {
							type: 'joinBiaoJue',
							data: {
								// 跳转的地址
								url: '/pageBook?id=1002',
								// 标题
								title: '# 孙晓华发起的表决',
								// 详细内容
								detail: '针对四川凉山处理结果表决',
								// 封面
								cover: '/static/easy-chat/other/biaojue@2x.png'
							}
						};
						this.$store.dispatch('initNim/nimSendCustomMsg', {
							scene: this.currentSessionId.split('-')[0],
							to: this.currentSessionId.split('-')[1],
							content: JSON.stringify(joinBiaoJue_content)
						});
						break;
					case 'conclusion':
						console.log('结论消息');
						uni.$api.discussion.getvotebyconid({
							where: this.currentSessionId.split('-')[1],
							types: 2
						}).then(res => {
							console.log(res.data.data)

							if (res.data.data.length > 0) {
								uni.navigateTo({
									// url:'./participant/participant?option='+index+'&voteId='+this.voteId
									url: '/pages/vote/vote?lookDetail=0&voteId=' + res.data.data[0]
										.voteId + '&voteType=' + res.data.data[0].voteType
								})
							} else {
								console.log(res.data.data)
								uni.navigateTo({
									url: '/pages/vote/create/create?voteType=2' + '&ConsId=' + this
										.currentSessionId.split('-')[1] + '&voteId=' + res.data.data.voteId
								})
							}
						}).catch(err => {
							console.log(err)
						})
						return;

						// 发送一个结论消息
						let confirmConclusion_content = {
							type: 'confirmConclusion',
							data: {
								// 跳转的地址
								url: '/pageBook?id=1002',
								// 标题
								title: '# 孙晓华发起会商结论',
								// 详细内容
								detail: '森林火灾教育培训事宜结论',
								// 封面
								cover: '/static/easy-chat/other/jielun@2x.png'
							}
						};
						this.$store.dispatch('initNim/nimSendCustomMsg', {
							scene: this.currentSessionId.split('-')[0],
							to: this.currentSessionId.split('-')[1],
							content: JSON.stringify(confirmConclusion_content)
						});
						break;
					case 'sign':
						uni.navigateTo({
							url: `/pages/discussion/disSign?teamId=${this.currentSessionId.split('-')[1]}`
						})
						break;
					case 'forbidden':
					    let _self = this
						_self.$store.dispatch('initNim/nimMuteTeamAll', {
							teamId: _self.to,
							mute: !_self.teamInfo.mute
						}).then(res => {
							_self.menuList = _self.menuList.map(item => {
								if (item.id === 'forbidden') {
									item.name = _self.teamInfo.mute==0 ? '关闭全员禁言' : '开启全员禁言'
								}
								return item
							})
						})
						
						
						_self.$emit('clickScrollView')
						
						
						
						console.log('点击禁言');
						break;

				}
				e.stopPropagation()
			},
			// 展示动画
			ShowAn() {
				let _self = this
				_self.$nextTick(function() {
					animation.transition(
						_self.$refs.extendScroll, {
							styles: {
								transform: 'translateX(0)'
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
			},
			HideAn() {
				let _self = this
				_self.$nextTick(function() {
					animation.transition(
						_self.$refs.extendScroll, {
							styles: {
								transform: 'translateX(100%)'
							},
							duration: ANTIME, //ms
							timingFunction: 'ease',
							needLayout: false,
							delay: 0 //ms
						},
						function() {
							// console.log('动画走完了');
							_self.showNode = false
						}
					);
				})
			}
		}
	}
</script>

<style>
</style>
