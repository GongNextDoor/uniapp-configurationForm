<template>
	<view class="gpp-cf">
		<view class="gpp-cf-form" :class="{'bottomShadow':isCard}" v-for="(item, index) in formTemplate" :key="index">
			<view class="gpp-cf-title" @click="showItemClick(item)"><text :class="showItemIds.indexOf(item.id)>-1 ? 'titleBeforeOpen':'titleBeforeClose'" :style="'background:'+themeColor"></text>{{item.tableName}}</view>
			<view class="gpp-cf-content" :class="{'hidden':showItemIds.indexOf(item.id)==-1}">
				<view v-for="(detailItem, detailIndex) in item.object" :key="detailIndex">
					<!-- text -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'text'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<input type="text" :disabled="type=='show'" :placeholder="type=='show'?'':detailItem.placeholder" :maxlength="detailItem.maxlength" v-model="itemValue[detailItem.textName]"/>
							<text class="item-ct-unit" v-if="detailItem.unit">{{detailItem.unit}}</text>
						</view>
					</view>
					<!-- number -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'number'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<input type="number" :disabled="type=='show'" :placeholder="type=='show'?'':detailItem.placeholder" :maxlength="detailItem.maxlength" v-model="itemValue[detailItem.textName]"/>
							<text class="item-ct-unit" v-if="detailItem.unit">{{detailItem.unit}}</text>
						</view>
					</view>
					<!-- textarea -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'textarea'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<textarea :disabled="type=='show'" :placeholder="type=='show'?'':detailItem.placeholder" :maxlength="detailItem.maxlength" auto-height v-model="itemValue[detailItem.textName]"/>
						</view>
					</view>
					<!-- html -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'html'">
						<view class="item-content" :style="'color:'+detailItem.fontColor+';font-size:'+detailItem.fontSize">
							{{detailItem.content}}
						</view>
					</view>
					<!-- radio -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'radio'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<radio-group>
								<label class="item-radio" v-for="(value, index) in detailItem.values" :key="index" @click="itemValue[detailItem.textName] = value.valueCode">
									<radio :disabled="type=='show'" :value="value.valueCode" :checked="itemValue[detailItem.textName] == value.valueCode"/>{{value.valueName}}
								</label>
							</radio-group>
						</view>
					</view>
					<!-- checkbox -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'checkbox'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<checkbox-group @change="checkboxChange($event, detailItem.textName)">
								<label class="item-checkbox" v-for="(value, index) in detailItem.values" :key="index">
									<checkbox :disabled="type=='show'" :value="value.valueCode" :checked="itemValue[detailItem.textName].indexOf(value.valueCode) > -1"/>{{value.valueName}}
								</label>
							</checkbox-group>
						</view>
					</view>
					<!-- date -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'date'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<view v-if="type=='fill'">
								<picker mode="date" @change="datePickerChange($event, detailItem.textName)">
									<view class="item-select">{{itemValue[detailItem.textName]}}</view>
									<text class="item-ct-unit arrowBottom" v-if="itemValue[detailItem.textName]==''"></text>
									<text class="item-ct-unit fork" @click.stop="itemValue[detailItem.textName]=''" v-else></text>
								</picker>
							</view>
							<view v-else>
								<view class="item-select">{{itemValue[detailItem.textName]}}</view>
							</view>
						</view>
					</view>
					<!-- select -->
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'select'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view class="item-content">
							<view v-if="type=='fill'">
								<picker @change="selectPickerChange($event, detailItem.textName, detailItem.values)" :range="detailItem.values" range-key="valueName">
									<view class="item-select">{{selectPickerItemShow(detailItem.values, itemValue[detailItem.textName])}}</view>
									<text class="item-ct-unit arrowBottom" v-if="itemValue[detailItem.textName]==''"></text>
									<text class="item-ct-unit fork" @click.stop="itemValue[detailItem.textName]=''" v-else></text>
								</picker>
							</view>
							<view v-else>
								<view class="item-select">{{selectPickerItemShow(detailItem.values, itemValue[detailItem.textName])}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			themeColor:{
				type: String,
				default(){
					return "#6BA1FF"
				}
			},
			isCard:{
				type: Boolean,
				default(){
					return false
				}
			},
			formTemplate:{
				type: Array,
				default(){
					return []
				}
			},
			formValue:{
				type: Object,
				default(){
					return {}
				}
			},
			type:{
				type: String,
				default(){
					return "fill"
				}
			}
		},
		data() {
			return {
				showItemIds: [],
				currentItem: {},
				itemValue: {}
			}
		},
		created() {
			this.init();
		},
		methods: {
			/**
			 * 处理ios键盘收回 界面不返回问题
			 * @param {Object} e
			 */
			onInputBlur(e) {
				if (isIOS) {
					var currentPosition, timer;
					var speed = 1;
					timer = setInterval(function() {
						currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
						currentPosition -= speed;
						window.scrollTo(0, currentPosition); //页面向上滚动
						currentPosition += speed;
						window.scrollTo(0, currentPosition); //页面向下滚动
						clearInterval(timer);
					}, 100);
				}
			},
			
			/**
			 * 初始化数据
			 */
			init(){
				this.formTemplate.forEach(el => {
					this.showItemIds.push(el.id);
					el.object.forEach(el => {
						if(el.textName){
							this.$set(this.itemValue, el.textName, "");
						}
					});
				});
				// 如果传了初始值进行赋值
				if(this.formValue != {}){
					Object.assign(this.itemValue, this.formValue);
				}
			},
			/**
			 * 卡片显示影藏控制
			 * @param {Object} item
			 */
			showItemClick(item){
				if(this.showItemIds.indexOf(item.id) > -1){
					this.showItemIds.splice(this.showItemIds.indexOf(item.id), 1);
				}else{
					this.showItemIds.push(item.id);
				}
			},
			/**
			 * 日期选择器修改
			 * @param {Object} e
			 * @param {Object} textName
			 */
			datePickerChange(e, textName){
				this.itemValue[textName] = e.target.value;
			},
			/**
			 * 单级选择器修改
			 * @param {Object} e
			 * @param {Object} textName
			 * @param {Object} values
			 */
			selectPickerChange(e, textName, values){
				this.itemValue[textName] = values[e.target.value].valueCode;
			},
			/**
			 * checkbox修改
			 * @param {Object} e
			 * @param {Object} textName
			 */
			checkboxChange(e, textName){
				this.itemValue[textName] = e.target.value.toString();
			},
			/**
			 * 单级select显示
			 * @param {Object} objects
			 * @param {Object} value
			 */
			selectPickerItemShow(objects, value){
				let name = '';
				objects.forEach(el => {
					if(el.valueCode == value){
						name = el.valueName;
					}
				});
				return name;
			},
			/**
			 * 输入校验
			 */
			inputValidation(){
				let checkFlag = true;
				let message = "校验成功";
				let value = {};
				
				this.formTemplate.forEach(el => {
					if(! checkFlag){
						return false;
					}
					el.object.forEach(el => {
						if(! checkFlag){
							return false;
						}
						if(el.isMustfill && this.itemValue[el.textName] == ""){ //必填
							message = "请输入"+el.subject;
							checkFlag = false;
							return false;
						}
						if(el.checkRegular){ //正则
							let reg = new RegExp(el.checkRegular);
							if(! reg.test(this.itemValue[el.textName])){
								message = el.subject+"输入不合法";
								checkFlag = false;
								return false;
							}
						}
					});
				});
				
				if(checkFlag){ value = this.itemValue; }
				return {checkFlag: checkFlag, message: message, value: value};
			},
			/**
			 * 暴露的提交方法
			 */
			submit(){
				return this.inputValidation();
			}
		}
	}
</script>

<style lang="scss">
	.gpp-cf{
		background: #F1F1F1;
		box-sizing: border-box;
		.gpp-cf-form{
			box-sizing: border-box;
			padding-bottom: 10px;
			background: #FFFFFF;
			margin-bottom: 10px;
			.gpp-cf-title{
				position: relative;
				padding: 10px 10px 10px 30px;
				font-size: 16px;
				.titleBeforeOpen{
					transition: all 0.3s ease;
					position: absolute;
					left: 15px;
					top: 13px;
					content: "";
					width: 4px;
					height: 16px;
					border-radius: 2px;
				}
				.titleBeforeClose{
					transition: all 0.3s ease;
					position: absolute;
					left: 8px;
					top: 19px;
					content: "";
					width: 16px;
					height: 4px;
					border-radius: 2px;
				}
			}
			.gpp-cf-title:active{
				background-color: #f8f8f8;
			}
			.gpp-cf-content{
				margin: 10px;
				box-sizing: border-box;
				font-size: 14px;
				color: #777777;
				.gpp-cf-content-item{
					margin-bottom: 16px;
					.item-name{
						margin-bottom: 3px;
					}
					.item-content{
						position: relative;
						.item-ct-unit{
							position: absolute;
							top: 8px;
							right: 10px;
							font-size: 14px;
							color: #d5d5d5;
						}
					}
				}
			}
			.hidden{
				display: none;
			}
		}
		.gpp-cf-form:last-child{
			margin-bottom: 0;
		}
		
		.red{
			color: #f55347;
		}
		.bottomShadow{
			box-shadow: 0 2px 4px #d0cfcf;
		}
		.arrowBottom{
			top: 11px !important;
			content: " ";
			height: 8px;
			width: 8px;
			border-width: 0 1px 1px 0;
			border-color: #a0a0a0;
			border-style: solid;
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		}
		.fork{
			width: 14px;
			height: 14px;
			margin: auto;
			position: relative;
		}
		.fork:before, .fork:after{
			content: "";
			position: absolute;
			height: 14px;
			width: 1.5px;
			top: 3px;
			right: 4px;
			background: #a0a0a0;
		}
		.fork:before{
		  transform: rotate(45deg);
		}
		.fork:after{
		  transform: rotate(-45deg);
		}
		input, .item-select{
			box-sizing: border-box;
			width: 100%;
			height: 36px;
			line-height: 34px;
			font-size: 14px;
			padding: 0 8px;
			border: 1px solid #e8e5e6;
			border-radius: 8px;
		}
		textarea{
			box-sizing: border-box;
			width: 100%;
			min-height: 90px;
			font-size: 14px;
			padding: 8px;
			border: 1px solid #e8e5e6;
			border-radius: 8px;
		}
		.input-placeholder, .textarea-placeholder{
			color: #d5d5d5;
		}
		radio-group, checkbox-group{
			margin-top: 8px;
		}
		.item-radio, .item-checkbox{
			margin-right: 14px;
		}
	}
</style>
