
mui.plusReady(function(){
	setInterval(function(){
		uploadTrack();
	},1000 * 10);
});


function uploadTrack() {
	var lng = 0;
	var lat = 0;
	var imei = mui.os.android ? plus.device.imei : plus.device.uuid;
	imei = imei.split(",")[0];
	plus.geolocation.getCurrentPosition(function(p){
		lng = p.coords.longitude;
		lat = p.coords.latitude;
		mui.ajax(baseServiceUrl.url , {
			headers : {
			 	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			data: {
				serviceCode : "mobileServer.uploadTrack",
				pointType: "0",//0人员设备，1物资
				bizKey: "employeeOrganId_" + localStorage.getItem("employeeOrganId"),
				lng: lng,
				lat: lat,
				deviceCode: imei,
				pointCreateTime: getDateStr()
			},
			dataType: 'json',
			type: "post",
			timeout: 30000, //超时时间设置为10秒；
			success: function(datas) {
				if(!datas || datas.status!="true"){
					mui.toast("位置信息上传失败。");
					return;
				}
				var dataResult = JSON.parse(datas.result);
				if(!dataResult || dataResult.status!="true"){
					mui.toast("位置信息上传失败。");
					return;
				}
				mui.toast("位置信息上传成功");
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("位置信息上传失败,请检查网络是否畅通。");
			}
		});
	}, function(e){
		mui.toast('获取位置信息失败，请确保手机已经开启高精度定位功能。');
	},{provider:"baidu",enableHighAccuracy: true});
}