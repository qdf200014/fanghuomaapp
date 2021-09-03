<template>
	<view class="im-position-relative">
		<image src="/static/easy-chat/other/tianjiaanniu@2x.png" @tap="onClick" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
		<!-- <text class="im-font-38 im-font-light" @tap="onClick">+</text> -->

		<!-- 弹出菜单 -->
		<view
			v-if="isShowPopup"
			class="im-position-fixed im-flex-1 im-top-0 im-bottom-0 im-right-0 im-left-0 im-flex-column"
			@tap="() => {
					isShowPopup = false;
				}">
			<view class="im-flex-column im-position-fixed im-bg-black-2 im-px-2 im-py-2 im-round-1" :style="popupStyle" style="max-width: 300rpx;">
				<navigator url="/pages/addrBook/index?sourceType=createNormalTeamImmediate" class="im-flex im-position-relative im-align-center">
					<image src="/static/easy-chat/other/chuangjianqunliao@2x.png" mode="aspectFill" style="width: 35rpx;height: 35rpx;"></image>
					<text class="im-font-32 im-font-white im-ml-2">创建群聊</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		onClick(e) {
			console.log(e);
			this.isShowPopup = true;
			this.$emit('onClick');
		}
	},
	props: {
		position: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			isShowPopup: false
		};
	},
	computed: {
		popupStyle() {
			let style = '';
			if (this.position && this.position.top) {
				style += `top: ${this.position.top + 30}px;`;
				style += `right: 10px;`;
			}
			return style;
		}
	},
	mounted() {}
};
</script>

<style></style>
