<template>
	<view class="textarea_box">
		<textarea v-if="focus_status==true"
			class="textarea"
			:style="{
				width:width,
				height:height
			}"
			:focus="focus"
			:cursor="value.length"
			@blur="blur"
			v-model="value"
		/>
		<view v-if="focus_status==false"
			@tap="view_click"
			class="view_textarea"
			:style="{
				width:width,
				height:height
			}"
		>
			{{value}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"textarea",
		components:{},
		props:{
			width:{
				type:String,
				default:"100%"
			},
			height:{
				type:String,
				default:"100%"
			}
		},
		watch:{
			value(){
				this.$emit("return_value",{
					value:this.value
				})
			}
		},
		data(){
			return {
				value:"",
				focus:false,//是否获取焦点
				focus_status:false,//是否失去焦点
			}
		},
		created() {
			
		},
		beforeDestroy() {
			
		},
		methods:{
			blur(e){
				console.log(e)
				this.focus_status = false
				this.focus = false
			},
			view_click(e){
				console.log(e)
				this.focus_status = true
				this.focus = true
			}
		}
	}
</script>

<style lang="scss">
	.textarea_box{
		.textarea{
			padding: 20rpx 20rpx;
			font-size: 26rpx;
			color: #000000;
		}
		.view_textarea{
			padding: 20rpx 20rpx;
			font-size: 26rpx;
			color: #000000;
			text-align: justify;
		}
	}
</style>
