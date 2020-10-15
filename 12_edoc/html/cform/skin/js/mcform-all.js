/*!
 * inspur-gcloud-cform-ui - JS for Debug
 * author sunzhengjun   sunzhengjun@inspur.com  
 * @licence inspur-gcloud-cform-ui - v2.0.0 * */
/*!
	Autosize v1.18.1 - 2013-11-05
	Automatically adjust textarea height based on user input.
	(c) 2013 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-100000px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u,null),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10);}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px";}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t);}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r;}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollHeight,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u));}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r());},parseInt(i.resizeDelay,10));}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r();}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r();}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize");}),r());})):this;};})(window.jQuery||window.$);
/**
 * 运行时表单静态类
 * 
 */
(function($) {
	if (typeof CForm == "undefined") {
		CForm = {};
	}

	/**
	 * 注册事件
	 */
	CForm.on = function(eventName, func) {
		$(CForm).on.apply($(CForm), arguments);
	};
	
	/**
	 * 触发事件
	 */
	CForm.trigger = function(eventName, args) {
		$(CForm).trigger.apply($(CForm), arguments);
	};
	
	/**
	 * 获得页面上所有的表单数据
	 * 
	 * @returns CForm.List，每一项为一个CForm.Map
	 */
	CForm.getAllFormData = function() {
		var list = new CForm.List();

		$.each($("[cf_elementType=form]"), function() {
			var map = CForm.getFormData(this);
			map.put("formId", $(this).attr("id"));

			list.add(map);
		});

		return list;
	};

	/**
	 * 获得指定表单数据
	 * 
	 * @param form
	 *            表单
	 * @returns CForm.Map key为fieldId,value为fieldValue
	 *          若表单中含有动态行，则key为动态行定义ID，value为CForm.List
	 */
	CForm.getFormData = function(form) {
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		if (!$form.length) {
			alert("请指定要获得数据的表单!");
			return;
		}
		var map = new CForm.Map();

		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelId]");
		// 动态表格
		var $dynTables = $form.find('.cfDynTable[cf_modelId]');
		// 具有modelItemId的所有域
		var fields = $form.find("[cf_modelItemId]");

		// 组装主表单数据
		$.each(fields, function(i, field) {
			if ($dynRows.find(field).length || $dynTables.find(field).length
					|| $(field).closest("[cf_elementType=form]").attr("id")!=$form.attr("id")) {
				return;
			}
			
			var fieldValue = CForm.getFieldValue(field);
			// 若已有数据，则用","间隔各个数据
			var preFieldValue = map.get(field.id);
			if (preFieldValue) {
				fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
			}
			
			map.put(field.id, fieldValue);
		});

		// 组装动态行数据
		$.each($dynRows, function(i, dynRow) {
			if($(dynRow).closest("[cf_elementType=form]").attr("id") != $form.attr("id"))
				return;
			// 存放动态行的各行数据
			var recordsLst = new CForm.List();
			// 存放动态行的数据，以及是否分页等信息
			var dynDataMap = new CForm.Map();
			//分页信息
			var pageInfo = new CForm.Map();
			
			var isPaging = $(dynRow).attr("cf_isPaging");
			if(isPaging == "true"){
				// 获取当前页数
				var start = $(dynRow).find(".pageBarContainer .curPageNum").val();
				// 每页显示条数
				var limit = $(dynRow).find(".pageBarContainer .pageSize option:selected").val();
				pageInfo.put("isPaging","true");
				pageInfo.put("start",start);
				pageInfo.put("limit",limit);
			}else{
				pageInfo.put("isPaging","false");
			}
			
			// 查找除模板行外，所有有状态的行
			var $trs = $('tbody tr[cf_recordState][cf_recordState!=temp]', dynRow);
			
			$.each($trs, function(j, tr) {
				// 数据状态
				var recordState = $(tr).attr("cf_recordState");
				// 行号
				var subTblNum = $(tr).find("td:first label").text();
				var record = new CForm.Map();
				record.put("cf_recordState",recordState);
				record.put("SUB_TBL_NUM",subTblNum);
				var $fields = $(tr).find('[cf_modelItemId]');
				
				$.each($fields, function(k, field) {
					var fieldValue = CForm.getFieldValue(field);
					
					// 若已有数据，则用","间隔各个数据
					var preFieldValue = record.get(field.id);
					if (preFieldValue) {
						fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
					}
					record.put(field.id, fieldValue);
				});

				recordsLst.add(record);
			});
			dynDataMap.put("pageInfo",pageInfo);
			dynDataMap.put("zoneData",recordsLst);
			
			map.put(dynRow.id, dynDataMap);
		});

		// 组装动态表格数据
		$.each($dynTables, function(i, dynTable) {
			if($(dynTable).closest("[cf_elementType=form]").attr("id") != $form.attr("id"))
				return;
			// 存放动态表格的各表格数据
			var recordsLst = new CForm.List();
			
			var datas = map.get(dynTable.id);
			if (datas && datas.size()) {
				recordsLst = datas;
			}
			
			var $table = $('table', dynTable);
			$.each($table, function(j, table) {
				
				var record = new CForm.Map();
				
				var $fields = $(table).find('[cf_modelItemId]');
				
				$.each($fields, function(k, field) {
					var fieldValue = CForm.getFieldValue(field);
					
					// 若已有数据，则用","间隔各个数据
					var preFieldValue = rowData.get(field.id);
					if (preFieldValue) {
						fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
					}
					record.put(field.id, fieldValue);
				});
				
				recordsLst.add(rowData);
			});
			
			var dynTableDataMap = new CForm.Map();
			dynTableDataMap.put("isPaging","false");
			dynTableDataMap.put("zoneData",dynTableRows);
			
			map.put(dynTable.id, dynTableDataMap);
		});

		return map;
	};
	
	/**
	 * 获取表单组数据
	 * @returns CForm.Map key为fieldId,value为fieldValue
	 *          若表单中含有动态行，则key为动态行定义ID，value为CForm.List
	 */
	CForm.getFormsData = function() {
		var forms = $("[cf_elementType=form]");
		var formsMap = new CForm.Map();
		var mainFormMap = new CForm.Map();
		var subFormsMap = new CForm.Map();
		
		// 组装表单组的主表单数据
		var mainFormData = CForm.getFormData(forms.eq(0));
		if(window.formDataId){
			mainFormData.put("formDataId", formDataId);
		}
		mainFormMap.put(forms.eq(0).attr("id"),mainFormData);
		formsMap.put("M",mainFormMap);
		
		// 组装表单组的子表单数据
		for(var i = 1;i<forms.length;i++){
			var subFormData = CForm.getFormData(forms.eq(i));
			subFormsMap.put(forms.eq(i).attr("id"),subFormData);
		}
		formsMap.put("S",subFormsMap);
		
		return formsMap
	}

	/**
	 * 控制变量：标识表单是否已初始化，用于控制是否触发子表单数据加载完成事件
	 * 只在首次调用CForm.setFormData接口初始化表单时触发事件
	 */
	CForm.isInitialized = false;
	// 有表单组的情况下，setFormData会被执行多次，mainFormNum用于记录setFormData被执行的次数
	CForm.mainFormNum = 0;
	// 记录setSubFormData被执行的次数
	CForm.subFormNum = 0;
	
	/**
	 * 向指定的表单里设置实际数据
	 * 
	 * @param form
	 *            表单
	 * @param data
	 *            数据
	 * @param byAttr
	 *            赋值属性
	 */
	CForm.setFormData = function(form, data, byAttr) {
		CForm.mainFormNum++;
		var type = byAttr ? 'cf_alias' : 'cf_modelId';
		byAttr = byAttr ? byAttr : 'cf_modelItemId';
		
		var $form = $(form);
		
		// 动态行Map，缓存动态行
		var dynRowMap = new CForm.Map();
		var $dynRows = $form.find(".cfDynRow");
		$.each($dynRows, function() {
			var typeValue = $(this).attr(type);
			dynRowMap.put(typeValue, $(this));
			// 如果当前主表单存在表单实例ID，即非新增，
			// 并且当前遍历的动态行没有数据的情况下，默认放入一个空数组，用于处理首行的隐藏
			if (formDataId && !data[typeValue]) {
				data[typeValue] = [];
			}
		});
		
		// 动态表格Map，缓存动态表格
		var dynTableMap = new CForm.Map();
		var $dynTables = $form.find(".cfDynTable");
		$.each($dynTables, function() {
			var typeValue = $(this).attr(type);
			dynTableMap.put(typeValue, $(this));
		});
		
		// 设置子表数据
		function _setSubFormData(dynRowMap, dynTableMap, dynValueMap, byAttr) {
			return function() {
				CForm.setSubFormData(dynRowMap, dynTableMap, dynValueMap, byAttr);
			};
		}
		
		// 缓存子表单数据
		var dynValueMap = new CForm.Map();
		
		// 为每个域赋值
		for (var key in data) {
			var value = data[key];
			// 过滤空值
			if (!value) {
				continue;
			}
			
			// 动态行
			if (dynRowMap.get(key)) {
				dynValueMap.put(key, value);
				continue;
			}
			
			// 动态表格
			if (dynTableMap.get(key)) {
				dynValueMap.put(key, value);
				continue;
			}
			// key是空，则不进行赋值
			if(!key){
				continue;
			}
			// 主表单
			var $field = $form.find("[" + byAttr + "=" + key + "]");
			$.each($field, function(idx, input) {
				CForm.setFieldValue(input, value);
			});
		}
		// 异步加载子表单数据
		setTimeout(_setSubFormData(dynRowMap, dynTableMap, dynValueMap, byAttr), 0);
	};

	/**
	 * 初始化子表单实际数据
	 * 
	 * @param dynRowMap
	 *            动态行
	 * @param dynTableMap
	 *            动态表格
	 * @param dynValueMap
	 *            子表单数据
	 * @param byAttr
	 *            赋值属性
	 */
	CForm.setSubFormData = function(dynRowMap, dynTableMap, dynValueMap, byAttr) {
		CForm.subFormNum++;
		if (dynValueMap.length) {
			for (var drKey in dynRowMap.map) {
				var $dynRow = dynRowMap.get(drKey);
				var dynRowValues = dynValueMap.get(drKey);
				if (dynRowValues) {
					CForm.setDynRowData($dynRow, dynRowValues, byAttr);
				}
			}
			
			for (var dtKey in dynTableMap.map) {
				var $dynTable = dynTableMap.get(dtKey);
				var dynTableValues = dynValueMap.get(dtKey);
				if (dynTableValues) {
					CForm.setDynTableData($dynTable, dynTableValues, byAttr);
				}
			}
		}
		
		// 当CForm.subFormNum=CForm.mainFormNum时才说明所有的子表单已经设置完毕
		if (!CForm.isInitialized && CForm.subFormNum == CForm.mainFormNum) {
			// 触发子表单数据加载完成事件，用于控制域权限加载时机
			CForm.trigger("afterLoadSubFormData");
			// 设置表单已初始化
			CForm.isInitialized = true;
		}
		
	};
	
	/**
	 * 向指定的动态行里设置实际数据，如果要设置的动态行有数据，则先将数据删除
	 * 
	 * @param $dynRow
	 *            动态行
	 * @param value
	 *            数据
	 * @param byAttr
	 *            赋值属性
	 */
	CForm.setDynRowData = function($dynRow, value, byAttr) {
		if ((value!=null && value.length===0) || (value.zoneData!=null&&!value.zoneData.length)) {
			// 如果表单已经初始化过，则此方法被执行说明是业务上在自行调用此函数，
			// 这种情况下云表单不应该对页面上的动态行做任何处理
			if(!CForm.isInitialized){
				$dynRow.find(".cfDynRowTable tbody tr[cf_recordState=1]").each(function(i,curTr){
					CForm.delRow($dynRow,$(curTr));
				});
				return;
			}
			return;
		}
		// 获取第一行（可能是隐藏状态）
		var $firstRow = $dynRow.find("tbody tr:first");
		// 克隆第一行作为模板
		var $tr = $firstRow.clone(true).show();
		// 将模板行的状态设置为3
		$tr.attr("cf_recordState","3");
		// 将第一行的状态设置为temp，方便以后使用
		$firstRow.attr("cf_recordState","temp");
		// 隐藏第一行
		$firstRow.hide();
		
		// th中可能会有“增加”按钮，需要移除
		$dynRow.find("th:last .cfAddRow").remove();
		// 清空动态行的数据
		$dynRow.find(".cfDynRowTable tbody tr[cf_recordState][cf_recordState!=temp]").remove();
		if(value.length!=0){
			CForm.addRows($dynRow, $tr, byAttr, value);
		}
		
		
		// 触发列合计单击事件，计算合计值
		$dynRow.find(".cfColSum").trigger("click");
	};
	
	/**
	 * 向指定的动态表格里设置实际数据
	 * 
	 * @param $dynTable
	 *            动态表格
	 * @param value
	 *            数据
	 * @param byAttr
	 *            赋值属性
	 */
	CForm.setDynTableData = function($dynTable, value, byAttr) {
		if (!value.length) {
			return;
		}
		// 第一个表格
		var $table = $dynTable.find('table:first').clone(true);
		// 第一个表格数据
		var firstTableData = value[0];
		
		// 设置第一个表格中的所有域
		var $fieldsTable = $dynTable.find('table:first [' + byAttr + ']');
		$.each($fieldsTable, function(i, field) {
			var val = firstTableData[$(field).attr(byAttr)];
			if (val) {
				CForm.setFieldValue(field, val);
			}
		});
		
		// 设置动态表格的其他表格数据
		if (value.length < 2) {
			return;
		}
		
		CForm.addTables($dynTable, $table, byAttr, value);
	};
	
	/**
	 * 根据业务含义向指定的表单里设置实际数据
	 * 
	 * @param form
	 *            表单
	 * @param data
	 *            数据
	 */
	CForm.setFormDataByBizMean = function(form, data) {
		CForm.setFormData(form, data, "cf_bizMean");
	};
	
	/**
	 * 向指定的表单里，设置数据绑定
	 * 
	 * @param form
	 *            表单
	 * @param data
	 *            数据
	 */
	CForm.setDataBind = function(form, data) {
		var $form = $(form);
		// 为每个域赋值
		for ( var key in data) {
			var value = data[key];
			// 主表单
			var $field = $form.find("[cf_modelItemId=" + key + "]");

			$.each($field, function(i, field) {
				CForm.setFieldDataBind(field, value);
			});
		}
	};

	/**
	 * 向指定的表单里，根据域ID设置数据绑定
	 * 
	 * @param form
	 *            表单
	 * @param data
	 *            数据
	 */
	CForm.setDataBindByFieldId = function(form, data) {
		var $form = $(form);
		// 为每个域赋值
		for (var key in data) {
			var value = data[key];
			// 主表单
			var $field = $form.find("[id="+key+"]");

			$.each($field, function(i, field) {
				CForm.setFieldDataBind(field, value);
			});
			
			// 设置可编辑列表中编辑域的绑定值
			var editFieldId = $("#"+key).attr("cf_editfieldid");
			if(editFieldId){
				$("#"+editFieldId).empty();
				CForm.setFieldDataBind($("#"+editFieldId)[0], value);
			}
		}
	};

	/**
	 * 获得域值
	 * 
	 * @param field
	 *            域
	 */
	CForm.getFieldValue = function(field) {
		var fieldValue = "";

		switch (field.type) {
		// 列表框
		case "select-multiple":
			// 选中项
			$options = $("option:selected", $(field));
			if ($options.length) {
				var valArray = [];
				$.each($options, function(i, option) {
					valArray.push($(option).val());
				});
				fieldValue = valArray.join(",");
			}

			break;
		// 单选按钮
		case "radio":
			if (!field.checked) {
				break;
			}
		// 复选框
		case "checkbox":
			if (!field.checked) {
				break;
			}
		// 隐藏域
		case "hidden":
		// 多行文本框
		case "textarea":
			fieldValue = $.trim($(field).val());
			break;
		// 单行文本框
		case "text":
			fieldValue = $.trim($(field).val());
			break;
		// 下拉框
		case "select-one":
			fieldValue = $(field).val() == ' ' ? ' ' : $.trim($(field).val());
			break;
		case "password":
		case "button":
		case "file":
		case "image":
		case "reset":
		case "submit":
		default:
			break;
		}

		return fieldValue;
	};

	/**
	 * 设置域值
	 * 
	 * @param field
	 *            域
	 * @param value
	 *            域数据
	 */
	CForm.setFieldValue = function(field, value) {
		switch (field.type) {
			// 按钮不设置值
			case "button":
				break;
			// 列表框
			case "select-multiple":
				// 实际值
				if (value) {
					var valArray = value.split(",");
					var $options = $(field).find("option");
					$.each($options, function(i, option) {
						// 判断选项值是否在数组中
						if ($.inArray($(option).val(),valArray) == -1) {
							$(option).prop("selected", false);
						}else {
							$(option).prop("selected", true);
						}
					});
				}
				break;
			case "select-one":
				// 实际值
				if (value) {
					var valArray = value.split(",");
					var $options = $(field).find("option");
					$.each($options, function(i, option) {
						// 判断选项值是否在数组中
						if ($.inArray($(option).val(),valArray) == -1) {
							$(option).prop("selected", false);
						}else {
							$(option).prop("selected", true);
							return;
						}
					});
				}
				break;
			case "radio":
				if (value && value == $(field).val()) {
					$(field).prop("checked", true);
				}else {
					$(field).prop("checked", false);
				}
				break;
			case "checkbox":
				if (value) {
					var valArray = value.split(",");
					var fieldVal = $(field).val();
					if($.inArray(fieldVal,valArray) == -1) {
						$(field).prop("checked", false);
					}else {
						$(field).prop("checked", true);
					}
				}
				break;
			// 将textarea中的"[br]"替换为"\r\n"
			case "textarea":
				if (value) {
					$(field).val(value.replace(/\[br\]/g, "\r\n"));
					// 高度自适应
					$(field).trigger("autosize.resize");
				}
				break;
			// 隐藏域
			case "hidden":
			default:
				$(field).val(value);
				break;
		}
	};

	/**
	 * 设置域绑定
	 * 
	 * @param field
	 *            域
	 * @param value
	 *            值
	 */
	CForm.setFieldDataBind = function(field, value) {
		switch (field.type) {
			case "select-one":
			case "select-multiple":
				$(field).append(value);
				break;
			default:
				$(field).val(value);
				break;
		}
	};


    /**
	 * 非空校验
     */
    CForm.validateRequired = function (){
        // 校验结果
        var isValid = true;

        // 非空校验
        $(".cfIsRequired[type!=hidden]:not('[cf_elementType=editField]')").not("[style*='display: none']").each(
            function(i, field) {
                // 如果是动态行中被隐藏的行，则不需要校验
                if($(field).closest("tr").css("display") == "none"){
                    return true;
                }
                var $field = $(field);
                switch (field.type) {
                    // 列表框
                    case "select-multiple":
                        // 至少选中一项
                        $options = $field.find("option:selected");
                        if (!$options.length) {
                            isValid = false;
                        }

                        break;
                    // 单选按钮
                    case "radio":
                        // 同一组中至少有一个选中
                        $radios = $("input[type=radio][name="
                            + $field.attr("name") + "]:checked");
                        if (!$radios.length) {
                            isValid = false;
                        }

                        break;
                    // 复选框
                    case "checkbox":
                        // 同一组中至少有一个选中
                        $checkboxes = $("input[type=checkbox][name="
                            + $field.attr("name") + "]:checked");
                        if (!$checkboxes.length) {
                            isValid = false;
                        }

                        break;
                    default:
                        if (!$.trim($field.val())) {
                            isValid = false;
                        }

                        break;
                }

                if (!isValid) {
                    CForm.showTips($field, "cfIsRequired");
                    return false;
                }
            });

		return isValid;
	};


    // 数据类型校验
    CForm.validateInteger = function (){
        // 校验结果
        var isValid = true;

        $('.cfIsInteger').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isInteger(val)) {
                CForm.showTips($field, "cfIsInteger");
                isValid = false;
                return false;
            }
        });

		return isValid;
	};

    // 小数校验
    CForm.validateFloat = function () {
        // 校验结果
        var isValid = true;
        // 小数校验
        $('.cfIsFloat').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val) {
                if (!CForm.isFloat(val)) {
                    // 不是小数，校验是否整数
                    if (!CForm.isInteger(val)) {
                        CForm.showTips($field, "cfIsFloat");
                        isValid = false;
                        return false;
                    }
                }else {
                    // 精确度校验
                    var precision = $field.attr("cf_fieldPrecision");
                    if (precision) {
                        var floatLength = val.toString().split(".")[1].length;
                        if (floatLength > precision) {
                            CForm.showTips($field, "cfIsFloat", precision);
                            isValid = false;
                            return false;
                        }
                    }
                }
            }
        });

		return isValid;
    };

    // 电子邮件校验
    CForm.validateEmail = function () {
		// 校验结果
        var isValid = true;
        // 电子邮件校验
        $('.cfIsEmail').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isEmail(val)) {
                CForm.showTips($field, "cfIsEmail");
                isValid = false;
                return false;
            }
        });

		return isValid;
    };

    // 邮政编码校验
    CForm.validateZipCode = function() {
        // 校验结果
        var isValid = true;
        // 邮政编码校验
        $('.cfIsZipCode').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isZipCode(val)) {
                CForm.showTips($field, "cfIsZipCode");
                isValid = false;
                return false;
            }
        });
        return isValid;
	};

    // 身份证号校验
    CForm.validateIdCard = function() {
        // 校验结果
        var isValid = true;
        // 身份证号校验
        $('.cfIsIdCard').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            var result = L5.checkIdCard(val);
            if (val && result != true) {
                CForm.showTips($field, "cfIsIdCard", result);
                isValid = false;
                return false;
            }
        });
        return isValid;
    };

    // 固定电话校验
    CForm.validateTelPhone = function() {
        // 校验结果
        var isValid = true;
        // 固定电话校验
        $('.cfIsPhoneNum').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsPhoneNum(val)) {
                CForm.showTips($field, "cfIsPhoneNum");
                isValid = false;
                return false;
            }
        });
        return isValid;
    };

    // 手机号码校验
    CForm.validateMobilePhone = function() {
        // 校验结果
        var isValid = true;
        // 手机号码校验
        $('.cfIsMobileNum').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsMobileNum(val)) {
                CForm.showTips($field, "cfIsMobileNum");
                isValid = false;
                return false;
            }
        });
        return isValid;
    };

    // 正则表达式校验
    CForm.validateRegExp = function() {
        // 校验结果
        var isValid = true;
        // 正则表达式校验
        $('.cfIsRegExp').each(function(i, field){
            var $field = $(field);
            var reg = $field.attr("cf_regExp");
            if (reg) {
                var val = $.trim($field.val());
                if(val && !eval(reg).test(val)) {
                    CForm.showTips($field, "cfIsRegExp");
                    isValid = false;
                    return false;
                }
            }
        });
        return isValid;
    };


	/**
     * 提交数据时校验
     */
    CForm.validate = function() {
        // 校验结果
        // 非空校验
        var isValid = CForm.validateRequired();

        if(!isValid) {
            return false;
        }

        // 数据类型校验
        isValid = CForm.validateInteger();
        if(!isValid) {
            return false;
        }

        // 小数校验
        isValid = CForm.validateFloat();
        if(!isValid) {
            return false;
        }

        // 电子邮件校验
        isValid = CForm.validateEmail();
        if(!isValid) {
            return false;
        }

        // 邮政编码校验
        isValid = CForm.validateZipCode();
        if(!isValid) {
            return false;
        }

        // 身份证号校验
        isValid = CForm.validateIdCard();
        if(!isValid) {
            return false;
        }

        // 固定电话校验
        isValid = CForm.validateTelPhone();
        if(!isValid) {
            return false;
        }

        // 手机号码校验
        isValid = CForm.validateMobilePhone();
        if(!isValid) {
            return false;
        }

        // 正则表达式校验
        isValid = CForm.validateRegExp();
        return isValid;
    };

    /**
     * 提交数据时校验
	 * 忽略必填，用于保存补提交流程的场景
     */
    CForm.validateIgnoreRequired = function() {
        // 校验结果
        // 数据类型校验
        var isValid = CForm.validateInteger();
        if(!isValid) {
            return false;
        }

        // 小数校验
        isValid = CForm.validateFloat();
        if(!isValid) {
            return false;
        }

        // 电子邮件校验
        isValid = CForm.validateEmail();
        if(!isValid) {
            return false;
        }

        // 邮政编码校验
        isValid = CForm.validateZipCode();
        if(!isValid) {
            return false;
        }

        // 身份证号校验
        isValid = CForm.validateIdCard();
        if(!isValid) {
            return false;
        }

        // 固定电话校验
        isValid = CForm.validateTelPhone();
        if(!isValid) {
            return false;
        }

        // 手机号码校验
        isValid = CForm.validateMobilePhone();
        if(!isValid) {
            return false;
        }

        // 正则表达式校验
        isValid = CForm.validateRegExp();
        return isValid;
    };
	
	/**
	 * 提示校验信息
	 */
	CForm.showTips = function($field, className, param) {
		var msg  = "";
		
		// 动态行域判断
		var $dynRows = $field.parents(".cfDynRow");
		if ($dynRows.length) {
			var $dynRow = $dynRows.eq(0);
			var dName = $dynRow.attr("name");
			var rowNum = $field.parents("tr").find("td:first label").text();
			var colNum = $field.parent("td").index() + 1;
			msg  = "动态行[" + dName + "]第" + rowNum + "行，第"+ colNum + "列中";
		}
		
		var fName = $field.attr("name");
		
		switch (className) {
		// 必填
		case "cfIsRequired":
			msg += "域[" + fName + "]不能为空！";
			break;
		// 整数
		case "cfIsInteger":
			msg += "域[" + fName + "]只能输入整数！";
			break;
		// 小数
		case "cfIsFloat":
			if (param) {
				msg += "域[" + fName + "]的精确度大于" + param + "！";
			} else {
				msg += "域[" + fName + "]只能输入小数！";
			}
			break;
		// 邮件编码
		case "cfIsZipCode":
			msg += "域[" + fName + "]的值不符合邮政编码格式！";
			break;
		// 电子邮件
		case "cfIsEmail":
			msg += "域[" + fName + "]的值不符合电子邮件格式！";
			break;
		// 正则表达式
		case "cfIsRegExp":
			msg += "域[" + fName + "]的值不符合正则表达式规则！";
			break;
		case "cfIsIdCard":
			msg += "域[" + fName + "]:" + param;
			break;
		case "cfIsPhoneNum":
			msg += "域[" + fName + "]的值不符合固定电话格式！\r如果有区号，请使用[区号-座机号]的形式。";
			break;
		case "cfIsMobileNum":
			msg += "域[" + fName + "]的值不符合手机号码格式！";
			break;
		default:
			msg += "域[" + fName + "]的值不合法！";
			break;
		}
		// 弹出框
		alert(msg);
		// 聚焦
		$field.focus();
	}

	/**
	 * 验证值是否为整数
	 */
	CForm.isInteger = function(val) {
		return /^(?:-?|\+?)\d+$/g.test(val);
	};

	/**
	 * 判断值是否为小数
	 */
	CForm.isFloat = function(val) {
		return /^(?:-?|\+?)\d*\.\d+$/g.test(val);
	};

	/**
	 * 判断值是否为邮政编码
	 */
	CForm.isZipCode = function(val) {
		return /^\d{6}$/g.test(val);
	};

	/**
	 * 判断值是否为电子邮件
	 */
	CForm.isEmail = function(val) {
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(val);
	};
	
	/**
	 * 判断值是否为固定电话号码
	 */
	CForm.cfIsPhoneNum = function(val) {
		return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/g.test(val);
	};
	
	/**
	 * 判断值是否为手机号码
	 */
	CForm.cfIsMobileNum = function(val) {
		//return /^((\(\d{2,3}\))|(\d{3}\-))?0{0,1}1[3|5|6|8][0-9]{9}$/g.test(val);
		return /^1[34578]\d{9}$/.test(val);
	};
	
	/**
	 * 将域设置为只读
	 */
	CForm.setFieldReadOnly = function(field) {
		var $field = $(field);
		// 设置背景颜色
		var td = $field.parent("td");
		if (td) {
			td.addClass("cfIsReadonly");
			// 去掉必填符号
			td.find("font.isRequiredSign").remove();
		}
		
		var fieldValue = "";
		// 根据域类型获取域值
		switch (field.type) {
			// 列表框
			case "select-multiple":
			// 下拉框
			case "select-one":
				// 选中项
				var $options = $("option:selected", $field);
				if ($options.length) {
					var valArray = [];
					$.each($options, function() {
						if ($(this).val()) {
							valArray.push($(this).text());
						}
					});
					fieldValue = valArray.join(",");
				}
				break;
			// 多行文本框
			case "textarea":
			// 单行文本框
			case "text":
				fieldValue = $.trim($field.val());
				break;
			// 单选按钮
			case "radio":
			// 复选框
			case "checkbox":
				var nodeValue = field.nextSibling.nodeValue;
				$(field).data("disVal", nodeValue);
				field.nextSibling.nodeValue = "";
				if(!field.checked) {
					if($field.closest("td").find("font")) {
						fieldValue = $field.closest("td").find("font").text();
					}
				} else {
					if($field.closest("td").find(":checked").index(field) == 0) {
						fieldValue = nodeValue;
					} else {
						fieldValue = $field.closest("td").find("font").text()+","+nodeValue;
					}
				}
				break;
			// 按钮
			case "button":
				fieldValue = "";
				break;
		}
		// 正则表达式替换是为了处理多行文本框的换行
		var reg = new RegExp("\n", "g");
		fieldValue = fieldValue.replace(reg, "<br/>");
		// 隐藏
		$field.hide();
		
		if(!fieldValue) {
			return;
		}
		// 添加显示值
		var $font = $td.find(".readOnlyFieldVal");
		if($font.length) {
			$font.text(fieldValue);
		} else {
			$td.append("<font class='readOnlyFieldVal'>" + fieldValue + "</font>");
		}
	};

	/**
	 * 将指定的区域设置成只读，可以是整个表单，也可以是表单中的一部分
	 */
	CForm.setFormReadOnly = function(form) {
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		if (!$form.length) {
			alert("未获取到要操作的表单！");
			return;
		}
		
		// 将所有可见域设置成只读
		var fields = $form.find("[cf_elementType=field]:visible");
		$.each(fields, function(i,field) {
			// 设置域只读
			CForm.setFieldReadOnly(field);
		});
		
		// 设置动态行和可编辑列表序号列的背景色、隐藏操作列
		$form.find(".cfDynRow").each(function(i,dynRow){
			// 处理序号列
			$(dynRow).find("tbody tr").each(function(i,tr){
				$(tr).find("td:first").addClass("cfIsReadonly");
			});
			
			// 隐藏操作列
			$(dynRow).find("th:last").hide();
			$(dynRow).find(".cfAddAndDelTd").hide();
		});
		
		// 处理可编辑列表
		if($form.hasClass("cfEditGrid")){
			setEditGridReadOnly($form);
			return;
		}
		
		$form.find(".cfEditGrid").each(function(i,editGrid){
			setEditGridReadOnly(editGrid);
		});
		
		function setEditGridReadOnly(editGrid){
			// 隐藏可编辑列表的“增加”按钮
			$(editGrid).find(".cfAddEditGrid").hide();
			// 设置可编辑列表的的背景颜色
			$(editGrid).find("tbody tr td").each(function(i,td){
				$(td).addClass("cfIsReadonly");
			});
			// 显示可编辑列表右侧的“查看”按钮，为兼容有tab页的情况，不使用tr:visible选择
			if($(editGrid).find("tr[cf_recordState=1],tr[cf_recordState=3]").length){
				$(editGrid).find("th:last").show();
				$(editGrid).find("tbody .cfAddAndDelTd").show().addClass("cfIsReadonly");
				$(editGrid).find("tbody .cfAddAndDelTd input").hide();
				$(editGrid).find("tbody .cfAddAndDelTd .cfCheckRow").show();
			}
		};
	};
	
	/**
	 * 将所有域替换为标签(为兼容保留)
	 */
	CForm.setToLabel = CForm.setFormReadOnly;

	/**
	 * 获取行（列）合计关联的表单域
	 */
	CForm.getSumFieldRefs = function(sumField) {
		// 返回值
		var refFields = [];
		// 合计域
		var $sumField = $(sumField);
		// 如果是行合计
		if ($sumField.hasClass("cfRowSum")) {
			var sumRule = $sumField.attr("cf_sumRule");
			if (sumRule){
				var sumRuleArr = sumRule.split("#");
				var operation = "+-*/()";
				for (var i = 0; i < sumRuleArr.length; i++) {
					var sumRuleItem = sumRuleArr[i];
					// 判断sumRuleItem是否为操作符
					if (operation.indexOf(sumRuleItem) == -1) {
						// 域ID放入返回值
						refFields.push(sumRuleItem);
					}
				}
			}
		}
		// 列合计
		else if ($sumField.hasClass("cfColSum")) {
			var index = $sumField.parent().prevAll().length;
			var $tbody = $sumField.parents("tfoot").next();
			var $td = $("tr:first td:eq(" + index + ")", $tbody);
			var refFieldId = $("[cf_elementType=field]", $td).attr("id");
			if (refFieldId) {
				refFields.push(refFieldId);
			}
		}
		
		return refFields;
	};
	
	/**
	 * 构建初始化动态行数据
	 */
	CForm.addRows = function($dynRow, $tr, byAttr, dataInfo) {
		var value = dataInfo.zoneData;
 		var isEditGrid = false;
		var fragment = document.createDocumentFragment();
		if($dynRow.hasClass("cfEditGrid")){
			isEditGrid = true;
			$dynRow.find(".cfDynRowTable tbody tr:visible").remove();
		}
		var num = value.length;
		
		// 设置分页信息
		if(!CForm.isInitialized && $dynRow.attr("cf_isPaging") == "true"){
			var limit = $dynRow.find(".pageBarContainer .pageSize option:first").val();
			if(!limit)
				limit = 10;
			// 总页数
			$dynRow.find(".pageBarContainer .totalPage").html(Math.ceil(dataInfo.pageInfo.total/limit));
			// 总条数
			$dynRow.find(".pageBarContainer .totalNum").html(dataInfo.pageInfo.total);
		}
		for ( var i = 0; i < num; i++) {
			// 第（i+1）行数据
			var record = value[i];
			
			var $cloneTr = $tr.clone(true);
			
			// 修改单选按钮name属性，否则会与其他行的单选按钮成一组
			$cloneTr.find(":radio").attr({
				name: "r_" + new Date().getTime()
			});
			
			// 设置序号
			var rowNum = record["SUB_TBL_NUM"];
			if(!rowNum){
				rowNum = i+1;
			}
			$cloneTr.find("td:first label").text(rowNum);
			
			// 产生一个32位随机数，赋给id为SUB_TBL_PK的域
			var pk = CForm.createUUID();
			$cloneTr.find("#SUB_TBL_PK").val(pk);
			
			var $fields = $cloneTr.find("[" + byAttr + "]");
			$.each($fields, function(idx, field) {
				var val = record[$(field).attr(byAttr)];
				if (val) {
					CForm.setFieldValue(field, val);
					
					// 在分页的情况下，如果在流程定义中将域设置成只读状态，则需要将域重新设置成只读
					if($(field).parent().hasClass("cfIsReadonly")){
						CForm.setFieldReadOnly(field);
					}
				}
				if(isEditGrid && field.type != "hidden"){
					CForm.setFieldReadOnly(field);
					$(field).parent().removeClass("cfIsReadonly");
				}
			});
			
			fragment.appendChild($cloneTr[0]);
		}
		
		// 一次性添加到DOM
		$dynRow.find(".cfDynRowTable tbody").append(fragment);
	};
	
	/**
	 * 动态行-新增行
	 */
	CForm.addRow = function($dynRow, $curRow) {
		var $cloneTr = $curRow.clone(true);
		// 将数据状态设置为新增
		$cloneTr.attr("cf_recordState","1");

		// 清空输入域的值(按钮、单选、复选、隐藏域的值不能清空)
		$cloneTr.find(":input[type!=button][type!=radio][type!=checkbox][type!=hidden]").val('');
		// 移除只读时设置的值
		$cloneTr.find(".readOnlyFieldVal").remove();
		// 产生一个32位随机数，赋给id为SUB_TBL_PK的域
		var pk = CForm.createUUID();
		$cloneTr.find("#SUB_TBL_PK").val(pk);
		
		// 设置单选按钮为未选中状态，并修改name属性，否则会与其他行的单选按钮成一组
		$cloneTr.find(":radio").attr({
			checked: false,
			name: "r_" + new Date().getTime()
		});
		
		// 设置复选框为未选中状态
		$cloneTr.find(":checkbox").attr("checked", false);
		
		//隐藏查看按钮
		$cloneTr.find(".cfAddAndDelTd .cfCheckRow").hide();
		
		//$curRow.after($cloneTr);
		$dynRow.find(".cfDynRowTable tbody tr").last().after($cloneTr);
		// 序号重排
		// 获取当前行的行号
		//var curNum = parseInt($dynRow.find(".cfDynRowTable tbody tr").last().prev().find("td:first label").text());
		// 只有当前行之后的行才需要重新设置行号
		var $trs = $dynRow.find(".cfDynRowTable tbody tr[cf_recordState]:visible");
		//var $trs1 = $dynRow.find(".cfDynRowTable tbody tr[cf_recordState]:visible");
		$trs.each(function(i, tr){
			$(tr).find("td:first label").text(i + 1);
		});
		
		return $cloneTr;
	};

	/**
	 * 动态行-删除行
	 */
	CForm.delRow = function($dynRow, $curRow) {
		// 序号重排
		// 获取当前行的行号
		var curNum = parseInt($curRow.find("td:first label").text());
		// 只有当前行之后的行才需要重新设置行号
		var $nextAllTrs = $curRow.nextAll("tr[cf_recordState]:visible");
		$nextAllTrs.each(function(i,tr){
			$(tr).find("td:first label").text(i+curNum);
		});
		
		// 动态行中所有可见行，即状态为1或3的行(为了兼容有tab页的情况，所以不用tr:visible)
		var $allTrs = $dynRow.find("tr[cf_recordState=1],tr[cf_recordState=3]");
		var $ftr = $allTrs.first();
		var $ltr = $allTrs.last();
		var curRecordState = $curRow.attr("cf_recordState");
		// 最后一行可见行的情况
		if ($ftr.is($ltr)) {
			// 模板行
			var $tempTr = $dynRow.find("tbody tr[cf_recordState=temp]");
			if ($tempTr.length) {// 有模板行
				if(curRecordState == "1"){
					$curRow.remove();
				}else{
					$curRow.attr("cf_recordState","2");
					$curRow.hide();
				}
			} else {// 没有模板行
				var $cloneCurRow = $curRow.clone(true);
				// 还原初始状态
				$curRow.find(':input[type!=button][type!=radio][type!=checkbox][type!=hidden]').val('');
				// 设置单选按钮、复选框为未选中状态
				$curRow.find(':radio, :checkbox').attr('checked', false);
				$curRow.attr("cf_recordState","temp");
				$curRow.hide();
				
				if(curRecordState != "1"){
					$cloneCurRow.attr("cf_recordState","2");
					$cloneCurRow.hide();
					$dynRow.find("tbody").append($cloneCurRow);
				}
			}
			// 可编辑列表不需要添加“增加”按钮
			if($dynRow.hasClass("cfEditGrid"))
				return;
			// 添加新增按钮
			$dynRow.find('th:last').append(
					$('<input type="button" value="增加" class="cfAddRow" style="margin-left: 10px;" />')
						.click(function(){
							// 获取模板行，显示，并重新设置主键
							var $tempRow = $dynRow.find("tbody tr[cf_recordState=temp]").eq(0);
							var $cloneTr = $tempRow.clone(true);
							// 将数据状态设置为新增
							$cloneTr.attr("cf_recordState","1");
							$cloneTr.find("#SUB_TBL_PK").val(CForm.createUUID());
							$cloneTr.show();
							$cloneTr.find("td:first label").text(1);
							CForm.addRow($dynRow, $cloneTr);
							// 移除当前按钮
							$(this).remove();
						})
					);
			return;
		}
		// 不是最后一行
		if(curRecordState == "1"){
			$curRow.remove();
		}else{
			$curRow.attr("cf_recordState","2");
			$curRow.hide();
		}
		
	};

	/**
	 * 构建初始化动态表格数据
	 */
	CForm.addTables = function($dynTable, $table, byAttr, value) {
		var fragment = document.createDocumentFragment();
		
		for ( var i = 1; i < value.length; i++) {
			// 第（i+1）个表格数据
			var iData = value[i];
			
			var $cloneTable = $dynTable.clone(true);
			
			// 修改单选按钮name属性，否则会与其他表格的单选按钮成一组
			$cloneTable.find(":radio").attr({
				name: "r_" + new Date().getTime()
			});
			
			// 产生一个32位随机数，赋给id为SUB_TBL_PK的域
			var pk = CForm.createUUID();
			$cloneTable.find("#SUB_TBL_PK").val(pk);
			
			var $fields = $cloneTable.find("[" + byAttr + "]");
			$.each($fields, function(idx, field) {
				var val = iData[$(field).attr(byAttr)];
				if (val) {
					CForm.setFieldValue(field, val);
				}
			});
			
			fragment.appendChild($cloneTable[0]);
		}
		
		// 一次性添加到DOM
		$dynTable.after($(fragment));
	};
	
	/**
	 * 动态表格-新增表格
	 */
	CForm.addTable = function($dynTable) {
		var $cloneTable = $dynTable.clone(true);
		
		// 清空输入域的值(按钮、单选、复选、隐藏域的值不能清空)
		$cloneTable.find(":input[type!=button][type!=radio][type!=checkbox][type!=hidden]").val('');
		
		// 产生一个32位随机数，赋给id为SUB_TBL_PK的域
		var pk = CForm.createUUID();
		$cloneTable.find("#SUB_TBL_PK").val(pk);
		
		// 设置单选按钮为未选中状态，并修改name属性，否则会与其他表格的单选按钮成一组
		$cloneTable.find(":radio").attr({
			checked: false,
			name: "r_" + new Date().getTime()
		});
		
		// 设置复选框为未选中状态
		$cloneTable.find(":checkbox").attr("checked", false);
		
		$dynTable.after($cloneTable);
		
		return $cloneTable;
	};

	/**
	 * 动态表格-删除表格
	 */
	CForm.delTable = function($dynTable) {
		var length = $('[id=' + $dynTable.attr("id") + '][class=cfDynTable]').length;
		// 最后一个表格的情况
		if (length == 1) {
			// 还原初始状态
			$dynTable.find(':input[type!=button][type!=radio][type!=checkbox][type!=hidden]').val('');
			// 设置单选按钮、复选框为未选中状态
			$dynTable.find(':radio, :checkbox').attr('checked', false);
			
			// 重新设置主键值，再次编辑时相当于一条新记录
			$dynTable.find("#SUB_TBL_PK").val(CForm.createUUID());
			
			return;
		}
		// 不是最后一个表格，移除当前表格
		$dynTable.remove();
	};
	
	/**
	 * 新建动态行序号列、主键域
	 */
	CForm.loadDynRowNum = function(form) {
		var $form = form ? $(form) : $('[cf_elementType=form]').eq(0);
		if (!$form.length) {
			alert('未获取到要操作的表单！');
			return;
		}
		
		// 动态行
		var $drs = $form.find(".cfDynRow[cf_modelId]");
		if ($drs.length) {
			// 添加设置换行框
			$form.append("<div class='cfChangeRowDiv'>"
							+ "<label>输入行号&nbsp;(<font class='firstRowNum'></font>-<font class='lastRowNum'></font>)：</label>"
							+ "<input type='text' id='cfRowNumIn' name='cfRowNumIn'/>"
							+ "<label class='cfTipLabel'></label>"
							+ "<a href='javascript:;' id='cancelBtn' class='cfCancelBtn'>取消</a>"
							+ "<a href='javascript:;' id='confirmBtn' class='cfConfirmBtn'>确定</a>"
							+ "</div>");
			$.each($drs, function(){
				var $dr = $(this);
				var $numThs = $dr.find("th.cfNumCol");
				var $numTd = $dr.find(".cfDynRowTable tbody td:first");
				var uuid = CForm.createUUID();
				// 判断动态行定义期是否有序号列，兼容已有动态行
				if ($numThs.length) {
					$numTd.prepend("<input type='hidden' id='SUB_TBL_PK' name='主键' " 
							+ "cf_modelItemId='SUB_TBL_PK' cf_modelItemName='主键' " 
							+ "cf_elementType='field' value='" 
							+ uuid 
							+ "'/>");
				} else {
					// 添加序号列
					$("<th style='width:50px;'>序号</th>").insertBefore($("th:first", $dr));
					
					// 添加序号和主键隐藏域
					$("<td style='text-align:center;'>" 
							+ "<input type='hidden' id='SUB_TBL_PK' name='主键' cf_modelItemId='SUB_TBL_PK' cf_modelItemName='主键' "
							+ "cf_elementType='field' value='" 
							+ uuid 
							+ "'/>" 
							+ "<label>1</label>" 
							+ "</td>").insertBefore($numTd);
				}
			});
		}
	};
	
	/**
	 * 处理动态行分页按钮事件
	 */
	CForm.loadDynRowPageBtn = function(dynRow){
		var formId = $(dynRow).closest("[cf_elementType=form]").attr("id");
		var zoneId = dynRow.id;
		
		// 总条数
		var $totalNum = $(dynRow).find(".pageBarContainer .totalNum");
		// 总页数
		var $totalPage = $(dynRow).find(".pageBarContainer .totalPage");
		// 每页显示条数
		var $pageSize = $(dynRow).find(".pageBarContainer .pageSize");
		// 当前页数
		var $curPageNum = $(dynRow).find(".pageBarContainer .curPageNum");
		
		var limit = $pageSize.find("option:first").val();
		// 首页
		$(dynRow).find(".pageBarContainer .firstPage").click(function(){
			// 将当前页数设置为1
			$curPageNum.val(1);
			// 请求数据
			CForm.queryDynData(formId,zoneId,formDataId,1,limit,dynRow);
		});
		
		// 上一页
		$(dynRow).find(".pageBarContainer .dynPageUp").click(function(){
			// 当前页数
			var curPageNum = parseInt($curPageNum.val());
			
			var start = curPageNum-1;
			if(start < 1)
				start = 1;
			if(start > parseInt($totalPage.html()))
				start = parseInt($totalPage.html());
			// 设置当前页数
			$curPageNum.val(start);
			// 请求数据
			CForm.queryDynData(formId,zoneId,formDataId,start,limit,dynRow);
		});
		
		// 下一页
		$(dynRow).find(".pageBarContainer .dynPageDown").click(function(){
			// 当前页数
			var curPageNum = $curPageNum.val();
			// 总页数
			var totalPage = parseInt($totalPage.html());
			
			var start = parseInt(curPageNum)+1;
			if(start > totalPage)
				start = totalPage;
			// 设置当前页数
			$curPageNum.val(start);
			
			CForm.queryDynData(formId,zoneId,formDataId,start,limit,dynRow);
		});
		
		// 尾页
		$(dynRow).find(".pageBarContainer .endPage").click(function(){
			// 总页数
			var totalPage = parseInt($totalPage.html());
			// 设置当前页数
			$curPageNum.val(totalPage);
			
			CForm.queryDynData(formId,zoneId,formDataId,totalPage,limit,dynRow);
		});
		
		// 选择每页显示条数
		$pageSize.change(function(){
			limit=$(this).children("option:selected").val();
			$curPageNum.val(1);
			$totalPage.html(Math.ceil($totalNum.html()/limit));
			if($totalNum.html() == 0){
				$totalPage.html(1);
			}
			CForm.queryDynData(formId,zoneId,formDataId,1,limit,dynRow);
		});
		
		// 跳转页数
		$curPageNum.bind('keypress',function(event){
			if(event.keyCode != "13"){
				return;
			}
			var totalPage = parseInt($totalPage.html());
			var start = parseInt($(this).val());
			var re = /^[1-9]+[0-9]*]*$/;
			if(!re.test(start) || start>totalPage){
				alert("请输入1至"+totalPage+"的整数！");
				$(this).val(1);
				return;
			}
			CForm.queryDynData(formId,zoneId,formDataId,start,limit,dynRow);
		});
	}
	
	/**
	 * 分页查询动态行数据
	 */
	CForm.queryDynData = function(formId,zoneId,formDataId,start,limit,dynRow){
		var queryDynDataUrl = L5.webPath+"/command/dispatcher/"+
							  "org.loushang.cform.formdata.cmd.FormDataDispatcherCmd/queryDynData";
		
		var dynDataCfg = {
				url : queryDynDataUrl,
				data :"formId="+formId+"&zoneId="+zoneId+"&formDataId="+formDataId+"&start="+start+"&limit="+limit,
				dataType : "json",
				async : false,
				cache : false,
				success : function(dynData){
					var dataInfo = {};
					dataInfo.zoneData = dynData[zoneId];
					dataInfo.pageInfo = {};
					dataInfo.pageInfo.total = dynData.total;
					
					CForm.setDynRowData( $(dynRow), dataInfo, "cf_modelItemId" );
					if (taskType == '2' || taskType == '3' || taskType == '4') {
						// 将动态行所有可见域设置为只读
						CForm.setFormReadOnly(dynRow);
					}
				},
				error : function(){
					alert("请求数据出错");
				}
			};

		//$.ajax(dynDataCfg);
		mui.ajax(dynDataCfg);
	}
	
	/**
	 * 新建动态表格主键域
	 */
	CForm.loadDynTableNum = function(form) {
		var $form = form ? $(form) : $('[cf_elementType=form]').eq(0);
		if (!$form.length) {
			alert('未获取到要操作的表单！');
			return;
		}
		
		// 动态表格
		var $dts = $form.find(".cfDynTable[cf_modelId]");
		if ($dts.length) {
			$.each($dts, function(){
				var $dt = $(this);
				var uuid = CForm.createUUID();
				// 添加主键隐藏域
				$("td:first", $dt).append("<input type='hidden' id='SUB_TBL_PK' name='主键' " 
						+ "cf_modelItemId='SUB_TBL_PK' cf_modelItemName='主键' " 
						+ "cf_elementType='field' value='" 
						+ uuid 
						+ "'/>");
			});
		}
	};
	
	/**
	 * tab组件初始化
	 */
	CForm.initTab = function() {
		// Tab页组件
		$(".cfTab li").click(function() {
			var lis = $(this).parent().children("li");
			var panels = $(".cfTabBody");
			var index =$(this).index();
			
			if (panels.eq(index)[0]) {
				// 移除所有li的选中
				lis.removeClass("selected");
				// 移除li的左圆角以及右圆角选中状态
				lis.find('span').removeClass('tabLeftSelected').removeClass(
						'tabRightSelected');

				// 当前选中的li
				var selectedLi = lis.eq(index);
				selectedLi.addClass("selected");

				// 显示当前选中li的左圆角
				selectedLi.find('span').eq(0).addClass('tabLeftSelected');
				// 显示当前选中li的右圆角
				selectedLi.find('span').eq(2).addClass('tabRightSelected');

				// 显示体部
				panels.addClass("hide").eq(index).removeClass("hide");
			}
			if (taskType == '2' || taskType == '3' || taskType == '4') {
				var $curPanel = panels.eq(index);
				// 当前tab页中的可见域，排除可编辑列表的“查看”按钮
				var visibleField= $curPanel.find("[cf_elementType=field][class!=cfCheckRow]:visible");
				if(visibleField.length){
					// 将当前tab页设置成只读
					CForm.setFormReadOnly($curPanel);
				}
			}
		});
	};
	
	/**
	 * 日期、日期时间组件初始化
	 */
	CForm.initDate = function() {
		// 日期时间框组件
		window.CFormDateTime && window.CFormDateTime();

		// 日期框组件
		window.CFormDate && window.CFormDate();
	};
	
	/**
	 * 动态行初始化
	 */
	CForm.initDynRow = function() {
		// 加载序号列
		CForm.loadDynRowNum();
		$(".cfDynRow").each(function(i,dynRow){
            //首行处理
            /*// 将默认行的状态设置为新增
            var $firstRow = $(this).find(".cfDynRowTable tbody tr:first");
            if(!$(dynRow).hasClass("cfEditGrid")){
                CForm.addRow($(this), $firstRow);
            }

            $firstRow.attr("cf_recordState","temp").hide();*/

            /**
             * new: 首行处理
             * edit by xushengfeng： 20180529
             */
            // 将默认行的状态设置为新增
            var $firstRow = $(this).find(".cfDynRowTable tbody tr:first");
            $firstRow.attr("cf_recordState","temp").hide();
            if(!$(dynRow).hasClass("cfEditGrid")){
                $(this).find('.cfDynRowTable thead tr:first th:last').append(
                    $('<input type="button" value="增加" class="cfAddRow" style="margin-left: 10px;" />')
                        .click(function(){
                            // 获取模板行，显示，并重新设置主键
                            var $dynRow = $(dynRow);
                            var $tempRow = $dynRow.find("tbody tr[cf_recordState=temp]").eq(0);
                            var $cloneTr = $tempRow.clone(true);
                            // 将数据状态设置为新增
                            $cloneTr.attr("cf_recordState","1");
                            $cloneTr.find("#SUB_TBL_PK").val(CForm.createUUID());
                            $cloneTr.show();
                            $cloneTr.find("td:first label").text(1);
                            CForm.addRow($dynRow, $cloneTr);
                            // 移除当前按钮
                            $(this).remove();
                        })
                );
            }
			if(typeof(formDataId) == "undefined" || !formDataId 
					|| $(this).attr("cf_isPaging") != "true"){
				// 首环节(即没有实例数据时)，将动态行的分页按钮隐藏
				$(this).find(".pageBarContainer").hide();
				return true;
			}
			
			// 分页
			CForm.loadDynRowPageBtn(this);
		});
		// 当前动态行
		var $curDynRow = null;
		// 动态行当前行
		var $curTr = null;
		
		// 可编辑列表的编辑区dialog
		var gridDialogMap = new CForm.Map();
		// 标识当前dialog的状态，1：新增 2：修改 3：查看
		var dialogState = 0;
		// 监听动态行单击事件，解析行（列）合计关联表单域
		$(".cfDynRow").click(function(evt) {
			/**
			 * 解析行（列）合计关联的表单域，绑定表单域change事件
			 */							
			// 记录已绑定的表单域ID，避免重复绑定
			var bindedField = new Object();
			// 行合计
			$(".cfRowSum").each(function() {
				var refFields = CForm.getSumFieldRefs(this);
				if(refFields.length) {
					for(var i = 0; i < refFields.length; i++){
						var fieldId = refFields[i];
						if(!bindedField[fieldId]){
							$("#" + fieldId).live("change", function(){
								$(this).parents("tr")
									.find(".cfRowSum").trigger("click");
							});
							bindedField[fieldId] = fieldId;
						}										
					}
				}
			});
			// 列合计
			$(".cfColSum").each(function(){
				var globalObj = this;
				var refFields = CForm.getSumFieldRefs(globalObj);
				if(refFields.length) {
					for(var i = 0; i < refFields.length; i++){
						var fieldId = refFields[i];
						$("#" + fieldId).live("change", function(){
							// 校验数字
							if(!$.isNumeric($(this).val())){
								alert("合计域只能输入数字！");
								return false;
							}
							// 列合计
							$(globalObj).trigger("click");
						});
					}
				}
			});
			// 取消绑定
			$(".cfDynRow").unbind("click");
		});
		
		// 增加一行按钮
		$(".cfAddRow").click(
				function() {
					var $dynRow = $(this).parents(
							".cfDynRow[cf_elementType=zone]").eq(0);
					var $curRow = $(this).parents("tr").eq(0);
					CForm.addRow($dynRow, $curRow);
				});

		// 删除一行按钮
		$(".cfDelRow").click(
				function() {
					var $dynRow = $(this).parents(
							".cfDynRow[cf_elementType=zone]").eq(0);
					var $curRow = $(this).parents("tr").eq(0);
					var sign = true;
					if($curRow.find("[cf_editfieldid]").length > 0){
						$curTr = $(this).parents("tr").eq(0);
						var rowData = CForm.getRowData($curTr);
						var cf_modelid = $dynRow.attr("cf_modelid");
						sign = editGridBeforeDelRowCallBack(cf_modelid, rowData);
					}
					if(sign){
						CForm.delRow($dynRow, $curRow);
					}
				});
		
		// 换行
		$(".cfChangeRow").click(
				function(e) {
					$curDynRow = $(this).parents("tbody").eq(0);
					var totalRow = $("tr:visible", $curDynRow).length;
					if (totalRow == 1) {
						alert("只有一行，不能换行！");
						return false;
					}
					$curTr = $(this).parents("tr").eq(0);
					// 清空已有值
					$(".cfChangeRowDiv input").val("");
					// 第一行的行号
					var firstRowNum = $curDynRow.find("tr:visible:first td:first label").text();
					// 最后一行的行号
					var lastRowNum = $curDynRow.find("tr:visible:last td:first label").text();
					// 提示信息
					$(".cfChangeRowDiv .firstRowNum").text(firstRowNum);
					$(".cfChangeRowDiv .lastRowNum").text(lastRowNum);
					$(".cfChangeRowDiv").css({
								"left" : e.pageX - 175 + "px",
								"top" : e.pageY - 100 + "px"
							}).show();
				});
		
		// 取消换行
		$(".cfCancelBtn").click(
				function() {
					$(".cfChangeRowDiv label:eq(1)").text("");
					$(".cfChangeRowDiv").hide();
				});
		
		// 确定换行(将当前行移动到目标行处，并重新设置序号)
		$(".cfConfirmBtn").click(
				function() {
					// 目标行序号(即输入的序号)
					var targetRowNum = parseInt($("#cfRowNumIn").val());
					// 当前页第一行的序号
					var firstRowNum = parseInt($(".cfChangeRowDiv .firstRowNum").text());
					// 当前页最后一行的序号
					var lastRowNum = parseInt($(".cfChangeRowDiv .lastRowNum").text());
					// 目标行号必须介于第一行的序号和最后一行的序号之间
					var $label = $(".cfChangeRowDiv label:eq(1)");
					if(!targetRowNum || targetRowNum < firstRowNum || targetRowNum > lastRowNum) {
						$label.text("请输入" + firstRowNum + "到" + lastRowNum + "之间的整数！");
						return false;
					}
					// 清空提示
					$label.text("");
					// 隐藏设置序号框
					$(".cfChangeRowDiv").hide();
					
					var curRowNum = parseInt($curTr.find("td:first label").text());
					var curRowIndex = curRowNum-firstRowNum;
					
					if(targetRowNum == curRowNum) {
						return;
					}
					
					var targetIndex = targetRowNum-firstRowNum;
					// 记录开始行的索引和结束行的索引，用于序号重排
					var startIndex;
					var endIndex;
					// 换行
					if(targetRowNum < curRowNum) {
						startIndex = targetIndex;
						endIndex = curRowIndex;
						$curTr.insertBefore($("tr:visible:eq(" + targetIndex + ")", $curDynRow));
					} else {
						startIndex = curRowIndex;
						endIndex = targetIndex;
						$curTr.insertAfter($("tr:visible:eq(" + targetIndex + ")", $curDynRow));
					}
					
					// 序号重排，只排列序号发生变动的行，即当前行与目标行之间的行
					$curDynRow.find("tr:visible").slice(startIndex,endIndex+1).each(function(i,tr){
						$(tr).find("td:first label").text(firstRowNum+i+startIndex);
					});
				});
		
		// 行合计
		$(".cfRowSum").click(function(evt) {
			var sumRule = $(this).attr("cf_sumRule");
			if(sumRule){
				var sumRuleArr = sumRule.split("#");
				var operation = "+-*/()";
				for(var i = 0; i < sumRuleArr.length; i++) {
					var sumRuleItem = sumRuleArr[i];
					// sumRuleItem不是操作符
					if(operation.indexOf(sumRuleItem) == -1){
						// 获取同行中该域的值
						var curTr = $(this).parents("tr").eq(0);
						// 校验合计域是否存在
						var $sumF = $("#" + sumRuleItem, curTr);
						if (!$sumF.length) {
							alert("合计域[" + sumRuleItem + "]不存在！");
							sumRuleArr = [];
							return false;
						}
						var fieldValue = CForm.getFieldValue($("#" + sumRuleItem, curTr)[0]);
						if (!fieldValue) {
							fieldValue = 0;
						}
						sumRuleArr[i] = fieldValue;
					}
				}
				var valueExp = sumRuleArr.join("");
				var val = null;
				try {
					val = eval(valueExp);
				} catch (e) {
					alert("合计发生异常！请检查表达式及域值是否合法！");
					return false;
				}
				$(this).val(val);
			}			
		});
		
		// 列合计
		$(".cfColSum").click(function(evt) {
			var sumValue = 0;
			var index = $(this).parent().prevAll().length;
			var $tbody = $(this).parents("table").find("tbody");
			$("tr",$tbody).each(function(){
				var $td = $(this).children().eq(index);
				var fieldValue = $("[cf_elementType=field]", $td).val();
				if(fieldValue){
					sumValue += parseFloat(fieldValue);
				}				
			});
			$(this).val(sumValue);
			
			// 如果是只读模式，需将值显示到页面上
			if($(this).parent().hasClass("cfIsReadonly")){
				$(this).siblings(".readOnlyFieldVal").text(sumValue);
			}
		});
		
		// 增加一行按钮(可编辑列表)
		$(".cfAddEditGrid").click(
			function(){
				dialogState = 1;
				$curDynRow = $(this).parents(".cfEditGrid[cf_elementType=zone]").eq(0);
				gridDialogMap.get($curDynRow.attr("id"))
								.dialog({title: "列表编辑区--新增"});
				//绑定弹窗open回调事件
				gridDialogMap.get($curDynRow.attr("id")).dialog({
					open:function(event, ui) {
						//显示dialog中所有button
						$(".ui-dialog-buttonpane button").show(); 
						editGridDialogOpenCallback(dialogState, event.target);
					}
				});
				//触发弹窗打开
				gridDialogMap.get($curDynRow.attr("id")).dialog("open");
			});
		
		// 修改一行按钮(可编辑列表)
		$(".cfModifyRow").click(
			function(){
				dialogState = 2;
				$curDynRow = $(this).parents(".cfEditGrid[cf_elementType=zone]").eq(0);
				$curTr = $(this).parents("tr").eq(0);
				var rowData = CForm.getRowData($curTr);
				CForm.setEditData(rowData);
				gridDialogMap.get($curDynRow.attr("id"))
								.dialog({title: "列表编辑区--修改"});
				//绑定弹窗open回调事件
				gridDialogMap.get($curDynRow.attr("id")).dialog({
					open:function(event, ui) {
						//显示dialog中所有button
						$(".ui-dialog-buttonpane button").show(); 
						editGridDialogOpenCallback(dialogState, event.target, rowData);
					}
				});
				//触发弹窗打开
				gridDialogMap.get($curDynRow.attr("id")).dialog("open");
				
			});
		
		// 查看(用于可编辑列表在只读模式下时查看数据)
		$(".cfCheckRow").click(
			function(){
				dialogState = 3;
				$curDynRow = $(this).parents(".cfEditGrid[cf_elementType=zone]").eq(0);
				$curTr = $(this).parents("tr").eq(0);
				var rowData = CForm.getRowData($curTr);
				CForm.setEditData(rowData);
				gridDialogMap.get($curDynRow.attr("id"))
								.dialog({title: "列表编辑区--查看"});
				//gridDialogMap.get($curDynRow.attr("id")).dialog({buttons: {}});
				var checkDialog = gridDialogMap.get($curDynRow.attr("id"));
				//绑定弹窗open回调事件
				checkDialog.dialog({
					open:function(event, ui) {
						//隐藏dialog中所有button
						$(".ui-dialog-buttonpane button").hide(); 
						editGridDialogOpenCallback("-1", event.target, rowData);
					}
				});
				checkDialog.dialog("open");
			});
			
		// 处理可编辑列表
		$(".cfEditGrid").each(function(){
			var $grid = $(this);
			// 将第一行隐藏起来，并将状态设置为temp，做为设置实例数据时的模板
			$grid.find("tbody tr:first").hide().attr("cf_recordState","temp");
			
			// 将可编辑列表中的编辑区缓存起来
			var $editDialog = $grid.find(".cfEditGridDialog");
			var btn = '0';
			var datajson;
			// 初始化dialog
			var dialog = $editDialog.dialog({
				autoOpen : false,
				width : "auto",
				modal : true,
				//当dialog关闭时触发。
				close : function(event, ui){
					//点击确定按钮时操作
					if(btn === '1'){
						if(dialogState == 1){
							// 找到当前动态行的第一行，做为模板，以及追加新行的位置
							var $curLastTr = $curDynRow.find(".cfDynRowTable tbody tr").first();
							$curTr = CForm.addRow($curDynRow, $curLastTr).show();
							$($curTr).find("td:first label").text($curDynRow.find(".cfDynRowTable tbody tr:visible").length);
						}
						// 在checkbox和radio后面添加显示值
						$curTr.find(":checkbox, :radio").each(function(){
							$(this).attr("checked", false);
							$(this).after($(this).data("disVal"));
						});
						// 将以前设置只读时加上的<font>value</font>值去掉，否则会重复显示
						$curTr.find("readOnlyFieldVal").remove();
						CForm.setRowData(datajson);
						editGridDialogCloseCallback(dialogState, event.target, datajson);
					}else if(btn === '0'){
						//点击取消按钮时操作
						CForm.resetEditTable();
					}
					//关闭后btn恢复到初始状态
					btn = '0';
					return true;
				},
				//当dialog即将关闭时触发。 如果取消，dialog将不会关闭。
				beforeClose: function (event, ui) {
					var sign = true;
					//点击确定按钮验证
					if(btn === '1'){
						datajson = CForm.getEditData();
						// 如果datajson为false，则说明数据校验未通过
						if(!datajson) {
							sign = false;
						}else {
							sign = editGridDialogBeforeCloseCallback(dialogState, event.target, datajson);
						}
						//如果验证不通过则btn设置到初始状态
						if(!sign){
							btn = '0';
						}
					}
					return sign;
				},
				closeText : "关闭",
				buttons : {
					"确定" : function(){
						btn = '1';
						dialog.dialog("close");
					},
					"取消" : function(){
						btn = '0';
						dialog.dialog("close");
					}
				}
			});
			// 缓存
			gridDialogMap.put($grid.attr("id"),dialog);
		});
		
		// 获取列表区当前行的值
		// 返回值的结构为{编辑域ID：列表域值}
		CForm.getRowData = function(){
			var dataJson = {};
			
			// 获取当前行中，所有与编辑区有映射关系的域
			$curTr.find("[cf_editfieldid]").each(function(i,field){
				// 编辑区的域ID
				var editfieldid = $(field).attr("cf_editfieldid");
				var fieldValue = CForm.getFieldValue(field);
				
				// 兼容checkbox和radio的情况
				var preFieldValue = dataJson[editfieldid];
				if (preFieldValue) {
					fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
				}
				// 组装域值
				if(editfieldid){
					dataJson[editfieldid] = fieldValue;
				}
			});
			
			return dataJson;
		};
		
		// 设置列表区当前行的值
		CForm.setRowData = function(jsonObj){
			// 设置域值
			$curTr.find("[cf_editfieldid]").each(function(i,field){
				// 将以前设置只读时加上的<font>value</font>值去掉，否则会重复显示
				$(field).next("font.readOnlyFieldVal").remove();
				// 获取域值
				var editFieldId = $(field).attr("cf_editfieldid");
				var editFieldValue = jsonObj[editFieldId];
				// 设置域值
				CForm.setFieldValue(field,editFieldValue);
				
				if(field.type == "hidden"){
					return true;
				}
				
				// 可编辑列表中列表区的域都要设置成只读，防止在列表区直接修改数据
				CForm.setFieldReadOnly(field);
				$(this).parent().removeClass("cfIsReadonly");
			});
		};
		
		// 获取编辑区的值
		CForm.getEditData = function() {
			var dataJson = {};
			
			// 当前可编辑列表的编辑区ID为当前可编辑列表的ID后面加上"_dialog"
			var curDialogId = $curDynRow.attr("id")+"_dialog";
			// 编辑区中的所有域
			var $curEditfields = $("#"+curDialogId).find("[cf_elementtype=editField]");
			$curEditfields.each(function(){
				var editFieldId = $(this).attr("id");
				var editFieldValue = CForm.getFieldValue(this);//var editFieldValue = $("#"+editFieldId)[0].value;
				
				// 校验数据
				var isVal = CForm.valEditData(editFieldId, editFieldValue);
				if(!isVal) {
					dataJson = false;
					return false;
				}
				// 兼容checkbox和radio的情况
				var preFieldValue = dataJson[editFieldId];
				if (preFieldValue) {
					editFieldValue = $.trim(editFieldValue) ? preFieldValue + "," + editFieldValue : preFieldValue;
				}
				dataJson[editFieldId] = editFieldValue;
			});
			
			return dataJson;
		};
		
		// 数据校验
		CForm.valEditData = function(editFieldId, value) {
			var $field = $curDynRow.find("[cf_editfieldid="+editFieldId+"]:first");
			var $tipField = $("#" + editFieldId);
			value = $.trim(value);
			var fieldName = $field.attr("name");
			//自定义校验提示信息
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			if(errorMsg){
				$field.attr("cf_errorMsg", errorMsg);
			}
			
			// 非空
			if($field.hasClass("cfIsRequired")) {
				var isValid = true;
				switch ($field.attr("type")) {
					// 列表框
					case "select-multiple":
						// 至少选中一项
						$options = $field.find("option:selected");
						if (!$options.length) {
							isValid = false;
						}
	
						break;
					// 单选按钮
					case "radio":
						// 同一组中至少有一个选中
						$radios = $(":radio[name=" + fieldName + "]:checked");
						if (!$radios.length) {
							isValid = false;
						}
	
						break;
					// 复选框
					case "checkbox":
						// 同一组中至少有一个选中
						$checkboxes = $(":checkbox[name=" + fieldName + "]:checked");
						if (!$checkboxes.length) {
							isValid = false;
						}
	
						break;
					default:
						if (!value) {
							isValid = false;
						}
	
						break;
				}
				
				if(!isValid) {
					//G3.alert("提示", "[" + fieldName + "]不能为空！");
					CForm.showTips($tipField, "cfIsRequired");
					return false;
				}
			}
			
			// 整数
			if($field.hasClass("cfIsInteger")) {
				if (value && !CForm.isInteger(value)) {
					//G3.alert("提示", "[" + fieldName + "]必须为整数！");
					CForm.showTips($tipField, "cfIsInteger");
					return false;
				}
			}
			
			// 小数
			if($field.hasClass("cfIsFloat")) {
				if (value) {
					//先判断是否是整数，如果是整数，直接通过
					if(CForm.isInteger(value)){
						isValid = true;
						return true;
					}
					else if (!CForm.isFloat(value)) {
						//G3.alert("提示", "[" + fieldName + "]必须为小数！");
						CForm.showTips($tipField, "cfIsFloat");
						return false;	
					}else {
						// 精确度校验
						var precision = $field.attr("cf_fieldPrecision");
						if (precision) {
							var floatLength = value.toString().split(".")[1].length;
							if (floatLength > precision) {
								$field.attr("cf_errorMsg", errorMsg.replace("@precision",precision));
								//G3.alert("提示", "[" + fieldName + "]最多"+precision+"位小数！");
								CForm.showTips($tipField, "cfIsFloat", precision);
								return false;
							}
						}
					}
				}
			}
			
			// 邮政编码校验
			if($field.hasClass("cfIsZipCode")){
				if (value && !CForm.isZipCode(value)) {
					//G3.alert("提示", "域[" + fieldName + "]的值不符合电子邮件格式！");
					CForm.showTips($tipField, "cfIsZipCode");
					return false;	
				}
			}
			
			// 电子邮件校验
			if($field.hasClass("cfIsEmail")){
				if (value && !CForm.isEmail(value)) {
					//G3.alert("提示", "域[" + fieldName + "]的值不符合正则表达式规则！");
					CForm.showTips($tipField, "cfIsEmail");
					return false;
				}
			}
			
			// 身份证号校验
			if($field.hasClass("cfIsIdCard")){
				var result = G3.checkIdCard(value);
				if (value && result != true) {
					//G3.alert("提示", "域[" + fieldName + "]:" + result);
					CForm.showTips($tipField, "cfIsIdCard", result);
					return false;
				}
			}
			
			// 固定电话校验
			if($field.hasClass("cfIsPhoneNum")){
				if (value && !CForm.cfIsPhoneNum(value)) {
					//G3.alert("提示", "域[" + fieldName + "]的值不符合固定电话格式！\r如果有区号，请使用[区号-座机号]的形式。");
					CForm.showTips($tipField, "cfIsPhoneNum");
					return false;
				}
			}
		
			// 手机号码校验
			if($field.hasClass("cfIsMobileNum")){
				if (value && !CForm.cfIsMobileNum(value)) {
					//G3.alert("提示", "域[" + fieldName + "]的值不符合手机号码格式！");
					CForm.showTips($tipField, "cfIsMobileNum");
					return false;
				}
			}
			
			// 正则表达式校验
			if($field.hasClass("cfIsRegExp")){
				var reg = $field.attr("cf_regExp");
				if (reg) {
					var val = $.trim(value);
					if(val && !eval(reg).test(val)) {
						//G3.alert("提示", "域[" + fieldName + "]的值不合法！");
						CForm.showTips($tipField, "cfIsRegExp");
						return false;
					}
				}
			}
			
			return true;
		};
		
		// 设置编辑区的值
		CForm.setEditData = function(jsonObj){
			// 当前可编辑列表的编辑区ID为当前可编辑列表的ID后面加上"_dialog"
			var curDialogId = $curDynRow.attr("id")+"_dialog";
			/**
			for(var key in jsonObj){
				$("#"+key).val(jsonObj[key]);
			}
			**/
			 $("#"+curDialogId).find("[cf_elementType=editField]").each(function(i, field){
				var fieldId = field.id;
				var fieldValue = jsonObj[fieldId];
				CForm.setFieldValue(field, fieldValue);
			});
			
			// 如果当前编辑区的状态为3，则表示“查看”状态
			if(dialogState == 3){
				var fields = $("#"+curDialogId).find("[cf_elementType=editField]");
				$.each(fields, function() {
					// 设置域只读
					CForm.setFieldReadOnly(this);
				});
			}
		};
		
		// 清空编辑区
		CForm.resetEditTable = function(){
			// 当前编辑区
			var $curDialog = $("#"+$curDynRow.attr("id")+"_dialog");
			// 清空输入域的值(单选、复选、按钮的值不能清空)
			$curDialog.find(":input[type!=radio][type!=checkbox][type!=button]").each(function(){
				if ($(this).hasClass("cf_hidden")) {
					return;
				}
				$(this).val("");
			});
			// 设置单选按钮为未选中状态，并修改name属性
			//$curDialog.find(":radio").attr({checked: false});
			// 设置复选框为未选中状态
			//$curDialog.find(":checkbox").attr("checked", false);
			$curDialog.find(":checkbox, :radio").each(function(){
				$(this).attr("checked", false);
				$(this).after($(this).data("disVal"));
			});
			// 只读状态下，TD中会有文本，需要移除
			if(dialogState == 3){
				$curDialog.find("font.readOnlyFieldVal").remove();
			}
		}
	};
	
	/**
	 * 动态表格初始化
	 */
	CForm.initDynTable = function() {
		// 加载序号列
		CForm.loadDynTableNum();
		
		// 增加一个表格
		$('.cfAddTable').click(
				function() {
					var $dynTable = $(this).parents(
							".cfDynTable[cf_elementType=zone]").eq(0);
					CForm.addTable($dynTable);
				});

		// 删除一个表格
		$('.cfDelTable').click(
				function() {
					var $dynTable = $(this).parents(
							".cfDynTable[cf_elementType=zone]").eq(0);
					CForm.delTable($dynTable);
				});
	};
	
	/**
	 * 域长度控制初始化
	 */
	CForm.initFieldLengthCtr = function() {
		// 控制text的长度
		$(".cfText").keyup(function(event) {
			var len = parseInt($(this).attr("cf_fieldLength"));
			if(!len) {
				len = 100;
			}		

			var strVal = $(this).val().toString()+"";
		    //预期计数：中文2字节，英文1字节 
		    var a = 0; 
		    //临时字串
		    var temp = ''; 
		    for (var i = 0;i < strVal.length;i ++) 
		    { 
		        if (strVal.charCodeAt(i) > 255)  
		        {
		            //按照预期计数增加2 
		             a+=2; 
		        } 
		        else 
		        { 
		             a++; 
		        } 
		        //如果增加计数后长度大于限定长度，就直接返回临时字符串 
		        if(a > len) {
		        	$(this).val(temp);
		        	CForm.showTips($(this),"cfFieldLimitlength");
					$(this).focus();
		        	return false;
		        } 
		        //将当前内容加到临时字符串 
		        temp += strVal.charAt(i); 
		    } 
		});

		// 控制textarea的长度
		$(".cfTextArea").keyup(function(event) {
			var len = parseInt($(this).attr("cf_fieldLength"));
			if(!len) {
				len = 500;
			}		

			var strVal = $(this).val().toString()+"";
		    //预期计数：中文2字节，英文1字节 
		    var a = 0; 
		    //临时字串
		    var temp = ''; 
		    for (var i = 0;i < strVal.length;i ++) 
		    { 
		        if (strVal.charCodeAt(i) > 255)  
		        {
		            //按照预期计数增加2 
		             a+=2; 
		        } 
		        else 
		        { 
		             a++; 
		        } 
		        //如果增加计数后长度大于限定长度，就直接返回临时字符串 
		        if(a > len) {
		        	$(this).val(temp); 
					CForm.showTips($(this),"cfFieldLimitlength");
					$(this).focus();
		        	return false;
		        } 
		        //将当前内容加到临时字符串 
		        temp += strVal.charAt(i); 
		    }
		});
	};
	
	/**
	 * 多行文本框高度自适应
	 */
	CForm.initAutoHeight = function() {
		$("textarea[cf_elementType=field]").css({
			minHeight: 5,
			maxHeight: 200
		}).autosize({resizeDelay:0});
	};
	
	/**
	 * 通用帮助初始化
	 */
	CForm.initCommonHelp = function() {
		// 组织通用帮助
		$(".cfOrganCommonHelp").click(function(evt) {
			// 选择类型
			var selectType = $(this).attr('cf_selectType');
			// 是否启用数据权限
			var isUseDataPermit = $(this).attr('cf_isUseDataPermit');

			// 调用BSP组织通用帮助
			if (window.selectOrgan) {
				var rtnVal = selectOrgan(selectType, isUseDataPermit);
				if(rtnVal) {
					var organIdStr = rtnVal.organId.join(',');
					var organNameStr = rtnVal.organName.join(',');
					var organIdField = $(this).attr('cf_organIdField');
					var organNameField = $(this).attr('cf_organNameField');
					var curTd = $(this).parent();
					if (!(organIdStr && organIdStr != ',,,,,,,')) {
						organIdStr = organNameStr = '';
					}
					$('#' + organIdField, curTd).val(organIdStr);
					$('#' + organNameField, curTd).val(organNameStr);
				}				
			}
		});
	};
	
	/**
	 * 云表单加载完毕后需要执行的初始化操作
	 */
	CForm.init = function() {
		// 初始化域长度控制
		CForm.initFieldLengthCtr();
		
		// 多行文本框高度自适应
		CForm.initAutoHeight();
		
		// 初始化tab
		if ($(".cfTab li").length) {
			CForm.initTab();
		}

		// 初始化日期、日期时间
		if ($(".cfDateTime,.cfDate").length) {
			CForm.initDate();
		}
		
		// 初始化通用帮助
		if ($(".cfOrganCommonHelp").length) {
			CForm.initCommonHelp();
		}
		
		// 初始化动态行
		if ($(".cfDynRow").length) {
			CForm.initDynRow();
		}
		
		// 初始化动态表格
		if ($(".cfDynTable").length) {
			CForm.initDynTable();
		}
	};
	
})(jQuery);

/**
 * 工具类--Map
 */
(function($) {
	/**
	 * 模拟后台的Map，可构造前台Map对象
	 */
	CForm.Map = function(classname, data) {
		this.javaClass = classname ? classname : "HashMap";// short name
		this.map = data ? data : new Object();
		this.length = this.size();
	};

	CForm.Map.prototype = {

		length : null,
		/**
		 * 把值放入map对象中，比如：data.put(key,value);
		 * 
		 * @method put
		 * @param {String}
		 *            key 键值
		 * @param {Oject}
		 *            value 值
		 */
		put : function(key, value) {
			if (!(this.map[key] || this.map[key] == "")) {
				this.length++;
			}
			this.map[key] = value;
		},
		/**
		 * 根据键值从map对象中取值，比如：var val = data.get(key);
		 * 
		 * @method get
		 * @param {String}
		 *            key 键值
		 * @return {Oject} 值
		 */
		get : function(key) {
			return this.map[key];
		},
		/**
		 * 从map对象中移除指定键值的值，比如：data.remove(key);
		 * 
		 * @method remove
		 * @param {String}
		 *            key 键值
		 * @return {Oject} 移除的对象
		 */
		remove : function(key) {
			var ret = this.map[key];
			if (ret || ret == "") {
				this.length--;
			}
			delete this.map[key];
			
			return ret;
		},
		/**
		 * 获得map对象中值的个数
		 * 
		 * @method size
		 * @return {Int} 长度
		 */
		size : function() {
			if (this.length !== null)
				return this.length;
			this.length = 0;
			for ( var i in this.map) {
				this.length++;
			}
			return this.length;
		},
		/**
		 * 将map对象中所有的值组装为字符串返回
		 * 
		 * @method toString
		 * @return {String} 数据
		 */
		toString : function() {
			var ret = "{";
			var j = 0;
			for ( var i in this.map) {
				ret += i.toString() + ":" + this.get(i).toString();
				if (j++ < this.size() - 1)
					ret += ",";
			}
			ret += "}";
			return ret;
		}
	};
})(jQuery);

/**
 * 工具类--List
 */
(function($) {
	CForm.List = function(classname, data) {
		this.javaClass = classname ? classname : "ArrayList";
		this.list = data ? data : new Array();
	};

	CForm.List.prototype = {
		/**
		 * 把对象添加到list对象中
		 * 
		 * @method add
		 * @param {Oject}
		 *            obj 对象
		 */
		add : function(obj) {
			this.list.push(obj);
		},
		/**
		 * 根据索引得到对象
		 * 
		 * @method get
		 * @param {String}
		 *            index 索引
		 * @return {Oject} 对象
		 */
		get : function(index) {
			var val = this.list[index];
			return val;
		},
		/**
		 * 得到list对象的长度
		 * 
		 * @method size
		 * @return {Int} 长度
		 */
		size : function() {
			return this.list.length;
		},
		/**
		 * 将list对象中的数据转换组装成字符串返回
		 * 
		 * @method toString
		 * @return {String} 数据
		 */
		toString : function() {
			var ret = "[";
			for ( var i = 0; i < this.size(); i++) {
				ret += this.get(i).toString();
				if (i < this.size() - 1)
					ret += ",";
			}
			ret += "]";
			return ret;
		}
	};
})(jQuery);
/**
 * 生成UUID
 * CForm.createUUID()
 * 
*/
(function($){
	function UUID(){
	    this.id = this.createUUID();
	}
	 
	UUID.prototype.valueOf = function(){ return this.id; };
	UUID.prototype.toString = function(){ return this.id; };
	 
	UUID.prototype.createUUID = function(){
	    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	    var dc = new Date();
	    var t = dc.getTime() - dg.getTime();
	    var tl = UUID.getIntegerBits(t,0,31);
	    var tm = UUID.getIntegerBits(t,32,47);
	    var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	    var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
	    var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);
	    var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
	            UUID.getIntegerBits(UUID.rand(8191),8,15) +
	            UUID.getIntegerBits(UUID.rand(8191),0,7) +
	            UUID.getIntegerBits(UUID.rand(8191),8,15) +
	            UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
	    return tl + tm  + thv  + csar + csl + n;
	};
	UUID.getIntegerBits = function(val,start,end){
	 var base16 = UUID.returnBase(val,16);
	 var quadArray = new Array();
	 var quadString = '';
	 var i = 0;
	 for(i=0;i<base16.length;i++){
	     quadArray.push(base16.substring(i,i+1));   
	 }
	 for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
	     if(!quadArray[i] || quadArray[i] == '') quadString += '0';
	     else quadString += quadArray[i];
	 }
	 return quadString;
	};
	UUID.returnBase = function(number, base){
	 return (number).toString(base).toUpperCase();
	};
	 
	UUID.rand = function(max){
	 return Math.floor(Math.random() * (max + 1));
	};
	CForm.createUUID=function(){
		return new UUID();
	};
})(jQuery);

/**
 * 渲染表单内容(html)
 */
function renderHtml() {
	var htmlCfg = {
		url : htmlUrl,
		success : loadHtml,
		async : true
	};

	//$.ajax(htmlCfg);
	mui.ajax(htmlCfg);
}

/**
 * 加载表单内容(html)
 * 
 * @param data
 * @param textStatus
 */
function loadHtml(data, textStatus) {
	// 添加云表单
	$("#htmlContainer").append(data);
	
	// 云表单加载完毕后需要执行的初始化操作
	CForm.init();
	
	// 渲单表单
	renderForm();
}

/**
 * 渲染表单
 */
function renderForm() {
	var formCfg = {
			url : formRenderUrl,
			success : loadForm,
			async : true
		};

	//$.ajax(formCfg);
	mui.ajax(formCfg);
}

/**
 * 加载表单
 * 
 * @param data
 * @param textStatus
 */
function loadForm(data, textStatus) {
	if (!data) {
		return;
	}
	console.log("加载表单"+JSON.stringify(data));
	var o = null;
	try {
		o = eval("(" + data + ")");
	} catch (e) {
		alert("加载表单出现异常!");
	}
	
	// 数据绑定
	loadDatasBind(o["dataBind"]);
	
	// 监听子表单数据加载完成事件，必须放在loadFormData调用之前
	CForm.on("afterLoadSubFormData", function(){
		// 表单域权限控制
		loadActFormAcl(o["formAcl"]);
		
		// 触发数据加载完成事件
		CForm.trigger("afterLoadFormData");
	});
	
	// 表单数据
	loadFormsData(o["formData"]);
}

/**
 * 加载数据绑定
 * 
 * @param dataBind
 */
function loadDataBind(dataBind) {
	if (!dataBind) {
		return;
	}
	var o = null;
	try {
		o = eval("(" + dataBind + ")");
	} catch (e) {
		alert("加载数据绑定出现异常!");
	}
	
	// 设置数据绑定
	CForm.setDataBindByFieldId($("[cf_elementType=form]")[0], o);
}

/**
 * 加载表单组的数据绑定
 * @param {} dataBind
 */
function loadDatasBind(dataBind){
	if (!dataBind) {
		return;
	}
	var o = null;
	try {
		o = eval("(" + dataBind + ")");
	} catch (e) {
		alert("加载数据绑定出现异常!");
	}
	
	var forms = $("[cf_elementType=form]");
	// 设置数据绑定
	for(var i=0;i<forms.length;i++){
		var formId = $(forms[i]).attr("id");
		CForm.setDataBindByFieldId(forms[i], o[formId]);
	}
}

/**
 * 加载表单数据
 * 
 * @param formData
 */
function loadFormData(formData) {
	if (!formData) {
		CForm.trigger("afterLoadSubFormData");
		// 设置表单已初始化
		CForm.isInitialized = true;
		return;
	}
	var o = null;
	try {
		o = eval("(" + formData + ")");
	} catch (e) {
		alert("加载表单数据出现异常!");
	}
	
	// 设置表单数据
	CForm.setFormData($("[cf_elementType=form]")[0], o);
}

/**
 * 加载表单组数据
 * @param {} formData
 */
function loadFormsData(formData){
	if (!formData) {
		CForm.trigger("afterLoadSubFormData");
		// 设置表单已初始化
		CForm.isInitialized = true;
		return;
	}
	var o = null;
	try {
		o = eval("(" + formData + ")");
	} catch (e) {
		alert("加载表单数据出现异常!");
	}
	var forms = $("[cf_elementType=form]");
	// 设置表单组数据
	//山东市场局老OA修改
	if(forms.length==1){
		var formId = $(forms[0]).attr("id");
		var formData = o;
		CForm.setFormData(forms[0], formData);
	}else{
		for(var i=0;i<forms.length;i++){
			var formId = $(forms[i]).attr("id");
			var formData = eval("(" + o[formId] + ")");
			CForm.setFormData(forms[i], formData);
		}
	}
}

/**
 * 加载环节关联表单域控制
 * 
 * @param formAcl
 */
function loadActFormAcl(formAcl) {
	// 不管是否设置域权限控制，已办、办结、监控任务的表单域都设置为只读
	if (taskType == '2' || taskType == '3' || taskType == '4') {
		// 将表单所有可见域设置为只读
		CForm.setFormReadOnly($("[cf_elementType=form]")[0]);
	}

	if (!formAcl) {
		return;
	}
	var o = null;
	try {
		o = eval("(" + formAcl + ")");
	} catch (e) {
		alert("加载表单域权限控制出现异常!");
	}
	
	// 新建、待办任务——>只读、必填
	if (taskType == '0' || taskType == '1') {
		// 对所有表单域操作
		$.each($("[cf_elementType=field]"), function() {
			var fieldObj = o[$(this).attr("id")];
			if (fieldObj) {
				/**
				 * 是否只读
				 */
				if (fieldObj.isReadOnly == "true") {
					if($(this).attr("type") == "button") {
						$(this).hide();
					}else{
						// 将可见域设置为只读
						CForm.setFieldReadOnly(this);
					}
				}
				/**
				 * 是否必填
				 */
				if (fieldObj.isRequired == "true") {
					// 是否可见
					if ($(this).css("display") != "none") {
						// 可见，添加必填符号
						addIsRequiredSign(this);
					}					

					// 添加样式类，用于校验
					$(this).addClass("cfIsRequired");
				}
			}
		});
	}

	// 区域隐藏
	$.each($("[cf_elementType=zone]"), function() {
		var zoneId = $(this).attr("id");
		// 如果返回的域权限控制字符串中有区域ID，则隐藏
		if (o[zoneId]) {
			// addClass("cfHideTr")是为了兼容ie，ie下会有多余横线
			$(this).addClass("cfHideTr").hide();
		}
	});
	
	// 处理域权限控制中被设置成“隐藏”的域
	// 首先获取所有可见域（即类型不是隐藏，并且状态也不是隐藏，兼容有“选项卡”组件的情况，不能用:visible进行筛选）
	var $visibleInputs = $("[cf_elementType=field][type!=hidden]").not("[style*='display: none']");
	$visibleInputs.each(function(i,visibleInput){
		var fieldObj = o[$(visibleInput).attr("id")];
		if (fieldObj) {
			/**
			 * 是否隐藏
			 */
			if (fieldObj.isHidden == "true") {
				// 隐藏当前域
				$(visibleInput).hide();
				
				var $td = $(visibleInput).closest("td");
				// 如果当前单元格内的域全部隐藏
				//if (!$td.find(":input[type!=hidden]").not("[style*='display: none']").length) {//此写法在IE8\IE9下存在问题
				if (!$td.find(":input[type!=hidden]:visible").length) {
					// 1、隐藏当前单元格，并添加空单元格
					var $newNullTd = $td.clone().empty();
					$td.hide().after($newNullTd);
					// 2、非动态行的情况下，判断是否需要隐藏前一单元格
					if (!$td.parents(".cfDynRow").length) {
						var $pTd = $(visibleInput).closest("td").prev("td");
						if ($pTd.length) {
							//var $vInputs = $pTd.find(":input[type!=hidden]").not("[style*='display: none']");
							var $vInputs = $pTd.find(":input[type!=hidden]:visible");
							if (!$vInputs.length) {
								var $newNullPTd = $pTd.clone().empty();
								$pTd.hide().after($newNullPTd);
							}
						}
					}
				}
				
				var $tr = $(visibleInput).parents("tr").eq(0);
				var $trField = $tr.find(":input[type!=hidden]").not("[style*='display: none']");
				var $trfont = $tr.find("font.readOnlyFieldVal");
				//如果该行内没有只读或者显示控件，则隐藏该行
				if (!$trField.length && !$trfont.length) {
					$tr.hide();
					// 解决ie多余线条问题
					$tr.children().hide();
				}
			}
		}
	});
	
	// 针对动态行操作按钮隐藏的特殊处理
	$(".cfDynRow").each(function(i,dynRow){
		var dynRowId = $(dynRow).attr("id");
		// 如果整个动态行都被隐藏，则不需要再判断操作按钮是否隐藏了
		if (o[dynRowId]) {
			return true;
		}
		var noVisible = true;
		// 动态行每一行的操作按钮都是同时显示或隐藏，所以只需判断第一个操作列的td中的按钮即可
		var oeprationTd = $(dynRow).find(".cfDynRowTable tbody .cfAddAndDelTd:first");
		var visibleInputs = $(oeprationTd).find(":input[type!=hidden]").not("[style*='display: none']");
		
		// 如果在域权限控制中将操作列中的所有按钮都隐藏，则将整个操作列都隐藏
		if(!visibleInputs.length){
			// 隐藏所有操作列td
			$(dynRow).find(".cfDynRowTable tbody .cfAddAndDelTd").hide();
			// 隐藏操作列th
			$(dynRow).find(".cfDynRowTable th:last").hide();
			$(dynRow).find(".cfDynRowTable tfoot .cfAddAndDelTd").hide();
		}
	});
}

// 添加必填符号
function addIsRequiredSign(field) {
	// 动态行
	if($(field).closest(".cfDynRow").length > 0) {
		var $dynRow = $(field).closest(".cfDynRow");
		
		var index = $(field).closest("td").index();
		var $th = $dynRow.find("thead th").eq(index);
		// 只在动态行的表头上添加必填符号
		if ($th.find("font.isRequiredSign").length < 1) {
			$th.append('<font class="isRequiredSign">*</font>');
		}
		
		// 如果是可编辑列表，在编辑区加上必填符号
		if($dynRow.hasClass("cfEditGrid")) {
			var editFieldId = $(field).attr("cf_editfieldid");
			var $editField = $("#" + editFieldId);
			// 文本域
			var $td = $editField.parent("td").prev("td");
			
			// 如果当前输入域前面有td，并且该td中没有星号*
			if($td.length > 0 && $td.find("font.isRequiredSign").length < 1) {
				$td.append('<font class="isRequiredSign">*</font>');
			}
		}
	}else{
		// 文本域
		var $td = $(field).closest("td").prev("td");
		if($td.length > 0 && $td.find("font.isRequiredSign").length < 1) {
			$td.append('<font class="isRequiredSign">*</font>');
		}
	}
}
/**
 * 基于L5的日期时间框
 * @param dateTime
 */
function CFormDateTime() {
	$(".cfDateTime").click(function() {
		LoushangDatetime(this);
		$(this).focus();
	});
}

/**
 * 基于L5的日期框
 * @param date
 */
function CFormDate(date) {
	$(".cfDate").click(function() {
		LoushangDate(this);
		$(this).focus();
	});
}
function LoushangDatetime(obj){
	var format = "yyyy-mm-dd H:i:s";
	if($(obj).attr("format")){
		var cformFormat = $(obj).attr("format");
		if(cformFormat === "Y-m-d H:i:s"){
			format = "yyyy-mm-dd hh:ii:ss";
		} else if(cformFormat === "Y/m/d H:i:s"){
			format = "yyyy/mm/dd hh:ii:ss";
		} else if(cformFormat === "Ymd H:i:s"){
			format = "yyyymmdd hh:ii:ss";
		} else {
			format = $(obj).attr("format");
		}
	}
	var Position="bottom-left";
	if((document.body.clientHeight-$(obj).offset().top)<260){
		Position="top-left";
	}
	$(obj).datetimepicker({
		minView: "hour", //选择日期后，不会再跳转去选择时分秒
		format: format, //选择日期后，文本框显示的日期格式
		language: 'zh-CN', //汉化
		forceParse:false,
		pickerPosition: Position,
		autoclose:true //选择日期后自动关闭
	});
	//点击显示日期框，关闭的时候根据是否选填数据删除校验信息
	$(obj).datetimepicker('show').on("hide",function(){
		if($(obj).val()){
			$(obj).removeClass("input_erore");
			$(obj).popover('destroy');
			$(obj).nextAll("div.popover,.fade,.top").remove();
		}
		$(this).datetimepicker('remove');
	});
}
function LoushangDate(obj){
	var format = "yyyy-mm-dd";
	if($(obj).attr("format")){
		var cformFormat = $(obj).attr("format");
		if(cformFormat === "Y-m-d"){
			format = "yyyy-mm-dd";
		} else if(cformFormat === "Y/m/d"){
			format = "yyyy/mm/dd";
		} else if(cformFormat === "Ymd"){
			format = "yyyymmdd";
		} else {
			format = $(obj).attr("format");
		}
	}
	var Position="bottom-left";
	if((document.body.clientHeight-$(obj).offset().top)<260){
		Position="top-left";
	}
	$(obj).datetimepicker({
		pickerPosition: Position,
		minView: "month", //选择日期后，不会再跳转去选择时分秒
		format: format, //选择日期后，文本框显示的日期格式
		language: 'zh-CN', //汉化
		forceParse:false,
		autoclose:true //选择日期后自动关闭
	});
	//点击显示日期框，关闭的时候根据是否选填数据删除校验信息
	$(obj).datetimepicker('show').on("hide",function(){
		if($(obj).val()){
			$(obj).removeClass("input_erore");
			$(obj).popover('destroy');
			$(obj).nextAll("div.popover,.fade,.top").remove();
		}
		$(this).datetimepicker('remove');
	});
}
/**
 * 组织通用帮助
 * @param {String} selectType 选择类型
 * @param {String} isUseDataPermit 是否启用数据权限控制
 */
function selectOrgan(fieldIdObj, fieldNameObj, selectType, isUseDataPermit) {
	var G3_webPath = G3.frontStatic.bspUrl+"/jsp/public/help/help.jsp?rootId=1";
	var url;

	// 返回值
	var rtnObj = {
		organId : [],
		organName : []
	};
	var currentLoginUserId = '';
	switch (selectType) {
	//选择人员(单选)
	case "80":
		if (isUseDataPermit === "1") {
			//进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=8&isCheckBox=0&returnValueType=array&userId="
					+ currentLoginUserId;
		} else {
			//不进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=8&isCheckBox=0&returnValueType=array";
		}

		G3.showModalDialog("组织机构", url, {width:900, height:500}, function(e, ret){
			if (!ret) {
				return;
			}
			$(fieldIdObj).val(ret[0][0]);
			$(fieldNameObj).val(ret[0][1]);
		});
		break;
	//选择人员(复选)
	case "81":
		if (isUseDataPermit === "1") {
			//进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=8&isCheckBox=1&returnValueType=array&userId="
					+ currentLoginUserId;
		} else {
			//不进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=8&isCheckBox=1&returnValueType=array";
		}

		G3.showModalDialog("组织机构", url, {width:900, height:500}, function(e, ret){
			if (!ret) {
				return;
			}
			for ( var i = 0; i < ret.length; i++) {
				rtnObj.organId.push(ret[i][0]);
				rtnObj.organName.push(ret[i][1]);
			}
			var organIdStr = rtnObj.organId.join(',');
			var organNameStr = rtnObj.organName.join(',');
			$(fieldIdObj).val(organIdStr);
			$(fieldNameObj).val(organNameStr);
		});

		break;
	//选择部门(单选)
	case "60":

		if (isUseDataPermit === "1") {
			//进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=1,2&showOrganType=1,2&isCheckBox=0&returnValueType=array&userId="
					+ currentLoginUserId;
		} else {
			//不进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=1,2&showOrganType=1,2&isCheckBox=0&returnValueType=array";
		}

		G3.showModalDialog("组织机构", url, {width:900, height:500}, function(e, ret){
			if (!ret) {
				return;
			}
			$(fieldIdObj).val(ret[0][0]);
			$(fieldNameObj).val(ret[0][1]);
		});
		break;
	//选择部门(复选)
	case "61":
		if (isUseDataPermit === "1") {
			//进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=1,2&showOrganType=1,2&isCheckBox=1&returnValueType=array&userId="
					+ currentLoginUserId;
		} else {
			//不进行数据权限控制
			url = G3_webPath
					+ "&helpCode=gcloud_organhelp&rootId=rootId&organType=1,2&showOrganType=1,2&isCheckBox=1&returnValueType=array";
		}

		G3.showModalDialog("组织机构", url, {width:900, height:500}, function(e, ret){
			if (!ret) {
				return;
			}
			for ( var i = 0; i < ret.length; i++) {
				rtnObj.organId.push(ret[i][0]);
				rtnObj.organName.push(ret[i][1]);
			}
			var organIdStr = rtnObj.organId.join(',');
			var organNameStr = rtnObj.organName.join(',');
			$(fieldIdObj).val(organIdStr);
			$(fieldNameObj).val(organNameStr);
		});
		break;
	default:
		break;
	}
}


/**
 * 显示表单组明细，隐藏表单导航，显示所有表单明细
 * **/
function formGroupDetailShow(){
	//隐藏导航标题
	$("form").find(".cfNavForm .flow_steps").hide();
	//显示表单标题
	$("form").find(".cfNavForm .formcon .navDivLabel").show();
	//显示所有的表单容器
	$("form").find(".cfNavForm .formcon .navDiv").show();
	//隐藏下一步、上一步的
	$("form").find(".cfNavForm .toolDiv").hide();
}

/**
 * 上传文件
 */
function showUploadFileWindow(obj) {
    // 文件ID
    var fieldId = $(obj).attr('id');

    var $fileId = $("#"+fieldId +"_FILE_ID");

    var $fileIdVal = $fileId.val();

    var url = G3.frontStatic.cformUrl +"/jsp/gcloud/cform/uploadFile/uploadFile.jsp?fileId="+$fileIdVal;

    G3.showModalDialog("上传文件",url,{width:"600px",height:"300px"},function(e,ret){
        if(ret === undefined) {
            return;
        }

        $fileId.val(ret);

        var imageUrl = "";
        if(ret !== ""){
            //返回
            imageUrl = G3.frontStatic.cformUrl+"/command/dispatcher/com.inspur.gcloud.cform.gfile.cmd.GCFormFileShowCommand?fileId="+ret+"&" + (new Date()).getTime();
        }

        var $image = $("#"+fieldId+"_IMG_ID");
        $image.attr("src",imageUrl);
    });
}

/**
 * 获取流水号编号
 * @param obj 触发事件的按钮对象
 * @param inputFieldId : input框id
 */
function getSeriNumber(obj, inputFieldId){
	// 获取流水号类型
	var seriNumType = $("#"+inputFieldId).attr("cf_seri_num_type");
	
	var isCreateNum = $("#"+inputFieldId).attr("cf_is_create_num");
	// 获取sc弹出选择流水号的页面
	var url = G3.frontStatic.serverUrl + G3.frontStatic.bspUrl + "/jsp/public/help/help.jsp?helpCode=sc_selectEDocNumHelp&sernumtype="+seriNumType;
	
	if(isCreateNum == "1"){
		url += "&returnData=preNumberCode";
	}
    // 弹框
	G3.showModalDialog("选择流水号",url,{width:"800px",height:"500px"},function(e,ret){
    	if(ret === undefined || ret==='0') {
            return;
        }
    	if(ret === '-1'){
    		//清除数据
    		$(obj).prev("#"+inputFieldId).val("");
    		$("#"+inputFieldId).removeAttr("cf_sernumber_pre");
    		$("#"+inputFieldId).removeAttr("cf_sernumber_code");
    	}else{
    		//选择数据
    		if(isCreateNum==="1"){
    			$("#"+inputFieldId).attr("cf_sernumber_pre", ret.split(",")[0]);
    			$("#"+inputFieldId).attr("cf_sernumber_code", ret.split(",")[1]);
    			$(obj).prev("#"+inputFieldId).val(ret.split(",")[0]);
    			$("#"+inputFieldId+"_hidden").val(ret.split(",")[1]);
    			$("#"+inputFieldId+"_btn1").show();
    		}else{
    			$(obj).prev("#"+inputFieldId).val(ret);
    			$("#"+inputFieldId+"_hidden").val(ret.split(",")[1]);
    		}
    	}
    });
}

/**
 * 获取流水号编号
 * @param obj 触发事件的按钮对象
 * @param inputFieldId : input框id
 */
function getSeriNumberVal(obj, inputFieldId){
	//var serNumber = $("#"+inputFieldId).attr("cf_sernumber_code");
	var serNumber = $("#"+inputFieldId+"_hidden").val();
	if(serNumber){
		var sn = serNumber.split(";");
		if(sn.length > 1){
			G3.alert("提示","流水号不可重复获取");
		}else{
			var cmd = new G3.Command("com.inspur.gcloud.sc.sernumber.cmd.SerNumberQueryCommand");
			cmd.appPath =  G3.frontStatic.settingscenterUrl;
			cmd.setParameter("serNumber", serNumber);
			cmd.execute("getSerNumber");
			if(!cmd.error){
				var ret = cmd.getData();
				if(ret.length>0){
					if(ret[0].serNum!='' && ret[0].serNum!='null' && ret[0].serNum!=null){
						$("#"+inputFieldId).val(ret[0].serNum);
						$("#"+inputFieldId+"_hidden").val(serNumber+";"+ret[0].serNum);
						$(obj).hide();
					}else{
						G3.alert("提示","获取失败");
					}
				}else{
					G3.alert("提示","获取失败");
				}
			}else{
				G3.alert("提示","获取失败");
			} 	
		}
		
	}else{
		G3.alert("提示","请先选择流水号！");
	}
	return;
}

/**
 * 获取字典
 * @param obj 触发事件的按钮对象
 */
function getDictItems(obj){
	// 按钮的Id 实际为文本域ID+_btn
	var btnId = $(obj).attr("id");
	// 文本域ID
	var inputFieldId = btnId.substring(0, btnId.indexOf("_btn"));
	// 隐藏字典id文本框的Id值
	var inputFieldHidId = inputFieldId + "_ID";
	// 字典编码
	var dictCode = $("#"+inputFieldId).attr("cf_dict_code");
	// 显示为列表或者树形
	var listOrTree = $("#"+inputFieldId).attr("cf_list_or_tree");
	// 返回类型 0:返回选中节点,1：返回子节点-父节点,-1：返回子节点-父节点-...-n父节点
	var returnType = $("#"+inputFieldId).attr("cf_return_type");
	// 显示为单选或复选
	var rdoOrChk = $("#"+inputFieldId).attr("cf_rdo_or_chk");

	var isOnlySelectLeaf = $("#"+inputFieldId).attr("cf_is_only_select_leaf");
	var url;
	var codes='',values='';
	var returnValue = $("#"+inputFieldHidId).val();
	if(listOrTree === 'list'){
		rdoOrChk = rdoOrChk==='rdo'?'radio':'checkbox';
		url = G3.frontStatic.serverUrl+G3.frontStatic.bspUrl+"/jsp/public/help/help.jsp?helpCode=dictSelectHelpCode&dictCode="+dictCode+"&boxType="+rdoOrChk+"&selectType=true";
		// 弹框
		G3.showModalDialog("选择字典",url,{width:"800px",height:"500px"},function(e,ret){
	    	if(ret === undefined || ret==='0') {
	            return;
	        }
	    	if(ret === '-1'){
	    		//清除数据
	    		$(obj).siblings("#"+inputFieldHidId).val("");
	    		$(obj).prev("#"+inputFieldId).val("");
	    	}else{
	    		var arr = ret.split("##");
	    		for(var i=0;i<arr.length;i++){
	    			codes += arr[i].split(",")[0] + ',';
	    			values += arr[i].split(",")[1] + ',';
	    		}
	    		codes = codes.substring(0, codes.length-1);
	    		values = values.substring(0, values.length-1);
	    		//选择数据
	    		$(obj).siblings("#"+inputFieldHidId).val(codes);
	    		$(obj).prev("#"+inputFieldId).val(values);
	    	}
	    });
	}else if(listOrTree === 'tree'){
		rdoOrChk = rdoOrChk==='rdo'?'0':'1';
		url = G3.frontStatic.serverUrl+G3.frontStatic.bspUrl+"/jsp/public/help/help.jsp?helpCode=dictTreeCode&dictCode="+dictCode+"&isCheckBox="+rdoOrChk;
		if(returnType !== '0'){
			url+='&returnValueFormat='+returnType;
		}
		if(isOnlySelectLeaf==="1"){
			url+='&isOnlySelectLeaf='+isOnlySelectLeaf;
		}
		if(returnValue){
			url+='&returnValue='+returnValue;
		}
		// 弹框
		G3.showModalDialog("选择字典",url,{width:"800px",height:"500px"},function(e,ret){
	    	if(ret === undefined || ret === '0') {
	            return;
	        }
	    	if(ret === '-1'){
	    		//清除数据
	    		$(obj).siblings("#"+inputFieldHidId).val('');
	    		$(obj).prev("#"+inputFieldId).val('');
	    	}else{
	    		var codestr = ret.substring(0, ret.indexOf(";"));
	    		var valuestr = ret.substring(ret.indexOf(";")+1, ret.length);
	    		var codearr = codestr.split("#");
	    		var valuearr = valuestr.split("#");
	    		for(var i=0;i<codearr.length;i++){
	    			codes += codearr[i] + ",";
	    		}
	    		for(var j=0; j<valuearr.length; j++){
	    			values += valuearr[j] + ",";
	    		}
	    		codes = codes.substring(0, codes.length-1);
	    		values = values.substring(0, values.length-1);
	    		//选择数据
	    		$(obj).siblings("#"+inputFieldHidId).val(codes);
	    		$(obj).prev("#"+inputFieldId).val(values);
	    	}
	    });
	}
}

/***
 * 加载办理记录
 * @param ObjID 办理记录表格id
 * @param param 办理记录查询参数
 * **/
function loadBanLiJiLu(ObjID, param){
	// 判断表单中有没有办理记录组件
	if ( $("#"+ObjID).length > 0 ) {
		// step1:去除表格的边框,并给表增加新的样式
		var str = ObjID.split("_");
		//办理记录表格的索引
		var num = str[1];
		$("#"+ObjID).removeAttr("style"); /**ie,ff均支持***/
		$("#"+ObjID).parent("td").css("padding", "0");
		$("#"+ObjID).css("width", "100%");
		$("#"+ObjID).css("margin", "0");
		// step2：遍历td取出class=cfBljl的input的id和value存入数组
		var inputId = [];//存放id
		var inputValue = [];//存放表头名称
		var title = "BanLiJiLuTableTitle_"+num;
	    $("#"+title+" td").each(function(i){
	    	var input = $(this).find("input.cfBljl");
	    	//获取Input的id属性值
            var id = input.attr("id");
            //获取Input的value属性值
            var value = input.attr("value");
            inputId[i] = id.split("-")[0];
            inputValue[i] = value;
            //增加表头
            $("#"+id).before(value);
            //删除input框
		    $("#"+id).remove();
	    });
	    // 未创建 ：不执行数据加载, 已创建 ：加载数据
		if(!processId) {
			setTblNoBorder(ObjID);
			return;
		}
		// 传递参数，并执行command方法
		var command = new G3.Command("com.inspur.gcloud.formopinion.cmd.FormOpinionQueryCommand", G3.frontStatic.bpmUrl);
		command.setParameter("processId", processId);
		if(param){
			var json = G3.JSON.decode(param);
			command.setParameter("param", json);
		}
		command.execute("queryFormOpinion");
		if (!command.error) {
			// 取得返回结果
		    var resultList = command.getReturn("resultList");
			// 最终向表单加载的html
			var html = "";
		    // step4:遍历返回值，根据数据行数组装html
		    for(var j = 0; j < resultList.size(); j++){
				var newRecord = resultList.get(j);
				if(j%2 === 0){
					//偶数行
					html=html+'<tr onmouseover="javascript:this.style.backgroundColor=\'#ffffff\';" onmouseout="javascript:this.style.backgroundColor=\'#ffffff\';">';
				}else{
					//奇数行
					html=html+'<tr onmouseover="javascript:this.style.backgroundColor=\'#f5f5f5";\' onmouseout="javascript:this.style.backgroundColor=\'#ffffff\';">';
				}
			    for(var n=0; n < inputId.length; n++){
					// 获取数据，并判断是否为null
			    	var data = newRecord[inputId[n]];
			    	if(data == null){
			    		data = "";
			    	}
			    	html = html + "<td class=\"cfFieldInput\">" + data + "</td>";
			    }
			    html = html+"</tr>";
		    }
		    // step5:将数据html追加在表格后面
		    if(html){
		    	$("#BanLiJiLuTableContent_"+num).remove();
			    $("#BanLiJiLuTableTitle_"+num).after(html);
		    }
		    setTblNoBorder(ObjID);
	   } else{
		   //加载数据异常时 提示并隐藏记录表格
		   $("#"+ObjID).hide();
		   G3.alert("提示", "办理记录加载失败！");
	   }
	}
}

/**
 * 去掉表格的外边框，保留内边框
 * */
function setTblNoBorder(tblid){
	var oTbl=$("td #"+tblid);
	oTbl.find("tr:first >td").css("border-top","none");//去掉上边框
	oTbl.find("tr:last >td").css("border-bottom","none");//去掉下边框
	oTbl.find("tr >td:first-child").css("border-left","none");//去掉左边框
	oTbl.find("tr >td:last-child").css("border-right","none");//去掉右边框
}


/**
 * 运行时表单静态类
 *
 */
(function($) {
	if (typeof CForm_Ext === "undefined") {
		CForm_Ext = {};
	}

	CForm_Ext.getFormData = function(byAttr) {

		var map = CForm_Ext.getFormFieldData($("form[cf_elementType=form]"),
				byAttr);
		return map;
	};

	/**
	 * 获得页面上所有的表单数据
	 *
	 * @returns CForm.List，每一项为一个CForm.Map
	 */
	CForm_Ext.getAllFormData = function(byAttr) {
		var list = new CForm.List();
		var forms = $("[cf_elementType=form]");
		var mainMap = CForm_Ext.getFormFieldData(forms.eq(0), byAttr);
		mainMap.put("formId", $(forms.eq(0)).attr("id"));
		list.add(mainMap);
		// 组装表单组的子表单数据
		for(var i = 1;i<forms.length;i++){
			var map = CForm_Ext.getFormFieldData(forms.eq(i), byAttr);
			map.put("formId", $(forms.eq(i)).attr("id"));

			list.add(map);
		}

		return list;
	};

	/**
	 * 获得页面上所有的表单数据-打印
	 *
	 * @returns CForm.List，每一项为一个CForm.Map
	 */
	CForm_Ext.getAllFormDataForPrint = function(byAttr) {
		return CForm_Ext.getAllFormData(byAttr);
	};

	/***************************************************************************
	 * 获取表单域对应的值
	 *
	 * @param form
	 *            表单
	 * @param byAttr
	 *            查询类型
	 * @returns
	 **************************************************************************/
	CForm_Ext.getFormFieldData = function(form, byAttr) {
		// 字段 类型
		byAttr = byAttr ? byAttr : 'cf_modelItemId';
		// 查询表单
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		//
		if ($form.length <= 0) {
			G3.alert("提示", "请指定要要获得数据的表单!");
			return;
		}
		// 定义集合，存放表单域数据
		var list = new CForm.List();
		//
		var map = new CForm.Map();
		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelId]");
		// 具有modelItemId的所有域
		var fields = $form.find("[" + byAttr + "]");
		var checkMap = new CForm.Map();
		// 组装主表单数据
		$.each(fields, function(i, field) {
			if ($dynRows.find(field).length || $(field).closest("[cf_elementType=form]").attr("id") !== $form.attr("id")) {
				return;
			}
			var modelItemId = $(field).attr("" + byAttr);
			if (modelItemId) {
				// 处理一个域绑定多个业务模型的情况
				var modelArray = modelItemId.split("#");
				for (var i = 0; i < modelArray.length; i++) {
					// 判断是否重复
					var id = checkMap.get(modelItemId);
					if (!id) {
						// 域的值
						var fieldValue = CForm_Ext.getFieldValue(field);
						// 域的类型
						var fieldType = CForm_Ext.getFieldType(field);
						// 域的text
						var fieldText = CForm_Ext.getFieldText(field);
						// 域的所有选项
						var fieldOptions = CForm_Ext.getFieldOptions(field);

						var fieldMap = new CForm.Map();
						fieldMap.put("modelItemId", modelItemId);
						fieldMap.put("value", fieldValue);
						fieldMap.put("fieldText", fieldText);
						fieldMap.put("fieldType", fieldType);
						fieldMap.put("fieldOptions", fieldOptions);
						checkMap.put(modelItemId, modelItemId);
						// 存入集合
						list.add(fieldMap);
					}
				}
			}
		});
		map.put($(form).attr("id"), list);

		// 组装动态行数据
		$.each($dynRows, function(i, dynRow) {
			if ($(dynRow).closest("[cf_elementType=form]").attr("id") !== $form.attr("id"))
				return;
			// 动态行标题及数据信息
			var dynRowMap = new CForm.Map();
			// 存放动态行的各行数据
			var dynRowRows = new CForm.List();
			// 动态行标题列
			var dynRowSubjects = new CForm.List();
			var $trs = $('tbody tr[cf_recordState][cf_recordState!=temp][cf_recordState!=2]', dynRow);
			var $subjectTds = $("thead tr th:not(':first,:last')", dynRow);

			$.each($trs, function(j, tr) {

				var rowDataList = new CForm.List();

				var $fields = $(tr).find('[' + byAttr + ']');

				$.each($fields, function(k, field) {

					var rowData = new CForm.Map();

					var fieldValue = CForm.getFieldValue(field);

					// 若已有数据，则用","间隔各个数据
					var preFieldValue = rowData.get(field.id);
					if (preFieldValue) {
						fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
					}

					var modelItemId = $(field).attr(byAttr + "");
					// 域的类型
					var fieldType = CForm_Ext.getFieldType(field);
					// 域的text
					var fieldText = CForm_Ext.getFieldText(field);
					// 域的所有选项
					var fieldOptions = CForm_Ext.getFieldOptions(field);

					rowData.put("modelItemId", modelItemId);
					rowData.put("value", fieldValue);
					rowData.put("fieldText", fieldText);
					rowData.put("fieldType", fieldType);
					rowData.put("fieldOptions", fieldOptions);

					rowDataList.add(rowData);
				});

				dynRowRows.add(rowDataList);
			});

			$.each($subjectTds, function(j, td) {
				dynRowSubjects.add($(td).text());
			});

			dynRowMap.put("data", dynRowRows);
			dynRowMap.put("subject", dynRowSubjects);
			// 当数据模型为业务含义时，不获取动态行数据(因主体需求，暂时放开,先根据别名取，如果没有别名的话，则不取动态行数据（满足刘功胜文书打印，key重复问题）)
			var dynRowkey = dynRow.id;
			if(byAttr === "cf_bizmean"){
				var aliasName = $(dynRow).attr("cf_alias");
				if(aliasName){
					dynRowkey = aliasName;
					map.put(dynRowkey, dynRowMap);
				}
			}
			if(byAttr !== "cf_bizmean"){
				map.put(dynRowkey, dynRowMap);
			}
		});
		return map;
	};

	/***************************************************************************
	 * 获取指定动态行的值
	 *
	 * @param dynRow
	 *            动态行业务模型cf_modelid,不可为空
	 * @param byAttr
	 *            查询类型，可以为空，默认为cf_modelItemId
	 * @param form
	 *            表单，可以为空，默认为当前页面
	 * @returns
	 **************************************************************************/
	CForm_Ext.getDynRowData = function(dynRowModelId, byAttr, $form) {
		// 动态行数据
		var map = new CForm.Map();
		if (!$form || $form.length === 0) {
			$form = $(document);
		}
		// 字段 类型
		byAttr = byAttr ? byAttr : 'cf_modelItemId';
		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelId=" + dynRowModelId + "]");
		// 组装动态行数据
		$.each($dynRows, function(i, dynRow) {
			// 存放动态行的各行数据
			var recordsLst = new CForm.List();
			// 存放动态行的数据，以及是否分页等信息
			var dynDataMap = new CForm.Map();

			var isPaging = $(dynRow).attr("cf_isPaging");
			if (isPaging === "true") {
				// 获取当前页数
				var start = $(dynRow).find(".pageBarContainer .curPageNum").val();
				// 每页显示条数
				var limit = $(dynRow).find(".pageBarContainer .pageSize option:selected").val();
				dynDataMap.put("isPaging", "true");
				dynDataMap.put("start", start);
				dynDataMap.put("limit", limit);
			} else {
				dynDataMap.put("isPaging", "false");
			}

			// 查找除模板行外，所有有状态的行
			var $trs = $('tbody tr[cf_recordState][cf_recordState!=temp]', dynRow);

			$.each($trs, function(j, tr) {
				// 数据状态
				var recordState = $(tr).attr("cf_recordState");
				// 行号
				var subTblNum = $(tr).find("td:first label").text();
				var record = new CForm.Map();
				record.put("cf_recordState", recordState);
				record.put("SUB_TBL_NUM", subTblNum);
				var $fields = $(tr).find('[cf_modelItemId]');

				$.each($fields, function(k, field) {
					var fieldValue = CForm.getFieldValue(field);

					// 若已有数据，则用","间隔各个数据
					var preFieldValue = record.get(field.id);
					if (preFieldValue) {
						fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
					}
					record.put(field.id, fieldValue);
				});

				recordsLst.add(record);
			});
			dynDataMap.put("zoneData", recordsLst);

			map.put(dynRow.id, dynDataMap);
		});
		return map;
	};

	/***************************************************************************
	 * 获取指定动态行的列信息
	 *
	 * @param dynRow
	 *            动态行业务模型cf_modelid,不可为空
	 * @param form
	 *            表单，可以为空，默认为当前页面
	 * @returns
	 **************************************************************************/
	CForm_Ext.getDynRowColumn = function(dynRowModelId, form) {
		// 动态行列信息
		var recordsLst = new CForm.List();

		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);

		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelid=" + dynRowModelId + "]");

		// 查找除模板行外，所有有状态的行
		var $tr = $('tbody tr:first', $dynRows);
		var $fields = $tr.find('[cf_modelitemid]');
		$.each($fields, function(k, field) {
			var map = new CForm.Map();
			var fieldType = CForm_Ext.getFieldType(field);
			var fieldName = $(field).attr("cf_modelitemname");
			var fieldId = $(field).attr("cf_modelitemid");
			map.put("fieldId", fieldId);
			map.put("fieldName", fieldName);
			map.put("fieldType", fieldType);
			recordsLst.add(map);
		});
		return recordsLst;
	};

	/**
	 * 获得域类型
	 *
	 * @param field
	 *            域
	 */
	CForm_Ext.getFieldType = function(field) {
		return field.type;
	};

	/**
	 * 获得域值
	 *
	 * @param field
	 *            域
	 */
	CForm_Ext.getFieldValue = function(field) {
		var fieldValue = "";

		switch (field.type) {
		// 列表框
		case "select-multiple":
			// 选中项
			var $options = $("option:selected", $(field));
			if ($options.length) {
				var valArray = [];
				$.each($options, function(i, option) {
					valArray.push($(option).val());
				});
				fieldValue = valArray.join(",");
			}

			break;
		// 单选按钮
		case "radio":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='radio'][cf_modelitemid='" + modelItemId + "']");
			$.each(fields, function(i, option) {
				if (option.checked) {
					fieldValue = $(option).val();
				}
			});

			break;
		// 复选框
		case "checkbox":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='checkbox'][cf_modelitemid='"
					+ modelItemId + "']");
			$.each(fields, function(i, option) {
				if (option.checked) {
					fieldValue = fieldValue + $(option).val() + ",";
				}
			});
			// 去掉最后的,
			fieldValue = fieldValue.substring(0, fieldValue.length - 1);
			break;
		// 隐藏域
		case "hidden":
			// 多行文本框
		case "textarea":
			fieldValue = $(field).val().replace(/\n/g,"↵");
			break;
			// 单行文本框
		case "text":
			fieldValue = $.trim($(field).val());
			break;
		// 下拉框
		case "select-one":
			fieldValue = $(field).val() === ' ' ? ' ' : $.trim($(field).val());
			break;
		case "password":
		case "button":
		case "file":
		case "image":
		case "reset":
		case "submit":
		default:
			break;
		}

		return fieldValue;
	};

	/**
	 * 获得域显示的值
	 *
	 * @param field
	 *            域
	 */
	CForm_Ext.getFieldText = function(field) {
		var fieldText = "";

		switch (field.type) {
		// 列表框
		case "select-multiple":
			// 选中项
			var $options = $("option:selected", $(field));
			if ($options.length) {
				var valArray = [];
				$.each($options, function(i, option) {
					valArray.push($(option).text());
				});
				fieldText = valArray.join(",");
			}

			break;
		// 单选按钮
		case "radio":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='radio'][cf_modelitemid='" + modelItemId + "']");
			$.each(fields, function(i, option) {
				if (option.checked) {
					fieldText = fieldText + $(option)[0].nextSibling.nodeValue;
				}
			});

			break;
		// 复选框
		case "checkbox":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='checkbox'][cf_modelitemid='"
					+ modelItemId + "']");
			$.each(fields, function(i, option) {
				if (option.checked && $(option)[0].nextSibling) {
					fieldText = fieldText + $(option)[0].nextSibling.nodeValue + ",";
				}
			});
			// 去掉最后的,
			fieldText = fieldText.substring(0, fieldText.length - 1);
			break;
		// 隐藏域
		case "hidden":
			// 多行文本框
		case "textarea":
			// 单行文本框
		case "text":
			fieldText = $.trim($(field).val());
			break;
		// 下拉框
		case "select-one":
			var fieldVal = $(field).val() === ' ' ? ' ' : $.trim($(field).val());
			if(fieldVal){
				$options = $("option:selected", $(field));
				fieldText = $options.text() === ' ' ? ' ' : $.trim($options.text());
			}
			break;
		case "password":
		case "button":
		case "file":
		case "image":
		case "reset":
		case "submit":
		default:
			break;
		}

		return fieldText;
	};

	/**
	 * 获得域所有的选项
	 *
	 * @param field
	 *
	 */
	CForm_Ext.getFieldOptions = function(field) {

		var arr = [];
		switch (field.type) {
		// 列表框
		case "select-multiple":
		case "select-one":
			// 选中项
			var $options = $("option", $(field));
			if ($options.length) {
				$.each($options, function(i, option) {
					var map = new CForm.Map();
					map.put("text", $(option).text());
					map.put("value", $(option).val());
					arr.push(map);
				});
			}
			break;
		// 单选按钮
		case "radio":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='radio'][cf_modelitemid='" + modelItemId + "']");
			$.each(fields, function(i, option) {
				var map = new CForm.Map();
				if ($(option)[0].nextSibling.nodeValue) {
					map.put("text", $(option)[0].nextSibling.nodeValue);
				} else if (($(option).next())[0].nextSibling.nodeValue) {
					map.put("text", ($(option).next())[0].nextSibling.nodeValue);
				} else {
					map.put("text", $(option).attr("text"));
				}
				map.put("value", $(option).val());
				arr.push(map);
			});
			break;

		// 复选框
		case "checkbox":
			var modelItemId = $(field).attr("cf_modelitemid");
			var fields = $("input[type='checkbox'][cf_modelitemid='" + modelItemId + "']");
			$.each(fields, function(i, option) {
				var map = new CForm.Map();
				if(!$(option)[0].nextSibling){
					map.put("text", "");
				} else if ($(option)[0].nextSibling.nodeValue) {
					map.put("text", $(option)[0].nextSibling.nodeValue);
				} else if (($(option).next())[0].nextSibling.nodeValue) {
					map.put("text", ($(option).next())[0].nextSibling.nodeValue);
				} else {
					map.put("text", $(option).attr("text"));
				}
				map.put("value", $(option).val());
				arr.push(map);
			});
			break;
		default:
			break;
		}
		return arr;
	};

	/**
	 * 设置表单组数据
	 *
	 * @param data:表单数据
	 * @param byAttr:标签属性
	 * @return void
	 */
	CForm_Ext.setFormsData = function(data, byAttr) {
		var forms = $("[cf_elementType=form]");
		// 设置表单组数据
		for (var i = 0; i < forms.length; i++) {
			CForm.setFormData(forms.eq(i), data, byAttr);
		}
	};

	/**
	 * 设置表单组业务含义数据
	 *
	 * @param data
	 *            业务含义数据
	 * @return void
	 */
	CForm_Ext.setFormsDataByBizMean = function(data) {
		CForm_Ext.setFormsData(data, "cf_bizMean");
	};

	/**
	 * 将域设置为可编辑
	 */
	CForm_Ext.setFieldEdit = function(field) {
		var $field = $(field);
		// 设置背景颜色
		var td = $field.closest("td");
		if (td) {
			td.removeClass("cfIsReadonly");
			// 去掉font显示内容
			var fontTag = td.find("font");
			if (fontTag.length) {
				fontTag.remove();
			}
		}
		/***********************************************************************
		 * var fieldValue = ""; if(field.type == "checkbox"){
		 * $field.removeAttr('disabled'); } else { $field.show(); }
		 **********************************************************************/
		// 添加显示值
		var $font = td.find(".readOnlyFieldVal");
		if ($font.length > 0) {
			$font.remove();
		}
		$field.removeAttr("disabled");
	};
	/**
	 * 将域设置为只读
	 */
	CForm_Ext.setFieldReadOnly = function(field) {
		var $field = $(field);
		// 设置背景颜色
		var td = $field.closest("td");
		if (td) {
			td.addClass("cfIsReadonly");
			// 去掉必填符号
			var fontTag = td.find("font");
			if (fontTag.length) {
				// fontTag.remove();
			}
		}

		var fieldValue = "";
		// 根据域类型获取域值
		switch (field.type) {
		// 列表框
		case "select-multiple":
			// 下拉框
		case "select-one":
			// 选中项
			var $options = $("option:selected", $field);
			if ($options.length) {
				var valArray = [];
				$.each($options, function() {
					if ($(this).val()) {
						valArray.push($(this).text());
					}
				});
				fieldValue = valArray.join(",");
			}
			break;
		// 多行文本框
		case "textarea":
			// 单行文本框
		case "text":
			fieldValue = $.trim($field.val());
			break;
		// 单选按钮
		case "radio":
			/*******************************************************************
			 * if (!field.checked) { // 用""替换后面的文本 field.nextSibling.nodeValue =
			 * ""; }
			 ******************************************************************/
			break;
		// 复选框
		case "checkbox":
			/*******************************************************************
			 * var prevs = $field.prevAll(); $.each(prevs, function() { if
			 * ($(this).is(":checked")) { fieldValue = ""; return false; } });
			 * 
			 * if (!field.checked)
			 * 用""替换后面的文本
			 * field.nextSibling.nodeValue = "";
			 * } else {
			 * }
			 ******************************************************************/
			break;
		// 按钮
		case "button":
			fieldValue = "";
			break;
		}
		if (field.type === "checkbox" || field.type === "radio") {
			$field.prop("disabled", "disabled");
		} else {
			// 正则表达式替换是为了处理多行文本框的换行
			var reg = new RegExp("\n", "g");
			fieldValue = fieldValue.replace(reg, "<br/>");
			// 隐藏
			$field.hide();

			if (!fieldValue) {
				return;
			}
			// 添加显示值
			var $font = $field.next(".readOnlyFieldVal");
			if ($font.length) {
				$font.text(fieldValue);
			} else {
				$field.after("<font class='readOnlyFieldVal'>" + fieldValue + "</font>");
			}
		}
	};

	/** 云表单扩展域只读方法* */
	CForm_Ext.setFieldReadOnlyCustom = function(field) {
		var $field = $(field);
		// 设置背景颜色
		var td = $field.closest("td");
		if (td) {
			td.addClass("cfIsReadonly");
			// 去掉必填符号
			var fontTag = td.find("font");
			if (fontTag.length) {
				// fontTag.remove();
			}
		}
		/***********************************************************************
		 * // 根据域类型获取域值 switch (field.type) { // 列表框 case "select-multiple": //
		 * 下拉框 case "select-one": // 选中项 var $options = $("option:selected",
		 * $field); if ($options.length) { $.each($options, function() {
		 * $(this).removeAttr("selected"); }); } break; // 多行文本框 case
		 * "textarea": // 单行文本框 case "text": $field.val(""); break; // 单选按钮 case
		 * "radio": var modelItemId = $(field).attr("cf_modelitemid"); var
		 * fields = $("input[type='radio'][cf_modelitemid='"+modelItemId+"']");
		 * $(fields).attr("checked", false); break; // 复选框 case "checkbox": var
		 * modelItemId = $(field).attr("cf_modelitemid"); var fields =
		 * $("input[type='checkbox'][cf_modelitemid='"+modelItemId+"']");
		 * $(fields).attr("checked", false); break; // 按钮 case "button": break; }
		 **********************************************************************/
		$field.attr("disabled", "disabled");
	};
	/**
	 * 将表单所有可见域设置为可编辑
	 */
	CForm_Ext.setFormEdit = function(form) {
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		if (!$form.length) {
			G3.alert("提示", "未获取到要操作的表单！");
			return;
		}
		// 显示动态行的操作列th和td
		$.each($form.find(".cfDynRow"), function() {
			$(this).find("th:last").show();
			$(this).find("tfoot .cfAddAndDelTd").show();
		});
		$.each($form.find(".cfDynRow tbody .cfAddAndDelTd"), function() {
			$(this).show();
		});
		var fields = $form.find("[cf_elementType=field][type!=hidden]:not('[cf_editfieldid]')");
		$.each(fields, function() {
			// 设置域可编辑
			CForm_Ext.setFieldEdit(this);
			if (this.type === "hidden") {
				return;
			}
			$(this).show();
		});

		var editFields = $form.find("[cf_editfieldid]");
		$.each(editFields, function() {
			if (this.type === "hidden") {
				return true;
			}
			if ($(this).hasClass("cf_hidden")) {
				return true;
			}
		});

		var field1s = $form.find("[cf_elementType=field]:disabled");
		$.each(field1s, function() {
			// 设置域可编辑
			CForm_Ext.setFieldEdit(this);
		});
		// 处理可编辑列表
		$.each($(".cfEditGrid"), function() {
			// 隐藏可编辑列表的“增加”按钮
			$form.find(".cfAddEditGrid").show();
			// 显示可编辑列表右侧的“查看”按钮
			if ($form.find("tbody tr:visible").length) {
				$form.find("th:last").show();
				$form.find("tbody .cfAddAndDelTd").removeClass("cfIsReadonly");
				$form.find("tbody .cfAddAndDelTd input").show();
				$form.find("tbody .cfAddAndDelTd .cfCheckRow").hide();
			}
		});
	};

	/**
	 * 将表单所有可见域设置为只读
	 *
	 * @param form
	 *            需要设置只读的表单
	 * @param readonlyType
	 *            设置只读类型 默认为隐藏input,如果设置disabled，则该值为disabled
	 */
	CForm_Ext.setFormReadOnly = function(form, readonlyType) {
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		if (!$form.length) {
			G3.alert("提示", "未获取到要操作的表单！");
			return;
		}
		// 处理序号列的背景色
		var $trs = $form.find(".cfDynRow tbody tr");
		$.each($trs, function() {
			$("td:first", $(this)).addClass("cfIsReadonly");
		});
		// 隐藏动态行的操作列th和td
		$.each($form.find(".cfDynRow"), function() {
			$(this).find("tfoot .cfAddAndDelTd").hide();
		});
		$.each($form.find(".cfDynRow tbody .cfAddAndDelTd"), function() {
			$(this).hide();
		});

		var fields = $form.find("[cf_elementType=field]:visible");
		if (readonlyType && readonlyType === "disabled") {
			$.each(fields, function() {
				// 设置域只读
				CForm_Ext.setFieldReadOnlyCustom(this);
			});
		} else {
			$.each(fields, function() {
				// 设置域只读
				CForm_Ext.setFieldReadOnly(this);
			});
		}

		// 处理可编辑列表
		$.each($(".cfEditGrid"), function() {
			// 隐藏可编辑列表的“增加”按钮
			$form.find(".cfAddEditGrid").hide();
			// 设置可编辑列表的的背景颜色
			$form.find("tbody tr td").each(function(i, td) {
				$(td).addClass("cfIsReadonly");
			});
			// 显示可编辑列表右侧的“查看”按钮
			if ($form.find("tbody tr:visible").length) {
				$form.find("th:last").show();
				$form.find("tbody .cfAddAndDelTd").show().addClass(
						"cfIsReadonly");
				$form.find("tbody .cfAddAndDelTd input").hide();
				$form.find("tbody .cfAddAndDelTd .cfCheckRow").show();
			}
		});
	};

	/**
	 * 获得页面上所有的表单数据
	 *
	 * @returns CForm.List，每一项为一个CForm.Map
	 */
	CForm_Ext.getAllChangedFormData = function(byAttr) {
		var list = new CForm.List();

		$.each($("[cf_elementType=form]"), function() {
			var map = CForm_Ext.getChangedFormFieldData(this, byAttr);
			map.put("formId", $(this).attr("id"));

			list.add(map);
		});

		return list;
	};

	/***************************************************************************
	 * 获取表单域对应的值
	 *
	 * @param form
	 *            表单
	 * @param byAttr
	 *            查询类型
	 * @returns
	 **************************************************************************/
	CForm_Ext.getChangedFormFieldData = function(form, byAttr) {
		// 字段 类型
		byAttr = byAttr ? byAttr : 'cf_modelItemId';
		// 查询表单
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		//
		if ($form.length <= 0) {
			G3.alert("提示", "请指定要要获得数据的表单!");
			return;
		}
		// 定义集合，存放表单域数据
		var list = new CForm.List();
		//
		var map = new CForm.Map();
		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelId]");
		// 具有modelItemId的所有域
		var fields = $form.find("[" + byAttr + "]");
		var checkMap = new CForm.Map();
		// 组装主表单数据
		$.each(fields, function(i, field) {
			if ($dynRows.find(field).length || $(field).closest("[cf_elementType=form]").attr("id") !== $form.attr("id")) {
				return;
			}
			var modelItemId = $(field).attr("" + byAttr);
			// 判断是否重复
			var id = checkMap.get(modelItemId);

			if (!id) {
				// 域的值
				var fieldValue = CForm_Ext.getFieldValue(field);
				// 域的类型
				var fieldType = CForm_Ext.getFieldType(field);
				// 域的text
				var fieldText = CForm_Ext.getFieldText(field);
				// 域的所有选项
				var fieldOptions = CForm_Ext.getFieldOptions(field);
				// 绑定的业务模型
				var form2Biz = $(field).attr("cf_form2biz");
				// 获得绑定表单表-业务表业务模型数据
				if (form2Biz) {
					// 一个域绑定多个业务模型，拆分为两个map数据集合
					var modelArray = form2Biz.split("#");
					for (var i = 0; i < modelArray.length; i++) {
						var modelItem = modelArray[i];
						// 若表单表-业务表绑定业务模型无值，则获取业务表-表单表业务模型绑定的值
						var changedFieldVal = "";
						$("[cf_biz2form*='" + form2Biz + "']").each(function(i, changedField) {
							changedFieldVal = changedField.value;
							if (fieldValue === "") {
								fieldValue = changedFieldVal;
								return true;
							}
						});
						// 返回数据集合
						var fieldMap = new CForm.Map();
						fieldMap.put("modelItemId", modelItem);
						fieldMap.put("value", fieldValue);
						fieldMap.put("fieldText", fieldText);
						fieldMap.put("fieldType", fieldType);
						fieldMap.put("fieldOptions",
								fieldOptions);
						// 用于业务模型唯一性的校验，若业务模型值已经存在，则不在获取绑定值
						checkMap.put(modelItem, modelItem);

						// 存入集合
						list.add(fieldMap);
					}
				}
			}
		});
		map.put($(form).attr("id"), list);

		// 组装动态行数据
		$.each($dynRows, function(i, dynRow) {
			if ($(dynRow).closest("[cf_elementType=form]").attr("id") !== $form.attr("id"))
				return;
			// 动态行标题及数据信息
			var dynRowMap = new CForm.Map();
			// 存放动态行的各行数据
			var dynRowRows = new CForm.List();
			// 动态行标题列
			var dynRowSubjects = new CForm.List();
			var $trs = $('tbody tr:visible', dynRow);
			var $subjectTds = $("thead tr th:not(':first,:last')", dynRow);

			$.each($trs, function(j, tr) {

				var rowDataList = new CForm.List();

				// 添加动态行主键信息
				var $pkField = $(tr).find("[cf_modelitemid=SUB_TBL_PK]");
				var pkData = new CForm.Map();
				pkData.put("modelItemId", "SUB_TBL_PK");
				pkData.put("value", $($pkField).val());
				pkData.put("fieldText", "主键");
				pkData.put("fieldType", "hidden");
				pkData.put("fieldOptions", "");
				rowDataList.add(pkData);

				var $fields = $(tr).find('[' + byAttr + ']');

				$.each($fields, function(k, field) {

					var rowData = new CForm.Map();

					var fieldValue = CForm.getFieldValue(field);

					// 若已有数据，则用","间隔各个数据
					var preFieldValue = rowData.get(field.id);
					if (preFieldValue) {
						fieldValue = $.trim(fieldValue) ? preFieldValue + "," + fieldValue : preFieldValue;
					}

					var modelItemId = $(field).attr(byAttr + "");
					// 域的类型
					var fieldType = CForm_Ext.getFieldType(field);
					// 域的text
					var fieldText = CForm_Ext.getFieldText(field);
					// 域的所有选项
					var fieldOptions = CForm_Ext.getFieldOptions(field);

					rowData.put("modelItemId", modelItemId);
					rowData.put("value", fieldValue);
					rowData.put("fieldText", fieldText);
					rowData.put("fieldType", fieldType);
					rowData.put("fieldOptions", fieldOptions);

					rowDataList.add(rowData);
				});

				dynRowRows.add(rowDataList);
			});

			$.each($subjectTds, function(j, td) {
				dynRowSubjects.add($(td).text());
			});

			dynRowMap.put("data", dynRowRows);
			dynRowMap.put("subject", dynRowSubjects);
			map.put(dynRow.id, dynRowMap);
		});
		return map;
	};
	/***************************************************************************
	 * 获取表单单选、复选、下拉框的键值对
	 *
	 * @param form
	 *            表单
	 * @param byAttr
	 *            查询类型
	 * @returns
	 **************************************************************************/
	CForm_Ext.getComplexFormField = function() {
		//
		var map = new CForm.Map();
		var checkMap = new CForm.Map();
		$.each($("[cf_elementType=form]"), function() {
			// 具有modelItemId的所有域
			var fields = $(this).find("[cf_modelItemId]");
			// 组装主表单数据
			$.each(fields, function(i, field) {
				var modelItemId = $(field).attr("cf_modelItemId");
				var ixExist = checkMap.get(modelItemId);
				if (!ixExist) {
					// 域的类型
					var fieldType = CForm_Ext.getFieldType(field);
					if ("select-multiple" === fieldType
							|| "select-one" === fieldType
							|| "radio" === fieldType
							|| "checkbox" === fieldType) {
						// 域的所有选项
						var fieldOptions = CForm_Ext.getFieldOptions(field);
						map.put(field.id, fieldOptions);
						// 用于业务模型唯一性的校验，若业务模型值已经存在，则不在获取绑定值
						checkMap.put(modelItemId, modelItemId);
					}
				}
			});
		});
		return map;
	};
	/**
	 * 获得表单页面上证照打印数据
	 * @param byAttr 查询数据类型
	 * @returns Map，每一项为一个对应模型项的值，如果是动态行的，所有行每一列的值,以,形式分割，如：value1,value2,value3
	 */
	CForm_Ext.getCertFormsData = function(byAttr) {
		//返回结果数据
		var resultMap = new CForm.Map();

		$.each($("[cf_elementType=form]"), function() {
			CForm_Ext.getCertFormData(this, byAttr, resultMap);
		});
		return resultMap;
	};
	/***************************************************************************
	 * 获取表单域对应的值
	 *
	 * @param form 表单
	 * @param byAttr 查询类型
	 * @param retMap 返回结果集map
	 **************************************************************************/
	CForm_Ext.getCertFormData = function(form, byAttr, retMap) {
		// 字段 类型
		byAttr = byAttr ? byAttr : 'cf_modelItemId';
		// 查询表单
		var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
		//
		if ($form.length <= 0) {
			G3.alert("提示", "请指定要要获得数据的表单!");
			return;
		}
		// 动态行
		var $dynRows = $form.find(".cfDynRow[cf_modelId]");
		// 具有modelItemId的所有域
		var fields = $form.find("[" + byAttr + "]");
		// 组装主表单数据
		$.each(fields, function(i, field) {
			if ($dynRows.find(field).length || $(field).closest("[cf_elementType=form]").attr("id") !== $form.attr("id")) {
				return;
			}
			// 域的text
			var fieldText = CForm_Ext.getFieldText(field);
			// 绑定的业务模型
			var form2Biz = $(field).attr("cf_form2biz");
			// 获得绑定表单表-业务表业务模型数据
			if (form2Biz) {
				// 一个域绑定多个业务模型，拆分为两个map数据集合
				var modelArray = form2Biz.split("#");
				for (var i = 0; i < modelArray.length; i++) {
					var modelItem = modelArray[i];
					// 若表单表-业务表绑定业务模型无值，则获取业务表-表单表业务模型绑定的值
					$("[cf_biz2form*='" + form2Biz + "']").each(function(i, changedField) {
						if (!fieldText) {
							fieldText = CForm_Ext.getFieldText(changedField);
							return true;
						}
					});
					retMap.put(modelItem, fieldText);
				}
			}
		});

		// 组装动态行数据
		$.each($dynRows, function(i, dynRow) {
			if ($(dynRow).closest("[cf_elementType=form]").attr("id") !== $form.attr("id"))
				return;
			var $trs = $('tbody tr:visible', dynRow);
			$.each($trs, function(j, tr) {
				var $fields = $(tr).find('[' + byAttr + ']');
				$.each($fields, function(k, field) {
					var fieldText = CForm_Ext.getFieldText(field);
					var modelItemId = $(field).attr(byAttr + "");
					// 若已有数据，则用","间隔各个数据
					var preFieldText = retMap.get(modelItemId);
					if (preFieldText) {
						fieldText = $.trim(fieldText) ? preFieldText + "," + fieldText : preFieldText;
					}
					retMap.put(modelItemId, fieldText);
				});
			});
		});
	};
	/***************************************************************************
	 * 校验表单指定的域
	 *
	 * @param field 表单域
	 * @returns 校验结构
	 **************************************************************************/
	CForm_Ext.validateField = function(field){
		var $field = $(field);
		// 校验结果
		var isValid = true;
		// 如果这个元素是隐藏的，则不设置只读
		if ($field.hasClass("cf_hidden")) {
			$field.hide();
			return;
		}
		if (field.type === "hidden") {
			return;
		}
		//必填错误信息提示
		if($field.attr('cf_isrequirederrormessage')){
			var errorMsg = $field.attr("cf_isrequirederrormessage");
			$field.attr("cf_errorMsg",errorMsg);
		}
		if($field.hasClass("cfIsRequired")){
			var noEmptyValid = true;
			// 如果是动态行中被隐藏的行，则不需要校验
			if ($(field).closest("tr").css("display") === "none") {
				return true;
			}
			switch (field.type) {
			// 列表框
			case "select-multiple":
				// 至少选中一项
				var $options = $field.find("option:selected");
				if (!$options.length) {
					noEmptyValid = false;
				}
				break;
			// 单选按钮
			case "radio":
				// 同一组中至少有一个选中
				var $radios = $("input[type=radio][name="
						+ $field.attr("name") + "]:checked");
				if (!$radios.length) {
					noEmptyValid = false;
				}
				break;
			// 复选框
			case "checkbox":
				// 同一组中至少有一个选中
				var $checkboxes = $("input[type=checkbox][name="
						+ $field.attr("name") + "]:checked");
				if (!$checkboxes.length) {
					noEmptyValid = false;
				}
				break;
			default:
				if (!$.trim($field.val())) {
					noEmptyValid = false;
				}
				break;
			}
			if (!noEmptyValid) {
				CForm.showTips($field, "cfIsRequired");
				isValid = false;
			}else{
				$field.attr("cf_errorMsg", "");
			}
		}
		// 数据类型校验
		if($field.hasClass("cfIsInteger")){
			var val = $.trim($field.val());
			if (val && !CForm.isInteger(val)) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsInteger");
				isValid = false;
			}
		}

		// 小数校验
		if($field.hasClass("cfIsFloat")){
			var val = $.trim($field.val());
			if (val) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				// 先判断是否是整数，如果是整数，直接通过
				if (CForm.isInteger(val)) {
					
				} else if (!CForm.isFloat(val)) {
					// 不是小数，校验是否整数
					if (!CForm.isInteger(val)) {
						var precision = $field.attr("cf_fieldPrecision");
						$field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
						CForm.showTips($field, "cfIsFloat");
						isValid = false;
					}
				} else {
					// 精确度校验
					var precision = $field.attr("cf_fieldPrecision");
					if (precision) {
						var floatLength = val.toString().split(".")[1].length;
						if (floatLength > precision) {
							$field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
							CForm.showTips($field, "cfIsFloat", precision);
							isValid = false;
						}
					}
				}
			}
		}

		// 邮政编码校验
		if($field.hasClass("cfIsZipCode")){
			var val = $.trim($field.val());
			if (val && !CForm.isZipCode(val)) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsZipCode");
				isValid = false;
			}
		}

		// 电子邮件校验
		if($field.hasClass("cfIsEmail")){
			var val = $.trim($field.val());
			if (val && !CForm.isEmail(val)) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsEmail");
				isValid = false;
			}
		}
		// 身份证号校验
		if($field.hasClass("cfIsIdCard")){
			var val = $.trim($field.val());
			var result = G3.checkIdCard(val);
			if (val && result !== true) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsIdCard", result);
				isValid = false;
			}
		}

		// 固定电话校验
		if($field.hasClass("cfIsPhoneNum")){
			var val = $.trim($field.val());
			if (val && !CForm.cfIsPhoneNum(val)) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsPhoneNum");
				isValid = false;
			}
		}

		// 手机号码校验
		if($field.hasClass("cfIsMobileNum")){
			var val = $.trim($field.val());
			if (val && !CForm.cfIsMobileNum(val)) {
				var errorMsg = $field.attr("cf_datatypeerrormessage");
				$field.attr("cf_errorMsg",errorMsg);
				CForm.showTips($field, "cfIsMobileNum");
				isValid = false;
			}
		}

		// 正则表达式校验
		if($field.hasClass("cfIsRegExp")){
			var reg = $field.attr("cf_regExp");
			if (reg) {
				var val = $.trim($field.val());
				if (val && !eval(reg).test(val)) {
					var errorMsg = $field.attr("cf_datatypeerrormessage");
					$field.attr("cf_errorMsg",errorMsg);
					CForm.showTips($field, "cfIsRegExp");
					isValid = false;
				}
			}
		}
		if(!isValid){
//			$field.focus();
		}
		return isValid;
	};

    // 扩展云表单中的表单校验方法 提交数据时校验
    CForm_Ext.getValidateFormDomMap = function($form) {
        if (!$form || $form.length == 0) {
            $form = $(document);
        }

		if (typeof CForm_Ext.validateFormDomMap === "undefined") {
            CForm_Ext.validateFormDomMap = {};
        }

        // 校验结果
        var firstValidateDom = "";
        // 非空校验
        CForm_Ext.validateFormDomMap.cfIsRequired=$($form).find(".cfIsRequired[type!=hidden]:not('[cf_elementType=editField]'):visible");

        // 数据类型校验
        CForm_Ext.validateFormDomMap.cfIsInteger=$($form).find('.cfIsInteger:visible');

        // 小数校验
        CForm_Ext.validateFormDomMap.cfIsFloat=$($form).find('.cfIsFloat:visible');

        // 邮政编码校验
        CForm_Ext.validateFormDomMap.cfIsZipCode=$($form).find('.cfIsZipCode:visible');

        // 电子邮件校验
        CForm_Ext.validateFormDomMap.cfIsEmail=$($form).find('.cfIsEmail:visible');
        // 身份证号校验
        CForm_Ext.validateFormDomMap.cfIsIdCard=$($form).find('.cfIsIdCard:visible');

        // 固定电话校验
        CForm_Ext.validateFormDomMap.cfIsPhoneNum=$($form).find('.cfIsPhoneNum:visible');

        // 手机号码校验
        CForm_Ext.validateFormDomMap.cfIsMobileNum=$($form).find('.cfIsMobileNum:visible');

        // 正则表达式校验
        CForm_Ext.validateFormDomMap.cfIsRegExp=$($form).find('.cfIsRegExp:visible');
    };


    /**
     * 扩展云表单中的表单校验方法 提交数据时校验
     */
    CForm_Ext.validate = function($form) {
        if (!$form || $form.length == 0) {
            $form = $(document);
        }
        // 校验结果
        var isValid = true;
        var firstValidateDom = "";
        //必填错误信息提示
        $form.find('*[cf_isrequirederrormessage]').each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            var errorMsg = $field.attr("cf_isrequirederrormessage");
            $field.attr("cf_errorMsg",errorMsg);
        });
        // 非空校验
        //$form.find(".cfIsRequired[type!=hidden]:not('[cf_elementType=editField]')").not("[style*='display: none']").each(
        CForm_Ext.validateFormDomMap.cfIsRequired.each(
            function(i, field) {
                var noEmptyValid = true;
                // 如果是动态行中被隐藏的行，则不需要校验
                if ($(field).closest("tr").css("display") == "none") {
                    return true;
                }
                var $field = $(field);
                switch (field.type) {
                    // 列表框
                    case "select-multiple":
                        // 至少选中一项
                        $options = $field.find("option:selected");
                        if (!$options.length) {
                            noEmptyValid = false;
                        }
                        break;
                    // 单选按钮
                    case "radio":
                        // 同一组中至少有一个选中
                        $radios = $("input[type=radio][name="
                            + $field.attr("name") + "]:checked");
                        if (!$radios.length) {
                            noEmptyValid = false;
                        }
                        break;
                    // 复选框
                    case "checkbox":
                        // 同一组中至少有一个选中
                        $checkboxes = $("input[type=checkbox][name="
                            + $field.attr("name") + "]:checked");
                        if (!$checkboxes.length) {
                            noEmptyValid = false;
                        }
                        break;
                    default:
                        if (!$.trim($field.val())) {
                            noEmptyValid = false;
                        }
                        break;
                }
                if (!noEmptyValid) {
                    CForm.showTips($field, "cfIsRequired");
                    isValid = false;
                    if(firstValidateDom==""){
                        firstValidateDom = $field;
                    }
                }else{
                    $field.attr("cf_errorMsg","");
                }
            });

        // 数据类型校验
        CForm_Ext.validateFormDomMap.cfIsInteger.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isInteger(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);

                CForm.showTips($field, "cfIsInteger");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 小数校验
        CForm_Ext.validateFormDomMap.cfIsFloat.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                // 先判断是否是整数，如果是整数，直接通过
                if (CForm.isInteger(val)) {
                    //isValid = true;
                    //return true;
                } else if (!CForm.isFloat(val)) {
                    // 不是小数，校验是否整数
                    if (!CForm.isInteger(val)) {
                        var precision = $field.attr("cf_fieldPrecision");
                        $field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
                        CForm.showTips($field, "cfIsFloat");
                        isValid = false;
                        if(firstValidateDom==""){
                            firstValidateDom = $field;
                        }
                    }
                } else {
                    // 精确度校验
                    var precision = $field.attr("cf_fieldPrecision");
                    if (precision) {
                        var floatLength = val.toString().split(".")[1].length;
                        if (floatLength > precision) {
                            $field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
                            CForm.showTips($field, "cfIsFloat", precision);
                            isValid = false;
                            if(firstValidateDom==""){
                                firstValidateDom = $field;
                            }
                        }
                    }
                }
            }
        });

        // 邮政编码校验
        CForm_Ext.validateFormDomMap.cfIsZipCode.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isZipCode(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsZipCode");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 电子邮件校验
        CForm_Ext.validateFormDomMap.cfIsEmail.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isEmail(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsEmail");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });
        // 身份证号校验
        CForm_Ext.validateFormDomMap.cfIsIdCard.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            var result = G3.checkIdCard(val);
            if (val && result != true) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsIdCard", result);
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 固定电话校验
        CForm_Ext.validateFormDomMap.cfIsPhoneNum.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsPhoneNum(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsPhoneNum");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 手机号码校验
        CForm_Ext.validateFormDomMap.cfIsMobileNum.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsMobileNum(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsMobileNum");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 正则表达式校验
        CForm_Ext.validateFormDomMap.cfIsRegExp.each(function(i, field) {
            var $field = $(field);
            var reg = $field.attr("cf_regExp");
            if (reg) {
                var val = $.trim($field.val());
                if (val && !eval(reg).test(val)) {
                    CForm.showTips($field, "cfIsRegExp");
                    isValid = false;
                    if(firstValidateDom==""){
                        firstValidateDom = $field;
                    }
                }
            }
        });
        if(!isValid){
            firstValidateDom.focus();
        }

        return isValid;
    };

    /**
     * 扩展云表单中的表单校验方法 保存数据时校验 不校验必填
     */
    CForm_Ext.validateIgnoreRequired = function($form) {
        if (!$form || $form.length == 0) {
            $form = $(document);
        }
        // 校验结果
        var isValid = true;
        var firstValidateDom = "";
        /**
         //必填错误信息提示
         $form.find('*[cf_isrequirederrormessage]').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		var errorMsg = $field.attr("cf_isrequirederrormessage");
		$field.attr("cf_errorMsg",errorMsg);
		});
         */

        if (typeof CForm_Ext.validateFormDomMap === "undefined") {
            CForm_Ext.getValidateFormDomMap($form);
        }

        // 数据类型校验
        CForm_Ext.validateFormDomMap.cfIsInteger.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isInteger(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);

                CForm.showTips($field, "cfIsInteger");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 小数校验
        CForm_Ext.validateFormDomMap.cfIsFloat.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                // 先判断是否是整数，如果是整数，直接通过
                if (CForm.isInteger(val)) {
                    //isValid = true;
                    //return true;
                } else if (!CForm.isFloat(val)) {
                    // 不是小数，校验是否整数
                    if (!CForm.isInteger(val)) {
                        var precision = $field.attr("cf_fieldPrecision");
                        $field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
                        CForm.showTips($field, "cfIsFloat");
                        isValid = false;
                        if(firstValidateDom==""){
                            firstValidateDom = $field;
                        }
                    }
                } else {
                    // 精确度校验
                    var precision = $field.attr("cf_fieldPrecision");
                    if (precision) {
                        var floatLength = val.toString().split(".")[1].length;
                        if (floatLength > precision) {
                            $field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
                            CForm.showTips($field, "cfIsFloat", precision);
                            isValid = false;
                            if(firstValidateDom==""){
                                firstValidateDom = $field;
                            }
                        }
                    }
                }
            }
        });

        // 邮政编码校验
        CForm_Ext.validateFormDomMap.cfIsZipCode.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isZipCode(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsZipCode");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 电子邮件校验
        CForm_Ext.validateFormDomMap.cfIsEmail.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.isEmail(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsEmail");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });
        // 身份证号校验
        CForm_Ext.validateFormDomMap.cfIsIdCard.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            var result = G3.checkIdCard(val);
            if (val && result != true) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsIdCard", result);
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 固定电话校验
        CForm_Ext.validateFormDomMap.cfIsPhoneNum.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsPhoneNum(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsPhoneNum");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 手机号码校验
        CForm_Ext.validateFormDomMap.cfIsMobileNum.each(function(i, field) {
            var $field = $(field);
            var val = $.trim($field.val());
            if (val && !CForm.cfIsMobileNum(val)) {
                var errorMsg = $field.attr("cf_datatypeerrormessage");
                $field.attr("cf_errorMsg",errorMsg);
                CForm.showTips($field, "cfIsMobileNum");
                isValid = false;
                if(firstValidateDom==""){
                    firstValidateDom = $field;
                }
            }
        });

        // 正则表达式校验
        CForm_Ext.validateFormDomMap.cfIsRegExp.each(function(i, field) {
            var $field = $(field);
            var reg = $field.attr("cf_regExp");
            if (reg) {
                var val = $.trim($field.val());
                if (val && !eval(reg).test(val)) {
                    CForm.showTips($field, "cfIsRegExp");
                    isValid = false;
                    if(firstValidateDom==""){
                        firstValidateDom = $field;
                    }
                }
            }
        });
        if(!isValid){
            firstValidateDom.focus();
        }

        return isValid;
    };
})(this.Zepto||this.jQuery);

// 适配，后续将删除
CForm.gcloudGetValidateFormDomMap = CForm_Ext.getValidateFormDomMap;
CForm.gcloudValidate = CForm_Ext.validate;
CForm.gcloudValidateWithoutRequired = CForm_Ext.validateIgnoreRequired;
CForm.validateWithoutRequired = CForm.validateIgnoreRequired;


function customAfterFormRender() {

}

/**
 * 个性化方法
 */
function customFunction() {

}

/*******************************************************************************
 * @see 云表单组件初始化函数 表单渲染完毕后执行函数，函数名不能修改，可添加方法体 如行政区划、滚动监听、导航组等
 ******************************************************************************/

var enableTop = 100;
var step = 50;
/*******************************************************************************
 * @see
 ******************************************************************************/
$(function() {
	/***************************************************************************
	 * 导航组组件 开始
	 **************************************************************************/
	CForm.on("afterLoadFormData",function() {
		/**
		 * 点击li时执行的操作
		 */
		$("form").find(".navLabel").on('click',
			function() {
				// 定义当前需要校验的表单
				var $form = $(".cfEachFormGroup.current[cf_elementtype=zone]").find("div[cf_elementtype=form]");
				// 获取当前要点击的li
				var curLi = $(this);
				var num = $(curLi).nextAll(".navLabel").length, max = $("form").find(".cfNavUL .navLabel").length;
				// 当前要点击的li的索引
				var index = max - num - 1;
				if (index < 0) {
					index = 0;
				}
				var activeLi = $("form").find(".cfNavUL .navLabel").filter(".current");
				var indexNum = $(activeLi).index();
				//只有向后时，才进行表单校验
				var isValidate = index > indexNum ? true : false;
				// 表单校验
//				if(isValidate && !CForm.validate($form)){
//					return false;
//				}


				// 下一步按钮 业务自定义操作
				var retObj = nextStepBtnCustomEvent($form, isValidate);
				// 是否显示提交按钮
				var isShowSubmitBtn = false;
				// 提交按钮
				var submitBtnName = "提交";
				// 结果
				var result = true;
				if (retObj) {
					isShowSubmitBtn = retObj.isShowSubmitBtn ? retObj.isShowSubmitBtn : false;
					submitBtnName = retObj.submitBtnName ? retObj.submitBtnName : "提交";
					result = retObj.result ? retObj.result : false;
				}
				if (!result) {
					return false;
				}

				// 控制导航条样式显示
				// 删除所有的current类
				$("form").find(".cfNavUL .navLabel").removeClass("current");
				$("form").find(".cfNavUL .navLabel").removeClass("current_prev");
				// 给当前元帅添加类
				$(curLi).addClass("current");
				// 给上一个元素添加current_prev类
				$(curLi).prev(".navLabel").addClass("current_prev");

				// 控制内容区域显示
				// 设置所有div隐藏
				$("form").find(".formcon .navDivLabel").removeClass("current");
				$("form").find(".formcon .navDiv").removeClass("current").hide();
				// 设置当前div显示
				$("form").find(".formcon .navDivLabel").eq(index).addClass(
								"current");
				$("form").find(".formcon .navDiv").eq(index).addClass("current").show();

				// 控制下方按钮显示（上一步、下一步、提交）
				// 第一个li
				if (index === 0) {
					// 第一个 显示上一步按钮，隐藏下一步按钮
					$("form").find(".toolDiv .toolPreButton").hide();
					$("form").find(".toolDiv .toolNextButton").show();
					$("form").find(".toolDiv .toolSubmitButton").hide();
				} else if (index === (max - 1)) {
					// 最后一个li
					// 第一个 显示上一步按钮，隐藏下一步按钮
					$("form").find(".toolDiv .toolPreButton").show();
					$("form").find(".toolDiv .toolNextButton").hide();
					// 显示提交按钮
					if (isShowSubmitBtn) {
						$("form").find(".toolDiv .toolSubmitButton").show();
						$("form").find(".toolDiv .toolSubmitButton").text(submitBtnName);
					}
				} else {
					$("form").find(".toolDiv .toolPreButton").show();
					$("form").find(".toolDiv .toolNextButton").show();
					$("form").find(".toolDiv .toolSubmitButton").hide();
				}
			});

		// 下一步
		$("form").find('.toolNextButton').bind('click',
			function() {
				// 定义当前需要校验的表单
				var $form = $(".cfEachFormGroup.current[cf_elementtype=zone]").find("div[cf_elementtype=form]");
				// 表单校验
//				if (!CForm.validate($form)) {
//					return false;
//				}

				// 下一步按钮 业务自定义操作
				var retObj = nextStepBtnCustomEvent($form);
				// 是否显示提交按钮
				var isShowSubmitBtn = false;
				// 提交按钮
				var submitBtnName = "提交";
				// 结果
				var result = true;
				if (retObj) {
					isShowSubmitBtn = retObj.isShowSubmitBtn ? retObj.isShowSubmitBtn : false;
					submitBtnName = retObj.submitBtnName ? retObj.submitBtnName : "提交";
					result = retObj.result ? retObj.result : false;
				}
				if (!result) {
					return false;
				}

				// 获取当前
				var curLi = $("form").find(".cfNavUL .navLabel").filter(".current");
				// 判断当前是不是第一个
				var num = $(curLi).nextAll(".navLabel").length, max = $("form").find(".cfNavUL .navLabel").length;
				if (num === max) {
					// 最后一个
					$("form").find(".toolDiv .toolPreButton").show();
					$("form").find(".toolDiv .toolNextButton").hide();
					$("form").find(".toolDiv .toolSubmitButton").show();
				} else {
					// 获取下一个
					var nextLi = $(curLi).next(".navLabel");
					// 删除前面li的类
					$(nextLi).prevAll(".navLabel").removeClass("current").removeClass("current_prev");
					$(nextLi).prev(".navLabel").addClass("current_prev");
					// 给当前元素添加类
					$(nextLi).addClass("current");
					// 设置当前div显示，上一个div隐藏
					var curDiv = $("form").find(".formcon .navDiv").filter(".current");
					var nextDiv = $(curDiv).nextAll(".navDiv").first();

					$(curDiv).hide();
					$(curDiv).removeClass("current");
					$(nextDiv).show();
					$(nextDiv).addClass("current");

					var newNum = $(nextLi).nextAll(".navLabel").length;
					if (newNum === 0) {// 最后一个
						$("form").find(".toolDiv .toolPreButton").show();
						$("form").find(".toolDiv .toolNextButton").hide();
						// 显示提交按钮
						if (isShowSubmitBtn) {
							$("form").find(".toolDiv .toolSubmitButton").show();
							$("form").find(".toolDiv .toolSubmitButton").text(submitBtnName);
						}
					} else if (newNum === max) {// 第一个
						$("form").find(".toolDiv .toolPreButton").hide();
						$("form").find(".toolDiv .toolNextButton").show();
						$("form").find(".toolDiv .toolSubmitButton").hide();
					} else {
						$("form").find(".toolDiv .toolPreButton").show();
						$("form").find(".toolDiv .toolNextButton").show();
						$("form").find(".toolDiv .toolSubmitButton").hide();
					}
				}
			});
		// 上一步
		$("form").find('.toolPreButton').bind('click',
			function() {
				// 判断当前元素是不是最后一个
				// 获取当前
				var curLi = $("form").find(".cfNavUL .navLabel").filter(".current");
				// 判断当前是不是第一个
				var num = $(curLi).nextAll(".navLabel").length, max = $("form").find(".cfNavUL .navLabel").length;
				if (num === max) {
					// 第一个
					$("form").find(".toolDiv .toolPreButton").hide();
					$("form").find(".toolDiv .toolNextButton").show();
					$("form").find(".toolDiv .toolSubmitButton").hide();
				} else {
					// 获取下一个
					var prevLi = $(curLi).prev(".navLabel");
					// 删除后面li的类
					$(prevLi).nextAll(".navLabel").removeClass("current").removeClass("current_prev");
					// 给当前元素添加类
					$(prevLi).prev(".navLabel").addClass("current_prev");
					// 给当前元素添加类
					$(prevLi).addClass("current");
					// 设置当前div显示，上一个div隐藏
					var curDiv = $("form").find(".formcon .navDiv").filter(".current");
					var prevDiv = $(curDiv).prevAll(".navDiv").first();

					$(curDiv).removeClass("current");
					$(curDiv).hide();
					$(prevDiv).show();
					$(prevDiv).addClass("current");

					var newNum = $(prevLi).prevAll(".navLabel").length;
					if (newNum === 0) {// 第一个
						$("form").find(".toolDiv .toolNextButton").show();
						$("form").find(".toolDiv .toolSubmitButton").hide();
						$("form").find(".toolDiv .toolPreButton").hide();
					} else if (newNum === max) {// 最后一个
						$("form").find(".toolDiv .toolPreButton").hide();
						$("form").find(".toolDiv .toolNextButton").hide();
						$("form").find(".toolDiv .toolSubmitButton").show();
					} else {
						$("form").find(".toolDiv .toolPreButton").show();
						$("form").find(".toolDiv .toolNextButton").show();
						$("form").find(".toolDiv .toolSubmitButton").hide();
					}
				}
			});
		$("form").find('.toolSubmitButton').bind('click',
			function() {
				// 判断当前元素是不是最后一个
				// 获取当前
				// var curLi =
				// $("form").find(".cfNavUL
				// .navLabel").filter(".current");
				// 判断当前是不是第一个
				// var num =
				// $(curLi).nextAll(".navLabel").length,
				// max = $("form").find(".cfNavUL
				// .navLabel").length;
				// 定义当前需要校验的表单
				var $form = $(".cfEachFormGroup.current[cf_elementtype=zone]")
						.find("div[cf_elementtype=form]");
				// 表单校验
				if (!CForm.validate($form)) {
					return false;
				}
				// 下一步按钮 业务自定义操作
				if (!submitBtnCustomEvent($form)) {
					return false;
				}
			});
		//导航悬浮在页面，不随着滚动条而动
		if($("form .flow_steps").length>0){
			$(".cfTitle").addClass("flow_steps_cfTitle");
			$(".toolDiv").addClass("toolDiv_fixed");
			$(".formcon").css("margin-top","50px");
		}
	});
	/** 导航组组件 结束** */
	/** *滚动导航组件 开始** */
	CForm.on("afterLoadFormData",function() {
		// 表单距上部的距离
		var formOffsetTop = $("#htmlContainer").offset().top;
		var h = $("#htmlContainer")[0].offsetTop;
		// 点击向上的按钮
		$('#sideCatalog-down').bind('click',
			function() {
				if ($(this).hasClass('sideCatalog-down-enable')) {
					if ((enableTop - Math.abs(parseInt($('#sideCatalog-catalog dl').css('top')))) > step) {
						$('#sideCatalog-catalog dl').stop().animate({'top' : '-=' + step}, 'fast');
						$('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
					} else {
						if (enableTop > 0) {
							$('#sideCatalog-catalog dl').stop().animate({'top' : -enableTop}, 'fast');
							$(this).removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
						} else {
							$(this).removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
						}
					}
				} else {
					return false;
				}
		});
		// 点击向下的按钮
		$('#sideCatalog-up').bind('click',
			function() {
				if ($(this).hasClass('sideCatalog-up-enable')) {
					if (Math.abs(parseInt($('#sideCatalog-catalog dl').css('top'))) > step) {
						$('#sideCatalog-catalog dl').stop().animate({'top' : '+=' + step }, 'fast');
						$('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
					} else {
						$('#sideCatalog-catalog dl').stop().animate({'top' : '0'}, 'fast');
						$(this).removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
					}
				} else {
					return false;
				}
		});

		// slide内容的显示与隐藏
		$('#sideCatalogBtn').bind('click', function() {
			if ($(this).hasClass('sideCatalogBtnDisable')) {
				$(this).removeClass('sideCatalogBtnDisable');
				$('#sideCatalog').css('visibility', 'visible');
			} else {
				$(this).addClass('sideCatalogBtnDisable');
				$('#sideCatalog').css('visibility', 'hidden');
			}
		});
		//向左合起
		$("#sideToolbar-left").bind("click", function(){
			$('#sideCatalog').css('visibility', 'hidden');
			$(this).hide();
			$("#sideToolbar-right").show();
			$("#sideCatalog-updown").hide();
			$(".scrollspy").css("width", "95%");
		});
		//向右展开
		$("#sideToolbar-right").bind("click", function(){
			$('#sideCatalog').css('visibility', 'visible');
			$(this).hide();
			$("#sideToolbar-left").show();
			$("#sideCatalog-updown").show();
			$(".scrollspy").css("width", "82%");
		});

		$('#sideCatalog-catalog dl').on('click', 'dd',
			function() {
				var index = $('#sideCatalog-catalog dl dd').index($(this));
				scrollSlide($(this), index);
				// 获取点击导航的下标
				var ddIndex = $(this).find('a').stop().attr('href').lastIndexOf('#');
				// 点击导航对应表单的id
				var IndexObj = $(this).find('a').stop().attr('href');
				var ddId = $(this).find('a').stop().attr('href').substring(ddIndex + 1);
				var windowTop = $('#' + ddId)[0].offsetTop;
				$('#htmlContainer').animate({
					scrollTop : windowTop
				}, 'fast');
		});

		// 滚动页面，即滚动条滚动
		$("#htmlContainer").scroll(
			function() {
				var d = $("#htmlContainer")[0];
				var scrollHeight = d.scrollHeight;
				var offsetHeight = d.offsetHeight;
				var scrollTop = d.scrollTop;
				// 滚动到底部
				if (scrollHeight === offsetHeight + scrollTop) {
					if ($("#tfContainer").length > 0) {
						tfArea.tfCollapse();
					}
				}
				// 滚动到顶部
				if (scrollTop === 0 && $("#tfContainer").length > 0) {
					tfArea.tfCollapse();
				}

				var allEle = $('.cf_scroll_model');
				var headLen = allEle.length;
				for (var i = headLen - 1; i >= 0; i--) {
					// alert(i+"
					// "+$(this).scrollTop()+"
					// "+allEle.eq(i).offset().top+"
					// "+allEle.eq(i).height());
					var height = allEle.eq(i)[0].offsetTop - allEle.eq(i).height() - 60;
					if (i === 4) {
						height = height - 145;
					}
					if ($(this).scrollTop() >= height) {// -60
						var index = i;
						$('#sideCatalog-catalog dl dd').eq(index).addClass('highlight').siblings('dd').removeClass('highlight');
						scrollSlide($('#sideCatalog-catalog dl dd').eq(index), index);
						return false;
					} else {
						$('#sideCatalog-catalog dl dd').eq(0).addClass('highlight').siblings('dd').removeClass('highlight');
					}
				}
			});

			// 置顶
			$('#sideToolbar-up').bind('click', function() {
				$('#htmlContainer').animate({
					scrollTop : 0
				}, 'fast');
			});

			// 导航的滚动，以及向上，向下按钮的显示隐藏
			function scrollSlide(that, index) {
				if (index < 9) {
					$('#sideCatalog-catalog dl').stop().animate({
						'top' : '0'
					}, 'fast');
					$('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
					$('#sideCatalog-up').removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
				} else if (index > 9) {
					$('#sideCatalog-catalog dl').stop().animate({
						'top' : -enableTop
					}, 'fast');
					$('#sideCatalog-down').removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
					$('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
				} else {
					var slideOutHeight = $('#sideCatalog-catalog').height();
					var dlTop = parseInt($('#sideCatalog-catalog dl').css('top')) + slideOutHeight / 2 - (that.offset().top - $('#sideCatalog-catalog').offset().top);
					if ((dlTop + enableTop) < 0) {
						dlTop = -enableTop;
					}
					$('#sideCatalog-catalog dl').stop().animate({
						'top' : dlTop
					}, 'fast');
					$('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
					$('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
				}
				if (enableTop <= 0) {
					$('#sideCatalog-down').removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
				}
			}
		});
	/** *滚动导航组件 结束** */
});

/** *行政区划组件初始化** */
CForm.on("afterLoadFormData", function() {
	new locationCard({
		cls : [ 'cf_areaselect_pro', 'cf_areaselect_city',
				'cf_areaselect_county', 'cf_areaselect_street',
				'cf_areaselect_in' ]
	}).init();
});

/** *隐藏区域组件初始化** */
CForm.on("afterLoadFormData", function() {
	$(".cf_hidden_container").each(function() {
		$(this).removeAttr("style");
		var id = $(this).attr("relate_input");
		var inputArea = $("#" + id);
		if (inputArea.length > 0 && inputArea.val() !== "") {
			$(this).show();
		}
	});
});

/** *横向变更组件初始化** */
CForm.on("afterLoadFormData", function() {
	// 登记许可数据加载完成之后触发组件方法
	CForm.on("afterLoadGiapInitData", function() {
		if ($("table[name='swithModuleH']").length > 0) {
			$("input[swithCheckBoxFlag='swithcheckboxH']").bootstrapSwitch({
				"size" : "small",
				"onText" : "打开",
				"offText" : "关闭"
			});
			//将已打开的切换按钮对应的变更后组件变为可编辑状态,并对关闭切换按钮的变更后组件删除校验class
			$("input[swithCheckBoxFlag='swithcheckboxH']").each(function(){
				//获取当前行
				var $currentTr = $(this).closest("tr");
				//获取当前行第一个单元格的合并数
				var rowspanCount = $("td:eq(0)", $currentTr).attr("rowspan");
				if(!rowspanCount){//如果没有合并行，则默认为1
					rowspanCount = 1;
				}
				//获取当前切换按钮打开状态
				var currentSwithState = $("td:eq(0)", $currentTr).find("div").hasClass('bootstrap-switch-on');
				//获取当前切换按钮只读状态
				var isReadState = $("td:eq(0)", $currentTr).find("div").hasClass('bootstrap-switch-disabled');
				//定义正在处理的当前行
				var $isHandingTr;
				for(var i=0;i<rowspanCount;i++){
					if(i===0){
						$isHandingTr = $currentTr;
					}else{
						$isHandingTr = $isHandingTr.next("tr");
					}
					//将当前行设置为只读状态
					CForm_Ext.setFormReadOnly($isHandingTr, "disabled");
					$isHandingTr.find(".input-group-addon").hide();
					var $isHandingTd = $("td:last", $isHandingTr);
					//将当前行的最后一个td设置为是否可读
					if(currentSwithState && !isReadState){//如果切换按钮为打开并且不是禁止状态
						CForm_Ext.setFormEdit($isHandingTd);
						$isHandingTd.find(".input-group-addon").show();
					}else{
						//删除校验
						$isHandingTd.find(".input-group-addon").hide();
						removeValidClassName($isHandingTd);
					}
				}
				switchHInitExt($(this),currentSwithState);
			});
			// 切换选中状态
			$("input[swithCheckBoxFlag='swithcheckboxH']").on('switchChange.bootstrapSwitch', function(e, state) {
				switchHSelectState($(this), state);
			});
		}
	});
});

/** *纵向变更组件初始化** */
CForm.on("afterLoadFormData", function() {
	CForm.on("afterLoadGiapInitData", function() {
		if ($("div[name='swithModuleV']").length > 0) {
			$("input[name='swithcheckboxV']").bootstrapSwitch({
				"size" : "small",
				"onText" : "打开",
				"offText" : "关闭"
			});
			var $moduleDiv = $("div[name='swithModuleV']");
			//当切换按钮为关闭状态时，才禁止编辑框
			$moduleDiv.each(function(){
				var $modulV = $(this);
				var $div = $("div:eq(0)", $(this));
				$modulV.find("span.fa").remove();
				$div.append("<span style='cursor:pointer' class='fa fa-chevron-circle-up' title='点击展开'></span>");

				//点击箭头折叠纵向变更组件
				$div.find("span.fa").click(function() {
					if($(this).hasClass("fa-chevron-circle-up")){
						$(this).closest("div").nextAll().css('display','none');
						$(this).removeClass("fa-chevron-circle-up");
						$(this).addClass("fa-chevron-circle-down");
						$(this).attr("title","点击展开");
					}else{
						$(this).closest("div").nextAll().css('display','');
						//当切换按钮为关闭状态时，处理操作栏的操作按钮显示状态
						if(!$div.find("div").hasClass('bootstrap-switch-on')){
							$(this).closest("div").nextAll().find("td.cfAddAndDelTd").show();
							var $cfChangeModel = $modulV.find(".cf_change_model");
							$.each($cfChangeModel, function(i) {
								if(i !== 0){
									$(this).css('display','');
									setReadDynShowCheckBtn($(this));
								}
							});
						}
						$(this).removeClass("fa-chevron-circle-down");
						$(this).addClass("fa-chevron-circle-up");
						$(this).attr("title","点击合起");
					}
				});
				var isOpenswitch = $div.find("div").hasClass('bootstrap-switch-on');
				if(isOpenswitch){//打开状态时，仅对变更前的禁止编辑
					//判断切换按钮是否为禁止状态
					if($div.find("div").hasClass('bootstrap-switch-disabled')){
						CForm_Ext.setFormReadOnly($(this), "disabled");
					}else{
						if($(this).children().length === 3){
							CForm_Ext.setFormReadOnly($(this).children()[1], "disabled");
						}
					}
				}else{
					//清除普通表格内的校验方式
					var $cfTables = $(this).find(".cfTable");
					//清除普通表单变更前的校验
					$.each($cfTables, function() {
						$.each($(this).find("tr:visible"),function(){
								$(this).find('td').each(function(){
									removeValidClassName($(this));
								});
							});
						CForm_Ext.setFormReadOnly($(this), "disabled");
					});

					var $cfChangeModel = $(this).find(".cf_change_model");

					if($cfChangeModel.length===3){
						var isHaveData = false;
						var $cfDynRows;
						$.each($cfChangeModel, function(i,changeModel) {
							if(i===1){
								CForm_Ext.setFormReadOnly($(this), "disabled");
							}else if(i===2){
								$cfDynRows = $(this).find(".cfDynRow");
								//循环处理动态行查阅是否有数据
								$.each($cfDynRows, function() {
									if($(this).find("tr:visible").length>1){
										isHaveData = true;
									}
								});
							}
						});

						if(isHaveData){
							if($div.find("div").hasClass('bootstrap-switch-disabled')){
								$div.find("input").bootstrapSwitch("toggleDisabled");
								$div.find("input").bootstrapSwitch('toggleState');
								$div.find("input").bootstrapSwitch("toggleDisabled");
								//清除校验
								$.each($cfDynRows, function() {
									$.each($(this).find("tr:visible"),function(){
										$(this).find('td').each(function(index,ele){
											removeValidClassName($(this));
										});
									});
								});
								CForm_Ext.setFormReadOnly($(this), "disabled");
							}else{
								$div.find("input").bootstrapSwitch('toggleState');
							}
						}else{
							CForm_Ext.setFormReadOnly($cfChangeModel[2], "disabled");
						}
					}else if($cfChangeModel.length===2){
						CForm_Ext.setFormReadOnly($cfChangeModel, "disabled");
					}

					$.each($cfChangeModel, function(i,changeModel) {
						if(i !== 0){
							$(this).css('display','none');
						}
					});
					$div.find("span.fa").removeClass("fa-chevron-circle-up");
					$div.find("span.fa").addClass("fa-chevron-circle-down");
					$(this).removeClass("cfFieldSet");
				}
				//切换按钮纵向初始化扩展
				switchVInitExt($(this),isOpenswitch);
			});

			// 切换选中状态
			$("input[name='swithcheckboxV']").on('switchChange.bootstrapSwitch', function(e, state) {
				//切换纵向变更组件选中状态
				switchVSelectState($(this),state);
			});
		}
	});
});



/** *云表单加载显示图片** */
CForm.on("afterLoadFormData", function() {
	var g3CFormUploadImgHelp = $(".g3CFormUploadImgHelp");
	if (g3CFormUploadImgHelp.length) {
		var id = g3CFormUploadImgHelp.attr("id");
		var $image = $("#" + id + "_IMG_ID");
		var $fileId = $("#" + id + "_FILE_ID");
		if ($fileId.length && $image.length) {
			var fileId = $fileId.val();
			if (fileId) {
				$image.attr("src", G3.frontStatic.cformUrl
										+ "/command/dispatcher/com.inspur.gcloud.cform.gfile.cmd.GCFormFileShowCommand?fileId="
										+ fileId + "&" + (new Date()).getTime());
			}
		}
	}
});

/*******************************************************************************
 * @see 分页表格设置
 *
 ******************************************************************************/
CForm.on("afterLoadFormData", function() {
	// 初始化只读表格
	CForm_Ext.initPageGrid();

	$(document).find("[cf_elementtype=field],[cf_elementtype=editField]").on("blur", function(){
		var valid = CForm_Ext.validateField(this);
		//移动校验临时注释
		/*
		if(valid){
			$(this).popover('destroy');
			$(this).nextAll("div.popover,.fade,.top").remove();
		}*/
	});
});

/** *表单组导航下一步及提交按钮扩展** */
/*******************************************************************************
 * 下一步操作，业务扩展操作
 *
 * @param $form 当前表单
 * @param isValidate 是否校验表单
 ******************************************************************************/
function nextStepBtnCustomEvent($form, isValidate) {
	var retObj = {};
	// 是否显示提交按钮，到最后一步才有效
	retObj.isShowSubmitBtn = false;
	// 自定义提交按钮名称
	retObj.submitBtnName = "提交";
	// 业务自定义操作结果
	retObj.result = true;
	return retObj;
}

/*******************************************************************************
 * 最后一步提交操作，业务扩展操作
 *
 * @param $form
 *            当前表单
 ******************************************************************************/
function submitBtnCustomEvent($form) {
	// 业务自定义操作
	return true;
}

/** *行政区划组件 实现** */
/**
 * 行政区划js
 */
function locationCard(settings) {
	var _options = $.fn.extend({ // 合并配置参数
		cls : [],
		onProvinceSelect : function() {
		},
		onCitySelect : function() {
		},
		onCountySelect : function() {
		}
	}, settings);
	var provinceAndCity = _areaselect_data;
	var pdiv, cdiv, xdiv, sdiv;
	var areaId, pid, cid, xid, sid;
	var c_css, p_css, x_css, s_css;
	var p_list = getProvinceList(), c_list = [], x_list = [], s_list = [];
	var pro = "", city = "", cou = "", str = "";
	// 获取省市县区街道的input框
	var pInput = $("." + _options.cls[0]);
	var cInput = $("." + _options.cls[1]);
	var xInput = $("." + _options.cls[2]);
	var sInput = $("." + _options.cls[3]);
	var dInput = $("." + _options.cls[4]);
	// 获取省市县区街道框的value值
	var cur_p = pInput.val() ? pInput.val() : null, cur_c = cInput.val() ? cInput.val()
			: null, cur_x = xInput.val() ? xInput.val() : null, cur_s = sInput
			.val() ? sInput.val() : null;
	// 只读
	if (taskType === '2' || taskType === '3' || taskType === '4') {
		setCantReadOnly(pInput);
	} else {
		pInput.each(function(i, obj) {
			if($(obj).closest("td").hasClass("cfIsReadonly")){
				setCantReadOnly(obj);
			} else {
				//省
				if($(obj).val() && $(obj).is(":visible")){
					$(obj).show();
				}
				//市
				var $cInputTem = $(obj).closest(".cf_areaselect_listdiv").find(".cf_areaselect_city");
				if($cInputTem.val() && $(obj).is(":visible")){
					$cInputTem.show();
				}
				//区县
				var $xInputTem = $cInputTem.closest(".cf_areaselect_listdiv").find(".cf_areaselect_county");
				if($xInputTem.val()){
					$xInputTem.show();
				}
				//街道
				var $sInputTem = $xInputTem.closest(".cf_areaselect_listdiv").find(".cf_areaselect_street");
				if($sInputTem.val()){
					$sInputTem.show();
				}
			}
		});
	}
	/**行政区划只读***/
	function setCantReadOnly(inputCant){
		var $form = $(inputCant).parents("form[cf_elementType=form]");
		if ($form.length) {
			// 将所有可见域设置成只读
			var readOnlyFields = $(inputCant).closest(".cf_areaselect_listdiv").find("font.readOnlyFieldVal");
			$.each(readOnlyFields, function(i, field) {
				var $field = $(field);
				$field.remove();
			});
			//删除换行
			var brFields = $(inputCant).closest(".cf_areaselect_listdiv").find("br");
			$.each(brFields, function(i, field) {
				var $field = $(field);
				$field.remove();
			});
			var fields = $(inputCant).closest(".cf_areaselect_listdiv").find(".cf_areaselect_show,.cf_areaselect_in");
			$.each(fields, function(i, field) {
				// 设置域只读
				var $field = $(field);
				$field.show();
				// 设置背景颜色
				var td = $field.parent("td");
				if (td) {
					td.addClass("cfIsReadonly");
					// 去掉必填符号
					td.find("font.isRequiredSign").remove();
				}
				var fieldValue = $.trim($field.val());
				// 正则表达式替换是为了处理多行文本框的换行
				var reg = new RegExp("\n", "g");
				fieldValue = fieldValue.replace(reg, "<br/>");
				// 隐藏
				$field.hide();

				if (!fieldValue) {
					return;
				}
				// 添加显示值
				var $font = $field.next(".readOnlyFieldVal");
				if ($font.length) {
					$font.text(fieldValue);
				} else {
					$field.after("<font class='readOnlyFieldVal'>" + fieldValue + "</font>");
				}
			});
		}
	}

	/** ***************************************************************** */
	// 赋值省份的input框
	function writeProvinceValue(province, obj) {
		// 如果省份信息不存在，则返回
		if (!province)
			return;
		$(obj).val(province);
		// 给省份的input框之后的input框赋值为"";
		$(obj).siblings("input").eq(1).val('');
		$(obj).siblings("input").eq(3).val('');
		$(obj).siblings("input").eq(5).val('');
		// 隐藏省份的input框之后所有的input框
		$(obj).siblings("input").eq(1).hide();
		$(obj).siblings("input").eq(3).hide();
		$(obj).siblings("input").eq(5).hide();
	}
	// 赋值城市的input框
	function writeCityValue(city, obj) {
		// 如果城市信息不存在，则返回
		if (!city)
			return;
		$(obj).val(city);
		// 给城市的input框之后的input框赋值为"";
		$(obj).siblings("input").eq(2).val('');
		$(obj).siblings("input").eq(4).val('');
		// 隐藏城市的input框之后所有的input框
		$(obj).siblings("input").eq(2).hide();
		$(obj).siblings("input").eq(4).hide();
	}
	// 赋值区县的input框
	function writeCountyValue(county, obj) {
		// 如果区县信息不存在，则返回
		if (!county)
			return;
		$(obj).val(county);
		// 给区县的input框之后的input框赋值为"";
		$(obj).siblings("input").eq(4).val('');
		// 隐藏区县的input框之后所有的input框
		$(obj).siblings("input").eq(4).hide();
	}
	// 赋值街道的input框
	function writeStreetValue(street, obj) {
		// 如果街道信息不存在则返回
		if (!street)
			return;
		$(obj).val(street);
	}

	// 显示省份列表
	function showProvinceList(obj) {
		// 隐藏省份列表之外的其他列表
		hideCityList();
		hideCountyList();
		hideStreetList();
		// 定义生成的列表的样式
		p_css = {
			'top' : $(obj).offset().top + $(obj).outerHeight() + 'px',
			'left' : $(obj).offset().left + 'px'
		};
		// 生成显示省份列表
		createP(obj).css(p_css).show();
	}
	// 显示城市列表
	function showCityList(province, obj) {
		// 隐藏城市列表之外的其他列表
		hideProvinceList();
		hideCountyList();
		hideStreetList();
		// 如果省存在，获取对应的城市信息
		if (!$(obj).siblings("input").eq(0)
				|| $(obj).siblings("input").eq(0).length === 0) {
			return;
		}
		c_list = getCityList($(obj).siblings("input").eq(0).val());
		$(obj).show();
		// 定义生成的列表的样式
		c_css = {
			'top' : $(obj).offset().top + $(obj).outerHeight() + 'px',
			'left' : $(obj).offset().left + 'px'
		};
		// 生成显示城市列表
		createC(c_list, obj).css(c_css).show();
	}

	// 显示县级列表
	function showCountyList(city, obj) {
		// 隐藏县级列表之外的其他列表
		hideProvinceList();
		hideCityList();
		hideStreetList();
		// 如果省市都存在，获取对应的区县信息
		if (!$(obj).siblings("input").eq(0)
				|| $(obj).siblings("input").eq(0).length === 0
				|| !$(obj).siblings("input").eq(2)
				|| $(obj).siblings("input").eq(2).length === 0) {
			return;
		}
		x_list = getCountyList($(obj).siblings("input").eq(0)
				.val(), $(obj).siblings("input").eq(2).val());
		if (x_list === undefined) { // 如果是直辖市，则不存在县级
			$(obj).hide();
			return;
		}
		$(obj).show();
		// 定义生成的列表的样式
		x_css = {
			'top' : $(obj).offset().top + $(obj).outerHeight() + 'px',
			'left' : $(obj).offset().left + 'px'
		};
		// 生成显示区县列表
		createX(x_list, obj).css(x_css).show();
	}
	// 显示街道列表
	function showStreetList(county, obj) {
		// 隐藏街道列表之外的其他列表
		hideProvinceList();
		hideCityList();
		hideCountyList();

		// 如果省市区县都存在，获取对应的街道信息
		if (!$(obj).siblings("input").eq(0)
				|| $(obj).siblings("input").eq(0).length === 0
				|| !$(obj).siblings("input").eq(2)
				|| $(obj).siblings("input").eq(2).length === 0
				|| !$(obj).siblings("input").eq(4)
				|| $(obj).siblings("input").eq(4).length === 0) {
			return;
		}

		s_list = getStreetList($(obj).siblings("input").eq(0)
				.val(), $(obj).siblings("input").eq(2).val(),
				$(obj).siblings("input").eq(4).val());
		if(s_list.length===0){
			return;
		}
		$(obj).show();
		// 定义生成的列表的样式
		s_css = {
			'top' : $(obj).offset().top + $(obj).outerHeight() + 'px',
			'left' : $(obj).offset().left + 'px'
		};
		// 生成显示街道列表
		createS(s_list, obj).css(s_css).show();
	}

	// 隐藏省份列表
	function hideProvinceList() {
		if (pdiv && pdiv.length > 0) {
			pdiv.remove();
		}
	}

	// 隐藏城市列表
	function hideCityList(obj) {
		if ($(obj) && $(obj).length > 0) {
			$(obj).remove();
		}
	}
	// 隐藏县级列表
	function hideCountyList(obj) {
		if ($(obj) && $(obj).length > 0) {
			$(obj).remove();
		}
	}
	// 隐藏街道列表
	function hideStreetList(obj) {
		if ($(obj) && $(obj).length > 0) {
			$(obj).remove();
		}
	}
	// 获取省份列表
	function getProvinceList() {
		return provinceAndCity['p'];
	}
	// 获取城市列表
	function getCityList(province) {
		return provinceAndCity['c'][province];
	}
	// 获取县级列表
	function getCountyList(ps, cs) {
		return provinceAndCity['a'][ps + '-' + cs];
	}
	// 获取街道列表
	function getStreetList(ps, cs, xs) {
		return provinceAndCity['r'][ps + '-' + cs + '-' + xs];
	}

	// 创建省份列表
	function createP(obj) {
		// 得到当前的省份input框的id
		pid = $(obj).attr("id");
		pdiv = $("#" + pid + "_prodiv");
		// 如果创建过
		if (pdiv && pdiv.length > 0) {
			// return pdiv;
			$(pdiv).remove();
		}
		// 如果没有创建过
		var html = '<div class="provinces clearfix areaselectlist" id="' + pid + '_prodiv" >';
		for (var i = 0; i < p_list.length; i++) {
			//省名称
			var pName = p_list[i].substring(0, p_list[i].indexOf("#"));
			if(pName){
				//省编码
				var pCode = p_list[i].substring(p_list[i].indexOf("#") + 1);
				html += '<a class="a" href="javascript:;">' + pName + '</a>';
				html += '<input type="hidden" value="' + pCode + '">';
			}
		}
		html += '</div>';
		pdiv = $(html);
		// 给生成的省份列表中的链接添加点击监听
		pdiv.delegate('a', 'click', function(event) {
			var target = $(this);
			var proCode = target.next("input").val();
			cur_p = target.text();
			// 为拼装label和隐藏域的变量赋值
			pro = cur_p;
			// 为input框写入值
			writeProvinceValue(pro, obj);
			// 显示省份对应的城市列表
			showCityList(pro, $(obj).siblings("input").eq(1));
			areaId = 0;
			// 将选中的省份写入label
			editLabelAndHidden(areaId, obj);
			// 给省份的隐藏域赋值
			$(obj).siblings("input").eq(0).val(proCode);
			// 阻止事件冒泡
			event.stopPropagation();
		}).appendTo('body');
		// }
		return pdiv;
	}

	// 创建城市列表
	function createC(citys, obj) {
		// 得到当前的城市input框的id
		cid = $(obj).attr("id");
		cdiv = $("#" + cid + "_citydiv");
		var html = '';
		// 如果创建过
		if (cdiv && cdiv.length > 0) {
			/**
			 * for (var i = 0; i < citys.length; i++) { html += '<a class="a"
			 * href="javascript:;">' + citys[i].substring(0,
			 * citys[i].indexOf("#")) + '</a>'; html += '<input type="hidden"
			 * value="'+ citys[i].substring(citys[i].indexOf("#")+1) +'">'; }
			 * cdiv.html(html);
			 */
			$(cdiv).remove();
			// return cdiv;
		}
		// 如果没有创建过
		html += '<div  class="citys clearfix areaselectlist" id="' + cid
				+ '_citydiv" style="display:none;">';
		for (var i = 0; i < citys.length; i++) {
			//城市名称
			var cName = citys[i].substring(0, citys[i].indexOf("#"));
			if(cName){
				//城市编码
				var cCode = citys[i].substring(citys[i].indexOf("#") + 1);
				html += '<a class="a" href="javascript:;">' + cName + '</a>';
				html += '<input type="hidden" value="' + cCode + '">';
			}
		}
		html += '</div>';
		cdiv = $(html);
		// 给生成的城市列表中的链接添加点击监听
		cdiv.delegate('a', 'click', function(event) {
			var target = $(this);
			var cityCode = target.next("input").val();
			cur_c = target.text();
			// 为input框写入值
			writeCityValue(cur_c, obj);
			// 点击链接后隐藏城市列表
			hideCityList($(cdiv));
			// 为拼装label和隐藏域的变量赋值
			pro = $(obj).siblings("input")
					.eq(0).val();
			city = cur_c;
			// 显示城市对应的区县列表
			if (getCountyList(pro, city)) {
				showCountyList(city, $(obj).siblings(
						"input").eq(3));
			}
			areaId = 1;
			// 将选中的区县写入label
			editLabelAndHidden(areaId, obj);
			// 给城市的隐藏域赋值
			$(obj).siblings("input").eq(2).val(
					cityCode);
			// 阻止事件冒泡
			event.stopPropagation();
		}).appendTo('body');
		return cdiv;
	}

	// 创建县级列表
	function createX(countys, obj) {
		// 得到当前的区县input框的id
		xid = $(obj).attr("id");
		xdiv = $("#" + xid + "_coudiv");
		var html = '';
		// 如果创建过
		if (xdiv && xdiv.length > 0) {
			/*******************************************************************
			 * for (var i = 0; i < countys.length; i++) { html += '<a class="a"
			 * href="javascript:;">' + countys[i].substring(0,
			 * countys[i].indexOf("#")) + '</a>'; html += '<input
			 * type="hidden" value="'+
			 * countys[i].substring(countys[i].indexOf("#")+1) +'">'; }
			 * xdiv.html(html);
			 */
			$(xdiv).remove();
			// return xdiv;
		}
		// 如果没有创建过
		html += '<div class="countys clearfix areaselectlist" id="' + xid + '_coudiv" style="display:none;">';
		for (var i = 0; i < countys.length; i++) {
			//县名称
			var xName = countys[i].substring(0, countys[i].indexOf("#"));
			if(xName){
				//县编码
				var xCode = countys[i].substring(countys[i].indexOf("#") + 1);
				html += '<a class="a" href="javascript:;">' + xName + '</a>';
				html += '<input type="hidden" value="' + xCode + '">';
			}
		}
		html += '</div>';
		xdiv = $(html);
		// 给生成的区县列表中的链接添加点击监听
		xdiv.delegate('a', 'click', function(event) {
			var target = $(this);
			var couCode = target.next("input").val();
			cur_x = target.text();
			// 点击链接后隐藏区县列表
			hideCountyList($(xdiv));
			// 为拼装label和隐藏域的变量赋值
			pro = $(obj).siblings("input").eq(0).val();
			city = $(obj).siblings("input").eq(2).val();
			cou = cur_x;
			// 为input框写入值
			writeCountyValue(cou, obj);
			// 如果有街道信息的话，显示区县对应的街道列表
			if (getStreetList(pro, city, cou)) {
				showStreetList(cou, $(obj).siblings("input").eq(5));
			}else{
				$(obj).siblings("input").eq(5).hide().val("");
				$(obj).siblings("input").eq(6).val("");
			}
			areaId = 2;
			// 将选中的区县写入label
			editLabelAndHidden(areaId, obj);
			// 给区县的隐藏域赋值
			$(obj).siblings("input").eq(4).val(couCode);
			// 阻止事件冒泡
			event.stopPropagation();
		}).appendTo('body');
		return xdiv;
	}

	// 创建街道列表
	function createS(streets, obj) {
		// 得到当前的街道input框的id
		sid = $(obj).attr("id");
		sdiv = $("#" + sid + "_strdiv");
		var html = '';
		// 如果创建过
		if (sdiv && sdiv.length > 0 && streets) {
			/**
			 * for (var i = 0; i < streets.length; i++) { html += '<a class="a"
			 * href="javascript:;">' + streets[i].substring(0,
			 * streets[i].indexOf("#")) + '</a>'; html += '<input
			 * type="hidden" value="'+
			 * streets[i].substring(streets[i].indexOf("#")+1) +'">'; }
			 * sdiv.html(html);
			 */
			$(sdiv).remove();
			// return sdiv;
		}
		// 如果没有创建过
		html += '<div class="streets clearfix areaselectlist" id="' + sid
				+ '_strdiv" style="display:none;">';
		for (var i = 0; i < streets.length; i++) {
			var sName = streets[i].substring(0, streets[i].indexOf("#"));
			if(sName){
				var sCode = streets[i].substring(streets[i].indexOf("#") + 1);
				html += '<a class="a" href="javascript:;">' + sName + '</a>';
				html += '<input type="hidden" value="' + sCode + '">';
			}
		}
		html += '</div>';
		sdiv = $(html);
		// 给生成的街道列表中的链接添加点击监听
		sdiv.delegate('a', 'click', function(event) {
			var target = $(this);
			var streetCode = target.next("input").val();
			cur_s = target.text();
			// 点击链接后隐藏街道列表
			hideStreetList($(sdiv));
			areaId = 3;
			// 为拼装label和隐藏域的变量赋值
			pro = $(obj).siblings("input").eq(0).val();
			city = $(obj).siblings("input").eq(2).val();
			cou = $(obj).siblings("input").eq(4).val();
			str = cur_s;
			// 为input框写入值
			writeStreetValue(str, obj);
			
			$(obj).trigger("change", streetCode);
			
			// 将选中的街道写入label
			editLabelAndHidden(areaId, obj);
			// 给街道的隐藏域赋值
			$(obj).siblings("input").eq(6).val(streetCode);
			// 阻止事件冒泡
			event.stopPropagation();
		}).appendTo('body');
		return sdiv;
	}

	// 隐藏所有的地址列表
	function hideAreaSelectDiv() {
		$(".areaselectlist").hide();
	}

	// 显示已选择的地址
	function editLabelAndHidden(areaId, obj) {
		// 为label添加文本值
		var showInput = $(obj).siblings(".cf_areaselect_show");
		var showAreaSelectValue = showInput.val();
		var cfInValue = $(obj).closest("div").find(".cf_areaselect_in").val();
		var cfHidden = $(obj).siblings(".cf_areaselect_hidden");
		if(areaId == 4 && showAreaSelectValue) {
			cfHidden.val(showAreaSelectValue + cfInValue);
		} else {
			showAreaSelectValue = "";
			// 拼装label的文本值
			switch (areaId) {
			case 0:
				city = "", cou = "", str = "";
				break;
			case 1:
				cou = "", str = "";
				break;
			case 2:
				str = "";
				break;
			}
			// 拼装隐藏域的value
			var hiddenVal = "";
			if (pro !== "") {
				hiddenVal += pro + "#";
			}
			if (city !== "") {
				hiddenVal += city + "#";
			}
			if (cou !== "") {
				hiddenVal += cou;
			}
			if (str !== "") {
				hiddenVal += "#" + str;
			}

			
			var hiddenValue = "";
			if(($(obj).hasClass("cf_areaselect_pro") && (!$(obj).attr("isContain") || $(obj).attr("isContain")==="true"))
					|| ($(obj).siblings("input.cf_areaselect_pro").is(":visible")
							&& (!$(obj).siblings("input.cf_areaselect_pro").attr("isContain") || $(obj).siblings("input.cf_areaselect_pro").attr("isContain")==="true"))){
				showAreaSelectValue = pro;
				hiddenValue = pro;
			}
			if(($(obj).hasClass("cf_areaselect_city") && (!$(obj).attr("isContain") || $(obj).attr("isContain")==="true"))
				|| ($(obj).siblings("input.cf_areaselect_city").is(":visible")
						&& (!$(obj).siblings("input.cf_areaselect_city").attr("isContain")||$(obj).siblings("input.cf_areaselect_city").attr("isContain")==="true"))){
				showAreaSelectValue += city;
				hiddenValue += city;
			}
			showAreaSelectValue +=  cou + str;
			showInput.val(showAreaSelectValue);
			showInput.attr("size", 0);
			if (showInput.val().length * 1.8 > showInput.attr("size")) {
				showInput.attr("size", showInput.val().length * 1.8);
			}
			// 为详细地址隐藏域赋值(input框+详细地址输入栏)
			cfHidden.val(hiddenValue + cou + str + cfInValue);
		}
	}

	// 添加监听
	this.init = function() {
		// 为省份的input框添加点击监听
		pInput.click(function(event) {
			// 隐藏所有列表
			hideAreaSelectDiv();
			// 显示省份列表
			showProvinceList(this);
			// 阻止事件冒泡
			event.stopPropagation();
		});
		// 为城市的input框添加点击监听
		cInput.click(function(event) {
			// 隐藏所有列表
			hideAreaSelectDiv();
			// 显示城市列表
			showCityList($(this).siblings("input").eq(0).val(), this);
			// 阻止事件冒泡
			event.stopPropagation();
		});
		// 如果有区县的话，为区县的input框添加点击监听
		if (xInput) {
			xInput.click(function(event) {
				// 隐藏所有列表
				hideAreaSelectDiv();
				// 显示区县列表
				showCountyList($(this).siblings("input").eq(2).val(), this);
				// 阻止事件冒泡
				event.stopPropagation();
			});
		}
		// 为街道的input框添加点击监听
		sInput.click(function(event) {
			// 隐藏所有列表
			hideAreaSelectDiv();
			// 显示街道列表
			showStreetList($(this).siblings("input").eq(4).val(), this);
			// 阻止事件冒泡
			event.stopPropagation();
		});
		// 为详细地址输入框添加失去焦点监听
		dInput.blur(function() {
			pro = $(this).siblings("input").eq(0).val();
			city = $(this).siblings("input").eq(2).val();
			cou = $(this).siblings("input").eq(4).val();
			str = $(this).siblings("input").eq(6).val();
			areaId = 4;
			editLabelAndHidden(areaId, this);
		});
		// 为页面添加点击监听
		$(document).delegate('html', 'click',
			function(event) {
				var target = $(event.target);
				if (target.closest('.cf_areaselect_city').length === 0
						&& target.closest('.cf_areaselect_pro').length === 0
						&& target.closest('.cf_areaselect_county').length === 0
						&& target.closest('.cf_areaselect_street').length === 0) {
					// 点击页面隐藏所有的地址列表
					hideAreaSelectDiv();
				}
			});
	};
}

/** *分页表格实现** */
CForm_Ext.initPageGrid = function() {
	CForm_Ext.setPageTableReadonly();

	// 当前分页表格
	var $curPageRow = null;
	// 分页表格当前行
	var $curTr = null;

	// 增加一行按钮
	$(".cfAddPageGrid").click(
			function() {
				$curPageRow = $(this).parents(
						".cfPagegrid[cf_elementType=customPageZone]").eq(0);
			});

	// 修改一行按钮
	$(".cfModifyPageGrid").click(
			function() {
				$curPageRow = $(this).parents(".cfPagegrid[cf_elementType=customPageZone]").eq(0);
				$curTr = $(this).parents("tr").eq(0);
			});

	// 查看(用于可编辑列表在只读模式下时查看数据)
	$(".cfCheckPageGrid").click(
			function() {
				$curPageRow = $(this).parents(".cfPagegrid[cf_elementType=customPageZone]").eq(0);
				$curTr = $(this).parents("tr").eq(0);
				alert("查看");
			});
	// 删除一行按钮
	$(".cfDelPageGrid").click(
			function() {
				var $dynRow = $(this).parents(".cfPagegrid[cf_elementType=customPageZone]").eq(0);
				var $curRow = $(this).parents("tr").eq(0);
				// 获取当前行之后的所有行
				var $trs = $curRow.nextAll("tr:visible");
				// 获取当前行的行号
				var curNum = parseInt($curRow.find("td:first label").text());
				// 删除当前行
				$curRow.remove();
				// 序号重排
				$trs.each(function(i, tr) {
					$(tr).find("td:first label").text(i + curNum);
				});
			});
};

/*******************************************************************************
 * 分页表格只读
 ******************************************************************************/
CForm_Ext.setPageTableReadonly = function(form) {
	var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);

	$form.find(".cfPagegrid").each(
		function(i, pageGrid) {
			// 获取第一行,并隐藏
			var $firstRow = $(pageGrid).find("tbody tr:first");
			$firstRow.hide();

			// 隐藏可编辑列表的“增加”按钮
			// 设置可编辑列表的的背景颜色
			$(pageGrid).find("tbody tr td").each(function(i, td) {
				$(td).addClass("cfIsReadonly");
			});

			// 将所有可见域设置成只读
			var fields = $(pageGrid).find(
					"[cf_elementType=field]:visible");
			$.each(fields, function(i, field) {
				// 设置域只读
				CForm.setFieldReadOnly(field);
			});

			if (taskType === '2' || taskType === '3'
					|| taskType === '4') {
				// 显示可编辑列表右侧的“查看”按钮，为兼容有tab页的情况，不使用tr:visible选择
				if ($(pageGrid)) {
					$(pageGrid).find("th:last").show();
					$(pageGrid).find("tbody .cfAddAndDelTd").show().addClass("cfIsReadonly");
					$(pageGrid).find("tbody .cfAddAndDelTd input").hide();
					$(pageGrid).find("tbody .cfAddAndDelTd .cfCheckPageGrid").show();
				}
			} else {
				if ($(pageGrid)) {
					$(pageGrid).find("input.cfAddPageGrid").show();
					$(pageGrid).find("th:last").show();
					$(pageGrid).find("tbody .cfAddAndDelTd").show().addClass("cfIsReadonly");
					$(pageGrid).find("tbody .cfAddAndDelTd input").show();
					$(pageGrid).find("tbody .cfAddAndDelTd .cfCheckPageGrid").hide();
				}
			}
			// 分页
			CForm_Ext.loadDynRowPageBtn(this);
		});
};

/**
 * 处理动态行分页按钮事件
 */
CForm_Ext.loadDynRowPageBtn = function(dynRow) {
	// 业务表
	var modelId = $(dynRow).closest("[cf_elementType=customPageZone]").attr("cf_modelid");
	// 列信息
	var columns = "";
	var columnDefs = $(dynRow).find("tbody tr:first td .pageGridField");
	$(columnDefs).each(function(i, column) {
		var columnId = $(column).attr("id");
		columns += columnId;
		if (i !== columnDefs.length - 1) {
			columns = columns + ",";
		}
	});
	var filterCondition = "";

	// 总条数
	var $totalNum = $(dynRow).find(".pageBarContainer .page_totalNum");
	// 总页数
	var $totalPage = $(dynRow).find(".pageBarContainer .page_totalPage");
	// 每页显示条数
	var $pageSize = $(dynRow).find(".pageBarContainer .page_pageSize");
	// 当前页数
	var $curPageNum = $(dynRow).find(".pageBarContainer .page_curPageNum");

	var limit = $pageSize.find("option:first").val();
	// 首页
	$(dynRow).find(".pageBarContainer .page_firstPage").click(
		function() {
			// 将当前页数设置为1
			$curPageNum.val(1);
			// 请求数据
			CForm_Ext.queryDynData(modelId, columns, filterCondition, 1, limit, dynRow);
		});

	// 上一页
	$(dynRow).find(".pageBarContainer .page_dynPageUp").click(
			function() {
				// 当前页数
				var curPageNum = parseInt($curPageNum.val());

				var start = curPageNum - 1;
				if (start < 1)
					start = 1;
				if (start > parseInt($totalPage.html()))
					start = parseInt($totalPage.html());
				// 设置当前页数
				$curPageNum.val(start);
				// 请求数据
				CForm_Ext.queryDynData(modelId, columns, filterCondition,
						start, limit, dynRow);
			});

	// 下一页
	$(dynRow).find(".pageBarContainer .page_dynPageDown").click(
			function() {
				// 当前页数
				var curPageNum = $curPageNum.val();
				// 总页数
				var totalPage = parseInt($totalPage.html());

				var start = parseInt(curPageNum) + 1;
				if (start > totalPage)
					start = totalPage;
				// 设置当前页数
				$curPageNum.val(start);

				CForm_Ext.queryDynData(modelId, columns, filterCondition,
						start, limit, dynRow);
			});

	// 尾页
	$(dynRow).find(".pageBarContainer .page_endPage").click(
			function() {
				// 总页数
				var totalPage = parseInt($totalPage.html());
				// 设置当前页数
				$curPageNum.val(totalPage);

				CForm_Ext.queryDynData(modelId, columns, filterCondition,
						totalPage, limit, dynRow);
			});

	// 选择每页显示条数
	$pageSize.change(function() {
		limit = $(this).children("option:selected").val();
		$curPageNum.val(1);
		$totalPage.html(Math.ceil($totalNum.html() / limit));
		if ($totalNum.html() === 0) {
			$totalPage.html(1);
		}
		CForm_Ext.queryDynData(modelId, columns, filterCondition, 1, limit,
				dynRow);
	});

	// 跳转页数
	$curPageNum.bind('keypress', function(event) {
		if (event.keyCode !== "13") {
			return;
		}
		var totalPage = parseInt($totalPage.html());
		var start = parseInt($(this).val());
		var re = /^[1-9]+[0-9]*]*$/;
		if (!re.test(start) || start > totalPage) {
			G3.alert("提示", "请输入1至" + totalPage + "的整数！");
			$(this).val(1);
			return;
		}
		CForm_Ext.queryDynData(modelId, columns, filterCondition, start, limit,
				dynRow);
	});
	CForm_Ext.queryDynData(modelId, columns, filterCondition, 1, limit, dynRow);
};

/**
 * 分页查询动态行数据
 */
CForm_Ext.queryDynData = function(modelId, columns, filterCondition, start,
		limit, pageGrid) {
	var queryDynDataUrl = G3.webPath
			+ "/command/dispatcher/"
			+ "com.inspur.gcloud.cform.pagegrid.cmd.GCloudPageGridDispatcherCmd/queryData";
	//加载数据配置
	var dynDataCfg = {
		url : queryDynDataUrl,
		data : "modelId=" + modelId + "&columns=" + columns
				+ "&filterCondition=" + filterCondition + "&start=" + start
				+ "&limit=" + limit,
		dataType : "json",
		async : false,
		cache : false,
		success : function(pageGridData) {
			CForm_Ext.setPagetableData($(pageGrid), pageGridData[modelId],
					pageGridData.totalCount);
		},
		error : function() {
			G3.alert("提示", "请求数据出错");
		}
	};
	//加载数据
	//$.ajax(dynDataCfg);
	 mui.ajax(dynDataCfg);
};
/**
 * 向指定的分页表格里设置实际数据，
 *
 * @param $pageTable 分页表格
 * @param value 数据
 */
CForm_Ext.setPagetableData = function($pageTable, value, totalCount) {
	// 获取第一行（可能是隐藏状态）
	var $firstRow = $pageTable.find("tbody tr:first");
	// 克隆第一行作为模板
	var $tr = $firstRow.clone(true).show();

	// th中可能会有“增加”按钮，需要移除
	$pageTable.find("th:last .cfAddRow").remove();
	// 清空动态行的数据
	$pageTable.find(".cfPagetable tbody tr").remove();

	CForm_Ext.addPageTableRows($pageTable, $tr, value, totalCount);
};
/***
 * 向指定的分页表格添加行级数据
 * **/
CForm_Ext.addPageTableRows = function($dynRow, $tr, value, totalCount) {
	var fragment = document.createDocumentFragment();
	// 设置分页信息
	var limit = $dynRow.find(".pageBarContainer .page_pageSize option:selected").val();
	if (!limit)
		limit = 10;
	num = value.length > limit ? limit : value.length;
	// 总页数
	$dynRow.find(".pageBarContainer .page_totalPage").html(Math.ceil(totalCount / limit));
	// 总条数
	$dynRow.find(".pageBarContainer .page_totalNum").html(totalCount);
	//条数
	var num = value.length;
	for (var i = 0; i < num; i++) {
		// 第（i+1）行数据
		var record = value[i];
		var $cloneTr = $tr.clone(true);

		// 修改单选按钮name属性，否则会与其他行的单选按钮成一组
		$cloneTr.find(":radio").attr({
			name : "r_" + new Date().getTime()
		});

		// 设置序号
		var rowNum = record["SUB_TBL_NUM"];
		if (!rowNum) {
			rowNum = i + 1;
		}
		$cloneTr.find("td:first label").text(rowNum);

		// 产生一个32位随机数，赋给id为SUB_TBL_PK的域
		var pk = CForm.createUUID();
		$cloneTr.find("#SUB_TBL_PK").val(pk);

		var $fields = $cloneTr.find("[cf_elementtype='pageGridField']");
		$.each($fields, function(idx, field) {
			var val = record[($(field).attr("id")).toUpperCase()];
			if (val) {
				CForm.setFieldValue(field, val);
			}
			// 在分页的情况下，如果在流程定义中将域设置成只读状态，则需要将域重新设置成只读
			if ($(field).parent().hasClass("cfIsReadonly")) {
				CForm.setFieldReadOnly(field);
			}
		});
		fragment.appendChild($cloneTr[0]);
	}
	// 一次性添加到DOM
	$dynRow.find(".cfPagetable tbody").append(fragment);
};

/**获取一行数据**/
CForm_Ext.getPageGridRowData = function($curTr) {
	var dataJson = {};
	// 获取当前行中，所有与编辑区有映射关系的域
	$curTr.find(".pageGridField").each(function(i, field) {
		// 域ID
		var fieldid = ($(field).attr("id")).toUpperCase();
		var fieldValue = CForm.getFieldValue(field);
		// 组装域值
		if (fieldid) {
			dataJson[fieldid] = fieldValue;
		}
	});
	return dataJson;
};
/**增加一条数据**/
CForm_Ext.setPageGridRowData = function($curPageGrid, jsonObj, $curTr) {
	var $cloneTr = null;
	var $lastRow = null;
	if (!$curTr) {
		// 获取最后一行
		$lastRow = $curPageGrid.find("tbody tr:last");
		$cloneTr = $lastRow.clone(true);
	}

	// 清空输入域的值(按钮、单选、复选、隐藏域的值不能清空)
	$cloneTr.find(":input[type!=button][type!=radio][type!=checkbox][type!=hidden]").val('');
	// 移除只读时设置的值
	$cloneTr.find(".readOnlyFieldVal").remove();

	// 设置单选按钮为未选中状态，并修改name属性，否则会与其他行的单选按钮成一组
	$cloneTr.find(":radio").attr({
		checked : false,
		name : "r_" + new Date().getTime()
	});
	// 设置复选框为未选中状态
	$cloneTr.find(":checkbox").attr("checked", false);
	$lastRow.after($cloneTr);

	// 序号重排
	// 获取当前行的行号
	var curNum = parseInt($lastRow.find("td:first label").text());
	// 只有当前行之后的行才需要重新设置行号
	var $trs = $lastRow.nextAll("tr:visible");
	$trs.each(function(i) {
		$($cloneTr).find("td:first label").text(i + 1 + curNum);
	});
	// 设置域值
	$cloneTr.find("[cf_elementtype='pageGridField']").each(function(i, field) {
		// 获取域值
		var fieldId = ($(field).attr("id")).toUpperCase();
		var fieldValue = jsonObj[fieldId];
		// 设置域值
		CForm.setFieldValue(field, fieldValue);

		if (field.type === "hidden") {
			return true;
		}
		// 可编辑列表中列表区的域都要设置成只读，防止在列表区直接修改数据
		CForm.setFieldReadOnly(field);
		$(this).closest("td").removeClass("cfIsReadonly");
	});
};

/** *给指定表单节点添加校验className** */
function addValidCalssName(form){
	// 查询表单
	var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
	//
	if ($form.length <= 0) {
		G3.alert("提示", "请指定要要获得数据的表单!");
		return;
	}
	var fields = $form.find("[cf_elementType=field]");
	$.each(fields, function() {
		var validClass = $(this).attr("tempClass");
		$(this).addClass(validClass);
		$(this).removeAttr("tempClass");
	});
}
/** *给指定表单节点清除校验className** */
function removeValidClassName(form){
	// 查询表单
	var $form = form ? $(form) : $("[cf_elementType=form]").eq(0);
	//
	if ($form.length <= 0) {
		G3.alert("提示", "请指定要要获得数据的表单!");
		return;
	}

	var fields = $form.find("[cf_elementType=field]");
	$.each(fields, function() {
		// 将class属性移交到tempClass属性中
		$(this).removeClass(function() {
			var befClass = $(this).attr("class");
			var validClass = cleanOriginalClassName(befClass);
			$(this).attr("tempClass",validClass);
			return validClass;
		});
	});
}
/** *将class内的非校验class名称清除** */
function cleanOriginalClassName(className){
	var validClassNameArray=new Array("cfIsInteger","cfIsFloat","cfIsZipCode","cfIsEmail","cfIsPhoneNum","cfIsMobileNum","cfIsIdCard","cfIsRegExp","cfIsRequired","cfIsReadonly");
	var validClassName ="";
	if(className !==null && className!==undefined && className !==""){
		$.each(validClassNameArray,function(n,value) {
			if(className.indexOf(value)>0){
				validClassName += value +" ";
			}
		});
	}
	return validClassName;
}

/** *恢复表单变更前内容** */
function resetDynTableContent($div){
	var $preDiv = $div.closest(".cf_change_model.page-header").prev();

	//获取前表单数据
	var $prefields = $preDiv.find("[cf_elementType=field]");
	var preMapData= new CForm.Map();
	$.each($prefields, function() {
		var key = $(this).attr("cf_modelItemId");
		var value = $(this).val();
		preMapData.put(key,value);
	});
	var objData = new Object();
	for(var key in preMapData.map){
		var $pre_field = $preDiv.find("[cf_modelItemId ='"+key+"']");
		var cf_biz2form = $pre_field.attr("cf_biz2form");
		var $current_field = $div.find("[cf_biz2form='"+cf_biz2form+"']");
		var currentModelItemId = $current_field.attr("cf_modelItemId");
		if(currentModelItemId !=null){
			objData[currentModelItemId] = preMapData.get(key);
		}else{
			objData[key] = preMapData.get(key);
		}
	}

	//清除变更后的表格
	cleanValueDynTable($div);
	CForm.setFormData($div, objData);
}
//清除变更后的表格
function cleanValueDynTable($table){
	var fields = $table.find(":input[type!=button][type!=radio][type!=checkbox][cf_elementType=field]");
	$.each(fields, function() {
		$(this).val("");
	});
}
/** *恢复动态行变更前内容** */
function resetDynRowContent($div){
	//查找变更前动态行的div
	var $preDiv = $div.closest(".cf_change_model.page-header").prev();
	var $pre_fieldSet = $preDiv.find("fieldSet").find("fieldSet");
	//查询变更后的fieldSet
	var $current_fieldSet = $div.find("fieldSet").find("fieldSet");
	//当纵向变更组件，变更前和变更后分别有多个动态行时
	//会将变更前动态行按顺序依次copy数据
	for(var i=0;i<$pre_fieldSet.length;i++){
		var pre_cf_modelId = $pre_fieldSet.eq(i).attr("id");
		if(pre_cf_modelId==null){
			return;
		}
		var preDynRowDatas = CForm_Ext.getDynRowData(pre_cf_modelId, "cf_modelItemId",$preDiv);
		var preDataLists = preDynRowDatas.get(pre_cf_modelId).get("zoneData");
		var currentData = [];
		//重新组装新的数据
		for(var j=0;j<preDataLists.size();j++){
			var preDynRowData = preDataLists.get(j);
			var objData = new Object();
			for(var key in preDynRowData.map){
				var $pre_field = $pre_fieldSet.eq(i).find("[cf_modelItemId ='"+key+"']");
				var cf_biz2form = $pre_field.attr("cf_biz2form");
				if(cf_biz2form!==null){
					var $current_field = $current_fieldSet.eq(i).find("[cf_biz2form='"+cf_biz2form+"']");
					var currentModelItemId = $current_field.attr("cf_modelItemId");
					if(currentModelItemId !=null){
						objData[currentModelItemId] = preDynRowData.get(key);
					}else{
						objData[key] = preDynRowData.get(key);
					}
				}
			}
			objData["cf_recordState"]="1";
			objData.SUB_TBL_PK = undefined;
			currentData.push(objData);
		}
		var $currentRows = $current_fieldSet.eq(i).find("tr[cf_recordState=1],tr[cf_recordState=3]");
		//清除变更后的动态行
		$.each($currentRows,function(i, currentRow) {
			$(currentRow).attr("cf_recordState","2");
			$(currentRow).hide();
		});
		// 获取第一行（可能是隐藏状态）
		var $firstRow = $current_fieldSet.eq(i).find("tbody tr:first");
		// 克隆第一行作为模板
		var $tr = $firstRow.clone(true).show();
		// 将模板行的状态设置为3
		$tr.attr("cf_recordState","1");
		//将操作栏的查询按钮展现
		$tr.find(".cfAddAndDelTd").show();
		$tr.find(".cfAddAndDelTd input").hide();
		$tr.find(".cfAddAndDelTd .cfCheckRow").show();
		var zoneData = {};
		zoneData["zoneData"]=currentData;
		CForm.addRows($current_fieldSet.eq(i), $tr, "cf_modelItemId", zoneData);
	}
}
//只读动态行操作栏展现查看按钮操作
function setReadDynShowCheckBtn($dynDom){
	var $trs = $dynDom.find("fieldSet").find("tr[cf_recordState=1],tr[cf_recordState=3]");
	$dynDom.find("thead tr th:last").show();
	$.each($trs,function(i, tr) {
		$(tr).find(".cfAddAndDelTd").show();
		$(tr).find(".cfAddAndDelTd input").hide();
		$(tr).find(".cfAddAndDelTd .cfCheckRow").show();
	});
}

/** *切换纵向变更组件选中状态** */
function switchVSelectState(checkboxDom,state){
	var divId = checkboxDom.attr("id") + '_div';
	var $div = $('#' + divId);

	//展开或者关闭切换状态
	var $currentModel = checkboxDom.closest(".cf_change_model");
	if(state){
		$currentModel.find("span.fa").removeClass("fa-chevron-circle-down");
		$currentModel.find("span.fa").addClass("fa-chevron-circle-up");
		$currentModel.find("span.fa").attr("title","点击合起");
	}else{
		$currentModel.find("span.fa").removeClass("fa-chevron-circle-up");
		$currentModel.find("span.fa").addClass("fa-chevron-circle-down");
		$currentModel.find("span.fa").attr("title","点击展开");
	}
	var $cfChangeModel = $currentModel.siblings();

	if (state) {// 打开可编辑
		var id = $($div).find(".cfDynRow.cfEditGrid").attr("id");
		var editFields = $("#" + id + "_dialog").find("[cf_elementtype=editField]");
		$.each(editFields, function() {
			if (this.type !== "hidden") {
				$(this).show();
			}
			CForm_Ext.setFieldEdit(this);
		});
		CForm_Ext.setFormEdit($div);
		//普通表格增加校验方式
		var $cfTables = $div.find(".cfTable");
		$.each($cfTables, function() {
			$.each($(this).find("tr:visible"),function(){
				$(this).find('td').each(function(){
					addValidCalssName($(this));
				});
			});
		});
		//动态行编辑表格增加校验方式
		var $cfDynRows = $div.find(".cfDynRow");
		$.each($cfDynRows, function() {
			$.each($(this).find("tr:visible"),function(){
				$(this).find('td').each(function(){
					addValidCalssName($(this));
				});
			});
		});
	} else {
		// 关闭不可编辑
		CForm_Ext.setFormReadOnly($div, "disabled");
		//清除普通表格内的校验方式
		var $cfTableDoms = $div.find(".cfTable");
		$.each($cfTableDoms, function() {
			resetDynTableContent($div);
			$.each($(this).find("tr:visible"),function(){
				$(this).find('td').each(function(){
					removeValidClassName($(this));
				});
			});
		});
		//清除动态行编辑表的校验方式
		var $cfDynRowDoms = $div.find(".cfDynRow");
		$.each($cfDynRowDoms, function() {
			resetDynRowContent($div);
			$.each($(this).find("tr:visible"),function(){
				$(this).find('td').each(function(){
					removeValidClassName($(this));
				});
			});
		});
	}
	//展开或者关闭
	$.each($cfChangeModel, function() {
		$(this).show();
		if(state){
			switchDynShowCheckAndEditBtn($(this));
		}else{
			setReadDynShowCheckBtn($(this));
			$(this).hide();
		}
	});
	switchVSelectStateExt(checkboxDom,state);
}

/***
 * 切换纵向变更组件选中状态扩展
 * checkBoxDom为checkbox切换按钮节点
 * state为切换按钮是否打开状态，true为打开，false为关闭
 * ***/
function switchVSelectStateExt(checkboxDom,state){

}
/** *切换横向变更组件选中状态** */
function switchHSelectState(checkBoxDom,state){
	//获取当前行
	var $currentTr = checkBoxDom.closest("tr");
	var $isHandingTr;
	//获取当前行第一个单元格的合并数
	var rowspanCount = $("td:eq(0)", $currentTr).attr("rowspan");
	if(!rowspanCount){//如果没有合并行，则默认为1
		rowspanCount = 1;
	}
	//循环处理该切换按钮下的所有tr
	for(var i=0;i<rowspanCount;i++){
		if(i===0){
			$isHandingTr = $currentTr;
		}else{
			$isHandingTr = $isHandingTr.next("tr");
		}
		var $isHandingTd = $("td:last", $isHandingTr);
		if(state){//打开
			CForm_Ext.setFormEdit($isHandingTd);
			addValidCalssName($isHandingTd);
			$isHandingTd.find(".input-group-addon").show();
		}else{//关闭
			//清空编辑框
			var fields =$isHandingTd.find(":visible:input[type!=button][type!=radio][type!=hidden][type!=checkbox][cf_elementType=field]");
			cleanFieldValue(fields);
			$isHandingTd.find(":radio").attr({checked : false});
			// 设置复选框为未选中状态
			$isHandingTd.find(":checkbox").attr("checked", false);
			//关闭不可编辑
			CForm_Ext.setFormReadOnly($isHandingTd, "disabled");
			removeValidClassName($isHandingTd);
			$isHandingTd.find(".input-group-addon").hide();
		}
	}
	//切换按钮扩展函数
	switchHSelectStateExt(checkBoxDom,state);
}
/**
 * 清空节点的值
 * @param fields
 */
function cleanFieldValue(fields){
	$.each(fields, function() {
		// 内容清空
		$(this).val("");
	});
}
/***
 * 切换横向变更组件选中状态扩展
 * checkBoxDom为checkbox切换按钮节点
 * state为切换按钮是否打开状态，true为打开，false为关闭
 * ***/
function switchHSelectStateExt(checkBoxDom,state){

}

/***
 * 切换纵向变更组件初始化扩展
 * checkBoxDom为checkbox切换按钮节点
 * isOpenswitch是否打开切换按钮 是为true 否为false
 * ***/
function switchVInitExt(checkBoxDom,isOpenswitch){

}
/***
 * 切换横向变更组件初始化扩展
 * checkBoxDom为checkbox切换按钮节点
 * isOpenswitch 是否打开切换按钮 是为true 否为false
 * ***/
function switchHInitExt(checkBoxDom,isOpenswitch){

}

//切换动态行操作栏查看和编辑按钮的展示
function switchDynShowCheckAndEditBtn($dynDom){
	var $trs = $dynDom.find("fieldSet").find("tr[cf_recordState=1],tr[cf_recordState=3]");
	$.each($trs,function(i, tr) {
		if($(tr).find(".cfAddAndDelTd .cfModifyRow").is(":visible")){
			$(tr).find(".cfAddAndDelTd .cfCheckRow").hide();
		}
	});
}
/***
 * 平台覆盖云表单已有方法
 * @author wangwx
 * 
 * ***/

/**
 * 扩展云表单已有方法 将域设置为只读
 */
CForm.setFieldReadOnly = function(field) {
	var $field = $(field);
	// 设置背景颜色
	var td = $field.parent("td");
	if (td.length > 0) {
		td.addClass("cfIsReadonly");
		// 去掉必填符号
		td.prev("td").find("font.isRequiredSign").remove();
	} else {//解决td内input框外面又包一层的情况
		td = $($field.parents("td")[0]);
		td.addClass("cfIsReadonly");
		// 去掉必填符号
		td.prev("td").find("font.isRequiredSign").remove();
		$field.siblings("*").not(".readOnlyFieldVal").hide();
	}

	var fieldValue = "";
	// 根据域类型获取域值
	switch (field.type) {
	// 列表框
	case "select-multiple":
		// 下拉框
	case "select-one":
		// 选中项
		var $options = $("option:selected", $field);
		if ($options.length) {
			var valArray = [];
			$.each($options, function() {
				if ($(this).val()) {
					valArray.push($(this).text());
				}
			});
			fieldValue = valArray.join(",");
		}
		break;
	// 多行文本框
	case "textarea":
		// 单行文本框
	case "text":
		fieldValue = $.trim($field.val());
		break;
	// 单选按钮
	case "radio":
		break;
	// 复选框
	case "checkbox":
		break;
	// 按钮
	case "button":
		fieldValue = "";
		break;
	}
	if (field.type == "checkbox") {
		$field.prop("disabled", "disabled");
	} else if (field.type == "radio") {
		$field.prop("disabled", "disabled");
	} else {
		// 添加显示值
		var $font = $field.next(".readOnlyFieldVal");
		// 如果这个元素是隐藏的，则不设置只读
		if ($field.hasClass("cf_hidden")) {
			$field.hide();
			return;
		}
		// 正则表达式替换是为了处理多行文本框的换行
		var reg = new RegExp("\n", "g");
		fieldValue = fieldValue.replace(reg, "<br/>");
		// 隐藏
		$field.hide();

		if (!fieldValue) {
			return;
		}
		if (field.type == "hidden") {
			return;
		}
		if ($font.length) {
			$font.text(fieldValue);
		} else {
			$field.after("<font class='readOnlyFieldVal'>" + fieldValue + "</font>");
		}
	}
};

var flag = true;
/**
 * 扩展云表单中的表单校验方法 提交数据时校验
 */
CForm.validate = function($form) {
	if (!$form || $form.length == 0) {
		$form = $(document);
	}
	// 校验结果
	var isValid = true;
	var firstValidateDom = "";
	//必填错误信息提示
	$form.find('*[cf_isrequirederrormessage]').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		var errorMsg = $field.attr("cf_isrequirederrormessage");
		$field.attr("cf_errorMsg",errorMsg);
	});
	// 非空校验
	//$form.find(".cfIsRequired[type!=hidden]:not('[cf_elementType=editField]')").not("[style*='display: none']").each(
	$form.find(".cfIsRequired[type!=hidden]:not('[cf_elementType=editField]'):visible").each(
		function(i, field) {
			var noEmptyValid = true;
			// 如果是动态行中被隐藏的行，则不需要校验
			if ($(field).closest("tr").css("display") == "none") {
				return true;
			}
			var $field = $(field);
			switch (field.type) {
			// 列表框
			case "select-multiple":
				// 至少选中一项
				$options = $field.find("option:selected");
				if (!$options.length) {
					noEmptyValid = false;
				}
				break;
			// 单选按钮
			case "radio":
				// 同一组中至少有一个选中
				$radios = $("input[type=radio][name="
						+ $field.attr("name") + "]:checked");
				if (!$radios.length) {
					noEmptyValid = false;
				}
				break;
			// 复选框
			case "checkbox":
				// 同一组中至少有一个选中
				$checkboxes = $("input[type=checkbox][name="
						+ $field.attr("name") + "]:checked");
				if (!$checkboxes.length) {
					noEmptyValid = false;
				}
				break;
			default:
				if (!$.trim($field.val())) {
					noEmptyValid = false;
				}
				break;
			}
			if (!noEmptyValid) {
				CForm.showTips($field, "cfIsRequired");
				isValid = false;
				if(firstValidateDom==""){
					firstValidateDom = $field;
				}
			}else{
				$field.attr("cf_errorMsg","");
			}
		});

	// 数据类型校验
	$form.find('.cfIsInteger:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val && !CForm.isInteger(val)) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			
			CForm.showTips($field, "cfIsInteger");
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});

	// 小数校验
	$form.find('.cfIsFloat:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			// 先判断是否是整数，如果是整数，直接通过
			if (CForm.isInteger(val)) {
				//isValid = true;
				//return true;
			} else if (!CForm.isFloat(val)) {
				// 不是小数，校验是否整数
				if (!CForm.isInteger(val)) {
					var precision = $field.attr("cf_fieldPrecision");
					$field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
					CForm.showTips($field, "cfIsFloat");
					isValid = false;
					if(firstValidateDom==""){
						firstValidateDom = $field;
					}
				}
			} else {
				// 精确度校验
				var precision = $field.attr("cf_fieldPrecision");
				if (precision) {
					var floatLength = val.toString().split(".")[1].length;
					if (floatLength > precision) {
						$field.attr("cf_errorMsg",errorMsg.replace("@precision",precision));
						CForm.showTips($field, "cfIsFloat", precision);
						isValid = false;
						if(firstValidateDom==""){
							firstValidateDom = $field;
						}
					}
				}
			}
		}
	});

	// 邮政编码校验
	$form.find('.cfIsZipCode:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val && !CForm.isZipCode(val)) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			CForm.showTips($field, "cfIsZipCode");
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});

	// 电子邮件校验
	$form.find('.cfIsEmail:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val && !CForm.isEmail(val)) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			CForm.showTips($field, "cfIsEmail");
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});
	// 身份证号校验
	$form.find('.cfIsIdCard:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		var result = G3.checkIdCard(val);
		if (val && result != true) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			CForm.showTips($field, "cfIsIdCard", result);
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});

	// 固定电话校验
	$form.find('.cfIsPhoneNum:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val && !CForm.cfIsPhoneNum(val)) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			CForm.showTips($field, "cfIsPhoneNum");
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});

	// 手机号码校验
	$form.find('.cfIsMobileNum:visible').each(function(i, field) {
		var $field = $(field);
		var val = $.trim($field.val());
		if (val && !CForm.cfIsMobileNum(val)) {
			var errorMsg = $field.attr("cf_datatypeerrormessage");
			$field.attr("cf_errorMsg",errorMsg);
			CForm.showTips($field, "cfIsMobileNum");
			isValid = false;
			if(firstValidateDom==""){
				firstValidateDom = $field;
			}
		}
	});

	// 正则表达式校验
	$form.find('.cfIsRegExp:visible').each(function(i, field) {
		var $field = $(field);
		var reg = $field.attr("cf_regExp");
		if (reg) {
			var val = $.trim($field.val());
			if (val && !eval(reg).test(val)) {
				CForm.showTips($field, "cfIsRegExp");
				isValid = false;
				if(firstValidateDom==""){
					firstValidateDom = $field;
				}
			}
		}
	});
	if(!isValid){
		firstValidateDom.focus();
	}

	return isValid;
};


/**
 * 提示校验信息
 */
CForm.showTips = function($field, className, param) {
	var msg  = "";
	var showDirect = "top";
	// 动态行域判断
	var $dynRows = $field.parents(".cfDynRow");
	if ($dynRows.length) {
		var $dynRow = $dynRows.eq(0);
		var dName = $dynRow.attr("name");
		var rowNum = $field.parents("tr").find("td:first label").text();
		var colNum = $field.parent("td").index() + 1;
		msg  = "动态行[" + dName + "]第" + rowNum + "行，第"+ colNum + "列中";
	}
	var $dynEditRows = $field.parents(".cfEditTable");
	if($dynEditRows.length){
		var rowNum = $field.parents("tr").index() + 1;
		if(rowNum == 1){
			showDirect = "bottom";
		}
	}
	
	var fName = $field.attr("name");
	var errorMsg = $field.attr("cf_errorMsg");
	if(errorMsg){
		msg +=errorMsg;
	}
	switch (className) {
	// 必填
	case "cfIsRequired":
		if(!errorMsg){
			msg += "[" + fName + "]不能为空！";
		}
		break;
	// 整数
	case "cfIsInteger":
		if(!errorMsg){
			msg += "[" + fName + "]只能输入整数！";
		}
		break;
	// 小数
	case "cfIsFloat":
		if(!errorMsg){
			if (param) {
				msg += "[" + fName + "]的精确度大于" + param + "！";
			} else {
				msg += "[" + fName + "]只能输入小数！";
			}
		}
		break;
	// 邮件编码
	case "cfIsZipCode":
		if(!errorMsg){
			msg += "[" + fName + "]的值不符合邮政编码格式！";
		}
		break;
	// 电子邮件
	case "cfIsEmail":
		if(!errorMsg){
			msg += "[" + fName + "]的值不符合电子邮件格式！";
		}
		break;
	// 正则表达式
	case "cfIsRegExp":
		if(!errorMsg){
			msg += "[" + fName + "]的值不符合正则表达式规则！";
		}
		break;
	case "cfIsIdCard":
		if(!errorMsg){
			msg += "[" + fName + "]:" + param;
		}
		break;
	case "cfIsPhoneNum":
		if(!errorMsg){
			msg += "[" + fName + "]的值不符合固定电话格式！\r如果有区号，请使用[区号-座机号]的形式。";
		}
		break;
	case "cfIsMobileNum":
		if(!errorMsg){
			msg += "[" + fName + "]的值不符合手机号码格式！";
		}
		break;
	case "cfFieldLimitlength":
		if(!errorMsg){
			var fieldLength = $field.attr("cf_fieldlength");
			msg += "[" + fName + "]最多可输入"+parseInt(parseInt(fieldLength)/2)+"个汉字或"+fieldLength+"个英文！";
		}
		break;
	default:
		if(!errorMsg){
			msg += "[" + fName + "]的值不合法！";
		}
		break;
	}
	
	// 弹出框
	//alert(msg);
	//销毁校验错误弹出信息
	//手机校验临时注销
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			mui.toast(msg,{ duration:'long', type:'div' }) 
	}else{
			$field.popover('destroy');
		$field.nextAll("div.popover,.fade,.top").remove();
		//初始化校验错误弹出信息
		$field.popover({
			placement : showDirect,//top | bottom | left | right | auto
			trigger:'click | hover | focus | manual', //触发方式
			html: true,
			content:"<font color='red'>"+msg+"</font>"
		});
	}
	//编辑框增加红色框
//	$field.attr("style","border:1px solid #EE0101;outline:none;");
	$field.addClass("input_erore");
	//编辑后销毁校验错误弹出信息
	$field.click(function (e) {
//		$field.removeAttr("style");
		$field.removeClass("input_erore");
		if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
			$(this).popover('destroy');
			$(this).nextAll("div.popover,.fade,.top").remove();
		}
    });
	// 聚焦
//	$field.focus();
};



/**
 * 提示校验信息
 */
CForm.editFieldShowTips = function($field, msg) {
	//销毁校验错误弹出信息
	$field.popover('destroy');
	//初始化校验错误弹出信息
	$field.popover({
		placement : 'bottom',
		trigger:'click | hover | focus | manual', //触发方式
		html: true,
		content:"<font color='red'>"+msg+"</font>"
	}); 
	//编辑框增加红色框
//	$field.attr("style","border:1px solid #EE0101;");
	$field.addClass("input_erore");
	//编辑后销毁校验错误弹出信息
	$field.click(function (e) {
//		$field.removeAttr("style");
		$field.removeClass("input_erore");
		$(this).popover('destroy');
    });
	// 聚焦
//	$field.focus();
};

/**
 * @see 扩展云表单的通用帮助 通用帮助初始化
 */
CForm.initCommonHelp = function() {
	// 组织通用帮助
	$(".cfOrganCommonHelp").click(
			function(evt) {
				// 选择类型
				var selectType = $(this).attr('cf_selectType');
				// 是否启用数据权限
				var isUseDataPermit = $(this).attr('cf_isUseDataPermit');

				// 调用BSP组织通用帮助
				if (window.selectOrgan) {
					var organIdField = $(this).attr('cf_organIdField');
					var organNameField = $(this).attr('cf_organNameField');
					var curTd = $(this).parent();

					selectOrgan($('#' + organIdField, curTd), $('#'
							+ organNameField, curTd), selectType,
							isUseDataPermit);
				}
			});
};

/*******************************************************************************
 * @see 扩展云表单原有方法 添加必填符号
 ******************************************************************************/
function addIsRequiredSign(field) {
	var $td = $(field).parent("td").prev("td");
	if (!$td.find("font").length) {
		$td.prepend('<font class="isRequiredSign">*</font>');
	}
}

/*******************************************************************************
 * 可编辑表格弹窗打开自定义回调函数
 * 
 * @param dialogState
 *            弹窗打开状态 1 新增、3 修改、 -1 查看
 * @param editArea
 *            可编辑区域
 * @param rowData
 *            可编辑区域的值
 ******************************************************************************/
function editGridDialogOpenCallback(dialogState, editArea, rowData) {

}
/*******************************************************************************
 * 可编辑表格弹窗关闭前自定义回调函数
 * 	返回true：可以关闭；返回false：不可以关闭
 * @param dialogState 弹窗打开状态 1 新增、3 修改
 * @param editArea 可编辑区域
 * @param rowData 可编辑区域的值
 ******************************************************************************/
function editGridDialogBeforeCloseCallback(dialogState, editArea, datajson){
	return true;
}
/*******************************************************************************
 * 可编辑表格弹窗关闭自定义回调函数
 * 
 * @param dialogState 弹窗打开状态 1 新增、3 修改 
 * @param editArea 可编辑区域
 * @param rowData 可编辑区域的值
 ******************************************************************************/
function editGridDialogCloseCallback(dialogState, editArea, datajson){
	//此方法必须添加，如果有个性化方法，也必须添加以下方法
	CForm.resetEditTable();
}

/*******************************************************************************
 * 可编辑表格删除一行前自定义回调函数
 *  返回true：可以删除；返回false：不可以删除
 * @param cf_modelid
 *            modelid
 * @param rowData 可编辑区域的值
 ******************************************************************************/
function editGridBeforeDelRowCallBack(cf_modelid, rowData){
	return true;
}   