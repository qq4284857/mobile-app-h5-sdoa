/**
 * 重写返回方法
 */
mui.back = function(event) {
	mui.confirm('确认要现在退出应用吗?', '退出确认', ['确定','取消'], function(e) { 
        if (e.index == 0) {  
         	logout("2");
        }
   	});  
};

mui.plusReady(function(){
	//注销登录（供其他页面调用）
	window.addEventListener("logout2Login",function(event){
		logout("1");
	});
	//注销登录并退出应用（供其他页面调用）
	window.addEventListener("logout2Desktop",function(event){
		logout("2");
	});
	
	//自动开启百度鹰眼数据采集服务
	if(baseConfig.mobileServerConfig.yingyanConfig.isStartYingyanService=="1"){
		//初始化手机号信息（注意兼容没有手机号的情况）
		initPhoneNumInfo();
		if(baseConfig.mobileServerConfig.yingyanConfig.isNeedOtherCustomData=="1"){
			initYingyanCustomData();//初始化业务系统自定义字段
		}else{
			setTimeout(function(){
		        startYingyanOnIndexPage();
			},10*1000);
		}
	}
});

/***
 * 退出
 * 参数way，1表示注销用户，然后跳到login页面，2表示退出APP
 * ***/
function logout(way){
	plus.nativeUI.showWaiting("正在注销，请稍候",{back:"none"});
	mui.ajax(baseServiceUrl.url, {
		data:{
			serviceCode : "old.edoc.mobile_logout",
			BSPSessionId : localStorage.getItem("sso_token"),
			deviceImeiCode: localStorage.getItem("imei")
		},
		dataType: 'json',
		type: 'post',
		async: false,
		success: function(data) {
			//console.log("返回的内容： ---" + JSON.stringify(data.result));
			var retObj = JSON.parse(data.result);
			if(retObj.status && "true" == retObj.status){
				clearAndQuit(way);
			}else{
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert(retObj.errMsg, function(e) {}, baseConfig.alerttitle, "确定");
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert("退出失败,请检查网络是否畅通", function(e) {}, baseConfig.alerttitle, "确定");	
		}
	});
}

/***
 * 参数way，1表示注销用户，然后跳到login页面，2退出APP
 * */
function clearAndQuit(way){
	localStorage.removeItem("username");
	localStorage.removeItem("corpOrganId");
	localStorage.removeItem("sso_token");
	localStorage.removeItem("isAdmin");
	localStorage.removeItem("userId");
	localStorage.removeItem("corporationOrganName");
	localStorage.removeItem("departmentOrganName");
	localStorage.removeItem("departmentOrganId");
	localStorage.removeItem("employeeOrganId");
	var exp = new Date();
	exp.setTime(exp.getTime()-1);
	plus.navigator.setCookie(baseServiceConfig.baseUrl,"sso_token="+localStorage.getItem("sso_token")+";expires="+exp.toGMTString()+";");
	
	if(way == "1"){
		localStorage.removeItem("login.username");
		localStorage.removeItem("login.password");
		localStorage.removeItem("login.isRememberPwd");
		localStorage.removeItem("login.isAutoLogin");
		
		var loginPageId = baseConfig.mobileServerConfig.defaultLoginPageInfo.loginPageId;
		if(baseConfig.mobileServerConfig.isUseCustomLoginAndIndex=="1"){
			var appCustomDataList = JSON.parse(localStorage.getItem("LS.APP.appCustomDataList"));
			if(appCustomDataList){
				for(var i=0;i<appCustomDataList.length;i++){
					var miniAppInfo = appCustomDataList[i];
					if(miniAppInfo.APP_CODE!="APP"){
						continue;
					}
					var APP_PAGE_ID = miniAppInfo.APP_PAGE_ID;
					var APP_PAGE_URL = miniAppInfo.APP_PAGE_URL;
					if(APP_PAGE_ID && APP_PAGE_URL){
						loginPageId = APP_PAGE_ID;
					}
					break;
				}
			}
		}
		
		var array = plus.webview.all();
		for(var i=1;i<array.length;i++){
			if(array[i].id==plus.webview.currentWebview().id || array[i].id==activeTabId || array[i].id==loginPageId){
				continue;
			}
			array[i].close("none");
		}
		
		localStorage.setItem("LS.APP.dataInitStatus", JSON.stringify({
			checkVersion: -1, //-1:正在进行初始化，0:初始化成功（失败次数为0），其他数值：初始化失败次数。
			cacheData: -1,
			customData: -1
		}));
		
		plus.webview.getWebviewById(loginPageId).reload();
		
		plus.nativeUI.closeWaiting();
		if(activeTabId){
			var activeWebview = plus.webview.getWebviewById(activeTabId);
			if(activeWebview){
				activeWebview.close("none");
			}
		}
		plus.webview.currentWebview().close("none");
	}else{
		plus.nativeUI.closeWaiting();
		plus.runtime.quit();
	}
}


/**
 * 启动鹰眼服务
 */
function startYingyanOnIndexPage(){
	plus.Atom.startYingYanService([], function(result) {
        //mui.toast("百度鹰眼服务："+JSON.stringify(result));
    }, function(result) {
    	//mui.toast("百度鹰眼服务："+JSON.stringify(result));
    });
}

/**
 * 初始化当前手机号信息，注意兼容移动设备没有手机号的情况
 */
function initPhoneNumInfo(){
	var curPhoneNum = "";
	localStorage.setItem("mobileServer.common.phoneNum",curPhoneNum);
}

/**
 * 初始化业务系统自定义字段
 */
function initYingyanCustomData(){
	var yingyanCustomData = {};
	mui.ajax(baseServiceUrl.url, {
		data: {
			serviceCode: "xxxxx"
		},
		dataType: 'json',
		type: 'post',
		async: true,
		crossDomain: false,
		success: function(datas) {
			//console.log(JSON.stringify(datas));
	 		if(datas.status!="true"){
				mui.toast("鹰眼业务系统自定义字段初始化失败："+datas.errMsg);
				return;
	 		}
	 		var dataResult = JSON.parse(datas.result);
	 		//console.log(JSON.stringify(dataResult));
	 		if(dataResult.status!="true"){
	 			mui.toast("鹰眼业务系统自定义字段初始化失败");
				return;
	 		}
	 		
	 		
	 		
            localStorage.setItem("mobileServer.yingyan.customData",JSON.stringify(yingyanCustomData))
            startYingyanOnIndexPage();
		},
		error: function(xhr, type, errorThrown) {
			mui.toast("鹰眼业务系统自定义字段初始化失败");
		}
	});
}
