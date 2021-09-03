<template>
	<view class="im-position-relative easy-chat-img" @tap="gotoPage">
		<image v-if="!imgErr && main_img != defaultUserIcon"  :src="main_img" mode="aspectFill" class="im-round-2 im-flex-1" @error="imageError" lazy-load></image>
		<view v-else class="im-flex-1 im-flex im-justify-center im-align-center im-bg-red-1">
			<text class="im-font-white im-font-28" >{{ userName.slice(-2) }}</text>
		</view>
	</view>
	
</template>

<script>
import config from '@/common/NIM/config.js';
export default {
	props: {
		// 用户的nim账号id
		account: {
			type: [Number, String],
			default: ''
		},
		// 图片的地址
		src: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			defaultUserIcon: config.defaultUserIcon,
			imgErr: false
		};
	},
	computed: {
		userObj() {
			return this.$store.getters['initNim/userObj'];
		},
		main_img() {
			if (this.imgErr) {
				return this.defaultUserIcon;
			}
			if (this.src != '') {
				return this.src;
			}
			if (this.userObj[this.account] && this.userObj[this.account].avatar) {
				return this.userObj[this.account].avatar;
			}
			return this.defaultUserIcon;
		},
		userUID() {
			return this.$store.getters['initNim/userUID']
		},
		userName() {
			return this.userObj[this.account] && this.userObj[this.account].nick || ''
		}
	},
	mounted() {
		// console.log('当前传入的账号id', this.account);
		if (this.account != '' && !this.userObj[this.account]) {
			this.searchUser()
		}
	},
	methods: {
		imageError(e) {
			console.error('imageError', e);
			this.imgErr = true;
		},
		// 搜索用户
		gotoPage(e) {
			
			if (this.account == this.userUID) {
				return ;
			}
			
			uni.navigateTo({
				url:'/pages/addrBook/personalPage?userId=' + this.account + '&sourceType=0'
			})
			e.stopPropagation()
		},
		searchUser() {
			this.$store.dispatch('initNim/nimGetUser', this.account)
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
