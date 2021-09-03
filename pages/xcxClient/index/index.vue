<template>
	<view class="flex flex-1 w-100 flex-column boxsize">
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar title="防火码" :statusBar="true"></uni-nav-bar>
		<!-- #endif -->
		<navigator url="../test/test">
			<view class="w-100">
				<image src="/static/logo.png" style="width: 100rpx;height: 100rpx;border-radius: 50rpx;" mode="aspectFit"></image>
				<text>人丑多读书</text>
			</view>
		</navigator>
		<uni-list>
			<uni-list-item title="扫码" to="../menu/scanCode/scanCode" :clickable="true" :showArrow="true"></uni-list-item>
			<uni-list-item title="进山证查看" :clickable="true" :showArrow="true"></uni-list-item>
		</uni-list>
		
		<button type="warn" @click="toLogin">sos</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
page{
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
