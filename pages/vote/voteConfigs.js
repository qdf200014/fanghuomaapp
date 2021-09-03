const voteConfigs = [{
	// 创建投票页面相关
	headTitle:'投票',
	title:'活动标题',
	titleIcon:'/static/img/vote/huodong.png',
	introduce:'投票介绍',
	introduceIcon:'/static/img/vote/jieshao.png',
	options:'选项管理',
	startTime:'投票开始时间',
	startTimeIcon:'/static/img/vote/kaishi.png',
	endTime:'投票结束时间',
	endTimeIcon:'/static/img/vote/jieshu.png',
	multiple:{
		title:'是否可多选',
		sub:'(关闭默认为单选)'
	},
	createdBtn:'创建投票',
	createdBtnColor:'#F75252',
	
	// 投票详情页面相关
	name:'投票',
	active:'投票',
	initiater:'投票发起人：',
	rule:'投票规则：',
	info:'投票详情：',
	unit:'票',
	infoBtn:['未开始', '投票', '已投票', '已结束']
},{
	headTitle:'表决',
	title:'表决标题',
	titleIcon:'/static/img/vote/huodong.png',
	introduce:'表决介绍',
	introduceIcon:'/static/img/vote/jieshao.png',
	options:'选项管理',
	startTime:'表决开始时间',
	startTimeIcon:'/static/img/vote/kaishi.png',
	endTime:'表决结束时间',
	endTimeIcon:'/static/img/vote/jieshu.png',
	multiple:{
		title:'是否可多选',
		sub:'(关闭默认为单选)'
	},
	createdBtn:'创建表决',
	createdBtnColor:'#F75252',
	
	name:'表决',
	active:'表决',
	initiater:'表决发起人：',
	rule:'表决规则：',
	info:'表决详情：',
	unit:'票',
	infoBtn:['未开始', '表决', '已表决', '已结束']
},{
	headTitle:'会商结论',
	title:'会商结论标题',
	titleIcon:'/static/img/vote/huodong2.png',
	introduce:'会商结论详情',
	introduceIcon:'/static/img/vote/jieshao2.png',
	privateText:'公开/私密',
	privateIcon:'/static/img/vote/simi2.png',
	privateSub:'私密是指仅该会商成员可见',
	options:'',
	startTime:'会商开始时间',
	startTimeIcon:'/static/img/vote/kaishi2.png',
	endTime:'会商结束时间',
	endTimeIcon:'/static/img/vote/jieshu2.png',
	multiple:null,
	createdBtn:'创建结论',
	createdBtnColor:'#487CF1',
	
	name:'会商结论',
	active:'确认',
	initiater:'结论发起人：',
	rule:'结论规则：',
	info:'',
	unit:'人',
	infoBtn:['未开始', '确认', '已确认', '已结束']
}]

export default voteConfigs;
