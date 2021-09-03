<template>
	<view class="im-flex im-align-center" @tap="onClick">
		<image src="/static/easy-chat/chat/burn-read-icon.png" mode="aspectFill" style="width: 50rpx;height: 40rpx;"></image>
		<text class="im-font-28 im-font-black-2 im-ml-1">阅后即焚: {{ typeInfo }}</text>
	</view>
</template>

<script>
	export default {
		computed: {
			type() {
				return this.msgData.type
			},
			msgData() {
				return this.content.data
			},
			content() {
				return JSON.parse(this.$attrs.msg.content)
			},
			typeInfo() {
				let text = '消息'
				switch(this.type) {
					case 'text':
						text = '文本消息'
						break;
					case 'image':
						text = '图片消息'
						break;
					case 'video':
						text = '视频消息'
						break;
					case 'audio':
						text = '语音消息'
						break;
				}
				return text
			}
		},
		methods: {	
			onClick(e) {
				uni.navigateTo({
					url: '/pages/easy-chat/burn-read-page?msg=' + encodeURIComponent(JSON.stringify(this.$attrs.msg)),
					animationType: 'slide-in-bottom'
				})
				e.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
