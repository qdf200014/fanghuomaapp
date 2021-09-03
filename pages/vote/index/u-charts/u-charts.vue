<template>
	<view class="flex w-100 flex-1 flex-column" style="height: 100%;">
		<uni-nav-bar left-icon="back" title="标题" :statusBar="true"></uni-nav-bar>
		<scroll-view class="qiun-columns" scroll-y>
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">折线图一（可横向拖拽带滚动条）</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :disable-scroll="true"true @touchstart="touchLineA"
				 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			</view>
		
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">环形图</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie($event,'canvasRing')"></canvas>
			</view>
			
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">进度条</view>
			</view>
			<view class="qiun-charts">
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
				<view class="pb-2">
					<progress percent="90" stroke-width="12" backgroundColor="#F4F5FB" show-info/>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.min.js';
	var _self;
	var canvasObj = {};

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				itemCount: 30, //x轴单屏数据密度
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		onReady() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data.data);
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			fillData(data) {
				
				let LineA = {
					categories: [],
					series: []
				};
				let Ring = {
					series: []
				};
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;
				this.showLineA("canvasLineA", LineA);
				
				Ring.series = data.Ring.series;
				for (let i = 0; i < Ring.series.length; i++) {
					Ring.series[i].format = () => {
						return Ring.series[i].name + Ring.series[i].data
					};
				}
				this.showRing("canvasRing", Ring);
			},
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
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
					pixelRatio: _self.pixelRatio,
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
						splitNumber: 8,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0) + '元'
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});

			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 40 * _self.pixelRatio, //圆环的宽度
							offsetAngle: 0 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
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
			touchPie(e, id) {
				canvasObj[id].showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
		height: 100%;
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
		margin-top: 10upx;
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
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
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
</style>
