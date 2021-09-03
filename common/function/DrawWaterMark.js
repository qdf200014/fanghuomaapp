// 水印图层的控制
import store from '@/store/index.js'

// 创建水印图层
export function createMark() {
	// 获取用户的信息用于生成水印
	let userInfo = uni.getStorageSync('appUserInfo') || null
	console.log(userInfo)
	
	if (store.state.drawWaterMark) {
		// 如果水印图层存在不再创建
		console.log('水印图层已经存在，不需要再创建');
		return ;
	}
	
	if (!userInfo) {
		console.log('本次没有获取到用户的信息,无法生成水印，下次获取将在用户登录后进行')
		return 
	}
	
	let markText = ''
	
	for(let i = 0; i < 50; i++) {
		markText += userInfo.userName + ' ' + userInfo.phone.slice(-4) + ' '
	}
	
	let view = new plus.nativeObj.View('WtaerMark',
		{top:'0px',left:'0px',height:'100%',width:'100%',transform:'rotate(90deg)'});
		view.drawRect({color:'rgba(255,0,0,0)'},
				{top:'0px',left:'0px',width:'100%',height:'100%'});
		view.draw([
			{tag:'font',id:'font',text: markText,textStyles:{size:'20px', color: 'rgba(0,0,0,0.006)', align: 'left', margin: '3%', style: 'normal', whiteSpace: 'normal', lineSpacing: '40%', transform:'rotate(90deg)'},position:{top:'0px',left:'0px',width:'100%',height:'100%', transform:'rotate(90deg)'}}
			])
		view.interceptTouchEvent(false);
		// view.setTouchEventRect({top:'0px',left:'0px',width:'100%',height:'50%'});
		// view.addEventListener("click", function(e){
		// 	console.log("点击原生控件："+JSON.stringify(e));
		// }, false);
		view.show();
	console.log('水印创建成功！！！！！！！！')
	store.commit('saveWaterMark', {
		view: view
	})
}

export function hideWaterMark() {
	
}

// 创建一个顶部的通知栏，用于显示通知
export function createTopNotice(text) {
	if (!text) {
		console.log('创建的通知栏消息为空', text);
	}
	if (getApp({allowDefault: true}).globalData.MaintenanceView) {
		getApp({allowDefault: true}).globalData.MaintenanceView.close()
	}
	let view = new plus.nativeObj.View('notice',{top:'35px',left:'0px',height:'44px',width:'100%'})
	// 绘制区域
	view.drawRect({color:'rgba(0, 0, 0, 0.5)'}, {top:'0px',left:'0px',width:'100%',height:'100%'})
	// 绘制文本
	view.drawText(text, {top:'0px',left:'0px',width:'100%',height:'100%'}, {size:'12px',color:'#ffffff', whiteSpace: 'normal'})
	
	view.drawText('×', {right:'0px', height:'30px', width: '30px'}, {size:'22px',color:'#ffffff'})
	
	view.addEventListener("click", (e) => {
		console.log("点击原生控件：" , e)
		closeTopNotice()
	}, false)
	view.show()
	getApp({allowDefault: true}).globalData.MaintenanceView = view
}

// 销毁顶部的通知栏消息
export function closeTopNotice() {
	if (getApp({allowDefault: true}).globalData.MaintenanceView) {
		getApp({allowDefault: true}).globalData.MaintenanceView.close()
	}
	getApp({allowDefault: true}).globalData.MaintenanceView = null
}