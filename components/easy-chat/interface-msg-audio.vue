<template>
	<view class="im-flex im-align-start im-justify-between im-px-3 im-py-2">
		<nim-avatar :account="msg.from" ></nim-avatar>
		<view class="im-flex-column im-flex-1 im-ml-2">
			<view class="im-flex im-align-center im-justify-between">
				<text class="im-font-28 im-font-light">{{ userObj[msg.from] && userObj[msg.from].nick }}</text>
				<text class="im-font-28 im-font-light">{{ msg.sendtime | filterTime }}</text>
			</view>
			<view class="im-flex im-align-center im-flex-1 im-mt-1">
				<chat-item-audio :msg="audioMsg"></chat-item-audio>
			</view>
		</view>
	</view>
</template>

<script>
	import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
	import chatItemAudio from '@/components/easy-chat/chat-item-audio.vue'
	import dayjs from 'dayjs'
	import 'dayjs/locale/zh-cn'
	
	export default {
		components: {
			chatItemAudio,
			nimAvatar
		},
		filters: {
			filterTime(time) {
				return dayjs(time).locale('zh-cn').format('A HH:mm')
			}
		},
		computed: {
			userObj() {
				return this.$store.getters['initNim/userObj']
			},
			audioMsg() {
				let obj = {
					file: {}
				}
				
				obj.file = this.msg.body
				
				return Object.assign({}, obj)
			}
		},
		data() {
			return {
			}
		},
		props: {
			msg: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		mounted() {
		}
	}
</script>

<style>
</style>
