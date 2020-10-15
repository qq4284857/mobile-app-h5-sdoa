/**
 * 重写返回事件
 */
var backButtonPress = 0;
mui.back = function(event) {
	backButtonPress++;
	if(backButtonPress > 1) {
		plus.runtime.quit();
	} else {
		mui.toast("再按一次退出应用");
	}
	setTimeout(function() {
		backButtonPress = 0;
	}, 1000);
	return false;
};



var mask = null; //全局蒙板变量
mui.plusReady(function() {
	mui.init();
	document.getElementById("top_title").innerHTML = baseConfig.top_title;
	document.getElementById("app_name").innerHTML = baseConfig.app_name;
	mask = mui.createMask(function() { //点击蒙板回调函数
		document.getElementById("loading").style.visibility = "hidden";
	});
	$("#versionName").html(JSON.parse(JSON.parse(localStorage.getItem("LS.APP.appVersionInfos")).APP).versionName);
	initIndexPage();//初始化登陆后首页配置
	initRememberInfo(); //初始化是否记住密码等配置
	regEvent(); //页面事件注册
	plus.navigator.closeSplashscreen(); //关闭 splash
	autoLogin(); // 自动登录
});


/**
 * 初始化登陆后首页配置
 */
var indexPageId = baseConfig.mobileServerConfig.defaultIndexPageInfo.indexPageId;
var indexPageUrl = baseConfig.mobileServerConfig.defaultIndexPageInfo.indexPageUrl;
//var indexPageParam = baseConfig.defaultIndexPageInfo.indexPageParam;
function initIndexPage(){
	var self = plus.webview.currentWebview();
	var indexPageIdParam = self.indexPageId;
	var indexPageUrlParam = self.indexPageUrl;
	if(indexPageIdParam && indexPageUrlParam){
		indexPageId = indexPageIdParam;
		indexPageUrl = indexPageUrlParam;
	}
}


/**
 * 自动登录
 */
function autoLogin(){
	var isAutoLogin = localStorage.getItem("login.isAutoLogin");
	if(isAutoLogin=="true"){
		goLogin();
	}
}


/**
 * 校验app初始化是否正常
 * 0：初始化失败；1:初始化成功；2：初始化正在进行，还未完成
 */
function valiInitResult(){
	var networkStatus = getCurNetwork();
	if(networkStatus=="未知" || networkStatus=="未连接网络"){
		mui.alert("网络连接异常,请确保您已连接网络。", "提示", "确定", function() {
			
		}, "div");
		return "0";
	}
	
	var appFirstWebview =  plus.webview.getLaunchWebview();
	var dataInitStatus = JSON.parse(localStorage.getItem("LS.APP.dataInitStatus"));
	var checkVersionErrNum = dataInitStatus.checkVersion;
	var cacheDataErrNum = dataInitStatus.cacheData;
	var customDataErrNum = dataInitStatus.customData;
	
	if(checkVersionErrNum==-1 || cacheDataErrNum==-1 || customDataErrNum==-1){ //未初始化，或初始化还在进行中
		mui.fire(appFirstWebview,"initAppData");
		return "2";
	}
	
	if(checkVersionErrNum==-2){
		mui.fire(appFirstWebview,"initAppData",{reInitCheckVersion:"1",reInitAppCacheData:"0",reInitAppCustomData:"0"});
		return "0";
	}
	
	if(checkVersionErrNum>0 || cacheDataErrNum>0 || customDataErrNum>0){
		var eventParam = {};
		if(checkVersionErrNum>0){
			mui.alert("检查版本更新出错，请稍候重试。", "提示", "确定", function() {
				
			}, "div");
		}else{
			mui.alert("APP初始化失败，请稍候重试。", "提示", "确定", function() {
				
			}, "div");
		}
		if(checkVersionErrNum<=0){
			eventParam.reInitCheckVersion = "0";
		}else{
			updateLSInitStatus("checkVersion",-1);
		}
		if(cacheDataErrNum<=0){
			eventParam.reInitAppCacheData = "0";
		}else{
			updateLSInitStatus("cacheData",-1);
		}
		if(customDataErrNum<=0){
			eventParam.reInitAppCustomData = "0";
		}else{
			updateLSInitStatus("customData",-1);
		}
		mui.fire(appFirstWebview,"initAppData",eventParam);
		return "0";
	}
	return "1";
}


/**
 * 登录按钮
 */
var loginWaitingTimes = 0;
function goLogin() {
	var username = document.getElementById("username").value.trim();
	var password = document.getElementById("password").value.trim();

	if(username == "") {
		mui.alert("请先输入帐号再登录", "提示", "确定", function() {
			$("#username").focus();
		}, "div");
		return;
	}
	if(password == "") {
		document.activeElement.blur();
		mui.alert("请先输入密码再登录", "提示", "确定", function() {
			$("#password").focus();
		}, "div");
		return;
	}
	document.activeElement.blur();
	
	mask.show(); //展现蒙板
	document.getElementById("loading").style.visibility = "visible"; //展现加载框
	
	//校验必要信息
	var initResult = valiInitResult();
	if(initResult=="0"){
		document.getElementById("loading").style.visibility = "hidden";
		mask.close();
		return;
	}else if(initResult=="2"){
		if(loginWaitingTimes>100){
			mui.toast("初始化APP超时，请稍候重试！");
			document.getElementById("loading").style.visibility = "hidden";
			mask.close();
			loginWaitingTimes = 0;
		}else{
			setTimeout(function(){
				loginWaitingTimes++;
				goLogin();
			},500);
		}
		return;
	}

	var isRememberPwd = localStorage.getItem("login.isRememberPwd");
	//var salt = "1#2$3%4(5)6@7!poeeww$3%4(5)djjkkldss";
	if(isRememberPwd == "true") {
		if(username != localStorage.getItem("login.username") || password != localStorage.getItem("login.password")) { //更改了用户名或密码
			//password = hex_md5(password + "{" + salt + "}");
		}
	} else {
		//password = hex_md5(password + "{" + salt + "}");
	}

	mui.ajax(baseServiceUrl.url, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		data: {
			serviceCode: "old.edoc.mobile_login",
			//loginType: "ldap",
			loginUserId: username,
			loginPassword: password,
			deviceImeiCode: localStorage.getItem("imei"),
			deviceType: "0", //0手机，1平板
			deviceVersion: localStorage.getItem("LS.APP.appVersionInfos"),
			accountBindDeviceMaxNum: baseConfig.mobileServerConfig.accountBindDeviceMaxNum
		},
		type: "post", //HTTP请求类型
		async: true,
		crossDomain: true, // ios系统必须这样用，否则https无法正确通信
		dataType: "json", //服务器返回json格式数据  
		success: function(data) {
			//console.log(JSON.stringify(data));
			var retObj = {};
			if(!data.status || data.status != "true") {
				retObj = {
					errMsg: (data.errMsg&&data.errMsg!="null")?data.errMsg:"登录失败"
				};
			}else{
				try {
					retObj = JSON.parse(data.result);
				} catch(e) {
					retObj = {
						errMsg: "返回json解析错误。"
					};
				}
			}
			if(retObj && retObj.status == "true") {
				setIsRememberInfo();
				localStorage.setItem("login.username", username);
				localStorage.setItem("login.password", password);

				//console.log(retObj.userInfo.userId);
				localStorage.setItem("userId", retObj.userInfo.userId);
				localStorage.setItem("employeeOrganId", retObj.userInfo.userOrganId);
				localStorage.setItem("username", retObj.userInfo.userName);
				//localStorage.setItem("departmentOrganId", retObj.userInfo.departmentOrganId);
				//localStorage.setItem("departmentOrganName", retObj.userInfo.departmentOrganName);
				//localStorage.setItem("corpOrganId", retObj.userInfo.corporationOrganId);
				//localStorage.setItem("corporationOrganName", retObj.userInfo.corporationOrganName);
				//localStorage.setItem("isAdmin", retObj.userInfo.isAdmin);
				localStorage.setItem("sessionId", retObj.sessionId);
				//localStorage.setItem("sso_token", retObj.sso_token);

				//设置登录cookie 
				plus.navigator.setCookie(baseServiceConfig.baseUrl, "JSESSIONID=" + localStorage.getItem("sessionId"));
				//plus.navigator.setCookie(baseServiceConfig.baseUrl, "JSESSIONID=0000" + localStorage.getItem("sessionId"));

				//开启消息推送
                if(baseConfig.mobileServerConfig.GTConfig && baseConfig.mobileServerConfig.GTConfig.isStartGTService==="1"){
                    startGTService();
                }

				mui.openWindow({
					id: indexPageId,
					url: indexPageUrl,
					show: {
						autoShow:true,
						aniShow: "pop-in"
					},
					waiting: {
						autoShow: false //自动显示等待框，默认为true
					}
				});
				document.getElementById("loading").style.visibility = "hidden";
				mask.close();
			} else {
				if(retObj == null) {
					retObj = {
						errMsg: "登录失败，返回json解析错误。"
					};
				}
				mui.alert(retObj.errMsg, "提示", "确定", function() {

				}, "div");
				document.getElementById("loading").style.visibility = "hidden";
				mask.close();
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert("登录失败，请检查网络是否畅通。", "提示", "确定", function() {

			}, "div");
			document.getElementById("loading").style.visibility = "hidden";
			mask.close();
		}
	});
}










