/**
 * 1. 本页面功能需要依赖01_common/js/common.js
 * 2. destination_longitude：目的地经度
 * 3. destination_latitude：目的地纬度
 * 4. poi_mode：传入的目的地经纬度参数的坐标系："baidu"，"AMap"，"system"。默认"baidu"
 * 5. 当poi_mode为"system"时，需要使用到百度的坐标转换接口，html中需要引入以下两个js文件：
 * <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CZXpK3rqWkiBvL2GTpSfGk9r"></script>
 * <script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
 */


/**
 * 百度地图导航
 */
function nav_baidu(destination_longitude,destination_latitude,poi_mode) {
	//alert(destination_latitude+"---"+destination_longitude);
	if(!destination_latitude || !destination_longitude || parseFloat(destination_latitude)<1 || parseFloat(destination_longitude)<1){
		mui.toast("暂无经纬度信息，无法进行导航。");
		return;
	}
	if(poi_mode!="baidu" && poi_mode!="AMap" && poi_mode!="system"){
		poi_mode = "baidu";
	}
	if(poi_mode=="AMap"){
		var convertP = convertGd2Bd(destination_longitude,destination_latitude);
		destination_longitude = convertP.lng;
		destination_latitude = convertP.lat;
		do_nav_baidu(destination_longitude,destination_latitude);
	}else if(poi_mode=="system"){
		var gpsPoint = new BMap.Point(destination_longitude, destination_latitude);
		BMap.Convertor.translate(gpsPoint, 2, function(point){
			do_nav_baidu(point.lng,point.lat);
		});
	}else{
		do_nav_baidu(destination_longitude,destination_latitude);
	}
}
function do_nav_baidu(destination_longitude,destination_latitude){
	//alert(destination_latitude+"---"+destination_longitude);
	var packageName = 'com.baidu.BaiduMap';
	if(getAppNameAndCode(packageName)){
		plus.Atom.navByBaidu([destination_latitude,destination_longitude], function(res) {
			//alert("res==="+(res));
		});
	}else{
		plus.nativeUI.confirm("检测到您的手机未安装百度地图，是否下载安装？", function(e) {
			if(e.index == 0) {
				if(mui.os.android) { //Android直接下载
					var download_url="https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=1009176a";
					plus.runtime.openURL(download_url);
				}else{ //ios打开App Store
					//var download_url="itunes.apple.com/cn/app/id363501921?mt=8";
					//plus.runtime.openURL("itms-apps://" + download_url);
				}
			}
		}, baseConfig.alerttitle);
	}
}


/**
 * 高德地图导航
 */
function nav_AMap(destination_longitude,destination_latitude,poi_mode) {
	//alert(destination_latitude+"---"+destination_longitude);
	if(!destination_latitude || !destination_longitude || parseFloat(destination_latitude)<1 || parseFloat(destination_longitude)<1){
		mui.toast("暂无经纬度信息，无法进行导航。");
		return;
	}
	if(poi_mode!="baidu" && poi_mode!="AMap" && poi_mode!="system"){
		poi_mode = "baidu";
	}
	if(poi_mode=="baidu"){
		var convertP = convertBd2Gd(destination_longitude,destination_latitude);
		destination_longitude = convertP.lng;
		destination_latitude = convertP.lat;
		do_nav_AMap(destination_longitude,destination_latitude);
	}else if(poi_mode=="system"){//目前没有申请高德地图的sdk。先调用百度接口转换为百度坐标系，再通过js转换为高德坐标系。
		var gpsPoint = new BMap.Point(destination_longitude, destination_latitude);
		BMap.Convertor.translate(gpsPoint, 2, function(point){
			var convertP = convertBd2Gd(point.lng,point.lat);
			destination_longitude = convertP.lng;
			destination_latitude = convertP.lat;
			do_nav_AMap(destination_longitude,destination_latitude);
		});
	}else{
		do_nav_AMap(destination_longitude,destination_latitude);
	}
}
function do_nav_AMap(destination_longitude,destination_latitude) {
	//alert(destination_latitude+"---"+destination_longitude);
	var packageName = 'com.autonavi.minimap';
	if(getAppNameAndCode(packageName)){
		plus.Atom.navByAMap([destination_latitude,destination_longitude], function(res) {
			//alert("res==="+(res));
		});
	}else{
		plus.nativeUI.confirm("检测到您的手机未安装高德地图，是否下载安装？", function(e) {
			if(e.index == 0) {
				if(mui.os.android) { //Android直接下载
					var download_url="http://mapdownload.autonavi.com/apps/apps/dicPackage/8.60.1.2013/C3060/Amap_V8.60.1.2013_android_C3060_(Build1807201613).apk";
					plus.runtime.openURL(download_url);
				}else{ //ios打开App Store
					//var download_url="itunes.apple.com/cn/app/id363501921?mt=8";
					//plus.runtime.openURL("itms-apps://" + download_url);
				}
			}
		}, baseConfig.alerttitle);
	}
}


/**
 * 百度坐标转高德（传入经度、纬度）
 * @param bd_lng 经度
 * @param bd_lat 纬度
 */
function convertBd2Gd(bd_lng, bd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = bd_lng - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return {lng: gg_lng, lat: gg_lat}
}

/**
 * 高德坐标转百度（传入经度、纬度）
 * @param bd_lng 经度
 * @param bd_lat 纬度
 */
function convertGd2Bd(gg_lng, gg_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gg_lng, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {lng: bd_lng, lat: bd_lat};
}

