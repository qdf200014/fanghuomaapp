<template>
	<view class="searchResult">
		<uni-nav-bar statusBar="true" :border="false"></uni-nav-bar>
		<view class="search">
			<view style="display: flex;align-items: center;">
				<text class="iconfont icon-sousuo position-absolute text-muted"></text>
				<input class="searchInput" v-model="inputValue" @confirm="search" placeholder="搜索" placeholder-style="width: 56upx;
					height: 40upx;
					font-size: 28upx;
					text-align: left;
					line-height: 40upx;
					font-family: PingFangSC-regular;" type="text" />
			</view>
			<view @click="clearInput" style="color: rgba(153, 153, 153, 100);
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular">取消</view>
		</view>
		
		<tabs></tabs>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	export default {
		data(){
			return {
				inputValue: '',
			}
		},
		comments:{
			tabs
		},
		methods:{
			//清空搜索框
			clearInput(){
				this.inputValue = ''
			},
		}
	}
</script>

<style>
	.search {
		width: 100%;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0px 30upx;
		line-height: 40upx;
		border: 1px solid rgba(255, 255, 255, 100);
		background-color: #FFF;
	}
	.searchInput {
		width: 574upx;
		height: 70upx;
		border-radius: 34upx;
		background-color: rgba(255, 255, 255, 100);
		text-align: start;
		border: 1px solid rgba(12, 203, 130, 100);
		color: rgba(12, 203, 130, 100);
		padding-left: 62upx;
		box-sizing: border-box;
	}
</style>
