mui.plusReady(function(){
	initCustomPlugin();
});

/**
 * 初始化自定义移动平台基础插件
 */
function initCustomPlugin(){
	var pluginName = 'Atom';
	var B = window.plus.bridge;
    var customPlugin = {
    	/**
         * 安卓6.0（打包的targetSdkVersion>=23），需要动态申请权限
         * 参数：
         * 		目前无需参数
         * 回调：
         * 		目前无需回调
         */
    	requestPermissions4App : function (Argus, successCallback, errorCallback ) {
            var success = typeof successCallback !== 'function' ? null : function(args) {
                successCallback(args);
            };
            var fail = typeof errorCallback !== 'function' ? null : function(code) {
                errorCallback(code);
            };
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "requestPermissions4App", [callbackID, Argus]);
        },
        /**
         * 导航-百度（异步）
         * 参数：
         * 		Argus[0]:必填，目的地纬度
         * 		Argus[1]:必填，目的地经度
         */
        navByBaidu : function (Argus, successCallback, errorCallback ) {
            var success = typeof successCallback !== 'function' ? null : function(args) {
                successCallback(args);
            };
            var fail = typeof errorCallback !== 'function' ? null : function(code) {
                errorCallback(code);
            };
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "navByBaidu", [callbackID, Argus]);
        },
        /**
         * 导航-高德（异步）
         * 参数：
         * 		Argus[0]:必填，目的地纬度
         * 		Argus[1]:必填，目的地经度
         */
        navByAMap: function (Argus, successCallback, errorCallback) {
            var success = typeof successCallback !== 'function' ? null : function (args) {
                successCallback(args);
            };
			var fail = typeof errorCallback !== 'function' ? null : function (code) {
			    errorCallback(code);
			};
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "navByAMap", [callbackID, Argus]);
        },
        /**
         * 解压（异步）
         * 参数：
         * 		Argus[0] 必填，压缩文件所在路径。可以是手机中的绝对路径（以/开头，要确保app对此路径有读的权限）；也可以是相对于【/sdcard路径/Android/data/xxx.xxx.xxx包路径/】的相对路径（此时只能是其子路径）
         * 		Argus[1] 非必填，解压目录路径，默认为【/sdcard路径/Android/data/xxx.xxx.xxx包路径/apps/%appId%/www/】。如果非空，可以是手机中的绝对路径（以/开头，要确保app对此路径有读和写的权限）；也可以是相对路径（此时只能是其子路径）
         * 返回值：
         * 		ret[0] true--解压成功，false--解压失败
         * 		ret[1] 解压失败的错误信息
         */
        unzipFile: function (Argus, successCallback, errorCallback) {
            var success = typeof successCallback !== 'function' ? null : function (args) {
                successCallback(args);
            };
			var fail = typeof errorCallback !== 'function' ? null : function (code) {
			    errorCallback(code);
			};
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "unzipFile", [callbackID, Argus, plus.runtime.appid]);
        },
        /**
         * 查看指定目录或文件是否存在（同步）
         * 参数：
         * 		Argus[0] 必填，系统路径。可以是手机中的绝对路径（以/开头，要确保app对此路径有读的权限）；也可以是相对于【/sdcard路径/Android/data/xxx.xxx.xxx包路径/】的相对路径（此时只能是其子路径）
         * 返回值：
         * 		""--不存在，"File"--文件，"Dir"--目录
         */
        isFileExists: function (Argus) {
            return B.execSync(pluginName, "isFileExists", Argus);
        },
        /**
         * 读取manifest.json文件中配置的版本信息。
         * plus只封装了获取versionName的方法，比如：plus.runtime.getProperty(plus.runtime.appid, function(inf){//console.log(JSON.stringify(inf));var wgtVer = inf.version;});
         * 但是没有封装获取versionCode的方法，因此自定义插件获取。
         * 参数：
         * 		目前，该方法不需要参数
         * 返回值：
         * 		json格式的字符串，如：
         * 		{status:"true",versionCode:83, versionName:"1.0.0"}
     	 *      {status:"false",errMsg:"xxxxxx"}
         */
        getManifestVersionInfo: function (Argus){
        	return B.execSync(pluginName, "getManifestVersionInfo", [Argus,plus.runtime.appid]);
        },
        /**
         * 开启百度鹰眼数据采集服务
         * 参数：
         * 		需要依赖01_common/js/common.js中的baseConfig.mobileServerConfig.yingyanConfig变量。
         */
        startYingYanService: function (Argus, successCallback, errorCallback){
        	Argus = [];
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.serviceId);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.entityName);// entityName只能包含数字、字母、下划线。
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.isNeedObjectStorage);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.gatherInterval);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.packInterval);
        	Argus.push(localStorage.getItem("imei"));
        	Argus.push(localStorage.getItem("mobileServer.common.phoneNum"));
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.userId);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.userName);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.departmentOrganId);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.departmentOrganName);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.corpOrganId);
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.corporationOrganName);
        	Argus.push(localStorage.getItem("mobileServer.yingyan.customData"));
        	Argus.push(baseConfig.mobileServerConfig.yingyanConfig.employeeOrganId);
        	var success = typeof successCallback !== 'function' ? null : function(args) {
                successCallback(args);
            };
            var fail = typeof errorCallback !== 'function' ? null : function(code) {
                errorCallback(code);
            };
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "startYingYanService", [callbackID, Argus]);
        },
        /**
         * 关闭百度鹰眼数据采集服务
         * 参数：
         * 		目前无需参数
         */
        stopYingYanService: function (Argus, successCallback, errorCallback){
        	var success = typeof successCallback !== 'function' ? null : function(args) {
                successCallback(args);
            };
            var fail = typeof errorCallback !== 'function' ? null : function(code) {
                errorCallback(code);
            };
            var callbackID = B.callbackId(success, fail);
            return B.exec(pluginName, "stopYingYanService", [callbackID, Argus]);
        },
        /**
         * 开启个推服务
         * 参数：
         * 		目前无需参数
         */
        startGTPushService: function (Argus) {
            return B.execSync(pluginName, "startGTPushService", Argus);
        }
    };
    window.plus.Atom = customPlugin;
}
