<template>
	<navigator :url="`/pages/easy-chat/chat-forum`" @tap="onClick">
		<view class="im-flex im-border-bottom im-py-2 im-pl-2">
			<!-- 头像展示 -->
			<image src="/static/forum/msg-forum.png" mode="aspectFill" style="width: 90rpx;height: 90rpx;"></image>
			<!-- 会话信息 -->
			<view class="im-flex-column im-flex-1 im-px-2">
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-32 im-font-black">论坛消息</text>
					<text class="im-font-25 im-font-light">{{ lastMsg.createTime ? getTimer(lastMsg.createTime) : ''}}</text>
				</view>
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">{{ lastMsg.content || '暂无论坛消息' }}</text>
					<!-- <view v-if="systemUnreadNum > 0" class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 35rpx;height: 35rpx;">
						<text class="im-font-23 im-font-white">{{ systemUnreadNum }}</text>
					</view> -->
					<!-- <text v-if="lastMsg.sysmsgRead == 1" class="im-font-25 im-font-light">[已读]</text>
					<text v-if="lastMsg.sysmsgRead == 0" class="im-font-25" style="color: #007AFF;">[未读]</text> -->
					<view class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 15rpx;height:15rpx;" v-if="lastMsg.sysmsgRead == 0"></view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
	import useDayjs from '@/common/NIM/useDayjs.js';
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				systemUnreadNum: 0,
				lastMsg: []
			}
		},
		mounted() {
			this.updateSystemUnreadNum()
		},
		filters: {
			formatTime(n) {
				if (!n) {
					return ''
				}
				return useDayjs.formatRelative24(n)
			}
		},
		methods: {
			refreshSysMsg() {
				this.updateSystemUnreadNum();
			},
			onClick() {
				this.systemUnreadNum = 0
				uni.setStorageSync('systemUnreadNum', 0)
			},
			updateSystemUnreadNum() {
				console.log('更新系统消息的未读数');
				this.systemUnreadNum = uni.getStorageSync('systemUnreadNum') || 0;
				uni.$api.forum.getnotices({
					key:'12,13,14'
				})
					.then(res => {
						console.log(res.data.data[0], '最后一条消息');
						this.lastMsg = res.data.data[0];
					})
					.catch(err => {
						console.log(err, '请求最后一条消息报错');
						// return this.lastMsg = tempMsg;
					})
			},
			getTimer(stringTime) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var week = day * 7;
				var month = day * 30;
				let time = dayjs().diff(stringTime, 'millisecond');
				var result = null;
				if (time / month >= 1) {
					result = parseInt(time / month) + "月前";
				} else if (time / week >= 1) {
					result = parseInt(time / week) + "周前";
				} else if (time / day >= 1) {
					result = parseInt(time / day) + "天前";
				} else if (time / hour >= 1) {
					result = parseInt(time / hour) + "小时前";
				} else if (time / minute >= 1) {
					result = parseInt(time / minute) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
			},
		}
	}
</script>

<style>
</style>
