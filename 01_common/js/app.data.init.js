/**
 * 更新localstorage中的数据初始化状态LS.APP.dataInitStatus的值
 * -1:正在进行初始化，0:初始化成功（失败次数为0），其他数值：初始化失败次数。
 */
function updateLSInitStatus(key,val){
	var dataInitStatus = JSON.parse(localStorage.getItem("LS.APP.dataInitStatus"));
	if(val>0 && dataInitStatus[key]>=0){
		dataInitStatus[key] = dataInitStatus[key] + val;
	}else{
		dataInitStatus[key] = val;
	}
	localStorage.setItem("LS.APP.dataInitStatus", JSON.stringify(dataInitStatus));
}

/************************************* APP检查更新--开始 *************************************************************************/
/**
 * 检查版本更新
 */
var plusWaiting = null;
var isCheckversionBusy = "0";
function checkversion() {
	if(isCheckversionBusy!="0"){
		return;
	}
	isCheckversionBusy = "1";
	
	if(baseConfig.mobileServerConfig.isUseMiniUpdateMode!="1"){
		updateLSInitStatus("checkVersion",0);
		isCheckversionBusy = "0";
		return;
	}
	
	var deviceOS = "unknown";
	if(mui.os.android){
		deviceOS = "android";
	}else if(mui.os.ios){
		deviceOS = "ios";
	}
	
	var queryParam = {
		serviceCode: "mobileServer.getMiniAppUpdateList",
		start: "0",
		limit: "100",
		curVersionCode: JSON.parse(JSON.parse(localStorage.getItem("LS.APP.appVersionInfos")).APP).versionCode,
		deviceOS: deviceOS,
		appCode: "APP"
	}
	doCheckversion(queryParam);
}
function doCheckversion(queryParam){
	mui.ajax(baseServiceUrl.url, {
		data: queryParam,
		dataType: 'json',
		type: 'post',
		headers : {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		async: true,
		crossDomain: false,
		success: function(datas) {
			//console.log(JSON.stringify(datas));
	 		if(datas.status!="true"){
				mui.toast("检查新版本出错："+datas.errMsg);
				updateLSInitStatus("checkVersion",1);
				isCheckversionBusy = "0";
				return;
	 		}
	 		var dataResult = JSON.parse(datas.result);
	 		//console.log(JSON.stringify(dataResult));
	 		if(dataResult.status!="true"){
	 			mui.toast("检查新版本出错："+dataResult.result);
				updateLSInitStatus("checkVersion",1);
				isCheckversionBusy = "0";
				return;
	 		}
            if(dataResult.totalSum===0){
                updateLSInitStatus("checkVersion",0);
                isCheckversionBusy = "0";
                return;
            }
            var versionInfoArr = dataResult.result;
            updateLSInitStatus("checkVersion",-2);
            plus.nativeUI.confirm("发现新版本，是否升级？", function(e) {
            	isCheckversionBusy = "0";
                if(e.index == 0) {
                    if(mui.os.ios && (versionInfoArr[0].versionType=="4"||versionInfoArr[0].versionType=="5")) { //ios不支持直接安装ipa包
                        //plus.runtime.openURL("itms-services://?action=download-manifest&url=https://app.snerdi.com.cn/release/mobile.plist");
                        plus.runtime.openURL("https://www.pgyer.com/tzr3");
                        return;
                    }
                    plusWaiting = plus.nativeUI.showWaiting("更新准备中，请稍候...",{back:"none"});
                	downloadAndInstall(versionInfoArr,0,function(){
                		updateLSInitStatus("checkVersion",0);
                		plusWaiting.close();
                		plus.runtime.restart();
                	},function(){
                		mui.toast("更新失败，请稍候重试！");
        				plusWaiting.close();
                	});
                }else{
                    mui.toast("请先将APP更新到最新版本");
                }
			}, "更新提示");
		},
		error: function(xhr, type, errorThrown) {
			//console.log(xhr);
			updateLSInitStatus("checkVersion",1);
			isCheckversionBusy = "0";
		}
	});
}
/**
 * 下载apk包并安装；或者下载zip包并解压
 */
function downloadAndInstall(versionInfoArr,index,successCallBack,failCallBack){
	if(!versionInfoArr || index>=versionInfoArr.length){
		successCallBack();
		return;
	}
	var appCode = versionInfoArr[index].appCode;
	var versionCode = versionInfoArr[index].versionCode;
	var versionName = versionInfoArr[index].versionName;
	var docId = versionInfoArr[index].docId;
	var docName = versionInfoArr[index].docName;
	var updateFileName = "_downloads/update/" + appCode + "-" + versionCode + "-" + new Date().getTime() + "-" + docName;
	var downloadUrl = baseServiceUrl.fileDownloadUrl + "?docId=" + docId + "&docName=" + encodeURI(encodeURI(docName));//downloadUrl中不能包含中文，否则在某些机型中，请求是400 Bad Request
	//plus.runtime.openURL(downloadUrl);
	
	var docNameArr = docName.split(".");
	var docType = "." + docNameArr[docNameArr.length-1];
	if(docType != ".zip" && docType != ".apk"){
		mui.toast("更新出错，只支持zip或apk格式的更新包。");
		failCallBack();
		return;
	}
	
	var task = plus.downloader.createDownload(downloadUrl, {filename: updateFileName, retry: 1}, function (download, status) {
        if (status == 200) {
        	setTimeout(function(){ //防止部分机型卡在98%，99%的进度上。实际上已经下载完成了，卡住的原因就是100%和这里的200是相同的时间点，太过频繁调用plusWaiting.setTitle会导致程序报错：Uncaught RangeError: Maximum call stack size exceeded
        		if(docType == ".apk"){
	        		plusWaiting.setTitle("下载完成，准备安装...");
	        		setTimeout(function(){
	        			plusWaiting.close();
	        		},2000);
	                plus.runtime.install(updateFileName, {force: true}, function(){
	                	//安装文件为apk时，不会触发此回调函数
	                }, function(){
	                    mui.toast("安装失败，请稍后重试！");
	                    failCallBack();
	                });
	        	}else if(docType == ".zip"){
	        		plusWaiting.setTitle("资源解压中，请稍候...");
		            plus.Atom.unzipFile([updateFileName.substr(1)], function(ret) {
						//console.log("res111==="+ret);
						if(ret[0]===true){
							var appVersionInfos = JSON.parse(localStorage.getItem("LS.APP.appVersionInfos"));
							appVersionInfos[appCode] = JSON.stringify({"versionCode":versionCode,"versionName":versionName});
							localStorage.setItem("LS.APP.appVersionInfos",JSON.stringify(appVersionInfos));
							index++;
							downloadAndInstall(versionInfoArr,index,successCallBack,failCallBack);
						}else{
							mui.toast("应用解压失败！"+ret[1]);
							failCallBack();
						}
					},function(ret){
						//console.log("res2223==="+ret);
						mui.toast("应用解压失败！"+ret[1]);
						failCallBack();
					});
	        	}
        	},500);
        } else {
        	failCallBack();
        }
    });
	task.addEventListener("statechanged", function (download, status) {
        switch (download.state) {
            case 2://已连接到服务器
                break;
            case 3://正在下载
                var curDownloadedSize = download.downloadedSize;
            	var fileTotalSize = download.totalSize;
            	var percent = 0;
            	if(curDownloadedSize>1000 && fileTotalSize>0){
            		percent = (curDownloadedSize/fileTotalSize*100).toFixed(1);
            		var curDownloadedSizeShow = renderFileSize(curDownloadedSize,2);
            		var fileTotalSizeShow = renderFileSize(fileTotalSize,2);
            		var waitingTitle = "正在更新第" + (index+1) + "个，共" + versionInfoArr.length + "个。\n\r" 
            			+ "已下载  " + curDownloadedSizeShow + " / " + fileTotalSizeShow + "（ " + percent + " %） ";//注意拼接中的空格不能少，否则会导致数字过长时显示不全。
                	plusWaiting.setTitle(waitingTitle);
            	}
                break;
            case 4://下载完成（成功或失败）
                break;
        }
    });
    task.start();
}

/************************************* APP检查更新--结束 *************************************************************************/


/************************************* APP缓存变量配置--开始 *************************************************************************/
/**
 * 获取缓存变量配置：入口
 */
var appCacheDataMinSyncTimeInterval = 0;//同步的最小时间间隔，单位：分钟。上次同步距现在的时间间隔如果小于此值，则不再执行同步任务。
var isInitAppCacheDataBusy = "0";
function initAppCacheData(){
	if(isInitAppCacheDataBusy!="0"){
		return;
	}
	isInitAppCacheDataBusy = "1";
	
	if(baseConfig.mobileServerConfig.isUseAppCacheData!="1"){
		updateLSInitStatus("cacheData",0);
		isInitAppCacheDataBusy = "0";
		return;
	}
	
	var appCacheDataSyncTime = localStorage.getItem("LS.APP.appCacheDataSyncTime");
	if(appCacheDataSyncTime!=null){
		appCacheDataSyncTimeNum = (new Date(appCacheDataSyncTime.replace(new RegExp("-","gm"),"/"))).getTime();
		var curTimeNum = new Date().getTime();
		if((curTimeNum-appCacheDataSyncTimeNum)/1000/60 < appCacheDataMinSyncTimeInterval){
			updateLSInitStatus("cacheData",0);
			isInitAppCacheDataBusy = "0";
			return;
		}
		//appCacheDataSyncTime = "2018-08-08 12:00:00";
	}else{
		appCacheDataSyncTime = "";
	}
	//1. 查询废弃的缓存变量，将其从localstorage中移除。
	//2. 查询在上次同步之后有更改的缓存变量，将其加入或更新到localstorage中
	var queryParam = {
		serviceCode: "mobileServer.queryAppLocalVarList",
		status: "0", //数据状态，0:作废,1:保存,2:发布。
		start: "0",
		limit: "100",
		lastSyncTime: appCacheDataSyncTime
	}
	queryAppLocalVarList(queryParam);
}

/**
 * 递归获取pc上配置的缓存变量配置列表。
 * 1. 查询废弃的缓存变量，将其从localstorage中移除。
 * 2. 查询在上次同步之后有更改的缓存变量，将其加入或更新到localstorage中
 */
function queryAppLocalVarList(queryParam){
	//console.log(JSON.stringify(queryParam));
	mui.ajax(baseServiceUrl.url, {
		data:queryParam,
		dataType: "json",
		type: "post",
		headers : {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		async: true,
		crossDomain: false,
		success: function(datas) {
	 		//console.log(JSON.stringify(datas));
	 		if(datas.status!="true"){
				//mui.toast("初始化数据同步失败。");
				updateLSInitStatus("cacheData",1);
				isInitAppCacheDataBusy = "0";
				return;
	 		}
	 		var dataResult = JSON.parse(datas.result);
	 		//console.log(JSON.stringify(dataResult));
	 		if(!dataResult || dataResult.status!="true"){
				//mui.toast("初始化数据同步失败。");
				updateLSInitStatus("cacheData",1);
				isInitAppCacheDataBusy = "0";
				return;
	 		}
	 		var localVarArr = dataResult.result ? dataResult.result:[];
	 		for(var ii=0;ii<localVarArr.length;ii++){
	 			var localVarKey = "LS."+localVarArr[ii].application+"."+localVarArr[ii].varCode;
	 			//console.log("status:"+queryParam.status+"---"+localVarKey);
	 			//console.log(localStorage.getItem(localVarKey));
	 			if(queryParam.status=="0"){
	 				localStorage.removeItem(localVarKey);
	 			}else if(queryParam.status=="2"){
	 				localStorage.setItem(localVarKey,localVarArr[ii].varContent);
	 			}
	 			//console.log(localStorage.getItem(localVarKey));
	 		}
	 		
	 		var recordSum = dataResult.recordSum ? dataResult.recordSum:0;
	 		if(recordSum>=parseInt(queryParam.limit)){
	 			queryParam.start = parseInt(queryParam.start) + parseInt(queryParam.limit) + "";
	 			queryAppLocalVarList(queryParam);
	 		}else if(queryParam.status=="0"){
	 			queryParam.status = "2";
	 			queryParam.start = "0";
	 			queryAppLocalVarList(queryParam);
	 		}else if(queryParam.status=="2"){
	 			updateLSInitStatus("cacheData",0);
	 			localStorage.setItem("LS.APP.appCacheDataSyncTime",getDateStr());
				//console.log("app缓存变量同步成功");
	 			isInitAppCacheDataBusy = "0";
	 		}
		},
		error: function(xhr, type, errorThrown) {
			//mui.toast("初始化数据同步失败，请检查网络是否畅通。");
			updateLSInitStatus("cacheData",1);
			isInitAppCacheDataBusy = "0";
		}
	});
}
/************************************* APP缓存变量配置--结束 *************************************************************************/


/************************************* APP定制内容同步--开始 *************************************************************************/
/**
 * APP定制内容同步：入口
 */
var appCustomDataMinSyncTimeInterval = 0;//同步的最小时间间隔，单位：分钟。上次同步距现在的时间间隔如果小于此值，则不再执行同步任务。
var isInitAppCustomDataBusy = "0";
function initAppCustomData(){
	if(isInitAppCustomDataBusy!="0"){
		return;
	}
	isInitAppCustomDataBusy = "1";
	
	var appCustomDataSyncTime = localStorage.getItem("LS.APP.appCustomDataSyncTime");
	if(appCustomDataSyncTime!=null){
		appCustomDataSyncTimeNum = (new Date(appCustomDataSyncTime.replace(new RegExp("-","gm"),"/"))).getTime();
		var curTimeNum = new Date().getTime();
		if((curTimeNum-appCustomDataSyncTimeNum)/1000/60 < appCustomDataMinSyncTimeInterval){
			updateLSInitStatus("customData",0);
			isInitAppCustomDataBusy = "0";
			return;
		}
		//appCustomDataSyncTime = "2018-08-08 12:00:00";
	}else{
		appCustomDataSyncTime = "";
	}
	var queryParam = {
		serviceCode: "mobileServer.getMiniAppList",
		start: "0",
		limit: "100",
		miniAppTypeId: baseConfig.mobileServerConfig.miniAppTypeId
	}
	queryAppCustomDataList(queryParam);
}

/**
 * 初始化小应用列表信息
 */
function queryAppCustomDataList(queryParam){
	var appCustomDataList = [];
	if(parseInt(queryParam.start)>0){
		appCustomDataList = JSON.parse(localStorage.getItem("LS.APP.appCustomDataList"));
	}
	//console.log(JSON.stringify(queryParam));
	mui.ajax(baseServiceUrl.url, {
		data:queryParam,
		dataType: "json",
		type: "post",
		headers : {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		async: true,
		crossDomain: false,
		success: function(datas) {
	 		//console.log(JSON.stringify(datas));
	 		if(datas.status!="true"){
				//mui.toast("初始化小应用列表失败。");
				updateLSInitStatus("customData",1);
				isInitAppCustomDataBusy = "0";
				return;
	 		}
	 		var dataResult = JSON.parse(datas.result);
	 		//console.log(JSON.stringify(dataResult));
	 		if(!dataResult || dataResult.status!="true"){
				//mui.toast("初始化小应用列表失败。");
				updateLSInitStatus("customData",1);
				isInitAppCustomDataBusy = "0";
				return;
	 		}
	 		var miniAppArr = dataResult.result ? dataResult.result:[];
	 		if(miniAppArr.length>0){
	 			appCustomDataList = appCustomDataList.concat(miniAppArr);
	 			localStorage.setItem("LS.APP.appCustomDataList", JSON.stringify(appCustomDataList));
	 			//console.log(JSON.stringify(appCustomDataList));
	 		}
	 		if(miniAppArr.length>=parseInt(queryParam.limit)){
	 			queryParam.start = parseInt(queryParam.start) + parseInt(queryParam.limit) + "";
	 			queryAppCustomDataList(queryParam);
	 		}else{
	 			updateLSInitStatus("customData",0);
	 			localStorage.setItem("LS.APP.appCustomDataSyncTime",getDateStr());
				//console.log("APP定制内容同步成功");
	 			isInitAppCustomDataBusy = "0";
	 		}
		},
		error: function(xhr, type, errorThrown) {
			//mui.toast("初始化小应用列表失败，请检查网络是否畅通。");
			updateLSInitStatus("customData",1);
			isInitAppCustomDataBusy = "0";
		}
	});
}
/************************************* APP定制内容同步--结束 *************************************************************************/