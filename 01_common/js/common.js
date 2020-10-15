/**
 * 基础配置
 * 此配置只维护app的公共配置，不再维护各业务系统的配置。
 */
var baseConfig = {
	top_title: "",
	app_name: "市场监管局移动办公",
	alerttitle: "市场监管局移动办公",
	mobileServerConfig: {
		isUseAppCacheData: "1", //0否1是。是否使用mobileServer的App缓存变量配置
		isUseMiniUpdateMode: "1", //0否1是。是否开启小应用更新模式。开发模式下请选择0否，打包时一定要改成1是。
		miniAppTypeId: "",//小应用分类id。如果为空，则查询默认应用分类；如果没有默认应用分类，则查询系统预置分类下的小应用列表。
		accountBindDeviceMaxNum: "",//账户登录校验，数字类型字符串。如果为空则不校验；如果为N且N>0，则：给定一个帐户，最多允许N个设备同时在线；如需在第N+1个设备登录，需要先在之前登录过的设备上注销登录方可。
		guidePageInfo: {
			isShow: "0", //0否1是，app第一次启动是否显示导航页
			showAfterUpdate: "1" //0否1是，更新壳包后，启动app是否重新显示导航页。仅在isShow为1时生效。
		},
		isUseCustomLoginAndIndex: "0",//是否可以在mobileServer中动态配置登录页和首页。当mobileServer只对应一个app时，可以为1，否则为0。
		defaultLoginPageInfo: {
			loginPageId: "01_common/html/login/login.html",
			loginPageUrl: "../login/login.html",
			loginPageParam: {
				
			}
		},
		defaultIndexPageInfo: {
			indexPageId: "01_common/html/index/index.html",
			indexPageUrl: "../index/index.html",
			indexPageParam: {
				
			}
		},
		yingyanConfig: { //百度鹰眼默认配置
			isStartYingyanService: "0", //0否1是，是否【自动】开启百度鹰眼数据采集服务
			serviceId: 201085, //轨迹服务ID
			entityName: localStorage.getItem("imei"),// entityName只能包含数字、字母、下划线。
			isNeedObjectStorage: false, //是否需要对象存储服务，注意：若需要对象存储服务，一定要导入 bos-android-sdk-1.0.2.jar。
			gatherInterval: 10, //采集周期(单位:秒)，正整数。
			packInterval: 300, //打包周期(单位:秒)，需要是gatherInterval的整数倍。
			userId: localStorage.getItem("userId"), // 鹰眼Entity自定义字段，用户的userId
			userName: localStorage.getItem("username"), //鹰眼Entity自定义字段，用户的userName
			employeeOrganId: localStorage.getItem("employeeOrganId"), //鹰眼Entity自定义字段，用户的employeeOrganId
			departmentOrganId: localStorage.getItem("departmentOrganId"), //鹰眼Entity自定义字段，用户的部门organId
			departmentOrganName: localStorage.getItem("departmentOrganName"), //鹰眼Entity自定义字段，用户的部门名称
			corpOrganId: localStorage.getItem("corpOrganId"), //鹰眼Entity自定义字段，用户的单位organId
			corporationOrganName: localStorage.getItem("corporationOrganName"), //鹰眼Entity自定义字段，用户的单位名称
			isNeedOtherCustomData: "0" //是否需要初始化其他业务系统自定义字段到鹰眼配置中：localStorage.getItem("mobileServer.yingyan.customData")
		},
		GTConfig: { //个推服务
		    isStartGTService: "0"
		}
	}
};

/**
 * 常用正则表达式
 */
var baseRegularExpression = {
	"STRING": /^.*$/,
	"INT": /^[0-9]*$/,
	"FLOAT": /^(([1-9]\d{0,9})|0)(\.\d{1,8})?$/,
	"EMAIL": /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	"MOBILE": /(^(13|15|18|17)[0-9]{9}$)|(^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
	"FAX": /^((\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
	"ZIPCODE": /^\d{6}$/,
	"DATE": /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
	"TIME": /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
	"IDENTITYNUM": /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/
}

/**
 * 获取当前登录人信息
 */
function getLoginUserInfo(){
	var loginUserInfo = {};
	loginUserInfo["userId"] = localStorage.getItem("userId");//用户登录ID
	loginUserInfo["employeeOrganId"] = localStorage.getItem("employeeOrganId");//用户organId
	loginUserInfo["username"] = localStorage.getItem("username");//用户名称
	loginUserInfo["departmentOrganId"] = localStorage.getItem("departmentOrganId");//部门organId
	loginUserInfo["departmentOrganName"] = localStorage.getItem("departmentOrganName");//部门名称
	loginUserInfo["corpOrganId"] = localStorage.getItem("corpOrganId");//单位organId
	loginUserInfo["corporationOrganName"] = localStorage.getItem("corporationOrganName");//单位名称
	loginUserInfo["isAdmin"] = localStorage.getItem("isAdmin");//是否管理员
	loginUserInfo["sso_token"] = localStorage.getItem("sso_token");//本次登录的token
	return loginUserInfo;
}

/***
 * 获取组织信息
 * **/
function getOrganInfo(organId){
	var organInfo = {result:null};
	mui.ajax(baseServiceUrl.url, {
		data:{
			serviceCode : "bsp.getOrganInfo",
			organId : organId
		},
		dataType: 'json', //服务器返回json格式数据  
		type: 'post', //HTTP请求类型
		async: false,
		success: function(data) {
			if(data.status && "true" == data.status){
				organInfo = JSON.parse(data.result);
			} else {
				mui.toast("获取组织信息失败，请重试。");
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.alert("获取组织信息失败,请检查网络是否畅通", function(e) {}, baseConfig.alerttitle, "确定");
		}
	});
	return organInfo.result;
}

/**
 * 获取网络类型
 */
function getCurNetwork() {
	var networkTypes = {};
	networkTypes[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
	networkTypes[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
	networkTypes[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
	networkTypes[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
	networkTypes[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
	networkTypes[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
	networkTypes[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
	return networkTypes[plus.networkinfo.getCurrentType()];
}

/**
 * 根据app包名，获取app的版本号code和版本号描述
 * 如果获取内容为null，说明该app未安装
 */
function getAppNameAndCode(packageName) {
    plus.android.importClass('java.util.ArrayList');
    plus.android.importClass('android.content.pm.PackageInfo');
    plus.android.importClass('android.content.pm.PackageManager');
    var MainActivity = plus.android.runtimeMainActivity();
    var PackageManager = MainActivity.getPackageManager();
    //先判断是否已经安装 不然报错
    var isInstall = plus.android.invoke(PackageManager, 'getLaunchIntentForPackage', packageName);
    var result = null; //返回对象
    if(isInstall) {
        var pinfo = plus.android.invoke(PackageManager, 'getPackageInfo', packageName, 0)
        if(pinfo) {
            var versionName = pinfo.plusGetAttribute("versionName"); //版本
            var versionCode = pinfo.plusGetAttribute("versionCode"); //code
            result = [versionName, versionCode];
        }
        return result
    } else {
        return result; //返回空代表未安装
    }
}

/**
 * 根据毫秒数获取2018-01-06 12:03:32形式的时间
 * 如果没有给定参数，则获取当前时间。
 */
function getDateStr(dateNum){
	var unixTimestamp;
	if(dateNum==undefined || dateNum==null || (dateNum+"").trim()=="" || isNaN(dateNum)){
		unixTimestamp = new Date();
	}else{
		unixTimestamp = new Date(dateNum);
	}
	var year = unixTimestamp.getFullYear()+"";
	var month = unixTimestamp.getMonth()+1+"";
	if(month.length==1)
		month = "0"+month;
	var day = unixTimestamp.getDate()+"";
	if(day.length==1)
		day = "0"+day;
	var hour = unixTimestamp.getHours()+"";
	if(hour.length==1)
		hour = "0"+hour;
	var minute = unixTimestamp.getMinutes()+"";
	if(minute.length==1)
		minute = "0"+minute;
	var second = unixTimestamp.getSeconds()+"";
	if(second.length==1)
		second = "0"+second;
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

/**
 * 文件大小转换
 * fileSize: 单位为B
 * num:默认值2，保留小数的位数，[0,20]之间的整数
 */
function renderFileSize(fileSize,num){
	if(isNaN(num)){
		num = 2;
	}
	if(fileSize/1024/1024>1){
		return (fileSize/1024/1024).toFixed(num)+"M";
	}else if(fileSize/1024>1){
		return (fileSize/1024).toFixed(num)+"KB";
	}else{
		return fileSize+"B";
	}
}

/** 
 * @author zhengtan 
 * @description 实现类似JAVA中StringBuffer连接字符串功能，提高字符串连接效率 
 * @example  
 *  var sbTemp = new StringBuffer(); 
 *  sbTemp.append("Welcome"); 
 *  sbTemp.append("China"); 
 *  var sTemp = sbTemp.toString(); 
 */
function StringBuffer() {
	this._strings_ = new Array();
}
StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
};
StringBuffer.prototype.toArray = function() {
	return this._strings_.join(",");
};
StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
};

/**
 * @author  zhengtan
 * @description 按下Android返回键盘的退出应用逻辑处理
 * @example 注意调用方法一定要放在 mui.plusReady 中  使用 $colseAppaction
 */
var first_anxia = null;
var $colseAppaction = function() {
	if(!first_anxia) {
		first_anxia = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first_anxia = null;
		}, 2000);
	} else {
		if(new Date().getTime() - first_anxia < 2000) {
			plus.runtime.quit();
		}
	}
}

/**
 * 生成uuid
 * @param {Object} len
 * @param {Object} radix
 */
function GetUUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
}

/**
 * 获取radio或checkBox选中的值
 * @param {Object} boxName
 */
function getRadioOrCheckBoxValue(boxName){
	var checkBoxs = document.getElementsByName(boxName);
	var val = [];
	for (var i = 0; i < checkBoxs.length; i++) {
    	if (checkBoxs[i].checked) { //判断是否选中
      	 	val.push(checkBoxs[i].value);
    	}
  	}
	return val.join(",");
}
/**
*@dis:验证非空
*/
function isnull(val){
	if(val == null) return true;
	if(typeof(val) == "undefined") return true;
	if(val.toString().trim() == "") return true;
	if(val.toString().trim() == "null")return true;
	if(val.toString().trim() == "undefined")return true;
	return false;
}

/**
 * 检查手机当前的GPS是否开启
 * 如果开启，则无操作，如果未开启，则提示，然后跳转到GPS设置页面
 * 仅适用于Android手机
 */
function checkGPSState () {
	if(plus.os.name == "Android"){
		var context = plus.android.importClass("android.content.Context");
		var locationManager=plus.android.importClass("android.location.LocationManager");
		var main=plus.android.runtimeMainActivity();
		var mainSvr=main.getSystemService(context.LOCATION_SERVICE);
		var gpsProvider = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);//检查是否开启了GPS
		if(!gpsProvider) {
			var message = "为了获取您的精准位置，请开启GPS设备。";
			var title = "GPS未启用";
			var alertCB = function () {
				var Intent = plus.android.importClass("android.content.Intent");
				var mIntent = new Intent('android.settings.LOCATION_SOURCE_SETTINGS');
				main.startActivity(mIntent);//打开GPS设置
			}
			plus.nativeUI.alert( message, alertCB, title);
		}
	}
}
