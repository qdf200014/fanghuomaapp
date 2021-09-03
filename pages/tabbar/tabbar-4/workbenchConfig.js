const workbenchConfig = [{
	name: '工作管理',
	list: [
		// {
		// 	name: '日报',
		// 	icon: '/static/work/ribao.png',
		// 	event: 'daily'
		// },
		{
			name: '会商',
			icon: '/static/work/hui.png',
			event: 'bussiness'
		},
		{
			name: '通知',
			icon: '/static/work/tongzhi.png',
			event: 'notice'
		},
		// {
		// 	name: '签到',
		// 	icon: '/static/work/qiandao.png',
		// 	event: 'sign'
		// },
		// {
		// 	name: '投票管理',
		// 	icon: '/static/work/piao.png',
		// 	event: 'govote'
		// },
		// {
		// 	name: '政府公告',
		// 	icon: '/static/work/zhengfu.png',
		// 	event: 'gonotice'
		// }
	]
}, {
	name: '人员管理',
	isAdmin: 1,
	list: [{
			name: '人员管理',
			icon: '/static/work/people.png',
			event: 'gomanage'
		},
		{
			name: '人员审批',
			icon: '/static/work/renyuan.png',
			event: 'goapproval'
		}
	]
}, {
	name: '统计分析',
	list: [{
			name: '进山数据',
			icon: '/static/work/jinshan.png',
			event: 'gomountain'
		},
		{
			name: '推广指标',
			icon: '/static/work/tuiguang.png',
			event: 'goextension'
		}
	]
}, {
	name: '审批管理',
	oldHasPark: true,
	list: [{
			name: '预约办证审批',
			icon: '/static/work/cert.png',
			event: 'goappointment'
		},
		{
			name: '扫码认证',
			oldOrgType: 1,
			icon: '/static/work/scan.png',
			event: 'scanRqCode'
		}
	]
}, {
	name: '回执管理',
	oldHasPark: true,
	list: [{
			name: '火情报警',
			icon: '/static/work/huoqing.png',
			event: 'gofirewarn'
		},
		{
			name: '违规举报',
			icon: '/static/work/weigui.png',
			event: 'goviolation'
		},
		{
			name: '紧急救援',
			icon: '/static/work/jinji.png',
			event: 'gosos'
		}
	]
}, {
	name: '其他',
	oldHasPark: true,
	list: [{
			name: '高危人群预警',
			icon: '/static/work/gaowei.png',
			event: 'gorisk'
		},
		{
			name: '二维码下载',
			icon: '/static/work/ma.png',
			event: 'gotwocode'
		},
		// {
		// 	name: '历史',
		// 	icon: '/static/work/history.png',
		// 	event: 'goHistory'
		// }
	]
}]

export default workbenchConfig;
