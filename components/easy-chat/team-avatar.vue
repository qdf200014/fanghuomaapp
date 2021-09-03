<template>
	<view class="im-position-relative easy-chat-img" @tap="onClick">
		<image :src="main_img" mode="aspectFill" class="im-flex-1 im-round-full" @error="imageError" lazy-load></image>
		<image v-if="isAdvanced" class="im-position-absolute im-right-0 im-top-0" src="/static/easy-chat/team/huishangbiaoqian@2x.png" mode="aspectFill" style="width: 54rpx;height: 32rpx;"></image>
	</view>
</template>

<script>
import config from '@/common/NIM/config.js';
export default {
	props: {
		// 用户的nim账号id
		teamId: {
			type: [Number, String],
			default: ''
		},
		// 图片的地址
		src: {
			type: String,
			default: ''
		},
		// 是否展示会商的标志
		isShowAdvancedFlag: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			defaultGroupIcon: config.defaultGroupIcon,
			defaultAdvancedIcon: config.defaultAdvancedIcon,
			imgErr: false
		};
	},
	computed: {
		teamObj() {
			return this.$store.getters['initNim/teamObj'];
		},
		// 判断是不是高级群
		isAdvanced() {
			return this.isShowAdvancedFlag && this.teamObj[this.teamId].type === 'advanced'
		},
		main_img() {
			if (this.imgErr) {
				if (this.teamObj[this.teamId] && this.teamObj[this.teamId].type === 'advanced') {
					return this.defaultAdvancedIcon
				} else {
					return this.defaultGroupIcon
				}
			}
			if (this.src != '') {
				return this.src;
			}
			if (this.teamObj[this.teamId] && this.teamObj[this.teamId].avatar) {
				return this.teamObj[this.teamId].avatar;
			}
			return this.defaultGroupIcon;
		}
	},
	mounted() {
		// console.log('当前传入的账号id', this.teamId);
	},
	methods: {
		imageError(e) {
			console.error('imageError', e);
			this.imgErr = true;
		},
		onClick(e) {
			this.$emit('onClick')
			e.stopPropagation()
		}
	}
};
</script>

<style scoped>
.easy-chat-img {
	width: 90rpx;
	height: 90rpx;
}
</style>
