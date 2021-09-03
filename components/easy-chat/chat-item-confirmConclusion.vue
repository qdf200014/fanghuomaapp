<template>
	<view class="im-flex-column im-bg-white im-round-2" style="width: 500rpx;" @tap="onClick">
		<view class="im-flex im-align-center im-justify-between im-flex-1">
			<view class="im-flex im-position-relative im-justify-center im-align-center" >
				<image :src="cover" class="im-round-1" mode="aspectFill" style="width: 190rpx;height: 134rpx;"></image>
				<view class="im-position-absolute im-top-0 im-bottom-0 im-left-0 im-right-0 im-flex-1 im-align-center im-justify-center">
					<text class="im-font-32 im-font-white ">确认结论</text>
				</view>
			</view>
			
			<view class="im-flex-column im-justify-between im-ml-2">
				<text class="im-font-28 im-font-blue" style="max-width: 300rpx;">{{ title }}</text>
				<text class="im-font-32" style="max-width: 300rpx;">{{ detail }}</text>
			</view>
		</view>
		<view class="im-flex im-align-center im-justify-end im-pt-1">
			<text class="im-font-28 im-font-light">立即查看</text>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			// 读取传入的自定义消息的内容
			msgContent() {
				return JSON.parse(this.$attrs.msg.content)
			},
			// 跳转的链接
			url() {
				if (this.msgContent.data) {
					return this.msgContent.data.url
				}
				return ''
			},
			// 标题
			title() {
				if (this.msgContent.data) {
					return this.msgContent.data.title
				}
				return '未知链接'
			},
			// 详情
			detail() {
				if (this.msgContent.data) {
					return this.msgContent.data.detail
				}
				return '未知详情'
			},
			// 封面
			cover() {
				if (this.msgContent.data) {
					return this.msgContent.data.cover
				}
				return ''
			}
		},
		mounted () {
			// 告知底部浮动栏数据更新
			uni.$emit('chatBottomExtendAPi')
		},
		methods: {
			onClick(event) {
				// uni.showToast({
				// 	title: `当前传递的链接${this.url}`,
				// 	icon: 'none'
				// })
				uni.navigateTo({
					url: this.url
				})
				event.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
