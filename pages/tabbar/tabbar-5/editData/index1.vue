<template>
	<view>
		<uni-nav-bar left-icon="back" title="编辑资料" :statusBar="true"></uni-nav-bar>
		<uni-list :border="false" style="background-color: #FFF;">
			<cell class="List" @click="upload">
				<view class="Phone listTitle">
					<text>头像</text>
				</view>
				<view class="PhoneNum listCont">
					<image :src="userInfo.headUrl" v-if="userInfo.headUrl" style="position: absolute;top: 10rpx; right: 30rpx; width: 96rpx; height: 96rpx; border-radius: 50%;"></image>
					<view class="defaultHead" v-else>
						<text class="headName">{{headName}}</text>
					</view>
					<!-- <headImg :userinfo="userInfo" style="position: absolute;top: 10rpx; right: 30rpx; width: 96rpx; height: 96rpx;" class="border-test"></headImg> -->
					<image-cropper :src="tempFilePath" :cropFixed="true" @confirm="confirm" @cancel="cancel"></image-cropper>
				</view>
			</cell>
			<cell class="List">
				<view class="name listTitle">
					<text>姓名</text>
				</view>
				<view class="nameText listCont flex align-center justify-end">
					<text>{{this.userInfo.name}}</text>
				</view>
			</cell>
			<cell class="List">
				<view class="Phone listTitle">
					<text>手机号</text>
				</view>
				<view class="PhoneNum listCont">
					<text>{{this.userInfo.phone}}</text>
				</view>
			</cell>
			<cell class="List">
				<view class="birthday listTitle">
					<text>生日</text>
				</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="PhoneNum listCont">
						<text v-model="BirthDay">{{date ? date : birthday}}</text>
						<image src="../../../../static/easy-chat/chat/arrow-right.png" style="width: 20rpx; height: 20rpx;"></image>
					</view>
				</picker>
			</cell>
			<!-- <cell class="List">
				<view class="Phone listTitle">
					<text>地区</text>
				</view>
				<view class="PhoneNum listCont">
					<text>{{userInfo.provinceName}}{{userInfo.cityName}}{{userInfo.areaName}}{{userInfo.countyName}}{{userInfo.villageName}}</text>
				</view>
			</cell> -->
			<cell class="List" @click="toReapply">
				<view class="Phone listTitle">
					<text>申请信息</text>
				</view>
				<view class="PhoneNum listCont">
					<text v-if="examineBuffer == 0">审核中</text>
					<text v-if="examineBuffer == 1" class="statusColor">已通过</text>
					<text v-if="examineBuffer == 2" class="statusRefuse">已拒绝</text>
					<text v-if="examineBuffer == 3" class="statusRefuse">待完善</text>
				</view>
			</cell>
		</uni-list>
		<wt-avatar :src="tempFilePath" v-if="tempFilePath" @confirm="confirm" @cancel="cancel"></wt-avatar>
	</view>
</template>

<script>
	import wtAvatar from '../../../../components/wt-avatar/wt-avatar.vue';
	import headImg from '@/components/universalHead.nvue';
	import { mapGetters, mapActions } from 'vuex';
	export default {
		components:{
			headImg
		},
		data() {
			return {
				// userInfo:{},
				
				headName: '',
				birthday:'',
				status:'',
				tempFilePath: '',
				cloudPath: '',
				date: '',
				BirthDay: '',
				userInfoMsg: {}
			}
		},
		components: {
			wtAvatar
		},
		computed:{
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapGetters({
				userInfo:'user/info',
			}),
			examineBuffer(){
				this.birthday = this.userInfo.birthDay.split(' ')[0]
				this.headName = this.userInfo.name.charAt(this.userInfo.name.length-2) + this.userInfo.name.charAt(this.userInfo.name.length-1);
				console.log('this.userInfo_', this.userInfo);
				let _examine = 0;
				switch (this.userInfo.status){
					case 0:
						break;
					case 1:
					_examine = this.userInfo.isPerfect ? this.userInfo.isPerfect : 3;
						break;
					case 2:
					_examine = this.userInfo.status;
						break;
					default:
						break;
				}
				
				return _examine;	// [0审核中 | 1通过 | 2拒绝 | 3待完善]
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			...mapActions({
				getUserInfo:'user/getUserInfo'
			}),
			toReapply(){
				if(this.examineBuffer > 1){
					uni.navigateTo({
						url: '/pages/register/index?perfectMsg='+encodeURIComponent(JSON.stringify({
							'title': this.userInfo.status == 2? '申请信息' : '待完善信息',
							'sourceType':this.userInfo.status
						})),
					success: res => {},
					fail: () => {},
					complete: () => {}
					})
				}
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				uni.$api.user.modifyuserinfo({
					key: 'BirthDay',
					value: this.date
				}).then(res => {
					if(res.data.statusCode = 200){
						let userInfo = uni.getStorageSync('userInfo')
						userInfo.birthDay = this.date
						uni.setStorageSync('userInfo',userInfo);
					}
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// dialog确认按钮,单按钮回调
			wtDialogNameConfirm(done, val){
				console.log(this.userInfo)
				uni.$api.user.modifyuserinfo({
					key: 'Name',
					value: this.userInfo['name']
				}).then(res => {
					console.log(res)
					this.userInfoMsg = uni.getStorageSync('userInfo')
					this.userInfoMsg.name = this.userInfo['name']
					uni.setStorageSync('userInfo',this.userInfoMsg)
					
				}).catch(err => {
					console.log(err)
				})
				console.log('wtDialogNameConfirm');
				done()
			},
			// 修改用户名部分 
			clickCancel() {
				this.show = false;
			},
			submitFrom(){
				
			},
			clickConfirm(event) {},
			// 跳到修改密码
			goChangePwd() {},
			openSetName() {},
			confirm(e) {
				this.tempFilePath = '';
				new Promise((resolve, reject) => {
					uni.showLoading({
						title: '文件上传中...'
					})
						plus.zip.compressImage({	//压缩上传
							src: e.detail.tempFilePath,
							dst:"_doc/"+Date.now()+".jpg",
							width:"100px",
							height:'100px'
							},res=>{
								resolve({
									filePath: res.target,
									cloudPath: this.cloudPath
								});
							},err=>{
								reject({
									message:'图片压缩失败！'
								})
							});
					})
					.then((options) => {
						// uni.showLoading({
						// 	title: '文件上传中...'
						// })
						return uni.$api.user.uploadHeader(options.filePath,'file');
						
					}).then(res => {
						console.log('uploadHeader_RES', res);
						uni.hideLoading();
						if(200 == res.data.statusCode){
							uni.showToast({
								title: '头像更换成功',
								icon: 'none'
							});
							this.getUserInfo();
							// this.userInfo.headUrl = res.data.data;
							// let userInfo = uni.getStorageSync('userInfo')
							// userInfo.headUrl = res.data.data
							// uni.setStorageSync('userInfo',userInfo);
						} else {
							uni.showToast({
								title: res.data.message || '头像更换失败',
								icon: 'none'
							});
						};
						
					}).catch((err) => {
						// uni.hideLoading()
						console.log(err);
						if(err.errMsg == 'uploadFile:fail undefined'){
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							});
						}else {
							uni.showToast({
								title: `图片上传失败，错误信息为：${err.message || err.errMsg}`,
								icon: 'none'
							});
						}
						// uni.showModal({
						// 	content: ,
						// 	showCancel: false
						// })
					})
			},
			cancel() {
				this.tempFilePath = "";
			},
			upload() {
				// 从本地选择图片或拍照
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: res => {
							const path = res.tempFilePaths[0]
							let ext
							// #ifdef H5
							ext = res.tempFiles[0].name.split('.').pop()
							const options = {
								filePath: path,
								cloudPath: Date.now() + '.' + ext
							}
							resolve(options)
							// #endif
							// #ifndef H5
							uni.getImageInfo({
								src: path,
								success(info) {
									const options = {
										filePath: path,
										cloudPath: Date.now() + '.' + info.type.toLowerCase()
									}
									resolve(options);
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
							// #endif
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then(option => {
					this.tempFilePath = option.filePath;
					this.cloudPath = option.cloudPath;
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})


			}
		}
	}
</script>

<style>
	.meslist_canvas {
		position: fixed;
		top: 0;
		width: 200px;
		height: 200px;
		visibility: hidden;
	}
	.avatar{
		position: relative;
		width: 750rpx;
		border-bottom-width: 1rpx; 
		border-bottom-style: solid; 
		border-bottom-color: #EEEFF3; 
		height: 112rpx;
	}
	.nameText{
		width: 350rpx;
		height: 112rpx;
	}
	.defaultHead{
		position: absolute;
		top: 5rpx; 
		right: 30rpx;
		width: 96rpx;
		height: 96rpx;
		text-align: center;
		background-color: #F75252;
		border-radius: 50%;
		border-width: 4rpx;
		border-style: solid;
		border-color: rgba(255, 196, 196, 0.67);
	}
	.headName{
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 96rpx;
	}
	.List{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 112rpx;
		border-bottom-width: 1rpx; 
		border-bottom-style: solid; 
		border-bottom-color: #EEEFF3;
	}
	.listTitle{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #323234;
		padding-left: 30rpx;
	}
	.listCont{
		font-size: 26rpx;
		font-family: HelveticaNeue;
		color: #949599;
		padding-right: 30rpx;
	}
	.statusColor{
		color: #00BCAB;
	}
	.statusRefuse{
		color: #F75252;	
	}
</style>
