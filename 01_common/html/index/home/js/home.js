/**
 * 常用功能配置入口
 */
var commonFuncs4IndexPage = [
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"我的待办",
		"FUNC_LOGO_URL":"../images/daiban.png",
		"FUNC_PAGE_ID":"12_edoc/html/tasklist/daiban/daiban.html",
		"FUNC_PAGE_URL":"../../../../12_edoc/html/tasklist/daiban/daiban.html",
		"FUNC_PAGE_PARAMJSON":"",
		"FUNC_PAGE_NUNBER":1
	},
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"我的已办",
		"FUNC_LOGO_URL":"../images/check-common-new.png",
		"FUNC_PAGE_ID":"12_edoc/html/tasklist/yiban/yiban_list.html",
		"FUNC_PAGE_URL":"../../../../12_edoc/html/tasklist/yiban/yiban_list.html",
		"FUNC_PAGE_PARAMJSON":"",
		"FUNC_PAGE_NUNBER":0
		
	},
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"我的待阅",
		"FUNC_LOGO_URL":"../images/daiyue.png",
		"FUNC_PAGE_ID":"12_edoc/html/tasklist/daiyue/daiyue_list.html",
		"FUNC_PAGE_URL":"../../../../12_edoc/html/tasklist/daiyue/daiyue_list.html",
		"FUNC_PAGE_PARAMJSON":JSON.stringify({
			"readStatus": "0"
		}),
		"FUNC_PAGE_NUNBER":2
	},
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"我的已阅",
		"FUNC_LOGO_URL":"../images/check-common-recordquery.png",
		"FUNC_PAGE_ID":"12_edoc/html/tasklist/daiyue/daiyue_list.html",
		"FUNC_PAGE_URL":"../../../../12_edoc/html/tasklist/daiyue/daiyue_list.html",
		"FUNC_PAGE_PARAMJSON":JSON.stringify({
			"readStatus": "1"
		}),
		"FUNC_PAGE_NUNBER":0
	}/* ,
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"老版代码",
		"FUNC_LOGO_URL":"../images/law-common-query.png",
		"FUNC_PAGE_ID":"12_edoc/html/edoc/tasklist/index/index.html",
		"FUNC_PAGE_URL":"../../../../12_edoc/html/edoc/tasklist/index/index.html",
		"FUNC_PAGE_PARAMJSON":""
	},
	{
		"APP_CODE":"EDOC_SDOA",
		"FUNC_NAME":"附件",
		"FUNC_LOGO_URL":"../images/law-common-query.png",
		"FUNC_PAGE_ID":"01_common/html/demo/fileupload/fileuploadDemo.html",
		"FUNC_PAGE_URL":"../../../../01_common/html/demo/fileupload/fileuploadDemo.html",
		"FUNC_PAGE_PARAMJSON":""
	} */
]

/**
 * 注销当前登录用户，跳转到登录页
 */
function logout2Login(){
	var btnArray = ['确定','返回'];
	mui.confirm('确认现在要注销当前用户吗?', '注销提示', btnArray, function(e) { 
		if (e.index == 0) {
			var loginPageId = baseConfig.mobileServerConfig.defaultLoginPageInfo.loginPageId;
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
			
			var indexPageId = baseConfig.mobileServerConfig.defaultIndexPageInfo.indexPageId;
			var loginPageWebview = plus.webview.getWebviewById(loginPageId);
			if(loginPageWebview){
				var indexPageIdParam = loginPageWebview.indexPageId;
				var indexPageUrlParam = loginPageWebview.indexPageUrl;
				if(indexPageIdParam && indexPageUrlParam){
					indexPageId = indexPageIdParam;
				}
			}
			
			var indexPageWebview = plus.webview.getWebviewById(indexPageId);
			mui.fire(indexPageWebview,"logout2Login");
		}
	});
}


/**
 * 跳转到搜索结果页面
 */
function jump2SearchResultPage(){
	if(baseConfig.mobileServerConfig.isUseMiniUpdateMode!="1"){
		doJump2SearchResultPage();
		return;
	}
	var APP_CODE = "EDOC_SDOA";
	var appInfo = getAppInfoByAppCode(APP_CODE);
	if(!appInfo){
		mui.toast("尚未配置标识为【"+APP_CODE+"】的小应用，请联系管理员配置。");
		return;
	}
	
	var updateMiniAppCodeList = [];
	var MINIAPP_DEF_TYPE = appInfo.MINIAPP_DEF_TYPE;
	var DEPENDENCE_TYPE = appInfo.DEPENDENCE_TYPE;
	var DEPENDENCE_MINIAPP_CODES = appInfo.DEPENDENCE_MINIAPP_CODES;
	if(DEPENDENCE_MINIAPP_CODES){
		updateMiniAppCodeList = DEPENDENCE_MINIAPP_CODES.split(",");
	}
	if(DEPENDENCE_TYPE=="1"){ //部分依赖，先更新依赖的小应用，再更新自身
		updateMiniAppCodeList.push(appInfo.APP_CODE);
	}else if(DEPENDENCE_TYPE=="2"){ //完全依赖，只更新依赖的小应用，忽略自身的更新
		//不做操作
	}else if(MINIAPP_DEF_TYPE=="3"){ //第三方app的更新交由第三方app自身完成
		//不做操作
	}else{ //不依赖其他小应用，只更新自身
		updateMiniAppCodeList = [appInfo.APP_CODE];
	}
	
	checkMiniAppVersion(updateMiniAppCodeList,function(){
		setTimeout(function(){
			doJump2SearchResultPage();
		},200);
	});
}
function doJump2SearchResultPage(){
	var info = document.getElementById("find").value.trim();
	document.activeElement.blur();
	mui.openWindow({
		id: "12_edoc/html/tasklist/yiban/edocquery.html",
		url: "../../../../12_edoc/html/tasklist/yiban/edocquery.html",
		extras: {
			readStatus: "",
			searchCondition: info
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
