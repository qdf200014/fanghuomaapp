<template>
	<view class="wrapper">
		<uni-nav-bar left-icon="back" right-text="完成" title="第三步" @clickRight="submitSignature" :statusBar="true"></uni-nav-bar>

		<!-- 步骤条 -->
		<view class="w-100 flex flex-row justify-center align-center bg-white" style="height: 127rpx;">
			<view class="flex flex-column justify-center align-center">
				<view class="flex justify-center align-center rounded-2"
					style="width: 26rpx;height: 26rpx;background: rgba(240, 122, 78, 0.6);">
					<view class="rounded-2" style="width: 14rpx;height: 14rpx;background: #F07A4E;"></view>
				</view>
				<text class="font-3 pt-1" style="color: #F07A4E;">创建文号</text>
			</view>
			<view class="flex flex-column justify-center align-center">
				<view class="flex justify-center align-center" style="height: 26rpx;">
					<view class="theme-main-bg" style="width: 145rpx;height: 2rpx;"></view>
				</view>
				<text class=" font-3 pt-1" style="color: #FFF">-</text>
			</view>
			<view class="flex flex-column justify-center align-center">
				<view class="flex justify-center align-center rounded-2"
					style="width: 26rpx;height: 26rpx;background: rgba(240, 122, 78, 0.6);">
					<view class="rounded-2" style="width: 14rpx;height: 14rpx;background: #F07A4E;"></view>
				</view>
				<text class="font-3 pt-1" style="color: #F07A4E;">编辑内容</text>
			</view>
			<view class="flex flex-column justify-center align-center">
				<view class="flex justify-center align-center" style="height: 26rpx;">
					<view class="theme-main-bg" style="width: 145rpx;height: 2rpx;"></view>
				</view>
				<text class=" font-3 pt-1" style="color: #FFF">-</text>
			</view>
			<view class="flex flex-column justify-center align-center">
				<view class="flex justify-center align-center rounded-2"
					style="width: 26rpx;height: 26rpx;background: rgba(240, 122, 78, 0.6);">
					<view class="rounded-2" style="width: 14rpx;height: 14rpx;background: #F07A4E;"></view>
				</view>
				<text class="font-3 pt-1" style="color: #F07A4E;">完成签字</text>
			</view>
		</view>

		<!-- 占位 -->
		<view class="w-100" style="height: 20px;background: #F4F5FB;"></view>

		<!-- 组长签字 -->
		<view class="supervisor bg-white w-100 py-2 px-3 boxsize flex flex-column">
			<text class="pb-3 font-2">督查工作组组长签字：</text>
			<view class="position-relative flex justify-center align-center" @click="$refs.signatureBoard.open(),sign_index = 'supervisor_sign';">
				<image :src="supervisor_sign" style="width: 690rpx;height: 420rpx;background: #F4F5FB;"></image>
				<text v-if="!supervisor_sign" class="font-4 position-absolute">点击进行签名</text>
			</view>
		</view>

		<!-- 责任人签字 -->
		<view class="liable bg-white w-100 py-2 px-3 boxsize flex flex-column">
			<text class="pb-3 font-2">被督查单位责任人签字（选填）：</text>
			<view class="position-relative flex justify-center align-center" @click="$refs.signatureBoard.open(),sign_index = 'liable_sign';">
				<image :src="liable_sign" style="width: 690rpx;height: 420rpx;background: #F4F5FB;"></image>
				<text v-if="!liable_sign" class="font-4 position-absolute">点击进行签名</text>
			</view>
		</view>

		<!-- 签字板 -->
		<uni-popup ref="signatureBoard" type="top" @change="changePop">
			<view class="flex flex-row flex-nowrap justify-center align-center position-relative w-100" :style="padding_height">
				<view style="width: 74rpx;height: 1146rpx;"></view>
				<view class="handCenter">
					<canvas class="handWriting" disable-scroll="true" @touchstart="uploadScaleStart"
						@touchmove="uploadScaleMove" @touchend="uploadScaleEnd" @tap="mouseDown"
						canvas-id="handWriting">
					</canvas>
				</view>
				<view class="handBtn flex flex-row border-test boxsize bg-white">
					<view @click="retDraw" class=" bg-white flex-1 justify-center align-center text-center" hover-class="hover-8"><text style="line-height: 72rpx;" class="theme-main-color">重写</text></view>
					<view @click="subCanvas" class=" theme-main-bg flex-1 justify-center align-center text-center" hover-class="hover-8"><text style="line-height: 72rpx;" class="text-white">保存</text></view>
				</view>
				<image @click="$refs.signatureBoard.close();" style="width: 35rpx;height: 35rpx;right: 24rpx;bottom: 24rpx;" class="position-absolute" src="/static/img/signature/close.png"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Handwriting from '@/components/signature/signature';
	export default {
		data() {
			return {
				lineColor: 'black',
				slideValue: 50,
				handwriting: '',
				selectColor: 'black',
				color: '',
				sign_index:'',
				supervisor_sign:'',
				liable_sign:'',
				sign_end:false,
				share_popup: false,
				padding_height:'',
				danger_id:0
			}
		},
		onReady() {
			this.handwriting = new Handwriting({
				lineColor: this.lineColor,
				slideValue: this.slideValue, // 0, 25, 50, 75, 100
				canvasName: 'handWriting',
			})
		},
		onLoad(event) {
			plus.navigator.closeSplashscreen();
			if(event && event.id){
				this.danger_id = event.id;
			} else {
				console.error('签名页面参数缺少id');
			}
			
			let padding_height = (plus.screen.resolutionHeight - uni.upx2px(1146)) / 2 ; 
			this.padding_height = 'margin-top:' + padding_height + 'px;';
		},
		methods: {
			/**
			 * 上传签名
			 */
			async submitSignature(){
				
				// 字段校验
				if(this.supervisor_sign == '')return uni.showToast({
					title: '请完成签字！',
					icon: 'none'
				});
				
				// 基本list构造
				let list = [{
					uri:this.supervisor_sign,
					name:'GroupLeaderSign'
				}];
				// 被监督人签字
				if(this.liable_sign) list.push({
					uri:this.liable_sign,
					name:'PersonLiableSign'
				})
				
				// 请求队列构造
				let imglist = list.map(item=>{
					return {
						...item,
						sign:'',
						upload : function(){
							let _item = this;
							return uni.$api.user.uploadfile(_item.uri)
							.then(res=>{
								if(res.data.message) return uni.showToast({
									title: res.data.message,
									icon: 'none'
								});
								_item.sign = res.data.data;
								console.log(item.name , ':upload_success');
							})
							.catch(err=>{
								console.log(item.name , ':upload_err', err);
							});
						}
					}
				}) 
				
				// 队列上传文件
				uni.showLoading();
				for (let item of imglist) {
					await item.upload();
				}
				
				// 上传签名
				let option = {
					Fhd_id:this.danger_id
				};
				imglist.forEach(item=>{
					option[item.name] = item.sign;
				})
				uni.$api.danger.updhiddendanger(option)
				.then(res=>{
					console.log('updhiddendanger_RES', res);
					
					// 签名流程完成，这里跳转页面
					uni.navigateTo({
						url:'../dangerDetail?back=3&id='+ this.danger_id
					})
				})
				.catch(err=>{
					console.log('updhiddendanger_ERR', err);
				})
				.finally(()=>{
					uni.hideLoading();
				});
				
			},
			// 选择画笔颜色
			selectColorEvent(event) {
				this.selectColor = event;
				if (event == 'black') {
					this.color = '#1A1A1A'
				} else if (event == 'red') {
					this.color = '#ca262a'
				}
				this.handwriting.selectColorEvent(this.color)
			},
			retDraw() {
				this.sign_end = false;
				this.handwriting.retDraw()
			},
			// 笔迹粗细滑块
			updateValue(e) {
				this.slideValue = e.detail.value;
				this.handwriting.selectSlideValue(this.slideValue);
			},
			uploadScaleStart(event) {
				this.handwriting.uploadScaleStart(event)
			},
			uploadScaleMove(event) {
				this.handwriting.uploadScaleMove(event);
				this.sign_end = true;
			},
			uploadScaleEnd(event) {
				this.handwriting.uploadScaleEnd(event);
			},
			mouseDown(event) {
				// console.log('rr', event);
			},
			changePop(){
				this.sign_end = false;
			},
			subCanvas() {
				
				if(!this.sign_end)return uni.showToast({
					title: '请完成签字！',
					icon: 'none'
				});
				// 签名保存,清除笔迹
				this.sign_end = false;
				this.handwriting.saveCanvas().then(res => {
					return this.handwriting.rotateImg(res)
				})
				.then(res=>{
					this[this.sign_index] = res.target;
					this.$refs.signatureBoard.close();
				})
				.catch(err => {
					console.log(err);
				});

			},
		}
	}
</script>

<style scoped="true">
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		align-content: center;
		flex-direction: column;
		justify-content: center;
		font-size: 28upx;
	}

	.border-test {
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		border-style: solid;
		border-color: #FF5A5F;
		/* #endif */
		/* #ifdef APP-VUE */
		border: 1px solid #FF5A5F;
		box-sizing: border-box;
		/* #endif */
	}

	.handWriting {
		background: #fff;
		width: 100%;
		height: 100%;
	}

	.handRight {
		align-items: center;
	}

	.handCenter {
		/* border: 4upx dashed #e9e9e9; */
		/* flex: 5; */
		overflow: hidden;
		box-sizing: border-box;
		/* width: 90%; */
		width: 700rpx;
		height: 1146rpx;
		margin: 0 auto;

		/* transform: rotate(90deg); */
	}

	.handTitle {
		flex: 1;
		color: #666;
		justify-content: center;
		font-size: 30upx;
	}

	.handBtn {
		position: absolute;
		transform: rotate(90deg) translateY(-74rpx);
		top: 0;
		left: 0;
		transform-origin: 0 0;
		width: 1146rpx;
		height: 74rpx;
		border: 1rpx solid #F75252;
		box-sizing: border-box;
	}

	.color {
		align-items: center;
	}

	.color>text {
		margin-right: 20upx;
	}

	.black-select {
		width: 60upx;
		height: 60upx;
	}

	.black-select.color_select {
		width: 90upx;
		height: 90upx;
	}

	.red-select {
		width: 60upx;
		height: 60upx;
	}

	.red-select.color_select {
		width: 90upx;
		height: 90upx;
	}


	.slider {
		width: 400upx;
		padding-left: 20upx;
	}

	.drop {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		background: #FFF;
		position: absolute;
		left: 0upx;
		top: -10upx;
		box-shadow: 0px 1px 5px #888888;
	}

	.slide {
		width: 250upx;
		height: 30upx;
	}

	.showimg {
		border: 4upx solid #e9e9e9;
		overflow: hidden;
		width: 90%;
		margin: 0 auto;
		background: #eee;
		height: 350upx;
		margin-top: 40upx;
		align-items: center;
		justify-content: center;
	}

	.showimg>image {
		width: 100%;
		height: 100%;
	}

	.showimg>text {
		font-size: 40upx;
		color: #888;
	}
</style>
