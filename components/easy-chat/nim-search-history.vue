<template>
	<view class="im-flex im-justify-between im-align-center im-bg-white im-py-3 im-mt-3 im-px-3" @tap="searchText">
		<text class="im-font-32 im-font-black">查找{{ $attrs.textTeamTip }}内容</text>
		<image src="../../static/fireIndex/morehui.png" style="width: 22rpx; height: 22rpx;"></image>
		<!-- 每一项 -->
		<!-- <view class="im-flex im-align-center im-justify-around im-my-3">
			<view class="im-flex-column im-align-center im-mx-4" @tap="searchText">
				<image src="/static/easy-chat/details/search@2x.png" mode="aspectFill" style="width: 56rpx;height: 56rpx;"></image>
				<text class="im-font-28 im-font-light im-mt-2">搜索</text>
			</view>
			<view class="im-flex-column im-align-center im-mx-4">
				<image src="/static/easy-chat/details/image@2x.png" mode="aspectFill" style="width: 56rpx;height: 56rpx;"></image>
				<text class="im-font-28 im-font-light im-mt-2">图片</text>
			</view>
			<view class="im-flex-column im-align-center im-mx-4">
				<image src="/static/easy-chat/details/file@2x.png" mode="aspectFill" style="width: 56rpx;height: 56rpx;"></image>
				<text class="im-font-28 im-font-light im-mt-2">文件</text>
			</view>
			<view class="im-flex-column im-align-center im-mx-4">
				<image src="/static/easy-chat/details/link@2x.png" mode="aspectFill" style="width: 56rpx;height: 56rpx;"></image>
				<text class="im-font-28 im-font-light im-mt-2">链接</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		methods: {
			searchText() {
				uni.navigateTo({
					url: '/pages/easy-chat/chat-search-history'
				})
			}
		}
	}
</script>

<style>
</style>
