<template>
	<view>
		<uni-nav-bar :border="false" :statusBar="true"></uni-nav-bar>
		<!-- 搜索框 -->
		<view class="search">
			<view style="display: flex;align-items: center;">
				<text class="iconfont icon-sousuo position-absolute text-muted"></text>
				<input class="searchInput" v-model="inputValue" @confirm="search" placeholder="搜索" 
			    placeholder-style="font-size: 28rpx; height:28rpx; line-height: 28rpx;" type="text" />
			</view>
			<view @click="clearInput" style="color: rgba(12, 203, 130, 100);
			font-size: 28rpx;
			text-align: left;
			font-family: PingFangSC-regular">取消</view>
		</view>
		<!-- 搜索框 -->

		<!-- 搜索历史 -->
		<view class="searchHistory">
			<view class="searchTop">
				<view>搜索历史:</view>

				<view style="color: rgba(255, 58, 48, 100); font-size: 24rpx; margin-right: 32rpx;" @click="empty">清空记录</view>
			</view>
			<view class="searchHistoryItem">
				<view class="searchItem" v-for="(item, index) in searchHistoryList" :key="index">
					<text>{{ item }}</text>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputValue: '',
			searchHistoryList: [] //搜索出来的内容
		};
	},
	methods: {
		search() {
			if (this.inputValue == '') {
				uni.showModal({
					title: '搜索内容不能为空'
				});
			} else {
				if (!this.searchHistoryList.includes(this.inputValue)) {
					this.searchHistoryList.unshift(this.inputValue);
					uni.setStorage({
						key: 'searchList',
						data: JSON.stringify(this.searchHistoryList)
					});
				} else {
					//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
					let i = this.searchHistoryList.indexOf(this.inputValue);
					this.searchHistoryList.splice(i, 1);
					this.searchHistoryList.unshift(this.inputValue);
					uni.showToast({
						title: '不能重复添加'
					});
					uni.setStorage({
						key: 'searchList',
						data: JSON.stringify(this.searchHistoryList)
					});
				}
			}
		},
		//清空搜索框
		clearInput(){
			this.inputValue = ''
		},
		//清空历史记录
		empty() {
			uni.showToast({
				title: '已清空'
			});
			uni.removeStorage({
				key: 'searchList'
			});

			this.searchHistoryList = [];
		}
	},
	async onLoad() {
		let list = await uni.getStorage({
			key: 'searchList'
		});

		console.log(list[1].data);

		if (list[1].data) {
			this.searchHistoryList = JSON.parse(list[1].data);
		}
	}
};
</script>

<style>
	page{
		line-height: 40rpx;
		background-color: rgba(239, 239, 244, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}
.search {
	width: 100%;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0px 30rpx;
	line-height: 40rpx;
	border: 2rpx solid rgba(255, 255, 255, 100);
	background-color: #FFF;
}
.searchInput {
	width: 564rpx;
	height: 70rpx;
	border-radius: 34rpx;
	background-color: rgba(255, 255, 255, 100);
	text-align: start;
	border: 2rpx solid rgba(239, 239, 244, 100);
	padding-left: 62rpx;
	box-sizing: border-box;
}
.searchHistory {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.searchTop{
	color: rgba(51, 51, 51, 100); 
	font-size: 28rpx; display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0px 10rpx;
	font-weight: 600; 
	margin-left: 32rpx; 
	margin-top: 16upx;
	margin-bottom: 14upx;
}
.searchHistoryItem {
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	margin: 0 auto;
}
.searchHistoryItem view {
	/* width: 50px; */
	height: 40rpx;
	padding: 0px 10rpx;
	margin-right: 24rpx;
	border-radius: 60rpx;
	background-color: rgba(229, 229, 234, 100);
	color: rgba(153, 153, 153, 100);
	font-size: 28rpx;
	text-align: center;
	font-family: Arial;
}

</style>