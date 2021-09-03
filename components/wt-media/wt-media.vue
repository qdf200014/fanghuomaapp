<template>
	<view class="flex flex-1 flex-column position-relative" v-if="media">
		<image v-if="mediaType == 'image'" :src="media" @click="clickImage" class="flex-1" @error="errorImg" :mode="imageMode"></image>
		<!-- 缺省图,目前仅作为图片资源的lazy -->
		<image v-if="mediaType == ''" src="/static/nohistory.png" class="position-absolute top-0 left-0 right-0 bottom-0 border" mode="aspectFit"></image>
		
		<!--  音/视频 -->
		<video v-if="mediaType == 'video'" :src="media" :controls="videoControls" :autoplay="videoAutoPlay" :loop="videoLoop" :muted="videoMuted" :objectFit="videoObjectFit" :poster="videoPoster" class="flex-1"></video>
		
	</view>
</template>

<script>
	export default {
		name:'wt-media',
		data() {
			return {
				reg_v:/.+\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp3|mp4)$/ig,
				reg_i:/.+\.(jpg|jpeg|png)$/ig,
				isError:false
			};
		},
		props:{
			// 媒体文件路径
			media:{
				type:String,
				default:()=>''
			},
			/**
			 * 图片类-图片展示模式
			 */
			imageMode:{
				type:String,
				default:()=>'aspectFill'
			},
			/**
			 * video类-video控件展示
			 * 			自动播放
			 * 			循环播放
			 * 			静音播放
			 * 			视频展示模式
			 * 			封面图
			 */
			videoControls:{
				type:Boolean,
				default:()=>true
			},
			videoAutoPlay:{
				type:Boolean,
				default:()=>false
			},
			videoLoop:{
				type:Boolean,
				default:()=>false
			},
			videoMuted:{
				type:Boolean,
				default:()=>false
			},
			videoObjectFit:{
				type:String,
				default:()=>'contain'
			},
			videoPoster:{
				type:String,
				default:()=>''
			}
		},
		computed:{
			/**
			 * 判断多媒体类型从而采取不同渲染方式
			 */
			mediaType(){
				let isVideo = this.reg_v.test(this.media),
					isImage = this.reg_i.test(this.media),
					_mediaType = '';
				isVideo ? (_mediaType = 'video') : '';
				isImage ? (_mediaType = 'image') : '';
				this.isError ? (_mediaType = '') : '';
				// console.log('mediaTYpe_', _mediaType);
				return _mediaType;
			}
		},
		methods:{
			/**
			 * 点击图片事件，目前采用默认预览方式
			 */
			clickImage(){
				uni.previewImage({
					urls: [this.media],
					indicator:'none'
				});
			},
			errorImg(){
				// console.log('error_', this.media);
				this.isError = true;
			},
		}
	}
</script>

<style>

</style>
