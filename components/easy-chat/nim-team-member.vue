<template>
	<view class="im-flex-column im-bg-white im-py-3 im-mt-3 im-px-3" @tap="onClick">
		<view class="im-flex im-align-center im-justify-between">
			<text class="im-font-32 im-font-black">{{ $attrs.textTeamTip }}成员</text>
			<view class="flex-row align-center">
				<text class="im-font-light im-font-25">{{ $attrs.detailInfo.memberNum }}人</text>
				<image src="../../static/fireIndex/morehui.png" style="width: 22rpx; height: 22rpx;"></image>
			</view>
			
		</view>
		<view class="im-flex im-align-center im-pt-2">
			<view class="im-flex-column im-mx-1 im-align-center" v-for="item in membersArr" :key="item.account">
				<nim-avatar :account="item.account" style="height: 72rpx;width: 72rpx;"></nim-avatar>
				<text v-if="item.nickInTeam" class="im-font-light im-font-25 im-mt-1 im-text-ellipsis" style="width: 90rpx;">{{ item.nickInTeam }}</text>
			</view>
			
			<!-- 加号 -->
			<image v-if="isShowAddBtn" class="im-mx-1" src="/static/easy-chat/details/create-team@2x.png" mode="aspectFill" style="width: 72rpx;height: 72rpx;" @tap="addMember"></image>
			<!-- 减号 -->
			<image v-if="$attrs.isOwner" class="im-mx-1" src="/static/easy-chat/details/remove-member@2x.png" mode="aspectFill" style="width: 72rpx;height: 72rpx;" @tap="removeMember"></image>
		</view>
	</view>
</template>

<script>
	import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
	
	export default {
		computed: {
			teamMembersObj() {
				return this.$store.getters['initNim/teamMembersObj']
			},
			teamId() {
				return this.$attrs.detailInfo.teamId
			},
			// 当前群组的群成员
			membersArr() {
				if (this.teamMembersObj[this.teamId]) {
					if (this.$attrs.isOwner) {
						return this.teamMembersObj[this.teamId].members.slice(0, 5)
					}
					return this.teamMembersObj[this.teamId].members.slice(0, 7)
				}
				return []
			},
			// 控制是否显示加号
			isShowAddBtn() {
				if (this.$attrs.detailInfo.type === 'advanced' && !this.$attrs.isOwner) {
					// 是高级群 但不是群主 不显示按钮
					return false
				}
				return true
			}
		},
		components: {
			nimAvatar
		},
		mounted() {
			this.$store.dispatch('initNim/nimGetTeamMembers', this.$attrs.detailInfo.teamId)
		},
		methods: {
			onClick(e) {
				console.log('点击群成员');
				this.$emit('seeAll')
				e.stopPropagation()
			},
			addMember(e) {
				// console.log('添加成员')
				this.$emit('addMember')
				e.stopPropagation()
			},
			removeMember(e) {
				// console.log('移除成员')
				this.$emit('removeMember')
				e.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
