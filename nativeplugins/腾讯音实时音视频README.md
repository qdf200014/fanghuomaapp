# 腾讯实时音视频(TRTC)uniapp原生插件接口使用说明



## 一、实时音视频(TRTC)插件


### 1. 获取插件对象

```
var TRTC = uni.requireNativePlugin('TX-TRTC');
```


### 2. 基础方法


#### (1). 检查相机和麦克风权限

```
TRTC.checkPermission(function(res){
    console.log(res);
    if (res.code == 0) {
        //授权成功
    } else {
        //授权失败res.data
    }
});
```

#### (2). TRTC各种状态通知回调

更多接口参考 TRTCCloudListener回调接口类，

https://liteav.sdk.qcloud.com/doc/api/zh-cn/group__TRTCCloudListener__android.html#classcom_1_1tencent_1_1trtc_1_1TRTCCloudListener

```
TRTC.setListener(function(res){
    console.log(res);
    if (res.type == "onEnterRoom") {
        //进入房间回调
        var result = res.data;
    } else if (res.type == "onExitRoom") {
        //离开房间
        var reason = res.data;
    } else if (res.type == "onRemoteUserEnterRoom") {
        //有用户加入当前房间
        var userId = res.data;
    } else if (res.type == "onRemoteUserLeaveRoom") {
        //有用户离开当前房间
        var userId = res.data;
    } else if (res.type == "onUserVideoAvailable") {
        //远端用户是否存在可播放的主路画面（一般用于摄像头）
        var userId = res.data.userId;
        var available = res.data.available;
    }
});
```


### 3. 房间相关接口函数


#### (1). 进入房间

更多进房属性参数参考 TRTCParams类

https://liteav.sdk.qcloud.com/doc/api/zh-cn/group__TRTCCloudDef__android.html#a1751af68516425e5556e2057d0c90915

```
var params = {
    sdkAppId:1400278009,//腾讯appId
    roomId:"1234",//房间id
    userId:"hhh1",//用户id
    userSig:""//当前 userId 对应的验证签名，相当于使用云服务的登录密码
};//进房参数
var scene = 0;//视频通话 = 0;视频互动直播 = 1;语音通话 = 2;语音互动直播 = 3;
TRTC.enterRoom(params, scene);
```

#### (2). 离开房间

```
TRTC.exitRoom();
```

#### (3). 切换角色，仅适用于直播场景

```
var role = 20;//20主播 21 观众
TRTC.switchRole(role);
```

#### (4). 请求跨房通话（主播 PK）

```
var data = {
    roomId:"1234",
    userId:"hhh2"
};
var param = JSON.stringify(data);//JSON 格式的参数，要求至少包含两个字段：
TRTC.ConnectOtherRoom(param);
```

#### (5). 退出跨房通话

```
TRTC.DisconnectOtherRoom();
```

#### (6). 切换房间

更多进房属性参数参考 TRTCSwitchRoomConfig类

https://liteav.sdk.qcloud.com/doc/api/zh-cn/group__TRTCCloudDef__android.html#a1b79e0e45a5f137df2e1995af7c0885c

```
TRTC.switchRoom({
    roomId:"1234"
});
```


### 4. CDN 相关接口函数


#### (1). 开始向腾讯云的直播 CDN 推流

```
var streamId = "";//自定义流 ID
var streamType = 0;//流类型 0:主画面视频流 2:辅流（屏幕分享
TRTC.startPublishing(streamId, streamType);
```

#### (2). 停止向腾讯云的直播 CDN 推流

```
TRTC.stopPublishing();
```

#### (3). 开始向友商云的直播 CDN 转推

```
TRTC.startPublishCDNStream({
    appId: 1400278009,//腾讯云 AppID
    bizId:1000,//腾讯云直播 bizid 
    url:""//旁路转推的 URL
});
```

#### (4). 停止向非腾讯云地址转推

```
TRTC.stopPublishCDNStream();
```

#### (5). 设置云端的混流转码参数

更多进房属性参数参考 TRTCTranscodingConfig类

https://liteav.sdk.qcloud.com/doc/api/zh-cn/group__TRTCCloudDef__android.html#classcom_1_1tencent_1_1trtc_1_1TRTCCloudDef_1_1TRTCTranscodingConfig

```
TRTC.startPublishCDNStream({
    appId: 1400278009,//腾讯云 AppID
    bizId:1000//腾讯云直播 bizid 
});
```


### 5. 视频相关接口函数




## 二、实时音视频(TRTC)视频标签


#### 1. 云点播播放器自定义标签，当前嵌入标签页面必须nvue

```  
<trtc_video_view ref="videoView" style="width: 100%;height: 500px;"></trtc_video_view>    
``` 

#### 2. 获取云点播播放器自定义标签对象

注意：必须再mounted()回调之后调用，不能再onload()里调用

```
var videoView = this.$refs. videoView;
```

#### 3. 开启摄像头预览

```
var frontCamera = true;//true:前置摄像头 false:后置摄像头
videoView.playLocalVideo(frontCamera);
``` 


#### 4. 停止摄像头预览

```
videoView.stopLocalPreview();
``` 

#### 5. 开始拉取并显示指定用户的远端画面

```
var userId = "hhh1";//指定远端用户的 userId
var streamType = 0;//0:高清大画面 1:低清小画面 2:辅流（屏幕分享）
videoView.startRemoteView(userId, streamType);
``` 

#### 6. 停止显示远端视频画面，同时不再拉取该远端用户的视频数据流

```
var userId = "hhh1";//指定远端用户的 userId
var streamType = 0;//0:高清大画面 1:低清小画面 2:辅流（屏幕分享）
videoView.stopRemoteView(userId, streamType);
``` 



## 三、实时音视频(TRTC)设备管理接口插件

注：调门设备管理相关接口之前，先调用TRTC.getDeviceManager()接口获取设备管理理器对象才能调用设备管理接口设置


### 1. 获取设备管理接口插件对象

```
var Device = uni.requireNativePlugin('TX-Device');
```

### 2. 切换摄像头

```
var frontCamera = true;//true:前置摄像头 false:后置摄像头
var ret = Device.switchCamera(frontCamera);//0：成功 负数：失败
```

### 3. 是否使用前置摄像头

```
var ret = Device.isFrontCamera();//true:前置摄像头 false:后置摄像头
```

### 4. 获取摄像头的缩放因子

```
var zoomRatio = Device.getCameraZoomMaxRatio();
```

### 5. 设置摄像头缩放倍数

```
var zoomRatio = 1;//缩放倍数
var ret = Device.setCameraZoomRatio(zoomRatio);//0 成功 负数 失败
```

### 6. 设置是否自动识别人脸位置

```
var enabled = true;//开启；false：关闭，默认值：true
var ret = Device.enableCameraAutoFocus(enabled);//0：成功 负数：失败
```

### 7. 查询是否支持自动识别人脸位置

```
var ret = Device.isAutoFocusEnabled();//true:支持 false:不支持
```

### 8. 设置摄像头焦点

```
var x = 50;//x	对焦位置 x 坐标
var y = 50;//y	对焦位置 y 坐标
var ret = Device.setCameraFocusPosition(x, y);//0：成功 负数：失败
```

### 9. 开关闪光灯

```
var enable = true;//开启；false：关闭，默认值：false
var ret = Device.enableCameraTorch(enable);//true:成功 false:失败
```

### 10. 设置通话时使用的系统音量类型

注：
1. 需要在调用 startLocalAudio() 之前调用该接口。
2. 如无特殊需求，不推荐您自行设置，您只需通过 enterRoom 设置好适合您的场景，SDK 内部会自动选择相匹配的音量类型。

```
var type = 0;//系统音量类型，如无特殊需求，不推荐您自行设置。
var ret = Device.setSystemVolumeType(type);//0：成功 负数：失败
```

### 11. 设置音频路由，微信和手机 QQ 视频通话功能的免提模式就是基于音频路由实现的。 一般手机都有两个扬声器，一个是位于顶部的听筒扬声器，声音偏小；一个是位于底部的立体声扬声器，声音偏大。 设置音频路由的作用就是决定声音使用哪个扬声器播放。

```
var route = 0;//音频路由，即声音由哪里输出（0:扬声器、1:听筒），默认值：0:扬声器
var ret = Device.setAudioRoute(route);//0：成功 负数：失败
```



## 四、实时音视频(TRTC)美颜插件

注：调门美颜相关接口之前，先调用TRTC.getBeautyManager()接口获取美颜管理器对象才能调用美颜接口设置美颜


### 1. 获取美颜插件对象

```
var Beauty = uni.requireNativePlugin('TX-Beauty');
```

### 2. 设置美颜类型

```
var beautyStyle = 0;//美颜风格.三种美颜风格：0 ：光滑 1：自然 2：朦胧
Beauty.setBeautyStyle(beautyStyle);
```

### 3. 设置指定素材滤镜特效

```
//图片base64(不带头)或图片平台的原生路径
var image = plus.io.convertLocalFileSystemURL("uniapp路径");//指定素材，即颜色查找表图片。必须使用 png 格式 
Beauty.setFilter(image);
```

### 4. 设置滤镜浓度

在美女秀场等应用场景里，滤镜浓度的要求会比较高，以便更加突显主播的差异。 我们默认的滤镜浓度是0.5，如果您觉得滤镜效果不明显，可以使用下面的接口进行调节。

```
var strength = 0.5;//从0到1，越大滤镜效果越明显，默认值为0.5
Beauty.setFilterStrength(strength);
```

### 5. 设置美颜级别

```
var beautyLevel = 7;//美颜级别，取值范围0 - 9； 0表示关闭，1 - 9值越大，效果越明显。
Beauty.setBeautyLevel(beautyLevel);
```

### 6. 设置美白级别

```
var whitenessLevel = 4;//美白级别，取值范围0 - 9； 0表示关闭，1 - 9值越大，效果越明显
Beauty.setWhitenessLevel(whitenessLevel);
```

### 7. 开启清晰度增强

```
var enable = true;//开启清晰度增强；false：关闭清晰度增强。默认值：true
Beauty.enableSharpnessEnhancement(enable);
```

### 8. 设置红润级别

```
var ruddyLevel = 1;//红润级别，取值范围0 - 9； 0表示关闭，1 - 9值越大，效果越明显
Beauty.setRuddyLevel(ruddyLevel);
```


