<template>
	<view style="background-color: #F4F5FB; height: 100%;" class="flex w-100 flex-1 flex-column flex-nowrap">
		<uni-nav-bar left-icon="back" title="进山数据" :statusBar="true"></uni-nav-bar>
		<view style="background-color: #F7FAFE;width: 750rpx;" class="flex">
			<view class="flex justify-center align-center flex-row" style="width: 244rpx;height: 116rpx;" @click="open">
				<view style="font-size: 30rpx;font-weight: 400;color: #303233;padding-left: 40rpx;" class="flex">
					<text style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 130rpx;">{{this.title}}</text>
				</view>
				<image src="../../../static/work/drop.png" mode="" style="margin-right: 27rpx;width: 44rpx;height: 44rpx;"></image>
			</view>
			<view class="flex align-center justify-center" style="width: 500rpx;height: 116rpx;">
				<text class="date_time" style="margin-right: 12rpx;" @click="goCalendar">{{startDate | formatTime}}</text>
				<text class="date_word">至</text>
				<text class="date_time" style="margin-left: 12rpx;" @click="goCalendar2">{{endDate | formatTime}}</text>
			</view>
		</view>
		<wt-area ref="areaSelect" @confirm="confirm"></wt-area>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" @confirm="confirmDate" :start-date="'2020-8-10'"></uni-calendar>
		<uni-calendar ref="calendar2" :insert="false" :lunar="true" @confirm="confirmDate2" :start-date="'2020-8-10'"></uni-calendar>
		<scroll-view :scroll-y="true" :style="'height: '+scrollContentHeight+'px;'" class="flex flex-column flex-1 w-100"
		 show-scrollbar="false">
			<!-- <cell class="flex flex-column flex-1"> -->
			<!-- 进山人员统计 -->
			<view style="width: 750rpx;height: 220rpx;background-color: #FFFFFF;">
				<!-- <view class="one_title pl-3 pt-3">进山人员统计</view> -->
				<view class="flex align-center justify-center" style="padding-top: 60rpx;" @click="lookpeople">
					<view style="width: 375rpx;text-align: center;border-right-width: 1rpx;border-right-style: solid;border-right-color: #E5E5E5;">
						<view class="one_name">进山总人次</view>
						<view class="flex justify-center align-center" style="text-align: center;">
							<view class="one_num">{{register.total}}</view>
							<view class="one_people flex flex-column justify-center" style="padding-top: 10rpx;padding-left: 12rpx;">人次</view>
						</view>
					</view>
					<view style="width: 375rpx;text-align: center;">
						<view class="one_name">进山总辆次</view>
						<view class="flex justify-center align-center" style="text-align: center;">
							<view class="one_num">{{oneList.vehicle}}</view>
							<view class="one_people" style="padding-top: 10rpx;padding-left: 12rpx;">辆次</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view v-if="startDate!=endDate">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt flex pr-3 justify-end">
						<!-- <view class="qiun-title-dot-light">进山人次</view> -->
						<view class="flex justify-between" style="width: 200rpx;padding-right: 30rpx;">
							<view v-for="(item,index) in tabList" @click="handIndex(index)" :key="index">
								<view :class="tabIndex==index ? ' active' : 'tabname'" v-show="item.isShow">{{item.name}}</view>
							</view>
						</view>
					</view>
					<!-- 折线图 -->
					<view class="qiun-charts">
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :disable-scroll="true" true @touchstart="touchLineA"
						 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					</view>
				</view>

				<!-- 	<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">进山原因分布图</view>
					</view> -->
					<!-- 圆环图 -->
				<view class="qiun-charts flex align-center justify-between" style="margin-top: 20rpx;" :isshowRing="isshowRing">
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" style="width: 500rpx;"></canvas>
					<view class="flex flex-column pr-3">
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #5A71F5;border-radius: 4px;"></view>
								<text class="moun_name">游玩/活动</text>
							</view>
							<text class="moun_num">{{activity}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #60CBBA;border-radius: 4px;"></view>
								<text class="moun_name">生产作业</text>
							</view>
							<text class="moun_num">{{production}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #FF5F57;border-radius: 4px;"></view>
								<text class="moun_name">车辆通行</text>
							</view>
							<text class="moun_num">{{vehicle}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #FF9957;border-radius: 4px;"></view>
								<text class="moun_name">采集山产品</text>
							</view>
							<text class="moun_num">{{pick}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #DDD313;border-radius: 4px;"></view>
								<text class="moun_name">祭祀</text>
							</view>
							<text class="moun_num">{{sacrifice}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;padding-bottom: 14rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #AE67F0;border-radius: 4px;"></view>
								<text class="moun_name">迁坟</text>
							</view>
							<text class="moun_num">{{tomb}}</text>
						</view>
						<view class="flex align-center justify-between" style="width: 310rpx;">
							<view class="flex align-center">
								<view style="width: 24rpx;height: 24rpx;background-color: #67C23A;border-radius: 4px;"></view>
								<text class="moun_name">其他</text>
							</view>
							<text class="moun_num">{{other}}</text>
						</view>
					</view>
				</view>

				<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">进山人次区域分布图</view>
					</view> -->
					<!-- 进度条 -->
				<view class="qiun-charts" style="margin-top: 20rpx;padding-top: 60rpx;padding-bottom: 60rpx;">
					<view class="flex flex-row pl-3" v-for="(item,index) in threeList" :key="index">
						<view class="three_key" style="padding-left: 30rpx;">{{index+1}}</view>
						<view class="pb-2" style="width: 750rpx;padding-right: 58rpx;padding-left: 12rpx;">
							<view class="flex justify-between" style="padding-bottom: 12rpx;">
								<view class="three_key">{{item.key}}</view>
								<view class="three_value">{{dataRpe(item.value)}}</view>
							</view>
							<progress :percent="dataRpe(item.value)" stroke-width="12" backgroundColor="#F4F5FB" border-radius="4" />
						</view>
					</view>
				</view>
			</view>
			<!-- </cell> -->
		</scroll-view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import wtArea from '@/components/wt-area/wt-area.nvue';
	import getPercent from '@/utils/getPercent.js';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
	import dayjs from 'dayjs';
	import uCharts from '@/components/u-charts/u-charts.min.js';
	var _self;
	var canvasObj = {};
	var weekOfYear = require('dayjs/plugin/weekOfYear')
	dayjs.extend(weekOfYear)
	var weekYear = require('dayjs/plugin/weekYear')
	var weekOfYear = require('dayjs/plugin/weekOfYear')
	dayjs.extend(weekOfYear)
	dayjs.extend(weekYear)
	export default {
		components: {
			wtArea,
		},
		data() {
			return {
				arealist: [],
				title: '区域选择',
				startDate: dayjs(new Date()).add(-30, 'day').format('YYYY-MM-DD'),
				endDate: dayjs(new Date()).format('YYYY-MM-DD'),
				cid: null,
				oneList: {},
				register: {},
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				itemCount: 30, //x轴单屏数据密度
				tabIndex: 0,
				tabList: [{
						id: 1,
						name: '日',
						isShow: true,
					},
					{
						id: 2,
						name: '周',
						isShow: true,
					},
					{
						id: 3,
						name: '月',
						isShow: true
					}
				],
				daily: [],
				weekly: [],
				monthly: [],
				threeList: [],
				arrA: [],
				LinA: {},
				scrollContentHeight: 1, // 滑动区域高度
				oldHasPark: false, //责任区管理
				oldOrgType: 1, //判断是否为场景管理员
				isshowRing:true,
				activity:"",
				production:"",
				vehicle:"",
				pick:"",
				sacrifice:"",
				tomb:"",
				other:"",
			}
		},
		filters: {
			formatTime(time) {
				return dayjs(time).format('YYYY年MM月DD日')
			}
		},
		computed:{
			...mapGetters({
				userInfo:'user/info'
			})
		},
		onShow() {
			this.getUserInfo();	// 用户信息更新
		},
		onLoad() {
			// _self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

			//#ifdef APP-PLUS

			let screenH = plus.screen.resolutionHeight; // 屏幕高度

			let statusH = uni.getSystemInfoSync().statusBarHeight; // 状态栏高度

			let roundH = 44; // 任务栏高度

			let selectH = uni.upx2px(116); // 选择框

			this.scrollContentHeight = screenH - statusH - roundH - selectH;

			//#endif

			this.requestData();
			if (dayjs(this.startDate).format('MM') == dayjs(this.endDate).format('MM')) {
				this.tabList[2].isShow = false;
				// this.requestData();
			} else if (dayjs(this.startDate).format('MM') != dayjs(this.endDate).format('MM')) {
				this.tabList[2].isShow = true;
			}
			if (dayjs(this.startDate).week() == dayjs(this.endDate).week()) {
				this.tabList[2].isShow = false;
				this.tabList[1].isShow = false;
			} else if (dayjs(this.startDate).week() != dayjs(this.endDate).week() && dayjs(this.startDate).format('MM') == dayjs(
				this.endDate).format('MM')) {
				this.tabList[2].isShow = false;
				this.tabList[1].isShow = true;
			}
			this.getUserInfo();
		},
		onReady() {
			this.requestData();
		},
		methods: {
			...mapActions({
				getUserInfo:'user/getUserInfo',
			}),
			// 获取用户信息
			// getUserInfo() {
			// 	let userInfo = uni.getStorageSync('userInfo') || {};
			// 	this.userInfo = Object.assign({}, this.userInfo, userInfo);
			// 	console.log(this.userInfo, '用户信息');
			// 	this.scaneType = this.userInfo.oldOrgType;
			// },
			// 请求数据
			requestData() {
				// 统计-进山、车辆
				uni.$api.mountains.getrangcount({
						from: this.startDate,
						to: this.endDate,
						organization_id: this.cid || undefined
					})
					.then(res => {
						this.oneList = res.data.data;
						this.register = res.data.data.register;
						console.log(this.register, '------------------------------------');
						if(this.register.total == 0){
							this.activity = '0.00' + '%';
							this.production = '0.00' + '%';
							this.vehicle = '0.00' + '%';
							this.pick = '0.00' + '%';
							this.sacrifice = '0.00' + '%';
							this.tomb = '0.00' + '%';
							this.other = '0.00' + '%';
						}else{
							this.activity = (this.register.activity / this.register.total * 100).toFixed(2) + '%';
							this.production = (this.register.production / this.register.total * 100).toFixed(2) + '%';
							this.vehicle = (this.register.vehicle / this.register.total * 100).toFixed(2) + '%';
							this.pick = (this.register.pick / this.register.total * 100).toFixed(2) + '%';
							this.sacrifice = (this.register.sacrifice / this.register.total * 100).toFixed(2) +'%';
							this.tomb = (this.register.tomb / this.register.total * 100).toFixed(2) + '%';
							this.other = (this.register.other / this.register.total * 100).toFixed(2) + '%';
						}
						let Ring = {
							series: [{
									"name": "游玩/活动" + "    " + this.activity,
									"data": this.register.activity,
									"color":"#5A71F5"  
								},
								{
									"name": "生产作业" + "    " + this.production,
									"data": this.register.production,
									"color":"#60CBBA"
								},
								{
									"name": "车辆通行" + "       " + this.vehicle,
									"data": this.register.vehicle,
									"color":"#FF5F57"
								},
								{
									"name": "采集山产品" + "    " + this.pick,
									"data": this.register.pick,
									"color":"#FF9957"
								},
								{
									"name": "祭祀" + "    " + this.sacrifice,
									"data": this.register.sacrifice,
									"color":"#DDD313"
								},
								{
									"name": "迁坟" + "    " + this.tomb,
									"data": this.register.tomb,
									"color":"#AE67F0"
								},
								{
									"name": "其他" + "    " + this.other,
									"data": this.register.other,
									"color":"#67C23A"
								},
							]
						}
						this.showRing("canvasRing", Ring)
					})
					.catch(err => {
						console.log(err, 'getrangcount_ERR')
					})
				// 进山统计-每日
				uni.$api.mountains.getdaily({
						from: this.startDate,
						to: this.endDate,
						organization_id: this.cid || undefined
					})
					.then(res => {
						this.daily = res.data.data;
						this.LineA = {
							categories: [],
							series: [{
								name: '进山人次',
								data: []
							}]
						};
						this.arrA = this.daily;
						for (var i = 0; i < this.arrA.length; i++) {
							this.LineA.categories.push(this.arrA[i].date);
							this.LineA.series[0].data.push(this.arrA[i].count)
						}
						this.a = true;
						this.showLineA("canvasLineA", this.LineA);
					})
					.catch(err => {
						console.log(err, 'getdaily_ERR')
					})
				// 进山统计-每周
				uni.$api.mountains.getweekly({
						from: this.startDate,
						to: this.endDate,
						organization_id: this.cid || undefined
					})
					.then(res => {
						// console.log('getweekly_RES', res)
						this.weekly = res.data.data;
					})
					.catch(err => {
						console.log('getweekly_ERR', err)
					})
				// 进山统计-每月
				uni.$api.mountains.getmonthly({
						from: this.startDate,
						to: this.endDate,
						organization_id: this.cid || undefined
					})
					.then(res => {
						// console.log('getmonthly_RES', res)
						this.monthly = res.data.data;
					})
					.catch(err => {
						console.log('getmonthly_ERR', err)
					})
				// 统计-进山排行
				uni.$api.mountains.getrank({
						from: this.startDate,
						to: this.endDate,
						organization_id: this.cid || undefined
					})
					.then(res => {
						console.log('getrank_RES进山排行', res)
						this.threeList = res.data.data;
					})
					.catch(err => {
						console.log('getrank_ERR', err)
					})
			},

			// 日周月下标
			handIndex(index) {
				this.tabIndex = -1;
				this.$nextTick(() => {
					this.tabIndex = index;
				})
				if (index == 0) {
					this.LineA = {
						categories: [],
						series: [{
							name: '进山人次',
							data: []
						}]
					};
					this.arrA = this.daily;
					for (var i = 0; i < this.arrA.length; i++) {
						this.LineA.categories.push(this.arrA[i].date);
						this.LineA.series[0].data.push(this.arrA[i].count)
					}
					this.a = true;
					this.showLineA("canvasLineA", this.LineA);
					// console.log(this.arrA)
				} else if (index == 1) {
					this.LineA = {
						categories: [],
						series: [{
							name: '进山人次',
							data: []
						}]
					};
					this.arrA = this.weekly;
					for (var i = 0; i < this.arrA.length; i++) {
						this.LineA.categories.push(this.arrA[i].date);
						this.LineA.series[0].data.push(this.arrA[i].count)
					}
					this.a = true;
					this.showLineA("canvasLineA", this.LineA);
				} else if (index == 2) {
					this.LineA = {
						categories: [],
						series: [{
							name: '进山人次',
							data: []
						}]
					};
					this.arrA = this.monthly;
					for (var i = 0; i < this.arrA.length; i++) {
						this.LineA.categories.push(this.arrA[i].date);
						this.LineA.series[0].data.push(this.arrA[i].count)
					}
					this.showLineA("canvasLineA", this.LineA);
				}
			},
			open() {
				this.$refs.areaSelect.open();
			},
			// 地区保存
			confirm(arealist) {
				console.log('arealist', arealist);
				this.arealist = arealist;
				if (arealist.length <= 0) {
					this.cid = undefined;
					this.title = '区域选择';
				} else {
					this.cid = this.arealist[this.arealist.length - 1].id
					this.title = this.arealist[this.arealist.length - 1].name;
				}
				this.requestData();
				this.type = this.arealist[this.arealist.length - 1].type;
				console.log(this.type)
			},
			// 地区取消
			clearArea() {
				this.$refs.areaSelect.clear();
			},
			dataRpe(data) {

				return getPercent(data || 0, 1);
			},
			// 责任管理跳转
			lookpeople() {
				let userInfo = this.userInfo;
				console.log(userInfo,'啦啦啦啦');
				// this.type = userInfo.oldHasPark; //责任区管理员
				this.scaneType = userInfo.oldOrgType; //场景管理员
				console.log(this.type,'11111')
				console.log(this.scaneType,'2222')
				if (this.type == 1 || this.scaneType == 1) {
					uni.navigateTo({
						url: './peopleTime?start=' + this.startDate + "&end=" + this.endDate+"&organization_id="+this.cid
					})
				}
			},
			// 打开前面的日历
			goCalendar() {
				this.$refs.calendar.open();
			},
			// 打开后面的日历
			goCalendar2() {
				this.$refs.calendar2.open();
			},
			confirmDate2(e) {
				console.log(e, '后面的日期');
				this.endDate = e.fulldate;
				this.requestData();
				if (dayjs(this.startDate).format('MM') == dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = false;
					// this.requestData();
				} else if (dayjs(this.startDate).format('MM') != dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = true;
				}
				if (dayjs(this.startDate).week() == dayjs(this.endDate).week()) {
					this.tabList[2].isShow = false;
					this.tabList[1].isShow = false;
				} else if (dayjs(this.startDate).week() != dayjs(this.endDate).week() && dayjs(this.startDate).format('MM') ==
					dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = false;
					this.tabList[1].isShow = true;
				}
			},
			confirmDate(e) {
				console.log(e, '前面的日期');
				this.startDate = e.fulldate;
				// let before = e.range.before,
				// 	after = e.range.after,
				// 	date = e.range.data;

				// // 时间顺序整理
				// before = date[0] || before || '';
				// after = date[date.length - 1] || before;
				this.requestData();
				if (dayjs(this.startDate).format('MM') == dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = false;
					// this.requestData();
				} else if (dayjs(this.startDate).format('MM') != dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = true;
				}
				if (dayjs(this.startDate).week() == dayjs(this.endDate).week()) {
					this.tabList[2].isShow = false;
					this.tabList[1].isShow = false;
				} else if (dayjs(this.startDate).week() != dayjs(this.endDate).week() && dayjs(this.startDate).format('MM') ==
					dayjs(this.endDate).format('MM')) {
					this.tabList[2].isShow = false;
					this.tabList[1].isShow = true;
				}
			},
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						format: (val) => {
							return val.toFixed(0)
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [5, 5, 5, 5],
					series: chartData.series,
					legend: {
						show: false,
						position: 'right',
						float: 'right',
						itemGap: 10,
						padding: 10,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1,
						// legendShape:'rect'
						format: function(params) {
							var legendIndex = 0;
							chartData.series.forEach(function(v, i) {
								if (v.name == params) {
									legendIndex = i;
								}
							});
							return params + " " + chartData.series[legendIndex].data;

						}
					},
					subtitle: {
						name: '进山人员',
						color: '#909399',
						fontSize: 14 * this.pixelRatio,
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 35 * this.pixelRatio, //圆环的宽度
							offsetAngle: 0, //圆环的角度
							border: true,
						}
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					animation: false,
					width: uni.upx2px(400) * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});

			},

			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			// touchPie(e, id) {
			// 	canvasObj[id].showToolTip(e, {
			// 		format: function(item) {
			// 			return item.name + ':' + item.data
			// 		}
			// 	});
			// },
		}
	}
</script>

<style>
	.date_time {

		font-size: 26rpx;
		color: #5A71F5;
	}

	.date_word {

		font-size: 24rpx;
		font-weight: 400;
		color: #909399;
	}

	.one_title {

		font-size: 32rpx;
		font-weight: 500;
		color: #303233;
	}

	.one_name {

		font-size: 28rpx;
		font-weight: 400;
		color: #303233;
	}

	.one_num {

		font-size: 60rpx;
		font-weight: 500;
		color: #303233;
	}

	.one_people {

		font-size: 24rpx;
		font-weight: 400;
		color: #909399;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
		flex: 1;
	}

	.qiun-common-mt {
		margin-top: 20rpx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		/* border-left: 10upx solid #0ea391; */
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		/* height: 500upx; */
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
		padding: 25upx;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15upx;
		height: 30upx;
		line-height: 30upx;
		margin: 10upx;
		background: #ff9933;
		font-size: 30upx;
		border-radius: 8upx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}

	.tabname {

		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
	}

	.active {

		font-size: 30rpx;
		font-weight: 500;
		color: #5A71F5;
	}

	.three_key {

		font-size: 28rpx;
		color: #303233;
	}

	.three_value {

		font-size: 28rpx;
		font-weight: 400;
		color: #303233;
		margin-left: 12rpx;
	}
	.moun_name{
		font-size: 28rpx;
		font-weight: 400;
		color: #606266;
		padding-left: 8rpx;
	}
	.moun_num{
		font-size: 28rpx;
		color: #303233;
	}
</style>
