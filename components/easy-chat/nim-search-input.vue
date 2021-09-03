<template>
	<view class="im-flex im-align-center im-bg-white">
		<view class="im-position-relative im-flex-1">
			<input class="im-border im-round-3 my-2 py-1 px-2 im-font-30 mx-2 im-flex-1" placeholder="请输入搜索关键字" style="height: 70rpx;" type="text" v-model="value" @confirm="confirm" />
			<image v-if="value" class="im-position-absolute" src="/static/addrBook/delImg@2x.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;right: 30rpx;top: 35rpx;" @tap="() => {value = ''}"></image>
		</view>
		
		<view v-if="value" class="im-bg-blue-2 im-mr-2 im-px-2 im-py-2 im-round-1" @tap="confirm">
			<text class="im-font-28 im-font-white">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		watch: {
			value(n) {
				this.$emit('input', n)
			}
		},
		methods: {
			confirm(e) {
				console.log(e);
				this.$emit('confirm', e)
				uni.hideKeyboard()
			}
		}
	}
</script>

<style>
</style>
