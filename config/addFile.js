const code = [{
	tableName: "基本信息",
	id: "469823830580379648",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "patientName",
		subject: "姓名",
		controlType: "text",
		deleteFlag: "0",
		operation: "yysb",
		isMustfill: true,
		show:true, //是否显隐
		maxlength: 12
	}, {
		textName: "citizenId",
		subject: "身份证",
		controlType: "text",
		deleteFlag: "0",
		operation: "sfzsm",
		isMustfill: true,
		show:true, //是否显隐
		checkRegular: "(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)"
	}, {
		textName: "patientBirthDate",
		subject: "出生日期",
		controlType: "date",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "patientGender",
		subject: "性别",
		controlType: "select",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
		values: [{
			valueName: "男",
			deleteFlag: "0",
			valueCode: "1"
		}, {
			valueName: "女",
			deleteFlag: "0",
			valueCode: "2"
		}, {
			valueName: "未知",
			deleteFlag: "0",
			valueCode: "0"
		}]
	}, {
		textName: "phoneNumber",
		subject: "手机号码",
		controlType: "number",
		deleteFlag: "0",
		operation: "yysb",
		isMustfill: true,
		show:true, //是否显隐
		checkRegular: "^1[3456789]\\d{9}$"
	}, {
		textName: "emergencyName",
		subject: "紧急联系人",
		controlType: "text",
		deleteFlag: "0",
		operation: "yysb",
		show:true, //是否显隐
	}, {
		textName: "emergencyPhone",
		subject: "联系人电话",
		controlType: "number",
		deleteFlag: "0",
		operation: "yysb",
		show:true, //是否显隐
		checkRegular: "^$|^1[3456789]\\d{9}$"
	}, {
		textName: "location",
		subject: "所在地",
		controlType: "multiSelector",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
	}, {
		textName: "countyCode",
		subject: "区",
		controlType: "multiSelectorHidden",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "townCode",
		subject: "镇",
		controlType: "multiSelectorHidden",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "villageCode",
		subject: "村",
		controlType: "multiSelectorHidden",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "homeAddress",
		subject: "详细地址",
		controlType: "text",
		deleteFlag: "0",
		operation: "yysb",
		show:true, //是否显隐
		maxlength: 36
	}]
}, {
	tableName: "参保信息",
	id: "46982383058086952",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "isNcms",
		subject: "是否是新农合参保居民",
		controlType: "radio",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
		values: [{
			valueName: "是",
			deleteFlag: "0",
			valueCode: "1"
		}, {
			valueName: "否",
			deleteFlag: "0",
			valueCode: "0"
		}]
	}, {
		textName: "ncmsCode",
		subject: "新农合卡号",
		controlType: "text",
		deleteFlag: "0",
		operation: "yysb",
		checkRegular: "^$|^\\d{16,18}$|^\\d{16,17}[x]$",
		show:false, //根据新农合选取显隐
		maxlength: 18
	}]
}, {
	tableName: "健康信息",
	id: "469823830580379759",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "height",
		subject: "身高",
		controlType: "number",
		unit: "cm",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
		checkRegular: "^[1-9](\\.\\d*)?$|^[1-9][0-9](\\.\\d*)?$|^[1-2][0-9][0-9](\\.\\d*)?$",
		maxlength: 3
	}, {
		textName: "weight",
		subject: "体重",
		controlType: "number",
		unit: "kg",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
		checkRegular: "^[1-9](\\.\\d*)?$|^[1-9][0-9](\\.\\d*)?$|^[1-2][0-9][0-9](\\.\\d*)?$",
		maxlength: 3
	}, {
		textName: "waist",
		subject: "腰围",
		controlType: "number",
		unit: "cm",
		deleteFlag: "0",
		isMustfill: true,
		show:true, //是否显隐
		checkRegular: "^[1-9](\\.\\d*)?$|^[1-9][0-9](\\.\\d*)?$|^[1-2][0-9][0-9](\\.\\d*)?$",
		maxlength: 3
	}, {
		textName: "bmi",
		subject: "体重指数",
		controlType: "html",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "bmiRange",
		subject: "BMI指数范围",
		controlType: "select",
		deleteFlag: "0",
		show:true, //是否显隐
		disabled: true,
		textClass: "red",
		values: [{
			valueName: "过轻",
			deleteFlag: "0",
			valueCode: "0"
		}, {
			valueName: "正常",
			deleteFlag: "0",
			valueCode: "1"
		}, {
			valueName: "过重",
			deleteFlag: "0",
			valueCode: "2"
		}, {
			valueName: "肥胖",
			deleteFlag: "0",
			valueCode: "3"
		}, {
			valueName: "非常肥胖",
			deleteFlag: "0",
			valueCode: "4"
		}]
	}]
}, {
	tableName: "既往病史",
	id: "469823830580379870",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "pastHistory",
		controlType: "checkbox",
		deleteFlag: "0",
		show:true, //是否显隐
		values: [{
			valueName: "高血压",
			deleteFlag: "0",
			valueCode: "1"
		}, {
			valueName: "糖尿病",
			deleteFlag: "0",
			valueCode: "2"
		}]
	}]
}, {
	tableName: "血压",
	id: "469823830580379981",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		"subject": "第一次血压",
		"controlType": "inputs",
		unit: "mmHg",
		show:true, //是否显隐
		"splitCode": "/",
		list:[
			{
				textName: "oneSbp",
				subject: "收缩压",
				controlType: "number",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			},
			{
				textName: "oneDbp",
				subject: "舒张压",
				controlType: "number",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			}
		]
	},{
		"subject": "第二次血压",
		"controlType": "inputs",
		unit: "mmHg",
		"splitCode": "/",
		show:true, //是否显隐
		list:[
			{
				textName: "twoSbp",
				subject: "收缩压",
				controlType: "number",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			},
			{
				textName: "twoDbp",
				subject: "舒张压",
				controlType: "number",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			}
		]
	},{
		"subject": "平均血压",
		"controlType": "inputs",
		unit: "mmHg",
		"splitCode": "/",
		show:true, //是否显隐
		list:[
			{
				textName: "avgSbp",
				subject: "收缩压",
				controlType: "html",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			},
			{
				textName: "avgDbp",
				subject: "舒张压",
				controlType: "html",
				unit: "mmHg",
				deleteFlag: "0",
				show:true, //是否显隐
			}
		]
	}]
}, {
	tableName: "血糖",
	id: "469823830580371092",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "fbs",
		subject: "空腹血糖",
		controlType: "number",
		unit: "mmol/L",
		deleteFlag: "0",
		show:true, //是否显隐
	}, {
		textName: "pbg",
		subject: "餐后血糖",
		controlType: "number",
		unit: "mmol/L",
		deleteFlag: "0",
		show:true, //是否显隐
	}]
}, {
	tableName: "其他证明资料",
	id: "469823830580371203",
	deleteFlag: "0",
	isExpandable: true,
	object: [{
		textName: "fileImages",
		controlType: "file",
		deleteFlag: "0",
		show:true, //是否显隐
	}]
}, {
	tableName: "其他信息",
	id: "469823830580382314",
	deleteFlag: "0",
	isExpandable: true,
	justShow: true,
	object: [{
		textName: "createTime",
		subject: "建档时间",
		controlType: "otherInfoTime",
		deleteFlag: "0",
		show:true
	}, {
		textName: "createByName",
		subject: "建档医生",
		controlType: "otherInfo",
		deleteFlag: "0",
		show:true
	}]
}];

export default code;
