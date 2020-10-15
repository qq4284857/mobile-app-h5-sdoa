/***
 * 系统接口公共配置
 * 公司：http://218.57.146.167:9080;http://gcloud.inspur.com:9080;http://10.12.1.80:80;
 * 沈阳测试环境：http://124.95.135.112:8088
 * 沈阳正式环境：http://59.197.229.36:80
 * **/
var baseServiceConfig = {
	scheme: "http",
	host: "10.110.96.68",
	port: "", // 无端口时填写""
	context: "mobileServer",
	scContext: "sc",
	cformContext: "cform",
	cformClientContext: "cformout",
	cfileContext:"cfile",
	cfileSerContext:"cfileserver",
	cfileOutContext:"cfileout",
	edocContext: "oa",
	cmsContext: "cms/"
};
baseServiceConfig.baseUrl = baseServiceConfig.scheme+"://"+baseServiceConfig.host+((baseServiceConfig.port=="")?"":(":"+baseServiceConfig.port))+"/";

var extOaServiceConfig={
	scheme: "http",
	host: "10.10.4.137",
	port: "", // 无端口时填写""
	context: "oa",
}
extOaServiceConfig.baseUrl = extOaServiceConfig.scheme+"://"+extOaServiceConfig.host+((extOaServiceConfig.port=="")?"":(":"+extOaServiceConfig.port))+"/";
baseServiceConfig.edocContext=extOaServiceConfig.baseUrl+extOaServiceConfig.context;
/***
 * 系统接口地址
 * **/
var baseServiceUrl = {
	url: baseServiceConfig.baseUrl + baseServiceConfig.context + "/command/dispatcher/com.inspur.gcloud.mobileServer.command.GCloudMobileAPICommandDispatch",
	fileUploadUrl: baseServiceConfig.baseUrl + baseServiceConfig.context + "/command/dispatcher/com.inspur.gcloud.mobileServer.command.GCloudMobileAPICommandDispatch/uploadFile2Cfile",
	fileDownloadUrl: baseServiceConfig.baseUrl + baseServiceConfig.context + "/command/dispatcher/com.inspur.gcloud.mobileServer.command.GCloudMobileAPICommandDispatch/downloadFileFromCfile",
	scUrl: baseServiceConfig.baseUrl + baseServiceConfig.scContext ,
	cfileUrl: baseServiceConfig.baseUrl + baseServiceConfig.cfileContext,
	cfileSerUrl: baseServiceConfig.baseUrl + baseServiceConfig.cfileSerContext,
	cfileOutUrl : baseServiceConfig.baseUrl + baseServiceConfig.cfileOutContext,
	cformUrl: baseServiceConfig.baseUrl + baseServiceConfig.cformContext,
	cformClientUrl: baseServiceConfig.baseUrl + baseServiceConfig.cformClientContext,
	//edocUrl:baseServiceConfig.baseUrl + baseServiceConfig.edocContext,
	edocUrl:"http://10.10.4.137/oa/"
//	cmsUrl: baseServiceConfig.baseUrl + baseServiceConfig.cmsContext,
};
