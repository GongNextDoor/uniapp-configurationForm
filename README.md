# gpp-uniapp-configurationForm
#### 配置表单
通过传入配置数据动态渲染出表单，目前支持的表单组件有text,number,textarea,radio,checkbox,date,select,html。支持配置必填以及正则校验。提供填写，展示两种状态模式。
#### 使用方式
引用组件
```javascript
import gppConfigurationForm from "@/components/gpp-configurationForm/gpp-configurationForm.vue"
export default {
	components:{
		gppConfigurationForm
	}
}
```
使用组件
```html
<gpp-configuration-form ref="form" type="fill" :formTemplate="formTemplate" :formValue="formValue" :isCard="true"></gpp-configuration-form>
```
```javascript
import template from "@/config/addFile.js";
export default {
	data() {
		return {
			formTemplate: template,
			formValue: {
				patientName: "张三",
				isGotoWH: "1",
				gender: "1",
				symptom: "1,4"
			}
		}
	},
	methods: {
		save(){
			let result = this.$refs.form.submit();
			if(result.checkFlag){
				console.log(result.value);
				uni.showToast({
					title: "验证成功"
				})
			}else{
				uni.showToast({
					title: result.message,
					icon: "none"
				})
			}
		}
	}

}
```
#### 属性说明
| 属性名 | 类型 | 默认值 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | String | fill | 表单类型，fill填写，show展示 |
| themeColor | String | #6ba1ff | 主题色 |
| isCard | Boolean | false | 卡片模式 |
| formTemplate | Array | [] | 表单配置数据 |
| formValue | Object | {} | 表单初始值 |
#### 方法说明
通过 ref 获取组件调用方法

| 方法名称 | 说明 | 返回值 |
| ------------ | ------------ | ------------ |
| submit | 提交 | {checkFlag: true, message: "", value: {}} |
#### 表单配置数据说明
完整配置示例
```json
[{
	formTitle: "表单配置示例",
	id: "469823830580379648",
	object: [{
		textName: "text",
		subject: "text输入框",
		controlType: "text",
		isMustfill: true,
		maxlength: 12,
		placeholder: "请输入",
		unit: "单位",
		checkRegular: "^1[3456789]\\d{9}$"
	}, {
		textName: "number",
		subject: "number输入框",
		controlType: "number",
		isMustfill: true,
		maxlength: 12,
		placeholder: "请输入",
		unit: "单位",
		checkRegular: "^1[3456789]\\d{9}$"
	}, {
		textName: "textarea",
		subject: "textarea输入框",
		controlType: "textarea",
		isMustfill: true,
		maxlength: 12,
		placeholder: "请输入",
		checkRegular: "^1[3456789]\\d{9}$"
	}, {
		textName: "radio",
		subject: "单选框",
		controlType: "radio",
		isMustfill: true,
		values: [{
			valueName: "选项一",
			valueCode: "1"
		}, {
			valueName: "选项二",
			valueCode: "2"
		}]
	}, {
		textName: "checkbox",
		subject: "多选框",
		controlType: "checkbox",
		isMustfill: true,
		values: [{
			valueName: "选项一",
			valueCode: "1"
		}, {
			valueName: "选项二",
			valueCode: "2"
		}]
	}, {
		textName: "select",
		subject: "单级下拉选择",
		controlType: "select",
		isMustfill: true,
		values: [{
			valueName: "选项一",
			valueCode: "1"
		}, {
			valueName: "选项二",
			valueCode: "2"
		}]
	}, {
		textName: "date",
		subject: "日期选择框",
		controlType: "date"
		isMustfill: true
	}, {
		controlType: "html",
		fontSize: "16px",
		fontColor: "#f55347",
		content: "内容内容内容"
	}]
}]
```
详细配置说明

| 属性 | 是否必须 | 类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| formTitle | 否 | String | 表单标题 |
| id | 是 | String | 表单id（必须唯一） |
| object | 是 | Array | 表单内组件 |

text，number，textarea组件属性：

| 属性 | 是否必须 | 类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| textName | 是 | String | 属性值（必须唯一） |
| subject | 否 | String | 题目 |
| controlType | 是 | String | 组件类型 |
| isMustfill | 否 | Boolean | 是否必填 |
| maxlength | 否 | number | 最大输入长度 |
| placeholder | 否 | String | 占位文字 |
| unit | 否 | String | 单位 |
| checkRegular | 否 | String | 正则表达式（注意需要转义） |

radio，checkbox，select组件属性：

| 属性 | 是否必须 | 类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| textName | 是 | String | 属性值（必须唯一） |
| subject | 否 | String | 题目 |
| controlType | 是 | String | 组件类型 |
| isMustfill | 否 | Boolean | 是否必填 |
| values | 是 | Array | 选项（[{valueName: "选项一",valueCode: "1"}]） |

date组件属性：

| 属性 | 是否必须 | 类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| textName | 是 | String | 属性值（必须唯一） |
| subject | 否 | String | 题目 |
| controlType | 是 | String | 组件类型 |
| isMustfill | 否 | Boolean | 是否必填 |

html组件属性：

| 属性 | 是否必须 | 类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| controlType | 是 | String | 组件类型 |
| fontSize | 否 | String | 字体大小 |
| fontColor | 否 | String | 字体颜色 |
| content | 是 | String | 显示内容 |


#### 注意事项
表单配置数据请严格按照文档配置，否则会出现异常。