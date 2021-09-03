<template>
	<view class="im-flex im-align-start im-justify-between im-px-3 im-py-2">
		<nim-avatar :account="msg.from" ></nim-avatar>
		<view class="im-flex-column im-flex-1 im-ml-2">
			<view class="im-flex im-align-center im-justify-between">
				<text class="im-font-28 im-font-light">{{ userObj[msg.from] && userObj[msg.from].nick }}</text>
				<text class="im-font-28 im-font-light">{{ msg.sendtime | filterTime }}</text>
			</view>
			<view class="im-flex im-align-center im-flex-1 im-mt-1">
				<text class="im-font-30 im-font-black-2 im-flex-1 im-flex-wrap">{{ msg.body.msg }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
	import dayjs from 'dayjs'
	import 'dayjs/locale/zh-cn'
	
	export default {
		props: {
			msg: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
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
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
