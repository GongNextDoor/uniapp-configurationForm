const code = [{
	formTitle: "基本信息",
	id: "469823830580379648",
	object: [{
		textName: "patientName",
		subject: "姓名",
		controlType: "text",
		isMustfill: true,
		maxlength: 12
	}, {
		textName: "citizenId",
		subject: "身份证",
		controlType: "text",
		isMustfill: true,
		checkRegular: "(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)"
	}, {
		textName: "gender",
		subject: "性别",
		controlType: "select",
		isMustfill: true,
		values: [{
			valueName: "男",
			valueCode: "1"
		}, {
			valueName: "女",
			valueCode: "2"
		}]
	}, {
		textName: "phoneNumber",
		subject: "手机号码",
		controlType: "number",
		isMustfill: true,
		checkRegular: "^1[3456789]\\d{9}$"
	}, {
		textName: "homeAddress",
		subject: "详细居住地址",
		controlType: "textarea",
		placeholder: "请详细到居住门牌号码"
	}]
}, {
	formTitle: "疫情调查问卷",
	id: "469823830580869523",
	object: [{
		textName: "temperature",
		subject: "当前体温",
		controlType: "number",
		isMustfill: true,
		unit: "℃"
	}, {
		textName: "isGotoWH",
		subject: "近两月是否有武汉旅行史",
		controlType: "radio",
		isMustfill: true,
		values: [{
			valueName: "是",
			valueCode: "1"
		}, {
			valueName: "否",
			valueCode: "0"
		}]
	}, {
		textName: "gotoWHDate",
		subject: "如有请填写旅行日期",
		controlType: "date"
	}, {
		textName: "contactPatient",
		subject: "近两月是否接触发热患者",
		controlType: "radio",
		isMustfill: true,
		values: [{
			valueName: "是",
			valueCode: "1"
		}, {
			valueName: "否",
			valueCode: "0"
		}]
	}, {
		textName: "symptom",
		subject: "当前是否有以下症状，如有请选择",
		controlType: "checkbox",
		values: [{
			valueName: "发热",
			valueCode: "1"
		}, {
			valueName: "咳嗽",
			valueCode: "2"
		}, {
			valueName: "胸闷",
			valueCode: "3"
		}, {
			valueName: "四肢无力",
			valueCode: "4"
		}]
	}]
}, {
	formTitle: "调查说明",
	id: "469823830580371092",
	object: [{
		controlType: "html",
		fontSize: "16px",
		fontColor: "#f55347",
		content: "以上问卷信息仅供防疫工作使用，为了您和他人的身体健康，请认真如实填写，我们会最大限度保护填写人个人信息不被泄露，谢谢您的合作！"
	}]
}];

export default code;
