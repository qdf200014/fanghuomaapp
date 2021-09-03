<template>
	<view class="im-flex im-flex-wrap im-justify-center im-align-center im-my-3 im-px-5">
		<view class="im-flex im-align-center im-text-center im-bg-white im-round-1 im-p-1">
			<text class="im-text-center im-font-28 im-font-light im-flex im-flex-wrap" style="max-width: 620rpx;">{{ content }}</text>
			<text v-if="isShowLink" class="im-font-28 im-font-blue im-ml-2" @tap="onLinkClick">点击进行查看</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	mounted() {
		
	},
	computed: {
		// 是否显示 跳转链接
		isShowLink() {
			let type = this.tipContent.type
			if (type === 'dailyPraise' || type === 'dailyComment' || type === 'dailyMention' ) {
				return true
			}
			return false
		},
		tipContent() {
			return JSON.parse(this.$attrs.msg.tip)
		},
		content() {
			let text = '提醒消息'
			let msg = this.$attrs.msg
			if (this.isJSON(msg.tip)) {
				let tipContent = JSON.parse(msg.tip)
				let type = tipContent.type
				switch (type) {
					case 'deleteMsg':
						if (msg.flow === 'out') {
							text = '你撤回了一条消息'
						} else {
							text = `${msg.fromNick}撤回了一条消息`
						}
						break;
					case 'dailyPraise':
						if (msg.flow === 'out') {
							text = '你点赞了TA的日报'
						} else {
							text = `${msg.fromNick}点赞了您的日报`
						}
						break;
					case 'dailyComment':
						if (msg.flow === 'out') {
							text = '你评论了TA的日报'
						} else {
							text = `${msg.fromNick}评论了您的日报`
						}
						break;
					case 'dailyMention':
						if (msg.flow === 'out') {
							text = `我在评论${tipContent.data.dailyOwner}的日报时提到了TA`
						} else {
							text = `${msg.fromNick}在评论${tipContent.data.dailyOwner}的日报时提到了我`
						}
						break;
					case 'cancelCallp2p' :
						text = `${msg.fromNick} 取消了${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话`
						break;
					case 'endCallp2p' :
						text = `${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话结束，通话时长：${tipContent.data.time}`
						break;
					case 'rejectCallp2p' :
						text = `${msg.fromNick} 拒绝了本次${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话`
						break;
					case 'sendCallteam':
						text = `${msg.fromNick} 发起了${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话`
						break;
					case 'cancelCallteam':
						text = `${msg.fromNick} 取消了${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话`
						break;
					case 'endCallteam':
						text = `${msg.fromNick} 的${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话结束，通话时长：${tipContent.data.time}`
						break;
				}
			}
			return text
		}
	},
	methods: {
		onLinkClick(e) {
			e.stopPropagation()
			let type = this.tipContent.type
			if (type === 'dailyPraise' || type === 'dailyComment' || type === 'dailyMention' ) {
				// uni.showToast({
				// 	title: `跳转到${this.tipContent.data.id}`
				// })
				if(this.tipContent.data.dailyType==1){
					uni.navigateTo({
						url: `/pages/tabbar-1-detail/forestDetail/forestDetail?dailyId=${this.tipContent.data.id}`
						// url: '../forestDetail/forestDetail?dailyId='+item.dailyId
					})
				}else if(this.tipContent.data.dailyType==0){
					uni.navigateTo({
						url: `/pages/tabbar-1-detail/dailynewsDetail/dailynewsDetail?dailyId=${this.tipContent.data.id}`
						// url: '../dailynewsDetail/dailynewsDetail?dailyId='+item.dailyId
					})
				}
			}
		},
		// 判断一个字符串是否为 json格式
		isJSON(str) {
		    if (typeof str == 'string') {
		        try {
		            var obj=JSON.parse(str);
		            if(typeof obj == 'object' && obj ){
		                return true;
		            }else{
		                return false;
		            }

		        } catch(e) {
		            console.log('error：'+str+'!!!'+e);
		            return false;
		        }
		    }
		}
	}
}
</script>

<style></style>
