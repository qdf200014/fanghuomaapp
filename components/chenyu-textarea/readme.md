### auto_scroll

自适应屏幕剩余高度，组件名：``chenyu-textarea``

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import chenyu_textarea from '@/components/chenyu-textarea/chenyu-textarea.vue'
export default {
    components: {
      "chenyu-textarea":chenyu_textarea
    }
}
```

chenyu-textarea 一般用法

```html
<template>
	<view class="content">
        <!-- 这里是自定义标题栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
        <!-- 这里是除标题栏之外的其他元素，需要给予对应id或class，与ref属性 -->
		<view id="zhanyong" ref="zhanyong" style="text-align: center;width: 100%;">
            <view>占用元素1</view>
            <view>占用元素2</view>
            <view>占用元素3</view>
            <view>占用元素4</view>
			<view class="title">{{title}}</view>
		</view>
		<chenyu-textarea
			:value="content"
			@return_value="return_value"
		>
	</view>
</template>
```

**简单说明：**

因为这个焦点捕获是真的麻烦，所以直接做了一个view和textarea切换的机制，目前测试下来微信小程序没有问题。
样式上根据实际情况进行修改，算是给大家提供一个思路吧
