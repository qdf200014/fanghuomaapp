<template>
	<view class="im-position-relative">
		<!-- 展示提醒消息 -->
		<template v-if="msg.type === 'tip'">
			<chat-item-tipmsg :msg="msg"></chat-item-tipmsg>
		</template>
		
		<!-- 展示群通知消息 -->
		<template v-else-if="msg.type === 'notification'">
			<chat-item-notification :msg="msg"></chat-item-notification>
		</template>
		
		<template v-else>
			<!-- 整体消息结构 -->
			<view ref="nimChatMsgItem" class="im-flex im-align-start im-content-start im-justify-start im-w-100 cell" :style="msgBoxStyle">
				
				<!-- 对方的头像 -->
				<nim-avatar v-if="msg.flow === 'in'" :account="msg.from"></nim-avatar>
				
				<!-- 消息盒子 -->
				<view :class="`${msg.flow === 'in' ? 'im-align-start' : 'im-align-end'}`" class="im-flex-column im-justify-start im-content-start">
					<!-- 消息体上方显示栏 -->
					<view v-if="msg.flow === 'in'" style="max-width: 500rpx;" class="im-flex im-flex-wrap im-justify-start im-content-start im-align-start im-mb-1">
						<!-- 单聊消息的已读未读状态显示 -->
						<text class="im-font-23 im-ml-3 im-font-light">{{ msg.fromNick }}</text>
						<text v-if="customUserInfo.unitName" class="im-font-23 im-font-light">- {{ customUserInfo.unitName }} </text>
						<text v-if="customUserInfo.managementRole" class="im-font-23 im-font-light">[{{ customUserInfo.managementRole }}]</text>
					</view>
					
					<!-- 消息体 -->
					<nim-chat-wrapper :flow="msg.flow" :type="msg.type" :msg="msg" v-on="$listeners">
						<!-- 普通文本消息 -->
						<chat-item-text v-if="msg.type === 'text'" :msg="msg"></chat-item-text>
						<!-- 图片消息 -->
						<chat-item-image v-else-if="msg.type === 'image'" :msg="msg"></chat-item-image>
						<!-- 视频消息 -->
						<chat-item-video v-else-if="msg.type === 'video'" :msg="msg"></chat-item-video>
						<!-- 语音消息 -->
						<chat-item-audio v-else-if="msg.type === 'audio'" :msg="msg"></chat-item-audio>
						<!-- 自定义消息 -->
						<template v-else-if="msg.type === 'custom'">
							<!-- 跳转消息类型 -->
							<chat-item-navigate v-if="customType === 'votes'" :msg="msg"></chat-item-navigate>
							<chat-item-msgcard v-else-if="customType === 'msgCard'" :msg="msg"></chat-item-msgcard>
							<chat-item-burnmsg v-else-if="customType === 'burnRead'" :msg="msg"></chat-item-burnmsg>
							<chat-item-joinBiaoJue v-else-if="customType === 'joinBiaoJue'" :msg="msg"></chat-item-joinBiaoJue>
							<chat-item-confirm-conclusion v-else-if="customType === 'confirmConclusion'" :msg="msg"></chat-item-confirm-conclusion>
							<chat-item-advice-card v-else-if="customType === 'adviceCard'" :msg="msg"></chat-item-advice-card>
							<text v-else class="im-font-28">未定义的类型</text>
						</template>
						
					</nim-chat-wrapper>
					<!-- 消息体下方显示栏 -->
					<view class="im-flex im-align-center im-mt-1">
						<!-- 单聊消息的已读未读状态显示 -->
						<text v-if="msg.flow === 'out' && msg.scene === 'p2p'" class="im-font-23 im-font-light">{{$attrs.nowSessionInfo.msgReceiptTime && $attrs.nowSessionInfo.msgReceiptTime > msg.time ? '已读' : '未读' }}</text>
						<!-- 群聊消息的已读未读状态显示 -->
						<text v-if="msg.flow === 'out' && isShowTeamMsgReceipt && teamMsgRead" class="im-font-23 im-font-light">{{ `${teamMsgRead}/${Number(teamMsgRead) + Number(teamMsgUnread)} ` }}</text>
						<!-- 消息的时间 -->
						<text :class="msg.flow === 'in' ? 'leftDate' : 'rightDate' ">{{msg.time | formatTime}}</text>
					</view>
					
				</view>
				<!-- 自己的头像 -->
				<nim-avatar v-if="msg.flow === 'out'" :account="msg.from"></nim-avatar>
			</view>
		</template>
		
	</view>
</template>

<script>
import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
import nimChatWrapper from '@/components/easy-chat/nim-chat-wrapper.vue'
import chatItemNavigate from '@/components/easy-chat/chat-item-navigate.vue'
import chatItemMsgcard from '@/components/easy-chat/chat-item-msgcard.vue'
import chatItemAdviceCard from '@/components/easy-chat/chat-item-adviceCard'
import chatItemImage from '@/components/easy-chat/chat-item-image.vue'
import chatItemVideo from '@/components/easy-chat/chat-item-video.vue'
import chatItemAudio from '@/components/easy-chat/chat-item-audio.vue'
import chatItemText from '@/components/easy-chat/chat-item-text.vue'
import chatItemTipmsg from '@/components/easy-chat/chat-item-tipMsg.vue'
import chatItemNotification from '@/components/easy-chat/chat-item-notification.vue'
import chatItemBurnmsg from '@/components/easy-chat/chat-item-burnMsg.vue'
import chatItemJoinBiaoJue from '@/components/easy-chat/chat-item-joinBiaoJue.vue'
import chatItemConfirmConclusion from '@/components/easy-chat/chat-item-confirmConclusion.vue'

import useDayjs from '@/common/NIM/useDayjs.js'

const animation = uni.requireNativePlugin('animation');
// 动画执行时间
const ANTIME = 200

export default {
	props: {
		msg: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			scaleVlaue: 0
		}
	},
	components: {
		nimAvatar,
		nimChatWrapper,
		chatItemNavigate,
		chatItemMsgcard,
		chatItemImage,
		chatItemVideo,
		chatItemAudio,
		chatItemText,
		chatItemTipmsg,
		chatItemNotification,
		chatItemBurnmsg,
		chatItemJoinBiaoJue,
		chatItemConfirmConclusion,
		chatItemAdviceCard
	},
	computed: {
		// 控制消息左右显示
		msgBoxStyle() {
			let style = ''
			if (this.msg.flow === 'out') {
				style += 'justify-content: flex-end;'
			}
			style += `transform: scale(${this.scaleVlaue});`
			return style
		},
		// 过滤自定义消息类型
		customType() {
			let type = ''
			let contentObj = JSON.parse(this.msg.content)
			if (contentObj && contentObj.type) {
				type = contentObj.type
			}
			return type
		},
		// 是否展示群聊消息未读已读
		isShowTeamMsgReceipt() {
			if (this.msg.type !== 'tip' && this.msg.type !== 'notification' && this.msg.scene === 'team' && this.msg.needMsgReceipt) {
				return true
			} else {
				return false
			}
 		},
		teamMsgReceiptObj() {
			return this.$store.getters['initNim/teamMsgReceiptObj']
		},
		teamMsgRead() {
			return this.teamMsgReceiptObj[this.msg.idClient] && this.teamMsgReceiptObj[this.msg.idClient].read || ''
		},
		teamMsgUnread() {
			return this.teamMsgReceiptObj[this.msg.idClient] && this.teamMsgReceiptObj[this.msg.idClient].unread || ''
		},
		userObj() {
			return this.$store.getters['initNim/userObj']
		},
		// 读取用户的自定义信息
		customUserInfo() {
			let user = this.userObj[this.msg.from]
			if (user && user.custom) {
				let userinfo = JSON.parse(user.custom)
				return userinfo
			}
			return {}
		}
	},
	filters: {
		formatTime(n) {
			return useDayjs.formatChatItemTime(n)
		}
	},
	mounted() {
		// 发送群组的已读回执
		if (this.msg.flow === 'in' && this.isShowTeamMsgReceipt) {
			this.sendTeamMsgReceipt()
		}
		
		// 查询群组聊天的已读未读数量
		if (this.msg.flow === 'out' && this.isShowTeamMsgReceipt) {
			this.searchTeamMsgReads()
		}
		
		this.ShowAn()
	},
	methods: {
		sendTeamMsgReceipt() {
			this.$store.dispatch('initNim/nimSendTeamMsgReceipt', {
				teamMsgReceipt: [{
					teamId: this.msg.to,
					idServer: this.msg.idServer,
					idClient: this.msg.idClient
				}]
			})
		},
		// 查询群组的消息已读未读列表
		searchTeamMsgReads() {
			this.$store.dispatch('initNim/nimGetTeamMsgReads', {
				teamMsgReceipts: [{
					teamId: this.msg.to,
					idServer: this.msg.idServer
				}]
			})
		},
		// 展示动画
		ShowAn() {
			let _self = this
			_self.$nextTick(function(){
				animation.transition(
					_self.$refs.nimChatMsgItem,
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
						_self.scaleVlaue = 1
					}
				);
			})
		},
	}
}
</script>

<style scoped>
.cell {
	margin-top: 40rpx;
	padding: 0 20rpx;
}


.leftDate,
.rightDate {
	font-size: 24rpx;
	color: #999;
}

.leftDate {
	margin-left: 40rpx;
}

.rightDate {
	margin-right: 40rpx;
}

.errMsg {
	background-color: rgba(0, 0, 0, 0.1);
	padding: 10rpx 40rpx;
	border-radius: 5px;
	color: #fff;
	font-size: 30rpx;
	margin: 40rpx 0;
}

.round {
	border-radius: 100;
}
</style>
