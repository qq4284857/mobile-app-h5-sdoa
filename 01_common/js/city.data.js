/**
 * 根据行政区划code获取name
 */
function _getCantPropertyByCantCode(cantCode,propertyName,cityDataType){
	if(cantCode==undefined || cantCode==null || cantCode==""){
		return "";
	}
	var _cityDataStr;
	if(cityDataType=="_allcityData"){
		_cityDataStr = JSON.stringify(_allcityData);
	}else{
		_cityDataStr = JSON.stringify(_cityData);
	}
	if(!propertyName){
		propertyName = "cantName";
	}
	var cantCodeIndex = _cityDataStr.indexOf(cantCode);
	if(cantCodeIndex==-1){
		return cantCode;
	}
	var nextPropertyNameIndex = _cityDataStr.indexOf(propertyName,cantCodeIndex+cantCode.length);
	if(nextPropertyNameIndex==-1){
		return cantCode;
	}
	var nextMhIndex = _cityDataStr.indexOf(":",nextPropertyNameIndex+propertyName.length);
	var nextYhIndex = _cityDataStr.indexOf("\"",nextPropertyNameIndex+propertyName.length+3);
	var	retPropertyValue = _cityDataStr.substring(nextMhIndex+2,nextYhIndex);
	//console.log(retPropertyValue)
	return retPropertyValue;
}

/**
 * 行政区划对象
 * cantCode维护在cantName前面，方便解析
 */
var _cityData = {
	cantCode:"370100000",
	cantName:"济南市",
	fullName:"山东省济南市",
	children:[
		{cantCode:"370101000",cantName:"市辖区",fullName:"山东省济南市市辖区"},
		{cantCode:"370102000",cantName:"历下区",fullName:"山东省济南市历下区"},
		{cantCode:"370103000",cantName:"市中区",fullName:"山东省济南市市中区"},
		{cantCode:"370104000",cantName:"槐荫区",fullName:"山东省济南市槐荫区"},
		{cantCode:"370105000",cantName:"天桥区",fullName:"山东省济南市天桥区"},
		{cantCode:"370112000",cantName:"历城区",fullName:"山东省济南市历城区"},
		{cantCode:"370113000",cantName:"长清区",fullName:"山东省济南市长清区"},
		{cantCode:"370124000",cantName:"平阴县",fullName:"山东省济南市平阴县"},
		{cantCode:"370125000",cantName:"济阳县",fullName:"山东省济南市济阳县"},
		{cantCode:"370126000",cantName:"商河县",fullName:"山东省济南市商河县"},
		{cantCode:"370181000",cantName:"章丘区",fullName:"山东省济南市章丘区"},
		{cantCode:"370189000",cantName:"南部山区",fullName:"山东省济南市南部山区"},
		{cantCode:"370190000",cantName:"高新区",fullName:"山东省济南市高新技术产业开发区"}
	]
}

/*var _cityData = {
	cantCode:"371082",
	cantName:"荣成市",
	fullName:"山东省荣成市",
	children:[
		{cantCode:"371082001",cantName:"宁津街道",fullName:"山东省荣成市宁津街道"},
		{cantCode:"371082002",cantName:"港湾街道",fullName:"山东省荣成市港湾街道"},
		{cantCode:"371082003",cantName:"桃园街道",fullName:"山东省荣成市桃园街道"},
		{cantCode:"371082004",cantName:"王连街道",fullName:"山东省荣成市王连街道"},
		{cantCode:"371082005",cantName:"东山街道",fullName:"山东省荣成市东山街道"},
		{cantCode:"371082006",cantName:"斥山街道",fullName:"山东省荣成市斥山街道"},
		{cantCode:"371082007",cantName:"崖头街道",fullName:"山东省荣成市崖头街道"},
		{cantCode:"371082008",cantName:"城西街道",fullName:"山东省荣成市城西街道"},
		{cantCode:"371082009",cantName:"寻山街道",fullName:"山东省荣成市寻山街道"},
		{cantCode:"371082010",cantName:"崂山街道",fullName:"山东省荣成市崂山街道"},
		{cantCode:"371082101",cantName:"俚岛镇",fullName:"山东省荣成市俚岛镇"},
		{cantCode:"371082102",cantName:"成山镇",fullName:"山东省荣成市成山镇"},
		{cantCode:"371082103",cantName:"埠柳镇",fullName:"山东省荣成市埠柳镇"},
		{cantCode:"371082104",cantName:"港西镇",fullName:"山东省荣成市港西镇"},
		{cantCode:"371082105",cantName:"夏庄镇",fullName:"山东省荣成市夏庄镇"},
		{cantCode:"371082106",cantName:"崖西镇",fullName:"山东省荣成市崖西镇"},
		{cantCode:"371082107",cantName:"荫子镇",fullName:"山东省荣成市荫子镇"},
		{cantCode:"371082108",cantName:"滕家镇",fullName:"山东省荣成市滕家镇"},
		{cantCode:"371082109",cantName:"大疃镇",fullName:"山东省荣成市大疃镇"},
		{cantCode:"371082110",cantName:"上庄镇",fullName:"山东省荣成市上庄镇"},
		{cantCode:"371082111",cantName:"虎山镇",fullName:"山东省荣成市虎山镇"},
		{cantCode:"371082112",cantName:"人和镇",fullName:"山东省荣成市人和镇"}
	]
}*/

/*var _cityData = {
	cantCode:"500000",
	cantName:"重庆市",
	fullName:"重庆市",
	children:[
		{cantCode:"500101",cantName:"万州区",fullName:"重庆市万州区"},
		{cantCode:"500102",cantName:"涪陵区",fullName:"重庆市涪陵区"},
		{cantCode:"500103",cantName:"渝中区",fullName:"重庆市渝中区"},
		{cantCode:"500104",cantName:"大渡口区",fullName:"重庆市大渡口区"},
		{cantCode:"500105",cantName:"江北区",fullName:"重庆市江北区"},
		{cantCode:"500106",cantName:"沙坪坝区",fullName:"重庆市沙坪坝区"},
		{cantCode:"500107",cantName:"龙坡区",fullName:"重庆市九龙坡区"},
		{cantCode:"500108",cantName:"南岸区",fullName:"重庆市南岸区"},
		{cantCode:"500109",cantName:"北碚区",fullName:"重庆市北碚区"},
		{cantCode:"500131",cantName:"万盛经开区",fullName:"重庆市万盛经开区"},
		{cantCode:"500112",cantName:"渝北区",fullName:"重庆市渝北区"},
		{cantCode:"500113",cantName:"巴南区",fullName:"重庆市巴南区"},
		{cantCode:"500114",cantName:"黔江区",fullName:"重庆市黔江区"},
		{cantCode:"500115",cantName:"长寿区",fullName:"重庆市长寿区"},
		{cantCode:"500110",cantName:"綦江区",fullName:"重庆市綦江区"},
		{cantCode:"500152",cantName:"潼南区",fullName:"重庆市潼南区"},
		{cantCode:"500151",cantName:"铜梁区",fullName:"重庆市铜梁区"},
		{cantCode:"500111",cantName:"大足区",fullName:"重庆市大足区"},
		{cantCode:"500153",cantName:"荣昌区",fullName:"重庆市荣昌区"},
		{cantCode:"500120",cantName:"璧山区",fullName:"重庆市璧山区"},
		{cantCode:"500228",cantName:"梁平区",fullName:"重庆市梁平区"},
		{cantCode:"500229",cantName:"城口县",fullName:"重庆市城口县"},
		{cantCode:"500230",cantName:"丰都县",fullName:"重庆市丰都县"},
		{cantCode:"500231",cantName:"垫江县",fullName:"重庆市垫江县"},
		{cantCode:"500232",cantName:"武隆区",fullName:"重庆市武隆区"},
		{cantCode:"500233",cantName:"忠县",fullName:"重庆市忠县"},
		{cantCode:"500234",cantName:"开州区",fullName:"重庆市开州区"},
		{cantCode:"500235",cantName:"云阳县",fullName:"重庆市云阳县"},
		{cantCode:"500236",cantName:"奉节县",fullName:"重庆市奉节县"},
		{cantCode:"500237",cantName:"巫山县",fullName:"重庆市巫山县"},
		{cantCode:"500238",cantName:"巫溪县",fullName:"重庆市巫溪县"},
		{cantCode:"500240",cantName:"石柱土家族自治县",fullName:"重庆市石柱土家族自治县"},
		{cantCode:"500241",cantName:"秀山土家族苗族自治县",fullName:"重庆市秀山土家族苗族自治县"},
		{cantCode:"500242",cantName:"酉阳土家族苗族自治县",fullName:"重庆市酉阳土家族苗族自治县"},
		{cantCode:"500243",cantName:"重庆市彭水苗族土家族自治县",fullName:"重庆市彭水苗族土家族自治县"},
		{cantCode:"500116",cantName:"江津区",fullName:"重庆市江津区"},
		{cantCode:"500117",cantName:"合川区",fullName:"重庆市合川区"},
		{cantCode:"500118",cantName:"永川区",fullName:"重庆市永川区"},
		{cantCode:"500119",cantName:"南川区",fullName:"重庆市南川区"},
		{cantCode:"500245",cantName:"两江新区",fullName:"重庆市两江新区"}
	]
}
*/



/**
 * 全国行政区划
 * TODO: 维护fullName属性，且这些数据不一定是最新的
 */
var _allcityData = {
	cantCode:"CN",
	cantName:"中国",
	fullName:"中华人民共和国",
	children:[{
		cantCode: '110000',
		cantName: '北京市',
		fullName:"北京市",
		children: [{
			cantCode: "110100",
			cantName: "北京市",
			fullName:"北京市",
			children: [{
				cantCode: "110101",
				cantName: "东城区",
				fullName:"北京市东城区"
			}, {
				cantCode: "110102",
				cantName: "西城区",
				fullName:"北京市西城区"
			}, {
				cantCode: "110103",
				cantName: "崇文区",
				fullName:"北京市崇文区"
			}, {
				cantCode: "110104",
				cantName: "宣武区",
				fullName:"北京市宣武区"
			}, {
				cantCode: "110105",
				cantName: "朝阳区",
				fullName:"北京市朝阳区"
			}, {
				cantCode: "110106",
				cantName: "丰台区",
				fullName:"北京市丰台区"
			}, {
				cantCode: "110107",
				cantName: "石景山区",
				fullName:"北京市石景山区"
			}, {
				cantCode: "110108",
				cantName: "海淀区",
				fullName:"北京市海淀区"
			}, {
				cantCode: "110109",
				cantName: "门头沟区",
				fullName:"北京市门头沟区"
			}, {
				cantCode: "110111",
				cantName: "房山区",
				fullName:"北京市房山区"
			}, {
				cantCode: "110112",
				cantName: "通州区",
				fullName:"北京市通州区"
			}, {
				cantCode: "110113",
				cantName: "顺义区",
				fullName:"北京市顺义区"
			}, {
				cantCode: "110114",
				cantName: "昌平区",
				fullName:"北京市昌平区"
			}, {
				cantCode: "110115",
				cantName: "大兴区",
				fullName:"北京市大兴区"
			}, {
				cantCode: "110116",
				cantName: "怀柔区",
				fullName:"北京市怀柔区"
			}, {
				cantCode: "110117",
				cantName: "平谷区",
				fullName:"北京市平谷区"
			}, {
				cantCode: "110228",
				cantName: "密云县",
				fullName:"北京市密云县"
			}, {
				cantCode: "110229",
				cantName: "延庆县",
				fullName:"北京市延庆县"
			}, {
				cantCode: "110230",
				cantName: "其它区",
				fullName:"北京市其它区"
			}]
		}]
	}, {
		cantCode: '120000',
		cantName: '天津市',
		fullName:"天津市",
		children: [{
			cantCode: "120100",
			cantName: "天津市",
			fullName:"天津市",
			children: [{
				cantCode: "120101",
				cantName: "和平区",
				fullName:"天津市和平区"
			}, {
				cantCode: "120102",
				cantName: "河东区",
				fullName:"天津市河东区"
			}, {
				cantCode: "120103",
				cantName: "河西区",
				fullName:"天津市河西区"
			}, {
				cantCode: "120104",
				cantName: "南开区",
				fullName:"天津市南开区"
			}, {
				cantCode: "120105",
				cantName: "河北区",
				fullName:"天津市河北区"
			}, {
				cantCode: "120106",
				cantName: "红桥区",
				fullName:"天津市红桥区"
			}, {
				cantCode: "120107",
				cantName: "塘沽区",
				fullName:"天津市塘沽区"
			}, {
				cantCode: "120108",
				cantName: "汉沽区",
				fullName:"天津市汉沽区"
			}, {
				cantCode: "120109",
				cantName: "大港区",
				fullName:"天津市大港区"
			}, {
				cantCode: "120110",
				cantName: "东丽区",
				fullName:"天津市东丽区"
			}, {
				cantCode: "120111",
				cantName: "西青区",
				fullName:"天津市西青区"
			}, {
				cantCode: "120112",
				cantName: "津南区",
				fullName:"天津市津南区"
			}, {
				cantCode: "120113",
				cantName: "北辰区",
				fullName:"天津市北辰区"
			}, {
				cantCode: "120114",
				cantName: "武清区",
				fullName:"天津市武清区"
			}, {
				cantCode: "120115",
				cantName: "宝坻区",
				fullName:"天津市宝坻区"
			}, {
				cantCode: "120116",
				cantName: "滨海新区",
				fullName:"天津市滨海新区"
			}, {
				cantCode: "120221",
				cantName: "宁河县",
				fullName:"天津市宁河县"
			}, {
				cantCode: "120223",
				cantName: "静海县",
				fullName:"天津市静海县"
			}, {
				cantCode: "120225",
				cantName: "蓟县",
				fullName:"天津市蓟县"
			}, {
				cantCode: "120226",
				cantName: "其它区",
				fullName:"天津市其它区"
			}]
		}]
	}, {
		cantCode: '130000',
		cantName: '河北省',
		fullName:"河北省",
		children: [{
			cantCode: "130100",
			cantName: "石家庄市",
			fullName:"河北省石家庄市",
			children: [{
				cantCode: "130102",
				cantName: "长安区",
				fullName:"河北省石家庄市长安区"
			}, {
				cantCode: "130103",
				cantName: "桥东区",
				fullName:"河北省石家庄市桥东区"
			}, {
				cantCode: "130104",
				cantName: "桥西区"
			}, {
				cantCode: "130105",
				cantName: "新华区"
			}, {
				cantCode: "130107",
				cantName: "井陉矿区"
			}, {
				cantCode: "130108",
				cantName: "裕华区"
			}, {
				cantCode: "130121",
				cantName: "井陉县"
			}, {
				cantCode: "130123",
				cantName: "正定县"
			}, {
				cantCode: "130124",
				cantName: "栾城县"
			}, {
				cantCode: "130125",
				cantName: "行唐县"
			}, {
				cantCode: "130126",
				cantName: "灵寿县"
			}, {
				cantCode: "130127",
				cantName: "高邑县"
			}, {
				cantCode: "130128",
				cantName: "深泽县"
			}, {
				cantCode: "130129",
				cantName: "赞皇县"
			}, {
				cantCode: "130130",
				cantName: "无极县"
			}, {
				cantCode: "130131",
				cantName: "平山县"
			}, {
				cantCode: "130132",
				cantName: "元氏县"
			}, {
				cantCode: "130133",
				cantName: "赵县"
			}, {
				cantCode: "130181",
				cantName: "辛集市"
			}, {
				cantCode: "130182",
				cantName: "藁城市"
			}, {
				cantCode: "130183",
				cantName: "晋州市"
			}, {
				cantCode: "130184",
				cantName: "新乐市"
			}, {
				cantCode: "130185",
				cantName: "鹿泉市"
			}, {
				cantCode: "130186",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130200",
			cantName: "唐山市",
			children: [{
				cantCode: "130202",
				cantName: "路南区"
			}, {
				cantCode: "130203",
				cantName: "路北区"
			}, {
				cantCode: "130204",
				cantName: "古冶区"
			}, {
				cantCode: "130205",
				cantName: "开平区"
			}, {
				cantCode: "130207",
				cantName: "丰南区"
			}, {
				cantCode: "130208",
				cantName: "丰润区"
			}, {
				cantCode: "130223",
				cantName: "滦县"
			}, {
				cantCode: "130224",
				cantName: "滦南县"
			}, {
				cantCode: "130225",
				cantName: "乐亭县"
			}, {
				cantCode: "130227",
				cantName: "迁西县"
			}, {
				cantCode: "130229",
				cantName: "玉田县"
			}, {
				cantCode: "130230",
				cantName: "唐海县"
			}, {
				cantCode: "130281",
				cantName: "遵化市"
			}, {
				cantCode: "130283",
				cantName: "迁安市"
			}, {
				cantCode: "130284",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130300",
			cantName: "秦皇岛市",
			children: [{
				cantCode: "130302",
				cantName: "海港区"
			}, {
				cantCode: "130303",
				cantName: "山海关区"
			}, {
				cantCode: "130304",
				cantName: "北戴河区"
			}, {
				cantCode: "130321",
				cantName: "青龙满族自治县"
			}, {
				cantCode: "130322",
				cantName: "昌黎县"
			}, {
				cantCode: "130323",
				cantName: "抚宁县"
			}, {
				cantCode: "130324",
				cantName: "卢龙县"
			}, {
				cantCode: "130398",
				cantName: "其它区"
			}, {
				cantCode: "130399",
				cantName: "经济技术开发区"
			}]
		}, {
			cantCode: "130400",
			cantName: "邯郸市",
			children: [{
				cantCode: "130402",
				cantName: "邯山区"
			}, {
				cantCode: "130403",
				cantName: "丛台区"
			}, {
				cantCode: "130404",
				cantName: "复兴区"
			}, {
				cantCode: "130406",
				cantName: "峰峰矿区"
			}, {
				cantCode: "130421",
				cantName: "邯郸县"
			}, {
				cantCode: "130423",
				cantName: "临漳县"
			}, {
				cantCode: "130424",
				cantName: "成安县"
			}, {
				cantCode: "130425",
				cantName: "大名县"
			}, {
				cantCode: "130426",
				cantName: "涉县"
			}, {
				cantCode: "130427",
				cantName: "磁县"
			}, {
				cantCode: "130428",
				cantName: "肥乡县"
			}, {
				cantCode: "130429",
				cantName: "永年县"
			}, {
				cantCode: "130430",
				cantName: "邱县"
			}, {
				cantCode: "130431",
				cantName: "鸡泽县"
			}, {
				cantCode: "130432",
				cantName: "广平县"
			}, {
				cantCode: "130433",
				cantName: "馆陶县"
			}, {
				cantCode: "130434",
				cantName: "魏县"
			}, {
				cantCode: "130435",
				cantName: "曲周县"
			}, {
				cantCode: "130481",
				cantName: "武安市"
			}, {
				cantCode: "130482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130500",
			cantName: "邢台市",
			children: [{
				cantCode: "130502",
				cantName: "桥东区"
			}, {
				cantCode: "130503",
				cantName: "桥西区"
			}, {
				cantCode: "130521",
				cantName: "邢台县"
			}, {
				cantCode: "130522",
				cantName: "临城县"
			}, {
				cantCode: "130523",
				cantName: "内丘县"
			}, {
				cantCode: "130524",
				cantName: "柏乡县"
			}, {
				cantCode: "130525",
				cantName: "隆尧县"
			}, {
				cantCode: "130526",
				cantName: "任县"
			}, {
				cantCode: "130527",
				cantName: "南和县"
			}, {
				cantCode: "130528",
				cantName: "宁晋县"
			}, {
				cantCode: "130529",
				cantName: "巨鹿县"
			}, {
				cantCode: "130530",
				cantName: "新河县"
			}, {
				cantCode: "130531",
				cantName: "广宗县"
			}, {
				cantCode: "130532",
				cantName: "平乡县"
			}, {
				cantCode: "130533",
				cantName: "威县"
			}, {
				cantCode: "130534",
				cantName: "清河县"
			}, {
				cantCode: "130535",
				cantName: "临西县"
			}, {
				cantCode: "130581",
				cantName: "南宫市"
			}, {
				cantCode: "130582",
				cantName: "沙河市"
			}, {
				cantCode: "130583",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130600",
			cantName: "保定市",
			children: [{
				cantCode: "130602",
				cantName: "新市区"
			}, {
				cantCode: "130603",
				cantName: "北市区"
			}, {
				cantCode: "130604",
				cantName: "南市区"
			}, {
				cantCode: "130621",
				cantName: "满城县"
			}, {
				cantCode: "130622",
				cantName: "清苑县"
			}, {
				cantCode: "130623",
				cantName: "涞水县"
			}, {
				cantCode: "130624",
				cantName: "阜平县"
			}, {
				cantCode: "130625",
				cantName: "徐水县"
			}, {
				cantCode: "130626",
				cantName: "定兴县"
			}, {
				cantCode: "130627",
				cantName: "唐县"
			}, {
				cantCode: "130628",
				cantName: "高阳县"
			}, {
				cantCode: "130629",
				cantName: "容城县"
			}, {
				cantCode: "130630",
				cantName: "涞源县"
			}, {
				cantCode: "130631",
				cantName: "望都县"
			}, {
				cantCode: "130632",
				cantName: "安新县"
			}, {
				cantCode: "130633",
				cantName: "易县"
			}, {
				cantCode: "130634",
				cantName: "曲阳县"
			}, {
				cantCode: "130635",
				cantName: "蠡县"
			}, {
				cantCode: "130636",
				cantName: "顺平县"
			}, {
				cantCode: "130637",
				cantName: "博野县"
			}, {
				cantCode: "130638",
				cantName: "雄县"
			}, {
				cantCode: "130681",
				cantName: "涿州市"
			}, {
				cantCode: "130682",
				cantName: "定州市"
			}, {
				cantCode: "130683",
				cantName: "安国市"
			}, {
				cantCode: "130684",
				cantName: "高碑店市"
			}, {
				cantCode: "130698",
				cantName: "高开区"
			}, {
				cantCode: "130699",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130700",
			cantName: "张家口市",
			children: [{
				cantCode: "130702",
				cantName: "桥东区"
			}, {
				cantCode: "130703",
				cantName: "桥西区"
			}, {
				cantCode: "130705",
				cantName: "宣化区"
			}, {
				cantCode: "130706",
				cantName: "下花园区"
			}, {
				cantCode: "130721",
				cantName: "宣化县"
			}, {
				cantCode: "130722",
				cantName: "张北县"
			}, {
				cantCode: "130723",
				cantName: "康保县"
			}, {
				cantCode: "130724",
				cantName: "沽源县"
			}, {
				cantCode: "130725",
				cantName: "尚义县"
			}, {
				cantCode: "130726",
				cantName: "蔚县"
			}, {
				cantCode: "130727",
				cantName: "阳原县"
			}, {
				cantCode: "130728",
				cantName: "怀安县"
			}, {
				cantCode: "130729",
				cantName: "万全县"
			}, {
				cantCode: "130730",
				cantName: "怀来县"
			}, {
				cantCode: "130731",
				cantName: "涿鹿县"
			}, {
				cantCode: "130732",
				cantName: "赤城县"
			}, {
				cantCode: "130733",
				cantName: "崇礼县"
			}, {
				cantCode: "130734",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130800",
			cantName: "承德市",
			children: [{
				cantCode: "130802",
				cantName: "双桥区"
			}, {
				cantCode: "130803",
				cantName: "双滦区"
			}, {
				cantCode: "130804",
				cantName: "鹰手营子矿区"
			}, {
				cantCode: "130821",
				cantName: "承德县"
			}, {
				cantCode: "130822",
				cantName: "兴隆县"
			}, {
				cantCode: "130823",
				cantName: "平泉县"
			}, {
				cantCode: "130824",
				cantName: "滦平县"
			}, {
				cantCode: "130825",
				cantName: "隆化县"
			}, {
				cantCode: "130826",
				cantName: "丰宁满族自治县"
			}, {
				cantCode: "130827",
				cantName: "宽城满族自治县"
			}, {
				cantCode: "130828",
				cantName: "围场满族蒙古族自治县"
			}, {
				cantCode: "130829",
				cantName: "其它区"
			}]
		}, {
			cantCode: "130900",
			cantName: "沧州市",
			children: [{
				cantCode: "130902",
				cantName: "新华区"
			}, {
				cantCode: "130903",
				cantName: "运河区"
			}, {
				cantCode: "130921",
				cantName: "沧县"
			}, {
				cantCode: "130922",
				cantName: "青县"
			}, {
				cantCode: "130923",
				cantName: "东光县"
			}, {
				cantCode: "130924",
				cantName: "海兴县"
			}, {
				cantCode: "130925",
				cantName: "盐山县"
			}, {
				cantCode: "130926",
				cantName: "肃宁县"
			}, {
				cantCode: "130927",
				cantName: "南皮县"
			}, {
				cantCode: "130928",
				cantName: "吴桥县"
			}, {
				cantCode: "130929",
				cantName: "献县"
			}, {
				cantCode: "130930",
				cantName: "孟村回族自治县"
			}, {
				cantCode: "130981",
				cantName: "泊头市"
			}, {
				cantCode: "130982",
				cantName: "任丘市"
			}, {
				cantCode: "130983",
				cantName: "黄骅市"
			}, {
				cantCode: "130984",
				cantName: "河间市"
			}, {
				cantCode: "130985",
				cantName: "其它区"
			}]
		}, {
			cantCode: "131000",
			cantName: "廊坊市",
			children: [{
				cantCode: "131002",
				cantName: "安次区"
			}, {
				cantCode: "131003",
				cantName: "广阳区"
			}, {
				cantCode: "131022",
				cantName: "固安县"
			}, {
				cantCode: "131023",
				cantName: "永清县"
			}, {
				cantCode: "131024",
				cantName: "香河县"
			}, {
				cantCode: "131025",
				cantName: "大城县"
			}, {
				cantCode: "131026",
				cantName: "文安县"
			}, {
				cantCode: "131028",
				cantName: "大厂回族自治县"
			}, {
				cantCode: "131051",
				cantName: "开发区"
			}, {
				cantCode: "131052",
				cantName: "燕郊经济技术开发区"
			}, {
				cantCode: "131081",
				cantName: "霸州市"
			}, {
				cantCode: "131082",
				cantName: "三河市"
			}, {
				cantCode: "131083",
				cantName: "其它区"
			}]
		}, {
			cantCode: "131100",
			cantName: "衡水市",
			children: [{
				cantCode: "131102",
				cantName: "桃城区"
			}, {
				cantCode: "131121",
				cantName: "枣强县"
			}, {
				cantCode: "131122",
				cantName: "武邑县"
			}, {
				cantCode: "131123",
				cantName: "武强县"
			}, {
				cantCode: "131124",
				cantName: "饶阳县"
			}, {
				cantCode: "131125",
				cantName: "安平县"
			}, {
				cantCode: "131126",
				cantName: "故城县"
			}, {
				cantCode: "131127",
				cantName: "景县"
			}, {
				cantCode: "131128",
				cantName: "阜城县"
			}, {
				cantCode: "131181",
				cantName: "冀州市"
			}, {
				cantCode: "131182",
				cantName: "深州市"
			}, {
				cantCode: "131183",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '140000',
		cantName: '山西省',
		children: [{
			cantCode: "140100",
			cantName: "太原市",
			children: [{
				cantCode: "140105",
				cantName: "小店区"
			}, {
				cantCode: "140106",
				cantName: "迎泽区"
			}, {
				cantCode: "140107",
				cantName: "杏花岭区"
			}, {
				cantCode: "140108",
				cantName: "尖草坪区"
			}, {
				cantCode: "140109",
				cantName: "万柏林区"
			}, {
				cantCode: "140110",
				cantName: "晋源区"
			}, {
				cantCode: "140121",
				cantName: "清徐县"
			}, {
				cantCode: "140122",
				cantName: "阳曲县"
			}, {
				cantCode: "140123",
				cantName: "娄烦县"
			}, {
				cantCode: "140181",
				cantName: "古交市"
			}, {
				cantCode: "140182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140200",
			cantName: "大同市",
			children: [{
				cantCode: "140202",
				cantName: "城区"
			}, {
				cantCode: "140203",
				cantName: "矿区"
			}, {
				cantCode: "140211",
				cantName: "南郊区"
			}, {
				cantCode: "140212",
				cantName: "新荣区"
			}, {
				cantCode: "140221",
				cantName: "阳高县"
			}, {
				cantCode: "140222",
				cantName: "天镇县"
			}, {
				cantCode: "140223",
				cantName: "广灵县"
			}, {
				cantCode: "140224",
				cantName: "灵丘县"
			}, {
				cantCode: "140225",
				cantName: "浑源县"
			}, {
				cantCode: "140226",
				cantName: "左云县"
			}, {
				cantCode: "140227",
				cantName: "大同县"
			}, {
				cantCode: "140228",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140300",
			cantName: "阳泉市",
			children: [{
				cantCode: "140302",
				cantName: "城区"
			}, {
				cantCode: "140303",
				cantName: "矿区"
			}, {
				cantCode: "140311",
				cantName: "郊区"
			}, {
				cantCode: "140321",
				cantName: "平定县"
			}, {
				cantCode: "140322",
				cantName: "盂县"
			}, {
				cantCode: "140323",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140400",
			cantName: "长治市",
			children: [{
				cantCode: "140421",
				cantName: "长治县"
			}, {
				cantCode: "140423",
				cantName: "襄垣县"
			}, {
				cantCode: "140424",
				cantName: "屯留县"
			}, {
				cantCode: "140425",
				cantName: "平顺县"
			}, {
				cantCode: "140426",
				cantName: "黎城县"
			}, {
				cantCode: "140427",
				cantName: "壶关县"
			}, {
				cantCode: "140428",
				cantName: "长子县"
			}, {
				cantCode: "140429",
				cantName: "武乡县"
			}, {
				cantCode: "140430",
				cantName: "沁县"
			}, {
				cantCode: "140431",
				cantName: "沁源县"
			}, {
				cantCode: "140481",
				cantName: "潞城市"
			}, {
				cantCode: "140482",
				cantName: "城区"
			}, {
				cantCode: "140483",
				cantName: "郊区"
			}, {
				cantCode: "140484",
				cantName: "高新区"
			}, {
				cantCode: "140485",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140500",
			cantName: "晋城市",
			children: [{
				cantCode: "140502",
				cantName: "城区"
			}, {
				cantCode: "140521",
				cantName: "沁水县"
			}, {
				cantCode: "140522",
				cantName: "阳城县"
			}, {
				cantCode: "140524",
				cantName: "陵川县"
			}, {
				cantCode: "140525",
				cantName: "泽州县"
			}, {
				cantCode: "140581",
				cantName: "高平市"
			}, {
				cantCode: "140582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140600",
			cantName: "朔州市",
			children: [{
				cantCode: "140602",
				cantName: "朔城区"
			}, {
				cantCode: "140603",
				cantName: "平鲁区"
			}, {
				cantCode: "140621",
				cantName: "山阴县"
			}, {
				cantCode: "140622",
				cantName: "应县"
			}, {
				cantCode: "140623",
				cantName: "右玉县"
			}, {
				cantCode: "140624",
				cantName: "怀仁县"
			}, {
				cantCode: "140625",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140700",
			cantName: "晋中市",
			children: [{
				cantCode: "140702",
				cantName: "榆次区"
			}, {
				cantCode: "140721",
				cantName: "榆社县"
			}, {
				cantCode: "140722",
				cantName: "左权县"
			}, {
				cantCode: "140723",
				cantName: "和顺县"
			}, {
				cantCode: "140724",
				cantName: "昔阳县"
			}, {
				cantCode: "140725",
				cantName: "寿阳县"
			}, {
				cantCode: "140726",
				cantName: "太谷县"
			}, {
				cantCode: "140727",
				cantName: "祁县"
			}, {
				cantCode: "140728",
				cantName: "平遥县"
			}, {
				cantCode: "140729",
				cantName: "灵石县"
			}, {
				cantCode: "140781",
				cantName: "介休市"
			}, {
				cantCode: "140782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140800",
			cantName: "运城市",
			children: [{
				cantCode: "140802",
				cantName: "盐湖区"
			}, {
				cantCode: "140821",
				cantName: "临猗县"
			}, {
				cantCode: "140822",
				cantName: "万荣县"
			}, {
				cantCode: "140823",
				cantName: "闻喜县"
			}, {
				cantCode: "140824",
				cantName: "稷山县"
			}, {
				cantCode: "140825",
				cantName: "新绛县"
			}, {
				cantCode: "140826",
				cantName: "绛县"
			}, {
				cantCode: "140827",
				cantName: "垣曲县"
			}, {
				cantCode: "140828",
				cantName: "夏县"
			}, {
				cantCode: "140829",
				cantName: "平陆县"
			}, {
				cantCode: "140830",
				cantName: "芮城县"
			}, {
				cantCode: "140881",
				cantName: "永济市"
			}, {
				cantCode: "140882",
				cantName: "河津市"
			}, {
				cantCode: "140883",
				cantName: "其它区"
			}]
		}, {
			cantCode: "140900",
			cantName: "忻州市",
			children: [{
				cantCode: "140902",
				cantName: "忻府区"
			}, {
				cantCode: "140921",
				cantName: "定襄县"
			}, {
				cantCode: "140922",
				cantName: "五台县"
			}, {
				cantCode: "140923",
				cantName: "代县"
			}, {
				cantCode: "140924",
				cantName: "繁峙县"
			}, {
				cantCode: "140925",
				cantName: "宁武县"
			}, {
				cantCode: "140926",
				cantName: "静乐县"
			}, {
				cantCode: "140927",
				cantName: "神池县"
			}, {
				cantCode: "140928",
				cantName: "五寨县"
			}, {
				cantCode: "140929",
				cantName: "岢岚县"
			}, {
				cantCode: "140930",
				cantName: "河曲县"
			}, {
				cantCode: "140931",
				cantName: "保德县"
			}, {
				cantCode: "140932",
				cantName: "偏关县"
			}, {
				cantCode: "140981",
				cantName: "原平市"
			}, {
				cantCode: "140982",
				cantName: "其它区"
			}]
		}, {
			cantCode: "141000",
			cantName: "临汾市",
			children: [{
				cantCode: "141002",
				cantName: "尧都区"
			}, {
				cantCode: "141021",
				cantName: "曲沃县"
			}, {
				cantCode: "141022",
				cantName: "翼城县"
			}, {
				cantCode: "141023",
				cantName: "襄汾县"
			}, {
				cantCode: "141024",
				cantName: "洪洞县"
			}, {
				cantCode: "141025",
				cantName: "古县"
			}, {
				cantCode: "141026",
				cantName: "安泽县"
			}, {
				cantCode: "141027",
				cantName: "浮山县"
			}, {
				cantCode: "141028",
				cantName: "吉县"
			}, {
				cantCode: "141029",
				cantName: "乡宁县"
			}, {
				cantCode: "141030",
				cantName: "大宁县"
			}, {
				cantCode: "141031",
				cantName: "隰县"
			}, {
				cantCode: "141032",
				cantName: "永和县"
			}, {
				cantCode: "141033",
				cantName: "蒲县"
			}, {
				cantCode: "141034",
				cantName: "汾西县"
			}, {
				cantCode: "141081",
				cantName: "侯马市"
			}, {
				cantCode: "141082",
				cantName: "霍州市"
			}, {
				cantCode: "141083",
				cantName: "其它区"
			}]
		}, {
			cantCode: "141100",
			cantName: "吕梁市",
			children: [{
				cantCode: "141102",
				cantName: "离石区"
			}, {
				cantCode: "141121",
				cantName: "文水县"
			}, {
				cantCode: "141122",
				cantName: "交城县"
			}, {
				cantCode: "141123",
				cantName: "兴县"
			}, {
				cantCode: "141124",
				cantName: "临县"
			}, {
				cantCode: "141125",
				cantName: "柳林县"
			}, {
				cantCode: "141126",
				cantName: "石楼县"
			}, {
				cantCode: "141127",
				cantName: "岚县"
			}, {
				cantCode: "141128",
				cantName: "方山县"
			}, {
				cantCode: "141129",
				cantName: "中阳县"
			}, {
				cantCode: "141130",
				cantName: "交口县"
			}, {
				cantCode: "141181",
				cantName: "孝义市"
			}, {
				cantCode: "141182",
				cantName: "汾阳市"
			}, {
				cantCode: "141183",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '150000',
		cantName: '内蒙古',
		children: [{
			cantCode: "150100",
			cantName: "呼和浩特市",
			children: [{
				cantCode: "150102",
				cantName: "新城区"
			}, {
				cantCode: "150103",
				cantName: "回民区"
			}, {
				cantCode: "150104",
				cantName: "玉泉区"
			}, {
				cantCode: "150105",
				cantName: "赛罕区"
			}, {
				cantCode: "150121",
				cantName: "土默特左旗"
			}, {
				cantCode: "150122",
				cantName: "托克托县"
			}, {
				cantCode: "150123",
				cantName: "和林格尔县"
			}, {
				cantCode: "150124",
				cantName: "清水河县"
			}, {
				cantCode: "150125",
				cantName: "武川县"
			}, {
				cantCode: "150126",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150200",
			cantName: "包头市",
			children: [{
				cantCode: "150202",
				cantName: "东河区"
			}, {
				cantCode: "150203",
				cantName: "昆都仑区"
			}, {
				cantCode: "150204",
				cantName: "青山区"
			}, {
				cantCode: "150205",
				cantName: "石拐区"
			}, {
				cantCode: "150206",
				cantName: "白云矿区"
			}, {
				cantCode: "150207",
				cantName: "九原区"
			}, {
				cantCode: "150221",
				cantName: "土默特右旗"
			}, {
				cantCode: "150222",
				cantName: "固阳县"
			}, {
				cantCode: "150223",
				cantName: "达尔罕茂明安联合旗"
			}, {
				cantCode: "150224",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150300",
			cantName: "乌海市",
			children: [{
				cantCode: "150302",
				cantName: "海勃湾区"
			}, {
				cantCode: "150303",
				cantName: "海南区"
			}, {
				cantCode: "150304",
				cantName: "乌达区"
			}, {
				cantCode: "150305",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150400",
			cantName: "赤峰市",
			children: [{
				cantCode: "150402",
				cantName: "红山区"
			}, {
				cantCode: "150403",
				cantName: "元宝山区"
			}, {
				cantCode: "150404",
				cantName: "松山区"
			}, {
				cantCode: "150421",
				cantName: "阿鲁科尔沁旗"
			}, {
				cantCode: "150422",
				cantName: "巴林左旗"
			}, {
				cantCode: "150423",
				cantName: "巴林右旗"
			}, {
				cantCode: "150424",
				cantName: "林西县"
			}, {
				cantCode: "150425",
				cantName: "克什克腾旗"
			}, {
				cantCode: "150426",
				cantName: "翁牛特旗"
			}, {
				cantCode: "150428",
				cantName: "喀喇沁旗"
			}, {
				cantCode: "150429",
				cantName: "宁城县"
			}, {
				cantCode: "150430",
				cantName: "敖汉旗"
			}, {
				cantCode: "150431",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150500",
			cantName: "通辽市",
			children: [{
				cantCode: "150502",
				cantName: "科尔沁区"
			}, {
				cantCode: "150521",
				cantName: "科尔沁左翼中旗"
			}, {
				cantCode: "150522",
				cantName: "科尔沁左翼后旗"
			}, {
				cantCode: "150523",
				cantName: "开鲁县"
			}, {
				cantCode: "150524",
				cantName: "库伦旗"
			}, {
				cantCode: "150525",
				cantName: "奈曼旗"
			}, {
				cantCode: "150526",
				cantName: "扎鲁特旗"
			}, {
				cantCode: "150581",
				cantName: "霍林郭勒市"
			}, {
				cantCode: "150582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150600",
			cantName: "鄂尔多斯市",
			children: [{
				cantCode: "150602",
				cantName: "东胜区"
			}, {
				cantCode: "150621",
				cantName: "达拉特旗"
			}, {
				cantCode: "150622",
				cantName: "准格尔旗"
			}, {
				cantCode: "150623",
				cantName: "鄂托克前旗"
			}, {
				cantCode: "150624",
				cantName: "鄂托克旗"
			}, {
				cantCode: "150625",
				cantName: "杭锦旗"
			}, {
				cantCode: "150626",
				cantName: "乌审旗"
			}, {
				cantCode: "150627",
				cantName: "伊金霍洛旗"
			}, {
				cantCode: "150628",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150700",
			cantName: "呼伦贝尔市",
			children: [{
				cantCode: "150702",
				cantName: "海拉尔区"
			}, {
				cantCode: "150721",
				cantName: "阿荣旗"
			}, {
				cantCode: "150722",
				cantName: "莫力达瓦达斡尔族自治旗"
			}, {
				cantCode: "150723",
				cantName: "鄂伦春自治旗"
			}, {
				cantCode: "150724",
				cantName: "鄂温克族自治旗"
			}, {
				cantCode: "150725",
				cantName: "陈巴尔虎旗"
			}, {
				cantCode: "150726",
				cantName: "新巴尔虎左旗"
			}, {
				cantCode: "150727",
				cantName: "新巴尔虎右旗"
			}, {
				cantCode: "150781",
				cantName: "满洲里市"
			}, {
				cantCode: "150782",
				cantName: "牙克石市"
			}, {
				cantCode: "150783",
				cantName: "扎兰屯市"
			}, {
				cantCode: "150784",
				cantName: "额尔古纳市"
			}, {
				cantCode: "150785",
				cantName: "根河市"
			}, {
				cantCode: "150786",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150800",
			cantName: "巴彦淖尔市",
			children: [{
				cantCode: "150802",
				cantName: "临河区"
			}, {
				cantCode: "150821",
				cantName: "五原县"
			}, {
				cantCode: "150822",
				cantName: "磴口县"
			}, {
				cantCode: "150823",
				cantName: "乌拉特前旗"
			}, {
				cantCode: "150824",
				cantName: "乌拉特中旗"
			}, {
				cantCode: "150825",
				cantName: "乌拉特后旗"
			}, {
				cantCode: "150826",
				cantName: "杭锦后旗"
			}, {
				cantCode: "150827",
				cantName: "其它区"
			}]
		}, {
			cantCode: "150900",
			cantName: "乌兰察布市",
			children: [{
				cantCode: "150902",
				cantName: "集宁区"
			}, {
				cantCode: "150921",
				cantName: "卓资县"
			}, {
				cantCode: "150922",
				cantName: "化德县"
			}, {
				cantCode: "150923",
				cantName: "商都县"
			}, {
				cantCode: "150924",
				cantName: "兴和县"
			}, {
				cantCode: "150925",
				cantName: "凉城县"
			}, {
				cantCode: "150926",
				cantName: "察哈尔右翼前旗"
			}, {
				cantCode: "150927",
				cantName: "察哈尔右翼中旗"
			}, {
				cantCode: "150928",
				cantName: "察哈尔右翼后旗"
			}, {
				cantCode: "150929",
				cantName: "四子王旗"
			}, {
				cantCode: "150981",
				cantName: "丰镇市"
			}, {
				cantCode: "150982",
				cantName: "其它区"
			}]
		}, {
			cantCode: "152200",
			cantName: "兴安盟",
			children: [{
				cantCode: "152201",
				cantName: "乌兰浩特市"
			}, {
				cantCode: "152202",
				cantName: "阿尔山市"
			}, {
				cantCode: "152221",
				cantName: "科尔沁右翼前旗"
			}, {
				cantCode: "152222",
				cantName: "科尔沁右翼中旗"
			}, {
				cantCode: "152223",
				cantName: "扎赉特旗"
			}, {
				cantCode: "152224",
				cantName: "突泉县"
			}, {
				cantCode: "152225",
				cantName: "其它区"
			}]
		}, {
			cantCode: "152500",
			cantName: "锡林郭勒盟",
			children: [{
				cantCode: "152501",
				cantName: "二连浩特市"
			}, {
				cantCode: "152502",
				cantName: "锡林浩特市"
			}, {
				cantCode: "152522",
				cantName: "阿巴嘎旗"
			}, {
				cantCode: "152523",
				cantName: "苏尼特左旗"
			}, {
				cantCode: "152524",
				cantName: "苏尼特右旗"
			}, {
				cantCode: "152525",
				cantName: "东乌珠穆沁旗"
			}, {
				cantCode: "152526",
				cantName: "西乌珠穆沁旗"
			}, {
				cantCode: "152527",
				cantName: "太仆寺旗"
			}, {
				cantCode: "152528",
				cantName: "镶黄旗"
			}, {
				cantCode: "152529",
				cantName: "正镶白旗"
			}, {
				cantCode: "152530",
				cantName: "正蓝旗"
			}, {
				cantCode: "152531",
				cantName: "多伦县"
			}, {
				cantCode: "152532",
				cantName: "其它区"
			}]
		}, {
			cantCode: "152900",
			cantName: "阿拉善盟",
			children: [{
				cantCode: "152921",
				cantName: "阿拉善左旗"
			}, {
				cantCode: "152922",
				cantName: "阿拉善右旗"
			}, {
				cantCode: "152923",
				cantName: "额济纳旗"
			}, {
				cantCode: "152924",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '210000',
		cantName: '辽宁省',
		children: [{
			cantCode:"210100",
			cantName:"沈阳市",
			fullName:"辽宁省沈阳市",
			children:[
				{cantCode:"210101",cantName:"市辖区",fullName:"辽宁省沈阳市市辖区"},
				{cantCode:"210102",cantName:"和平区",fullName:"辽宁省沈阳市和平区"},
				{cantCode:"210103",cantName:"沈河区",fullName:"辽宁省沈阳市沈河区"},
				{cantCode:"210104",cantName:"大东区",fullName:"辽宁省沈阳市大东区"},
				{cantCode:"210105",cantName:"皇姑区",fullName:"辽宁省沈阳市皇姑区"},
				{cantCode:"210106",cantName:"铁西区",fullName:"辽宁省沈阳市铁西区"},
				{cantCode:"210111",cantName:"苏家屯区",fullName:"辽宁省沈阳市苏家屯区"},
				{cantCode:"210112",cantName:"浑南区",fullName:"辽宁省沈阳市浑南区"},
				{cantCode:"210113",cantName:"沈北新区",fullName:"辽宁省沈阳市沈北新区"},
				{cantCode:"210114",cantName:"于洪区",fullName:"辽宁省沈阳市于洪区"},
				{cantCode:"210122",cantName:"辽中区",fullName:"辽宁省沈阳市辽中区"},
				{cantCode:"210123",cantName:"康平县",fullName:"辽宁省沈阳市康平县"},
				{cantCode:"210124",cantName:"法库县",fullName:"辽宁省沈阳市法库县"},
				{cantCode:"210181",cantName:"新民市",fullName:"辽宁省沈阳市新民市"},
				{cantCode:"210109",cantName:"经开区",fullName:"辽宁省沈阳市经济技术开发区"}
			]
		}, {
			cantCode: "210200",
			cantName: "大连市",
			children: [{
				cantCode: "210202",
				cantName: "中山区"
			}, {
				cantCode: "210203",
				cantName: "西岗区"
			}, {
				cantCode: "210204",
				cantName: "沙河口区"
			}, {
				cantCode: "210211",
				cantName: "甘井子区"
			}, {
				cantCode: "210212",
				cantName: "旅顺口区"
			}, {
				cantCode: "210213",
				cantName: "金州区"
			}, {
				cantCode: "210224",
				cantName: "长海县"
			}, {
				cantCode: "210251",
				cantName: "开发区"
			}, {
				cantCode: "210281",
				cantName: "瓦房店市"
			}, {
				cantCode: "210282",
				cantName: "普兰店市"
			}, {
				cantCode: "210283",
				cantName: "庄河市"
			}, {
				cantCode: "210297",
				cantName: "岭前区"
			}, {
				cantCode: "210298",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210300",
			cantName: "鞍山市",
			children: [{
				cantCode: "210302",
				cantName: "铁东区"
			}, {
				cantCode: "210303",
				cantName: "铁西区"
			}, {
				cantCode: "210304",
				cantName: "立山区"
			}, {
				cantCode: "210311",
				cantName: "千山区"
			}, {
				cantCode: "210321",
				cantName: "台安县"
			}, {
				cantCode: "210323",
				cantName: "岫岩满族自治县"
			}, {
				cantCode: "210351",
				cantName: "高新区"
			}, {
				cantCode: "210381",
				cantName: "海城市"
			}, {
				cantCode: "210382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210400",
			cantName: "抚顺市",
			children: [{
				cantCode: "210402",
				cantName: "新抚区"
			}, {
				cantCode: "210403",
				cantName: "东洲区"
			}, {
				cantCode: "210404",
				cantName: "望花区"
			}, {
				cantCode: "210411",
				cantName: "顺城区"
			}, {
				cantCode: "210421",
				cantName: "抚顺县"
			}, {
				cantCode: "210422",
				cantName: "新宾满族自治县"
			}, {
				cantCode: "210423",
				cantName: "清原满族自治县"
			}, {
				cantCode: "210424",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210500",
			cantName: "本溪市",
			children: [{
				cantCode: "210502",
				cantName: "平山区"
			}, {
				cantCode: "210503",
				cantName: "溪湖区"
			}, {
				cantCode: "210504",
				cantName: "明山区"
			}, {
				cantCode: "210505",
				cantName: "南芬区"
			}, {
				cantCode: "210521",
				cantName: "本溪满族自治县"
			}, {
				cantCode: "210522",
				cantName: "桓仁满族自治县"
			}, {
				cantCode: "210523",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210600",
			cantName: "丹东市",
			children: [{
				cantCode: "210602",
				cantName: "元宝区"
			}, {
				cantCode: "210603",
				cantName: "振兴区"
			}, {
				cantCode: "210604",
				cantName: "振安区"
			}, {
				cantCode: "210624",
				cantName: "宽甸满族自治县"
			}, {
				cantCode: "210681",
				cantName: "东港市"
			}, {
				cantCode: "210682",
				cantName: "凤城市"
			}, {
				cantCode: "210683",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210700",
			cantName: "锦州市",
			children: [{
				cantCode: "210702",
				cantName: "古塔区"
			}, {
				cantCode: "210703",
				cantName: "凌河区"
			}, {
				cantCode: "210711",
				cantName: "太和区"
			}, {
				cantCode: "210726",
				cantName: "黑山县"
			}, {
				cantCode: "210727",
				cantName: "义县"
			}, {
				cantCode: "210781",
				cantName: "凌海市"
			}, {
				cantCode: "210782",
				cantName: "北镇市"
			}, {
				cantCode: "210783",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210800",
			cantName: "营口市",
			children: [{
				cantCode: "210802",
				cantName: "站前区"
			}, {
				cantCode: "210803",
				cantName: "西市区"
			}, {
				cantCode: "210804",
				cantName: "鲅鱼圈区"
			}, {
				cantCode: "210811",
				cantName: "老边区"
			}, {
				cantCode: "210881",
				cantName: "盖州市"
			}, {
				cantCode: "210882",
				cantName: "大石桥市"
			}, {
				cantCode: "210883",
				cantName: "其它区"
			}]
		}, {
			cantCode: "210900",
			cantName: "阜新市",
			children: [{
				cantCode: "210902",
				cantName: "海州区"
			}, {
				cantCode: "210903",
				cantName: "新邱区"
			}, {
				cantCode: "210904",
				cantName: "太平区"
			}, {
				cantCode: "210905",
				cantName: "清河门区"
			}, {
				cantCode: "210911",
				cantName: "细河区"
			}, {
				cantCode: "210921",
				cantName: "阜新蒙古族自治县"
			}, {
				cantCode: "210922",
				cantName: "彰武县"
			}, {
				cantCode: "210923",
				cantName: "其它区"
			}]
		}, {
			cantCode: "211000",
			cantName: "辽阳市",
			children: [{
				cantCode: "211002",
				cantName: "白塔区"
			}, {
				cantCode: "211003",
				cantName: "文圣区"
			}, {
				cantCode: "211004",
				cantName: "宏伟区"
			}, {
				cantCode: "211005",
				cantName: "弓长岭区"
			}, {
				cantCode: "211011",
				cantName: "太子河区"
			}, {
				cantCode: "211021",
				cantName: "辽阳县"
			}, {
				cantCode: "211081",
				cantName: "灯塔市"
			}, {
				cantCode: "211082",
				cantName: "其它区"
			}]
		}, {
			cantCode: "211100",
			cantName: "盘锦市",
			children: [{
				cantCode: "211102",
				cantName: "双台子区"
			}, {
				cantCode: "211103",
				cantName: "兴隆台区"
			}, {
				cantCode: "211121",
				cantName: "大洼县"
			}, {
				cantCode: "211122",
				cantName: "盘山县"
			}, {
				cantCode: "211123",
				cantName: "其它区"
			}]
		}, {
			cantCode: "211200",
			cantName: "铁岭市",
			children: [{
				cantCode: "211202",
				cantName: "银州区"
			}, {
				cantCode: "211204",
				cantName: "清河区"
			}, {
				cantCode: "211221",
				cantName: "铁岭县"
			}, {
				cantCode: "211223",
				cantName: "西丰县"
			}, {
				cantCode: "211224",
				cantName: "昌图县"
			}, {
				cantCode: "211281",
				cantName: "调兵山市"
			}, {
				cantCode: "211282",
				cantName: "开原市"
			}, {
				cantCode: "211283",
				cantName: "其它区"
			}]
		}, {
			cantCode: "211300",
			cantName: "朝阳市",
			children: [{
				cantCode: "211302",
				cantName: "双塔区"
			}, {
				cantCode: "211303",
				cantName: "龙城区"
			}, {
				cantCode: "211321",
				cantName: "朝阳县"
			}, {
				cantCode: "211322",
				cantName: "建平县"
			}, {
				cantCode: "211324",
				cantName: "喀喇沁左翼蒙古族自治县"
			}, {
				cantCode: "211381",
				cantName: "北票市"
			}, {
				cantCode: "211382",
				cantName: "凌源市"
			}, {
				cantCode: "211383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "211400",
			cantName: "葫芦岛市",
			children: [{
				cantCode: "211402",
				cantName: "连山区"
			}, {
				cantCode: "211403",
				cantName: "龙港区"
			}, {
				cantCode: "211404",
				cantName: "南票区"
			}, {
				cantCode: "211421",
				cantName: "绥中县"
			}, {
				cantCode: "211422",
				cantName: "建昌县"
			}, {
				cantCode: "211481",
				cantName: "兴城市"
			}, {
				cantCode: "211482",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '220000',
		cantName: '吉林省',
		children: [{
			cantCode: "220100",
			cantName: "长春市",
			children: [{
				cantCode: "220102",
				cantName: "南关区"
			}, {
				cantCode: "220103",
				cantName: "宽城区"
			}, {
				cantCode: "220104",
				cantName: "朝阳区"
			}, {
				cantCode: "220105",
				cantName: "二道区"
			}, {
				cantCode: "220106",
				cantName: "绿园区"
			}, {
				cantCode: "220112",
				cantName: "双阳区"
			}, {
				cantCode: "220122",
				cantName: "农安县"
			}, {
				cantCode: "220181",
				cantName: "九台市"
			}, {
				cantCode: "220182",
				cantName: "榆树市"
			}, {
				cantCode: "220183",
				cantName: "德惠市"
			}, {
				cantCode: "220184",
				cantName: "高新技术产业开发区"
			}, {
				cantCode: "220185",
				cantName: "汽车产业开发区"
			}, {
				cantCode: "220186",
				cantName: "经济技术开发区"
			}, {
				cantCode: "220187",
				cantName: "净月旅游开发区"
			}, {
				cantCode: "220188",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220200",
			cantName: "吉林市",
			children: [{
				cantCode: "220202",
				cantName: "昌邑区"
			}, {
				cantCode: "220203",
				cantName: "龙潭区"
			}, {
				cantCode: "220204",
				cantName: "船营区"
			}, {
				cantCode: "220211",
				cantName: "丰满区"
			}, {
				cantCode: "220221",
				cantName: "永吉县"
			}, {
				cantCode: "220281",
				cantName: "蛟河市"
			}, {
				cantCode: "220282",
				cantName: "桦甸市"
			}, {
				cantCode: "220283",
				cantName: "舒兰市"
			}, {
				cantCode: "220284",
				cantName: "磐石市"
			}, {
				cantCode: "220285",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220300",
			cantName: "四平市",
			children: [{
				cantCode: "220302",
				cantName: "铁西区"
			}, {
				cantCode: "220303",
				cantName: "铁东区"
			}, {
				cantCode: "220322",
				cantName: "梨树县"
			}, {
				cantCode: "220323",
				cantName: "伊通满族自治县"
			}, {
				cantCode: "220381",
				cantName: "公主岭市"
			}, {
				cantCode: "220382",
				cantName: "双辽市"
			}, {
				cantCode: "220383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220400",
			cantName: "辽源市",
			children: [{
				cantCode: "220402",
				cantName: "龙山区"
			}, {
				cantCode: "220403",
				cantName: "西安区"
			}, {
				cantCode: "220421",
				cantName: "东丰县"
			}, {
				cantCode: "220422",
				cantName: "东辽县"
			}, {
				cantCode: "220423",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220500",
			cantName: "通化市",
			children: [{
				cantCode: "220502",
				cantName: "东昌区"
			}, {
				cantCode: "220503",
				cantName: "二道江区"
			}, {
				cantCode: "220521",
				cantName: "通化县"
			}, {
				cantCode: "220523",
				cantName: "辉南县"
			}, {
				cantCode: "220524",
				cantName: "柳河县"
			}, {
				cantCode: "220581",
				cantName: "梅河口市"
			}, {
				cantCode: "220582",
				cantName: "集安市"
			}, {
				cantCode: "220583",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220600",
			cantName: "白山市",
			children: [{
				cantCode: "220602",
				cantName: "八道江区"
			}, {
				cantCode: "220621",
				cantName: "抚松县"
			}, {
				cantCode: "220622",
				cantName: "靖宇县"
			}, {
				cantCode: "220623",
				cantName: "长白朝鲜族自治县"
			}, {
				cantCode: "220625",
				cantName: "江源市"
			}, {
				cantCode: "220681",
				cantName: "临江市"
			}, {
				cantCode: "220682",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220700",
			cantName: "松原市",
			children: [{
				cantCode: "220702",
				cantName: "宁江区"
			}, {
				cantCode: "220721",
				cantName: "前郭尔罗斯蒙古族自治县"
			}, {
				cantCode: "220722",
				cantName: "长岭县"
			}, {
				cantCode: "220723",
				cantName: "乾安县"
			}, {
				cantCode: "220724",
				cantName: "扶余县"
			}, {
				cantCode: "220725",
				cantName: "其它区"
			}]
		}, {
			cantCode: "220800",
			cantName: "白城市",
			children: [{
				cantCode: "220802",
				cantName: "洮北区"
			}, {
				cantCode: "220821",
				cantName: "镇赉县"
			}, {
				cantCode: "220822",
				cantName: "通榆县"
			}, {
				cantCode: "220881",
				cantName: "洮南市"
			}, {
				cantCode: "220882",
				cantName: "大安市"
			}, {
				cantCode: "220883",
				cantName: "其它区"
			}]
		}, {
			cantCode: "222400",
			cantName: "延边朝鲜族自治州",
			children: [{
				cantCode: "222401",
				cantName: "延吉市"
			}, {
				cantCode: "222402",
				cantName: "图们市"
			}, {
				cantCode: "222403",
				cantName: "敦化市"
			}, {
				cantCode: "222404",
				cantName: "珲春市"
			}, {
				cantCode: "222405",
				cantName: "龙井市"
			}, {
				cantCode: "222406",
				cantName: "和龙市"
			}, {
				cantCode: "222424",
				cantName: "汪清县"
			}, {
				cantCode: "222426",
				cantName: "安图县"
			}, {
				cantCode: "222427",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '230000',
		cantName: '黑龙江省',
		children: [{
			cantCode:"230100",
			cantName:"哈尔滨市",
			fullName:"黑龙江省哈尔滨市",
			children:[
				{cantCode:"230102",cantName:"道里区",fullName:"黑龙江省哈尔滨市道里区"},
				{cantCode:"230103",cantName:"南岗区",fullName:"黑龙江省哈尔滨市南岗区"},
				{cantCode:"230104",cantName:"道外区",fullName:"黑龙江省哈尔滨市道外区"},
				{cantCode:"230110",cantName:"香坊区",fullName:"黑龙江省哈尔滨市香坊区"},
				{cantCode:"230108",cantName:"平房区",fullName:"黑龙江省哈尔滨市平房区"},
				{cantCode:"230111",cantName:"呼兰区",fullName:"黑龙江省哈尔滨市呼兰区"},
				{cantCode:"230123",cantName:"依兰县",fullName:"黑龙江省哈尔滨市依兰县"},
				{cantCode:"230124",cantName:"方正县",fullName:"黑龙江省哈尔滨市方正县"},
				{cantCode:"230125",cantName:"宾县",fullName:"黑龙江省哈尔滨市宾县"},
				{cantCode:"230126",cantName:"巴彦县",fullName:"黑龙江省哈尔滨市巴彦县"},
				{cantCode:"230127",cantName:"木兰县",fullName:"黑龙江省哈尔滨市木兰县"},
				{cantCode:"230128",cantName:"通河县",fullName:"黑龙江省哈尔滨市通河县"},
				{cantCode:"230129",cantName:"延寿县",fullName:"黑龙江省哈尔滨市延寿县"},
				{cantCode:"230112",cantName:"阿城市",fullName:"黑龙江省哈尔滨市阿城市"},
				{cantCode:"230113",cantName:"双城市",fullName:"黑龙江省哈尔滨市双城市"},
				{cantCode:"230183",cantName:"双城市",fullName:"黑龙江省哈尔滨市尚志市"},
				{cantCode:"230184",cantName:"五常市",fullName:"黑龙江省哈尔滨市五常市"}
			]
		}, {
			cantCode: "230200",
			cantName: "齐齐哈尔市",
			children: [{
				cantCode: "230202",
				cantName: "龙沙区"
			}, {
				cantCode: "230203",
				cantName: "建华区"
			}, {
				cantCode: "230204",
				cantName: "铁锋区"
			}, {
				cantCode: "230205",
				cantName: "昂昂溪区"
			}, {
				cantCode: "230206",
				cantName: "富拉尔基区"
			}, {
				cantCode: "230207",
				cantName: "碾子山区"
			}, {
				cantCode: "230208",
				cantName: "梅里斯达斡尔族区"
			}, {
				cantCode: "230221",
				cantName: "龙江县"
			}, {
				cantCode: "230223",
				cantName: "依安县"
			}, {
				cantCode: "230224",
				cantName: "泰来县"
			}, {
				cantCode: "230225",
				cantName: "甘南县"
			}, {
				cantCode: "230227",
				cantName: "富裕县"
			}, {
				cantCode: "230229",
				cantName: "克山县"
			}, {
				cantCode: "230230",
				cantName: "克东县"
			}, {
				cantCode: "230231",
				cantName: "拜泉县"
			}, {
				cantCode: "230281",
				cantName: "讷河市"
			}, {
				cantCode: "230282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230300",
			cantName: "鸡西市",
			children: [{
				cantCode: "230302",
				cantName: "鸡冠区"
			}, {
				cantCode: "230303",
				cantName: "恒山区"
			}, {
				cantCode: "230304",
				cantName: "滴道区"
			}, {
				cantCode: "230305",
				cantName: "梨树区"
			}, {
				cantCode: "230306",
				cantName: "城子河区"
			}, {
				cantCode: "230307",
				cantName: "麻山区"
			}, {
				cantCode: "230321",
				cantName: "鸡东县"
			}, {
				cantCode: "230381",
				cantName: "虎林市"
			}, {
				cantCode: "230382",
				cantName: "密山市"
			}, {
				cantCode: "230383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230400",
			cantName: "鹤岗市",
			children: [{
				cantCode: "230402",
				cantName: "向阳区"
			}, {
				cantCode: "230403",
				cantName: "工农区"
			}, {
				cantCode: "230404",
				cantName: "南山区"
			}, {
				cantCode: "230405",
				cantName: "兴安区"
			}, {
				cantCode: "230406",
				cantName: "东山区"
			}, {
				cantCode: "230407",
				cantName: "兴山区"
			}, {
				cantCode: "230421",
				cantName: "萝北县"
			}, {
				cantCode: "230422",
				cantName: "绥滨县"
			}, {
				cantCode: "230423",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230500",
			cantName: "双鸭山市",
			children: [{
				cantCode: "230502",
				cantName: "尖山区"
			}, {
				cantCode: "230503",
				cantName: "岭东区"
			}, {
				cantCode: "230505",
				cantName: "四方台区"
			}, {
				cantCode: "230506",
				cantName: "宝山区"
			}, {
				cantCode: "230521",
				cantName: "集贤县"
			}, {
				cantCode: "230522",
				cantName: "友谊县"
			}, {
				cantCode: "230523",
				cantName: "宝清县"
			}, {
				cantCode: "230524",
				cantName: "饶河县"
			}, {
				cantCode: "230525",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230600",
			cantName: "大庆市",
			children: [{
				cantCode: "230602",
				cantName: "萨尔图区"
			}, {
				cantCode: "230603",
				cantName: "龙凤区"
			}, {
				cantCode: "230604",
				cantName: "让胡路区"
			}, {
				cantCode: "230605",
				cantName: "红岗区"
			}, {
				cantCode: "230606",
				cantName: "大同区"
			}, {
				cantCode: "230621",
				cantName: "肇州县"
			}, {
				cantCode: "230622",
				cantName: "肇源县"
			}, {
				cantCode: "230623",
				cantName: "林甸县"
			}, {
				cantCode: "230624",
				cantName: "杜尔伯特蒙古族自治县"
			}, {
				cantCode: "230625",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230700",
			cantName: "伊春市",
			children: [{
				cantCode: "230702",
				cantName: "伊春区"
			}, {
				cantCode: "230703",
				cantName: "南岔区"
			}, {
				cantCode: "230704",
				cantName: "友好区"
			}, {
				cantCode: "230705",
				cantName: "西林区"
			}, {
				cantCode: "230706",
				cantName: "翠峦区"
			}, {
				cantCode: "230707",
				cantName: "新青区"
			}, {
				cantCode: "230708",
				cantName: "美溪区"
			}, {
				cantCode: "230709",
				cantName: "金山屯区"
			}, {
				cantCode: "230710",
				cantName: "五营区"
			}, {
				cantCode: "230711",
				cantName: "乌马河区"
			}, {
				cantCode: "230712",
				cantName: "汤旺河区"
			}, {
				cantCode: "230713",
				cantName: "带岭区"
			}, {
				cantCode: "230714",
				cantName: "乌伊岭区"
			}, {
				cantCode: "230715",
				cantName: "红星区"
			}, {
				cantCode: "230716",
				cantName: "上甘岭区"
			}, {
				cantCode: "230722",
				cantName: "嘉荫县"
			}, {
				cantCode: "230781",
				cantName: "铁力市"
			}, {
				cantCode: "230782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230800",
			cantName: "佳木斯市",
			children: [{
				cantCode: "230802",
				cantName: "永红区"
			}, {
				cantCode: "230803",
				cantName: "向阳区"
			}, {
				cantCode: "230804",
				cantName: "前进区"
			}, {
				cantCode: "230805",
				cantName: "东风区"
			}, {
				cantCode: "230811",
				cantName: "郊区"
			}, {
				cantCode: "230822",
				cantName: "桦南县"
			}, {
				cantCode: "230826",
				cantName: "桦川县"
			}, {
				cantCode: "230828",
				cantName: "汤原县"
			}, {
				cantCode: "230833",
				cantName: "抚远县"
			}, {
				cantCode: "230881",
				cantName: "同江市"
			}, {
				cantCode: "230882",
				cantName: "富锦市"
			}, {
				cantCode: "230883",
				cantName: "其它区"
			}]
		}, {
			cantCode: "230900",
			cantName: "七台河市",
			children: [{
				cantCode: "230902",
				cantName: "新兴区"
			}, {
				cantCode: "230903",
				cantName: "桃山区"
			}, {
				cantCode: "230904",
				cantName: "茄子河区"
			}, {
				cantCode: "230921",
				cantName: "勃利县"
			}, {
				cantCode: "230922",
				cantName: "其它区"
			}]
		}, {
			cantCode: "231000",
			cantName: "牡丹江市",
			children: [{
				cantCode: "231002",
				cantName: "东安区"
			}, {
				cantCode: "231003",
				cantName: "阳明区"
			}, {
				cantCode: "231004",
				cantName: "爱民区"
			}, {
				cantCode: "231005",
				cantName: "西安区"
			}, {
				cantCode: "231024",
				cantName: "东宁县"
			}, {
				cantCode: "231025",
				cantName: "林口县"
			}, {
				cantCode: "231081",
				cantName: "绥芬河市"
			}, {
				cantCode: "231083",
				cantName: "海林市"
			}, {
				cantCode: "231084",
				cantName: "宁安市"
			}, {
				cantCode: "231085",
				cantName: "穆棱市"
			}, {
				cantCode: "231086",
				cantName: "其它区"
			}]
		}, {
			cantCode: "231100",
			cantName: "黑河市",
			children: [{
				cantCode: "231102",
				cantName: "爱辉区"
			}, {
				cantCode: "231121",
				cantName: "嫩江县"
			}, {
				cantCode: "231123",
				cantName: "逊克县"
			}, {
				cantCode: "231124",
				cantName: "孙吴县"
			}, {
				cantCode: "231181",
				cantName: "北安市"
			}, {
				cantCode: "231182",
				cantName: "五大连池市"
			}, {
				cantCode: "231183",
				cantName: "其它区"
			}]
		}, {
			cantCode: "231200",
			cantName: "绥化市",
			children: [{
				cantCode: "231202",
				cantName: "北林区"
			}, {
				cantCode: "231221",
				cantName: "望奎县"
			}, {
				cantCode: "231222",
				cantName: "兰西县"
			}, {
				cantCode: "231223",
				cantName: "青冈县"
			}, {
				cantCode: "231224",
				cantName: "庆安县"
			}, {
				cantCode: "231225",
				cantName: "明水县"
			}, {
				cantCode: "231226",
				cantName: "绥棱县"
			}, {
				cantCode: "231281",
				cantName: "安达市"
			}, {
				cantCode: "231282",
				cantName: "肇东市"
			}, {
				cantCode: "231283",
				cantName: "海伦市"
			}, {
				cantCode: "231284",
				cantName: "其它区"
			}]
		}, {
			cantCode: "232700",
			cantName: "大兴安岭地区",
			children: [{
				cantCode: "232721",
				cantName: "呼玛县"
			}, {
				cantCode: "232722",
				cantName: "塔河县"
			}, {
				cantCode: "232723",
				cantName: "漠河县"
			}, {
				cantCode: "232724",
				cantName: "加格达奇区"
			}, {
				cantCode: "232725",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '310000',
		cantName: '上海市',
		children: [{
			cantCode: '310100',
			cantName: '上海市',
			children: [{
				cantCode: "310101",
				cantName: "黄浦区"
			}, {
				cantCode: "310103",
				cantName: "卢湾区"
			}, {
				cantCode: "310104",
				cantName: "徐汇区"
			}, {
				cantCode: "310105",
				cantName: "长宁区"
			}, {
				cantCode: "310106",
				cantName: "静安区"
			}, {
				cantCode: "310107",
				cantName: "普陀区"
			}, {
				cantCode: "310108",
				cantName: "闸北区"
			}, {
				cantCode: "310109",
				cantName: "虹口区"
			}, {
				cantCode: "310110",
				cantName: "杨浦区"
			}, {
				cantCode: "310112",
				cantName: "闵行区"
			}, {
				cantCode: "310113",
				cantName: "宝山区"
			}, {
				cantCode: "310114",
				cantName: "嘉定区"
			}, {
				cantCode: "310115",
				cantName: "浦东新区"
			}, {
				cantCode: "310116",
				cantName: "金山区"
			}, {
				cantCode: "310117",
				cantName: "松江区"
			}, {
				cantCode: "310118",
				cantName: "青浦区"
			}, {
				cantCode: "310119",
				cantName: "南汇区"
			}, {
				cantCode: "310120",
				cantName: "奉贤区"
			}, {
				cantCode: "310152",
				cantName: "川沙区"
			}, {
				cantCode: "310230",
				cantName: "崇明县"
			}, {
				cantCode: "310231",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '320000',
		cantName: '江苏省',
		children: [{
			cantCode: "320100",
			cantName: "南京市",
			children: [{
				cantCode: "320102",
				cantName: "玄武区"
			}, {
				cantCode: "320103",
				cantName: "白下区"
			}, {
				cantCode: "320104",
				cantName: "秦淮区"
			}, {
				cantCode: "320105",
				cantName: "建邺区"
			}, {
				cantCode: "320106",
				cantName: "鼓楼区"
			}, {
				cantCode: "320107",
				cantName: "下关区"
			}, {
				cantCode: "320111",
				cantName: "浦口区"
			}, {
				cantCode: "320113",
				cantName: "栖霞区"
			}, {
				cantCode: "320114",
				cantName: "雨花台区"
			}, {
				cantCode: "320115",
				cantName: "江宁区"
			}, {
				cantCode: "320116",
				cantName: "六合区"
			}, {
				cantCode: "320124",
				cantName: "溧水县"
			}, {
				cantCode: "320125",
				cantName: "高淳县"
			}, {
				cantCode: "320126",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320200",
			cantName: "无锡市",
			children: [{
				cantCode: "320202",
				cantName: "崇安区"
			}, {
				cantCode: "320203",
				cantName: "南长区"
			}, {
				cantCode: "320204",
				cantName: "北塘区"
			}, {
				cantCode: "320205",
				cantName: "锡山区"
			}, {
				cantCode: "320206",
				cantName: "惠山区"
			}, {
				cantCode: "320211",
				cantName: "滨湖区"
			}, {
				cantCode: "320281",
				cantName: "江阴市"
			}, {
				cantCode: "320282",
				cantName: "宜兴市"
			}, {
				cantCode: "320296",
				cantName: "新区"
			}, {
				cantCode: "320297",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320300",
			cantName: "徐州市",
			children: [{
				cantCode: "320302",
				cantName: "鼓楼区"
			}, {
				cantCode: "320303",
				cantName: "云龙区"
			}, {
				cantCode: "320304",
				cantName: "九里区"
			}, {
				cantCode: "320305",
				cantName: "贾汪区"
			}, {
				cantCode: "320311",
				cantName: "泉山区"
			}, {
				cantCode: "320321",
				cantName: "丰县"
			}, {
				cantCode: "320322",
				cantName: "沛县"
			}, {
				cantCode: "320323",
				cantName: "铜山县"
			}, {
				cantCode: "320324",
				cantName: "睢宁县"
			}, {
				cantCode: "320381",
				cantName: "新沂市"
			}, {
				cantCode: "320382",
				cantName: "邳州市"
			}, {
				cantCode: "320383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320400",
			cantName: "常州市",
			children: [{
				cantCode: "320402",
				cantName: "天宁区"
			}, {
				cantCode: "320404",
				cantName: "钟楼区"
			}, {
				cantCode: "320405",
				cantName: "戚墅堰区"
			}, {
				cantCode: "320411",
				cantName: "新北区"
			}, {
				cantCode: "320412",
				cantName: "武进区"
			}, {
				cantCode: "320481",
				cantName: "溧阳市"
			}, {
				cantCode: "320482",
				cantName: "金坛市"
			}, {
				cantCode: "320483",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320500",
			cantName: "苏州市",
			children: [{
				cantCode: "320502",
				cantName: "沧浪区"
			}, {
				cantCode: "320503",
				cantName: "平江区"
			}, {
				cantCode: "320504",
				cantName: "金阊区"
			}, {
				cantCode: "320505",
				cantName: "虎丘区"
			}, {
				cantCode: "320506",
				cantName: "吴中区"
			}, {
				cantCode: "320507",
				cantName: "相城区"
			}, {
				cantCode: "320581",
				cantName: "常熟市"
			}, {
				cantCode: "320582",
				cantName: "张家港市"
			}, {
				cantCode: "320583",
				cantName: "昆山市"
			}, {
				cantCode: "320584",
				cantName: "吴江市"
			}, {
				cantCode: "320585",
				cantName: "太仓市"
			}, {
				cantCode: "320594",
				cantName: "新区"
			}, {
				cantCode: "320595",
				cantName: "园区"
			}, {
				cantCode: "320596",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320600",
			cantName: "南通市",
			children: [{
				cantCode: "320602",
				cantName: "崇川区"
			}, {
				cantCode: "320611",
				cantName: "港闸区"
			}, {
				cantCode: "320612",
				cantName: "通州区"
			}, {
				cantCode: "320621",
				cantName: "海安县"
			}, {
				cantCode: "320623",
				cantName: "如东县"
			}, {
				cantCode: "320681",
				cantName: "启东市"
			}, {
				cantCode: "320682",
				cantName: "如皋市"
			}, {
				cantCode: "320683",
				cantName: "通州市"
			}, {
				cantCode: "320684",
				cantName: "海门市"
			}, {
				cantCode: "320693",
				cantName: "开发区"
			}, {
				cantCode: "320694",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320700",
			cantName: "连云港市",
			children: [{
				cantCode: "320703",
				cantName: "连云区"
			}, {
				cantCode: "320705",
				cantName: "新浦区"
			}, {
				cantCode: "320706",
				cantName: "海州区"
			}, {
				cantCode: "320721",
				cantName: "赣榆县"
			}, {
				cantCode: "320722",
				cantName: "东海县"
			}, {
				cantCode: "320723",
				cantName: "灌云县"
			}, {
				cantCode: "320724",
				cantName: "灌南县"
			}, {
				cantCode: "320725",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320800",
			cantName: "淮安市",
			children: [{
				cantCode: "320802",
				cantName: "清河区"
			}, {
				cantCode: "320803",
				cantName: "楚州区"
			}, {
				cantCode: "320804",
				cantName: "淮阴区"
			}, {
				cantCode: "320811",
				cantName: "清浦区"
			}, {
				cantCode: "320826",
				cantName: "涟水县"
			}, {
				cantCode: "320829",
				cantName: "洪泽县"
			}, {
				cantCode: "320830",
				cantName: "盱眙县"
			}, {
				cantCode: "320831",
				cantName: "金湖县"
			}, {
				cantCode: "320832",
				cantName: "其它区"
			}]
		}, {
			cantCode: "320900",
			cantName: "盐城市",
			children: [{
				cantCode: "320902",
				cantName: "亭湖区"
			}, {
				cantCode: "320903",
				cantName: "盐都区"
			}, {
				cantCode: "320921",
				cantName: "响水县"
			}, {
				cantCode: "320922",
				cantName: "滨海县"
			}, {
				cantCode: "320923",
				cantName: "阜宁县"
			}, {
				cantCode: "320924",
				cantName: "射阳县"
			}, {
				cantCode: "320925",
				cantName: "建湖县"
			}, {
				cantCode: "320981",
				cantName: "东台市"
			}, {
				cantCode: "320982",
				cantName: "大丰市"
			}, {
				cantCode: "320983",
				cantName: "其它区"
			}]
		}, {
			cantCode: "321000",
			cantName: "扬州市",
			children: [{
				cantCode: "321002",
				cantName: "广陵区"
			}, {
				cantCode: "321003",
				cantName: "邗江区"
			}, {
				cantCode: "321011",
				cantName: "维扬区"
			}, {
				cantCode: "321023",
				cantName: "宝应县"
			}, {
				cantCode: "321081",
				cantName: "仪征市"
			}, {
				cantCode: "321084",
				cantName: "高邮市"
			}, {
				cantCode: "321088",
				cantName: "江都市"
			}, {
				cantCode: "321092",
				cantName: "经济开发区"
			}, {
				cantCode: "321093",
				cantName: "其它区"
			}]
		}, {
			cantCode: "321100",
			cantName: "镇江市",
			children: [{
				cantCode: "321102",
				cantName: "京口区"
			}, {
				cantCode: "321111",
				cantName: "润州区"
			}, {
				cantCode: "321112",
				cantName: "丹徒区"
			}, {
				cantCode: "321181",
				cantName: "丹阳市"
			}, {
				cantCode: "321182",
				cantName: "扬中市"
			}, {
				cantCode: "321183",
				cantName: "句容市"
			}, {
				cantCode: "321184",
				cantName: "其它区"
			}]
		}, {
			cantCode: "321200",
			cantName: "泰州市",
			children: [{
				cantCode: "321202",
				cantName: "海陵区"
			}, {
				cantCode: "321203",
				cantName: "高港区"
			}, {
				cantCode: "321281",
				cantName: "兴化市"
			}, {
				cantCode: "321282",
				cantName: "靖江市"
			}, {
				cantCode: "321283",
				cantName: "泰兴市"
			}, {
				cantCode: "321284",
				cantName: "姜堰市"
			}, {
				cantCode: "321285",
				cantName: "其它区"
			}]
		}, {
			cantCode: "321300",
			cantName: "宿迁市",
			children: [{
				cantCode: "321302",
				cantName: "宿城区"
			}, {
				cantCode: "321311",
				cantName: "宿豫区"
			}, {
				cantCode: "321322",
				cantName: "沭阳县"
			}, {
				cantCode: "321323",
				cantName: "泗阳县"
			}, {
				cantCode: "321324",
				cantName: "泗洪县"
			}, {
				cantCode: "321325",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '330000',
		cantName: '浙江省',
		children: [{
			cantCode: "330100",
			cantName: "杭州市",
			children: [{
				cantCode: "330102",
				cantName: "上城区"
			}, {
				cantCode: "330103",
				cantName: "下城区"
			}, {
				cantCode: "330104",
				cantName: "江干区"
			}, {
				cantCode: "330105",
				cantName: "拱墅区"
			}, {
				cantCode: "330106",
				cantName: "西湖区"
			}, {
				cantCode: "330108",
				cantName: "滨江区"
			}, {
				cantCode: "330109",
				cantName: "萧山区"
			}, {
				cantCode: "330110",
				cantName: "余杭区"
			}, {
				cantCode: "330122",
				cantName: "桐庐县"
			}, {
				cantCode: "330127",
				cantName: "淳安县"
			}, {
				cantCode: "330182",
				cantName: "建德市"
			}, {
				cantCode: "330183",
				cantName: "富阳市"
			}, {
				cantCode: "330185",
				cantName: "临安市"
			}, {
				cantCode: "330186",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330200",
			cantName: "宁波市",
			children: [{
				cantCode: "330203",
				cantName: "海曙区"
			}, {
				cantCode: "330204",
				cantName: "江东区"
			}, {
				cantCode: "330205",
				cantName: "江北区"
			}, {
				cantCode: "330206",
				cantName: "北仑区"
			}, {
				cantCode: "330211",
				cantName: "镇海区"
			}, {
				cantCode: "330212",
				cantName: "鄞州区"
			}, {
				cantCode: "330225",
				cantName: "象山县"
			}, {
				cantCode: "330226",
				cantName: "宁海县"
			}, {
				cantCode: "330281",
				cantName: "余姚市"
			}, {
				cantCode: "330282",
				cantName: "慈溪市"
			}, {
				cantCode: "330283",
				cantName: "奉化市"
			}, {
				cantCode: "330284",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330300",
			cantName: "温州市",
			children: [{
				cantCode: "330302",
				cantName: "鹿城区"
			}, {
				cantCode: "330303",
				cantName: "龙湾区"
			}, {
				cantCode: "330304",
				cantName: "瓯海区"
			}, {
				cantCode: "330322",
				cantName: "洞头县"
			}, {
				cantCode: "330324",
				cantName: "永嘉县"
			}, {
				cantCode: "330326",
				cantName: "平阳县"
			}, {
				cantCode: "330327",
				cantName: "苍南县"
			}, {
				cantCode: "330328",
				cantName: "文成县"
			}, {
				cantCode: "330329",
				cantName: "泰顺县"
			}, {
				cantCode: "330381",
				cantName: "瑞安市"
			}, {
				cantCode: "330382",
				cantName: "乐清市"
			}, {
				cantCode: "330383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330400",
			cantName: "嘉兴市",
			children: [{
				cantCode: "330402",
				cantName: "南湖区"
			}, {
				cantCode: "330411",
				cantName: "秀洲区"
			}, {
				cantCode: "330421",
				cantName: "嘉善县"
			}, {
				cantCode: "330424",
				cantName: "海盐县"
			}, {
				cantCode: "330481",
				cantName: "海宁市"
			}, {
				cantCode: "330482",
				cantName: "平湖市"
			}, {
				cantCode: "330483",
				cantName: "桐乡市"
			}, {
				cantCode: "330484",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330500",
			cantName: "湖州市",
			children: [{
				cantCode: "330502",
				cantName: "吴兴区"
			}, {
				cantCode: "330503",
				cantName: "南浔区"
			}, {
				cantCode: "330521",
				cantName: "德清县"
			}, {
				cantCode: "330522",
				cantName: "长兴县"
			}, {
				cantCode: "330523",
				cantName: "安吉县"
			}, {
				cantCode: "330524",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330600",
			cantName: "绍兴市",
			children: [{
				cantCode: "330602",
				cantName: "越城区"
			}, {
				cantCode: "330621",
				cantName: "柯桥区"
			}, {
				cantCode: "330624",
				cantName: "新昌县"
			}, {
				cantCode: "330681",
				cantName: "诸暨市"
			}, {
				cantCode: "330682",
				cantName: "上虞区"
			}, {
				cantCode: "330683",
				cantName: "嵊州市"
			}, {
				cantCode: "330684",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330700",
			cantName: "金华市",
			children: [{
				cantCode: "330702",
				cantName: "婺城区"
			}, {
				cantCode: "330703",
				cantName: "金东区"
			}, {
				cantCode: "330723",
				cantName: "武义县"
			}, {
				cantCode: "330726",
				cantName: "浦江县"
			}, {
				cantCode: "330727",
				cantName: "磐安县"
			}, {
				cantCode: "330781",
				cantName: "兰溪市"
			}, {
				cantCode: "330782",
				cantName: "义乌市"
			}, {
				cantCode: "330783",
				cantName: "东阳市"
			}, {
				cantCode: "330784",
				cantName: "永康市"
			}, {
				cantCode: "330785",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330800",
			cantName: "衢州市",
			children: [{
				cantCode: "330802",
				cantName: "柯城区"
			}, {
				cantCode: "330803",
				cantName: "衢江区"
			}, {
				cantCode: "330822",
				cantName: "常山县"
			}, {
				cantCode: "330824",
				cantName: "开化县"
			}, {
				cantCode: "330825",
				cantName: "龙游县"
			}, {
				cantCode: "330881",
				cantName: "江山市"
			}, {
				cantCode: "330882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "330900",
			cantName: "舟山市",
			children: [{
				cantCode: "330902",
				cantName: "定海区"
			}, {
				cantCode: "330903",
				cantName: "普陀区"
			}, {
				cantCode: "330921",
				cantName: "岱山县"
			}, {
				cantCode: "330922",
				cantName: "嵊泗县"
			}, {
				cantCode: "330923",
				cantName: "其它区"
			}]
		}, {
			cantCode: "331000",
			cantName: "台州市",
			children: [{
				cantCode: "331002",
				cantName: "椒江区"
			}, {
				cantCode: "331003",
				cantName: "黄岩区"
			}, {
				cantCode: "331004",
				cantName: "路桥区"
			}, {
				cantCode: "331021",
				cantName: "玉环县"
			}, {
				cantCode: "331022",
				cantName: "三门县"
			}, {
				cantCode: "331023",
				cantName: "天台县"
			}, {
				cantCode: "331024",
				cantName: "仙居县"
			}, {
				cantCode: "331081",
				cantName: "温岭市"
			}, {
				cantCode: "331082",
				cantName: "临海市"
			}, {
				cantCode: "331083",
				cantName: "其它区"
			}]
		}, {
			cantCode: "331100",
			cantName: "丽水市",
			children: [{
				cantCode: "331102",
				cantName: "莲都区"
			}, {
				cantCode: "331121",
				cantName: "青田县"
			}, {
				cantCode: "331122",
				cantName: "缙云县"
			}, {
				cantCode: "331123",
				cantName: "遂昌县"
			}, {
				cantCode: "331124",
				cantName: "松阳县"
			}, {
				cantCode: "331125",
				cantName: "云和县"
			}, {
				cantCode: "331126",
				cantName: "庆元县"
			}, {
				cantCode: "331127",
				cantName: "景宁畲族自治县"
			}, {
				cantCode: "331181",
				cantName: "龙泉市"
			}, {
				cantCode: "331182",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '340000',
		cantName: '安徽省',
		children: [{
			cantCode: "340100",
			cantName: "合肥市",
			children: [{
				cantCode: "340102",
				cantName: "瑶海区"
			}, {
				cantCode: "340103",
				cantName: "庐阳区"
			}, {
				cantCode: "340104",
				cantName: "蜀山区"
			}, {
				cantCode: "340111",
				cantName: "包河区"
			}, {
				cantCode: "340121",
				cantName: "长丰县"
			}, {
				cantCode: "340122",
				cantName: "肥东县"
			}, {
				cantCode: "340123",
				cantName: "肥西县"
			}, {
				cantCode: "340151",
				cantName: "高新区"
			}, {
				cantCode: "340191",
				cantName: "中区"
			}, {
				cantCode: "340192",
				cantName: "其它区"
			}, {
				cantCode: "341400",
				cantName: "巢湖市"
			}, {
				cantCode: "341402",
				cantName: "居巢区"
			}, {
				cantCode: "341421",
				cantName: "庐江县"
			}]
		}, {
			cantCode: "340200",
			cantName: "芜湖市",
			children: [{
				cantCode: "340202",
				cantName: "镜湖区"
			}, {
				cantCode: "340203",
				cantName: "弋江区"
			}, {
				cantCode: "340207",
				cantName: "鸠江区"
			}, {
				cantCode: "340208",
				cantName: "三山区"
			}, {
				cantCode: "340221",
				cantName: "芜湖县"
			}, {
				cantCode: "340222",
				cantName: "繁昌县"
			}, {
				cantCode: "340223",
				cantName: "南陵县"
			}, {
				cantCode: "340224",
				cantName: "其它区"
			}, {
				cantCode: "341422",
				cantName: "无为县"
			}]
		}, {
			cantCode: "340300",
			cantName: "蚌埠市",
			children: [{
				cantCode: "340302",
				cantName: "龙子湖区"
			}, {
				cantCode: "340303",
				cantName: "蚌山区"
			}, {
				cantCode: "340304",
				cantName: "禹会区"
			}, {
				cantCode: "340311",
				cantName: "淮上区"
			}, {
				cantCode: "340321",
				cantName: "怀远县"
			}, {
				cantCode: "340322",
				cantName: "五河县"
			}, {
				cantCode: "340323",
				cantName: "固镇县"
			}, {
				cantCode: "340324",
				cantName: "其它区"
			}]
		}, {
			cantCode: "340400",
			cantName: "淮南市",
			children: [{
				cantCode: "340402",
				cantName: "大通区"
			}, {
				cantCode: "340403",
				cantName: "田家庵区"
			}, {
				cantCode: "340404",
				cantName: "谢家集区"
			}, {
				cantCode: "340405",
				cantName: "八公山区"
			}, {
				cantCode: "340406",
				cantName: "潘集区"
			}, {
				cantCode: "340421",
				cantName: "凤台县"
			}, {
				cantCode: "340422",
				cantName: "其它区"
			}]
		}, {
			cantCode: "340500",
			cantName: "马鞍山市",
			children: [{
				cantCode: "340502",
				cantName: "金家庄区"
			}, {
				cantCode: "340503",
				cantName: "花山区"
			}, {
				cantCode: "340504",
				cantName: "雨山区"
			}, {
				cantCode: "340521",
				cantName: "当涂县"
			}, {
				cantCode: "340522",
				cantName: "其它区"
			}, {
				cantCode: "341423",
				cantName: "含山县"
			}, {
				cantCode: "341424",
				cantName: "和县"
			}]
		}, {
			cantCode: "340600",
			cantName: "淮北市",
			children: [{
				cantCode: "340602",
				cantName: "杜集区"
			}, {
				cantCode: "340603",
				cantName: "相山区"
			}, {
				cantCode: "340604",
				cantName: "烈山区"
			}, {
				cantCode: "340621",
				cantName: "濉溪县"
			}, {
				cantCode: "340622",
				cantName: "其它区"
			}]
		}, {
			cantCode: "340700",
			cantName: "铜陵市",
			children: [{
				cantCode: "340702",
				cantName: "铜官山区"
			}, {
				cantCode: "340703",
				cantName: "狮子山区"
			}, {
				cantCode: "340711",
				cantName: "郊区"
			}, {
				cantCode: "340721",
				cantName: "铜陵县"
			}, {
				cantCode: "340722",
				cantName: "其它区"
			}]
		}, {
			cantCode: "340800",
			cantName: "安庆市",
			children: [{
				cantCode: "340802",
				cantName: "迎江区"
			}, {
				cantCode: "340803",
				cantName: "大观区"
			}, {
				cantCode: "340811",
				cantName: "宜秀区"
			}, {
				cantCode: "340822",
				cantName: "怀宁县"
			}, {
				cantCode: "340823",
				cantName: "枞阳县"
			}, {
				cantCode: "340824",
				cantName: "潜山县"
			}, {
				cantCode: "340825",
				cantName: "太湖县"
			}, {
				cantCode: "340826",
				cantName: "宿松县"
			}, {
				cantCode: "340827",
				cantName: "望江县"
			}, {
				cantCode: "340828",
				cantName: "岳西县"
			}, {
				cantCode: "340881",
				cantName: "桐城市"
			}, {
				cantCode: "340882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341000",
			cantName: "黄山市",
			children: [{
				cantCode: "341002",
				cantName: "屯溪区"
			}, {
				cantCode: "341003",
				cantName: "黄山区"
			}, {
				cantCode: "341004",
				cantName: "徽州区"
			}, {
				cantCode: "341021",
				cantName: "歙县"
			}, {
				cantCode: "341022",
				cantName: "休宁县"
			}, {
				cantCode: "341023",
				cantName: "黟县"
			}, {
				cantCode: "341024",
				cantName: "祁门县"
			}, {
				cantCode: "341025",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341100",
			cantName: "滁州市",
			children: [{
				cantCode: "341102",
				cantName: "琅琊区"
			}, {
				cantCode: "341103",
				cantName: "南谯区"
			}, {
				cantCode: "341122",
				cantName: "来安县"
			}, {
				cantCode: "341124",
				cantName: "全椒县"
			}, {
				cantCode: "341125",
				cantName: "定远县"
			}, {
				cantCode: "341126",
				cantName: "凤阳县"
			}, {
				cantCode: "341181",
				cantName: "天长市"
			}, {
				cantCode: "341182",
				cantName: "明光市"
			}, {
				cantCode: "341183",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341200",
			cantName: "阜阳市",
			children: [{
				cantCode: "341202",
				cantName: "颍州区"
			}, {
				cantCode: "341203",
				cantName: "颍东区"
			}, {
				cantCode: "341204",
				cantName: "颍泉区"
			}, {
				cantCode: "341221",
				cantName: "临泉县"
			}, {
				cantCode: "341222",
				cantName: "太和县"
			}, {
				cantCode: "341225",
				cantName: "阜南县"
			}, {
				cantCode: "341226",
				cantName: "颍上县"
			}, {
				cantCode: "341282",
				cantName: "界首市"
			}, {
				cantCode: "341283",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341300",
			cantName: "宿州市",
			children: [{
				cantCode: "341302",
				cantName: "埇桥区"
			}, {
				cantCode: "341321",
				cantName: "砀山县"
			}, {
				cantCode: "341322",
				cantName: "萧县"
			}, {
				cantCode: "341323",
				cantName: "灵璧县"
			}, {
				cantCode: "341324",
				cantName: "泗县"
			}, {
				cantCode: "341325",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341500",
			cantName: "六安市",
			children: [{
				cantCode: "341502",
				cantName: "金安区"
			}, {
				cantCode: "341503",
				cantName: "裕安区"
			}, {
				cantCode: "341521",
				cantName: "寿县"
			}, {
				cantCode: "341522",
				cantName: "霍邱县"
			}, {
				cantCode: "341523",
				cantName: "舒城县"
			}, {
				cantCode: "341524",
				cantName: "金寨县"
			}, {
				cantCode: "341525",
				cantName: "霍山县"
			}, {
				cantCode: "341526",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341600",
			cantName: "亳州市",
			children: [{
				cantCode: "341602",
				cantName: "谯城区"
			}, {
				cantCode: "341621",
				cantName: "涡阳县"
			}, {
				cantCode: "341622",
				cantName: "蒙城县"
			}, {
				cantCode: "341623",
				cantName: "利辛县"
			}, {
				cantCode: "341624",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341700",
			cantName: "池州市",
			children: [{
				cantCode: "341702",
				cantName: "贵池区"
			}, {
				cantCode: "341721",
				cantName: "东至县"
			}, {
				cantCode: "341722",
				cantName: "石台县"
			}, {
				cantCode: "341723",
				cantName: "青阳县"
			}, {
				cantCode: "341724",
				cantName: "其它区"
			}]
		}, {
			cantCode: "341800",
			cantName: "宣城市",
			children: [{
				cantCode: "341802",
				cantName: "宣州区"
			}, {
				cantCode: "341821",
				cantName: "郎溪县"
			}, {
				cantCode: "341822",
				cantName: "广德县"
			}, {
				cantCode: "341823",
				cantName: "泾县"
			}, {
				cantCode: "341824",
				cantName: "绩溪县"
			}, {
				cantCode: "341825",
				cantName: "旌德县"
			}, {
				cantCode: "341881",
				cantName: "宁国市"
			}, {
				cantCode: "341882",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '350000',
		cantName: '福建省',
		children: [{
			cantCode: "350100",
			cantName: "福州市",
			children: [{
				cantCode: "350102",
				cantName: "鼓楼区"
			}, {
				cantCode: "350103",
				cantName: "台江区"
			}, {
				cantCode: "350104",
				cantName: "仓山区"
			}, {
				cantCode: "350105",
				cantName: "马尾区"
			}, {
				cantCode: "350111",
				cantName: "晋安区"
			}, {
				cantCode: "350121",
				cantName: "闽侯县"
			}, {
				cantCode: "350122",
				cantName: "连江县"
			}, {
				cantCode: "350123",
				cantName: "罗源县"
			}, {
				cantCode: "350124",
				cantName: "闽清县"
			}, {
				cantCode: "350125",
				cantName: "永泰县"
			}, {
				cantCode: "350128",
				cantName: "平潭县"
			}, {
				cantCode: "350181",
				cantName: "福清市"
			}, {
				cantCode: "350182",
				cantName: "长乐市"
			}, {
				cantCode: "350183",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350200",
			cantName: "厦门市",
			children: [{
				cantCode: "350203",
				cantName: "思明区"
			}, {
				cantCode: "350205",
				cantName: "海沧区"
			}, {
				cantCode: "350206",
				cantName: "湖里区"
			}, {
				cantCode: "350211",
				cantName: "集美区"
			}, {
				cantCode: "350212",
				cantName: "同安区"
			}, {
				cantCode: "350213",
				cantName: "翔安区"
			}, {
				cantCode: "350214",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350300",
			cantName: "莆田市",
			children: [{
				cantCode: "350302",
				cantName: "城厢区"
			}, {
				cantCode: "350303",
				cantName: "涵江区"
			}, {
				cantCode: "350304",
				cantName: "荔城区"
			}, {
				cantCode: "350305",
				cantName: "秀屿区"
			}, {
				cantCode: "350322",
				cantName: "仙游县"
			}, {
				cantCode: "350323",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350400",
			cantName: "三明市",
			children: [{
				cantCode: "350402",
				cantName: "梅列区"
			}, {
				cantCode: "350403",
				cantName: "三元区"
			}, {
				cantCode: "350421",
				cantName: "明溪县"
			}, {
				cantCode: "350423",
				cantName: "清流县"
			}, {
				cantCode: "350424",
				cantName: "宁化县"
			}, {
				cantCode: "350425",
				cantName: "大田县"
			}, {
				cantCode: "350426",
				cantName: "尤溪县"
			}, {
				cantCode: "350427",
				cantName: "沙县"
			}, {
				cantCode: "350428",
				cantName: "将乐县"
			}, {
				cantCode: "350429",
				cantName: "泰宁县"
			}, {
				cantCode: "350430",
				cantName: "建宁县"
			}, {
				cantCode: "350481",
				cantName: "永安市"
			}, {
				cantCode: "350482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350500",
			cantName: "泉州市",
			children: [{
				cantCode: "350502",
				cantName: "鲤城区"
			}, {
				cantCode: "350503",
				cantName: "丰泽区"
			}, {
				cantCode: "350504",
				cantName: "洛江区"
			}, {
				cantCode: "350505",
				cantName: "泉港区"
			}, {
				cantCode: "350521",
				cantName: "惠安县"
			}, {
				cantCode: "350524",
				cantName: "安溪县"
			}, {
				cantCode: "350525",
				cantName: "永春县"
			}, {
				cantCode: "350526",
				cantName: "德化县"
			}, {
				cantCode: "350527",
				cantName: "金门县"
			}, {
				cantCode: "350581",
				cantName: "石狮市"
			}, {
				cantCode: "350582",
				cantName: "晋江市"
			}, {
				cantCode: "350583",
				cantName: "南安市"
			}, {
				cantCode: "350584",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350600",
			cantName: "漳州市",
			children: [{
				cantCode: "350602",
				cantName: "芗城区"
			}, {
				cantCode: "350603",
				cantName: "龙文区"
			}, {
				cantCode: "350622",
				cantName: "云霄县"
			}, {
				cantCode: "350623",
				cantName: "漳浦县"
			}, {
				cantCode: "350624",
				cantName: "诏安县"
			}, {
				cantCode: "350625",
				cantName: "长泰县"
			}, {
				cantCode: "350626",
				cantName: "东山县"
			}, {
				cantCode: "350627",
				cantName: "南靖县"
			}, {
				cantCode: "350628",
				cantName: "平和县"
			}, {
				cantCode: "350629",
				cantName: "华安县"
			}, {
				cantCode: "350681",
				cantName: "龙海市"
			}, {
				cantCode: "350682",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350700",
			cantName: "南平市",
			children: [{
				cantCode: "350702",
				cantName: "延平区"
			}, {
				cantCode: "350721",
				cantName: "顺昌县"
			}, {
				cantCode: "350722",
				cantName: "浦城县"
			}, {
				cantCode: "350723",
				cantName: "光泽县"
			}, {
				cantCode: "350724",
				cantName: "松溪县"
			}, {
				cantCode: "350725",
				cantName: "政和县"
			}, {
				cantCode: "350781",
				cantName: "邵武市"
			}, {
				cantCode: "350782",
				cantName: "武夷山市"
			}, {
				cantCode: "350783",
				cantName: "建瓯市"
			}, {
				cantCode: "350784",
				cantName: "建阳市"
			}, {
				cantCode: "350785",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350800",
			cantName: "龙岩市",
			children: [{
				cantCode: "350802",
				cantName: "新罗区"
			}, {
				cantCode: "350821",
				cantName: "长汀县"
			}, {
				cantCode: "350822",
				cantName: "永定县"
			}, {
				cantCode: "350823",
				cantName: "上杭县"
			}, {
				cantCode: "350824",
				cantName: "武平县"
			}, {
				cantCode: "350825",
				cantName: "连城县"
			}, {
				cantCode: "350881",
				cantName: "漳平市"
			}, {
				cantCode: "350882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "350900",
			cantName: "宁德市",
			children: [{
				cantCode: "350902",
				cantName: "蕉城区"
			}, {
				cantCode: "350921",
				cantName: "霞浦县"
			}, {
				cantCode: "350922",
				cantName: "古田县"
			}, {
				cantCode: "350923",
				cantName: "屏南县"
			}, {
				cantCode: "350924",
				cantName: "寿宁县"
			}, {
				cantCode: "350925",
				cantName: "周宁县"
			}, {
				cantCode: "350926",
				cantName: "柘荣县"
			}, {
				cantCode: "350981",
				cantName: "福安市"
			}, {
				cantCode: "350982",
				cantName: "福鼎市"
			}, {
				cantCode: "350983",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '360000',
		cantName: '江西省',
		children: [{
			cantCode: "360100",
			cantName: "南昌市",
			children: [{
				cantCode: "360102",
				cantName: "东湖区"
			}, {
				cantCode: "360103",
				cantName: "西湖区"
			}, {
				cantCode: "360104",
				cantName: "青云谱区"
			}, {
				cantCode: "360105",
				cantName: "湾里区"
			}, {
				cantCode: "360111",
				cantName: "青山湖区"
			}, {
				cantCode: "360121",
				cantName: "南昌县"
			}, {
				cantCode: "360122",
				cantName: "新建县"
			}, {
				cantCode: "360123",
				cantName: "安义县"
			}, {
				cantCode: "360124",
				cantName: "进贤县"
			}, {
				cantCode: "360125",
				cantName: "红谷滩新区"
			}, {
				cantCode: "360126",
				cantName: "经济技术开发区"
			}, {
				cantCode: "360127",
				cantName: "昌北区"
			}, {
				cantCode: "360128",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360200",
			cantName: "景德镇市",
			children: [{
				cantCode: "360202",
				cantName: "昌江区"
			}, {
				cantCode: "360203",
				cantName: "珠山区"
			}, {
				cantCode: "360222",
				cantName: "浮梁县"
			}, {
				cantCode: "360281",
				cantName: "乐平市"
			}, {
				cantCode: "360282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360300",
			cantName: "萍乡市",
			children: [{
				cantCode: "360302",
				cantName: "安源区"
			}, {
				cantCode: "360313",
				cantName: "湘东区"
			}, {
				cantCode: "360321",
				cantName: "莲花县"
			}, {
				cantCode: "360322",
				cantName: "上栗县"
			}, {
				cantCode: "360323",
				cantName: "芦溪县"
			}, {
				cantCode: "360324",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360400",
			cantName: "九江市",
			children: [{
				cantCode: "360402",
				cantName: "庐山区"
			}, {
				cantCode: "360403",
				cantName: "浔阳区"
			}, {
				cantCode: "360421",
				cantName: "九江县"
			}, {
				cantCode: "360423",
				cantName: "武宁县"
			}, {
				cantCode: "360424",
				cantName: "修水县"
			}, {
				cantCode: "360425",
				cantName: "永修县"
			}, {
				cantCode: "360426",
				cantName: "德安县"
			}, {
				cantCode: "360427",
				cantName: "星子县"
			}, {
				cantCode: "360428",
				cantName: "都昌县"
			}, {
				cantCode: "360429",
				cantName: "湖口县"
			}, {
				cantCode: "360430",
				cantName: "彭泽县"
			}, {
				cantCode: "360481",
				cantName: "瑞昌市"
			}, {
				cantCode: "360482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360500",
			cantName: "新余市",
			children: [{
				cantCode: "360502",
				cantName: "渝水区"
			}, {
				cantCode: "360521",
				cantName: "分宜县"
			}, {
				cantCode: "360522",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360600",
			cantName: "鹰潭市",
			children: [{
				cantCode: "360602",
				cantName: "月湖区"
			}, {
				cantCode: "360622",
				cantName: "余江县"
			}, {
				cantCode: "360681",
				cantName: "贵溪市"
			}, {
				cantCode: "360682",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360700",
			cantName: "赣州市",
			children: [{
				cantCode: "360702",
				cantName: "章贡区"
			}, {
				cantCode: "360721",
				cantName: "赣县"
			}, {
				cantCode: "360722",
				cantName: "信丰县"
			}, {
				cantCode: "360723",
				cantName: "大余县"
			}, {
				cantCode: "360724",
				cantName: "上犹县"
			}, {
				cantCode: "360725",
				cantName: "崇义县"
			}, {
				cantCode: "360726",
				cantName: "安远县"
			}, {
				cantCode: "360727",
				cantName: "龙南县"
			}, {
				cantCode: "360728",
				cantName: "定南县"
			}, {
				cantCode: "360729",
				cantName: "全南县"
			}, {
				cantCode: "360730",
				cantName: "宁都县"
			}, {
				cantCode: "360731",
				cantName: "于都县"
			}, {
				cantCode: "360732",
				cantName: "兴国县"
			}, {
				cantCode: "360733",
				cantName: "会昌县"
			}, {
				cantCode: "360734",
				cantName: "寻乌县"
			}, {
				cantCode: "360735",
				cantName: "石城县"
			}, {
				cantCode: "360751",
				cantName: "黄金区"
			}, {
				cantCode: "360781",
				cantName: "瑞金市"
			}, {
				cantCode: "360782",
				cantName: "南康市"
			}, {
				cantCode: "360783",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360800",
			cantName: "吉安市",
			children: [{
				cantCode: "360802",
				cantName: "吉州区"
			}, {
				cantCode: "360803",
				cantName: "青原区"
			}, {
				cantCode: "360821",
				cantName: "吉安县"
			}, {
				cantCode: "360822",
				cantName: "吉水县"
			}, {
				cantCode: "360823",
				cantName: "峡江县"
			}, {
				cantCode: "360824",
				cantName: "新干县"
			}, {
				cantCode: "360825",
				cantName: "永丰县"
			}, {
				cantCode: "360826",
				cantName: "泰和县"
			}, {
				cantCode: "360827",
				cantName: "遂川县"
			}, {
				cantCode: "360828",
				cantName: "万安县"
			}, {
				cantCode: "360829",
				cantName: "安福县"
			}, {
				cantCode: "360830",
				cantName: "永新县"
			}, {
				cantCode: "360881",
				cantName: "井冈山市"
			}, {
				cantCode: "360882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "360900",
			cantName: "宜春市",
			children: [{
				cantCode: "360902",
				cantName: "袁州区"
			}, {
				cantCode: "360921",
				cantName: "奉新县"
			}, {
				cantCode: "360922",
				cantName: "万载县"
			}, {
				cantCode: "360923",
				cantName: "上高县"
			}, {
				cantCode: "360924",
				cantName: "宜丰县"
			}, {
				cantCode: "360925",
				cantName: "靖安县"
			}, {
				cantCode: "360926",
				cantName: "铜鼓县"
			}, {
				cantCode: "360981",
				cantName: "丰城市"
			}, {
				cantCode: "360982",
				cantName: "樟树市"
			}, {
				cantCode: "360983",
				cantName: "高安市"
			}, {
				cantCode: "360984",
				cantName: "其它区"
			}]
		}, {
			cantCode: "361000",
			cantName: "抚州市",
			children: [{
				cantCode: "361002",
				cantName: "临川区"
			}, {
				cantCode: "361021",
				cantName: "南城县"
			}, {
				cantCode: "361022",
				cantName: "黎川县"
			}, {
				cantCode: "361023",
				cantName: "南丰县"
			}, {
				cantCode: "361024",
				cantName: "崇仁县"
			}, {
				cantCode: "361025",
				cantName: "乐安县"
			}, {
				cantCode: "361026",
				cantName: "宜黄县"
			}, {
				cantCode: "361027",
				cantName: "金溪县"
			}, {
				cantCode: "361028",
				cantName: "资溪县"
			}, {
				cantCode: "361029",
				cantName: "东乡县"
			}, {
				cantCode: "361030",
				cantName: "广昌县"
			}, {
				cantCode: "361031",
				cantName: "其它区"
			}]
		}, {
			cantCode: "361100",
			cantName: "上饶市",
			children: [{
				cantCode: "361102",
				cantName: "信州区"
			}, {
				cantCode: "361121",
				cantName: "上饶县"
			}, {
				cantCode: "361122",
				cantName: "广丰县"
			}, {
				cantCode: "361123",
				cantName: "玉山县"
			}, {
				cantCode: "361124",
				cantName: "铅山县"
			}, {
				cantCode: "361125",
				cantName: "横峰县"
			}, {
				cantCode: "361126",
				cantName: "弋阳县"
			}, {
				cantCode: "361127",
				cantName: "余干县"
			}, {
				cantCode: "361128",
				cantName: "鄱阳县"
			}, {
				cantCode: "361129",
				cantName: "万年县"
			}, {
				cantCode: "361130",
				cantName: "婺源县"
			}, {
				cantCode: "361181",
				cantName: "德兴市"
			}, {
				cantCode: "361182",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '370000',
		cantName: '山东省',
		fullName: '山东省',
		children: [{
			cantCode:"370100",
			cantName:"济南市",
			fullName:"山东省济南市",
			children:[
				{cantCode:"370101",cantName:"市辖区",fullName:"山东省济南市市辖区"},
				{cantCode:"370102",cantName:"历下区",fullName:"山东省济南市历下区"},
				{cantCode:"370103",cantName:"市中区",fullName:"山东省济南市市中区"},
				{cantCode:"370104",cantName:"槐荫区",fullName:"山东省济南市槐荫区"},
				{cantCode:"370105",cantName:"天桥区",fullName:"山东省济南市天桥区"},
				{cantCode:"370112",cantName:"历城区",fullName:"山东省济南市历城区"},
				{cantCode:"370113",cantName:"长清区",fullName:"山东省济南市长清区"},
				{cantCode:"370124",cantName:"平阴县",fullName:"山东省济南市平阴县"},
				{cantCode:"370125",cantName:"济阳县",fullName:"山东省济南市济阳县"},
				{cantCode:"370126",cantName:"商河县",fullName:"山东省济南市商河县"},
				{cantCode:"370181",cantName:"章丘区",fullName:"山东省济南市章丘区"},
				{cantCode:"370189",cantName:"南部山区",fullName:"山东省济南市南部山区"},
				{cantCode:"370190",cantName:"高新技术产业开发区",fullName:"山东省济南市高新技术产业开发区"}
			]
		}, {
			cantCode: "370200",
			cantName: "青岛市",
			children: [{
				cantCode: "370202",
				cantName: "市南区"
			}, {
				cantCode: "370203",
				cantName: "市北区"
			}, {
				cantCode: "370205",
				cantName: "四方区"
			}, {
				cantCode: "370211",
				cantName: "黄岛区"
			}, {
				cantCode: "370212",
				cantName: "崂山区"
			}, {
				cantCode: "370213",
				cantName: "李沧区"
			}, {
				cantCode: "370214",
				cantName: "城阳区"
			}, {
				cantCode: "370251",
				cantName: "开发区"
			}, {
				cantCode: "370281",
				cantName: "胶州市"
			}, {
				cantCode: "370282",
				cantName: "即墨市"
			}, {
				cantCode: "370283",
				cantName: "平度市"
			}, {
				cantCode: "370284",
				cantName: "胶南市"
			}, {
				cantCode: "370285",
				cantName: "莱西市"
			}, {
				cantCode: "370286",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370300",
			cantName: "淄博市",
			children: [{
				cantCode: "370302",
				cantName: "淄川区"
			}, {
				cantCode: "370303",
				cantName: "张店区"
			}, {
				cantCode: "370304",
				cantName: "博山区"
			}, {
				cantCode: "370305",
				cantName: "临淄区"
			}, {
				cantCode: "370306",
				cantName: "周村区"
			}, {
				cantCode: "370321",
				cantName: "桓台县"
			}, {
				cantCode: "370322",
				cantName: "高青县"
			}, {
				cantCode: "370323",
				cantName: "沂源县"
			}, {
				cantCode: "370324",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370400",
			cantName: "枣庄市",
			children: [{
				cantCode: "370402",
				cantName: "市中区"
			}, {
				cantCode: "370403",
				cantName: "薛城区"
			}, {
				cantCode: "370404",
				cantName: "峄城区"
			}, {
				cantCode: "370405",
				cantName: "台儿庄区"
			}, {
				cantCode: "370406",
				cantName: "山亭区"
			}, {
				cantCode: "370481",
				cantName: "滕州市"
			}, {
				cantCode: "370482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370500",
			cantName: "东营市",
			children: [{
				cantCode: "370502",
				cantName: "东营区"
			}, {
				cantCode: "370503",
				cantName: "河口区"
			}, {
				cantCode: "370521",
				cantName: "垦利县"
			}, {
				cantCode: "370522",
				cantName: "利津县"
			}, {
				cantCode: "370523",
				cantName: "广饶县"
			}, {
				cantCode: "370589",
				cantName: "西城区"
			}, {
				cantCode: "370590",
				cantName: "东城区"
			}, {
				cantCode: "370591",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370600",
			cantName: "烟台市",
			children: [{
				cantCode: "370602",
				cantName: "芝罘区"
			}, {
				cantCode: "370611",
				cantName: "福山区"
			}, {
				cantCode: "370612",
				cantName: "牟平区"
			}, {
				cantCode: "370613",
				cantName: "莱山区"
			}, {
				cantCode: "370634",
				cantName: "长岛县"
			}, {
				cantCode: "370681",
				cantName: "龙口市"
			}, {
				cantCode: "370682",
				cantName: "莱阳市"
			}, {
				cantCode: "370683",
				cantName: "莱州市"
			}, {
				cantCode: "370684",
				cantName: "蓬莱市"
			}, {
				cantCode: "370685",
				cantName: "招远市"
			}, {
				cantCode: "370686",
				cantName: "栖霞市"
			}, {
				cantCode: "370687",
				cantName: "海阳市"
			}, {
				cantCode: "370688",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370700",
			cantName: "潍坊市",
			children: [{
				cantCode: "370702",
				cantName: "潍城区"
			}, {
				cantCode: "370703",
				cantName: "寒亭区"
			}, {
				cantCode: "370704",
				cantName: "坊子区"
			}, {
				cantCode: "370705",
				cantName: "奎文区"
			}, {
				cantCode: "370724",
				cantName: "临朐县"
			}, {
				cantCode: "370725",
				cantName: "昌乐县"
			}, {
				cantCode: "370751",
				cantName: "开发区"
			}, {
				cantCode: "370781",
				cantName: "青州市"
			}, {
				cantCode: "370782",
				cantName: "诸城市"
			}, {
				cantCode: "370783",
				cantName: "寿光市"
			}, {
				cantCode: "370784",
				cantName: "安丘市"
			}, {
				cantCode: "370785",
				cantName: "高密市"
			}, {
				cantCode: "370786",
				cantName: "昌邑市"
			}, {
				cantCode: "370787",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370800",
			cantName: "济宁市",
			children: [{
				cantCode: "370802",
				cantName: "市中区"
			}, {
				cantCode: "370811",
				cantName: "任城区"
			}, {
				cantCode: "370826",
				cantName: "微山县"
			}, {
				cantCode: "370827",
				cantName: "鱼台县"
			}, {
				cantCode: "370828",
				cantName: "金乡县"
			}, {
				cantCode: "370829",
				cantName: "嘉祥县"
			}, {
				cantCode: "370830",
				cantName: "汶上县"
			}, {
				cantCode: "370831",
				cantName: "泗水县"
			}, {
				cantCode: "370832",
				cantName: "梁山县"
			}, {
				cantCode: "370881",
				cantName: "曲阜市"
			}, {
				cantCode: "370882",
				cantName: "兖州市"
			}, {
				cantCode: "370883",
				cantName: "邹城市"
			}, {
				cantCode: "370884",
				cantName: "其它区"
			}]
		}, {
			cantCode: "370900",
			cantName: "泰安市",
			children: [{
				cantCode: "370902",
				cantName: "泰山区"
			}, {
				cantCode: "370903",
				cantName: "岱岳区"
			}, {
				cantCode: "370921",
				cantName: "宁阳县"
			}, {
				cantCode: "370923",
				cantName: "东平县"
			}, {
				cantCode: "370982",
				cantName: "新泰市"
			}, {
				cantCode: "370983",
				cantName: "肥城市"
			}, {
				cantCode: "370984",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371000",
			cantName: "威海市",
			children: [{
				cantCode: "371002",
				cantName: "环翠区"
			}, {
				cantCode: "371081",
				cantName: "文登市"
			}, {
				cantCode: "371082",
				cantName: "荣成市"
			}, {
				cantCode: "371083",
				cantName: "乳山市"
			}, {
				cantCode: "371084",
				cantName: "其它区"
			}]
		}, {
			cantCode:"371082",
			cantName:"荣成市",
			fullName:"山东省荣成市",
			children:[
				{cantCode:"371082001",cantName:"宁津街道",fullName:"山东省荣成市宁津街道"},
				{cantCode:"371082002",cantName:"港湾街道",fullName:"山东省荣成市港湾街道"},
				{cantCode:"371082003",cantName:"桃园街道",fullName:"山东省荣成市桃园街道"},
				{cantCode:"371082004",cantName:"王连街道",fullName:"山东省荣成市王连街道"},
				{cantCode:"371082005",cantName:"东山街道",fullName:"山东省荣成市东山街道"},
				{cantCode:"371082006",cantName:"斥山街道",fullName:"山东省荣成市斥山街道"},
				{cantCode:"371082007",cantName:"崖头街道",fullName:"山东省荣成市崖头街道"},
				{cantCode:"371082008",cantName:"城西街道",fullName:"山东省荣成市城西街道"},
				{cantCode:"371082009",cantName:"寻山街道",fullName:"山东省荣成市寻山街道"},
				{cantCode:"371082010",cantName:"崂山街道",fullName:"山东省荣成市崂山街道"},
				{cantCode:"371082101",cantName:"俚岛镇",fullName:"山东省荣成市俚岛镇"},
				{cantCode:"371082102",cantName:"成山镇",fullName:"山东省荣成市成山镇"},
				{cantCode:"371082103",cantName:"埠柳镇",fullName:"山东省荣成市埠柳镇"},
				{cantCode:"371082104",cantName:"港西镇",fullName:"山东省荣成市港西镇"},
				{cantCode:"371082105",cantName:"夏庄镇",fullName:"山东省荣成市夏庄镇"},
				{cantCode:"371082106",cantName:"崖西镇",fullName:"山东省荣成市崖西镇"},
				{cantCode:"371082107",cantName:"荫子镇",fullName:"山东省荣成市荫子镇"},
				{cantCode:"371082108",cantName:"滕家镇",fullName:"山东省荣成市滕家镇"},
				{cantCode:"371082109",cantName:"大疃镇",fullName:"山东省荣成市大疃镇"},
				{cantCode:"371082110",cantName:"上庄镇",fullName:"山东省荣成市上庄镇"},
				{cantCode:"371082111",cantName:"虎山镇",fullName:"山东省荣成市虎山镇"},
				{cantCode:"371082112",cantName:"人和镇",fullName:"山东省荣成市人和镇"}
			]
		}, {
			cantCode: "371100",
			cantName: "日照市",
			children: [{
				cantCode: "371102",
				cantName: "东港区"
			}, {
				cantCode: "371103",
				cantName: "岚山区"
			}, {
				cantCode: "371121",
				cantName: "五莲县"
			}, {
				cantCode: "371122",
				cantName: "莒县"
			}, {
				cantCode: "371123",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371200",
			cantName: "莱芜市",
			children: [{
				cantCode: "371202",
				cantName: "莱城区"
			}, {
				cantCode: "371203",
				cantName: "钢城区"
			}, {
				cantCode: "371204",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371300",
			cantName: "临沂市",
			children: [{
				cantCode: "371302",
				cantName: "兰山区"
			}, {
				cantCode: "371311",
				cantName: "罗庄区"
			}, {
				cantCode: "371312",
				cantName: "河东区"
			}, {
				cantCode: "371321",
				cantName: "沂南县"
			}, {
				cantCode: "371322",
				cantName: "郯城县"
			}, {
				cantCode: "371323",
				cantName: "沂水县"
			}, {
				cantCode: "371324",
				cantName: "苍山县"
			}, {
				cantCode: "371325",
				cantName: "费县"
			}, {
				cantCode: "371326",
				cantName: "平邑县"
			}, {
				cantCode: "371327",
				cantName: "莒南县"
			}, {
				cantCode: "371328",
				cantName: "蒙阴县"
			}, {
				cantCode: "371329",
				cantName: "临沭县"
			}, {
				cantCode: "371330",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371400",
			cantName: "德州市",
			children: [{
				cantCode: "371402",
				cantName: "德城区"
			}, {
				cantCode: "371421",
				cantName: "陵县"
			}, {
				cantCode: "371422",
				cantName: "宁津县"
			}, {
				cantCode: "371423",
				cantName: "庆云县"
			}, {
				cantCode: "371424",
				cantName: "临邑县"
			}, {
				cantCode: "371425",
				cantName: "齐河县"
			}, {
				cantCode: "371426",
				cantName: "平原县"
			}, {
				cantCode: "371427",
				cantName: "夏津县"
			}, {
				cantCode: "371428",
				cantName: "武城县"
			}, {
				cantCode: "371451",
				cantName: "开发区"
			}, {
				cantCode: "371481",
				cantName: "乐陵市"
			}, {
				cantCode: "371482",
				cantName: "禹城市"
			}, {
				cantCode: "371483",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371500",
			cantName: "聊城市",
			children: [{
				cantCode: "371502",
				cantName: "东昌府区"
			}, {
				cantCode: "371521",
				cantName: "阳谷县"
			}, {
				cantCode: "371522",
				cantName: "莘县"
			}, {
				cantCode: "371523",
				cantName: "茌平县"
			}, {
				cantCode: "371524",
				cantName: "东阿县"
			}, {
				cantCode: "371525",
				cantName: "冠县"
			}, {
				cantCode: "371526",
				cantName: "高唐县"
			}, {
				cantCode: "371581",
				cantName: "临清市"
			}, {
				cantCode: "371582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371600",
			cantName: "滨州市",
			children: [{
				cantCode: "371602",
				cantName: "滨城区"
			}, {
				cantCode: "371621",
				cantName: "惠民县"
			}, {
				cantCode: "371622",
				cantName: "阳信县"
			}, {
				cantCode: "371623",
				cantName: "无棣县"
			}, {
				cantCode: "371624",
				cantName: "沾化县"
			}, {
				cantCode: "371625",
				cantName: "博兴县"
			}, {
				cantCode: "371626",
				cantName: "邹平县"
			}, {
				cantCode: "371627",
				cantName: "其它区"
			}]
		}, {
			cantCode: "371700",
			cantName: "菏泽市",
			children: [{
				cantCode: "371702",
				cantName: "牡丹区"
			}, {
				cantCode: "371721",
				cantName: "曹县"
			}, {
				cantCode: "371722",
				cantName: "单县"
			}, {
				cantCode: "371723",
				cantName: "成武县"
			}, {
				cantCode: "371724",
				cantName: "巨野县"
			}, {
				cantCode: "371725",
				cantName: "郓城县"
			}, {
				cantCode: "371726",
				cantName: "鄄城县"
			}, {
				cantCode: "371727",
				cantName: "定陶县"
			}, {
				cantCode: "371728",
				cantName: "东明县"
			}, {
				cantCode: "371729",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '410000',
		cantName: '河南省',
		children: [{
			cantCode: "410100",
			cantName: "郑州市",
			children: [{
				cantCode: "410102",
				cantName: "中原区"
			}, {
				cantCode: "410103",
				cantName: "二七区"
			}, {
				cantCode: "410104",
				cantName: "管城回族区"
			}, {
				cantCode: "410105",
				cantName: "金水区"
			}, {
				cantCode: "410106",
				cantName: "上街区"
			}, {
				cantCode: "410108",
				cantName: "惠济区"
			}, {
				cantCode: "410122",
				cantName: "中牟县"
			}, {
				cantCode: "410181",
				cantName: "巩义市"
			}, {
				cantCode: "410182",
				cantName: "荥阳市"
			}, {
				cantCode: "410183",
				cantName: "新密市"
			}, {
				cantCode: "410184",
				cantName: "新郑市"
			}, {
				cantCode: "410185",
				cantName: "登封市"
			}, {
				cantCode: "410186",
				cantName: "郑东新区"
			}, {
				cantCode: "410187",
				cantName: "高新区"
			}, {
				cantCode: "410188",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410200",
			cantName: "开封市",
			children: [{
				cantCode: "410202",
				cantName: "龙亭区"
			}, {
				cantCode: "410203",
				cantName: "顺河回族区"
			}, {
				cantCode: "410204",
				cantName: "鼓楼区"
			}, {
				cantCode: "410205",
				cantName: "禹王台区"
			}, {
				cantCode: "410211",
				cantName: "金明区"
			}, {
				cantCode: "410221",
				cantName: "杞县"
			}, {
				cantCode: "410222",
				cantName: "通许县"
			}, {
				cantCode: "410223",
				cantName: "尉氏县"
			}, {
				cantCode: "410224",
				cantName: "开封县"
			}, {
				cantCode: "410225",
				cantName: "兰考县"
			}, {
				cantCode: "410226",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410300",
			cantName: "洛阳市",
			children: [{
				cantCode: "410302",
				cantName: "老城区"
			}, {
				cantCode: "410303",
				cantName: "西工区"
			}, {
				cantCode: "410304",
				cantName: "廛河回族区"
			}, {
				cantCode: "410305",
				cantName: "涧西区"
			}, {
				cantCode: "410306",
				cantName: "吉利区"
			}, {
				cantCode: "410307",
				cantName: "洛龙区"
			}, {
				cantCode: "410322",
				cantName: "孟津县"
			}, {
				cantCode: "410323",
				cantName: "新安县"
			}, {
				cantCode: "410324",
				cantName: "栾川县"
			}, {
				cantCode: "410325",
				cantName: "嵩县"
			}, {
				cantCode: "410326",
				cantName: "汝阳县"
			}, {
				cantCode: "410327",
				cantName: "宜阳县"
			}, {
				cantCode: "410328",
				cantName: "洛宁县"
			}, {
				cantCode: "410329",
				cantName: "伊川县"
			}, {
				cantCode: "410381",
				cantName: "偃师市"
			}, {
				cantCode: "471004",
				cantName: "高新区"
			}, {
				cantCode: "471005",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410400",
			cantName: "平顶山市",
			children: [{
				cantCode: "410402",
				cantName: "新华区"
			}, {
				cantCode: "410403",
				cantName: "卫东区"
			}, {
				cantCode: "410404",
				cantName: "石龙区"
			}, {
				cantCode: "410411",
				cantName: "湛河区"
			}, {
				cantCode: "410421",
				cantName: "宝丰县"
			}, {
				cantCode: "410422",
				cantName: "叶县"
			}, {
				cantCode: "410423",
				cantName: "鲁山县"
			}, {
				cantCode: "410425",
				cantName: "郏县"
			}, {
				cantCode: "410481",
				cantName: "舞钢市"
			}, {
				cantCode: "410482",
				cantName: "汝州市"
			}, {
				cantCode: "410483",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410500",
			cantName: "安阳市",
			children: [{
				cantCode: "410502",
				cantName: "文峰区"
			}, {
				cantCode: "410503",
				cantName: "北关区"
			}, {
				cantCode: "410505",
				cantName: "殷都区"
			}, {
				cantCode: "410506",
				cantName: "龙安区"
			}, {
				cantCode: "410522",
				cantName: "安阳县"
			}, {
				cantCode: "410523",
				cantName: "汤阴县"
			}, {
				cantCode: "410526",
				cantName: "滑县"
			}, {
				cantCode: "410527",
				cantName: "内黄县"
			}, {
				cantCode: "410581",
				cantName: "林州市"
			}, {
				cantCode: "410582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410600",
			cantName: "鹤壁市",
			children: [{
				cantCode: "410602",
				cantName: "鹤山区"
			}, {
				cantCode: "410603",
				cantName: "山城区"
			}, {
				cantCode: "410611",
				cantName: "淇滨区"
			}, {
				cantCode: "410621",
				cantName: "浚县"
			}, {
				cantCode: "410622",
				cantName: "淇县"
			}, {
				cantCode: "410623",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410700",
			cantName: "新乡市",
			children: [{
				cantCode: "410702",
				cantName: "红旗区"
			}, {
				cantCode: "410703",
				cantName: "卫滨区"
			}, {
				cantCode: "410704",
				cantName: "凤泉区"
			}, {
				cantCode: "410711",
				cantName: "牧野区"
			}, {
				cantCode: "410721",
				cantName: "新乡县"
			}, {
				cantCode: "410724",
				cantName: "获嘉县"
			}, {
				cantCode: "410725",
				cantName: "原阳县"
			}, {
				cantCode: "410726",
				cantName: "延津县"
			}, {
				cantCode: "410727",
				cantName: "封丘县"
			}, {
				cantCode: "410728",
				cantName: "长垣县"
			}, {
				cantCode: "410781",
				cantName: "卫辉市"
			}, {
				cantCode: "410782",
				cantName: "辉县市"
			}, {
				cantCode: "410783",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410800",
			cantName: "焦作市",
			children: [{
				cantCode: "410802",
				cantName: "解放区"
			}, {
				cantCode: "410803",
				cantName: "中站区"
			}, {
				cantCode: "410804",
				cantName: "马村区"
			}, {
				cantCode: "410811",
				cantName: "山阳区"
			}, {
				cantCode: "410821",
				cantName: "修武县"
			}, {
				cantCode: "410822",
				cantName: "博爱县"
			}, {
				cantCode: "410823",
				cantName: "武陟县"
			}, {
				cantCode: "410825",
				cantName: "温县"
			}, {
				cantCode: "410882",
				cantName: "沁阳市"
			}, {
				cantCode: "410883",
				cantName: "孟州市"
			}, {
				cantCode: "410884",
				cantName: "其它区"
			}]
		}, {
			cantCode: "410900",
			cantName: "濮阳市",
			children: [{
				cantCode: "410902",
				cantName: "华龙区"
			}, {
				cantCode: "410922",
				cantName: "清丰县"
			}, {
				cantCode: "410923",
				cantName: "南乐县"
			}, {
				cantCode: "410926",
				cantName: "范县"
			}, {
				cantCode: "410927",
				cantName: "台前县"
			}, {
				cantCode: "410928",
				cantName: "濮阳县"
			}, {
				cantCode: "410929",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411000",
			cantName: "许昌市",
			children: [{
				cantCode: "411002",
				cantName: "魏都区"
			}, {
				cantCode: "411023",
				cantName: "许昌县"
			}, {
				cantCode: "411024",
				cantName: "鄢陵县"
			}, {
				cantCode: "411025",
				cantName: "襄城县"
			}, {
				cantCode: "411081",
				cantName: "禹州市"
			}, {
				cantCode: "411082",
				cantName: "长葛市"
			}, {
				cantCode: "411083",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411100",
			cantName: "漯河市",
			children: [{
				cantCode: "411102",
				cantName: "源汇区"
			}, {
				cantCode: "411103",
				cantName: "郾城区"
			}, {
				cantCode: "411104",
				cantName: "召陵区"
			}, {
				cantCode: "411121",
				cantName: "舞阳县"
			}, {
				cantCode: "411122",
				cantName: "临颍县"
			}, {
				cantCode: "411123",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411200",
			cantName: "三门峡市",
			children: [{
				cantCode: "411202",
				cantName: "湖滨区"
			}, {
				cantCode: "411221",
				cantName: "渑池县"
			}, {
				cantCode: "411222",
				cantName: "陕县"
			}, {
				cantCode: "411224",
				cantName: "卢氏县"
			}, {
				cantCode: "411281",
				cantName: "义马市"
			}, {
				cantCode: "411282",
				cantName: "灵宝市"
			}, {
				cantCode: "411283",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411300",
			cantName: "南阳市",
			children: [{
				cantCode: "411302",
				cantName: "宛城区"
			}, {
				cantCode: "411303",
				cantName: "卧龙区"
			}, {
				cantCode: "411321",
				cantName: "南召县"
			}, {
				cantCode: "411322",
				cantName: "方城县"
			}, {
				cantCode: "411323",
				cantName: "西峡县"
			}, {
				cantCode: "411324",
				cantName: "镇平县"
			}, {
				cantCode: "411325",
				cantName: "内乡县"
			}, {
				cantCode: "411326",
				cantName: "淅川县"
			}, {
				cantCode: "411327",
				cantName: "社旗县"
			}, {
				cantCode: "411328",
				cantName: "唐河县"
			}, {
				cantCode: "411329",
				cantName: "新野县"
			}, {
				cantCode: "411330",
				cantName: "桐柏县"
			}, {
				cantCode: "411381",
				cantName: "邓州市"
			}, {
				cantCode: "411382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411400",
			cantName: "商丘市",
			children: [{
				cantCode: "411402",
				cantName: "梁园区"
			}, {
				cantCode: "411403",
				cantName: "睢阳区"
			}, {
				cantCode: "411421",
				cantName: "民权县"
			}, {
				cantCode: "411422",
				cantName: "睢县"
			}, {
				cantCode: "411423",
				cantName: "宁陵县"
			}, {
				cantCode: "411424",
				cantName: "柘城县"
			}, {
				cantCode: "411425",
				cantName: "虞城县"
			}, {
				cantCode: "411426",
				cantName: "夏邑县"
			}, {
				cantCode: "411481",
				cantName: "永城市"
			}, {
				cantCode: "411482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411500",
			cantName: "信阳市",
			children: [{
				cantCode: "411502",
				cantName: "浉河区"
			}, {
				cantCode: "411503",
				cantName: "平桥区"
			}, {
				cantCode: "411521",
				cantName: "罗山县"
			}, {
				cantCode: "411522",
				cantName: "光山县"
			}, {
				cantCode: "411523",
				cantName: "新县"
			}, {
				cantCode: "411524",
				cantName: "商城县"
			}, {
				cantCode: "411525",
				cantName: "固始县"
			}, {
				cantCode: "411526",
				cantName: "潢川县"
			}, {
				cantCode: "411527",
				cantName: "淮滨县"
			}, {
				cantCode: "411528",
				cantName: "息县"
			}, {
				cantCode: "411529",
				cantName: "其它区"
			}]
		}, {
			cantCode: "411600",
			cantName: "周口市",
			children: [{
				cantCode: "411602",
				cantName: "川汇区"
			}, {
				cantCode: "411621",
				cantName: "扶沟县"
			}, {
				cantCode: "411622",
				cantName: "西华县"
			}, {
				cantCode: "411623",
				cantName: "商水县"
			}, {
				cantCode: "411624",
				cantName: "沈丘县"
			}, {
				cantCode: "411625",
				cantName: "郸城县"
			}, {
				cantCode: "411626",
				cantName: "淮阳县"
			}, {
				cantCode: "411627",
				cantName: "太康县"
			}, {
				cantCode: "411628",
				cantName: "鹿邑县"
			}, {
				cantCode: "411681",
				cantName: "项城市"
			}, {
				cantCode: "411682",
				cantName: "其它区"
			}]
		},{
			cantCode: "411700",
			cantName: "驻马店市",
			children: [{
				cantCode: "411702",
				cantName: "驿城区"
			}, {
				cantCode: "411721",
				cantName: "西平县"
			}, {
				cantCode: "411722",
				cantName: "上蔡县"
			}, {
				cantCode: "411723",
				cantName: "平舆县"
			}, {
				cantCode: "411724",
				cantName: "正阳县"
			}, {
				cantCode: "411725",
				cantName: "确山县"
			}, {
				cantCode: "411726",
				cantName: "泌阳县"
			}, {
				cantCode: "411727",
				cantName: "汝南县"
			}, {
				cantCode: "411628",
				cantName: "遂平县"
			}, {
				cantCode: "411729",
				cantName: "新蔡县"
			}]
		}]
	}, {
		cantCode: '420000',
		cantName: '湖北省',
		children: [{
			cantCode: "420100",
			cantName: "武汉市",
			children: [{
				cantCode: "420102",
				cantName: "江岸区"
			}, {
				cantCode: "420103",
				cantName: "江汉区"
			}, {
				cantCode: "420104",
				cantName: "硚口区"
			}, {
				cantCode: "420105",
				cantName: "汉阳区"
			}, {
				cantCode: "420106",
				cantName: "武昌区"
			}, {
				cantCode: "420107",
				cantName: "青山区"
			}, {
				cantCode: "420111",
				cantName: "洪山区"
			}, {
				cantCode: "420112",
				cantName: "东西湖区"
			}, {
				cantCode: "420113",
				cantName: "汉南区"
			}, {
				cantCode: "420114",
				cantName: "蔡甸区"
			}, {
				cantCode: "420115",
				cantName: "江夏区"
			}, {
				cantCode: "420116",
				cantName: "黄陂区"
			}, {
				cantCode: "420117",
				cantName: "新洲区"
			}, {
				cantCode: "420118",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420200",
			cantName: "黄石市",
			children: [{
				cantCode: "420202",
				cantName: "黄石港区"
			}, {
				cantCode: "420203",
				cantName: "西塞山区"
			}, {
				cantCode: "420204",
				cantName: "下陆区"
			}, {
				cantCode: "420205",
				cantName: "铁山区"
			}, {
				cantCode: "420222",
				cantName: "阳新县"
			}, {
				cantCode: "420281",
				cantName: "大冶市"
			}, {
				cantCode: "420282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420300",
			cantName: "十堰市",
			children: [{
				cantCode: "420302",
				cantName: "茅箭区"
			}, {
				cantCode: "420303",
				cantName: "张湾区"
			}, {
				cantCode: "420321",
				cantName: "郧县"
			}, {
				cantCode: "420322",
				cantName: "郧西县"
			}, {
				cantCode: "420323",
				cantName: "竹山县"
			}, {
				cantCode: "420324",
				cantName: "竹溪县"
			}, {
				cantCode: "420325",
				cantName: "房县"
			}, {
				cantCode: "420381",
				cantName: "丹江口市"
			}, {
				cantCode: "420382",
				cantName: "城区"
			}, {
				cantCode: "420383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420500",
			cantName: "宜昌市",
			children: [{
				cantCode: "420502",
				cantName: "西陵区"
			}, {
				cantCode: "420503",
				cantName: "伍家岗区"
			}, {
				cantCode: "420504",
				cantName: "点军区"
			}, {
				cantCode: "420505",
				cantName: "猇亭区"
			}, {
				cantCode: "420506",
				cantName: "夷陵区"
			}, {
				cantCode: "420525",
				cantName: "远安县"
			}, {
				cantCode: "420526",
				cantName: "兴山县"
			}, {
				cantCode: "420527",
				cantName: "秭归县"
			}, {
				cantCode: "420528",
				cantName: "长阳土家族自治县"
			}, {
				cantCode: "420529",
				cantName: "五峰土家族自治县"
			}, {
				cantCode: "420551",
				cantName: "葛洲坝区"
			}, {
				cantCode: "420552",
				cantName: "开发区"
			}, {
				cantCode: "420581",
				cantName: "宜都市"
			}, {
				cantCode: "420582",
				cantName: "当阳市"
			}, {
				cantCode: "420583",
				cantName: "枝江市"
			}, {
				cantCode: "420584",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420600",
			cantName: "襄阳市",
			children: [{
				cantCode: "420602",
				cantName: "襄城区"
			}, {
				cantCode: "420606",
				cantName: "樊城区"
			}, {
				cantCode: "420607",
				cantName: "襄州区"
			}, {
				cantCode: "420624",
				cantName: "南漳县"
			}, {
				cantCode: "420625",
				cantName: "谷城县"
			}, {
				cantCode: "420626",
				cantName: "保康县"
			}, {
				cantCode: "420682",
				cantName: "老河口市"
			}, {
				cantCode: "420683",
				cantName: "枣阳市"
			}, {
				cantCode: "420684",
				cantName: "宜城市"
			}, {
				cantCode: "420685",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420700",
			cantName: "鄂州市",
			children: [{
				cantCode: "420702",
				cantName: "梁子湖区"
			}, {
				cantCode: "420703",
				cantName: "华容区"
			}, {
				cantCode: "420704",
				cantName: "鄂城区"
			}, {
				cantCode: "420705",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420800",
			cantName: "荆门市",
			children: [{
				cantCode: "420802",
				cantName: "东宝区"
			}, {
				cantCode: "420804",
				cantName: "掇刀区"
			}, {
				cantCode: "420821",
				cantName: "京山县"
			}, {
				cantCode: "420822",
				cantName: "沙洋县"
			}, {
				cantCode: "420881",
				cantName: "钟祥市"
			}, {
				cantCode: "420882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "420900",
			cantName: "孝感市",
			children: [{
				cantCode: "420902",
				cantName: "孝南区"
			}, {
				cantCode: "420921",
				cantName: "孝昌县"
			}, {
				cantCode: "420922",
				cantName: "大悟县"
			}, {
				cantCode: "420923",
				cantName: "云梦县"
			}, {
				cantCode: "420981",
				cantName: "应城市"
			}, {
				cantCode: "420982",
				cantName: "安陆市"
			}, {
				cantCode: "420984",
				cantName: "汉川市"
			}, {
				cantCode: "420985",
				cantName: "其它区"
			}]
		}, {
			cantCode: "421000",
			cantName: "荆州市",
			children: [{
				cantCode: "421002",
				cantName: "沙市区"
			}, {
				cantCode: "421003",
				cantName: "荆州区"
			}, {
				cantCode: "421022",
				cantName: "公安县"
			}, {
				cantCode: "421023",
				cantName: "监利县"
			}, {
				cantCode: "421024",
				cantName: "江陵县"
			}, {
				cantCode: "421081",
				cantName: "石首市"
			}, {
				cantCode: "421083",
				cantName: "洪湖市"
			}, {
				cantCode: "421087",
				cantName: "松滋市"
			}, {
				cantCode: "421088",
				cantName: "其它区"
			}]
		}, {
			cantCode: "421100",
			cantName: "黄冈市",
			children: [{
				cantCode: "421102",
				cantName: "黄州区"
			}, {
				cantCode: "421121",
				cantName: "团风县"
			}, {
				cantCode: "421122",
				cantName: "红安县"
			}, {
				cantCode: "421123",
				cantName: "罗田县"
			}, {
				cantCode: "421124",
				cantName: "英山县"
			}, {
				cantCode: "421125",
				cantName: "浠水县"
			}, {
				cantCode: "421126",
				cantName: "蕲春县"
			}, {
				cantCode: "421127",
				cantName: "黄梅县"
			}, {
				cantCode: "421181",
				cantName: "麻城市"
			}, {
				cantCode: "421182",
				cantName: "武穴市"
			}, {
				cantCode: "421183",
				cantName: "其它区"
			}]
		}, {
			cantCode: "421200",
			cantName: "咸宁市",
			children: [{
				cantCode: "421202",
				cantName: "咸安区"
			}, {
				cantCode: "421221",
				cantName: "嘉鱼县"
			}, {
				cantCode: "421222",
				cantName: "通城县"
			}, {
				cantCode: "421223",
				cantName: "崇阳县"
			}, {
				cantCode: "421224",
				cantName: "通山县"
			}, {
				cantCode: "421281",
				cantName: "赤壁市"
			}, {
				cantCode: "421282",
				cantName: "温泉城区"
			}, {
				cantCode: "421283",
				cantName: "其它区"
			}]
		}, {
			cantCode: "421300",
			cantName: "随州市",
			children: [{
				cantCode: "421302",
				cantName: "曾都区"
			}, {
				cantCode: "421321",
				cantName: "随县"
			}, {
				cantCode: "421381",
				cantName: "广水市"
			}, {
				cantCode: "421382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "422800",
			cantName: "恩施土家族苗族自治州",
			children: [{
				cantCode: "422801",
				cantName: "恩施市"
			}, {
				cantCode: "422802",
				cantName: "利川市"
			}, {
				cantCode: "422822",
				cantName: "建始县"
			}, {
				cantCode: "422823",
				cantName: "巴东县"
			}, {
				cantCode: "422825",
				cantName: "宣恩县"
			}, {
				cantCode: "422826",
				cantName: "咸丰县"
			}, {
				cantCode: "422827",
				cantName: "来凤县"
			}, {
				cantCode: "422828",
				cantName: "鹤峰县"
			}, {
				cantCode: "422829",
				cantName: "其它区"
			}]
		}, {
			cantCode: "429004",
			cantName: "仙桃市"
		}, {
			cantCode: "429005",
			cantName: "潜江市"
		}, {
			cantCode: "429006",
			cantName: "天门市"
		}, {
			cantCode: "429021",
			cantName: "神农架林区"
		}]
	}, {
		cantCode: '430000',
		cantName: '湖南省',
		children: [{
			cantCode: "430100",
			cantName: "长沙市",
			children: [{
				cantCode: "430102",
				cantName: "芙蓉区"
			}, {
				cantCode: "430103",
				cantName: "天心区"
			}, {
				cantCode: "430104",
				cantName: "岳麓区"
			}, {
				cantCode: "430105",
				cantName: "开福区"
			}, {
				cantCode: "430111",
				cantName: "雨花区"
			}, {
				cantCode: "430121",
				cantName: "长沙县"
			}, {
				cantCode: "430122",
				cantName: "望城县"
			}, {
				cantCode: "430124",
				cantName: "宁乡县"
			}, {
				cantCode: "430181",
				cantName: "浏阳市"
			}, {
				cantCode: "430182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430200",
			cantName: "株洲市",
			children: [{
				cantCode: "430202",
				cantName: "荷塘区"
			}, {
				cantCode: "430203",
				cantName: "芦淞区"
			}, {
				cantCode: "430204",
				cantName: "石峰区"
			}, {
				cantCode: "430211",
				cantName: "天元区"
			}, {
				cantCode: "430221",
				cantName: "株洲县"
			}, {
				cantCode: "430223",
				cantName: "攸县"
			}, {
				cantCode: "430224",
				cantName: "茶陵县"
			}, {
				cantCode: "430225",
				cantName: "炎陵县"
			}, {
				cantCode: "430281",
				cantName: "醴陵市"
			}, {
				cantCode: "430282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430300",
			cantName: "湘潭市",
			children: [{
				cantCode: "430302",
				cantName: "雨湖区"
			}, {
				cantCode: "430304",
				cantName: "岳塘区"
			}, {
				cantCode: "430321",
				cantName: "湘潭县"
			}, {
				cantCode: "430381",
				cantName: "湘乡市"
			}, {
				cantCode: "430382",
				cantName: "韶山市"
			}, {
				cantCode: "430383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430400",
			cantName: "衡阳市",
			children: [{
				cantCode: "430405",
				cantName: "珠晖区"
			}, {
				cantCode: "430406",
				cantName: "雁峰区"
			}, {
				cantCode: "430407",
				cantName: "石鼓区"
			}, {
				cantCode: "430408",
				cantName: "蒸湘区"
			}, {
				cantCode: "430412",
				cantName: "南岳区"
			}, {
				cantCode: "430421",
				cantName: "衡阳县"
			}, {
				cantCode: "430422",
				cantName: "衡南县"
			}, {
				cantCode: "430423",
				cantName: "衡山县"
			}, {
				cantCode: "430424",
				cantName: "衡东县"
			}, {
				cantCode: "430426",
				cantName: "祁东县"
			}, {
				cantCode: "430481",
				cantName: "耒阳市"
			}, {
				cantCode: "430482",
				cantName: "常宁市"
			}, {
				cantCode: "430483",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430500",
			cantName: "邵阳市",
			children: [{
				cantCode: "430502",
				cantName: "双清区"
			}, {
				cantCode: "430503",
				cantName: "大祥区"
			}, {
				cantCode: "430511",
				cantName: "北塔区"
			}, {
				cantCode: "430521",
				cantName: "邵东县"
			}, {
				cantCode: "430522",
				cantName: "新邵县"
			}, {
				cantCode: "430523",
				cantName: "邵阳县"
			}, {
				cantCode: "430524",
				cantName: "隆回县"
			}, {
				cantCode: "430525",
				cantName: "洞口县"
			}, {
				cantCode: "430527",
				cantName: "绥宁县"
			}, {
				cantCode: "430528",
				cantName: "新宁县"
			}, {
				cantCode: "430529",
				cantName: "城步苗族自治县"
			}, {
				cantCode: "430581",
				cantName: "武冈市"
			}, {
				cantCode: "430582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430600",
			cantName: "岳阳市",
			children: [{
				cantCode: "430602",
				cantName: "岳阳楼区"
			}, {
				cantCode: "430603",
				cantName: "云溪区"
			}, {
				cantCode: "430611",
				cantName: "君山区"
			}, {
				cantCode: "430621",
				cantName: "岳阳县"
			}, {
				cantCode: "430623",
				cantName: "华容县"
			}, {
				cantCode: "430624",
				cantName: "湘阴县"
			}, {
				cantCode: "430626",
				cantName: "平江县"
			}, {
				cantCode: "430681",
				cantName: "汨罗市"
			}, {
				cantCode: "430682",
				cantName: "临湘市"
			}, {
				cantCode: "430683",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430700",
			cantName: "常德市",
			children: [{
				cantCode: "430702",
				cantName: "武陵区"
			}, {
				cantCode: "430703",
				cantName: "鼎城区"
			}, {
				cantCode: "430721",
				cantName: "安乡县"
			}, {
				cantCode: "430722",
				cantName: "汉寿县"
			}, {
				cantCode: "430723",
				cantName: "澧县"
			}, {
				cantCode: "430724",
				cantName: "临澧县"
			}, {
				cantCode: "430725",
				cantName: "桃源县"
			}, {
				cantCode: "430726",
				cantName: "石门县"
			}, {
				cantCode: "430781",
				cantName: "津市市"
			}, {
				cantCode: "430782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430800",
			cantName: "张家界市",
			children: [{
				cantCode: "430802",
				cantName: "永定区"
			}, {
				cantCode: "430811",
				cantName: "武陵源区"
			}, {
				cantCode: "430821",
				cantName: "慈利县"
			}, {
				cantCode: "430822",
				cantName: "桑植县"
			}, {
				cantCode: "430823",
				cantName: "其它区"
			}]
		}, {
			cantCode: "430900",
			cantName: "益阳市",
			children: [{
				cantCode: "430902",
				cantName: "资阳区"
			}, {
				cantCode: "430903",
				cantName: "赫山区"
			}, {
				cantCode: "430921",
				cantName: "南县"
			}, {
				cantCode: "430922",
				cantName: "桃江县"
			}, {
				cantCode: "430923",
				cantName: "安化县"
			}, {
				cantCode: "430981",
				cantName: "沅江市"
			}, {
				cantCode: "430982",
				cantName: "其它区"
			}]
		}, {
			cantCode: "431000",
			cantName: "郴州市",
			children: [{
				cantCode: "431002",
				cantName: "北湖区"
			}, {
				cantCode: "431003",
				cantName: "苏仙区"
			}, {
				cantCode: "431021",
				cantName: "桂阳县"
			}, {
				cantCode: "431022",
				cantName: "宜章县"
			}, {
				cantCode: "431023",
				cantName: "永兴县"
			}, {
				cantCode: "431024",
				cantName: "嘉禾县"
			}, {
				cantCode: "431025",
				cantName: "临武县"
			}, {
				cantCode: "431026",
				cantName: "汝城县"
			}, {
				cantCode: "431027",
				cantName: "桂东县"
			}, {
				cantCode: "431028",
				cantName: "安仁县"
			}, {
				cantCode: "431081",
				cantName: "资兴市"
			}, {
				cantCode: "431082",
				cantName: "其它区"
			}]
		}, {
			cantCode: "431100",
			cantName: "永州市",
			children: [{
				cantCode: "431102",
				cantName: "零陵区"
			}, {
				cantCode: "431103",
				cantName: "冷水滩区"
			}, {
				cantCode: "431121",
				cantName: "祁阳县"
			}, {
				cantCode: "431122",
				cantName: "东安县"
			}, {
				cantCode: "431123",
				cantName: "双牌县"
			}, {
				cantCode: "431124",
				cantName: "道县"
			}, {
				cantCode: "431125",
				cantName: "江永县"
			}, {
				cantCode: "431126",
				cantName: "宁远县"
			}, {
				cantCode: "431127",
				cantName: "蓝山县"
			}, {
				cantCode: "431128",
				cantName: "新田县"
			}, {
				cantCode: "431129",
				cantName: "江华瑶族自治县"
			}, {
				cantCode: "431130",
				cantName: "其它区"
			}]
		}, {
			cantCode: "431200",
			cantName: "怀化市",
			children: [{
				cantCode: "431202",
				cantName: "鹤城区"
			}, {
				cantCode: "431221",
				cantName: "中方县"
			}, {
				cantCode: "431222",
				cantName: "沅陵县"
			}, {
				cantCode: "431223",
				cantName: "辰溪县"
			}, {
				cantCode: "431224",
				cantName: "溆浦县"
			}, {
				cantCode: "431225",
				cantName: "会同县"
			}, {
				cantCode: "431226",
				cantName: "麻阳苗族自治县"
			}, {
				cantCode: "431227",
				cantName: "新晃侗族自治县"
			}, {
				cantCode: "431228",
				cantName: "芷江侗族自治县"
			}, {
				cantCode: "431229",
				cantName: "靖州苗族侗族自治县"
			}, {
				cantCode: "431230",
				cantName: "通道侗族自治县"
			}, {
				cantCode: "431281",
				cantName: "洪江市"
			}, {
				cantCode: "431282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "431300",
			cantName: "娄底市",
			children: [{
				cantCode: "431302",
				cantName: "娄星区"
			}, {
				cantCode: "431321",
				cantName: "双峰县"
			}, {
				cantCode: "431322",
				cantName: "新化县"
			}, {
				cantCode: "431381",
				cantName: "冷水江市"
			}, {
				cantCode: "431382",
				cantName: "涟源市"
			}, {
				cantCode: "431383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "433100",
			cantName: "湘西土家族苗族自治州",
			children: [{
				cantCode: "433101",
				cantName: "吉首市"
			}, {
				cantCode: "433122",
				cantName: "泸溪县"
			}, {
				cantCode: "433123",
				cantName: "凤凰县"
			}, {
				cantCode: "433124",
				cantName: "花垣县"
			}, {
				cantCode: "433125",
				cantName: "保靖县"
			}, {
				cantCode: "433126",
				cantName: "古丈县"
			}, {
				cantCode: "433127",
				cantName: "永顺县"
			}, {
				cantCode: "433130",
				cantName: "龙山县"
			}, {
				cantCode: "433131",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '440000',
		cantName: '广东省',
		children: [{
			cantCode: "440100",
			cantName: "广州市",
			children: [{
				cantCode: "440103",
				cantName: "荔湾区"
			}, {
				cantCode: "440104",
				cantName: "越秀区"
			}, {
				cantCode: "440105",
				cantName: "海珠区"
			}, {
				cantCode: "440106",
				cantName: "天河区"
			}, {
				cantCode: "440111",
				cantName: "白云区"
			}, {
				cantCode: "440112",
				cantName: "黄埔区"
			}, {
				cantCode: "440113",
				cantName: "番禺区"
			}, {
				cantCode: "440114",
				cantName: "花都区"
			}, {
				cantCode: "440115",
				cantName: "南沙区"
			}, {
				cantCode: "440116",
				cantName: "萝岗区"
			}, {
				cantCode: "440183",
				cantName: "增城市"
			}, {
				cantCode: "440184",
				cantName: "从化市"
			}, {
				cantCode: "440188",
				cantName: "东山区"
			}, {
				cantCode: "440189",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440200",
			cantName: "韶关市",
			children: [{
				cantCode: "440203",
				cantName: "武江区"
			}, {
				cantCode: "440204",
				cantName: "浈江区"
			}, {
				cantCode: "440205",
				cantName: "曲江区"
			}, {
				cantCode: "440222",
				cantName: "始兴县"
			}, {
				cantCode: "440224",
				cantName: "仁化县"
			}, {
				cantCode: "440229",
				cantName: "翁源县"
			}, {
				cantCode: "440232",
				cantName: "乳源瑶族自治县"
			}, {
				cantCode: "440233",
				cantName: "新丰县"
			}, {
				cantCode: "440281",
				cantName: "乐昌市"
			}, {
				cantCode: "440282",
				cantName: "南雄市"
			}, {
				cantCode: "440283",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440300",
			cantName: "深圳市",
			children: [{
				cantCode: "440303",
				cantName: "罗湖区"
			}, {
				cantCode: "440304",
				cantName: "福田区"
			}, {
				cantCode: "440305",
				cantName: "南山区"
			}, {
				cantCode: "440306",
				cantName: "宝安区"
			}, {
				cantCode: "440307",
				cantName: "龙岗区"
			}, {
				cantCode: "440308",
				cantName: "盐田区"
			}, {
				cantCode: "440309",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440400",
			cantName: "珠海市",
			children: [{
				cantCode: "440402",
				cantName: "香洲区"
			}, {
				cantCode: "440403",
				cantName: "斗门区"
			}, {
				cantCode: "440404",
				cantName: "金湾区"
			}, {
				cantCode: "440486",
				cantName: "金唐区"
			}, {
				cantCode: "440487",
				cantName: "南湾区"
			}, {
				cantCode: "440488",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440500",
			cantName: "汕头市",
			children: [{
				cantCode: "440507",
				cantName: "龙湖区"
			}, {
				cantCode: "440511",
				cantName: "金平区"
			}, {
				cantCode: "440512",
				cantName: "濠江区"
			}, {
				cantCode: "440513",
				cantName: "潮阳区"
			}, {
				cantCode: "440514",
				cantName: "潮南区"
			}, {
				cantCode: "440515",
				cantName: "澄海区"
			}, {
				cantCode: "440523",
				cantName: "南澳县"
			}, {
				cantCode: "440524",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440600",
			cantName: "佛山市",
			children: [{
				cantCode: "440604",
				cantName: "禅城区"
			}, {
				cantCode: "440605",
				cantName: "南海区"
			}, {
				cantCode: "440606",
				cantName: "顺德区"
			}, {
				cantCode: "440607",
				cantName: "三水区"
			}, {
				cantCode: "440608",
				cantName: "高明区"
			}, {
				cantCode: "440609",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440700",
			cantName: "江门市",
			children: [{
				cantCode: "440703",
				cantName: "蓬江区"
			}, {
				cantCode: "440704",
				cantName: "江海区"
			}, {
				cantCode: "440705",
				cantName: "新会区"
			}, {
				cantCode: "440781",
				cantName: "台山市"
			}, {
				cantCode: "440783",
				cantName: "开平市"
			}, {
				cantCode: "440784",
				cantName: "鹤山市"
			}, {
				cantCode: "440785",
				cantName: "恩平市"
			}, {
				cantCode: "440786",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440800",
			cantName: "湛江市",
			children: [{
				cantCode: "440802",
				cantName: "赤坎区"
			}, {
				cantCode: "440803",
				cantName: "霞山区"
			}, {
				cantCode: "440804",
				cantName: "坡头区"
			}, {
				cantCode: "440811",
				cantName: "麻章区"
			}, {
				cantCode: "440823",
				cantName: "遂溪县"
			}, {
				cantCode: "440825",
				cantName: "徐闻县"
			}, {
				cantCode: "440881",
				cantName: "廉江市"
			}, {
				cantCode: "440882",
				cantName: "雷州市"
			}, {
				cantCode: "440883",
				cantName: "吴川市"
			}, {
				cantCode: "440884",
				cantName: "其它区"
			}]
		}, {
			cantCode: "440900",
			cantName: "茂名市",
			children: [{
				cantCode: "440902",
				cantName: "茂南区"
			}, {
				cantCode: "440903",
				cantName: "茂港区"
			}, {
				cantCode: "440923",
				cantName: "电白县"
			}, {
				cantCode: "440981",
				cantName: "高州市"
			}, {
				cantCode: "440982",
				cantName: "化州市"
			}, {
				cantCode: "440983",
				cantName: "信宜市"
			}, {
				cantCode: "440984",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441200",
			cantName: "肇庆市",
			children: [{
				cantCode: "441202",
				cantName: "端州区"
			}, {
				cantCode: "441203",
				cantName: "鼎湖区"
			}, {
				cantCode: "441223",
				cantName: "广宁县"
			}, {
				cantCode: "441224",
				cantName: "怀集县"
			}, {
				cantCode: "441225",
				cantName: "封开县"
			}, {
				cantCode: "441226",
				cantName: "德庆县"
			}, {
				cantCode: "441283",
				cantName: "高要市"
			}, {
				cantCode: "441284",
				cantName: "四会市"
			}, {
				cantCode: "441285",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441300",
			cantName: "惠州市",
			children: [{
				cantCode: "441302",
				cantName: "惠城区"
			}, {
				cantCode: "441303",
				cantName: "惠阳区"
			}, {
				cantCode: "441322",
				cantName: "博罗县"
			}, {
				cantCode: "441323",
				cantName: "惠东县"
			}, {
				cantCode: "441324",
				cantName: "龙门县"
			}, {
				cantCode: "441325",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441400",
			cantName: "梅州市",
			children: [{
				cantCode: "441402",
				cantName: "梅江区"
			}, {
				cantCode: "441421",
				cantName: "梅县"
			}, {
				cantCode: "441422",
				cantName: "大埔县"
			}, {
				cantCode: "441423",
				cantName: "丰顺县"
			}, {
				cantCode: "441424",
				cantName: "五华县"
			}, {
				cantCode: "441426",
				cantName: "平远县"
			}, {
				cantCode: "441427",
				cantName: "蕉岭县"
			}, {
				cantCode: "441481",
				cantName: "兴宁市"
			}, {
				cantCode: "441482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441500",
			cantName: "汕尾市",
			children: [{
				cantCode: "441502",
				cantName: "城区"
			}, {
				cantCode: "441521",
				cantName: "海丰县"
			}, {
				cantCode: "441523",
				cantName: "陆河县"
			}, {
				cantCode: "441581",
				cantName: "陆丰市"
			}, {
				cantCode: "441582",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441600",
			cantName: "河源市",
			children: [{
				cantCode: "441602",
				cantName: "源城区"
			}, {
				cantCode: "441621",
				cantName: "紫金县"
			}, {
				cantCode: "441622",
				cantName: "龙川县"
			}, {
				cantCode: "441623",
				cantName: "连平县"
			}, {
				cantCode: "441624",
				cantName: "和平县"
			}, {
				cantCode: "441625",
				cantName: "东源县"
			}, {
				cantCode: "441626",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441700",
			cantName: "阳江市",
			children: [{
				cantCode: "441702",
				cantName: "江城区"
			}, {
				cantCode: "441721",
				cantName: "阳西县"
			}, {
				cantCode: "441723",
				cantName: "阳东县"
			}, {
				cantCode: "441781",
				cantName: "阳春市"
			}, {
				cantCode: "441782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441800",
			cantName: "清远市",
			children: [{
				cantCode: "441802",
				cantName: "清城区"
			}, {
				cantCode: "441821",
				cantName: "佛冈县"
			}, {
				cantCode: "441823",
				cantName: "阳山县"
			}, {
				cantCode: "441825",
				cantName: "连山壮族瑶族自治县"
			}, {
				cantCode: "441826",
				cantName: "连南瑶族自治县"
			}, {
				cantCode: "441827",
				cantName: "清新县"
			}, {
				cantCode: "441881",
				cantName: "英德市"
			}, {
				cantCode: "441882",
				cantName: "连州市"
			}, {
				cantCode: "441883",
				cantName: "其它区"
			}]
		}, {
			cantCode: "441900",
			cantName: "东莞市"
		}, {
			cantCode: "442000",
			cantName: "中山市"
		}, {
			cantCode: "445100",
			cantName: "潮州市",
			children: [{
				cantCode: "445102",
				cantName: "湘桥区"
			}, {
				cantCode: "445121",
				cantName: "潮安县"
			}, {
				cantCode: "445122",
				cantName: "饶平县"
			}, {
				cantCode: "445185",
				cantName: "枫溪区"
			}, {
				cantCode: "445186",
				cantName: "其它区"
			}]
		}, {
			cantCode: "445200",
			cantName: "揭阳市",
			children: [{
				cantCode: "445202",
				cantName: "榕城区"
			}, {
				cantCode: "445221",
				cantName: "揭东县"
			}, {
				cantCode: "445222",
				cantName: "揭西县"
			}, {
				cantCode: "445224",
				cantName: "惠来县"
			}, {
				cantCode: "445281",
				cantName: "普宁市"
			}, {
				cantCode: "445284",
				cantName: "东山区"
			}, {
				cantCode: "445285",
				cantName: "其它区"
			}]
		}, {
			cantCode: "445300",
			cantName: "云浮市",
			children: [{
				cantCode: "445302",
				cantName: "云城区"
			}, {
				cantCode: "445321",
				cantName: "新兴县"
			}, {
				cantCode: "445322",
				cantName: "郁南县"
			}, {
				cantCode: "445323",
				cantName: "云安县"
			}, {
				cantCode: "445381",
				cantName: "罗定市"
			}, {
				cantCode: "445382",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '450000',
		cantName: '广西壮族',
		children: [{
			cantCode: "450100",
			cantName: "南宁市",
			children: [{
				cantCode: "450102",
				cantName: "兴宁区"
			}, {
				cantCode: "450103",
				cantName: "青秀区"
			}, {
				cantCode: "450105",
				cantName: "江南区"
			}, {
				cantCode: "450107",
				cantName: "西乡塘区"
			}, {
				cantCode: "450108",
				cantName: "良庆区"
			}, {
				cantCode: "450109",
				cantName: "邕宁区"
			}, {
				cantCode: "450122",
				cantName: "武鸣县"
			}, {
				cantCode: "450123",
				cantName: "隆安县"
			}, {
				cantCode: "450124",
				cantName: "马山县"
			}, {
				cantCode: "450125",
				cantName: "上林县"
			}, {
				cantCode: "450126",
				cantName: "宾阳县"
			}, {
				cantCode: "450127",
				cantName: "横县"
			}, {
				cantCode: "450128",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450200",
			cantName: "柳州市",
			children: [{
				cantCode: "450202",
				cantName: "城中区"
			}, {
				cantCode: "450203",
				cantName: "鱼峰区"
			}, {
				cantCode: "450204",
				cantName: "柳南区"
			}, {
				cantCode: "450205",
				cantName: "柳北区"
			}, {
				cantCode: "450221",
				cantName: "柳江县"
			}, {
				cantCode: "450222",
				cantName: "柳城县"
			}, {
				cantCode: "450223",
				cantName: "鹿寨县"
			}, {
				cantCode: "450224",
				cantName: "融安县"
			}, {
				cantCode: "450225",
				cantName: "融水苗族自治县"
			}, {
				cantCode: "450226",
				cantName: "三江侗族自治县"
			}, {
				cantCode: "450227",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450300",
			cantName: "桂林市",
			children: [{
				cantCode: "450302",
				cantName: "秀峰区"
			}, {
				cantCode: "450303",
				cantName: "叠彩区"
			}, {
				cantCode: "450304",
				cantName: "象山区"
			}, {
				cantCode: "450305",
				cantName: "七星区"
			}, {
				cantCode: "450311",
				cantName: "雁山区"
			}, {
				cantCode: "450321",
				cantName: "阳朔县"
			}, {
				cantCode: "450322",
				cantName: "临桂县"
			}, {
				cantCode: "450323",
				cantName: "灵川县"
			}, {
				cantCode: "450324",
				cantName: "全州县"
			}, {
				cantCode: "450325",
				cantName: "兴安县"
			}, {
				cantCode: "450326",
				cantName: "永福县"
			}, {
				cantCode: "450327",
				cantName: "灌阳县"
			}, {
				cantCode: "450328",
				cantName: "龙胜各族自治县"
			}, {
				cantCode: "450329",
				cantName: "资源县"
			}, {
				cantCode: "450330",
				cantName: "平乐县"
			}, {
				cantCode: "450331",
				cantName: "荔浦县"
			}, {
				cantCode: "450332",
				cantName: "恭城瑶族自治县"
			}, {
				cantCode: "450333",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450400",
			cantName: "梧州市",
			children: [{
				cantCode: "450403",
				cantName: "万秀区"
			}, {
				cantCode: "450404",
				cantName: "蝶山区"
			}, {
				cantCode: "450405",
				cantName: "长洲区"
			}, {
				cantCode: "450421",
				cantName: "苍梧县"
			}, {
				cantCode: "450422",
				cantName: "藤县"
			}, {
				cantCode: "450423",
				cantName: "蒙山县"
			}, {
				cantCode: "450481",
				cantName: "岑溪市"
			}, {
				cantCode: "450482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450500",
			cantName: "北海市",
			children: [{
				cantCode: "450502",
				cantName: "海城区"
			}, {
				cantCode: "450503",
				cantName: "银海区"
			}, {
				cantCode: "450512",
				cantName: "铁山港区"
			}, {
				cantCode: "450521",
				cantName: "合浦县"
			}, {
				cantCode: "450522",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450600",
			cantName: "防城港市",
			children: [{
				cantCode: "450602",
				cantName: "港口区"
			}, {
				cantCode: "450603",
				cantName: "防城区"
			}, {
				cantCode: "450621",
				cantName: "上思县"
			}, {
				cantCode: "450681",
				cantName: "东兴市"
			}, {
				cantCode: "450682",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450700",
			cantName: "钦州市",
			children: [{
				cantCode: "450702",
				cantName: "钦南区"
			}, {
				cantCode: "450703",
				cantName: "钦北区"
			}, {
				cantCode: "450721",
				cantName: "灵山县"
			}, {
				cantCode: "450722",
				cantName: "浦北县"
			}, {
				cantCode: "450723",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450800",
			cantName: "贵港市",
			children: [{
				cantCode: "450802",
				cantName: "港北区"
			}, {
				cantCode: "450803",
				cantName: "港南区"
			}, {
				cantCode: "450804",
				cantName: "覃塘区"
			}, {
				cantCode: "450821",
				cantName: "平南县"
			}, {
				cantCode: "450881",
				cantName: "桂平市"
			}, {
				cantCode: "450882",
				cantName: "其它区"
			}]
		}, {
			cantCode: "450900",
			cantName: "玉林市",
			children: [{
				cantCode: "450902",
				cantName: "玉州区"
			}, {
				cantCode: "450921",
				cantName: "容县"
			}, {
				cantCode: "450922",
				cantName: "陆川县"
			}, {
				cantCode: "450923",
				cantName: "博白县"
			}, {
				cantCode: "450924",
				cantName: "兴业县"
			}, {
				cantCode: "450981",
				cantName: "北流市"
			}, {
				cantCode: "450982",
				cantName: "其它区"
			}]
		}, {
			cantCode: "451000",
			cantName: "百色市",
			children: [{
				cantCode: "451002",
				cantName: "右江区"
			}, {
				cantCode: "451021",
				cantName: "田阳县"
			}, {
				cantCode: "451022",
				cantName: "田东县"
			}, {
				cantCode: "451023",
				cantName: "平果县"
			}, {
				cantCode: "451024",
				cantName: "德保县"
			}, {
				cantCode: "451025",
				cantName: "靖西县"
			}, {
				cantCode: "451026",
				cantName: "那坡县"
			}, {
				cantCode: "451027",
				cantName: "凌云县"
			}, {
				cantCode: "451028",
				cantName: "乐业县"
			}, {
				cantCode: "451029",
				cantName: "田林县"
			}, {
				cantCode: "451030",
				cantName: "西林县"
			}, {
				cantCode: "451031",
				cantName: "隆林各族自治县"
			}, {
				cantCode: "451032",
				cantName: "其它区"
			}]
		}, {
			cantCode: "451100",
			cantName: "贺州市",
			children: [{
					cantCode: "451102",
					cantName: "八步区"
				}, {
					cantCode: "451121",
					cantName: "昭平县"
				}, {
					cantCode: "451122",
					cantName: "钟山县"
				}, {
					cantCode: "451123",
					cantName: "富川瑶族自治县"
				},
	
				{
					cantCode: "451124",
					cantName: "其它区"
				}
			]
		}, {
			cantCode: "451200",
			cantName: "河池市",
			children: [{
				cantCode: "451202",
				cantName: "金城江区"
			}, {
				cantCode: "451221",
				cantName: "南丹县"
			}, {
				cantCode: "451222",
				cantName: "天峨县"
			}, {
				cantCode: "451223",
				cantName: "凤山县"
			}, {
				cantCode: "451224",
				cantName: "东兰县"
			}, {
				cantCode: "451225",
				cantName: "罗城仫佬族自治县"
			}, {
				cantCode: "451226",
				cantName: "环江毛南族自治县"
			}, {
				cantCode: "451227",
				cantName: "巴马瑶族自治县"
			}, {
				cantCode: "451228",
				cantName: "都安瑶族自治县"
			}, {
				cantCode: "451229",
				cantName: "大化瑶族自治县"
			}, {
				cantCode: "451281",
				cantName: "宜州市"
			}, {
				cantCode: "451282",
				cantName: "其它区"
			}]
		}, {
			cantCode: "451300",
			cantName: "来宾市",
			children: [{
				cantCode: "451302",
				cantName: "兴宾区"
			}, {
				cantCode: "451321",
				cantName: "忻城县"
			}, {
				cantCode: "451322",
				cantName: "象州县"
			}, {
				cantCode: "451323",
				cantName: "武宣县"
			}, {
				cantCode: "451324",
				cantName: "金秀瑶族自治县"
			}, {
				cantCode: "451381",
				cantName: "合山市"
			}, {
				cantCode: "451382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "451400",
			cantName: "崇左市",
			children: [{
				cantCode: "451402",
				cantName: "江洲区"
			}, {
				cantCode: "451421",
				cantName: "扶绥县"
			}, {
				cantCode: "451422",
				cantName: "宁明县"
			}, {
				cantCode: "451423",
				cantName: "龙州县"
			}, {
				cantCode: "451424",
				cantName: "大新县"
			}, {
				cantCode: "451425",
				cantName: "天等县"
			}, {
				cantCode: "451481",
				cantName: "凭祥市"
			}, {
				cantCode: "451482",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '460000',
		cantName: '海南省',
		children: [{
			cantCode: "460100",
			cantName: "海口市",
			children: [{
				cantCode: "460105",
				cantName: "秀英区"
			}, {
				cantCode: "460106",
				cantName: "龙华区"
			}, {
				cantCode: "460107",
				cantName: "琼山区"
			}, {
				cantCode: "460108",
				cantName: "美兰区"
			}, {
				cantCode: "460109",
				cantName: "其它区"
			}]
		}, {
			cantCode: "460200",
			cantName: "三亚市"
		}, {
			cantCode: "469001",
			cantName: "五指山市"
		}, {
			cantCode: "469002",
			cantName: "琼海市"
		}, {
			cantCode: "469003",
			cantName: "儋州市"
		}, {
			cantCode: "469005",
			cantName: "文昌市"
		}, {
			cantCode: "469006",
			cantName: "万宁市"
		}, {
			cantCode: "469007",
			cantName: "东方市"
		}, {
			cantCode: "469025",
			cantName: "定安县"
		}, {
			cantCode: "469026",
			cantName: "屯昌县"
		}, {
			cantCode: "469027",
			cantName: "澄迈县"
		}, {
			cantCode: "469028",
			cantName: "临高县"
		}, {
			cantCode: "469030",
			cantName: "白沙黎族自治县"
		}, {
			cantCode: "469031",
			cantName: "昌江黎族自治县"
		}, {
			cantCode: "469033",
			cantName: "乐东黎族自治县"
		}, {
			cantCode: "469034",
			cantName: "陵水黎族自治县"
		}, {
			cantCode: "469035",
			cantName: "保亭黎族苗族自治县"
		}, {
			cantCode: "469036",
			cantName: "琼中黎族苗族自治县"
		}, {
			cantCode: "469037",
			cantName: "西沙群岛"
		}, {
			cantCode: "469038",
			cantName: "南沙群岛"
		}, {
			cantCode: "469039",
			cantName: "中沙群岛的岛礁及其海域"
		}]
	}, {
		cantCode: '500000',
		cantName: '重庆',
		children: [
		               {
                 cantCode: "500101",
                 cantName: "万州区",
                 children: [ 

                            {
                            cantCode: "500101001",
                            cantName: "走马镇" 
                            },
                            {
                            cantCode: "500101002",
                            cantName: "余家镇" 
                            },
                            {
                            cantCode: "500101003",
                            cantName: "新乡镇" 
                            },
                            {
                            cantCode: "500101004",
                            cantName: "溪口乡" 
                            },
                            {
                            cantCode: "500101005",
                            cantName: "天城镇" 
                            },
                            {
                            cantCode: "500101006",
                            cantName: "太安镇" 
                            },
                            {
                            cantCode: "500101007",
                            cantName: "牌楼街道" 
                            },
                            {
                            cantCode: "500101008",
                            cantName: "龙驹镇" 
                            },
                            {
                            cantCode: "500101009",
                            cantName: "九池乡" 
                            },
                            {
                            cantCode: "500101010",
                            cantName: "郭村镇" 
                            },
                            {
                            cantCode: "500101011",
                            cantName: "高峰镇" 
                            },
                            {
                            cantCode: "500101012",
                            cantName: "弹子镇" 
                            },
                            {
                            cantCode: "500101013",
                            cantName: "陈家坝街道" 
                            },
                            {
                            cantCode: "500101014",
                            cantName: "白羊镇" 
                            },
                            {
                            cantCode: "500101015",
                            cantName: "双河口街道" 
                            },
                            {
                            cantCode: "500101016",
                            cantName: "沙河街道" 
                            },
                            {
                            cantCode: "500101017",
                            cantName: "普子乡" 
                            },
                            {
                            cantCode: "500101018",
                            cantName: "罗田镇" 
                            },
                            {
                            cantCode: "500101019",
                            cantName: "龙沙镇" 
                            },
                            {
                            cantCode: "500101020",
                            cantName: "龙都街道" 
                            },
                            {
                            cantCode: "500101021",
                            cantName: "李河镇" 
                            },
                            {
                            cantCode: "500101022",
                            cantName: "梨树乡" 
                            },
                            {
                            cantCode: "500101023",
                            cantName: "黄柏乡" 
                            },
                            {
                            cantCode: "500101024",
                            cantName: "后山镇" 
                            },
                            {
                            cantCode: "500101025",
                            cantName: "恒合土家族乡" 
                            },
                            {
                            cantCode: "500101026",
                            cantName: "高笋塘街道" 
                            },
                            {
                            cantCode: "500101027",
                            cantName: "高梁镇" 
                            },
                            {
                            cantCode: "500101028",
                            cantName: "甘宁镇" 
                            },
                            {
                            cantCode: "500101029",
                            cantName: "分水镇" 
                            },
                            {
                            cantCode: "500101030",
                            cantName: "地宝土家族乡" 
                            },
                            {
                            cantCode: "500101031",
                            cantName: "大周镇" 
                            },
                            {
                            cantCode: "500101032",
                            cantName: "茨竹乡" 
                            },
                            {
                            cantCode: "500101033",
                            cantName: "长滩镇" 
                            },
                            {
                            cantCode: "500101034",
                            cantName: "长坪乡" 
                            },
                            {
                            cantCode: "500101035",
                            cantName: "长岭镇" 
                            },
                            {
                            cantCode: "500101036",
                            cantName: "百安坝街道" 
                            },
                            {
                            cantCode: "500101037",
                            cantName: "白土镇" 
                            },
                            {
                            cantCode: "500101038",
                            cantName: "瀼渡镇" 
                            },
                            {
                            cantCode: "500101039",
                            cantName: "柱山乡" 
                            },
                            {
                            cantCode: "500101040",
                            cantName: "周家坝街道" 
                            },
                            {
                            cantCode: "500101041",
                            cantName: "钟鼓楼街道" 
                            },
                            {
                            cantCode: "500101042",
                            cantName: "燕山乡" 
                            },
                            {
                            cantCode: "500101043",
                            cantName: "熊家镇" 
                            },
                            {
                            cantCode: "500101044",
                            cantName: "新田镇" 
                            },
                            {
                            cantCode: "500101045",
                            cantName: "小周镇" 
                            },
                            {
                            cantCode: "500101046",
                            cantName: "响水镇" 
                            },
                            {
                            cantCode: "500101047",
                            cantName: "五桥街道" 
                            },
                            {
                            cantCode: "500101048",
                            cantName: "武陵镇" 
                            },
                            {
                            cantCode: "500101049",
                            cantName: "铁峰乡" 
                            },
                            {
                            cantCode: "500101050",
                            cantName: "太龙镇" 
                            },
                            {
                            cantCode: "500101051",
                            cantName: "太白街道" 
                            },
                            {
                            cantCode: "500101052",
                            cantName: "孙家镇" 
                            }

                               ]
				},
				               {
                 cantCode: "500102",
                 cantName: "涪陵区",
                 children: [ 

                            {
                            cantCode: "500102001",
                            cantName: "蔺市镇" 
                            },
                            {
                            cantCode: "500102002",
                            cantName: "新妙镇" 
                            },
                            {
                            cantCode: "500102003",
                            cantName: "同乐乡" 
                            },
                            {
                            cantCode: "500102004",
                            cantName: "南沱镇" 
                            },
                            {
                            cantCode: "500102005",
                            cantName: "龙桥街道" 
                            },
                            {
                            cantCode: "500102006",
                            cantName: "焦石镇" 
                            },
                            {
                            cantCode: "500102007",
                            cantName: "大木乡" 
                            },
                            {
                            cantCode: "500102008",
                            cantName: "珍溪镇" 
                            },
                            {
                            cantCode: "500102009",
                            cantName: "增福乡" 
                            },
                            {
                            cantCode: "500102010",
                            cantName: "义和镇" 
                            },
                            {
                            cantCode: "500102011",
                            cantName: "新城区" 
                            },
                            {
                            cantCode: "500102012",
                            cantName: "武陵山乡" 
                            },
                            {
                            cantCode: "500102013",
                            cantName: "石沱镇" 
                            },
                            {
                            cantCode: "500102014",
                            cantName: "清溪镇" 
                            },
                            {
                            cantCode: "500102015",
                            cantName: "青羊镇" 
                            },
                            {
                            cantCode: "500102016",
                            cantName: "马武镇" 
                            },
                            {
                            cantCode: "500102017",
                            cantName: "罗云乡" 
                            },
                            {
                            cantCode: "500102018",
                            cantName: "龙潭镇" 
                            },
                            {
                            cantCode: "500102019",
                            cantName: "荔枝街道" 
                            },
                            {
                            cantCode: "500102020",
                            cantName: "李渡街道" 
                            },
                            {
                            cantCode: "500102021",
                            cantName: "江东街道" 
                            },
                            {
                            cantCode: "500102022",
                            cantName: "江北街道" 
                            },
                            {
                            cantCode: "500102023",
                            cantName: "大顺乡" 
                            },
                            {
                            cantCode: "500102024",
                            cantName: "崇义街道" 
                            },
                            {
                            cantCode: "500102025",
                            cantName: "百胜镇" 
                            },
                            {
                            cantCode: "500102026",
                            cantName: "白涛街道" 
                            },
                            {
                            cantCode: "500102027",
                            cantName: "敦仁街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500103",
                 cantName: "渝中区",
                 children: [ 

                            {
                            cantCode: "500103001",
                            cantName: "望龙门街道" 
                            },
                            {
                            cantCode: "500103002",
                            cantName: "七星岗街道" 
                            },
                            {
                            cantCode: "500103003",
                            cantName: "化龙桥街道" 
                            },
                            {
                            cantCode: "500103004",
                            cantName: "菜园坝街道" 
                            },
                            {
                            cantCode: "500103006",
                            cantName: "石油路街道" 
                            },
                            {
                            cantCode: "500103007",
                            cantName: "上清寺街道" 
                            },
                            {
                            cantCode: "500103008",
                            cantName: "南纪门街道" 
                            },
                            {
                            cantCode: "500103009",
                            cantName: "两路口街道" 
                            },
                            {
                            cantCode: "500103010",
                            cantName: "解放碑街道" 
                            },
                            {
                            cantCode: "500103011",
                            cantName: "大溪沟街道" 
                            },
                            {
                            cantCode: "500103012",
                            cantName: "大坪街道" 
                            },
                            {
                            cantCode: "500103013",
                            cantName: "朝天门街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500104",
                 cantName: "大渡口区",
                 children: [ 

                            {
                            cantCode: "500104001",
                            cantName: "茄子溪街道" 
                            },
                            {
                            cantCode: "500104002",
                            cantName: "春晖路街道" 
                            },
                            {
                            cantCode: "500104003",
                            cantName: "跃进村街道" 
                            },
                            {
                            cantCode: "500104004",
                            cantName: "新山村街道" 
                            },
                            {
                            cantCode: "500104005",
                            cantName: "跳蹬镇" 
                            },
                            {
                            cantCode: "500104006",
                            cantName: "九宫庙街道" 
                            },
                            {
                            cantCode: "500104007",
                            cantName: "建胜镇" 
                            },
                            {
                            cantCode: "500104008",
                            cantName: "八桥镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500105",
                 cantName: "江北区",
                 children: [ 

                            {
                            cantCode: "500105001",
                            cantName: "五宝镇" 
                            },
                            {
                            cantCode: "500105002",
                            cantName: "江北城街道" 
                            },
                            {
                            cantCode: "500105003",
                            cantName: "复盛镇" 
                            },
                            {
                            cantCode: "500105004",
                            cantName: "鱼嘴镇" 
                            },
                            {
                            cantCode: "500105005",
                            cantName: "五里店街道" 
                            },
                            {
                            cantCode: "500105006",
                            cantName: "铁山坪街道" 
                            },
                            {
                            cantCode: "500105007",
                            cantName: "石马河街道" 
                            },
                            {
                            cantCode: "500105008",
                            cantName: "华新街街道" 
                            },
                            {
                            cantCode: "500105009",
                            cantName: "郭家沱街道" 
                            },
                            {
                            cantCode: "500105010",
                            cantName: "观音桥街道" 
                            },
                            {
                            cantCode: "500105011",
                            cantName: "大石坝街道" 
                            },
                            {
                            cantCode: "500105012",
                            cantName: "寸滩街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500106",
                 cantName: "沙坪坝区",
                 children: [ 

                            {
                            cantCode: "500106001",
                            cantName: "覃家岗街道" 
                            },
                            {
                            cantCode: "500106002",
                            cantName: "渝碚路街道" 
                            },
                            {
                            cantCode: "500106003",
                            cantName: "土主镇" 
                            },
                            {
                            cantCode: "500106004",
                            cantName: "天星桥街道" 
                            },
                            {
                            cantCode: "500106005",
                            cantName: "青木关镇" 
                            },
                            {
                            cantCode: "500106006",
                            cantName: "回龙坝镇" 
                            },
                            {
                            cantCode: "500106007",
                            cantName: "凤凰镇" 
                            },
                            {
                            cantCode: "500106008",
                            cantName: "中梁镇" 
                            },
                            {
                            cantCode: "500106009",
                            cantName: "双碑街道" 
                            },
                            {
                            cantCode: "500106010",
                            cantName: "曾家镇" 
                            },
                            {
                            cantCode: "500106011",
                            cantName: "新桥街道" 
                            },
                            {
                            cantCode: "500106012",
                            cantName: "小龙坎街道" 
                            },
                            {
                            cantCode: "500106013",
                            cantName: "西永街道" 
                            },
                            {
                            cantCode: "500106014",
                            cantName: "土湾街道" 
                            },
                            {
                            cantCode: "500106015",
                            cantName: "童家桥街道" 
                            },
                            {
                            cantCode: "500106016",
                            cantName: "石井坡街道" 
                            },
                            {
                            cantCode: "500106017",
                            cantName: "山洞街道" 
                            },
                            {
                            cantCode: "500106018",
                            cantName: "沙坪坝街道" 
                            },
                            {
                            cantCode: "500106019",
                            cantName: "联芳街道" 
                            },
                            {
                            cantCode: "500106020",
                            cantName: "井口镇" 
                            },
                            {
                            cantCode: "500106021",
                            cantName: "虎溪街道" 
                            },
                            {
                            cantCode: "500106022",
                            cantName: "歌乐山镇" 
                            },
                            {
                            cantCode: "500106023",
                            cantName: "磁器口街道" 
                            },
                            {
                            cantCode: "500106024",
                            cantName: "陈家桥街道" 
                            },
                            {
                            cantCode: "500106025",
                            cantName: "香炉山街道" 
                            },
                            {
                            cantCode: "500106026",
                            cantName: "丰文街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500107",
                 cantName: "九龙坡区",
                 children: [ 

                            {
                            cantCode: "500107001",
                            cantName: "走马镇" 
                            },
                            {
                            cantCode: "500107002",
                            cantName: "杨家坪街道" 
                            },
                            {
                            cantCode: "500107003",
                            cantName: "陶家镇" 
                            },
                            {
                            cantCode: "500107004",
                            cantName: "石板镇" 
                            },
                            {
                            cantCode: "500107005",
                            cantName: "黄桷坪街道" 
                            },
                            {
                            cantCode: "500107006",
                            cantName: "二郎街道" 
                            },
                            {
                            cantCode: "500107007",
                            cantName: "中梁山街道" 
                            },
                            {
                            cantCode: "500107008",
                            cantName: "渝州路街道" 
                            },
                            {
                            cantCode: "500107009",
                            cantName: "谢家湾街道" 
                            },
                            {
                            cantCode: "500107010",
                            cantName: "西彭镇" 
                            },
                            {
                            cantCode: "500107011",
                            cantName: "铜罐驿镇" 
                            },
                            {
                            cantCode: "500107012",
                            cantName: "石桥铺街道" 
                            },
                            {
                            cantCode: "500107013",
                            cantName: "石坪桥街道" 
                            },
                            {
                            cantCode: "500107014",
                            cantName: "九龙镇" 
                            },
                            {
                            cantCode: "500107015",
                            cantName: "金凤镇" 
                            },
                            {
                            cantCode: "500107016",
                            cantName: "华岩镇" 
                            },
                            {
                            cantCode: "500107017",
                            cantName: "含谷镇" 
                            },
                            {
                            cantCode: "500107018",
                            cantName: "白市驿镇" 
                            },
                            {
                            cantCode: "500107019",
                            cantName: "巴福镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500108",
                 cantName: "南岸区",
                 children: [ 

                            {
                            cantCode: "500108001",
                            cantName: "龙门浩街道" 
                            },
                            {
                            cantCode: "500108002",
                            cantName: "海棠溪街道" 
                            },
                            {
                            cantCode: "500108003",
                            cantName: "南山街道" 
                            },
                            {
                            cantCode: "500108004",
                            cantName: "峡口镇" 
                            },
                            {
                            cantCode: "500108005",
                            cantName: "迎龙镇" 
                            },
                            {
                            cantCode: "500108006",
                            cantName: "涂山镇" 
                            },
                            {
                            cantCode: "500108007",
                            cantName: "铜元局街道" 
                            },
                            {
                            cantCode: "500108008",
                            cantName: "天文街道" 
                            },
                            {
                            cantCode: "500108009",
                            cantName: "南坪镇" 
                            },
                            {
                            cantCode: "500108010",
                            cantName: "南坪街道" 
                            },
                            {
                            cantCode: "500108011",
                            cantName: "鸡冠石镇" 
                            },
                            {
                            cantCode: "500108012",
                            cantName: "花园路街道" 
                            },
                            {
                            cantCode: "500108013",
                            cantName: "广阳镇" 
                            },
                            {
                            cantCode: "500108014",
                            cantName: "弹子石街道" 
                            },
                            {
                            cantCode: "500108015",
                            cantName: "长生桥镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500109",
                 cantName: "北碚区",
                 children: [ 

                            {
                            cantCode: "500109001",
                            cantName: "天生街道" 
                            },
                            {
                            cantCode: "500109002",
                            cantName: "三圣镇" 
                            },
                            {
                            cantCode: "500109003",
                            cantName: "静观镇" 
                            },
                            {
                            cantCode: "500109004",
                            cantName: "澄江镇" 
                            },
                            {
                            cantCode: "500109005",
                            cantName: "歇马街道" 
                            },
                            {
                            cantCode: "500109006",
                            cantName: "童家溪镇" 
                            },
                            {
                            cantCode: "500109007",
                            cantName: "天府镇" 
                            },
                            {
                            cantCode: "500109008",
                            cantName: "水土街道" 
                            },
                            {
                            cantCode: "500109009",
                            cantName: "施家梁镇" 
                            },
                            {
                            cantCode: "500109010",
                            cantName: "龙凤桥街道" 
                            },
                            {
                            cantCode: "500109011",
                            cantName: "柳荫镇" 
                            },
                            {
                            cantCode: "500109012",
                            cantName: "金刀峡镇" 
                            },
                            {
                            cantCode: "500109013",
                            cantName: "复兴街道" 
                            },
                            {
                            cantCode: "500109014",
                            cantName: "东阳街道" 
                            },
                            {
                            cantCode: "500109015",
                            cantName: "朝阳街道" 
                            },
                            {
                            cantCode: "500109016",
                            cantName: "蔡家岗街道" 
                            },
                            {
                            cantCode: "500109017",
                            cantName: "北温泉街道" 
                            },
                            {
                            cantCode: "500109018",
                            cantName: "水土工业开发区" 
                            }

                               ]
                }, 
               {
                 cantCode: "500110",
                 cantName: "綦江区",
                 children: [ 

                            {
                            cantCode: "500110001",
                            cantName: "永城镇" 
                            },
                            {
                            cantCode: "500110002",
                            cantName: "石角镇" 
                            },
                            {
                            cantCode: "500110003",
                            cantName: "隆盛镇" 
                            },
                            {
                            cantCode: "500110004",
                            cantName: "赶水镇" 
                            },
                            {
                            cantCode: "500110005",
                            cantName: "丁山镇" 
                            },
                            {
                            cantCode: "500110006",
                            cantName: "篆塘镇" 
                            },
                            {
                            cantCode: "500110007",
                            cantName: "中峰镇" 
                            },
                            {
                            cantCode: "500110008",
                            cantName: "永新镇" 
                            },
                            {
                            cantCode: "500110009",
                            cantName: "新盛镇" 
                            },
                            {
                            cantCode: "500110010",
                            cantName: "文龙街道" 
                            },
                            {
                            cantCode: "500110011",
                            cantName: "石壕镇" 
                            },
                            {
                            cantCode: "500110012",
                            cantName: "三角镇" 
                            },
                            {
                            cantCode: "500110013",
                            cantName: "三江街道" 
                            },
                            {
                            cantCode: "500110014",
                            cantName: "横山镇" 
                            },
                            {
                            cantCode: "500110015",
                            cantName: "郭扶镇" 
                            },
                            {
                            cantCode: "500110016",
                            cantName: "古南街道" 
                            },
                            {
                            cantCode: "500110017",
                            cantName: "扶欢镇" 
                            },
                            {
                            cantCode: "500110018",
                            cantName: "东溪镇" 
                            },
                            {
                            cantCode: "500110019",
                            cantName: "打通镇" 
                            },
                            {
                            cantCode: "500110020",
                            cantName: "安稳镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500111",
                 cantName: "大足区",
                 children: [ 

                            {
                            cantCode: "500111001",
                            cantName: "智凤街道" 
                            },
                            {
                            cantCode: "500111002",
                            cantName: "万古镇" 
                            },
                            {
                            cantCode: "500111003",
                            cantName: "棠香街道" 
                            },
                            {
                            cantCode: "500111004",
                            cantName: "三驱镇" 
                            },
                            {
                            cantCode: "500111005",
                            cantName: "龙岗街道" 
                            },
                            {
                            cantCode: "500111006",
                            cantName: "国梁镇" 
                            },
                            {
                            cantCode: "500111007",
                            cantName: "高坪镇" 
                            },
                            {
                            cantCode: "500111008",
                            cantName: "宝兴镇" 
                            },
                            {
                            cantCode: "500111009",
                            cantName: "双桥镇" 
                            },
                            {
                            cantCode: "500111010",
                            cantName: "珠溪镇" 
                            },
                            {
                            cantCode: "500111011",
                            cantName: "中敖镇" 
                            },
                            {
                            cantCode: "500111012",
                            cantName: "玉龙镇" 
                            },
                            {
                            cantCode: "500111013",
                            cantName: "邮亭镇" 
                            },
                            {
                            cantCode: "500111014",
                            cantName: "雍溪镇" 
                            },
                            {
                            cantCode: "500111015",
                            cantName: "通桥街道" 
                            },
                            {
                            cantCode: "500111016",
                            cantName: "铁山镇" 
                            },
                            {
                            cantCode: "500111017",
                            cantName: "双路街道" 
                            },
                            {
                            cantCode: "500111018",
                            cantName: "拾万镇" 
                            },
                            {
                            cantCode: "500111019",
                            cantName: "石马镇" 
                            },
                            {
                            cantCode: "500111020",
                            cantName: "龙滩子街道" 
                            },
                            {
                            cantCode: "500111021",
                            cantName: "龙水镇" 
                            },
                            {
                            cantCode: "500111022",
                            cantName: "龙石镇" 
                            },
                            {
                            cantCode: "500111023",
                            cantName: "金山镇" 
                            },
                            {
                            cantCode: "500111024",
                            cantName: "季家镇" 
                            },
                            {
                            cantCode: "500111025",
                            cantName: "回龙镇" 
                            },
                            {
                            cantCode: "500111026",
                            cantName: "古龙镇" 
                            },
                            {
                            cantCode: "500111027",
                            cantName: "高升镇" 
                            },
                            {
                            cantCode: "500111028",
                            cantName: "宝顶镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500112",
                 cantName: "渝北区",
                 children: [ 

                            {
                            cantCode: "500112001",
                            cantName: "两路街道" 
                            },
                            {
                            cantCode: "500112002",
                            cantName: "回兴街道" 
                            },
                            {
                            cantCode: "500112003",
                            cantName: "大湾镇" 
                            },
                            {
                            cantCode: "500112004",
                            cantName: "大盛镇" 
                            },
                            {
                            cantCode: "500112005",
                            cantName: "茨竹镇" 
                            },
                            {
                            cantCode: "500112006",
                            cantName: "玉峰山镇" 
                            },
                            {
                            cantCode: "500112007",
                            cantName: "双龙湖街道" 
                            },
                            {
                            cantCode: "500112008",
                            cantName: "洛碛镇" 
                            },
                            {
                            cantCode: "500112009",
                            cantName: "龙塔街道" 
                            },
                            {
                            cantCode: "500112010",
                            cantName: "古路镇" 
                            },
                            {
                            cantCode: "500112011",
                            cantName: "宝圣湖街道" 
                            },
                            {
                            cantCode: "500112012",
                            cantName: "悦来街道" 
                            },
                            {
                            cantCode: "500112013",
                            cantName: "兴隆镇" 
                            },
                            {
                            cantCode: "500112014",
                            cantName: "王家街道" 
                            },
                            {
                            cantCode: "500112015",
                            cantName: "统景镇" 
                            },
                            {
                            cantCode: "500112016",
                            cantName: "双凤桥街道" 
                            },
                            {
                            cantCode: "500112017",
                            cantName: "石船镇" 
                            },
                            {
                            cantCode: "500112018",
                            cantName: "木耳镇" 
                            },
                            {
                            cantCode: "500112019",
                            cantName: "龙兴镇" 
                            },
                            {
                            cantCode: "500112020",
                            cantName: "龙溪街道" 
                            },
                            {
                            cantCode: "500112021",
                            cantName: "龙山街道" 
                            },
                            {
                            cantCode: "500112022",
                            cantName: "人和街道" 
                            },
                            {
                            cantCode: "500112023",
                            cantName: "仙桃街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500113",
                 cantName: "巴南区",
                 children: [ 

                            {
                            cantCode: "500113001",
                            cantName: "鱼洞街道" 
                            },
                            {
                            cantCode: "500113002",
                            cantName: "一品街道" 
                            },
                            {
                            cantCode: "500113003",
                            cantName: "跳石镇" 
                            },
                            {
                            cantCode: "500113004",
                            cantName: "双河口镇" 
                            },
                            {
                            cantCode: "500113005",
                            cantName: "石滩镇" 
                            },
                            {
                            cantCode: "500113006",
                            cantName: "石龙镇" 
                            },
                            {
                            cantCode: "500113007",
                            cantName: "南彭街道" 
                            },
                            {
                            cantCode: "500113008",
                            cantName: "木洞镇" 
                            },
                            {
                            cantCode: "500113009",
                            cantName: "麻柳嘴镇" 
                            },
                            {
                            cantCode: "500113010",
                            cantName: "李家沱街道" 
                            },
                            {
                            cantCode: "500113011",
                            cantName: "界石镇" 
                            },
                            {
                            cantCode: "500113012",
                            cantName: "接龙镇" 
                            },
                            {
                            cantCode: "500113013",
                            cantName: "惠民街道" 
                            },
                            {
                            cantCode: "500113014",
                            cantName: "花溪街道" 
                            },
                            {
                            cantCode: "500113015",
                            cantName: "丰盛镇" 
                            },
                            {
                            cantCode: "500113016",
                            cantName: "东温泉镇" 
                            },
                            {
                            cantCode: "500113017",
                            cantName: "安澜镇" 
                            },
                            {
                            cantCode: "500113018",
                            cantName: "天星寺镇" 
                            },
                            {
                            cantCode: "500113019",
                            cantName: "南泉街道" 
                            },
                            {
                            cantCode: "500113020",
                            cantName: "龙洲湾街道" 
                            },
                            {
                            cantCode: "500113021",
                            cantName: "姜家镇" 
                            },
                            {
                            cantCode: "500113022",
                            cantName: "二圣镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500114",
                 cantName: "黔江区",
                 children: [ 

                            {
                            cantCode: "500114001",
                            cantName: "舟白街道" 
                            },
                            {
                            cantCode: "500114002",
                            cantName: "中塘乡" 
                            },
                            {
                            cantCode: "500114003",
                            cantName: "正阳街道" 
                            },
                            {
                            cantCode: "500114004",
                            cantName: "小南海镇" 
                            },
                            {
                            cantCode: "500114005",
                            cantName: "五里乡" 
                            },
                            {
                            cantCode: "500114006",
                            cantName: "水田乡" 
                            },
                            {
                            cantCode: "500114007",
                            cantName: "水市乡" 
                            },
                            {
                            cantCode: "500114008",
                            cantName: "石家镇" 
                            },
                            {
                            cantCode: "500114009",
                            cantName: "杉岭乡" 
                            },
                            {
                            cantCode: "500114010",
                            cantName: "沙坝乡" 
                            },
                            {
                            cantCode: "500114011",
                            cantName: "蓬东乡" 
                            },
                            {
                            cantCode: "500114012",
                            cantName: "邻鄂镇" 
                            },
                            {
                            cantCode: "500114013",
                            cantName: "黎水镇" 
                            },
                            {
                            cantCode: "500114014",
                            cantName: "金洞乡" 
                            },
                            {
                            cantCode: "500114015",
                            cantName: "黄溪镇" 
                            },
                            {
                            cantCode: "500114016",
                            cantName: "黑溪镇" 
                            },
                            {
                            cantCode: "500114017",
                            cantName: "鹅池镇" 
                            },
                            {
                            cantCode: "500114018",
                            cantName: "城西街道" 
                            },
                            {
                            cantCode: "500114019",
                            cantName: "城南街道" 
                            },
                            {
                            cantCode: "500114020",
                            cantName: "白土乡" 
                            },
                            {
                            cantCode: "500114021",
                            cantName: "白石乡" 
                            },
                            {
                            cantCode: "500114022",
                            cantName: "阿蓬江镇" 
                            },
                            {
                            cantCode: "500114023",
                            cantName: "濯水镇" 
                            },
                            {
                            cantCode: "500114024",
                            cantName: "新华乡" 
                            },
                            {
                            cantCode: "500114025",
                            cantName: "太极乡" 
                            },
                            {
                            cantCode: "500114026",
                            cantName: "石会镇" 
                            },
                            {
                            cantCode: "500114027",
                            cantName: "马喇镇" 
                            },
                            {
                            cantCode: "500114028",
                            cantName: "金溪镇" 
                            },
                            {
                            cantCode: "500114029",
                            cantName: "冯家街道" 
                            },
                            {
                            cantCode: "500114030",
                            cantName: "城东街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500115",
                 cantName: "长寿区",
                 children: [ 

                            {
                            cantCode: "500115001",
                            cantName: "云台镇" 
                            },
                            {
                            cantCode: "500115002",
                            cantName: "云集镇" 
                            },
                            {
                            cantCode: "500115003",
                            cantName: "万顺镇" 
                            },
                            {
                            cantCode: "500115004",
                            cantName: "石堰镇" 
                            },
                            {
                            cantCode: "500115005",
                            cantName: "江南街道" 
                            },
                            {
                            cantCode: "500115006",
                            cantName: "凤城街道" 
                            },
                            {
                            cantCode: "500115007",
                            cantName: "八颗镇" 
                            },
                            {
                            cantCode: "500115008",
                            cantName: "晏家街道" 
                            },
                            {
                            cantCode: "500115009",
                            cantName: "新市镇" 
                            },
                            {
                            cantCode: "500115010",
                            cantName: "双龙镇" 
                            },
                            {
                            cantCode: "500115011",
                            cantName: "龙河镇" 
                            },
                            {
                            cantCode: "500115012",
                            cantName: "邻封镇" 
                            },
                            {
                            cantCode: "500115013",
                            cantName: "洪湖镇" 
                            },
                            {
                            cantCode: "500115014",
                            cantName: "海棠镇" 
                            },
                            {
                            cantCode: "500115015",
                            cantName: "葛兰镇" 
                            },
                            {
                            cantCode: "500115016",
                            cantName: "渡舟街道" 
                            },
                            {
                            cantCode: "500115017",
                            cantName: "但渡镇" 
                            },
                            {
                            cantCode: "500115018",
                            cantName: "长寿湖镇" 
                            },
                            {
                            cantCode: "500115019",
                            cantName: "菩提街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500116",
                 cantName: "江津区",
                 children: [ 

                            {
                            cantCode: "500116001",
                            cantName: "油溪镇" 
                            },
                            {
                            cantCode: "500116002",
                            cantName: "夏坝镇" 
                            },
                            {
                            cantCode: "500116003",
                            cantName: "四面山镇" 
                            },
                            {
                            cantCode: "500116004",
                            cantName: "龙华镇" 
                            },
                            {
                            cantCode: "500116005",
                            cantName: "嘉平镇" 
                            },
                            {
                            cantCode: "500116006",
                            cantName: "鼎山街道" 
                            },
                            {
                            cantCode: "500116007",
                            cantName: "柏林镇" 
                            },
                            {
                            cantCode: "500116008",
                            cantName: "珞璜镇" 
                            },
                            {
                            cantCode: "500116009",
                            cantName: "朱杨镇" 
                            },
                            {
                            cantCode: "500116010",
                            cantName: "中山镇" 
                            },
                            {
                            cantCode: "500116011",
                            cantName: "支坪镇" 
                            },
                            {
                            cantCode: "500116012",
                            cantName: "永兴镇" 
                            },
                            {
                            cantCode: "500116013",
                            cantName: "先锋镇" 
                            },
                            {
                            cantCode: "500116014",
                            cantName: "西湖镇" 
                            },
                            {
                            cantCode: "500116015",
                            cantName: "吴滩镇" 
                            },
                            {
                            cantCode: "500116016",
                            cantName: "塘河镇" 
                            },
                            {
                            cantCode: "500116017",
                            cantName: "双福街道" 
                            },
                            {
                            cantCode: "500116018",
                            cantName: "石蟆镇" 
                            },
                            {
                            cantCode: "500116019",
                            cantName: "石门镇" 
                            },
                            {
                            cantCode: "500116020",
                            cantName: "李市镇" 
                            },
                            {
                            cantCode: "500116021",
                            cantName: "贾嗣镇" 
                            },
                            {
                            cantCode: "500116022",
                            cantName: "几江街道" 
                            },
                            {
                            cantCode: "500116023",
                            cantName: "广兴镇" 
                            },
                            {
                            cantCode: "500116024",
                            cantName: "杜市镇" 
                            },
                            {
                            cantCode: "500116025",
                            cantName: "德感街道" 
                            },
                            {
                            cantCode: "500116026",
                            cantName: "慈云镇" 
                            },
                            {
                            cantCode: "500116027",
                            cantName: "蔡家镇" 
                            },
                            {
                            cantCode: "500116028",
                            cantName: "白沙镇" 
                            },
                            {
                            cantCode: "500116029",
                            cantName: "四屏镇" 
                            },
                            {
                            cantCode: "500116031",
                            cantName: "圣泉街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500117",
                 cantName: "合川区",
                 children: [ 

                            {
                            cantCode: "500117001",
                            cantName: "燕窝镇" 
                            },
                            {
                            cantCode: "500117002",
                            cantName: "小沔镇" 
                            },
                            {
                            cantCode: "500117003",
                            cantName: "土场镇" 
                            },
                            {
                            cantCode: "500117004",
                            cantName: "双槐镇" 
                            },
                            {
                            cantCode: "500117005",
                            cantName: "三庙镇" 
                            },
                            {
                            cantCode: "500117006",
                            cantName: "钱塘镇" 
                            },
                            {
                            cantCode: "500117007",
                            cantName: "龙市镇" 
                            },
                            {
                            cantCode: "500117008",
                            cantName: "官渡镇" 
                            },
                            {
                            cantCode: "500117009",
                            cantName: "大石街道" 
                            },
                            {
                            cantCode: "500117010",
                            cantName: "涞滩镇" 
                            },
                            {
                            cantCode: "500117011",
                            cantName: "云门街道" 
                            },
                            {
                            cantCode: "500117012",
                            cantName: "盐井街道" 
                            },
                            {
                            cantCode: "500117013",
                            cantName: "肖家镇" 
                            },
                            {
                            cantCode: "500117014",
                            cantName: "香龙镇" 
                            },
                            {
                            cantCode: "500117015",
                            cantName: "渭沱镇" 
                            },
                            {
                            cantCode: "500117016",
                            cantName: "铜溪镇" 
                            },
                            {
                            cantCode: "500117017",
                            cantName: "太和镇" 
                            },
                            {
                            cantCode: "500117018",
                            cantName: "双凤镇" 
                            },
                            {
                            cantCode: "500117019",
                            cantName: "狮滩镇" 
                            },
                            {
                            cantCode: "500117020",
                            cantName: "沙鱼镇" 
                            },
                            {
                            cantCode: "500117021",
                            cantName: "三汇镇" 
                            },
                            {
                            cantCode: "500117022",
                            cantName: "清平镇" 
                            },
                            {
                            cantCode: "500117023",
                            cantName: "南津街街道" 
                            },
                            {
                            cantCode: "500117024",
                            cantName: "隆兴镇" 
                            },
                            {
                            cantCode: "500117025",
                            cantName: "龙凤镇" 
                            },
                            {
                            cantCode: "500117026",
                            cantName: "合阳城街道" 
                            },
                            {
                            cantCode: "500117027",
                            cantName: "古楼镇" 
                            },
                            {
                            cantCode: "500117028",
                            cantName: "二郎镇" 
                            },
                            {
                            cantCode: "500117029",
                            cantName: "钓鱼城街道" 
                            },
                            {
                            cantCode: "500117030",
                            cantName: "草街街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500118",
                 cantName: "永川区",
                 children: [ 

                            {
                            cantCode: "500118001",
                            cantName: "中山路街道" 
                            },
                            {
                            cantCode: "500118002",
                            cantName: "卫星湖街道" 
                            },
                            {
                            cantCode: "500118003",
                            cantName: "胜利路街道" 
                            },
                            {
                            cantCode: "500118004",
                            cantName: "临江镇" 
                            },
                            {
                            cantCode: "500118005",
                            cantName: "吉安镇" 
                            },
                            {
                            cantCode: "500118006",
                            cantName: "陈食街道" 
                            },
                            {
                            cantCode: "500118007",
                            cantName: "朱沱镇" 
                            },
                            {
                            cantCode: "500118008",
                            cantName: "永荣镇" 
                            },
                            {
                            cantCode: "500118009",
                            cantName: "仙龙镇" 
                            },
                            {
                            cantCode: "500118010",
                            cantName: "五间镇" 
                            },
                            {
                            cantCode: "500118011",
                            cantName: "松溉镇" 
                            },
                            {
                            cantCode: "500118012",
                            cantName: "双石镇" 
                            },
                            {
                            cantCode: "500118013",
                            cantName: "三教镇" 
                            },
                            {
                            cantCode: "500118014",
                            cantName: "青峰镇" 
                            },
                            {
                            cantCode: "500118015",
                            cantName: "南大街街道" 
                            },
                            {
                            cantCode: "500118016",
                            cantName: "来苏镇" 
                            },
                            {
                            cantCode: "500118017",
                            cantName: "金龙镇" 
                            },
                            {
                            cantCode: "500118018",
                            cantName: "红炉镇" 
                            },
                            {
                            cantCode: "500118019",
                            cantName: "何埂镇" 
                            },
                            {
                            cantCode: "500118020",
                            cantName: "大安街道" 
                            },
                            {
                            cantCode: "500118021",
                            cantName: "茶山竹海街道" 
                            },
                            {
                            cantCode: "500118022",
                            cantName: "宝峰镇" 
                            },
                            {
                            cantCode: "500118023",
                            cantName: "板桥镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500119",
                 cantName: "南川区",
                 children: [ 

                            {
                            cantCode: "500119001",
                            cantName: "中桥乡" 
                            },
                            {
                            cantCode: "500119002",
                            cantName: "头渡镇" 
                            },
                            {
                            cantCode: "500119003",
                            cantName: "石溪镇" 
                            },
                            {
                            cantCode: "500119004",
                            cantName: "神童镇" 
                            },
                            {
                            cantCode: "500119005",
                            cantName: "兴隆镇" 
                            },
                            {
                            cantCode: "500119006",
                            cantName: "西城街道" 
                            },
                            {
                            cantCode: "500119008",
                            cantName: "太平场镇" 
                            },
                            {
                            cantCode: "500119009",
                            cantName: "水江镇" 
                            },
                            {
                            cantCode: "500119010",
                            cantName: "石墙镇" 
                            },
                            {
                            cantCode: "500119011",
                            cantName: "石莲镇" 
                            },
                            {
                            cantCode: "500119012",
                            cantName: "山王坪镇" 
                            },
                            {
                            cantCode: "500119013",
                            cantName: "三泉镇" 
                            },
                            {
                            cantCode: "500119014",
                            cantName: "庆元镇" 
                            },
                            {
                            cantCode: "500119015",
                            cantName: "乾丰镇" 
                            },
                            {
                            cantCode: "500119016",
                            cantName: "骑龙镇" 
                            },
                            {
                            cantCode: "500119017",
                            cantName: "南平镇" 
                            },
                            {
                            cantCode: "500119018",
                            cantName: "南城街道" 
                            },
                            {
                            cantCode: "500119019",
                            cantName: "木凉镇" 
                            },
                            {
                            cantCode: "500119020",
                            cantName: "鸣玉镇" 
                            },
                            {
                            cantCode: "500119021",
                            cantName: "民主乡" 
                            },
                            {
                            cantCode: "500119022",
                            cantName: "黎香湖镇" 
                            },
                            {
                            cantCode: "500119023",
                            cantName: "冷水关镇" 
                            },
                            {
                            cantCode: "500119024",
                            cantName: "金山镇" 
                            },
                            {
                            cantCode: "500119025",
                            cantName: "河图镇" 
                            },
                            {
                            cantCode: "500119026",
                            cantName: "合溪镇" 
                            },
                            {
                            cantCode: "500119027",
                            cantName: "古花镇" 
                            },
                            {
                            cantCode: "500119028",
                            cantName: "福寿镇" 
                            },
                            {
                            cantCode: "500119029",
                            cantName: "峰岩乡" 
                            },
                            {
                            cantCode: "500119030",
                            cantName: "东城街道" 
                            },
                            {
                            cantCode: "500119031",
                            cantName: "德隆镇" 
                            },
                            {
                            cantCode: "500119032",
                            cantName: "大有镇" 
                            },
                            {
                            cantCode: "500119033",
                            cantName: "大观镇" 
                            },
                            {
                            cantCode: "500119034",
                            cantName: "白沙镇" 
                            },
                            {
                            cantCode: "500119035",
                            cantName: "楠竹山镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500120",
                 cantName: "璧山区",
                 children: [ 

                            {
                            cantCode: "500120001",
                            cantName: "三合镇" 
                            },
                            {
                            cantCode: "500120002",
                            cantName: "来凤街道" 
                            },
                            {
                            cantCode: "500120003",
                            cantName: "广普镇" 
                            },
                            {
                            cantCode: "500120004",
                            cantName: "大路街道" 
                            },
                            {
                            cantCode: "500120005",
                            cantName: "碧泉街道" 
                            },
                            {
                            cantCode: "500120006",
                            cantName: "璧城街道" 
                            },
                            {
                            cantCode: "500120007",
                            cantName: "正兴镇" 
                            },
                            {
                            cantCode: "500120008",
                            cantName: "青杠街道" 
                            },
                            {
                            cantCode: "500120009",
                            cantName: "七塘镇" 
                            },
                            {
                            cantCode: "500120010",
                            cantName: "健龙镇" 
                            },
                            {
                            cantCode: "500120011",
                            cantName: "河边镇" 
                            },
                            {
                            cantCode: "500120012",
                            cantName: "福禄镇" 
                            },
                            {
                            cantCode: "500120013",
                            cantName: "丁家街道" 
                            },
                            {
                            cantCode: "500120014",
                            cantName: "大兴镇" 
                            },
                            {
                            cantCode: "500120015",
                            cantName: "八塘镇" 
                            },
                            {
                            cantCode: "500120016",
                            cantName: "璧泉街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500131",
                 cantName: "万盛经开区",
                 children: [ 

                            {
                            cantCode: "500131001",
                            cantName: "万盛街道" 
                            },
                            {
                            cantCode: "500131002",
                            cantName: "青年镇" 
                            },
                            {
                            cantCode: "500131003",
                            cantName: "关坝镇" 
                            },
                            {
                            cantCode: "500131004",
                            cantName: "万东镇" 
                            },
                            {
                            cantCode: "500131005",
                            cantName: "石林镇" 
                            },
                            {
                            cantCode: "500131006",
                            cantName: "南桐镇" 
                            },
                            {
                            cantCode: "500131007",
                            cantName: "金桥镇" 
                            },
                            {
                            cantCode: "500131008",
                            cantName: "黑山镇" 
                            },
                            {
                            cantCode: "500131009",
                            cantName: "东林街道" 
                            },
                            {
                            cantCode: "500131010",
                            cantName: "丛林镇" 
                            },
                            {
                            cantCode: "500131011",
                            cantName: "景星乡" 
                            }

                               ]
                }, 
                 {
                 cantCode: "500151",
                 cantName: "铜梁区",
                 children: [ 

                            {
                            cantCode: "500151001",
                            cantName: "西河镇" 
                            },
                            {
                            cantCode: "500151002",
                            cantName: "土桥镇" 
                            },
                            {
                            cantCode: "500151003",
                            cantName: "石鱼镇" 
                            },
                            {
                            cantCode: "500151004",
                            cantName: "蒲吕街道" 
                            },
                            {
                            cantCode: "500151005",
                            cantName: "旧县街道" 
                            },
                            {
                            cantCode: "500151006",
                            cantName: "高楼镇" 
                            },
                            {
                            cantCode: "500151007",
                            cantName: "大庙镇" 
                            },
                            {
                            cantCode: "500151008",
                            cantName: "安居镇" 
                            },
                            {
                            cantCode: "500151009",
                            cantName: "永嘉镇" 
                            },
                            {
                            cantCode: "500151010",
                            cantName: "小林镇" 
                            },
                            {
                            cantCode: "500151011",
                            cantName: "维新镇" 
                            },
                            {
                            cantCode: "500151012",
                            cantName: "围龙镇" 
                            },
                            {
                            cantCode: "500151013",
                            cantName: "太平镇" 
                            },
                            {
                            cantCode: "500151014",
                            cantName: "水口镇" 
                            },
                            {
                            cantCode: "500151015",
                            cantName: "双山镇" 
                            },
                            {
                            cantCode: "500151016",
                            cantName: "少云镇" 
                            },
                            {
                            cantCode: "500151017",
                            cantName: "庆隆镇" 
                            },
                            {
                            cantCode: "500151018",
                            cantName: "平滩镇" 
                            },
                            {
                            cantCode: "500151019",
                            cantName: "南城街道" 
                            },
                            {
                            cantCode: "500151020",
                            cantName: "侣俸镇" 
                            },
                            {
                            cantCode: "500151021",
                            cantName: "华兴镇" 
                            },
                            {
                            cantCode: "500151022",
                            cantName: "虎峰镇" 
                            },
                            {
                            cantCode: "500151023",
                            cantName: "福果镇" 
                            },
                            {
                            cantCode: "500151024",
                            cantName: "二坪镇" 
                            },
                            {
                            cantCode: "500151025",
                            cantName: "东城街道" 
                            },
                            {
                            cantCode: "500151026",
                            cantName: "白羊镇" 
                            },
                            {
                            cantCode: "500151027",
                            cantName: "巴川街道" 
                            },
                            {
                            cantCode: "500151028",
                            cantName: "安溪镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500152",
                 cantName: "潼南区",
                 children: [ 

                            {
                            cantCode: "500152001",
                            cantName: "玉溪镇" 
                            },
                            {
                            cantCode: "500152002",
                            cantName: "桂林街道" 
                            },
                            {
                            cantCode: "500152003",
                            cantName: "宝龙镇" 
                            },
                            {
                            cantCode: "500152004",
                            cantName: "梓潼街道" 
                            },
                            {
                            cantCode: "500152005",
                            cantName: "新胜镇" 
                            },
                            {
                            cantCode: "500152006",
                            cantName: "小渡镇" 
                            },
                            {
                            cantCode: "500152007",
                            cantName: "五桂镇" 
                            },
                            {
                            cantCode: "500152008",
                            cantName: "卧佛镇" 
                            },
                            {
                            cantCode: "500152009",
                            cantName: "田家镇" 
                            },
                            {
                            cantCode: "500152010",
                            cantName: "塘坝镇" 
                            },
                            {
                            cantCode: "500152011",
                            cantName: "太安镇" 
                            },
                            {
                            cantCode: "500152012",
                            cantName: "双江镇" 
                            },
                            {
                            cantCode: "500152013",
                            cantName: "寿桥镇" 
                            },
                            {
                            cantCode: "500152014",
                            cantName: "上和镇" 
                            },
                            {
                            cantCode: "500152015",
                            cantName: "群力镇" 
                            },
                            {
                            cantCode: "500152016",
                            cantName: "米心镇" 
                            },
                            {
                            cantCode: "500152017",
                            cantName: "龙形镇" 
                            },
                            {
                            cantCode: "500152018",
                            cantName: "花岩镇" 
                            },
                            {
                            cantCode: "500152019",
                            cantName: "古溪镇" 
                            },
                            {
                            cantCode: "500152020",
                            cantName: "崇龛镇" 
                            },
                            {
                            cantCode: "500152021",
                            cantName: "别口镇" 
                            },
                            {
                            cantCode: "500152022",
                            cantName: "柏梓镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500153",
                 cantName: "荣昌区",
                 children: [ 

                            {
                            cantCode: "500153001",
                            cantName: "吴家镇" 
                            },
                            {
                            cantCode: "500153002",
                            cantName: "荣隆镇" 
                            },
                            {
                            cantCode: "500153003",
                            cantName: "清流镇" 
                            },
                            {
                            cantCode: "500153004",
                            cantName: "河包镇" 
                            },
                            {
                            cantCode: "500153005",
                            cantName: "古昌镇" 
                            },
                            {
                            cantCode: "500153006",
                            cantName: "安富街道" 
                            },
                            {
                            cantCode: "500153007",
                            cantName: "直升镇" 
                            },
                            {
                            cantCode: "500153008",
                            cantName: "远觉镇" 
                            },
                            {
                            cantCode: "500153009",
                            cantName: "万灵镇" 
                            },
                            {
                            cantCode: "500153010",
                            cantName: "铜鼓镇" 
                            },
                            {
                            cantCode: "500153011",
                            cantName: "双河街道" 
                            },
                            {
                            cantCode: "500153012",
                            cantName: "仁义镇" 
                            },
                            {
                            cantCode: "500153013",
                            cantName: "清升镇" 
                            },
                            {
                            cantCode: "500153014",
                            cantName: "清江镇" 
                            },
                            {
                            cantCode: "500153015",
                            cantName: "盘龙镇" 
                            },
                            {
                            cantCode: "500153016",
                            cantName: "龙集镇" 
                            },
                            {
                            cantCode: "500153017",
                            cantName: "广顺街道" 
                            },
                            {
                            cantCode: "500153018",
                            cantName: "观胜镇" 
                            },
                            {
                            cantCode: "500153019",
                            cantName: "峰高街道" 
                            },
                            {
                            cantCode: "500153020",
                            cantName: "昌州街道" 
                            },
                            {
                            cantCode: "500153021",
                            cantName: "昌元街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500228",
                 cantName: "梁平区",
                 children: [ 

                            {
                            cantCode: "500228001",
                            cantName: "紫照乡" 
                            },
                            {
                            cantCode: "500228002",
                            cantName: "袁驿镇" 
                            },
                            {
                            cantCode: "500228003",
                            cantName: "铁门乡" 
                            },
                            {
                            cantCode: "500228005",
                            cantName: "明达镇" 
                            },
                            {
                            cantCode: "500228006",
                            cantName: "礼让镇" 
                            },
                            {
                            cantCode: "500228007",
                            cantName: "回龙镇" 
                            },
                            {
                            cantCode: "500228008",
                            cantName: "复平乡" 
                            },
                            {
                            cantCode: "500228009",
                            cantName: "城北乡" 
                            },
                            {
                            cantCode: "500228010",
                            cantName: "蟠龙镇" 
                            },
                            {
                            cantCode: "500228011",
                            cantName: "竹山镇" 
                            },
                            {
                            cantCode: "500228012",
                            cantName: "云龙镇" 
                            },
                            {
                            cantCode: "500228013",
                            cantName: "荫平镇" 
                            },
                            {
                            cantCode: "500228014",
                            cantName: "新盛镇" 
                            },
                            {
                            cantCode: "500228015",
                            cantName: "文化镇" 
                            },
                            {
                            cantCode: "500228016",
                            cantName: "双桂街道" 
                            },
                            {
                            cantCode: "500228017",
                            cantName: "石安镇" 
                            },
                            {
                            cantCode: "500228018",
                            cantName: "仁贤镇" 
                            },
                            {
                            cantCode: "500228019",
                            cantName: "七星镇" 
                            },
                            {
                            cantCode: "500228020",
                            cantName: "屏锦镇" 
                            },
                            {
                            cantCode: "500228021",
                            cantName: "龙胜乡" 
                            },
                            {
                            cantCode: "500228022",
                            cantName: "龙门镇" 
                            },
                            {
                            cantCode: "500228023",
                            cantName: "梁山街道" 
                            },
                            {
                            cantCode: "500228024",
                            cantName: "聚奎镇" 
                            },
                            {
                            cantCode: "500228025",
                            cantName: "金带镇" 
                            },
                            {
                            cantCode: "500228026",
                            cantName: "虎城镇" 
                            },
                            {
                            cantCode: "500228027",
                            cantName: "合兴镇" 
                            },
                            {
                            cantCode: "500228028",
                            cantName: "和林镇" 
                            },
                            {
                            cantCode: "500228029",
                            cantName: "福禄镇" 
                            },
                            {
                            cantCode: "500228030",
                            cantName: "大观镇" 
                            },
                            {
                            cantCode: "500228031",
                            cantName: "碧山镇" 
                            },
                            {
                            cantCode: "500228032",
                            cantName: "柏家镇" 
                            },
                            {
                            cantCode: "500228033",
                            cantName: "安胜乡" 
                            },
                            {
                            cantCode: "500228034",
                            cantName: "星桥镇" 
                            },
                            {
                            cantCode: "500228035",
                            cantName: "曲水镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500229",
                 cantName: "城口县",
                 children: [ 

                            {
                            cantCode: "500229001",
                            cantName: "岚天乡" 
                            },
                            {
                            cantCode: "500229002",
                            cantName: "治平乡" 
                            },
                            {
                            cantCode: "500229003",
                            cantName: "咸宜镇" 
                            },
                            {
                            cantCode: "500229004",
                            cantName: "明通镇" 
                            },
                            {
                            cantCode: "500229005",
                            cantName: "鸡鸣乡" 
                            },
                            {
                            cantCode: "500229006",
                            cantName: "高楠镇" 
                            },
                            {
                            cantCode: "500229007",
                            cantName: "东安镇" 
                            },
                            {
                            cantCode: "500229008",
                            cantName: "蓼子乡" 
                            },
                            {
                            cantCode: "500229009",
                            cantName: "左岚乡" 
                            },
                            {
                            cantCode: "500229010",
                            cantName: "周溪乡" 
                            },
                            {
                            cantCode: "500229011",
                            cantName: "沿河乡" 
                            },
                            {
                            cantCode: "500229012",
                            cantName: "修齐镇" 
                            },
                            {
                            cantCode: "500229013",
                            cantName: "双河乡" 
                            },
                            {
                            cantCode: "500229014",
                            cantName: "坪坝镇" 
                            },
                            {
                            cantCode: "500229015",
                            cantName: "明中乡" 
                            },
                            {
                            cantCode: "500229016",
                            cantName: "庙坝镇" 
                            },
                            {
                            cantCode: "500229017",
                            cantName: "龙田乡" 
                            },
                            {
                            cantCode: "500229018",
                            cantName: "厚坪乡" 
                            },
                            {
                            cantCode: "500229019",
                            cantName: "河鱼乡" 
                            },
                            {
                            cantCode: "500229020",
                            cantName: "葛城街道" 
                            },
                            {
                            cantCode: "500229021",
                            cantName: "高燕镇" 
                            },
                            {
                            cantCode: "500229022",
                            cantName: "高观镇" 
                            },
                            {
                            cantCode: "500229023",
                            cantName: "复兴街道" 
                            },
                            {
                            cantCode: "500229024",
                            cantName: "北屏乡" 
                            },
                            {
                            cantCode: "500229025",
                            cantName: "巴山镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500230",
                 cantName: "丰都县",
                 children: [ 

                            {
                            cantCode: "500230001",
                            cantName: "暨龙镇" 
                            },
                            {
                            cantCode: "500230002",
                            cantName: "兴龙镇" 
                            },
                            {
                            cantCode: "500230003",
                            cantName: "太平坝乡" 
                            },
                            {
                            cantCode: "500230004",
                            cantName: "栗子乡" 
                            },
                            {
                            cantCode: "500230005",
                            cantName: "都督乡" 
                            },
                            {
                            cantCode: "500230006",
                            cantName: "湛普镇" 
                            },
                            {
                            cantCode: "500230007",
                            cantName: "许明寺镇" 
                            },
                            {
                            cantCode: "500230008",
                            cantName: "兴义镇" 
                            },
                            {
                            cantCode: "500230009",
                            cantName: "仙女湖镇" 
                            },
                            {
                            cantCode: "500230010",
                            cantName: "武平镇" 
                            },
                            {
                            cantCode: "500230011",
                            cantName: "双路镇" 
                            },
                            {
                            cantCode: "500230012",
                            cantName: "双龙乡" 
                            },
                            {
                            cantCode: "500230013",
                            cantName: "树人镇" 
                            },
                            {
                            cantCode: "500230014",
                            cantName: "十直镇" 
                            },
                            {
                            cantCode: "500230015",
                            cantName: "社坛镇" 
                            },
                            {
                            cantCode: "500230016",
                            cantName: "三元镇" 
                            },
                            {
                            cantCode: "500230017",
                            cantName: "三建乡" 
                            },
                            {
                            cantCode: "500230018",
                            cantName: "三合街道" 
                            },
                            {
                            cantCode: "500230019",
                            cantName: "仁沙镇" 
                            },
                            {
                            cantCode: "500230020",
                            cantName: "青龙乡" 
                            },
                            {
                            cantCode: "500230021",
                            cantName: "南天湖镇" 
                            },
                            {
                            cantCode: "500230022",
                            cantName: "名山街道" 
                            },
                            {
                            cantCode: "500230023",
                            cantName: "龙孔镇" 
                            },
                            {
                            cantCode: "500230024",
                            cantName: "龙河镇" 
                            },
                            {
                            cantCode: "500230025",
                            cantName: "江池镇" 
                            },
                            {
                            cantCode: "500230026",
                            cantName: "虎威镇" 
                            },
                            {
                            cantCode: "500230027",
                            cantName: "高家镇" 
                            },
                            {
                            cantCode: "500230028",
                            cantName: "董家镇" 
                            },
                            {
                            cantCode: "500230029",
                            cantName: "保合镇" 
                            },
                            {
                            cantCode: "500230030",
                            cantName: "包鸾镇" 
                            },
                            {
                            cantCode: "500230031",
                            cantName: "崇兴乡" 
                            }

                               ]
                }, 
               {
                 cantCode: "500231",
                 cantName: "垫江县",
                 children: [ 

                            {
                            cantCode: "500231001",
                            cantName: "周嘉镇" 
                            },
                            {
                            cantCode: "500231002",
                            cantName: "砚台镇" 
                            },
                            {
                            cantCode: "500231003",
                            cantName: "沙坪镇" 
                            },
                            {
                            cantCode: "500231004",
                            cantName: "普顺镇" 
                            },
                            {
                            cantCode: "500231005",
                            cantName: "鹤游镇" 
                            },
                            {
                            cantCode: "500231006",
                            cantName: "高峰镇" 
                            },
                            {
                            cantCode: "500231007",
                            cantName: "澄溪镇" 
                            },
                            {
                            cantCode: "500231008",
                            cantName: "白家镇" 
                            },
                            {
                            cantCode: "500231009",
                            cantName: "永平镇" 
                            },
                            {
                            cantCode: "500231010",
                            cantName: "永安镇" 
                            },
                            {
                            cantCode: "500231011",
                            cantName: "新民镇" 
                            },
                            {
                            cantCode: "500231012",
                            cantName: "五洞镇" 
                            },
                            {
                            cantCode: "500231013",
                            cantName: "太平镇" 
                            },
                            {
                            cantCode: "500231014",
                            cantName: "沙河乡" 
                            },
                            {
                            cantCode: "500231015",
                            cantName: "三溪镇" 
                            },
                            {
                            cantCode: "500231016",
                            cantName: "坪山镇" 
                            },
                            {
                            cantCode: "500231017",
                            cantName: "裴兴镇" 
                            },
                            {
                            cantCode: "500231018",
                            cantName: "黄沙镇" 
                            },
                            {
                            cantCode: "500231019",
                            cantName: "桂阳街道" 
                            },
                            {
                            cantCode: "500231020",
                            cantName: "桂溪街道" 
                            },
                            {
                            cantCode: "500231021",
                            cantName: "高安镇" 
                            },
                            {
                            cantCode: "500231022",
                            cantName: "杠家镇" 
                            },
                            {
                            cantCode: "500231023",
                            cantName: "大石乡" 
                            },
                            {
                            cantCode: "500231024",
                            cantName: "长龙镇" 
                            },
                            {
                            cantCode: "500231025",
                            cantName: "曹回镇" 
                            },
                            {
                            cantCode: "500231026",
                            cantName: "包家镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500232",
                 cantName: "武隆区",
                 children: [ 

                            {
                            cantCode: "500232001",
                            cantName: "鸭江镇" 
                            },
                            {
                            cantCode: "500232002",
                            cantName: "文复乡" 
                            },
                            {
                            cantCode: "500232003",
                            cantName: "铁矿乡" 
                            },
                            {
                            cantCode: "500232004",
                            cantName: "平桥镇" 
                            },
                            {
                            cantCode: "500232005",
                            cantName: "江口镇" 
                            },
                            {
                            cantCode: "500232006",
                            cantName: "后坪乡" 
                            },
                            {
                            cantCode: "500232007",
                            cantName: "长坝镇" 
                            },
                            {
                            cantCode: "500232008",
                            cantName: "白马镇" 
                            },
                            {
                            cantCode: "500232009",
                            cantName: "赵家乡" 
                            },
                            {
                            cantCode: "500232010",
                            cantName: "羊角镇" 
                            },
                            {
                            cantCode: "500232011",
                            cantName: "巷口镇" 
                            },
                            {
                            cantCode: "500232012",
                            cantName: "仙女山镇" 
                            },
                            {
                            cantCode: "500232013",
                            cantName: "土坎镇" 
                            },
                            {
                            cantCode: "500232014",
                            cantName: "土地乡" 
                            },
                            {
                            cantCode: "500232015",
                            cantName: "桐梓镇" 
                            },
                            {
                            cantCode: "500232016",
                            cantName: "双河乡" 
                            },
                            {
                            cantCode: "500232017",
                            cantName: "石桥乡" 
                            },
                            {
                            cantCode: "500232018",
                            cantName: "庙垭乡" 
                            },
                            {
                            cantCode: "500232019",
                            cantName: "接龙乡" 
                            },
                            {
                            cantCode: "500232020",
                            cantName: "火炉镇" 
                            },
                            {
                            cantCode: "500232021",
                            cantName: "黄莺乡" 
                            },
                            {
                            cantCode: "500232022",
                            cantName: "和顺乡" 
                            },
                            {
                            cantCode: "500232023",
                            cantName: "浩口乡" 
                            },
                            {
                            cantCode: "500232024",
                            cantName: "凤来乡" 
                            },
                            {
                            cantCode: "500232025",
                            cantName: "沧沟乡" 
                            },
                            {
                            cantCode: "500232026",
                            cantName: "白云乡" 
                            }

                               ]
                }, 
               {
                 cantCode: "500233",
                 cantName: "忠县",
                 children: [ 

                            {
                            cantCode: "500233001",
                            cantName: "洋渡镇" 
                            },
                            {
                            cantCode: "500233002",
                            cantName: "乌杨镇" 
                            },
                            {
                            cantCode: "500233003",
                            cantName: "石黄镇" 
                            },
                            {
                            cantCode: "500233004",
                            cantName: "汝溪镇" 
                            },
                            {
                            cantCode: "500233005",
                            cantName: "金声乡" 
                            },
                            {
                            cantCode: "500233006",
                            cantName: "官坝镇" 
                            },
                            {
                            cantCode: "500233007",
                            cantName: "拔山镇" 
                            },
                            {
                            cantCode: "500233008",
                            cantName: "忠州街道" 
                            },
                            {
                            cantCode: "500233009",
                            cantName: "永丰镇" 
                            },
                            {
                            cantCode: "500233010",
                            cantName: "野鹤镇" 
                            },
                            {
                            cantCode: "500233011",
                            cantName: "兴峰乡" 
                            },
                            {
                            cantCode: "500233012",
                            cantName: "新生镇" 
                            },
                            {
                            cantCode: "500233013",
                            cantName: "新立镇" 
                            },
                            {
                            cantCode: "500233014",
                            cantName: "涂井乡" 
                            },
                            {
                            cantCode: "500233015",
                            cantName: "双桂镇" 
                            },
                            {
                            cantCode: "500233016",
                            cantName: "石子乡" 
                            },
                            {
                            cantCode: "500233017",
                            cantName: "石宝镇" 
                            },
                            {
                            cantCode: "500233018",
                            cantName: "善广乡" 
                            },
                            {
                            cantCode: "500233019",
                            cantName: "三汇镇" 
                            },
                            {
                            cantCode: "500233020",
                            cantName: "任家镇" 
                            },
                            {
                            cantCode: "500233021",
                            cantName: "磨子土家族乡" 
                            },
                            {
                            cantCode: "500233022",
                            cantName: "马灌镇" 
                            },
                            {
                            cantCode: "500233023",
                            cantName: "金鸡镇" 
                            },
                            {
                            cantCode: "500233024",
                            cantName: "黄金镇" 
                            },
                            {
                            cantCode: "500233025",
                            cantName: "花桥镇" 
                            },
                            {
                            cantCode: "500233026",
                            cantName: "复兴镇" 
                            },
                            {
                            cantCode: "500233027",
                            cantName: "东溪镇" 
                            },
                            {
                            cantCode: "500233028",
                            cantName: "白石镇" 
                            },
                            {
                            cantCode: "500233029",
                            cantName: "白公街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500234",
                 cantName: "开州区",
                 children: [ 

                            {
                            cantCode: "500234001",
                            cantName: "镇东街道" 
                            },
                            {
                            cantCode: "500234002",
                            cantName: "岳溪镇" 
                            },
                            {
                            cantCode: "500234003",
                            cantName: "巫山镇" 
                            },
                            {
                            cantCode: "500234004",
                            cantName: "天和镇" 
                            },
                            {
                            cantCode: "500234005",
                            cantName: "渠口镇" 
                            },
                            {
                            cantCode: "500234006",
                            cantName: "麻柳乡" 
                            },
                            {
                            cantCode: "500234007",
                            cantName: "厚坝镇" 
                            },
                            {
                            cantCode: "500234008",
                            cantName: "汉丰街道" 
                            },
                            {
                            cantCode: "500234009",
                            cantName: "丰乐街道" 
                            },
                            {
                            cantCode: "500234010",
                            cantName: "长沙镇" 
                            },
                            {
                            cantCode: "500234011",
                            cantName: "紫水乡" 
                            },
                            {
                            cantCode: "500234012",
                            cantName: "竹溪镇" 
                            },
                            {
                            cantCode: "500234013",
                            cantName: "中和镇" 
                            },
                            {
                            cantCode: "500234014",
                            cantName: "镇安镇" 
                            },
                            {
                            cantCode: "500234015",
                            cantName: "赵家街道" 
                            },
                            {
                            cantCode: "500234016",
                            cantName: "云枫街道" 
                            },
                            {
                            cantCode: "500234017",
                            cantName: "义和镇" 
                            },
                            {
                            cantCode: "500234018",
                            cantName: "五通乡" 
                            },
                            {
                            cantCode: "500234019",
                            cantName: "文峰街道" 
                            },
                            {
                            cantCode: "500234020",
                            cantName: "温泉镇" 
                            },
                            {
                            cantCode: "500234021",
                            cantName: "铁桥镇" 
                            },
                            {
                            cantCode: "500234022",
                            cantName: "谭家镇" 
                            },
                            {
                            cantCode: "500234023",
                            cantName: "三汇口乡" 
                            },
                            {
                            cantCode: "500234024",
                            cantName: "南雅镇" 
                            },
                            {
                            cantCode: "500234025",
                            cantName: "南门镇" 
                            },
                            {
                            cantCode: "500234026",
                            cantName: "满月乡" 
                            },
                            {
                            cantCode: "500234027",
                            cantName: "临江镇" 
                            },
                            {
                            cantCode: "500234028",
                            cantName: "九龙山镇" 
                            },
                            {
                            cantCode: "500234029",
                            cantName: "金峰镇" 
                            },
                            {
                            cantCode: "500234030",
                            cantName: "河堰镇" 
                            },
                            {
                            cantCode: "500234031",
                            cantName: "和谦镇" 
                            },
                            {
                            cantCode: "500234032",
                            cantName: "郭家镇" 
                            },
                            {
                            cantCode: "500234033",
                            cantName: "关面乡" 
                            },
                            {
                            cantCode: "500234034",
                            cantName: "高桥镇" 
                            },
                            {
                            cantCode: "500234035",
                            cantName: "敦好镇" 
                            },
                            {
                            cantCode: "500234036",
                            cantName: "大进镇" 
                            },
                            {
                            cantCode: "500234037",
                            cantName: "大德镇" 
                            },
                            {
                            cantCode: "500234038",
                            cantName: "白泉乡" 
                            },
                            {
                            cantCode: "500234039",
                            cantName: "白桥镇" 
                            },
                            {
                            cantCode: "500234040",
                            cantName: "白鹤街道" 
                            }
                               ]
                }, 
               {
                 cantCode: "500235",
                 cantName: "云阳县",
                 children: [ 

                            {
                            cantCode: "500235001",
                            cantName: "养鹿镇" 
                            },
                            {
                            cantCode: "500235002",
                            cantName: "外郎乡" 
                            },
                            {
                            cantCode: "500235003",
                            cantName: "双江街道" 
                            },
                            {
                            cantCode: "500235004",
                            cantName: "沙市镇" 
                            },
                            {
                            cantCode: "500235005",
                            cantName: "渠马镇" 
                            },
                            {
                            cantCode: "500235006",
                            cantName: "普安乡" 
                            },
                            {
                            cantCode: "500235007",
                            cantName: "泥溪镇" 
                            },
                            {
                            cantCode: "500235008",
                            cantName: "龙角镇" 
                            },
                            {
                            cantCode: "500235009",
                            cantName: "云阳镇" 
                            },
                            {
                            cantCode: "500235010",
                            cantName: "黄石镇" 
                            },
                            {
                            cantCode: "500235011",
                            cantName: "高阳镇" 
                            },
                            {
                            cantCode: "500235012",
                            cantName: "大阳乡" 
                            },
                            {
                            cantCode: "500235013",
                            cantName: "耀灵乡" 
                            },
                            {
                            cantCode: "500235014",
                            cantName: "堰坪镇" 
                            },
                            {
                            cantCode: "500235015",
                            cantName: "新津乡" 
                            },
                            {
                            cantCode: "500235016",
                            cantName: "水口镇" 
                            },
                            {
                            cantCode: "500235017",
                            cantName: "双土镇" 
                            },
                            {
                            cantCode: "500235018",
                            cantName: "双龙镇" 
                            },
                            {
                            cantCode: "500235019",
                            cantName: "石门乡" 
                            },
                            {
                            cantCode: "500235020",
                            cantName: "蔈草镇" 
                            },
                            {
                            cantCode: "500235021",
                            cantName: "上坝乡" 
                            },
                            {
                            cantCode: "500235022",
                            cantName: "桑坪镇" 
                            },
                            {
                            cantCode: "500235023",
                            cantName: "人和街道" 
                            },
                            {
                            cantCode: "500235024",
                            cantName: "清水土家族乡" 
                            },
                            {
                            cantCode: "500235025",
                            cantName: "青龙街道" 
                            },
                            {
                            cantCode: "500235026",
                            cantName: "栖霞镇" 
                            },
                            {
                            cantCode: "500235027",
                            cantName: "平安镇" 
                            },
                            {
                            cantCode: "500235028",
                            cantName: "盘龙街道" 
                            },
                            {
                            cantCode: "500235029",
                            cantName: "农坝镇" 
                            },
                            {
                            cantCode: "500235030",
                            cantName: "南溪镇" 
                            },
                            {
                            cantCode: "500235031",
                            cantName: "路阳镇" 
                            },
                            {
                            cantCode: "500235032",
                            cantName: "龙洞镇" 
                            },
                            {
                            cantCode: "500235033",
                            cantName: "江口镇" 
                            },
                            {
                            cantCode: "500235034",
                            cantName: "云安镇" 
                            },
                            {
                            cantCode: "500235035",
                            cantName: "鱼泉镇" 
                            },
                            {
                            cantCode: "500235036",
                            cantName: "后叶镇" 
                            },
                            {
                            cantCode: "500235037",
                            cantName: "红狮镇" 
                            },
                            {
                            cantCode: "500235038",
                            cantName: "故陵镇" 
                            },
                            {
                            cantCode: "500235039",
                            cantName: "凤鸣镇" 
                            },
                            {
                            cantCode: "500235040",
                            cantName: "洞鹿乡" 
                            },
                            {
                            cantCode: "500235041",
                            cantName: "宝坪镇" 
                            },
                            {
                            cantCode: "500235042",
                            cantName: "巴阳镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500236",
                 cantName: "奉节县",
                 children: [ 

                            {
                            cantCode: "500236001",
                            cantName: "冯坪乡" 
                            },
                            {
                            cantCode: "500236002",
                            cantName: "汾河镇" 
                            },
                            {
                            cantCode: "500236003",
                            cantName: "大树镇" 
                            },
                            {
                            cantCode: "500236004",
                            cantName: "长安土家族乡" 
                            },
                            {
                            cantCode: "500236005",
                            cantName: "草堂镇" 
                            },
                            {
                            cantCode: "500236006",
                            cantName: "白帝镇" 
                            },
                            {
                            cantCode: "500236007",
                            cantName: "安坪乡" 
                            },
                            {
                            cantCode: "500236008",
                            cantName: "竹园镇" 
                            },
                            {
                            cantCode: "500236009",
                            cantName: "永乐镇" 
                            },
                            {
                            cantCode: "500236010",
                            cantName: "岩湾乡" 
                            },
                            {
                            cantCode: "500236011",
                            cantName: "吐祥镇" 
                            },
                            {
                            cantCode: "500236012",
                            cantName: "青龙镇" 
                            },
                            {
                            cantCode: "500236013",
                            cantName: "康坪乡" 
                            },
                            {
                            cantCode: "500236014",
                            cantName: "红土乡" 
                            },
                            {
                            cantCode: "500236015",
                            cantName: "夔门街道" 
                            },
                            {
                            cantCode: "500236016",
                            cantName: "朱衣镇" 
                            },
                            {
                            cantCode: "500236017",
                            cantName: "云雾土家族乡" 
                            },
                            {
                            cantCode: "500236018",
                            cantName: "鱼复街道" 
                            },
                            {
                            cantCode: "500236019",
                            cantName: "永安街道" 
                            },
                            {
                            cantCode: "500236020",
                            cantName: "羊市镇" 
                            },
                            {
                            cantCode: "500236021",
                            cantName: "兴隆镇" 
                            },
                            {
                            cantCode: "500236022",
                            cantName: "新民镇" 
                            },
                            {
                            cantCode: "500236023",
                            cantName: "五马镇" 
                            },
                            {
                            cantCode: "500236024",
                            cantName: "太和土家族乡" 
                            },
                            {
                            cantCode: "500236025",
                            cantName: "石岗乡" 
                            },
                            {
                            cantCode: "500236026",
                            cantName: "青莲镇" 
                            },
                            {
                            cantCode: "500236027",
                            cantName: "平安乡" 
                            },
                            {
                            cantCode: "500236028",
                            cantName: "龙桥土家族乡" 
                            },
                            {
                            cantCode: "500236029",
                            cantName: "康乐镇" 
                            },
                            {
                            cantCode: "500236030",
                            cantName: "甲高镇" 
                            },
                            {
                            cantCode: "500236031",
                            cantName: "鹤峰乡" 
                            },
                            {
                            cantCode: "500236032",
                            cantName: "公平镇" 
                            },
                            {
                            cantCode: "500236033",
                            cantName: "永安镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500237",
                 cantName: "巫山县",
                 children: [ 

                            {
                            cantCode: "500237001",
                            cantName: "笃坪乡" 
                            },
                            {
                            cantCode: "500237002",
                            cantName: "竹贤乡" 
                            },
                            {
                            cantCode: "500237003",
                            cantName: "巫峡镇" 
                            },
                            {
                            cantCode: "500237004",
                            cantName: "铜鼓镇" 
                            },
                            {
                            cantCode: "500237005",
                            cantName: "双龙镇" 
                            },
                            {
                            cantCode: "500237006",
                            cantName: "三溪乡" 
                            },
                            {
                            cantCode: "500237007",
                            cantName: "曲尺乡" 
                            },
                            {
                            cantCode: "500237008",
                            cantName: "平河乡" 
                            },
                            {
                            cantCode: "500237009",
                            cantName: "培石乡" 
                            },
                            {
                            cantCode: "500237010",
                            cantName: "庙宇镇" 
                            },
                            {
                            cantCode: "500237011",
                            cantName: "骡坪镇" 
                            },
                            {
                            cantCode: "500237012",
                            cantName: "龙溪镇" 
                            },
                            {
                            cantCode: "500237013",
                            cantName: "龙门街道" 
                            },
                            {
                            cantCode: "500237014",
                            cantName: "两坪乡" 
                            },
                            {
                            cantCode: "500237015",
                            cantName: "金坪乡" 
                            },
                            {
                            cantCode: "500237016",
                            cantName: "建平乡" 
                            },
                            {
                            cantCode: "500237017",
                            cantName: "官阳镇" 
                            },
                            {
                            cantCode: "500237018",
                            cantName: "官渡镇" 
                            },
                            {
                            cantCode: "500237019",
                            cantName: "福田镇" 
                            },
                            {
                            cantCode: "500237020",
                            cantName: "邓家乡" 
                            },
                            {
                            cantCode: "500237021",
                            cantName: "当阳乡" 
                            },
                            {
                            cantCode: "500237022",
                            cantName: "大昌镇" 
                            },
                            {
                            cantCode: "500237023",
                            cantName: "抱龙镇" 
                            },
                            {
                            cantCode: "500237024",
                            cantName: "红椿乡" 
                            },
                            {
                            cantCode: "500237025",
                            cantName: "高唐街道" 
                            },
                            {
                            cantCode: "500237026",
                            cantName: "大溪乡" 
                            }

                               ]
                }, 
               {
                 cantCode: "500238",
                 cantName: "巫溪县",
                 children: [ 

                            {
                            cantCode: "500238001",
                            cantName: "中梁乡" 
                            },
                            {
                            cantCode: "500238002",
                            cantName: "鱼鳞乡" 
                            },
                            {
                            cantCode: "500238003",
                            cantName: "徐家镇" 
                            },
                            {
                            cantCode: "500238004",
                            cantName: "乌龙乡" 
                            },
                            {
                            cantCode: "500238005",
                            cantName: "文峰镇" 
                            },
                            {
                            cantCode: "500238006",
                            cantName: "土城乡" 
                            },
                            {
                            cantCode: "500238007",
                            cantName: "田坝镇" 
                            },
                            {
                            cantCode: "500238008",
                            cantName: "天元乡" 
                            },
                            {
                            cantCode: "500238009",
                            cantName: "天星乡" 
                            },
                            {
                            cantCode: "500238010",
                            cantName: "双阳乡" 
                            },
                            {
                            cantCode: "500238011",
                            cantName: "胜利乡" 
                            },
                            {
                            cantCode: "500238012",
                            cantName: "蒲莲乡" 
                            },
                            {
                            cantCode: "500238013",
                            cantName: "宁河街道" 
                            },
                            {
                            cantCode: "500238014",
                            cantName: "宁厂镇" 
                            },
                            {
                            cantCode: "500238015",
                            cantName: "兰英乡" 
                            },
                            {
                            cantCode: "500238016",
                            cantName: "尖山镇" 
                            },
                            {
                            cantCode: "500238017",
                            cantName: "古路镇" 
                            },
                            {
                            cantCode: "500238018",
                            cantName: "凤凰镇" 
                            },
                            {
                            cantCode: "500238019",
                            cantName: "峰灵镇" 
                            },
                            {
                            cantCode: "500238020",
                            cantName: "城厢镇" 
                            },
                            {
                            cantCode: "500238021",
                            cantName: "朝阳镇" 
                            },
                            {
                            cantCode: "500238022",
                            cantName: "柏杨街道" 
                            },
                            {
                            cantCode: "500238023",
                            cantName: "白鹿镇" 
                            },
                            {
                            cantCode: "500238024",
                            cantName: "中岗乡" 
                            },
                            {
                            cantCode: "500238025",
                            cantName: "下堡镇" 
                            },
                            {
                            cantCode: "500238026",
                            cantName: "通城镇" 
                            },
                            {
                            cantCode: "500238027",
                            cantName: "塘坊镇" 
                            },
                            {
                            cantCode: "500238028",
                            cantName: "上磺镇" 
                            },
                            {
                            cantCode: "500238029",
                            cantName: "菱角乡" 
                            },
                            {
                            cantCode: "500238030",
                            cantName: "花台乡" 
                            },
                            {
                            cantCode: "500238031",
                            cantName: "大河乡" 
                            },
                            {
                            cantCode: "500238032",
                            cantName: "长桂乡" 
                            }

                               ]
                }, 
               {
                 cantCode: "500240",
                 cantName: "石柱土家族自治县",
                 children: [ 

                            {
                            cantCode: "500240001",
                            cantName: "悦崃镇" 
                            },
                            {
                            cantCode: "500240002",
                            cantName: "鱼池镇" 
                            },
                            {
                            cantCode: "500240003",
                            cantName: "新乐乡" 
                            },
                            {
                            cantCode: "500240004",
                            cantName: "洗新乡" 
                            },
                            {
                            cantCode: "500240005",
                            cantName: "西沱街道" 
                            },
                            {
                            cantCode: "500240006",
                            cantName: "王场镇" 
                            },
                            {
                            cantCode: "500240007",
                            cantName: "石家乡" 
                            },
                            {
                            cantCode: "500240008",
                            cantName: "三益乡" 
                            },
                            {
                            cantCode: "500240009",
                            cantName: "三星乡" 
                            },
                            {
                            cantCode: "500240010",
                            cantName: "桥头镇" 
                            },
                            {
                            cantCode: "500240011",
                            cantName: "马武镇" 
                            },
                            {
                            cantCode: "500240012",
                            cantName: "龙潭乡" 
                            },
                            {
                            cantCode: "500240013",
                            cantName: "六塘乡" 
                            },
                            {
                            cantCode: "500240014",
                            cantName: "黎场乡" 
                            },
                            {
                            cantCode: "500240015",
                            cantName: "金竹乡" 
                            },
                            {
                            cantCode: "500240016",
                            cantName: "金铃乡" 
                            },
                            {
                            cantCode: "500240017",
                            cantName: "黄鹤镇" 
                            },
                            {
                            cantCode: "500240018",
                            cantName: "枫木乡" 
                            },
                            {
                            cantCode: "500240019",
                            cantName: "大歇镇" 
                            },
                            {
                            cantCode: "500240020",
                            cantName: "中益乡" 
                            },
                            {
                            cantCode: "500240021",
                            cantName: "沿溪镇" 
                            },
                            {
                            cantCode: "500240022",
                            cantName: "下路街道" 
                            },
                            {
                            cantCode: "500240023",
                            cantName: "王家乡" 
                            },
                            {
                            cantCode: "500240024",
                            cantName: "万朝镇" 
                            },
                            {
                            cantCode: "500240025",
                            cantName: "沙子镇" 
                            },
                            {
                            cantCode: "500240026",
                            cantName: "三河镇" 
                            },
                            {
                            cantCode: "500240027",
                            cantName: "南宾街道" 
                            },
                            {
                            cantCode: "500240028",
                            cantName: "龙沙镇" 
                            },
                            {
                            cantCode: "500240029",
                            cantName: "临溪镇" 
                            },
                            {
                            cantCode: "500240030",
                            cantName: "冷水镇" 
                            },
                            {
                            cantCode: "500240031",
                            cantName: "黄水镇" 
                            },
                            {
                            cantCode: "500240032",
                            cantName: "河嘴乡" 
                            },
                            {
                            cantCode: "500240033",
                            cantName: "万安街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500241",
                 cantName: "秀山土家族苗族自治县",
                 children: [ 

                            {
                            cantCode: "500241001",
                            cantName: "钟灵镇" 
                            },
                            {
                            cantCode: "500241002",
                            cantName: "中和街道" 
                            },
                            {
                            cantCode: "500241003",
                            cantName: "雅江镇" 
                            },
                            {
                            cantCode: "500241004",
                            cantName: "溪口镇" 
                            },
                            {
                            cantCode: "500241005",
                            cantName: "宋农镇" 
                            },
                            {
                            cantCode: "500241006",
                            cantName: "石耶镇" 
                            },
                            {
                            cantCode: "500241007",
                            cantName: "溶溪镇" 
                            },
                            {
                            cantCode: "500241008",
                            cantName: "平凯街道" 
                            },
                            {
                            cantCode: "500241009",
                            cantName: "梅江镇" 
                            },
                            {
                            cantCode: "500241010",
                            cantName: "里仁镇" 
                            },
                            {
                            cantCode: "500241011",
                            cantName: "兰桥镇" 
                            },
                            {
                            cantCode: "500241012",
                            cantName: "岑溪乡" 
                            },
                            {
                            cantCode: "500241013",
                            cantName: "中平乡" 
                            },
                            {
                            cantCode: "500241014",
                            cantName: "涌洞乡" 
                            },
                            {
                            cantCode: "500241015",
                            cantName: "孝溪乡" 
                            },
                            {
                            cantCode: "500241016",
                            cantName: "乌杨街道" 
                            },
                            {
                            cantCode: "500241017",
                            cantName: "石堤镇" 
                            },
                            {
                            cantCode: "500241018",
                            cantName: "清溪场镇" 
                            },
                            {
                            cantCode: "500241019",
                            cantName: "妙泉镇" 
                            },
                            {
                            cantCode: "500241020",
                            cantName: "龙池镇" 
                            },
                            {
                            cantCode: "500241021",
                            cantName: "洪安镇" 
                            },
                            {
                            cantCode: "500241022",
                            cantName: "海洋乡" 
                            },
                            {
                            cantCode: "500241023",
                            cantName: "官庄镇" 
                            },
                            {
                            cantCode: "500241024",
                            cantName: "膏田镇" 
                            },
                            {
                            cantCode: "500241025",
                            cantName: "峨溶镇" 
                            },
                            {
                            cantCode: "500241026",
                            cantName: "大溪乡" 
                            },
                            {
                            cantCode: "500241027",
                            cantName: "隘口镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500242",
                 cantName: "酉阳土家族苗族自治县",
                 children: [ 

                            {
                            cantCode: "500242001",
                            cantName: "楠木乡" 
                            },
                            {
                            cantCode: "500242002",
                            cantName: "酉水河镇" 
                            },
                            {
                            cantCode: "500242003",
                            cantName: "兴隆镇" 
                            },
                            {
                            cantCode: "500242004",
                            cantName: "五福乡" 
                            },
                            {
                            cantCode: "500242005",
                            cantName: "涂市乡" 
                            },
                            {
                            cantCode: "500242006",
                            cantName: "天馆乡" 
                            },
                            {
                            cantCode: "500242007",
                            cantName: "清泉乡" 
                            },
                            {
                            cantCode: "500242008",
                            cantName: "南腰界乡" 
                            },
                            {
                            cantCode: "500242009",
                            cantName: "庙溪乡" 
                            },
                            {
                            cantCode: "500242010",
                            cantName: "麻旺镇" 
                            },
                            {
                            cantCode: "500242011",
                            cantName: "李溪镇" 
                            },
                            {
                            cantCode: "500242012",
                            cantName: "可大乡" 
                            },
                            {
                            cantCode: "500242013",
                            cantName: "后坪乡" 
                            },
                            {
                            cantCode: "500242014",
                            cantName: "官清乡" 
                            },
                            {
                            cantCode: "500242015",
                            cantName: "丁市镇" 
                            },
                            {
                            cantCode: "500242016",
                            cantName: "车田乡" 
                            },
                            {
                            cantCode: "500242017",
                            cantName: "板桥乡" 
                            },
                            {
                            cantCode: "500242018",
                            cantName: "腴地乡" 
                            },
                            {
                            cantCode: "500242019",
                            cantName: "泔溪镇" 
                            },
                            {
                            cantCode: "500242020",
                            cantName: "酉酬镇" 
                            },
                            {
                            cantCode: "500242021",
                            cantName: "宜居乡" 
                            },
                            {
                            cantCode: "500242022",
                            cantName: "小河镇" 
                            },
                            {
                            cantCode: "500242023",
                            cantName: "万木乡" 
                            },
                            {
                            cantCode: "500242024",
                            cantName: "铜鼓乡" 
                            },
                            {
                            cantCode: "500242025",
                            cantName: "桃花源街道" 
                            },
                            {
                            cantCode: "500242026",
                            cantName: "双泉乡" 
                            },
                            {
                            cantCode: "500242027",
                            cantName: "偏柏乡" 
                            },
                            {
                            cantCode: "500242028",
                            cantName: "木叶乡" 
                            },
                            {
                            cantCode: "500242029",
                            cantName: "毛坝乡" 
                            },
                            {
                            cantCode: "500242030",
                            cantName: "龙潭镇" 
                            },
                            {
                            cantCode: "500242031",
                            cantName: "两罾乡" 
                            },
                            {
                            cantCode: "500242032",
                            cantName: "浪坪乡" 
                            },
                            {
                            cantCode: "500242033",
                            cantName: "花田乡" 
                            },
                            {
                            cantCode: "500242034",
                            cantName: "黑水镇" 
                            },
                            {
                            cantCode: "500242035",
                            cantName: "龚滩镇" 
                            },
                            {
                            cantCode: "500242036",
                            cantName: "大溪镇" 
                            },
                            {
                            cantCode: "500242037",
                            cantName: "苍岭镇" 
                            },
                            {
                            cantCode: "500242038",
                            cantName: "板溪镇" 
                            },
                            {
                            cantCode: "500242039",
                            cantName: "钟多街道" 
                            }

                               ]
                }, 
               {
                 cantCode: "500243",
                 cantName: "彭水苗族土家族自治县",
                 children: [ 

                            {
                            cantCode: "500243001",
                            cantName: "走马乡" 
                            },
                            {
                            cantCode: "500243002",
                            cantName: "郁山镇" 
                            },
                            {
                            cantCode: "500243003",
                            cantName: "新田镇" 
                            },
                            {
                            cantCode: "500243004",
                            cantName: "桐楼乡" 
                            },
                            {
                            cantCode: "500243005",
                            cantName: "石盘乡" 
                            },
                            {
                            cantCode: "500243006",
                            cantName: "绍庆街道" 
                            },
                            {
                            cantCode: "500243007",
                            cantName: "桑柘镇" 
                            },
                            {
                            cantCode: "500243008",
                            cantName: "润溪乡" 
                            },
                            {
                            cantCode: "500243009",
                            cantName: "平安镇" 
                            },
                            {
                            cantCode: "500243010",
                            cantName: "鹿鸣乡" 
                            },
                            {
                            cantCode: "500243011",
                            cantName: "芦塘乡" 
                            },
                            {
                            cantCode: "500243012",
                            cantName: "龙塘乡" 
                            },
                            {
                            cantCode: "500243013",
                            cantName: "连湖镇" 
                            },
                            {
                            cantCode: "500243014",
                            cantName: "黄家镇" 
                            },
                            {
                            cantCode: "500243015",
                            cantName: "高谷镇" 
                            },
                            {
                            cantCode: "500243016",
                            cantName: "大垭乡" 
                            },
                            {
                            cantCode: "500243017",
                            cantName: "长生镇" 
                            },
                            {
                            cantCode: "500243018",
                            cantName: "鞍子镇" 
                            },
                            {
                            cantCode: "500243019",
                            cantName: "棣棠乡" 
                            },
                            {
                            cantCode: "500243020",
                            cantName: "诸佛乡" 
                            },
                            {
                            cantCode: "500243021",
                            cantName: "岩东乡" 
                            },
                            {
                            cantCode: "500243022",
                            cantName: "万足镇" 
                            },
                            {
                            cantCode: "500243023",
                            cantName: "太原镇" 
                            },
                            {
                            cantCode: "500243024",
                            cantName: "双龙乡" 
                            },
                            {
                            cantCode: "500243025",
                            cantName: "石柳乡" 
                            },
                            {
                            cantCode: "500243026",
                            cantName: "善感乡" 
                            },
                            {
                            cantCode: "500243027",
                            cantName: "三义乡" 
                            },
                            {
                            cantCode: "500243028",
                            cantName: "乔梓乡" 
                            },
                            {
                            cantCode: "500243029",
                            cantName: "普子镇" 
                            },
                            {
                            cantCode: "500243030",
                            cantName: "梅子垭镇" 
                            },
                            {
                            cantCode: "500243031",
                            cantName: "鹿角镇" 
                            },
                            {
                            cantCode: "500243032",
                            cantName: "龙溪镇" 
                            },
                            {
                            cantCode: "500243033",
                            cantName: "龙射镇" 
                            },
                            {
                            cantCode: "500243034",
                            cantName: "联合乡" 
                            },
                            {
                            cantCode: "500243035",
                            cantName: "朗溪乡" 
                            },
                            {
                            cantCode: "500243036",
                            cantName: "汉葭街道" 
                            },
                            {
                            cantCode: "500243037",
                            cantName: "靛水街道" 
                            },
                            {
                            cantCode: "500243038",
                            cantName: "大同镇" 
                            },
                            {
                            cantCode: "500243039",
                            cantName: "保家镇" 
                            }

                               ]
                }, 
               {
                 cantCode: "500245",
                 cantName: "重庆市两江新区",
                 children: [ 

                            {
                            cantCode: "500245067",
                            cantName: "鸳鸯街道" 
                            },
                            {
                            cantCode: "500245069",
                            cantName: "人和街道" 
                            },
                            {
                            cantCode: "500245071",
                            cantName: "天宫殿街道" 
                            },
                            {
                            cantCode: "500245073",
                            cantName: "翠云街道" 
                            },
                            {
                            cantCode: "500245076",
                            cantName: "大竹林街道" 
                            },
                            {
                            cantCode: "500245078",
                            cantName: "礼嘉街道" 
                            },
                            {
                            cantCode: "500245080",
                            cantName: "金山街道" 
                            },
                            {
                            cantCode: "500245082",
                            cantName: "康美街道" 
                            }

                               ]
                }
		]
	}, {
		cantCode: '510000',
		cantName: '四川省',
		children: [{
			cantCode: "510100",
			cantName: "成都市",
			children: [{
				cantCode: "510104",
				cantName: "锦江区"
			}, {
				cantCode: "510105",
				cantName: "青羊区"
			}, {
				cantCode: "510106",
				cantName: "金牛区"
			}, {
				cantCode: "510107",
				cantName: "武侯区"
			}, {
				cantCode: "510108",
				cantName: "成华区"
			}, {
				cantCode: "510112",
				cantName: "龙泉驿区"
			}, {
				cantCode: "510113",
				cantName: "青白江区"
			}, {
				cantCode: "510114",
				cantName: "新都区"
			}, {
				cantCode: "510115",
				cantName: "温江区"
			}, {
				cantCode: "510121",
				cantName: "金堂县"
			}, {
				cantCode: "510122",
				cantName: "双流县"
			}, {
				cantCode: "510124",
				cantName: "郫县"
			}, {
				cantCode: "510129",
				cantName: "大邑县"
			}, {
				cantCode: "510131",
				cantName: "蒲江县"
			}, {
				cantCode: "510132",
				cantName: "新津县"
			}, {
				cantCode: "510181",
				cantName: "都江堰市"
			}, {
				cantCode: "510182",
				cantName: "彭州市"
			}, {
				cantCode: "510183",
				cantName: "邛崃市"
			}, {
				cantCode: "510184",
				cantName: "崇州市"
			}, {
				cantCode: "510185",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510300",
			cantName: "自贡市",
			children: [{
				cantCode: "510302",
				cantName: "自流井区"
			}, {
				cantCode: "510303",
				cantName: "贡井区"
			}, {
				cantCode: "510304",
				cantName: "大安区"
			}, {
				cantCode: "510311",
				cantName: "沿滩区"
			}, {
				cantCode: "510321",
				cantName: "荣县"
			}, {
				cantCode: "510322",
				cantName: "富顺县"
			}, {
				cantCode: "510323",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510400",
			cantName: "攀枝花市",
			children: [{
				cantCode: "510402",
				cantName: "东区"
			}, {
				cantCode: "510403",
				cantName: "西区"
			}, {
				cantCode: "510411",
				cantName: "仁和区"
			}, {
				cantCode: "510421",
				cantName: "米易县"
			}, {
				cantCode: "510422",
				cantName: "盐边县"
			}, {
				cantCode: "510423",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510500",
			cantName: "泸州市",
			children: [{
				cantCode: "510502",
				cantName: "江阳区"
			}, {
				cantCode: "510503",
				cantName: "纳溪区"
			}, {
				cantCode: "510504",
				cantName: "龙马潭区"
			}, {
				cantCode: "510521",
				cantName: "泸县"
			}, {
				cantCode: "510522",
				cantName: "合江县"
			}, {
				cantCode: "510524",
				cantName: "叙永县"
			}, {
				cantCode: "510525",
				cantName: "古蔺县"
			}, {
				cantCode: "510526",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510600",
			cantName: "德阳市",
			children: [{
				cantCode: "510603",
				cantName: "旌阳区"
			}, {
				cantCode: "510623",
				cantName: "中江县"
			}, {
				cantCode: "510626",
				cantName: "罗江县"
			}, {
				cantCode: "510681",
				cantName: "广汉市"
			}, {
				cantCode: "510682",
				cantName: "什邡市"
			}, {
				cantCode: "510683",
				cantName: "绵竹市"
			}, {
				cantCode: "510684",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510700",
			cantName: "绵阳市",
			children: [{
				cantCode: "510703",
				cantName: "涪城区"
			}, {
				cantCode: "510704",
				cantName: "游仙区"
			}, {
				cantCode: "510722",
				cantName: "三台县"
			}, {
				cantCode: "510723",
				cantName: "盐亭县"
			}, {
				cantCode: "510724",
				cantName: "安县"
			}, {
				cantCode: "510725",
				cantName: "梓潼县"
			}, {
				cantCode: "510726",
				cantName: "北川羌族自治县"
			}, {
				cantCode: "510727",
				cantName: "平武县"
			}, {
				cantCode: "510751",
				cantName: "高新区"
			}, {
				cantCode: "510781",
				cantName: "江油市"
			}, {
				cantCode: "510782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510800",
			cantName: "广元市",
			children: [{
				cantCode: "510802",
				cantName: "利州区"
			}, {
				cantCode: "510811",
				cantName: "元坝区"
			}, {
				cantCode: "510812",
				cantName: "朝天区"
			}, {
				cantCode: "510821",
				cantName: "旺苍县"
			}, {
				cantCode: "510822",
				cantName: "青川县"
			}, {
				cantCode: "510823",
				cantName: "剑阁县"
			}, {
				cantCode: "510824",
				cantName: "苍溪县"
			}, {
				cantCode: "510825",
				cantName: "其它区"
			}]
		}, {
			cantCode: "510900",
			cantName: "遂宁市",
			children: [{
				cantCode: "510903",
				cantName: "船山区"
			}, {
				cantCode: "510904",
				cantName: "安居区"
			}, {
				cantCode: "510921",
				cantName: "蓬溪县"
			}, {
				cantCode: "510922",
				cantName: "射洪县"
			}, {
				cantCode: "510923",
				cantName: "大英县"
			}, {
				cantCode: "510924",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511000",
			cantName: "内江市",
			children: [{
				cantCode: "511002",
				cantName: "市中区"
			}, {
				cantCode: "511011",
				cantName: "东兴区"
			}, {
				cantCode: "511024",
				cantName: "威远县"
			}, {
				cantCode: "511025",
				cantName: "资中县"
			}, {
				cantCode: "511028",
				cantName: "隆昌县"
			}, {
				cantCode: "511029",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511100",
			cantName: "乐山市",
			children: [{
				cantCode: "511102",
				cantName: "市中区"
			}, {
				cantCode: "511111",
				cantName: "沙湾区"
			}, {
				cantCode: "511112",
				cantName: "五通桥区"
			}, {
				cantCode: "511113",
				cantName: "金口河区"
			}, {
				cantCode: "511123",
				cantName: "犍为县"
			}, {
				cantCode: "511124",
				cantName: "井研县"
			}, {
				cantCode: "511126",
				cantName: "夹江县"
			}, {
				cantCode: "511129",
				cantName: "沐川县"
			}, {
				cantCode: "511132",
				cantName: "峨边彝族自治县"
			}, {
				cantCode: "511133",
				cantName: "马边彝族自治县"
			}, {
				cantCode: "511181",
				cantName: "峨眉山市"
			}, {
				cantCode: "511182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511300",
			cantName: "南充市",
			children: [{
				cantCode: "511302",
				cantName: "顺庆区"
			}, {
				cantCode: "511303",
				cantName: "高坪区"
			}, {
				cantCode: "511304",
				cantName: "嘉陵区"
			}, {
				cantCode: "511321",
				cantName: "南部县"
			}, {
				cantCode: "511322",
				cantName: "营山县"
			}, {
				cantCode: "511323",
				cantName: "蓬安县"
			}, {
				cantCode: "511324",
				cantName: "仪陇县"
			}, {
				cantCode: "511325",
				cantName: "西充县"
			}, {
				cantCode: "511381",
				cantName: "阆中市"
			}, {
				cantCode: "511382",
				cantName: "其它区"
			}]
		}, {
			cantCode:"511400",
			cantName:"眉山市",
			fullName:"四川省眉山市",
			children:[
				{cantCode:"511401",cantName:"市辖区",fullName:"四川省眉山市市辖区"},
				{cantCode:"511402",cantName:"东坡区",fullName:"四川省眉山市东坡区"},
				{cantCode:"511421",cantName:"仁寿县",fullName:"四川省眉山市仁寿县"},
				{cantCode:"511422",cantName:"彭山区",fullName:"四川省眉山市彭山区"},
				{cantCode:"511423",cantName:"洪雅县",fullName:"四川省眉山市洪雅县"},
				{cantCode:"511424",cantName:"丹棱县",fullName:"四川省眉山市丹棱县"},
				{cantCode:"511425",cantName:"青神县",fullName:"四川省眉山市青神县"}
			]
		}, {
			cantCode: "511500",
			cantName: "宜宾市",
			children: [{
				cantCode: "511502",
				cantName: "翠屏区"
			}, {
				cantCode: "511521",
				cantName: "宜宾县"
			}, {
				cantCode: "511522",
				cantName: "南溪县"
			}, {
				cantCode: "511523",
				cantName: "江安县"
			}, {
				cantCode: "511524",
				cantName: "长宁县"
			}, {
				cantCode: "511525",
				cantName: "高县"
			}, {
				cantCode: "511526",
				cantName: "珙县"
			}, {
				cantCode: "511527",
				cantName: "筠连县"
			}, {
				cantCode: "511528",
				cantName: "兴文县"
			}, {
				cantCode: "511529",
				cantName: "屏山县"
			}, {
				cantCode: "511530",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511600",
			cantName: "广安市",
			children: [{
				cantCode: "511602",
				cantName: "广安区"
			}, {
				cantCode: "511621",
				cantName: "岳池县"
			}, {
				cantCode: "511622",
				cantName: "武胜县"
			}, {
				cantCode: "511623",
				cantName: "邻水县"
			}, {
				cantCode: "511681",
				cantName: "华蓥市"
			}, {
				cantCode: "511682",
				cantName: "市辖区"
			}, {
				cantCode: "511683",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511700",
			cantName: "达州市",
			children: [{
				cantCode: "511702",
				cantName: "通川区"
			}, {
				cantCode: "511721",
				cantName: "达县"
			}, {
				cantCode: "511722",
				cantName: "宣汉县"
			}, {
				cantCode: "511723",
				cantName: "开江县"
			}, {
				cantCode: "511724",
				cantName: "大竹县"
			}, {
				cantCode: "511725",
				cantName: "渠县"
			}, {
				cantCode: "511781",
				cantName: "万源市"
			}, {
				cantCode: "511782",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511800",
			cantName: "雅安市",
			children: [{
				cantCode: "511802",
				cantName: "雨城区"
			}, {
				cantCode: "511821",
				cantName: "名山县"
			}, {
				cantCode: "511822",
				cantName: "荥经县"
			}, {
				cantCode: "511823",
				cantName: "汉源县"
			}, {
				cantCode: "511824",
				cantName: "石棉县"
			}, {
				cantCode: "511825",
				cantName: "天全县"
			}, {
				cantCode: "511826",
				cantName: "芦山县"
			}, {
				cantCode: "511827",
				cantName: "宝兴县"
			}, {
				cantCode: "511828",
				cantName: "其它区"
			}]
		}, {
			cantCode: "511900",
			cantName: "巴中市",
			children: [{
				cantCode: "511902",
				cantName: "巴州区"
			}, {
				cantCode: "511921",
				cantName: "通江县"
			}, {
				cantCode: "511922",
				cantName: "南江县"
			}, {
				cantCode: "511923",
				cantName: "平昌县"
			}, {
				cantCode: "511924",
				cantName: "其它区"
			}]
		}, {
			cantCode: "512000",
			cantName: "资阳市",
			children: [{
				cantCode: "512002",
				cantName: "雁江区"
			}, {
				cantCode: "512021",
				cantName: "安岳县"
			}, {
				cantCode: "512022",
				cantName: "乐至县"
			}, {
				cantCode: "512081",
				cantName: "简阳市"
			}, {
				cantCode: "512082",
				cantName: "其它区"
			}]
		}, {
			cantCode: "513200",
			cantName: "阿坝藏族羌族自治州",
			children: [{
				cantCode: "513221",
				cantName: "汶川县"
			}, {
				cantCode: "513222",
				cantName: "理县"
			}, {
				cantCode: "513223",
				cantName: "茂县"
			}, {
				cantCode: "513224",
				cantName: "松潘县"
			}, {
				cantCode: "513225",
				cantName: "九寨沟县"
			}, {
				cantCode: "513226",
				cantName: "金川县"
			}, {
				cantCode: "513227",
				cantName: "小金县"
			}, {
				cantCode: "513228",
				cantName: "黑水县"
			}, {
				cantCode: "513229",
				cantName: "马尔康县"
			}, {
				cantCode: "513230",
				cantName: "壤塘县"
			}, {
				cantCode: "513231",
				cantName: "阿坝县"
			}, {
				cantCode: "513232",
				cantName: "若尔盖县"
			}, {
				cantCode: "513233",
				cantName: "红原县"
			}, {
				cantCode: "513234",
				cantName: "其它区"
			}]
		}, {
			cantCode: "513300",
			cantName: "甘孜藏族自治州",
			children: [{
				cantCode: "513321",
				cantName: "康定县"
			}, {
				cantCode: "513322",
				cantName: "泸定县"
			}, {
				cantCode: "513323",
				cantName: "丹巴县"
			}, {
				cantCode: "513324",
				cantName: "九龙县"
			}, {
				cantCode: "513325",
				cantName: "雅江县"
			}, {
				cantCode: "513326",
				cantName: "道孚县"
			}, {
				cantCode: "513327",
				cantName: "炉霍县"
			}, {
				cantCode: "513328",
				cantName: "甘孜县"
			}, {
				cantCode: "513329",
				cantName: "新龙县"
			}, {
				cantCode: "513330",
				cantName: "德格县"
			}, {
				cantCode: "513331",
				cantName: "白玉县"
			}, {
				cantCode: "513332",
				cantName: "石渠县"
			}, {
				cantCode: "513333",
				cantName: "色达县"
			}, {
				cantCode: "513334",
				cantName: "理塘县"
			}, {
				cantCode: "513335",
				cantName: "巴塘县"
			}, {
				cantCode: "513336",
				cantName: "乡城县"
			}, {
				cantCode: "513337",
				cantName: "稻城县"
			}, {
				cantCode: "513338",
				cantName: "得荣县"
			}, {
				cantCode: "513339",
				cantName: "其它区"
			}]
		}, {
			cantCode: "513400",
			cantName: "凉山彝族自治州",
			children: [{
				cantCode: "513401",
				cantName: "西昌市"
			}, {
				cantCode: "513422",
				cantName: "木里藏族自治县"
			}, {
				cantCode: "513423",
				cantName: "盐源县"
			}, {
				cantCode: "513424",
				cantName: "德昌县"
			}, {
				cantCode: "513425",
				cantName: "会理县"
			}, {
				cantCode: "513426",
				cantName: "会东县"
			}, {
				cantCode: "513427",
				cantName: "宁南县"
			}, {
				cantCode: "513428",
				cantName: "普格县"
			}, {
				cantCode: "513429",
				cantName: "布拖县"
			}, {
				cantCode: "513430",
				cantName: "金阳县"
			}, {
				cantCode: "513431",
				cantName: "昭觉县"
			}, {
				cantCode: "513432",
				cantName: "喜德县"
			}, {
				cantCode: "513433",
				cantName: "冕宁县"
			}, {
				cantCode: "513434",
				cantName: "越西县"
			}, {
				cantCode: "513435",
				cantName: "甘洛县"
			}, {
				cantCode: "513436",
				cantName: "美姑县"
			}, {
				cantCode: "513437",
				cantName: "雷波县"
			}, {
				cantCode: "513438",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '520000',
		cantName: '贵州省',
		children: [{
			cantCode: "520100",
			cantName: "贵阳市",
			children: [{
				cantCode: "520102",
				cantName: "南明区"
			}, {
				cantCode: "520103",
				cantName: "云岩区"
			}, {
				cantCode: "520111",
				cantName: "花溪区"
			}, {
				cantCode: "520112",
				cantName: "乌当区"
			}, {
				cantCode: "520113",
				cantName: "白云区"
			}, {
				cantCode: "520114",
				cantName: "小河区"
			}, {
				cantCode: "520121",
				cantName: "开阳县"
			}, {
				cantCode: "520122",
				cantName: "息烽县"
			}, {
				cantCode: "520123",
				cantName: "修文县"
			}, {
				cantCode: "520151",
				cantName: "金阳开发区"
			}, {
				cantCode: "520181",
				cantName: "清镇市"
			}, {
				cantCode: "520182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "520200",
			cantName: "六盘水市",
			children: [{
				cantCode: "520201",
				cantName: "钟山区"
			}, {
				cantCode: "520203",
				cantName: "六枝特区"
			}, {
				cantCode: "520221",
				cantName: "水城县"
			}, {
				cantCode: "520222",
				cantName: "盘县"
			}, {
				cantCode: "520223",
				cantName: "其它区"
			}]
		}, {
			cantCode: "520300",
			cantName: "遵义市",
			children: [{
				cantCode: "520302",
				cantName: "红花岗区"
			}, {
				cantCode: "520303",
				cantName: "汇川区"
			}, {
				cantCode: "520321",
				cantName: "遵义县"
			}, {
				cantCode: "520322",
				cantName: "桐梓县"
			}, {
				cantCode: "520323",
				cantName: "绥阳县"
			}, {
				cantCode: "520324",
				cantName: "正安县"
			}, {
				cantCode: "520325",
				cantName: "道真仡佬族苗族自治县"
			}, {
				cantCode: "520326",
				cantName: "务川仡佬族苗族自治县"
			}, {
				cantCode: "520327",
				cantName: "凤冈县"
			}, {
				cantCode: "520328",
				cantName: "湄潭县"
			}, {
				cantCode: "520329",
				cantName: "余庆县"
			}, {
				cantCode: "520330",
				cantName: "习水县"
			}, {
				cantCode: "520381",
				cantName: "赤水市"
			}, {
				cantCode: "520382",
				cantName: "仁怀市"
			}, {
				cantCode: "520383",
				cantName: "其它区"
			}]
		}, {
			cantCode: "520400",
			cantName: "安顺市",
			children: [{
				cantCode: "520402",
				cantName: "西秀区"
			}, {
				cantCode: "520421",
				cantName: "平坝县"
			}, {
				cantCode: "520422",
				cantName: "普定县"
			}, {
				cantCode: "520423",
				cantName: "镇宁布依族苗族自治县"
			}, {
				cantCode: "520424",
				cantName: "关岭布依族苗族自治县"
			}, {
				cantCode: "520425",
				cantName: "紫云苗族布依族自治县"
			}, {
				cantCode: "520426",
				cantName: "其它区"
			}]
		}, {
			cantCode: "522200",
			cantName: "铜仁地区",
			children: [{
				cantCode: "522201",
				cantName: "铜仁市"
			}, {
				cantCode: "522222",
				cantName: "江口县"
			}, {
				cantCode: "522223",
				cantName: "玉屏侗族自治县"
			}, {
				cantCode: "522224",
				cantName: "石阡县"
			}, {
				cantCode: "522225",
				cantName: "思南县"
			}, {
				cantCode: "522226",
				cantName: "印江土家族苗族自治县"
			}, {
				cantCode: "522227",
				cantName: "德江县"
			}, {
				cantCode: "522228",
				cantName: "沿河土家族自治县"
			}, {
				cantCode: "522229",
				cantName: "松桃苗族自治县"
			}, {
				cantCode: "522230",
				cantName: "万山特区"
			}, {
				cantCode: "522231",
				cantName: "其它区"
			}]
		}, {
			cantCode: "522300",
			cantName: "黔西南布依族苗族自治州",
			children: [{
				cantCode: "522301",
				cantName: "兴义市"
			}, {
				cantCode: "522322",
				cantName: "兴仁县"
			}, {
				cantCode: "522323",
				cantName: "普安县"
			}, {
				cantCode: "522324",
				cantName: "晴隆县"
			}, {
				cantCode: "522325",
				cantName: "贞丰县"
			}, {
				cantCode: "522326",
				cantName: "望谟县"
			}, {
				cantCode: "522327",
				cantName: "册亨县"
			}, {
				cantCode: "522328",
				cantName: "安龙县"
			}, {
				cantCode: "522329",
				cantName: "其它区"
			}]
		}, {
			cantCode: "522400",
			cantName: "毕节地区",
			children: [{
				cantCode: "522401",
				cantName: "毕节市"
			}, {
				cantCode: "522422",
				cantName: "大方县"
			}, {
				cantCode: "522423",
				cantName: "黔西县"
			}, {
				cantCode: "522424",
				cantName: "金沙县"
			}, {
				cantCode: "522425",
				cantName: "织金县"
			}, {
				cantCode: "522426",
				cantName: "纳雍县"
			}, {
				cantCode: "522427",
				cantName: "威宁彝族回族苗族自治县"
			}, {
				cantCode: "522428",
				cantName: "赫章县"
			}, {
				cantCode: "522429",
				cantName: "其它区"
			}]
		}, {
			cantCode: "522600",
			cantName: "黔东南苗族侗族自治州",
			children: [{
				cantCode: "522601",
				cantName: "凯里市"
			}, {
				cantCode: "522622",
				cantName: "黄平县"
			}, {
				cantCode: "522623",
				cantName: "施秉县"
			}, {
				cantCode: "522624",
				cantName: "三穗县"
			}, {
				cantCode: "522625",
				cantName: "镇远县"
			}, {
				cantCode: "522626",
				cantName: "岑巩县"
			}, {
				cantCode: "522627",
				cantName: "天柱县"
			}, {
				cantCode: "522628",
				cantName: "锦屏县"
			}, {
				cantCode: "522629",
				cantName: "剑河县"
			}, {
				cantCode: "522630",
				cantName: "台江县"
			}, {
				cantCode: "522631",
				cantName: "黎平县"
			}, {
				cantCode: "522632",
				cantName: "榕江县"
			}, {
				cantCode: "522633",
				cantName: "从江县"
			}, {
				cantCode: "522634",
				cantName: "雷山县"
			}, {
				cantCode: "522635",
				cantName: "麻江县"
			}, {
				cantCode: "522636",
				cantName: "丹寨县"
			}, {
				cantCode: "522637",
				cantName: "其它区"
			}]
		}, {
			cantCode: "522700",
			cantName: "黔南布依族苗族自治州",
			children: [{
				cantCode: "522701",
				cantName: "都匀市"
			}, {
				cantCode: "522702",
				cantName: "福泉市"
			}, {
				cantCode: "522722",
				cantName: "荔波县"
			}, {
				cantCode: "522723",
				cantName: "贵定县"
			}, {
				cantCode: "522725",
				cantName: "瓮安县"
			}, {
				cantCode: "522726",
				cantName: "独山县"
			}, {
				cantCode: "522727",
				cantName: "平塘县"
			}, {
				cantCode: "522728",
				cantName: "罗甸县"
			}, {
				cantCode: "522729",
				cantName: "长顺县"
			}, {
				cantCode: "522730",
				cantName: "龙里县"
			}, {
				cantCode: "522731",
				cantName: "惠水县"
			}, {
				cantCode: "522732",
				cantName: "三都水族自治县"
			}, {
				cantCode: "522733",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '530000',
		cantName: '云南省',
		children: [{
			cantCode: "530100",
			cantName: "昆明市",
			children: [{
				cantCode: "530102",
				cantName: "五华区"
			}, {
				cantCode: "530103",
				cantName: "盘龙区"
			}, {
				cantCode: "530111",
				cantName: "官渡区"
			}, {
				cantCode: "530112",
				cantName: "西山区"
			}, {
				cantCode: "530113",
				cantName: "东川区"
			}, {
				cantCode: "530121",
				cantName: "呈贡县"
			}, {
				cantCode: "530122",
				cantName: "晋宁县"
			}, {
				cantCode: "530124",
				cantName: "富民县"
			}, {
				cantCode: "530125",
				cantName: "宜良县"
			}, {
				cantCode: "530126",
				cantName: "石林彝族自治县"
			}, {
				cantCode: "530127",
				cantName: "嵩明县"
			}, {
				cantCode: "530128",
				cantName: "禄劝彝族苗族自治县"
			}, {
				cantCode: "530129",
				cantName: "寻甸回族彝族自治县"
			}, {
				cantCode: "530181",
				cantName: "安宁市"
			}, {
				cantCode: "530182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530300",
			cantName: "曲靖市",
			children: [{
				cantCode: "530302",
				cantName: "麒麟区"
			}, {
				cantCode: "530321",
				cantName: "马龙县"
			}, {
				cantCode: "530322",
				cantName: "陆良县"
			}, {
				cantCode: "530323",
				cantName: "师宗县"
			}, {
				cantCode: "530324",
				cantName: "罗平县"
			}, {
				cantCode: "530325",
				cantName: "富源县"
			}, {
				cantCode: "530326",
				cantName: "会泽县"
			}, {
				cantCode: "530328",
				cantName: "沾益县"
			}, {
				cantCode: "530381",
				cantName: "宣威市"
			}, {
				cantCode: "530382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530400",
			cantName: "玉溪市",
			children: [{
				cantCode: "530402",
				cantName: "红塔区"
			}, {
				cantCode: "530421",
				cantName: "江川县"
			}, {
				cantCode: "530422",
				cantName: "澄江县"
			}, {
				cantCode: "530423",
				cantName: "通海县"
			}, {
				cantCode: "530424",
				cantName: "华宁县"
			}, {
				cantCode: "530425",
				cantName: "易门县"
			}, {
				cantCode: "530426",
				cantName: "峨山彝族自治县"
			}, {
				cantCode: "530427",
				cantName: "新平彝族傣族自治县"
			}, {
				cantCode: "530428",
				cantName: "元江哈尼族彝族傣族自治县"
			}, {
				cantCode: "530429",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530500",
			cantName: "保山市",
			children: [{
				cantCode: "530502",
				cantName: "隆阳区"
			}, {
				cantCode: "530521",
				cantName: "施甸县"
			}, {
				cantCode: "530522",
				cantName: "腾冲县"
			}, {
				cantCode: "530523",
				cantName: "龙陵县"
			}, {
				cantCode: "530524",
				cantName: "昌宁县"
			}, {
				cantCode: "530525",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530600",
			cantName: "昭通市",
			children: [{
				cantCode: "530602",
				cantName: "昭阳区"
			}, {
				cantCode: "530621",
				cantName: "鲁甸县"
			}, {
				cantCode: "530622",
				cantName: "巧家县"
			}, {
				cantCode: "530623",
				cantName: "盐津县"
			}, {
				cantCode: "530624",
				cantName: "大关县"
			}, {
				cantCode: "530625",
				cantName: "永善县"
			}, {
				cantCode: "530626",
				cantName: "绥江县"
			}, {
				cantCode: "530627",
				cantName: "镇雄县"
			}, {
				cantCode: "530628",
				cantName: "彝良县"
			}, {
				cantCode: "530629",
				cantName: "威信县"
			}, {
				cantCode: "530630",
				cantName: "水富县"
			}, {
				cantCode: "530631",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530700",
			cantName: "丽江市",
			children: [{
				cantCode: "530702",
				cantName: "古城区"
			}, {
				cantCode: "530721",
				cantName: "玉龙纳西族自治县"
			}, {
				cantCode: "530722",
				cantName: "永胜县"
			}, {
				cantCode: "530723",
				cantName: "华坪县"
			}, {
				cantCode: "530724",
				cantName: "宁蒗彝族自治县"
			}, {
				cantCode: "530725",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530800",
			cantName: "普洱市",
			children: [{
				cantCode: "530802",
				cantName: "思茅区"
			}, {
				cantCode: "530821",
				cantName: "宁洱哈尼族彝族自治县"
			}, {
				cantCode: "530822",
				cantName: "墨江哈尼族自治县"
			}, {
				cantCode: "530823",
				cantName: "景东彝族自治县"
			}, {
				cantCode: "530824",
				cantName: "景谷傣族彝族自治县"
			}, {
				cantCode: "530825",
				cantName: "镇沅彝族哈尼族拉祜族自治县"
			}, {
				cantCode: "530826",
				cantName: "江城哈尼族彝族自治县"
			}, {
				cantCode: "530827",
				cantName: "孟连傣族拉祜族佤族自治县"
			}, {
				cantCode: "530828",
				cantName: "澜沧拉祜族自治县"
			}, {
				cantCode: "530829",
				cantName: "西盟佤族自治县"
			}, {
				cantCode: "530830",
				cantName: "其它区"
			}]
		}, {
			cantCode: "530900",
			cantName: "临沧市",
			children: [{
				cantCode: "530902",
				cantName: "临翔区"
			}, {
				cantCode: "530921",
				cantName: "凤庆县"
			}, {
				cantCode: "530922",
				cantName: "云县"
			}, {
				cantCode: "530923",
				cantName: "永德县"
			}, {
				cantCode: "530924",
				cantName: "镇康县"
			}, {
				cantCode: "530925",
				cantName: "双江拉祜族佤族布朗族傣族自治县"
			}, {
				cantCode: "530926",
				cantName: "耿马傣族佤族自治县"
			}, {
				cantCode: "530927",
				cantName: "沧源佤族自治县"
			}, {
				cantCode: "530928",
				cantName: "其它区"
			}]
		}, {
			cantCode: "532300",
			cantName: "楚雄彝族自治州",
			children: [{
				cantCode: "532301",
				cantName: "楚雄市"
			}, {
				cantCode: "532322",
				cantName: "双柏县"
			}, {
				cantCode: "532323",
				cantName: "牟定县"
			}, {
				cantCode: "532324",
				cantName: "南华县"
			}, {
				cantCode: "532325",
				cantName: "姚安县"
			}, {
				cantCode: "532326",
				cantName: "大姚县"
			}, {
				cantCode: "532327",
				cantName: "永仁县"
			}, {
				cantCode: "532328",
				cantName: "元谋县"
			}, {
				cantCode: "532329",
				cantName: "武定县"
			}, {
				cantCode: "532331",
				cantName: "禄丰县"
			}, {
				cantCode: "532332",
				cantName: "其它区"
			}]
		}, {
			cantCode: "532500",
			cantName: "红河哈尼族彝族自治州",
			children: [{
				cantCode: "532501",
				cantName: "个旧市"
			}, {
				cantCode: "532502",
				cantName: "开远市"
			}, {
				cantCode: "532522",
				cantName: "蒙自县"
			}, {
				cantCode: "532523",
				cantName: "屏边苗族自治县"
			}, {
				cantCode: "532524",
				cantName: "建水县"
			}, {
				cantCode: "532525",
				cantName: "石屏县"
			}, {
				cantCode: "532526",
				cantName: "弥勒县"
			}, {
				cantCode: "532527",
				cantName: "泸西县"
			}, {
				cantCode: "532528",
				cantName: "元阳县"
			}, {
				cantCode: "532529",
				cantName: "红河县"
			}, {
				cantCode: "532530",
				cantName: "金平苗族瑶族傣族自治县"
			}, {
				cantCode: "532531",
				cantName: "绿春县"
			}, {
				cantCode: "532532",
				cantName: "河口瑶族自治县"
			}, {
				cantCode: "532533",
				cantName: "其它区"
			}]
		}, {
			cantCode: "532600",
			cantName: "文山壮族苗族自治州",
			children: [{
				cantCode: "532621",
				cantName: "文山县"
			}, {
				cantCode: "532622",
				cantName: "砚山县"
			}, {
				cantCode: "532623",
				cantName: "西畴县"
			}, {
				cantCode: "532624",
				cantName: "麻栗坡县"
			}, {
				cantCode: "532625",
				cantName: "马关县"
			}, {
				cantCode: "532626",
				cantName: "丘北县"
			}, {
				cantCode: "532627",
				cantName: "广南县"
			}, {
				cantCode: "532628",
				cantName: "富宁县"
			}, {
				cantCode: "532629",
				cantName: "其它区"
			}]
		}, {
			cantCode: "532800",
			cantName: "西双版纳傣族自治州",
			children: [{
				cantCode: "532801",
				cantName: "景洪市"
			}, {
				cantCode: "532822",
				cantName: "勐海县"
			}, {
				cantCode: "532823",
				cantName: "勐腊县"
			}, {
				cantCode: "532824",
				cantName: "其它区"
			}]
		}, {
			cantCode: "532900",
			cantName: "大理白族自治州",
			children: [{
				cantCode: "532901",
				cantName: "大理市"
			}, {
				cantCode: "532922",
				cantName: "漾濞彝族自治县"
			}, {
				cantCode: "532923",
				cantName: "祥云县"
			}, {
				cantCode: "532924",
				cantName: "宾川县"
			}, {
				cantCode: "532925",
				cantName: "弥渡县"
			}, {
				cantCode: "532926",
				cantName: "南涧彝族自治县"
			}, {
				cantCode: "532927",
				cantName: "巍山彝族回族自治县"
			}, {
				cantCode: "532928",
				cantName: "永平县"
			}, {
				cantCode: "532929",
				cantName: "云龙县"
			}, {
				cantCode: "532930",
				cantName: "洱源县"
			}, {
				cantCode: "532931",
				cantName: "剑川县"
			}, {
				cantCode: "532932",
				cantName: "鹤庆县"
			}, {
				cantCode: "532933",
				cantName: "其它区"
			}]
		}, {
			cantCode: "533100",
			cantName: "德宏傣族景颇族自治州",
			children: [{
				cantCode: "533102",
				cantName: "瑞丽市"
			}, {
				cantCode: "533103",
				cantName: "潞西市"
			}, {
				cantCode: "533122",
				cantName: "梁河县"
			}, {
				cantCode: "533123",
				cantName: "盈江县"
			}, {
				cantCode: "533124",
				cantName: "陇川县"
			}, {
				cantCode: "533125",
				cantName: "其它区"
			}]
		}, {
			cantCode: "533300",
			cantName: "怒江傈僳族自治州",
			children: [{
				cantCode: "533321",
				cantName: "泸水县"
			}, {
				cantCode: "533323",
				cantName: "福贡县"
			}, {
				cantCode: "533324",
				cantName: "贡山独龙族怒族自治县"
			}, {
				cantCode: "533325",
				cantName: "兰坪白族普米族自治县"
			}, {
				cantCode: "533326",
				cantName: "其它区"
			}]
		}, {
			cantCode: "533400",
			cantName: "迪庆藏族自治州",
			children: [{
				cantCode: "533421",
				cantName: "香格里拉县"
			}, {
				cantCode: "533422",
				cantName: "德钦县"
			}, {
				cantCode: "533423",
				cantName: "维西傈僳族自治县"
			}, {
				cantCode: "533424",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '540000',
		cantName: '西藏',
		children: [{
			cantCode: "540100",
			cantName: "拉萨市",
			children: [{
				cantCode: "540102",
				cantName: "城关区"
			}, {
				cantCode: "540121",
				cantName: "林周县"
			}, {
				cantCode: "540122",
				cantName: "当雄县"
			}, {
				cantCode: "540123",
				cantName: "尼木县"
			}, {
				cantCode: "540124",
				cantName: "曲水县"
			}, {
				cantCode: "540125",
				cantName: "堆龙德庆县"
			}, {
				cantCode: "540126",
				cantName: "达孜县"
			}, {
				cantCode: "540127",
				cantName: "墨竹工卡县"
			}, {
				cantCode: "540128",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542100",
			cantName: "昌都地区",
			children: [{
				cantCode: "542121",
				cantName: "昌都县"
			}, {
				cantCode: "542122",
				cantName: "江达县"
			}, {
				cantCode: "542123",
				cantName: "贡觉县"
			}, {
				cantCode: "542124",
				cantName: "类乌齐县"
			}, {
				cantCode: "542125",
				cantName: "丁青县"
			}, {
				cantCode: "542126",
				cantName: "察雅县"
			}, {
				cantCode: "542127",
				cantName: "八宿县"
			}, {
				cantCode: "542128",
				cantName: "左贡县"
			}, {
				cantCode: "542129",
				cantName: "芒康县"
			}, {
				cantCode: "542132",
				cantName: "洛隆县"
			}, {
				cantCode: "542133",
				cantName: "边坝县"
			}, {
				cantCode: "542134",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542200",
			cantName: "山南地区",
			children: [{
				cantCode: "542221",
				cantName: "乃东县"
			}, {
				cantCode: "542222",
				cantName: "扎囊县"
			}, {
				cantCode: "542223",
				cantName: "贡嘎县"
			}, {
				cantCode: "542224",
				cantName: "桑日县"
			}, {
				cantCode: "542225",
				cantName: "琼结县"
			}, {
				cantCode: "542226",
				cantName: "曲松县"
			}, {
				cantCode: "542227",
				cantName: "措美县"
			}, {
				cantCode: "542228",
				cantName: "洛扎县"
			}, {
				cantCode: "542229",
				cantName: "加查县"
			}, {
				cantCode: "542231",
				cantName: "隆子县"
			}, {
				cantCode: "542232",
				cantName: "错那县"
			}, {
				cantCode: "542233",
				cantName: "浪卡子县"
			}, {
				cantCode: "542234",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542300",
			cantName: "日喀则地区",
			children: [{
				cantCode: "542301",
				cantName: "日喀则市"
			}, {
				cantCode: "542322",
				cantName: "南木林县"
			}, {
				cantCode: "542323",
				cantName: "江孜县"
			}, {
				cantCode: "542324",
				cantName: "定日县"
			}, {
				cantCode: "542325",
				cantName: "萨迦县"
			}, {
				cantCode: "542326",
				cantName: "拉孜县"
			}, {
				cantCode: "542327",
				cantName: "昂仁县"
			}, {
				cantCode: "542328",
				cantName: "谢通门县"
			}, {
				cantCode: "542329",
				cantName: "白朗县"
			}, {
				cantCode: "542330",
				cantName: "仁布县"
			}, {
				cantCode: "542331",
				cantName: "康马县"
			}, {
				cantCode: "542332",
				cantName: "定结县"
			}, {
				cantCode: "542333",
				cantName: "仲巴县"
			}, {
				cantCode: "542334",
				cantName: "亚东县"
			}, {
				cantCode: "542335",
				cantName: "吉隆县"
			}, {
				cantCode: "542336",
				cantName: "聂拉木县"
			}, {
				cantCode: "542337",
				cantName: "萨嘎县"
			}, {
				cantCode: "542338",
				cantName: "岗巴县"
			}, {
				cantCode: "542339",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542400",
			cantName: "那曲地区",
			children: [{
				cantCode: "542421",
				cantName: "那曲县"
			}, {
				cantCode: "542422",
				cantName: "嘉黎县"
			}, {
				cantCode: "542423",
				cantName: "比如县"
			}, {
				cantCode: "542424",
				cantName: "聂荣县"
			}, {
				cantCode: "542425",
				cantName: "安多县"
			}, {
				cantCode: "542426",
				cantName: "申扎县"
			}, {
				cantCode: "542427",
				cantName: "索县"
			}, {
				cantCode: "542428",
				cantName: "班戈县"
			}, {
				cantCode: "542429",
				cantName: "巴青县"
			}, {
				cantCode: "542430",
				cantName: "尼玛县"
			}, {
				cantCode: "542431",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542500",
			cantName: "阿里地区",
			children: [{
				cantCode: "542521",
				cantName: "普兰县"
			}, {
				cantCode: "542522",
				cantName: "札达县"
			}, {
				cantCode: "542523",
				cantName: "噶尔县"
			}, {
				cantCode: "542524",
				cantName: "日土县"
			}, {
				cantCode: "542525",
				cantName: "革吉县"
			}, {
				cantCode: "542526",
				cantName: "改则县"
			}, {
				cantCode: "542527",
				cantName: "措勤县"
			}, {
				cantCode: "542528",
				cantName: "其它区"
			}]
		}, {
			cantCode: "542600",
			cantName: "林芝地区",
			children: [{
				cantCode: "542621",
				cantName: "林芝县"
			}, {
				cantCode: "542622",
				cantName: "工布江达县"
			}, {
				cantCode: "542623",
				cantName: "米林县"
			}, {
				cantCode: "542624",
				cantName: "墨脱县"
			}, {
				cantCode: "542625",
				cantName: "波密县"
			}, {
				cantCode: "542626",
				cantName: "察隅县"
			}, {
				cantCode: "542627",
				cantName: "朗县"
			}, {
				cantCode: "542628",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '610000',
		cantName: '陕西省',
		children: [{
			cantCode: "610100",
			cantName: "西安市",
			children: [{
				cantCode: "610102",
				cantName: "新城区"
			}, {
				cantCode: "610103",
				cantName: "碑林区"
			}, {
				cantCode: "610104",
				cantName: "莲湖区"
			}, {
				cantCode: "610111",
				cantName: "灞桥区"
			}, {
				cantCode: "610112",
				cantName: "未央区"
			}, {
				cantCode: "610113",
				cantName: "雁塔区"
			}, {
				cantCode: "610114",
				cantName: "阎良区"
			}, {
				cantCode: "610115",
				cantName: "临潼区"
			}, {
				cantCode: "610116",
				cantName: "长安区"
			}, {
				cantCode: "610122",
				cantName: "蓝田县"
			}, {
				cantCode: "610124",
				cantName: "周至县"
			}, {
				cantCode: "610125",
				cantName: "户县"
			}, {
				cantCode: "610126",
				cantName: "高陵县"
			}, {
				cantCode: "610127",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610200",
			cantName: "铜川市",
			children: [{
				cantCode: "610202",
				cantName: "王益区"
			}, {
				cantCode: "610203",
				cantName: "印台区"
			}, {
				cantCode: "610204",
				cantName: "耀州区"
			}, {
				cantCode: "610222",
				cantName: "宜君县"
			}, {
				cantCode: "610223",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610300",
			cantName: "宝鸡市",
			children: [{
				cantCode: "610302",
				cantName: "渭滨区"
			}, {
				cantCode: "610303",
				cantName: "金台区"
			}, {
				cantCode: "610304",
				cantName: "陈仓区"
			}, {
				cantCode: "610322",
				cantName: "凤翔县"
			}, {
				cantCode: "610323",
				cantName: "岐山县"
			}, {
				cantCode: "610324",
				cantName: "扶风县"
			}, {
				cantCode: "610326",
				cantName: "眉县"
			}, {
				cantCode: "610327",
				cantName: "陇县"
			}, {
				cantCode: "610328",
				cantName: "千阳县"
			}, {
				cantCode: "610329",
				cantName: "麟游县"
			}, {
				cantCode: "610330",
				cantName: "凤县"
			}, {
				cantCode: "610331",
				cantName: "太白县"
			}, {
				cantCode: "610332",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610400",
			cantName: "咸阳市",
			children: [{
				cantCode: "610402",
				cantName: "秦都区"
			}, {
				cantCode: "610403",
				cantName: "杨陵区"
			}, {
				cantCode: "610404",
				cantName: "渭城区"
			}, {
				cantCode: "610422",
				cantName: "三原县"
			}, {
				cantCode: "610423",
				cantName: "泾阳县"
			}, {
				cantCode: "610424",
				cantName: "乾县"
			}, {
				cantCode: "610425",
				cantName: "礼泉县"
			}, {
				cantCode: "610426",
				cantName: "永寿县"
			}, {
				cantCode: "610427",
				cantName: "彬县"
			}, {
				cantCode: "610428",
				cantName: "长武县"
			}, {
				cantCode: "610429",
				cantName: "旬邑县"
			}, {
				cantCode: "610430",
				cantName: "淳化县"
			}, {
				cantCode: "610431",
				cantName: "武功县"
			}, {
				cantCode: "610481",
				cantName: "兴平市"
			}, {
				cantCode: "610482",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610500",
			cantName: "渭南市",
			children: [{
				cantCode: "610502",
				cantName: "临渭区"
			}, {
				cantCode: "610521",
				cantName: "华县"
			}, {
				cantCode: "610522",
				cantName: "潼关县"
			}, {
				cantCode: "610523",
				cantName: "大荔县"
			}, {
				cantCode: "610524",
				cantName: "合阳县"
			}, {
				cantCode: "610525",
				cantName: "澄城县"
			}, {
				cantCode: "610526",
				cantName: "蒲城县"
			}, {
				cantCode: "610527",
				cantName: "白水县"
			}, {
				cantCode: "610528",
				cantName: "富平县"
			}, {
				cantCode: "610581",
				cantName: "韩城市"
			}, {
				cantCode: "610582",
				cantName: "华阴市"
			}, {
				cantCode: "610583",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610600",
			cantName: "延安市",
			children: [{
				cantCode: "610602",
				cantName: "宝塔区"
			}, {
				cantCode: "610621",
				cantName: "延长县"
			}, {
				cantCode: "610622",
				cantName: "延川县"
			}, {
				cantCode: "610623",
				cantName: "子长县"
			}, {
				cantCode: "610624",
				cantName: "安塞县"
			}, {
				cantCode: "610625",
				cantName: "志丹县"
			}, {
				cantCode: "610626",
				cantName: "吴起县"
			}, {
				cantCode: "610627",
				cantName: "甘泉县"
			}, {
				cantCode: "610628",
				cantName: "富县"
			}, {
				cantCode: "610629",
				cantName: "洛川县"
			}, {
				cantCode: "610630",
				cantName: "宜川县"
			}, {
				cantCode: "610631",
				cantName: "黄龙县"
			}, {
				cantCode: "610632",
				cantName: "黄陵县"
			}, {
				cantCode: "610633",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610700",
			cantName: "汉中市",
			children: [{
				cantCode: "610702",
				cantName: "汉台区"
			}, {
				cantCode: "610721",
				cantName: "南郑县"
			}, {
				cantCode: "610722",
				cantName: "城固县"
			}, {
				cantCode: "610723",
				cantName: "洋县"
			}, {
				cantCode: "610724",
				cantName: "西乡县"
			}, {
				cantCode: "610725",
				cantName: "勉县"
			}, {
				cantCode: "610726",
				cantName: "宁强县"
			}, {
				cantCode: "610727",
				cantName: "略阳县"
			}, {
				cantCode: "610728",
				cantName: "镇巴县"
			}, {
				cantCode: "610729",
				cantName: "留坝县"
			}, {
				cantCode: "610730",
				cantName: "佛坪县"
			}, {
				cantCode: "610731",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610800",
			cantName: "榆林市",
			children: [{
				cantCode: "610802",
				cantName: "榆阳区"
			}, {
				cantCode: "610821",
				cantName: "神木县"
			}, {
				cantCode: "610822",
				cantName: "府谷县"
			}, {
				cantCode: "610823",
				cantName: "横山县"
			}, {
				cantCode: "610824",
				cantName: "靖边县"
			}, {
				cantCode: "610825",
				cantName: "定边县"
			}, {
				cantCode: "610826",
				cantName: "绥德县"
			}, {
				cantCode: "610827",
				cantName: "米脂县"
			}, {
				cantCode: "610828",
				cantName: "佳县"
			}, {
				cantCode: "610829",
				cantName: "吴堡县"
			}, {
				cantCode: "610830",
				cantName: "清涧县"
			}, {
				cantCode: "610831",
				cantName: "子洲县"
			}, {
				cantCode: "610832",
				cantName: "其它区"
			}]
		}, {
			cantCode: "610900",
			cantName: "安康市",
			children: [{
				cantCode: "610902",
				cantName: "汉滨区"
			}, {
				cantCode: "610921",
				cantName: "汉阴县"
			}, {
				cantCode: "610922",
				cantName: "石泉县"
			}, {
				cantCode: "610923",
				cantName: "宁陕县"
			}, {
				cantCode: "610924",
				cantName: "紫阳县"
			}, {
				cantCode: "610925",
				cantName: "岚皋县"
			}, {
				cantCode: "610926",
				cantName: "平利县"
			}, {
				cantCode: "610927",
				cantName: "镇坪县"
			}, {
				cantCode: "610928",
				cantName: "旬阳县"
			}, {
				cantCode: "610929",
				cantName: "白河县"
			}, {
				cantCode: "610930",
				cantName: "其它区"
			}]
		}, {
			cantCode: "611000",
			cantName: "商洛市",
			children: [{
				cantCode: "611002",
				cantName: "商州区"
			}, {
				cantCode: "611021",
				cantName: "洛南县"
			}, {
				cantCode: "611022",
				cantName: "丹凤县"
			}, {
				cantCode: "611023",
				cantName: "商南县"
			}, {
				cantCode: "611024",
				cantName: "山阳县"
			}, {
				cantCode: "611025",
				cantName: "镇安县"
			}, {
				cantCode: "611026",
				cantName: "柞水县"
			}, {
				cantCode: "611027",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '620000',
		cantName: '甘肃省',
		children: [{
			cantCode: "620100",
			cantName: "兰州市",
			children: [{
				cantCode: "620102",
				cantName: "城关区"
			}, {
				cantCode: "620103",
				cantName: "七里河区"
			}, {
				cantCode: "620104",
				cantName: "西固区"
			}, {
				cantCode: "620105",
				cantName: "安宁区"
			}, {
				cantCode: "620111",
				cantName: "红古区"
			}, {
				cantCode: "620121",
				cantName: "永登县"
			}, {
				cantCode: "620122",
				cantName: "皋兰县"
			}, {
				cantCode: "620123",
				cantName: "榆中县"
			}, {
				cantCode: "620124",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620200",
			cantName: "嘉峪关市",
			children: []
		}, {
			cantCode: "620300",
			cantName: "金昌市",
			children: [{
				cantCode: "620302",
				cantName: "金川区"
			}, {
				cantCode: "620321",
				cantName: "永昌县"
			}, {
				cantCode: "620322",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620400",
			cantName: "白银市",
			children: [{
				cantCode: "620402",
				cantName: "白银区"
			}, {
				cantCode: "620403",
				cantName: "平川区"
			}, {
				cantCode: "620421",
				cantName: "靖远县"
			}, {
				cantCode: "620422",
				cantName: "会宁县"
			}, {
				cantCode: "620423",
				cantName: "景泰县"
			}, {
				cantCode: "620424",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620500",
			cantName: "天水市",
			children: [{
				cantCode: "620502",
				cantName: "秦州区"
			}, {
				cantCode: "620503",
				cantName: "麦积区"
			}, {
				cantCode: "620521",
				cantName: "清水县"
			}, {
				cantCode: "620522",
				cantName: "秦安县"
			}, {
				cantCode: "620523",
				cantName: "甘谷县"
			}, {
				cantCode: "620524",
				cantName: "武山县"
			}, {
				cantCode: "620525",
				cantName: "张家川回族自治县"
			}, {
				cantCode: "620526",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620600",
			cantName: "武威市",
			children: [{
				cantCode: "620602",
				cantName: "凉州区"
			}, {
				cantCode: "620621",
				cantName: "民勤县"
			}, {
				cantCode: "620622",
				cantName: "古浪县"
			}, {
				cantCode: "620623",
				cantName: "天祝藏族自治县"
			}, {
				cantCode: "620624",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620700",
			cantName: "张掖市",
			children: [{
				cantCode: "620702",
				cantName: "甘州区"
			}, {
				cantCode: "620721",
				cantName: "肃南裕固族自治县"
			}, {
				cantCode: "620722",
				cantName: "民乐县"
			}, {
				cantCode: "620723",
				cantName: "临泽县"
			}, {
				cantCode: "620724",
				cantName: "高台县"
			}, {
				cantCode: "620725",
				cantName: "山丹县"
			}, {
				cantCode: "620726",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620800",
			cantName: "平凉市",
			children: [{
				cantCode: "620802",
				cantName: "崆峒区"
			}, {
				cantCode: "620821",
				cantName: "泾川县"
			}, {
				cantCode: "620822",
				cantName: "灵台县"
			}, {
				cantCode: "620823",
				cantName: "崇信县"
			}, {
				cantCode: "620824",
				cantName: "华亭县"
			}, {
				cantCode: "620825",
				cantName: "庄浪县"
			}, {
				cantCode: "620826",
				cantName: "静宁县"
			}, {
				cantCode: "620827",
				cantName: "其它区"
			}]
		}, {
			cantCode: "620900",
			cantName: "酒泉市",
			children: [{
				cantCode: "620902",
				cantName: "肃州区"
			}, {
				cantCode: "620921",
				cantName: "金塔县"
			}, {
				cantCode: "620922",
				cantName: "安西县"
			}, {
				cantCode: "620923",
				cantName: "肃北蒙古族自治县"
			}, {
				cantCode: "620924",
				cantName: "阿克塞哈萨克族自治县"
			}, {
				cantCode: "620981",
				cantName: "玉门市"
			}, {
				cantCode: "620982",
				cantName: "敦煌市"
			}, {
				cantCode: "620983",
				cantName: "其它区"
			}]
		}, {
			cantCode: "621000",
			cantName: "庆阳市",
			children: [{
				cantCode: "621002",
				cantName: "西峰区"
			}, {
				cantCode: "621021",
				cantName: "庆城县"
			}, {
				cantCode: "621022",
				cantName: "环县"
			}, {
				cantCode: "621023",
				cantName: "华池县"
			}, {
				cantCode: "621024",
				cantName: "合水县"
			}, {
				cantCode: "621025",
				cantName: "正宁县"
			}, {
				cantCode: "621026",
				cantName: "宁县"
			}, {
				cantCode: "621027",
				cantName: "镇原县"
			}, {
				cantCode: "621028",
				cantName: "其它区"
			}]
		}, {
			cantCode: "621100",
			cantName: "定西市",
			children: [{
				cantCode: "621102",
				cantName: "安定区"
			}, {
				cantCode: "621121",
				cantName: "通渭县"
			}, {
				cantCode: "621122",
				cantName: "陇西县"
			}, {
				cantCode: "621123",
				cantName: "渭源县"
			}, {
				cantCode: "621124",
				cantName: "临洮县"
			}, {
				cantCode: "621125",
				cantName: "漳县"
			}, {
				cantCode: "621126",
				cantName: "岷县"
			}, {
				cantCode: "621127",
				cantName: "其它区"
			}]
		}, {
			cantCode: "621200",
			cantName: "陇南市",
			children: [{
				cantCode: "621202",
				cantName: "武都区"
			}, {
				cantCode: "621221",
				cantName: "成县"
			}, {
				cantCode: "621222",
				cantName: "文县"
			}, {
				cantCode: "621223",
				cantName: "宕昌县"
			}, {
				cantCode: "621224",
				cantName: "康县"
			}, {
				cantCode: "621225",
				cantName: "西和县"
			}, {
				cantCode: "621226",
				cantName: "礼县"
			}, {
				cantCode: "621227",
				cantName: "徽县"
			}, {
				cantCode: "621228",
				cantName: "两当县"
			}, {
				cantCode: "621229",
				cantName: "其它区"
			}]
		}, {
			cantCode: "622900",
			cantName: "临夏回族自治州",
			children: [{
				cantCode: "622901",
				cantName: "临夏市"
			}, {
				cantCode: "622921",
				cantName: "临夏县"
			}, {
				cantCode: "622922",
				cantName: "康乐县"
			}, {
				cantCode: "622923",
				cantName: "永靖县"
			}, {
				cantCode: "622924",
				cantName: "广河县"
			}, {
				cantCode: "622925",
				cantName: "和政县"
			}, {
				cantCode: "622926",
				cantName: "东乡族自治县"
			}, {
				cantCode: "622927",
				cantName: "积石山保安族东乡族撒拉族自治县"
			}, {
				cantCode: "622928",
				cantName: "其它区"
			}]
		}, {
			cantCode: "623000",
			cantName: "甘南藏族自治州",
			children: [{
				cantCode: "623001",
				cantName: "合作市"
			}, {
				cantCode: "623021",
				cantName: "临潭县"
			}, {
				cantCode: "623022",
				cantName: "卓尼县"
			}, {
				cantCode: "623023",
				cantName: "舟曲县"
			}, {
				cantCode: "623024",
				cantName: "迭部县"
			}, {
				cantCode: "623025",
				cantName: "玛曲县"
			}, {
				cantCode: "623026",
				cantName: "碌曲县"
			}, {
				cantCode: "623027",
				cantName: "夏河县"
			}, {
				cantCode: "623028",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '630000',
		cantName: '青海省',
		children: [{
			cantCode: "630100",
			cantName: "西宁市",
			children: [{
				cantCode: "630102",
				cantName: "城东区"
			}, {
				cantCode: "630103",
				cantName: "城中区"
			}, {
				cantCode: "630104",
				cantName: "城西区"
			}, {
				cantCode: "630105",
				cantName: "城北区"
			}, {
				cantCode: "630121",
				cantName: "大通回族土族自治县"
			}, {
				cantCode: "630122",
				cantName: "湟中县"
			}, {
				cantCode: "630123",
				cantName: "湟源县"
			}, {
				cantCode: "630124",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632100",
			cantName: "海东地区",
			children: [{
				cantCode: "632121",
				cantName: "平安县"
			}, {
				cantCode: "632122",
				cantName: "民和回族土族自治县"
			}, {
				cantCode: "632123",
				cantName: "乐都县"
			}, {
				cantCode: "632126",
				cantName: "互助土族自治县"
			}, {
				cantCode: "632127",
				cantName: "化隆回族自治县"
			}, {
				cantCode: "632128",
				cantName: "循化撒拉族自治县"
			}, {
				cantCode: "632129",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632200",
			cantName: "海北藏族自治州",
			children: [{
				cantCode: "632221",
				cantName: "门源回族自治县"
			}, {
				cantCode: "632222",
				cantName: "祁连县"
			}, {
				cantCode: "632223",
				cantName: "海晏县"
			}, {
				cantCode: "632224",
				cantName: "刚察县"
			}, {
				cantCode: "632225",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632300",
			cantName: "黄南藏族自治州",
			children: [{
				cantCode: "632321",
				cantName: "同仁县"
			}, {
				cantCode: "632322",
				cantName: "尖扎县"
			}, {
				cantCode: "632323",
				cantName: "泽库县"
			}, {
				cantCode: "632324",
				cantName: "河南蒙古族自治县"
			}, {
				cantCode: "632325",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632500",
			cantName: "海南藏族自治州",
			children: [{
				cantCode: "632521",
				cantName: "共和县"
			}, {
				cantCode: "632522",
				cantName: "同德县"
			}, {
				cantCode: "632523",
				cantName: "贵德县"
			}, {
				cantCode: "632524",
				cantName: "兴海县"
			}, {
				cantCode: "632525",
				cantName: "贵南县"
			}, {
				cantCode: "632526",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632600",
			cantName: "果洛藏族自治州",
			children: [{
				cantCode: "632621",
				cantName: "玛沁县"
			}, {
				cantCode: "632622",
				cantName: "班玛县"
			}, {
				cantCode: "632623",
				cantName: "甘德县"
			}, {
				cantCode: "632624",
				cantName: "达日县"
			}, {
				cantCode: "632625",
				cantName: "久治县"
			}, {
				cantCode: "632626",
				cantName: "玛多县"
			}, {
				cantCode: "632627",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632700",
			cantName: "玉树藏族自治州",
			children: [{
				cantCode: "632721",
				cantName: "玉树县"
			}, {
				cantCode: "632722",
				cantName: "杂多县"
			}, {
				cantCode: "632723",
				cantName: "称多县"
			}, {
				cantCode: "632724",
				cantName: "治多县"
			}, {
				cantCode: "632725",
				cantName: "囊谦县"
			}, {
				cantCode: "632726",
				cantName: "曲麻莱县"
			}, {
				cantCode: "632727",
				cantName: "其它区"
			}]
		}, {
			cantCode: "632800",
			cantName: "海西蒙古族藏族自治州",
			children: [{
				cantCode: "632801",
				cantName: "格尔木市"
			}, {
				cantCode: "632802",
				cantName: "德令哈市"
			}, {
				cantCode: "632821",
				cantName: "乌兰县"
			}, {
				cantCode: "632822",
				cantName: "都兰县"
			}, {
				cantCode: "632823",
				cantName: "天峻县"
			}, {
				cantCode: "632824",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '640000',
		cantName: '宁夏',
		children: [{
			cantCode: "640100",
			cantName: "银川市",
			children: [{
				cantCode: "640104",
				cantName: "兴庆区"
			}, {
				cantCode: "640105",
				cantName: "西夏区"
			}, {
				cantCode: "640106",
				cantName: "金凤区"
			}, {
				cantCode: "640121",
				cantName: "永宁县"
			}, {
				cantCode: "640122",
				cantName: "贺兰县"
			}, {
				cantCode: "640181",
				cantName: "灵武市"
			}, {
				cantCode: "640182",
				cantName: "其它区"
			}]
		}, {
			cantCode: "640200",
			cantName: "石嘴山市",
			children: [{
				cantCode: "640202",
				cantName: "大武口区"
			}, {
				cantCode: "640205",
				cantName: "惠农区"
			}, {
				cantCode: "640221",
				cantName: "平罗县"
			}, {
				cantCode: "640222",
				cantName: "其它区"
			}]
		}, {
			cantCode: "640300",
			cantName: "吴忠市",
			children: [{
				cantCode: "640302",
				cantName: "利通区"
			}, {
				cantCode: "640303",
				cantName: "红寺堡区"
			}, {
				cantCode: "640323",
				cantName: "盐池县"
			}, {
				cantCode: "640324",
				cantName: "同心县"
			}, {
				cantCode: "640381",
				cantName: "青铜峡市"
			}, {
				cantCode: "640382",
				cantName: "其它区"
			}]
		}, {
			cantCode: "640400",
			cantName: "固原市",
			children: [{
				cantCode: "640402",
				cantName: "原州区"
			}, {
				cantCode: "640422",
				cantName: "西吉县"
			}, {
				cantCode: "640423",
				cantName: "隆德县"
			}, {
				cantCode: "640424",
				cantName: "泾源县"
			}, {
				cantCode: "640425",
				cantName: "彭阳县"
			}, {
				cantCode: "640426",
				cantName: "其它区"
			}]
		}, {
			cantCode: "640500",
			cantName: "中卫市",
			children: [{
				cantCode: "640502",
				cantName: "沙坡头区"
			}, {
				cantCode: "640521",
				cantName: "中宁县"
			}, {
				cantCode: "640522",
				cantName: "海原县"
			}, {
				cantCode: "640523",
				cantName: "其它区"
			}]
		}]
	}, {
		cantCode: '650000',
		cantName: '新疆',
		children: [{
			cantCode: "650100",
			cantName: "乌鲁木齐市",
			children: [{
				cantCode: "650102",
				cantName: "天山区"
			}, {
				cantCode: "650103",
				cantName: "沙依巴克区"
			}, {
				cantCode: "650104",
				cantName: "新市区"
			}, {
				cantCode: "650105",
				cantName: "水磨沟区"
			}, {
				cantCode: "650106",
				cantName: "头屯河区"
			}, {
				cantCode: "650107",
				cantName: "达坂城区"
			}, {
				cantCode: "650108",
				cantName: "东山区"
			}, {
				cantCode: "650109",
				cantName: "米东区"
			}, {
				cantCode: "650121",
				cantName: "乌鲁木齐县"
			}, {
				cantCode: "650122",
				cantName: "其它区"
			}]
		}, {
			cantCode: "650200",
			cantName: "克拉玛依市",
			children: [{
				cantCode: "650202",
				cantName: "独山子区"
			}, {
				cantCode: "650203",
				cantName: "克拉玛依区"
			}, {
				cantCode: "650204",
				cantName: "白碱滩区"
			}, {
				cantCode: "650205",
				cantName: "乌尔禾区"
			}, {
				cantCode: "650206",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652100",
			cantName: "吐鲁番地区",
			children: [{
				cantCode: "652101",
				cantName: "吐鲁番市"
			}, {
				cantCode: "652122",
				cantName: "鄯善县"
			}, {
				cantCode: "652123",
				cantName: "托克逊县"
			}, {
				cantCode: "652124",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652200",
			cantName: "哈密地区",
			children: [{
				cantCode: "652201",
				cantName: "哈密市"
			}, {
				cantCode: "652222",
				cantName: "巴里坤哈萨克自治县"
			}, {
				cantCode: "652223",
				cantName: "伊吾县"
			}, {
				cantCode: "652224",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652300",
			cantName: "昌吉回族自治州",
			children: [{
				cantCode: "652301",
				cantName: "昌吉市"
			}, {
				cantCode: "652302",
				cantName: "阜康市"
			}, {
				cantCode: "652303",
				cantName: "米泉市"
			}, {
				cantCode: "652323",
				cantName: "呼图壁县"
			}, {
				cantCode: "652324",
				cantName: "玛纳斯县"
			}, {
				cantCode: "652325",
				cantName: "奇台县"
			}, {
				cantCode: "652327",
				cantName: "吉木萨尔县"
			}, {
				cantCode: "652328",
				cantName: "木垒哈萨克自治县"
			}, {
				cantCode: "652329",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652700",
			cantName: "博尔塔拉蒙古自治州",
			children: [{
				cantCode: "652701",
				cantName: "博乐市"
			}, {
				cantCode: "652722",
				cantName: "精河县"
			}, {
				cantCode: "652723",
				cantName: "温泉县"
			}, {
				cantCode: "652724",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652800",
			cantName: "巴音郭楞蒙古自治州",
			children: [{
				cantCode: "652801",
				cantName: "库尔勒市"
			}, {
				cantCode: "652822",
				cantName: "轮台县"
			}, {
				cantCode: "652823",
				cantName: "尉犁县"
			}, {
				cantCode: "652824",
				cantName: "若羌县"
			}, {
				cantCode: "652825",
				cantName: "且末县"
			}, {
				cantCode: "652826",
				cantName: "焉耆回族自治县"
			}, {
				cantCode: "652827",
				cantName: "和静县"
			}, {
				cantCode: "652828",
				cantName: "和硕县"
			}, {
				cantCode: "652829",
				cantName: "博湖县"
			}, {
				cantCode: "652830",
				cantName: "其它区"
			}]
		}, {
			cantCode: "652900",
			cantName: "阿克苏地区",
			children: [{
				cantCode: "652901",
				cantName: "阿克苏市"
			}, {
				cantCode: "652922",
				cantName: "温宿县"
			}, {
				cantCode: "652923",
				cantName: "库车县"
			}, {
				cantCode: "652924",
				cantName: "沙雅县"
			}, {
				cantCode: "652925",
				cantName: "新和县"
			}, {
				cantCode: "652926",
				cantName: "拜城县"
			}, {
				cantCode: "652927",
				cantName: "乌什县"
			}, {
				cantCode: "652928",
				cantName: "阿瓦提县"
			}, {
				cantCode: "652929",
				cantName: "柯坪县"
			}, {
				cantCode: "652930",
				cantName: "其它区"
			}]
		}, {
			cantCode: "653000",
			cantName: "克孜勒苏柯尔克孜自治州",
			children: [{
				cantCode: "653001",
				cantName: "阿图什市"
			}, {
				cantCode: "653022",
				cantName: "阿克陶县"
			}, {
				cantCode: "653023",
				cantName: "阿合奇县"
			}, {
				cantCode: "653024",
				cantName: "乌恰县"
			}, {
				cantCode: "653025",
				cantName: "其它区"
			}]
		}, {
			cantCode: "653100",
			cantName: "喀什地区",
			children: [{
				cantCode: "653101",
				cantName: "喀什市"
			}, {
				cantCode: "653121",
				cantName: "疏附县"
			}, {
				cantCode: "653122",
				cantName: "疏勒县"
			}, {
				cantCode: "653123",
				cantName: "英吉沙县"
			}, {
				cantCode: "653124",
				cantName: "泽普县"
			}, {
				cantCode: "653125",
				cantName: "莎车县"
			}, {
				cantCode: "653126",
				cantName: "叶城县"
			}, {
				cantCode: "653127",
				cantName: "麦盖提县"
			}, {
				cantCode: "653128",
				cantName: "岳普湖县"
			}, {
				cantCode: "653129",
				cantName: "伽师县"
			}, {
				cantCode: "653130",
				cantName: "巴楚县"
			}, {
				cantCode: "653131",
				cantName: "塔什库尔干塔吉克自治县"
			}, {
				cantCode: "653132",
				cantName: "其它区"
			}]
		}, {
			cantCode: "653200",
			cantName: "和田地区",
			children: [{
				cantCode: "653201",
				cantName: "和田市"
			}, {
				cantCode: "653221",
				cantName: "和田县"
			}, {
				cantCode: "653222",
				cantName: "墨玉县"
			}, {
				cantCode: "653223",
				cantName: "皮山县"
			}, {
				cantCode: "653224",
				cantName: "洛浦县"
			}, {
				cantCode: "653225",
				cantName: "策勒县"
			}, {
				cantCode: "653226",
				cantName: "于田县"
			}, {
				cantCode: "653227",
				cantName: "民丰县"
			}, {
				cantCode: "653228",
				cantName: "其它区"
			}]
		}, {
			cantCode: "654000",
			cantName: "伊犁哈萨克自治州",
			children: [{
				cantCode: "654002",
				cantName: "伊宁市"
			}, {
				cantCode: "654003",
				cantName: "奎屯市"
			}, {
				cantCode: "654021",
				cantName: "伊宁县"
			}, {
				cantCode: "654022",
				cantName: "察布查尔锡伯自治县"
			}, {
				cantCode: "654023",
				cantName: "霍城县"
			}, {
				cantCode: "654024",
				cantName: "巩留县"
			}, {
				cantCode: "654025",
				cantName: "新源县"
			}, {
				cantCode: "654026",
				cantName: "昭苏县"
			}, {
				cantCode: "654027",
				cantName: "特克斯县"
			}, {
				cantCode: "654028",
				cantName: "尼勒克县"
			}, {
				cantCode: "654029",
				cantName: "其它区"
			}]
		}, {
			cantCode: "654200",
			cantName: "塔城地区",
			children: [{
				cantCode: "654201",
				cantName: "塔城市"
			}, {
				cantCode: "654202",
				cantName: "乌苏市"
			}, {
				cantCode: "654221",
				cantName: "额敏县"
			}, {
				cantCode: "654223",
				cantName: "沙湾县"
			}, {
				cantCode: "654224",
				cantName: "托里县"
			}, {
				cantCode: "654225",
				cantName: "裕民县"
			}, {
				cantCode: "654226",
				cantName: "和布克赛尔蒙古自治县"
			}, {
				cantCode: "654227",
				cantName: "其它区"
			}]
		}, {
			cantCode: "654300",
			cantName: "阿勒泰地区",
			children: [{
				cantCode: "654301",
				cantName: "阿勒泰市"
			}, {
				cantCode: "654321",
				cantName: "布尔津县"
			}, {
				cantCode: "654322",
				cantName: "富蕴县"
			}, {
				cantCode: "654323",
				cantName: "福海县"
			}, {
				cantCode: "654324",
				cantName: "哈巴河县"
			}, {
				cantCode: "654325",
				cantName: "青河县"
			}, {
				cantCode: "654326",
				cantName: "吉木乃县"
			}, {
				cantCode: "654327",
				cantName: "其它区"
			}]
		}, {
			cantCode: "659001",
			cantName: "石河子市"
		}, {
			cantCode: "659002",
			cantName: "阿拉尔市"
		}, {
			cantCode: "659003",
			cantName: "图木舒克市"
		}, {
			cantCode: "659004",
			cantName: "五家渠市"
		}]
	}, {
		cantCode: '710000',
		cantName: '台湾省',
		children: [{
			cantCode: "710100",
			cantName: "台北市",
			children: [{
				cantCode: "710101",
				cantName: "中正区"
			}, {
				cantCode: "710102",
				cantName: "大同区"
			}, {
				cantCode: "710103",
				cantName: "中山区"
			}, {
				cantCode: "710104",
				cantName: "松山区"
			}, {
				cantCode: "710105",
				cantName: "大安区"
			}, {
				cantCode: "710106",
				cantName: "万华区"
			}, {
				cantCode: "710107",
				cantName: "信义区"
			}, {
				cantCode: "710108",
				cantName: "士林区"
			}, {
				cantCode: "710109",
				cantName: "北投区"
			}, {
				cantCode: "710110",
				cantName: "内湖区"
			}, {
				cantCode: "710111",
				cantName: "南港区"
			}, {
				cantCode: "710112",
				cantName: "文山区"
			}, {
				cantCode: "710113",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710200",
			cantName: "高雄市",
			children: [{
				cantCode: "710201",
				cantName: "新兴区"
			}, {
				cantCode: "710202",
				cantName: "前金区"
			}, {
				cantCode: "710203",
				cantName: "芩雅区"
			}, {
				cantCode: "710204",
				cantName: "盐埕区"
			}, {
				cantCode: "710205",
				cantName: "鼓山区"
			}, {
				cantCode: "710206",
				cantName: "旗津区"
			}, {
				cantCode: "710207",
				cantName: "前镇区"
			}, {
				cantCode: "710208",
				cantName: "三民区"
			}, {
				cantCode: "710209",
				cantName: "左营区"
			}, {
				cantCode: "710210",
				cantName: "楠梓区"
			}, {
				cantCode: "710211",
				cantName: "小港区"
			}, {
				cantCode: "710212",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710300",
			cantName: "台南市",
			children: [{
				cantCode: "710301",
				cantName: "中西区"
			}, {
				cantCode: "710302",
				cantName: "东区"
			}, {
				cantCode: "710303",
				cantName: "南区"
			}, {
				cantCode: "710304",
				cantName: "北区"
			}, {
				cantCode: "710305",
				cantName: "安平区"
			}, {
				cantCode: "710306",
				cantName: "安南区"
			}, {
				cantCode: "710307",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710400",
			cantName: "台中市",
			children: [{
				cantCode: "710401",
				cantName: "中区"
			}, {
				cantCode: "710402",
				cantName: "东区"
			}, {
				cantCode: "710403",
				cantName: "南区"
			}, {
				cantCode: "710404",
				cantName: "西区"
			}, {
				cantCode: "710405",
				cantName: "北区"
			}, {
				cantCode: "710406",
				cantName: "北屯区"
			}, {
				cantCode: "710407",
				cantName: "西屯区"
			}, {
				cantCode: "710408",
				cantName: "南屯区"
			}, {
				cantCode: "710409",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710500",
			cantName: "金门县"
		}, {
			cantCode: "710600",
			cantName: "南投县"
		}, {
			cantCode: "710700",
			cantName: "基隆市",
			children: [{
				cantCode: "710701",
				cantName: "仁爱区"
			}, {
				cantCode: "710702",
				cantName: "信义区"
			}, {
				cantCode: "710703",
				cantName: "中正区"
			}, {
				cantCode: "710704",
				cantName: "中山区"
			}, {
				cantCode: "710705",
				cantName: "安乐区"
			}, {
				cantCode: "710706",
				cantName: "暖暖区"
			}, {
				cantCode: "710707",
				cantName: "七堵区"
			}, {
				cantCode: "710708",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710800",
			cantName: "新竹市",
			children: [{
				cantCode: "710801",
				cantName: "东区"
			}, {
				cantCode: "710802",
				cantName: "北区"
			}, {
				cantCode: "710803",
				cantName: "香山区"
			}, {
				cantCode: "710804",
				cantName: "其它区"
			}]
		}, {
			cantCode: "710900",
			cantName: "嘉义市",
			children: [{
				cantCode: "710901",
				cantName: "东区"
			}, {
				cantCode: "710902",
				cantName: "西区"
			}, {
				cantCode: "710903",
				cantName: "其它区"
			}]
		}, {
			cantCode: "711100",
			cantName: "新北市"
		}, {
			cantCode: "711200",
			cantName: "宜兰县"
		}, {
			cantCode: "711300",
			cantName: "新竹县"
		}, {
			cantCode: "711400",
			cantName: "桃园县"
		}, {
			cantCode: "711500",
			cantName: "苗栗县"
		}, {
			cantCode: "711700",
			cantName: "彰化县"
		}, {
			cantCode: "711900",
			cantName: "嘉义县"
		}, {
			cantCode: "712100",
			cantName: "云林县"
		}, {
			cantCode: "712400",
			cantName: "屏东县"
		}, {
			cantCode: "712500",
			cantName: "台东县"
		}, {
			cantCode: "712600",
			cantName: "花莲县"
		}, {
			cantCode: "712700",
			cantName: "澎湖县"
		}]
	}, {
		cantCode: '810000',
		cantName: '香港',
		children: [{
			cantCode: "810100",
			cantName: "香港岛",
			children: [{
				cantCode: "810101",
				cantName: "中西区"
			}, {
				cantCode: "810102",
				cantName: "湾仔"
			}, {
				cantCode: "810103",
				cantName: "东区"
			}, {
				cantCode: "810104",
				cantName: "南区"
			}]
		}, {
			cantCode: "810200",
			cantName: "九龙",
			children: [{
				cantCode: "810201",
				cantName: "九龙城区"
			}, {
				cantCode: "810202",
				cantName: "油尖旺区"
			}, {
				cantCode: "810203",
				cantName: "深水埗区"
			}, {
				cantCode: "810204",
				cantName: "黄大仙区"
			}, {
				cantCode: "810205",
				cantName: "观塘区"
			}]
		}, {
			cantCode: "810300",
			cantName: "新界",
			children: [{
				cantCode: "810301",
				cantName: "北区"
			}, {
				cantCode: "810302",
				cantName: "大埔区"
			}, {
				cantCode: "810303",
				cantName: "沙田区"
			}, {
				cantCode: "810304",
				cantName: "西贡区"
			}, {
				cantCode: "810305",
				cantName: "元朗区"
			}, {
				cantCode: "810306",
				cantName: "屯门区"
			}, {
				cantCode: "810307",
				cantName: "荃湾区"
			}, {
				cantCode: "810308",
				cantName: "葵青区"
			}, {
				cantCode: "810309",
				cantName: "离岛区"
			}]
		}]
	}, {
		cantCode: '820000',
		cantName: '澳门',
		children: [{
			cantCode: "820100",
			cantName: "澳门半岛"
		}, {
			cantCode: "820200",
			cantName: "离岛"
		}]
	}, {
		cantCode: '990000',
		cantName: '海外',
		children: [{
			cantCode: "990100",
			cantName: "海外"
		}]
	}]
}
	

