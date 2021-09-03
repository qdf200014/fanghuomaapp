function isSavePassword(){	// 安卓密码存储策略关闭
	if (plus.os.name=='Android') {
		var Webview = plus.android.importClass("android.webkit.WebView");
		var WebSettings = plus.android.importClass("android.webkit.WebSettings");  
		var wv = plus.android.currentWebview();  
		var setting = plus.android.invoke(wv, "getSettings");
		plus.android.invoke(setting, "setSavePassword", false);
		plus.android.invoke(setting, "setAllowFileAccess", false);
	}
}

const mySHA1 = 'A3:75:DB:CC:C6:47:85:CB:91:76:6A:09:D3:DD:AF:A7:00:54:95:14';
const myMD5 = '8A:45:64:5B:5E:56:A6:CF:DE:12:0D:71:3B:9F:60:38';
function isMyApk(){
	//如果是安卓运行环境，校验应用签名是否正确
	if(plus.os.name=='Android'){
	    if(!checkApkSign('SHA1') || !checkApkSign('MD5')){ 
			uni.showModal({
				content: '签名异常，请到各大应用市场下载安装正版APP。',
				showCancel: false,
				confirmText: '关闭',
				success: res => {
					plus.runtime.quit();
				},
				fail: () => {
					plus.runtime.quit();
				}
			});
	    }  
	}      
}           
/**  
 * 检查安卓APK签名  
 * @param {String} type 签名指纹类型:MD5或SHA1  
 */  
function checkApkSign(type){  
    //获取应用上下文  
    var context = plus.android.runtimeMainActivity();  
    var PackageManager = plus.android.importClass("android.content.pm.PackageManager");  
    var packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(),PackageManager.GET_SIGNING_CERTIFICATES||PackageManager.GET_SIGNATURES)  
    var Build = plus.android.importClass("android.os.Build");  
    var signatures = null;  
    //Android 28以后获取包签名信息方法改了  
    if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.P){  
        var signingInfo = packageInfo.plusGetAttribute('signingInfo');  
        signatures = plus.android.invoke(signingInfo,"getApkContentsSigners")  
    }else{  
        signatures = packageInfo.plusGetAttribute('signatures');  
    }  
    if (signatures != null) {  
        var signature;  
        var byteArr;  
        var currentSignature;  
        var md = plus.android.invoke("java.security.MessageDigest","getInstance",type);  
        for (var i in signatures) {  
            byteArr=plus.android.invoke(signatures[i],"toByteArray");  
            plus.android.invoke(md,"update",byteArr);  
            currentSignature = Bytes2HexString(plus.android.invoke(md,"digest")).toUpperCase();
            //根据检验类型，与与你签名文件对应的签名值比对  
            if(("SHA1"==type && strReplace(mySHA1)==currentSignature)  
                || ("MD5"==type && strReplace(myMD5)==currentSignature)){  
                return true;  
            }  

        }  
    } else {  
        console.info("应用未签名");  
    }   
    return false;  
}
function strReplace(str){
	return str.replace(/:/ig,'');
}
//字节数组转十六进制字符串，对负值填坑  
function Bytes2HexString(arrBytes) {  
  var str = "";  
  for (var i = 0; i < arrBytes.length; i++) {  
    var tmp;  
    var num=arrBytes[i];  
    if (num < 0) {  
    //此处填坑，当byte因为符号位导致数值为负时候，需要对数据进行处理  
      tmp =(255+num+1).toString(16);  
    } else {  
      tmp = num.toString(16);  
    }  
    if (tmp.length == 1) {  
      tmp = "0" + tmp;  
    }  
    str += tmp;  
  }  
  return str;  
}

/*安全策略全开启*/
function securityPolicy(){
	//#ifdef APP-PLUS
	isSavePassword();
	// isMyApk();
	//#endif
}

module.exports = {
	securityPolicy
}