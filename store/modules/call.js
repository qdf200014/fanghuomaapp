export default {
	state: {
		// 是否接受邀请
		isAccept: false,
		// 存储当前某个房间拒绝通话的用户列表
		refuseCallList: {},
		userList:[]	// 邀请用户列表
	},
	mutations: {
		updateAccept(state, obj) {
			state.isAccept = obj.flag
		},
		updataRefuseCallList(state, obj) {
			console.log('外婆制冷阿萨达所大所大所大所大所多撒打算打算打算奥术大师大萨达');
			try{
				if (state.refuseCallList[obj.roomId]) {
					state.refuseCallList[obj.roomId].push(obj.userId)
				} else {
					state.refuseCallList[obj.roomId] = [obj.userId]
				}
				state.refuseCallList = Object.assign({}, state.refuseCallList)
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			console.log('更新了updataRefuseCallList', state.refuseCallList);
		},
		
		/**
		 * 邀请用户列表维护
		 */
		clearUserList(state){
			state.userList = [];
		},
		// 添加成员
		setUserList(state, list){
			
			let _list = state.userList;
			
			list.forEach(item=>{
				_list.filter(_item=>_item.userId != item.userId);
			})
			
			state.userList = _list.concat(list);
		}
	},
	actions: {
		
	}
}
