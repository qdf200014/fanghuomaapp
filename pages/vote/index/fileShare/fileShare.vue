<template>
	<view>
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="分享文件" :statusBar="true"></uni-nav-bar>
		<image src="/static/logo.png" style="width: 300rpx;height: 300rpx;"></image>
		<button type="default" @click="fileShare">分享文件</button>

		<button type="default" @click="signature">signature</button>

		<button type="default" @click="lookPDF">lookPDF</button>
	</view>
</template>

<script>
	const FileShare = uni.requireNativePlugin('life-FileShare');
	export default {
		data() {
			return {

			}
		},
		methods: {
			/**
			 * 签名
			 */
			signature() {
				uni.navigateTo({
					url: '../autograph/autograph'
				})
			},
			/**
			 * lookPDF,pdf查看器
			 */
			lookPDF() {
				uni.navigateTo({
					// url:'../pdf/pdf'
					url: '../lookPdf/lookPdf'
				})
			},
			/**
			 * 分享文件
			 */
			fileShare() {
				uni.$shareFile({
					url:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-33953337-2bdb-4106-84da-f365ec4a1b5f/ba3fe520-060c-4317-8793-382d112597f9.pdf',
					filename:'myfile.pdf',	// ios 命名不生效
					// type:'WX'//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
				})
				.then(res=>{
					console.log('shareFile_', res);
				})
				.catch(err=>{
					uni.showModal({
						title: 'shareFile_ERR',
						content: JSON.stringify(err)
					});
					console.log('shareFile_', err);
				});
			}
		}
	}
</script>

<style>

</style>
