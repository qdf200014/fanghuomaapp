<template>
	<view class="w-100 flex flex-1 flex-column">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="lookPDF" :statusBar="true"></uni-nav-bar> -->
		<web-view class="w-100 flex-1" style="height: calc(100% - 200rpx);margin-top: 200rpx;" :src="pdfUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl:'',
				from:''
			}
		},
		onLoad() {
			/**
			 * 浏览情景
			 */
			
			// 浏览情景1:浏览本地的pdf文件
			// this.pdfUrl = '/hybrid/html/web/viewer.html?file=./compressed.tracemonkey-pldi-09.pdf'
			
			// 浏览情景2:浏览在线的pdf文件
			let pdfUrl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-33953337-2bdb-4106-84da-f365ec4a1b5f/ba3fe520-060c-4317-8793-382d112597f9.pdf';
			this.pdfUrl = '/hybrid/html/web/viewer.html?file='+encodeURIComponent(pdfUrl)
		},
		methods: {
			/**
			 * 下载情景
			 */
			// downloadPdfClick(){
			// 	// 下载情景1:h5内嵌app,通过分享给朋友的方式进行下载
			// 	if(this.from == 'app'){
			// 		let item = 'http://自己的域名/hybrid/html/web/pdf.html?shareUrl='+encodeURIComponent(this.bgUrl)
			// 					+'&shareTitle=PDF文件';
			// 		window.open(item);
			// 		return;
					
			// 	}else if(this.from == 'wx wq'){
			// 	// 下载情景2:h5内嵌微信小程序,从h5页面跳转到小程序页面后,然后通过调用小程序原生API进行下载
			// 	// 注意: 先要引入微信jssdk  [命令: npm install jweixin-module]
			// 		// this.$wx.miniProgram.navigateTo({
			// 		// 	url: '/pages/pdf/pdf_download?pdf='+ encodeURIComponent(this.bgUrl) //小程序页面链接
			// 		// });
			// 	}
				
			// }
		}
	}
</script>

<style>

</style>
