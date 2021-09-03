<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar title="扫码" left-icon="back" :statusBar="true"></uni-nav-bar>
		<!-- #endif -->
		<button type="default" @click="sccanCode">扫码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			sccanCode(){
				// 允许从相机和相册扫码
				console.log('scanCode_start');
				uni.scanCode({
				    success: (res)=> {
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
				    }
				});
			}
		}
	}
</script>

<style>

</style>
