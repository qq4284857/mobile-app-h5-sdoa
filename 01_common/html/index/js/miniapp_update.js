/**
 * 根据小应用的appCode获取localStorage中存在的appInfo信息
 */
var appCustomDataListStr4All = localStorage.getItem("LS.APP.appCustomDataList");
if(!appCustomDataListStr4All){
	appCustomDataListStr4All = "[]";
}
var appCustomDataList4All = JSON.parse(appCustomDataListStr4All);
function getAppInfoByAppCode(appCode){
	if(!appCode || appCustomDataList4All.length<1){
		return null;
	}
	
	for(var i=0;i<appCustomDataList4All.length;i++){
		if(appCustomDataList4All[i].APP_CODE===appCode){
			return appCustomDataList4All[i];
		}
	}
	return null;
}

/**
 * 检查小应用版本更新
 */
var plusWaiting = null;
function checkMiniAppVersion(appCodeArr,successCallBack,failCallBack) {
	if(baseConfig.mobileServerConfig.isUseMiniUpdateMode!="1" || !appCodeArr || appCodeArr.length<1){
		if(typeof successCallBack == "function"){
			successCallBack();
		}
		return;
	}
	var updateMiniAppList = [];
	for(var i=0;i<appCodeArr.length;i++){
		var appInfo = getAppInfoByAppCode(appCodeArr[i]);
		if(!appInfo){
			//处理方式一：强校验方式。如果找不到依赖的小应用，直接报错。
			/*mui.toast("没有配置标识为【"+appCodeArr[i]+"】的小应用，请联系管理员。");
			if(typeof failCallBack == "function"){
				failCallBack();
			}
			return;*/
			
			//处理方式二：弱校验方式。如果找不到依赖的小应用，则跳过该不存在的小应用的更新逻辑。
			continue;
		}
		var curMiniAppVersionInfo = {"versionCode":0,"versionName":"0.0.0"};
		var ls_appVersionInfos = JSON.parse(localStorage.getItem("LS.APP.appVersionInfos"));
		var ls_curMiniAppVersionInfo = ls_appVersionInfos[appInfo.APP_CODE];
		if(!ls_curMiniAppVersionInfo){
			ls_appVersionInfos[appInfo.APP_CODE] = JSON.stringify(curMiniAppVersionInfo);
			localStorage.setItem("LS.APP.appVersionInfos",JSON.stringify(ls_appVersionInfos));
		}else{
			curMiniAppVersionInfo = JSON.parse(ls_curMiniAppVersionInfo);
		}
		var LATEST_VERSION_CODE = appInfo.LATEST_VERSION_CODE;
		if(typeof LATEST_VERSION_CODE != "number"){
			mui.toast("应用初始化失败，最新的版本code不合法！");
			if(typeof failCallBack == "function"){
				failCallBack();
			}
			return;
		}
		if(curMiniAppVersionInfo.versionCode === LATEST_VERSION_CODE){
			continue;
		}
		updateMiniAppList.push(appInfo);
	}
	//console.log(JSON.stringify(updateMiniAppList));
	//alert(JSON.stringify(updateMiniAppList));
	if(updateMiniAppList.length<1){
		if(typeof successCallBack == "function"){
			successCallBack();
		}
		return;
	}
	
	var networkStatus = getCurNetwork();
	if(networkStatus=="未知" || networkStatus=="未连接网络"){
		mui.toast("没有可用网络");
		if(typeof failCallBack == "function"){
			failCallBack();
		}
		return;
	}
	plusWaiting = plus.nativeUI.showWaiting("初始化中，请稍候...",{back:"none"});
	
	var allVersionInfoArr = [];
	var idx = 0;
	getMiniAppUpdateList(updateMiniAppList,idx,allVersionInfoArr,function(allVersionInfoArr){
		//console.log(JOSN.stringify(allVersionInfoArr));
		//alert(JSON.stringify(allVersionInfoArr));
		downloadAndInstallMiniApp(allVersionInfoArr,0,successCallBack,failCallBack);
	},failCallBack);
}

function getMiniAppUpdateList(updateMiniAppList,idx,allVersionInfoArr,successCallBack,failCallBack){
	if(idx==updateMiniAppList.length){
		if(typeof successCallBack == "function"){
			successCallBack(allVersionInfoArr);
		}
	}
	
	var appcode = updateMiniAppList[idx].APP_CODE;
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
		curVersionCode: JSON.parse(JSON.parse(localStorage.getItem("LS.APP.appVersionInfos"))[appcode]).versionCode,
		deviceOS: deviceOS,
		appCode: appcode
	}
	doCheckversion(queryParam,function(versionInfoArr){
		if(versionInfoArr){
			allVersionInfoArr = allVersionInfoArr.concat(versionInfoArr);
		}
		idx++;
		getMiniAppUpdateList(updateMiniAppList,idx,allVersionInfoArr,successCallBack,failCallBack);
	},failCallBack);
}

function doCheckversion(queryParam,successCallBack,failCallBack){
	mui.ajax(baseServiceUrl.url, {
		data: queryParam,
		dataType: 'json',
		type: 'post',
		async: true,
		crossDomain: false,
		success: function(datas) {
			//console.log(JSON.stringify(datas));
	 		if(datas.status!="true"){
				mui.toast("检查更新出错："+datas.errMsg);
				plusWaiting.close();
				if(typeof failCallBack == "function"){
					failCallBack();
				}
				return;
	 		}
	 		var dataResult = JSON.parse(datas.result);
	 		//console.log(JSON.stringify(dataResult));
	 		if(dataResult.status!="true"){
	 			mui.toast("检查更新出错："+dataResult.result);
	 			plusWaiting.close();
				if(typeof failCallBack == "function"){
					failCallBack();
				}
				return;
	 		}
            if(dataResult.totalSum===0){
            	//mui.toast("无可用更新");
            	plusWaiting.close();
                if(typeof successCallBack == "function"){
					successCallBack();
				}
                return;
            }
            if(dataResult.recordSum<dataResult.totalSum){
            	mui.toast("检查更新出错：更新版本过多。");
	 			plusWaiting.close();
				if(typeof failCallBack == "function"){
					failCallBack();
				}
				return;
            }
            var versionInfoArr = dataResult.result;
            if(typeof successCallBack == "function"){
				successCallBack(versionInfoArr);
			}
		},
		error: function(xhr, type, errorThrown) {
			//console.log(xhr);
			mui.toast("检查更新出错："+errorThrown);
			plusWaiting.close();
			if(typeof failCallBack == "function"){
				failCallBack();
			}
		}
	});
}
/**
 * 下载apk包并安装；或者下载zip包并解压
 */
function downloadAndInstallMiniApp(versionInfoArr,index,successCallBack,failCallBack){
	if(!versionInfoArr || index>=versionInfoArr.length){
		plusWaiting.close();
		if(typeof successCallBack == "function"){
			successCallBack();
		}
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
		plusWaiting.close();
		if(typeof failCallBack == "function"){
			failCallBack();
		}
		return;
	}
	
	var task = plus.downloader.createDownload(downloadUrl, {filename: updateFileName, retry: 1}, function (download, status) {
        if (status == 200) {
    		setTimeout(function(){ //防止部分机型卡在98%，99%的进度上。实际上已经下载完成了，卡住的原因就是100%和这里的200是相同的时间点，太过频繁调用plusWaiting.setTitle会导致程序报错：Uncaught RangeError: Maximum call stack size exceeded
        		if(docType == ".apk"){ //一定要放在versionInfoArr中的最后一个，且只能有一个apk类型的版本
        			plusWaiting.setTitle("下载完成，准备安装...");
        			setTimeout(function(){
	        			plusWaiting.close();
	        		},2000);
	                plus.runtime.install(updateFileName, {force: true}, function(){
	                	//安装文件为apk时，不会触发此回调函数
	                }, function(){
	                    mui.toast("安装失败，请稍后重试！");
	                    plusWaiting.close();
	                   	if(typeof failCallBack == "function"){
							failCallBack();
						}
	                });
	                plusWaiting.close();
        		}else if(docType == ".zip"){
        			plusWaiting.setTitle("资源解压中，请稍候...");
		            plus.Atom.unzipFile([updateFileName.substr(1)], function(ret) {
						//console.log("res111==="+ret);
						if(ret[0]===true){
							var appVersionInfos = JSON.parse(localStorage.getItem("LS.APP.appVersionInfos"));
							appVersionInfos[appCode] = JSON.stringify({"versionCode":versionCode,"versionName":versionName});
							localStorage.setItem("LS.APP.appVersionInfos",JSON.stringify(appVersionInfos));
							index++;
							downloadAndInstallMiniApp(versionInfoArr,index,successCallBack,failCallBack);
						}else{
							mui.toast("应用解压失败！"+ret[1]);
							plusWaiting.close();
							if(typeof failCallBack == "function"){
								failCallBack();
							}
						}
					},function(ret){
						//console.log("res2223==="+ret);
						mui.toast("应用解压失败！"+ret[1]);
						plusWaiting.close();
						if(typeof failCallBack == "function"){
							failCallBack();
						}
					});
        		}
        	},500);
        } else {
        	plusWaiting.close();
        	if(typeof failCallBack == "function"){
				failCallBack();
			}
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