# 悬浮窗uniapp原生插件接口使用说明



#### 1. 获取插件对象

```
var FW = uni.requireNativePlugin('Float-Window');
```


#### 2. 事件监听回调
```
FW.setEventCallback(function(res){
    console.log(res);
    if (res.type == "onClickFloatWindow") {//点击悬浮窗
	var tag = res.tag;//悬浮窗口唯一标记
    } else if (res.type == "onClick") {//点击悬浮窗里控件
	var tag = res.tag;//悬浮窗口唯一标记
        var id = res.id;//悬浮窗里控件id
    } else if (res.type == "onLongClick") {//长按悬浮窗里控件
	var tag = res.tag;//悬浮窗口唯一标记
        var id = res.id;//悬浮窗里控件id
    }
});
``` 


#### 3. 显示悬浮窗，可以显示多个，用tag区分标记

```  
var definition = 0;
var fileName = this.title + "-" + definition;
FW.showFloatWindo({
    tag:"TRTC_FW_TAG", //悬浮窗口唯一标记
    x:0, //悬浮窗x位置
    y:160,//悬浮窗y位置
    width:60,//悬浮窗宽度
    height:60,//悬浮窗高度
    views:[//悬浮窗子控件配置
        {
            id:"bg_layer",//控件唯一标识
	    type:"layer",//控件类型 text=文本控件 image=图片控件 layer=层控件
	    backgroundColor:"#FFFFFF",//背景颜色
	    cornerRadius:12,//圆角半径
	    width:-1,//控件宽度 -1铺满父控件
	    height:-1//控件高度，-2根据内容显示高度
	},{
	    id:"phone_img_view",//控件唯一标识
	    type:"image",//控件类型 text=文本控件 image=图片控件 layer=层控件
	    src:"http://xxxx/xx.png",//图片路径 原生本地路径或网络url
	    width:32,//控件宽度
	    height:32,//控件高度
	    layoutGravity:1|48,//控件对齐位置 LEFT=3;TOP=48;RIGHT=5;BOTTOM=80;CENTER=17;CENTER_HORIZONTAL=1;CENTER_VERTICAL=16;
	    marginTop:6//marginRight右边距 marginLeft左边距 marginTop顶部边距 marginBottom底部边距
	},{
	    id:"time_text_view",//控件唯一标识
	    type:"text",//控件类型 text=文本控件 image=图片控件 layer=层控件
	    width:54,//控件宽度
	    height:24,//控件高度
	    layoutGravity:1|80,//控件对齐位置 LEFT=3;TOP=48;RIGHT=5;BOTTOM=80;CENTER=17;CENTER_HORIZONTAL=1;CENTER_VERTICAL=16;
	    marginBottom:6,//marginBottom底部边距,注：相对对齐位置的边距，不是对上面控件的边距
	    //marginRight:12,//marginRight右边距 marginLeft左边距 marginTop顶部边距 marginBottom底部边距
	    text:"00:00",//文本
	    textColor:"#FF0000",//文本颜色
	    textSize:14,//文本大小
	    textAlignment:"center"//文本对齐方式 left左对齐 center居中 right右对齐
	}
    ]
});
```  


#### 4. 关闭悬浮窗

```  
var tag = "TRTC_FW_TAG";//悬浮窗口唯一标记
FW.closeFloatWindow(tag);
```  


#### 5. 关闭所有悬浮窗

```  
FW.closeAllFloatWindows();
```  


#### 6. 悬浮窗是否显示

```  
var tag = "TRTC_FW_TAG";//悬浮窗口唯一标记
var ret = FW.isShowFloatWindow(tag);
```  


#### 7. 设置悬浮窗子控件

```  
var tag = "TRTC_FW_TAG";//悬浮窗口唯一标记
FW.closeFloatWindow(tag, {
    id:"time_text_view",//控件唯一标识
    text:"00:01"//文本
    //更多属性设置参考显示悬浮窗设置，根据控件id修改属性值
});
```  


#### 8. 设置悬浮窗多个子控件

```  
var tag = "TRTC_FW_TAG";//悬浮窗口唯一标记
FW.closeFloatWindows(tag, [{
    id:"time_text_view",//控件唯一标识
    text:"00:01"//文本
    //更多属性设置参考显示悬浮窗设置，根据控件id修改属性值
}]);
```  
