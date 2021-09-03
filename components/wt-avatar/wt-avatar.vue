<template>
	<view class="content">
		<view class="cropper-wrapper" style="height:2000px">
			<canvas
				class="cropper"
				disable-scroll="true"
				@touchstart="touchStart"
				@touchmove="touchMove"
				@touchend="touchEnd"
				:style="{ width: cropperOpt.width, height: cropperOpt.height }"
				canvas-id="cropper"
			></canvas>
		</view>
		<view class="cropper-buttons">
			<view class="upload" @tap="uploadTap">取消</view>
			<view class="getCropperImage" @tap="getCropperImage">确定</view>
		</view>
	</view>
</template>

<script>
import weCropper from './weCropper.js';
const device = uni.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
export default {
	data() {
		return {
			cropperOpt: {
				id: 'cropper',
				width: width,
				height: height,
				scale: 2.5,
				zoom: 8,
				cut: {
					x: (width - uni.upx2px(700)) / 2,
					y: (height - uni.upx2px(700)) / 2,
					width: uni.upx2px(700),
					height: uni.upx2px(700)
				}
			},
			weCropper: null,
		};
	},
	props:{
		src:{
			type:String,
			default:()=>''
		}
	},
	mounted() {
		this.initCropper(this.src);
	},
	methods: {
		initCropper(src){
			setTimeout(()=>{
				if(src){
					Object.assign(this.cropperOpt, {
						src:src,
						context:uni.createCanvasContext('cropper')
					});
					this.weCropper = new weCropper(this.cropperOpt)
						.on('ready', (ctx)=> {})
						.on('beforeImageLoad', ctx => {
							uni.showToast({
								title: '上传中',
								icon: 'loading',
								duration: 3000
							});
						})
						.on('imageLoad', ctx => {
							uni.hideToast();
							this.weCropper.touchEnd();
						});
				}
			},200)
		},
		touchStart(e) {
			this.weCropper.touchStart(e);
		},
		touchMove(e) {
			this.weCropper.touchMove(e);
		},
		touchEnd(e) {
			this.weCropper.touchEnd(e);
		},
		convertBase64UrlToBlob(dataURI, type) {
			var binary = atob(dataURI.split(',')[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], { type: type }, { filename: '1111.jpg' });
		},
		blobToDataURL(blob) {
			var a = new FileReader();
			a.readAsDataURL(blob); //读取文件保存在result中
			a.onload = function(e) {
				var getRes = e.target.result; //读取的结果在result中
				console.log(getRes);
			};
		},
		getCropperImage() {
			let _this = this;
			this.weCropper.getCropperImage(avatar => {
				if (avatar) {
					this.$emit('confirm', {detail:{tempFilePath:avatar}})
				} else {
					console.log('获取图片失败，请稍后重试');
				}
			});
		},
		uploadTap() {
			this.$emit('cancel');
			// uni.chooseImage({
			// 	count: 1, // 默认9
			// 	sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			// 	sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			// 	success:(res)=> {
			// 		let src = res.tempFilePaths[0];
			// 		if(this.weCropper){
			// 			//  获取裁剪图片资源后，给data添加src属性及其值
			// 			this.weCropper.pushOrign(src);
			// 		} else {
			// 			this.initCropper(src);
			// 		}
			// 	}
			// });
		}
	},
};
</script>

<style>
.content {
	background: rgba(255, 255, 255, 0.8);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin:  auto;
}

.head-list {
	height: 43px;
	width: 100%;
	background: #ffffff;
	justify-content: center;
	align-items: center;
	display: flex;
	border-bottom: 1px solid rgba(244, 244, 244, 1);
}



.save-box {
	position: absolute;
	right: 0px;
	width: 50px;
	height: 43px;
	line-height: 43px;
}

.save {
	color: rgba(98, 111, 252, 1);
	font-size: 16px;
	font-weight: 400;
}

.icon-back {
	margin-top: 11px;
	width: 10px;
	height: 18px;
	color: #000000;
	margin-left: 6px;
}

.icon-back-box {
	display: block;
	position: absolute;
	left: 6px;
	height: 43px;
	width: 30px;
	align-items: center;
}
.cropper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.cropper-buttons {
	background-color: rgba(255, 255, 255, 1);
}
.cropper-wrapper {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #F0F0F0;
	flex: 1;
}

.cropper-buttons {
	width: 100vw;
	height: 52px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	line-height: 52px;
}

.cropper-buttons .upload,
.cropper-buttons .getCropperImage {
	width: 50%;
	text-align: center;
}
.upload{
	color: #333333;
}
.getCropperImage{
	color: #F75252;
}
</style>
