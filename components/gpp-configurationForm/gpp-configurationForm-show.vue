<template>
	<view>
		<view v-for="(item, index) in formJson" :key="index">
			<view class="tittle" :class="showItemIds.indexOf(item.id) > -1 ? 'arrow-top' : 'arrow-bottom'" @click="showItemClick(item)">{{item.tableName}}</view>
			<view class="box" v-show="showItemIds.indexOf(item.id) > -1">
				<view v-for="(detailItem, detailIndex) in item.object" :key="detailIndex">
					<!-- select -->
					<view class="one-li" v-if="detailItem.controlType == 'select'" v-show="detailItem.show">
						<view><b v-if="detailItem.isMustfill">*</b>{{detailItem.subject}}</view>
						<view><text :class="detailItem.textClass">{{selectPickerItemShow(detailItem.values, formItemValue[detailItem.textName])}}</text><text
							 v-if="detailItem.unit">{{detailItem.unit}}</text></view>
					</view>
					<!-- checkbox -->
					<view class="con" v-else-if="detailItem.controlType == 'checkbox'" v-show="detailItem.show">
						<label class="checkbox" v-for="(value, index) in detailItem.values" :key="index">
							<checkbox disabled :value="value.valueCode" :checked="formItemValue[detailItem.textName] && formItemValue[detailItem.textName].indexOf(value.valueCode) > -1" />{{value.valueName}}
						</label>
					</view>
					<!-- radio -->
					<view class="one-li" v-else-if="detailItem.controlType == 'radio'" v-show="detailItem.show">
						<view><b v-if="detailItem.isMustfill">*</b>{{detailItem.subject}}</view>
						<view>
							<label class="radio" v-for="(value, index) in detailItem.values" :key="index">
								<radio disabled :value="value.valueCode" :checked="formItemValue[detailItem.textName] && formItemValue[detailItem.textName] == value.valueCode" />{{value.valueName}}
							</label>
						</view>
					</view>
					<!-- file -->
					<view class="img-box" v-else-if="detailItem.controlType == 'file'" v-show="detailItem.show">
						<view class="img-box">
							<view v-if="formItemValue[detailItem.textName] == undefined"></view>
							<view v-else class="one-img" v-for="(item, index) in formItemValue[detailItem.textName].split(',')" :key="index"
							 @click="previewImage(item, formItemValue[detailItem.textName])">
								<image :src="imgUrlHead+item"></image>
							</view>
						</view>
					</view>
					
					<!-- inputs -->
					<view class="xy-list" v-else-if="detailItem.controlType == 'inputs'" @click="currentItem = detailItem" v-show="detailItem.show">
						<view>{{detailItem.subject}}</view>
						<view class="xy-li">
						    <view v-for="(i,index) in detailItem.list" :key="index" class="xy-one">
						       <input :type="i.controlType" style="font-size:14px;width: 60px;border:0;outline:none;font-size:14px;" v-if="i.controlType=='number' || i.controlType=='text'"  v-model="formItemValue[i.textName]" :placeholder="i.subject" @blur="onInputBlur" >
						        <view v-if="i.controlType=='html'">{{formItemValue[i.textName] ? formItemValue[i.textName] : i.defValue}}</view>
						        <view > {{detailItem.list.length > 1 && index < detailItem.list.length - 1 ? detailItem.splitCode : ''}}</view>
						    </view>
						    <text style="font-size:13px;color:#999;margin-left:10px;">{{detailItem.unit}}</text>
						</view>
					</view>
					
					
					<!-- multiSelectorHidden -->
					<view class="img-box" v-else-if="detailItem.controlType == 'multiSelectorHidden'" style="display: none;"></view>
					<!-- otherInfoTime -->
					<view class="one-li" v-else-if="detailItem.controlType == 'otherInfoTime'" v-show="detailItem.show">
						<view><b v-if="detailItem.isMustfill">*</b>{{detailItem.subject}}</view>
						<view><text :class="detailItem.textClass">{{formatDate(formItemValue[detailItem.textName], 'yyyy-MM-dd HH:mm:ss')}}</text><text v-if="detailItem.unit&&formItemValue[detailItem.textName]">{{detailItem.unit}}</text></view>
					</view>
					<!-- text number html date -->
					<view class="one-li" v-else v-show="detailItem.show">
						<view><b v-if="detailItem.isMustfill">*</b>{{detailItem.subject}}</view>
						<view><text :class="detailItem.textClass">{{formItemValue[detailItem.textName]}}</text><text v-if="detailItem.unit&&formItemValue[detailItem.textName]">{{detailItem.unit}}</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showItemIds: [],
				imgUrlHead: this.$mcConfig.baseUrl+this.$mcConfig.imageUrlSpace
			}
		},
		props: {
			formJson: Array,
			formItemValue: Object
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
			init() {
				this.otherHandler();
				this.formJson.forEach(el => {
					this.showItemIds.push(el.id);
				});
			},
			/**
			 * 其他写死的处理
			 */
			otherHandler() {
				//地区赋值
				if (this.formItemValue.countyName) {
					this.formItemValue.location = this.formItemValue.countyName + "-" + this.formItemValue.townName + "-" + this.formItemValue
						.villageName;
				}
				//bmi显示红色
				let indexI, indexJ, indexIRange, indexJRange;
				for (var i = 0; i < this.formJson.length; i++) {
					var itemCode = this.formJson[i];
					if (itemCode.id == "469823830580379759") {
						indexI = i;
						indexIRange = i;
						for (var j = 0; j < itemCode.object.length; j++) {
							if (itemCode.object[j].textName == "bmi") {
								indexJ = j;
							}
							if (itemCode.object[j].textName == "bmiRange") {
								indexJRange = j;
							}
						}
					}
				}
				if (this.formItemValue.bmi >= 18.5 && this.formItemValue.bmi < 24) {
					this.formJson[indexIRange].object[indexJRange].textClass = "";
					this.formJson[indexI].object[indexJ].textClass = "";
				} else {
					this.formJson[indexI].object[indexJ].textClass = "red";
					this.formJson[indexIRange].object[indexJRange].textClass = "red";
				}
				//新农合显隐
				if (this.formItemValue.isNcms == "1") { //如果选择是  才显示新农合号
					console.log(this.formItemValue.isNcms)
					for (var i = 0; i < this.formJson.length; i++) {
						var itemCode = this.formJson[i];
						if (itemCode.id == "46982383058086952") {
							for (var j = 0; j < itemCode.object.length; j++) {
								if (itemCode.object[j].textName == "ncmsCode") {
									itemCode.object[j].show = true;
									itemCode.object[j].isMustfill = true;
								}
							}
						}
					}
				}
			},
			/**
			 * 卡片显示影藏控制
			 * @param {Object} item
			 */
			showItemClick(item) {
				if (this.showItemIds.indexOf(item.id) > -1) {
					this.showItemIds.splice(this.showItemIds.indexOf(item.id), 1);
				} else {
					this.showItemIds.push(item.id);
				}
			},
			/**
			 * 单级select显示
			 * @param {Object} objects
			 * @param {Object} value
			 */
			selectPickerItemShow(objects, value) {
				let name = '';
				objects.forEach(el => {
					if (el.valueCode == value) {
						name = el.valueName;
					}
				});
				return name;
			},
			/**
			 * 格式化日期时间
			 * @param {日期、时间戳} date 
			 * @param {日期格式} fmt 
			 */
			formatDate(date, fmt) {
			    let newDate = new Date(date);
			    if (/(y+)/.test(fmt)) {
			        fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
			    }
			    var o = {
			        "M+": newDate.getMonth() + 1, //月份
			        "d+": newDate.getDate(), //日
			        "H+": newDate.getHours(), //小时
			        "m+": newDate.getMinutes(), //分
			        "s+": newDate.getSeconds(), //秒
			    };
			
			    for (var k in o) {
			        if (new RegExp("(" + k + ")").test(fmt)) {
			            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			        }
			    }
			
			    return fmt;
			},
			/**
			 * 图片预览
			 * @param {Object} current
			 * @param {Object} urls
			 */
			previewImage(current, urls) {
				let url = this.imgUrlHead+current;
				let array = urls.split(",");
				array.forEach((el, index) => {
					array[index] = this.imgUrlHead+el;
				});
				uni.previewImage({
					current: url,
					urls: array
				})
			}
		}
	}
</script>

<style>
	.tittle {
		background: #fff;
	}

	.con {
		padding: 10px 0 0 14px;
		box-sizing: border-box;
	}

	.con label {
		width: 33%;
		display: inline-block;
		margin-bottom: 10px;
	}

	/* 左右布局行 */
	.one-li {
		display: flex;
		border-bottom: 1px solid #ebebeb;
		padding: 0 14px;
		background: #fff;
	}

	.one-li view {
		line-height: 40px;
		font-size: 14px;
		color: #666;
	}

	.one-li>view:nth-of-type(2) {
		flex: 1;
		text-align: right;
		color: #333;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.one-li input {
		width: 60px;
		border: 0;
		outline: none;
		font-size: 14px;
		padding: 0 5px;
		box-sizing: border-box;
	}

	.one-li input.row-put {
		width: 100%;
		height: 100%;
	}
	.one-li view text:nth-of-type(2) {
		font-size:13px;
		color:#999;
		margin-left:10px;
	}
	.con view {
		line-height: 24px;
	}

	.img-box {
		padding: 10px 14px;
		display: flex;
	}

	.img-box .one-img {
		position: relative;
		width: 60px;
		height: 60px;
		margin-right: 20px;
	}

	.one-img text {
		position: absolute;
		top: -5px;
		right: -5px;
		z-index: 9;
		color: #FB5762;
		font-size: 14px;
	}

	.one-img image {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	.add-img {
		background: #f4f4f4;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-img image {
		width: 25px;
		height: 25px;
	}

	.big-img {
		width: 100%;
		height: 80%;
		margin: auto;
	}

	.mask .close {
		text-align: center;
		color: #fff;
		font-size: 24px;
		position: absolute;
		bottom: 20px;
		lie-height: 50px;
	}

	.mask .close {
		text-align: center;
		width: 100%;
	}

	b {
		color: rgba(255, 117, 117, 1) !important;
		margin-right: 3px;
	}

	.radio {
		margin-right: 10px;
	}

	.arrow-bottom:after {
		content: " ";
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 0 1px 1px 0;
		border-color: #a0a0a0;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: absolute;
		top: 50%;
		margin-top: -3px;
		right: 15px;
	}

	.arrow-top:after {
		content: " ";
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 1px 0 0 1px;
		border-color: #a0a0a0;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: absolute;
		top: 50%;
		margin-top: -1px;
		right: 15px;
	}
	.inline-li-one>view:nth-of-type(2) {
		flex:1;
		text-align:right;
		display:flex;
		justify-content: flex-end;
		align-items: center;
	}
	.inline-li-one input {
		width: 80px;
		border:0;
		outline:none;
		font-size:14px;
		padding: 0 5px;
		box-sizing:border-box;
	}
	.inline-li-one input.row-put {
		width:100%;
		height:100%;
	}
	.xy-list {
		display:flex;
		padding:0 15px;
		border-bottom:1px solid #ebebeb;
		align-items: center;
		min-height:40px;
	}
	.xy-li {
		flex:1;
		display:flex;
		align-items: center;
		justify-content: flex-end;
	}
	.xy-li .inputsInline input {
		font-size:14px;
	}
	.xy-one {
		display:flex;
	}
</style>
