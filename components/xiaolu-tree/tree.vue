<template>
	<view style="background-color: #f5f5f5;">
		<view class="header">
			<search ref="sea" @confirm="confirmSearch" />
			<view class="title">
				<scroll-view scroll-x style="width: 100%;white-space: nowrap;" :scroll-left="scrollLeft">
					<view v-for="(item,index) in parent" class="inline-item" :key="index">
						<view class="inline-item" v-if="index==0" @click="backTree(item,-1)">
							<text v-if="index==parent.length-1&&!isre" class="none">全部</text>
							<text v-else class="active">全部</text>
						</view>
						<view v-if="index==0&&isre" @click="backTree(item,-2)" :class="[index==parent.length-1&&isre]?'none inline-item':'active inline-item'">
							<text class="iconfont icon-z043 iconclass"></text>
							搜索结果
						</view>
						<view class="inline-item" @click="backTree(item,index)" v-if="index!=0">
							<text v-if="index!=0" class="iconfont icon-z043 iconclass"></text>
							<text v-if="index==parent.length-1" class="none inline-item">
								{{item.name}}
							</text>
							<text v-else class="active">
								{{item.name}}
							</text>
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view style="padding-top: 100px;">
			<view class="corrLevelPerson" @click="toContactDetil">
				<view class="common">
					<label class="content">
						<view class="checkbox">
							<text style="white-space: nowrap;">本级人员</text>
						</view>
						<view class="right">
							<text  class="iconfont icon-z043"></text>
						</view>
					</label>
					<!-- <tree v-if="item.children&&tochild"  v-for="(item,index) in item.children"></tree> -->
				</view>
			</view>
			<view class="container-list">
				<view class="common" v-for="(item, index) in tree" @click="toChildren(item,index)" :key="index">
					<label class="content">
						<view class="checkbox" v-if="false" @click.stop="checkboxChange(item,index)">
							<text  v-if="item.checked" class="iconfont icon-xuanzhong txt icon-selected"></text>
							<text style="color: #b8b8b8;" v-else class="iconfont icon-weixuanzhong txt"></text>
						</view>
						<view class="checkbox" v-if="false" @click.stop="checkbox(item,index)">
							<text  v-if="item.checked" class="txt iconfont icon-selected">
							</text>
							<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">
							</text>
						</view>
						<view class="checkbox" v-if="false" @click.stop="checkbox(item,index)">
							<text  v-if="item.checked" class="txt iconfont icon-selected">
							</text>
							<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">
							</text>
						</view>
						<!-- <view class="person" v-if="item.user">
							{{item[props.label].substring(item[props.label].length-2)}}
						</view> -->
						<view class="word">{{item.name}}</view>
						<view class="right" v-if="!item.user">
							<text v-if="!item.user" class="iconfont icon-z043"></text>
						</view>
						<view class="right flex align-center" v-else>
							<image src="../../static/addrBook/sendMsg@2x.png" mode="" style="width: 74rpx; height: 74rpx; margin-right: 30rpx;"></image>
							<image src="../../static/addrBook/callPhone@2x.png" mode="" style="width: 74rpx; height: 74rpx;"></image>
						</view>
					</label>
					<!-- <tree v-if="item.children&&tochild"  v-for="(item,index) in item.children"></tree> -->
				</view>
			</view>
			<list class="freqContacts">
				<cell>
					<view class="contactList">
						<text class="contactTitle">常用联系人</text>
					</view>
				</cell>
				<cell>
					<view class="contactInfo">
						<image src="../../static/user/headImg@2x.png" mode="" style="width: 96rpx; height: 96rpx;"></image>
						<text class="contactName">张美美</text>
						<text class="duty">局长</text>
					</view>
					<view class="contactInfo">
						<image src="../../static/user/headImg@2x.png" mode="" style="width: 96rpx; height: 96rpx;"></image>
						<text class="contactName">张美美</text>
						<text class="duty">副局长</text>
					</view>
				</cell>
			</list>
		</view>
	</view>
</template>

<script>
	import search from './components/search/index.vue'
	export default {
		name: "tree",
		data() {
			return {
				isre: false,
				tree: [],
				allData: [],
				parent: [1],
				searchResult: [],
				party_current: 100000,
				tochild: false,
				scrollLeft: 999,
				userInfo : {},
				area: '',
				key:'',
				users: []
			}
		},
		components: {
			search
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo')
			if(this.userInfo.levelId == 0){
				this.area = 0
				this.key = 0
			}
			if(this.userInfo.levelId == 1){
				this.area = this.userInfo.province
			}
			if(this.userInfo.levelId == 2){
				this.area = this.userInfo.city
			}
			if(this.userInfo.levelId == 3){
				this.area = this.userInfo.area
			}
			if(this.userInfo.levelId == 4){
				this.area = this.userInfo.county
			}
			if(this.userInfo.levelId == 5){
				this.area = this.userInfo.village
			}
			console.log(this.area)
			console.log(this.key)
			console.log(this.userInfo)
			uni.$api.addressBook.getmaillistarealist({
				"attr": this.userInfo.levelId,
				"area": this.area,
			}).then(res => {
				console.log(res)
				this.tree = res.data.data.areas
				this.allData = res.data.data.areas
				this.users = res.data.data.users
				uni.setStorageSync('users',this.users)
			}).catch(err => {
				console.log(res)
			})
		},
		methods: {
			toContactDetil: function(){
				uni.navigateTo({
					url: "/pages/addrBook/contact"
				})
			},
			//多选
			checkboxChange: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked,
					temp = Object.assign({}, item)
				if (item.checked) { //反选
					if (this.props.checkStrictly) {
						if (item.user) {
							that.$set(that.tree[index], 'checked', false)
							this.delUser(item.id)
						} else {
							that.$set(that.tree[index], 'checked', false)
							for (var index = 0, n = this.newCheckList.length; index < n; index++) {
								let temp = this.newCheckList[index];
								if (temp.id == item.id) {
									this.newCheckList.splice(index, 1)
									break
								}
							}
							this.delChild(item)
						}
					} else {
						that.$set(that.tree[index], 'checked', false)
						for (var index = 0, n = this.newCheckList.length; index < n; index++) {
							let temp = this.newCheckList[index];
							if (temp.id == item.id) {
								this.newCheckList.splice(index, 1)
								break
							}
						}
					}
				} else { //选中
					that.newCheckList.push(item)
					that.$set(that.tree[index], 'checked', true)
					if (this.props.checkStrictly) {
						this.chooseChild(item)
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			delUser(id) {
				let that = this;
				for (var i = 0, len = that.newCheckList.length; i < len; i++) {
					if (that.newCheckList[i].id === id) {
						that.newCheckList.splice(i, 1)
						console.log('删user')
						return
					}
				}
			},
			chooseChild(arr) {
				let that = this;
				if (!arr.user) {
					for (var i = 0, len = arr.children.length; i < len; i++) {
						let item = arr.children[i];
						item.checked = true
						that.newCheckList.push(item)
						if (!item.user) {
							this.chooseChild(item)
						}
					}
				}
				that.newCheckList = Array.from(new Set(that.newCheckList))
			},
			delChild(arr) {
				console.log(this.newCheckList)
				if (!arr.user) {
					for (var i = 0, len = arr.children.length; i < len; i++) {
						let item = arr.children[i];
						item.checked = false
						for (var index = 0, n = this.newCheckList.length; index < n; index++) {
							let temp = this.newCheckList[index];
							if (temp.id == item.id) {
								this.newCheckList.splice(index, 1)
								break
							}
						}
						if (!item.user) {
							this.delChild(item)
						}
					}
				}
			},
			//单选
			checkbox: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked
				that.$set(that.tree[index], 'checked', status)
				if (that.newCheckList.length <= 0) {
					that.newCheckList = [that.tree[index]]
				} else if (that.newCheckList.length == 1) {
					this.tree.forEach(item => {
						if (item.id != this.tree[index].id) {
							item.checked = false
						}
					})
					that.newCheckList = []
					if (that.tree[index].checked) {
						that.newCheckList.push(that.tree[index])
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			//到下一级
			toChildren(item,index) {
				console.log(item)
				uni.$api.addressBook.getmaillistarealist({
					"attr": this.tree[index].level,
					"area": this.tree[index].code
				}).then(res => {
					console.log(res)
					this.tree = res.data.data.areas
					this.allData = res.data.data.areas
					this.users = res.data.data.users
					uni.setStorageSync('users',this.users)
					this.parent.push(item)
					console.log(this.parent)
				}).catch(err => {
					console.log(res)
				})
				
				this.tochild = true
					// that.tree = item[children]
				this.checkIf()
				this.$nextTick(() => {
					this.scrollLeft += 200
					
				})
			},
			// 校验哪些选中了。单选
			checkIf() {
				let that = this;
				// console.log(this.newCheckList, 'new')
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.newCheckList.length; j < lens; j++) {
						if (that.newCheckList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						} else {
							that.$set(that.tree[i], 'checked', false)
						}
					}
				}
			},
			//搜索
			confirmSearch(val) {
				this.searchResult = []
				this.search(this.allData, val)
				this.isre = true
				this.parent.splice(1, 6666)
				uni.showLoading({
					title: '正在查找'
				})
				setTimeout(() => {
					this.tree = this.searchResult
					uni.hideLoading()
				}, 300)
			},
			search(data, keyword) {
				var that = this
				let children = that.users
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i].name.indexOf(keyword) >= 0) {
						that.searchResult.push(data[i])
					}
					if (!data[i].user > 0) {
						that.search(data[i][children], keyword)
					}
				}
			},
			//返回其它层
			backTree(item, index) {
				// uni.$api.addressBook.getmaillistarealist({
				// 	"attr": index,
				// 	"area": this.tree[index].code
				// }).then(res => {
				// 	console.log(res)
				// 	this.tree = res.data.data.areas
				// 	this.allData = res.data.data.areas
				// 	this.users = res.data.data.users
				// 	uni.setStorageSync('users',this.users)
				// }).catch(err => {
				// 	console.log(res)
				// })
				let that = this;
				if (index == -1) {
					uni.$api.addressBook.getmaillistarealist({
						"attr": this.userInfo.levelId,
						"area": this.area,
					}).then(res => {
						console.log(res)
						this.tree = res.data.data.areas
						this.allData = res.data.data.areas
						this.users = res.data.data.users
						uni.setStorageSync('users',this.users)
					}).catch(err => {
						console.log(res)
					})
					that.parent.splice(1, 6666)
					that.isre = false
					that.$refs.sea.clears()
				} else if (index == -2) {
					that.tree = that.searchResult
					that.parent.splice(1, 6666)
				} else {
					if (that.parent.length - index > 2) {
						that.parent.forEach((item, i) => {
							if (i > index) {
								that.parent.splice(i, 6666)
							}
						})
						
					} else if (index == that.parent.length - 1) {
						
					} else {
						that.parent.splice(that.parent.length - 1, 1)
					}
					uni.$api.addressBook.getmaillistarealist({
						"attr": index,
						"area": that.parent[index].code
					}).then(res => {
						console.log(res)
						that.tree = res.data.data.areas
						that.allData = res.data.data.areas
						that.users = res.data.data.users
						uni.setStorageSync('users',that.users)
					}).catch(err => {
						console.log(res)
					})
				}
				return
				that.checkIf()
			}

		}
	}
</script>
<style lang="scss" scoped>
	.flex_between_center {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.checkbox {
		position: relative;
		height: 18px;
		margin-left: 5px;
		margin-right: 0px;
		width: 18px;
		.color {
			color: #00aaff;
			background-color: #00aaff;
		}
		.txt {
			font-size: 22px;
			line-height: 18px;
			width: 100%;
			height: 100%;
			display: flex;
		}
	}
	.checkBorder {
		border: 1px solid #ecdee4;
	}
	.header {
		position: fixed;
		width: 100%;
		background-color: #FFF;
		z-index: 10;
		.title {
			height: 45px;
			padding: 0 16px;
			line-height: 45px;
			font-size: 15px;
			color: #606064;
			background-color: #FFF;
			.iconclass {
				display: inline-block;
				margin: 0 6px;
				color: #D0D4DB;
				font-size: 14px;
			}
		}
		
	}
	.corrLevelPerson{
		overflow-y: scroll;
		overflow-x: hidden;
		.common {
			background-color: #fff;
			border-bottom: 1px solid #f4f4f4;
			padding-left: 5px;
			.content {
				display: flex;
				align-items: center;
				height: 50px;
				width: 100%;
				position: relative;
				font-size: 32rpx;
				.right {
					position: absolute;
					right: 15px;
					color: #babdc3;
					font-size: 32rpx;
				}
				.word {
					margin-left: 8px;
				}
			}
		}
	}
	.container-list {
		padding-bottom: 16rpx;
		padding-top: 16rpx;
		.common {
			background-color: #fff;
			border-bottom: 1px solid #f4f4f4;
			padding-left: 5px;
			.content {
				display: flex;
				align-items: center;
				height: 50px;
				width: 100%;
				line-height: 50px;
				position: relative;
				font-size: 32rpx;
				.right {
					position: absolute;
					right: 15px;
					color: #babdc3;
					font-size: 32rpx;
				}
				.word {
					margin-left: 8px;
				}
			}
		}
	}
	.freqContacts{
		overflow-y: scroll;
		overflow-x: hidden;
		.contactList{
			width: 690rpx;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #FFF;
			padding: 0 16px;
			border: 0rpx;
			border-bottom-width: 1rpx; 
			border-bottom-color: #EEEFF3; 
			border-style: solid;
			.contactTitle{
				font-size: 38rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #323234;
			}
		}
		.contactInfo{
			width: 690rpx;
			height: 138rpx;
			display: flex;
			align-items: center;
			background-color: #FFF;
			padding: 0 16px;
			border: 0rpx;
			border-bottom-width: 1rpx; 
			border-bottom-color: #EEEFF3; 
			border-style: solid;
			.contactName{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #323234;
				margin-left: 24rpx;
				margin-right: 16rpx;
			}
			.duty{
				padding: 4rpx 16rpx;
				border-width: 1rpx;
				border-style: solid;
				font-size: 22rpx;
				border-color: #F07A4E;
				color: #F07A4E;
				border-radius: 20px;
			}
		}
	}
	.person {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		border: 1px solid #ff9f44;
		background-color: #fff9f4;
		margin-left: 0px;
		color: #f57a00;
		line-height: 32px;
		font-size: 11px;
		text-align: center;
		margin-left: 10px;
	}
	.active {
		color: #4297ED !important;
	}
	.none {
		color: #666666;
	}
	.icon-selected{
		color: #0095F2!important;
		font-size: 20px!important;
	}
	.inline-item {
		display: inline-block
	}
	@import url("./css/icon.css");
</style>
