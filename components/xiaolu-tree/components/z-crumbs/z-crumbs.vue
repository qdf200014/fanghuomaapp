<template>
	<view class="crumbs_box px-30">
		<scroll-view scroll-x class="flex-1 py-32 flex-s" :scroll-into-view="intoId" :show-scrollbar="fasle">
			<view :id="item.id" class="flex-s" v-for="(item,index) in crumbsList" :key="index" @click="clickTab(item,index)">
				<text class="crumbs_title" :class="index<crumbsList.length-1 || index==0?'crumbs_select':''">{{item.name}}</text>
				<text v-if="index<crumbsList.length-1" class="crumbs_icon">></text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		computed: {
			intoId() {
				return this.crumbsList[this.crumbsList.length - 1].id
			}
		},
		data() {
			return {
				userInfo:{},
				arr:[],
				attr:'',
				Area:'',
				crumbsList: [
					{
						id: 0,
						name: '防火通讯录'
					}
				]
			};
		},
		onLoad() {
			uni.$api.user.getuserinfo().then(res => {
				this.userInfo = res.data.data
				console.log(userInfo)
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			clickTab(e,i) {
				console.log(e,i)
				if (i >= this.crumbsList.length-1) {
					return false
				}
				let list = this.crumbsList
				list = list.filter((item,index) => {
					console.log(index)
					if (index <= 0) {
						return true
					} else {
						if (index <= i) {
							this.backTree(e.level,e.code)
							return true
						} else {
							return false
						}
					}
				})
				this.$emit('crumbsItem',e)
				this.crumbsList = list
				console.log(this.crumbsList)
			},
			backTree(attr,Area){
				console.log(attr)
				console.log(Area)
				uni.$api.user.getareacodelist({
					"attr": attr,
					"Area": Area 
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
.border-test {
	border-width: 1rpx;
	border-style: solid;
	border-color: red
}
.flex-1 {
	flex: 1;
}
.crumbs_box {
	width: 750rpx;
}
.flex-s {
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.px-30 {
	padding-left: 30rpx;
	padding-right: 30rpx;
}
.py-32 {
	padding-top: 32rpx;
	padding-bottom: 32rpx;
}
.crumbs_title {
	font-size: 30rpx;
}
.crumbs_icon {
	width: 44rpx;
	text-align: center;
	font-size: 30rpx;
	color: #949599;
}
.crumbs_select {
	color: #487CF1;
}
</style>
