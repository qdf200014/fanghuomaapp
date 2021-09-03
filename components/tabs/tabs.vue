<template>
	<view>
		<scroll-view class="nav-scroll" :enable-flex="true" scroll-with-animation :throttle="false" :scroll-left="scrollToLeft" scroll-x @scroll="handleScroll">
			<view class="nav uni-nav">
				<view class="nav-item" :class="swiperIndex == index ? 'nav-item-act' : ''" :key="index" v-for="(item, index) in list" @click="taggleNav(index)">
					{{ item.title }}
				</view>
				<view class="nav-line" :style="style"></view>
			</view>
		</scroll-view>
		<view class="swiper">
			<swiper :current="swiperIndex" :duration="300" class="swiper-1" easing-function="linear" @change="swiperChange" >
				<swiper-item v-for="(item, index) in list" :key="index + 'asdf'">
					<scroll-view class="swiper-scroll" scroll-y="true" @scrolltolower="swiperScrollLower">
						<view>
							<view class="swiper-item-list">
								<view class="address" v-for="(addr_item,index) in item.content" :key="index">
									<view class="addressHead">
										{{addr_item.title}}
									</view>
									<view class="addressList" >
										<view class="linkman" v-for="(addr_list , index) in addr_item.information" :key="index" style="display: flex; align-items: center;">
											<image :src="addr_list.headImg" mode="" style="width: 68upx; height: 68upx; border-radius: 34upx; border: 1px solid rgba(255, 255, 255, 100);"></image>
											<text>{{addr_list.name}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		navs: {
			type: Array,
			default: function() {
				return [
					{ title: '全部', content: [
						{
							title:"通讯录",
							information:[
								{
									headImg:"",
									name:"设计大咖"
								},
								{
									headImg:"",
									name:"李设计"
								}
							]
						},{
							title:"群聊",
							information:[
								{
									headImg:"",
									name:"产品设计群"
								},
								{
									headImg:"",
									name:"研发设计群"
								},
								{
									headImg:"",
									name:"交互设计群"
								}
							]
						},{
							title:"文档",
							information:[
								{
									headImg:"",
									name:"产品设计文档.word"
								},
								{
									headImg:"",
									name:"产品设计介绍.ppt"
								}
							]
						},{
							title:"聊天记录",
							information:[
								{
									headImg:"",
									name:"艾伦"
								}
							]
						}
						] },
					{ title: '通讯录', content: [{
							title:"通讯录",
							information:[
								{
									headImg:"",
									name:"设计大咖"
								},
								{
									headImg:"",
									name:"李设计"
								}
							]
						}] },
					{ title: '群聊', content:[
						{
								title:"群聊",
								information:[
									{
										headImg:"",
										name:"产品设计群"
									},
									{
										headImg:"",
										name:"研发设计群"
									},
									{
										headImg:"",
										name:"交互设计群"
									}
								]
							}
					] },
					{ title: '文档', content:[{
							title:"文档",
							information:[
								{
									headImg:"",
									name:"产品设计文档.word"
								},
								{
									headImg:"",
									name:"产品设计介绍.ppt"
								}
							]
						}]},
					{ title: '聊天记录', content: [
						{
								title:"聊天记录",
								information:[
									{
										headImg:"",
										name:"艾伦"
									}
								]
							}
					]}
				];
			}
		}
	},
	data() {
		return {
			swiperIndex: 0, //当前的swiperindex
			navItemWidth: '', //选中下划线的宽度
			navItemLeft: 0, //选中下划线的显示位置
			scrollToLeft: 0, //scrollview需要滚动的距离
			navInfos: [], //所有navitem的节点信息
			parentLeft: 0, //nav盒子的节点信息
			componentWidth: 0, //nav盒子的宽度
			list: this.navs,
			isActive: 1,
			show: false,
		};
	},
	computed: {
		style() {
			return `width:${this.navItemWidth}px; left:${this.navItemLeft}px`;
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		// 获取dom信息
		init() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.uni-nav').fields({ rect: true, size: true }, res => {
				this.parentLeft = res.left;
				this.componentWidth = res.width;
				console.log('res==>', res);
			});
			query.selectAll('.nav-item').fields({ rect: true, size: true }, data => {
				data.forEach((item, index) => {
					if (index == 0) {
						this.navItemWidth = item.width;
						this.navItemLeft = item.left;
					}
					this.navInfos.push({ width: item.width, left: item.left });
				});
			});
			query.exec();
		},
		// 点击导航切换swiper
		taggleNav(val) {
			this.swiperIndex = val;
		},
		// 滚动tabs以及移动下划线
		scrollDom() {
			let info = this.navInfos[this.swiperIndex];
			let offsetLeft = info.left - this.parentLeft;
			let scrollLeft = offsetLeft - (this.componentWidth - info.width) / 2;
			this.scrollToLeft = scrollLeft < 0 ? 0 : scrollLeft;
			this.navItemLeft = this.navInfos[this.swiperIndex].left;
			setTimeout(() => {
				this.navItemWidth = info.width;
			}, 50);
		},
		// swiper的index变动
		swiperChange(e) {
			this.swiperIndex = e.detail.current;
			this.scrollDom();
			this.$emit('currentIndex', this.swiperIndex);
		},
		// tabs-scrollview触底
		handleScroll(e) {
			this.scrollDom();
		},
		// swiper-ScrollLower触底
		swiperScrollLower() {
			uni.showToast({
				icon: 'none',
				title: `此时为${this.list[this.swiperIndex].title}触底`
			});
			setTimeout(() => {
				this.getData();
			}, 500);
		},
		getData() {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(() => {
				for (let index = 0; index < 10; index++) {
					let arr = this.list[this.swiperIndex].content;
					this.$set(arr, arr.length, Math.random() + '-' + index + this.list[this.swiperIndex].title);
				}
				uni.hideLoading();
			}, 1000);
			console.log(this.list[this.swiperIndex]);
		}
	}
};
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #efeff4;
	}
.nav-item {
	display: inline-block;
	height: 40upx;
	line-height: 40upx;
	transition: color 0.3s ease;
	// text-align: left;
	color: rgba(153, 153, 153, 100);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
	margin: 0 24upx;
}
.nav {
	height: 88upx;
	line-height: 88upx;
	border: 2upx solid rgba(255, 255, 255, 100);
	background-color: #FFF;
}

.nav-item-act {
	font-weight: bolder;
	color: #0CCB82;
}

.nav-line {
	position: absolute;
	bottom: 0;
	width: 90upx;
	height: 6upx;
	border-radius: 10upx;
	background-color: #0CCB82;
	transition: left 0.3s ease;
}

swiper {
	position: relative;
	height: calc(100vh - 80upx);
}

swiper-item {
	text-align: center;
	color: #fff;
}
.swiper-item {
	overflow-y: scroll;
}
.swiper-item-list {
	background-color: rgba(239, 239, 244, 100);
	border-bottom: 10upx solid rgba(238, 238, 238, 100);
	.address{
		width: 100%;
		line-height: 40upx;
		color: rgba(16, 16, 16, 100);
		font-size: 28upx;
		text-align: start;
		font-family: Arial;
		border: 1px solid rgba(255, 255, 255, 100);
		padding-left: 32upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
		background-color: #fff;
		.addressHead{
			margin: 9upx 0 7upx 0;
			color: rgba(153, 153, 153, 100);
			font-size: 24upx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
		.addressList{
			.linkman{
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1px solid rgba(239, 239, 244, 100);
			}
		}
	}
}




.swiper-scroll {
	height: 100%;
}

</style>
