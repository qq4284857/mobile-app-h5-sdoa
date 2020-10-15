/**
 * 启动消息推送服务·入口
 *
 * 获取手机设备上clientId和其他信息，上传mobileserver
 * 这个js文件，要放入到每个业务入口的页面，例如监管check的  entSearchList.html
 * 但是，这个页面不能打开后立刻close或者销毁，否则异步无法执行完成，数据无法提交
 */
var startGTTryNum = 0;
function startGTService(){
    if(baseConfig.mobileServerConfig.isUseMiniUpdateMode!=="1"){ // Hbuilder开发模式下，无法开启个推服务
		return;
	}
    var retJsonStr = plus.Atom.startGTPushService();
    var retJsonObj = JSON.parse(retJsonStr);
    if(retJsonObj.status!=="true"){
        mui.toast("个推服务启动失败");
        return;
    }
    if(!retJsonObj.clientid){ // 个推在初始化后，会与个推服务器通信，通信完成后才会返回clientid，这需要一点时间。
        if(startGTTryNum<10){
            setTimeout(function(){
                startGTService();
            },500);
            startGTTryNum++;
        } else {
            startGTTryNum = 0;
        }
        return;
    }
    // document.getElementById("clientid").value = "个推clientid：" + retJsonObj.clientid;
    bindGTClientIdWithUserOrganId(retJsonObj.appid,retJsonObj.clientid);
}


/**
 * 将个推clientid与当前登录用户绑定
 */
function bindGTClientIdWithUserOrganId(appid,clientid){
    // var pushInfo = plus.push.getClientInfo();
    var pushInfo = {
        appid: appid,
        clientid: clientid
    };
    var osName = plus.os.name == "Android" ? plus.os.name:"iOS";//操作系统版本
    var imei = osName === "Android" ? plus.device.imei.split(",")[0] : plus.device.uuid;
    var imsi = osName === "Android" ? plus.device.imsi[0] : plus.device.uuid;
    var osVersion = plus.os.version;
    var userId =  localStorage.getItem("employeeOrganId");

    var PushDeviceInfo = {"pushInfo":pushInfo,"userId":userId,"osName":osName,"osVersion":osVersion,"imei":imei,"imsi":imsi};
    // console.log(JSON.stringify(PushDeviceInfo));
    mui.ajax(baseServiceUrl.url, {
        data:{
                serviceCode: "mobileServer.GTClientIdBind",
                PushDeviceInfo : JSON.stringify(PushDeviceInfo),
            },
        dataType: 'json', //服务器返回json数据
        type: "post", //http请求类型
        timeout: 30000,
        success: function(data) {
            if(!data || !data.result || data.status!=="true"){
                mui.toast("个推用户绑定失败");
                return;
            }
            var dataResult = JSON.parse(data.result);
            if(dataResult.status!=="true"){
                mui.toast("个推用户绑定失败");
                return;
            }
        },
        error: function(xhr, type, errorThrown) {
            mui.toast("个推用户绑定失败，请检查网络是否畅通。");
        }
    });



}


