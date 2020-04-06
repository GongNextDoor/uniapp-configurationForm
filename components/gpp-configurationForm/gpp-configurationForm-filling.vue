<template>
	<view style="background-color: #FFFFFF;">
		<view v-for="(item, index) in formJson" :key="index" v-show="! item.justShow">
			<view class="tittle" :class="showItemIds.indexOf(item.id) > -1 ? 'arrow-top' : 'arrow-bottom'" @click="showItemClick(item)">{{item.tableName}}</view>
			<view class="con" v-show="showItemIds.indexOf(item.id) > -1">
				<view v-for="(detailItem, detailIndex) in item.object" :key="detailIndex">
					<!-- text -->
					<view class="li" v-if="detailItem.controlType == 'text'" @click="currentItem = detailItem" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view><input type="text" placeholder="请输入" :maxlength="detailItem.maxlength" v-model="itemValue[detailItem.textName]" @blur="onInputBlur"></view>
						<text class="company" v-if="detailItem.unit">{{detailItem.unit}}</text>
						<text class="iconfont iconyuyin" v-if="detailItem.operation == 'yysb'" @click="speechRecognition(detailItem.textName)"></text>
						<text class="iconfont iconsaoyisao" v-if="detailItem.operation == 'sfzsm'" @click="IDCardScanning(detailItem.textName)"></text>
					</view>
					<!-- number -->
					<view class="li" v-else-if="detailItem.controlType == 'number'" @click="currentItem = detailItem" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view><input type="number" placeholder="请输入" :maxlength="detailItem.maxlength" v-model="itemValue[detailItem.textName]" @input="numberInput($event, detailItem.textName)" @blur="onInputBlur"></view>
						<text class="company" v-if="detailItem.unit">{{detailItem.unit}}</text>
						<text class="iconfont iconyuyin" v-if="detailItem.operation == 'yysb'" @click="speechRecognition(detailItem.textName)"></text>
						<text class="iconfont iconsaoyisao" v-if="detailItem.operation == 'sfzsm'" @click="IDCardScanning(detailItem.textName)"></text>
					</view>
					<!-- html -->
					<view class="li" v-else-if="detailItem.controlType == 'html'" @click="currentItem = detailItem" v-show="detailItem.show">
						<view class="label">{{detailItem.subject}}</view>
						<view :class="detailItem.textClass">{{itemValue[detailItem.textName]}}</view>
						<text class="company" v-if="detailItem.unit">{{detailItem.unit}}</text>
					</view>
					<!-- date -->
					<view class="li" v-else-if="detailItem.controlType == 'date'" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view>
							<picker mode="date" @change="datePickerChange" @click="currentItem = detailItem">
								{{itemValue[detailItem.textName]}}
							</picker>
						</view>
					</view>
					<!-- select -->
					<view class="li" v-else-if="detailItem.controlType == 'select'" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view>
							<picker @change="selectPickerChange" :range="detailItem.values" range-key="valueName" :disabled="detailItem.disabled" @click="currentItem = detailItem">
								<text :class="detailItem.textClass">{{selectPickerItemShow(detailItem.values, itemValue[detailItem.textName])}}</text>
							</picker>
						</view>
						<text class="arrow_right" v-show="! detailItem.disabled"></text>
					</view>
					<!-- multiSelector -->
					<view class="li" v-else-if="detailItem.controlType == 'multiSelector'" @click="multiSelectorShow(detailItem.textName)" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view>
							<mpvue-city-picker themeColor="#007AFF" :ref="detailItem.textName" @onConfirm="multiSelectorPickerChange($event, detailItem.textName)"></mpvue-city-picker>
							{{itemValue[detailItem.textName]}}
						</view>
						<text class="arrow_right"></text>
					</view>
					<!-- checkbox -->
					<view class="check" v-else-if="detailItem.controlType == 'checkbox'" @click="currentItem = detailItem" v-show="detailItem.show">
						<checkbox-group @change="checkboxChange($event, detailItem.textName)">
							<label v-for="(value, index) in detailItem.values" :key="index">
								<checkbox :value="value.valueCode" :checked="itemValue[detailItem.textName].indexOf(value.valueCode) > -1"/>{{value.valueName}}
							</label>
						</checkbox-group>
					</view>
					<!-- radio -->
					<view class="radio" v-else-if="detailItem.controlType == 'radio'" @click="currentItem = detailItem" v-show="detailItem.show">
						<view class="label"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view>
							<radio-group>
								<label v-for="(value, index) in detailItem.values" :key="index" @click="itemValue[detailItem.textName] = value.valueCode">
									<radio  :value="value.valueCode" :checked="itemValue[detailItem.textName] == value.valueCode"/>{{value.valueName}}
								</label>
							</radio-group>
						</view>
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
				currentItem: {},
			}
		},
		props: {
			formJson: Array,
			formItemValue: Object
		},
		watch: {
			itemValue: {
				handler: function(){
					this.linkageHandle();
				},
				deep: true
			},
			"itemValue.citizenId": function(){
				this.validateCitizenId();
			}
		},
		created() {
			this.init();
			this.uploadUrl = this.uploadUrl+"?token="+uni.getStorageSync("token");
			this.uploadIdcardImgUrl = this.uploadIdcardImgUrl+"?token="+uni.getStorageSync("token");
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
				this.formJson.forEach(el => {
					this.showItemIds.push(el.id);
					el.object.forEach(el => {
						if(el.controlType == "date"){ // 日期特殊处理
							this.$set(this.itemValue, el.textName, "2000-01-01" ,el.show);
							return true;
						}
						if(el.controlType == "select"){ // 单级选择特殊处理
							this.$set(this.itemValue, el.textName, el.values[0].valueCode ,el.show);
							return true;
						}else if(el.controlType == "inputs"){
							for(var i=0;i<el.list.length;i++){
								var item = el.list[i];
								this.$set(this.itemValue, item.textName, "" ,item.show);
							}
							return true;
						}
						this.$set(this.itemValue, el.textName, "" ,el.show);
					});
				});
				// 如果传了初始值进行赋值
				if(this.formItemValue != {}){
					Object.assign(this.itemValue, this.formItemValue);
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
			 * 数字输入第一位为0去除
			 * @param {Object} e
			 * @param {Object} textName
			 */
			numberInput(e, textName){
				if(e.detail.value[0] == 0){
					this.itemValue[textName] = e.detail.value.substr(1);
				}
			},
			/**
			 * 血压输入
			 * @param {Object} textName
			 */
			numberInputBP(textName){
				if(this.itemValue[textName][0] == 0){
					this.itemValue[textName] = this.itemValue[textName].substr(1);
				}
				if(this.itemValue[textName].toString().indexOf(".") > -1){
					this.itemValue[textName] = "";
					uni.showToast({
						title: "血压不能输入小数",
						icon: "none"
					})
				}
			},
			/**
			 * 日期选择器修改
			 * @param {Object} e
			 */
			datePickerChange(e){
				this.itemValue[this.currentItem.textName] = e.target.value;
			},
			/**
			 * 单级选择器修改
			 * @param {Object} e
			 */
			selectPickerChange(e){
				this.itemValue[this.currentItem.textName] = this.currentItem.values[e.target.value].valueCode;
			},
			/**
			 * 地区选择器修改
			 * @param {Object} e
			 * @param {Object} name
			 */
			multiSelectorPickerChange(e, name){
				this.itemValue[name] = e.label;
				this.itemValue.countyCode = e.valueData[0].value;
				this.itemValue.countyName = e.valueData[0].label;
				this.itemValue.townCode = e.valueData[1].value;
				this.itemValue.townName = e.valueData[1].label;
				this.itemValue.villageCode = e.valueData[2].value;
				this.itemValue.villageName = e.valueData[2].label;
			},
			/**
			 * 地区选择器显示
			 * @param {Object} ref
			 */
			multiSelectorShow(ref){
				this.$refs[ref][0].show();
			},
			/**
			 * checkbox修改
			 * @param {Object} e
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
			 * 语音识别
			 * @param {Object} textName
			 */
			speechRecognition(textName){
				if(this.$mcConfig.platAppMode){
					jCall.showiFlySpeechDialog({
						success: data => {
							this.itemValue[textName] = data.data;
						},
						error: error => {
							uni.showToast({
								title: "语音识别出错",
								icon: "none"
							})
						}
					});
				}else{
					
				}
			},
			/**
			 * 身份证扫描
			 * @param {Object} textName
			 */
			IDCardScanning(textName){
				if(this.$mcConfig.platAppMode){
					jCall.getIdCardContent({
						success: data => {
							this.itemValue[textName] = data.data;
						},
						error: error => {
							uni.showToast({
								title: "身份证扫描出错",
								icon: "none"
							})
						}
					});
				}else{
					this.processingPictures();
				}
			},
			/**
			 * 身份证选择处理
			 */
			processingPictures(){
				uni.chooseImage({
					count: 1,
					sourceType: ["camera"],
					success: async (res) => {
						uni.showLoading({
							title: '识别中',
							mask: true
						});
						let tempFilePath = res.tempFilePaths[0];
						let tempFile = res.tempFiles[0];
						if(tempFile.size > 1048576){ // 大于1m压缩后上传
							let magnification = Math.round(tempFile.size/1048576); //压缩比例
							uni.getImageInfo({
								src: tempFilePath,
								success: (res) => {
									let canvasWidth = res.width;
									let canvasHeight = res.height;
									let img = new Image();
									img.src = res.path;
									let canvas = document.createElement('canvas');
									let ctx = canvas.getContext('2d');
									canvas.width = canvasWidth / magnification;
									canvas.height = canvasHeight / magnification;
									ctx.drawImage(img, 0, 0, canvasWidth / magnification, canvasHeight / magnification);
									canvas.toBlob((fileSrc) => {
										let imgSrc = window.URL.createObjectURL(fileSrc);
										this.uploadImageH5(imgSrc);
									}, "image/jpeg")
								}
							});
						}else{
							this.uploadImageH5(tempFilePath);
						}
					}
				});
			},
			/**
			 * 身份证上传
			 */
			uploadImageH5(src){
				let that = this;
				uni.uploadFile({
					url: this.$mcConfig.baseUrl + this.uploadIdcardImgUrl,
					filePath: src,
					name: 'file',
					success: (res) => {
						if(JSON.parse(res.data).success){
							let result = JSON.parse(res.data).object;
							this.itemValue.citizenId = result.idCard;
							this.itemValue.patientName = result.name;
							// this.itemValue.homeAddress = result.address;
						}else{
							uni.showToast({
								title: "识别失败",
								icon: "none"
							})
						}
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			},
			/**
			 * 上传图片获取返回list
			 * @param {Object} e
			 * @param {Object} textName
			 */
			getImageList(e, textName){
				let imgUrls = [];
				e.forEach(el => {
					imgUrls.push(el.imageUrl);
				})
				this.itemValue[textName] = imgUrls.toString();
			},
			/**
			 * 联动处理
			 */
			linkageHandle(){
				//新农合卡号
				if(this.itemValue.isNcms=="1"){  //如果选择是  才显示新农合号
					for(var i=0;i<this.formJson.length;i++){
						var itemCode=this.formJson[i];
						if(itemCode.id=="46982383058086952"){
							for(var j=0;j<itemCode.object.length;j++){
								if(itemCode.object[j].textName=="ncmsCode"){
									itemCode.object[j].show=true;
									itemCode.object[j].isMustfill=true;
								}
							}
						}
					} 
				}else{
					for(var i=0;i<this.formJson.length;i++){
						var itemCode=this.formJson[i];
						if(itemCode.id=="46982383058086952"){
							for(var j=0;j<itemCode.object.length;j++){
								if(itemCode.object[j].textName=="ncmsCode"){
									itemCode.object[j].show=false;
									itemCode.object[j].isMustfill=false;
									this.itemValue.ncmsCode = "";
								}
							}
						}
					} 
				}
				//bmi
				if(this.itemValue.height == "" && this.itemValue.weight == ""){
					this.itemValue.bmi = "";
					this.itemValue.bmiRange = "0";
				}
				if(this.itemValue.height != "" && this.itemValue.weight != "" && Number(this.itemValue.height) && Number(this.itemValue.weight)){
					let indexI, indexJ, indexIRange, indexJRange;
					for(var i=0;i<this.formJson.length;i++){
						var itemCode=this.formJson[i];
						if(itemCode.id=="469823830580379759"){
							indexI = i;
							indexIRange = i;
							for(var j=0;j<itemCode.object.length;j++){
								if(itemCode.object[j].textName=="bmi"){
									indexJ = j;
								}
								if(itemCode.object[j].textName=="bmiRange"){
									indexJRange = j;
								}
							}
						}
					}
					let bmi = this.itemValue.weight / Math.pow(this.itemValue.height/100,2);
					bmi = (Math.round(bmi * 10) / (10)).toFixed(1);
					this.itemValue.bmi = bmi;
					if(bmi < 18.5){
						this.itemValue.bmiRange = "0";
						this.formJson[indexI].object[indexJ].textClass = "red";
						this.formJson[indexIRange].object[indexJRange].textClass = "red";
					}else if(bmi >= 18.5 && bmi < 24){
						this.itemValue.bmiRange = "1";
						this.formJson[indexI].object[indexJ].textClass = "";
						this.formJson[indexIRange].object[indexJRange].textClass = "";
					}else if( bmi >= 24 && bmi < 27){
						this.itemValue.bmiRange = "2";
						this.formJson[indexI].object[indexJ].textClass = "red";
						this.formJson[indexIRange].object[indexJRange].textClass = "red";
					}else if(bmi >= 27 && bmi < 30){
						this.itemValue.bmiRange = "3";
						this.formJson[indexI].object[indexJ].textClass = "red";
						this.formJson[indexIRange].object[indexJRange].textClass = "red";
					}else if(bmi >= 30){
						this.itemValue.bmiRange = "4"; 
						this.formJson[indexI].object[indexJ].textClass = "red";
						this.formJson[indexIRange].object[indexJRange].textClass = "red";
					}
				}
				//收缩压舒张压
				if(this.itemValue.oneSbp == "" && this.itemValue.twoSbp == ""){
					this.itemValue.avgSbp = "";
				}
				if(this.itemValue.oneSbp != "" && this.itemValue.twoSbp != "" && Number(this.itemValue.oneSbp) && Number(this.itemValue.twoSbp)){
					if((Number(this.itemValue.oneSbp) + Number(this.itemValue.twoSbp))%2 ==0){
						this.itemValue.avgSbp = ((Number(this.itemValue.oneSbp) + Number(this.itemValue.twoSbp))/2);
					}else{
						this.itemValue.avgSbp = ((Number(this.itemValue.oneSbp) + Number(this.itemValue.twoSbp) +1 )/2);
					}
					// this.itemValue.avgSbp = ((Number(this.itemValue.oneSbp) + Number(this.itemValue.twoSbp))/2);
				}
				if(this.itemValue.oneDbp == "" && this.itemValue.twoDbp == ""){
					this.itemValue.avgDbp = "";
				}
				if(this.itemValue.oneDbp != "" && this.itemValue.twoDbp != "" && Number(this.itemValue.oneDbp) && Number(this.itemValue.twoDbp)){
					if((Number(this.itemValue.oneDbp) + Number(this.itemValue.twoDbp))%2 ==0){
						this.itemValue.avgDbp = ((Number(this.itemValue.oneDbp) + Number(this.itemValue.twoDbp))/2);
					}else{
						this.itemValue.avgDbp = ((Number(this.itemValue.oneDbp) + Number(this.itemValue.twoDbp) +1 )/2);
					}			
					// this.itemValue.avgDbp = ((Number(this.itemValue.oneDbp) + Number(this.itemValue.twoDbp))/2);
				}
				
			},
			/**
			 * 身份证校验
			 */
			validateCitizenId(){
				//身份证校验，带出生日性别
				if(this.itemValue.citizenId != ""){
					if(this.idCardVerification(this.itemValue.citizenId) == true){
						let data = this.getIdCardInformation(this.itemValue.citizenId);
						if(data.birth.length == 10){
							this.itemValue.patientBirthDate = data.birth;
							this.itemValue.patientGender = data.sex;
						}
						
						this.$emit("validateCitizenId", this.itemValue.citizenId);
					}
				}
			},
			/**
			 * 输入校验
			 */
			inputValidation(){
				let checkFlag = true;
				let message = "校验成功";
				let formItemValue = {};
				
				this.formJson.forEach(el => {
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
							if(el.textName == "citizenId"){ //身份证特殊校验
								if(this.idCardVerification(this.itemValue[el.textName]) != true){
									message = el.subject+"输入不合法";
									checkFlag = false;
									return false;
								}
							}
							
							let reg = new RegExp(el.checkRegular);
							if(! reg.test(this.itemValue[el.textName])){
								message = el.subject+"输入不合法";
								checkFlag = false;
								return false;
							}
						}
					});
				});
				
				if(checkFlag){ formItemValue = this.itemValue; }
				return {checkFlag: checkFlag, message: message, formItemValue: formItemValue};
			},
			/**
			 * 通过身份证号获取出生日期、年龄、性别信息
			 * @param UUserCard 身份证号码
			 */
			getIdCardInformation(UUserCard) {
			    if (!UUserCard) return
			    let birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
			    let sex = (parseInt(UUserCard.substr(16, 1)) % 2 == 1) ? '1' : '2';
			    let myDate = new Date();
			    let month = myDate.getMonth() + 1;
			    let day = myDate.getDate();
			    let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
			    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <=
			        day) {
			        age++;
			    }
			
				return {
					birth: birth,
					sex: sex,
					age: age
				}
			},
			/**
			 * 身份证验证
			 * @param idCard 身份证号码
			 */
			idCardVerification(code) {
				
				var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
				      var tip = "";
				      var pass= true;
				      
				      var patt1=new RegExp("(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)");
				      if(!code || !patt1.test(code)){
				          tip = "身份证号格式错误";
				          pass = false;
				      }
				      
				      else if(!city[code.substr(0,2)]){
				          tip = "地址编码错误";
				          pass = false;
				      }
				      else{
				          //18位身份证需要验证最后一位校验位
				          if(code.length == 18){
				              code = code.split('');
				              //∑(ai×Wi)(mod 11)
				              //加权因子
				              var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				              //校验位
				              var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				              var sum = 0;
				              var ai = 0;
				              var wi = 0;
				              for (var i = 0; i < 17; i++)
				              {
				                  ai = code[i];
				                  wi = factor[i];
				                  sum += ai * wi;
				              }
				              var last = parity[sum % 11];
				              if(parity[sum % 11] != code[17]){
				                  tip = "校验位错误";
				                  pass =false;
				              }
				          }
				      }
					  return pass;
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

<style>
	.con {
		padding: 0 15px;
		border-bottom:10px solid #f5f5f5;
	}
	.li {
		display:flex;
		border-bottom:1px solid #ebebeb;
		min-height:40px;
		align-items: center;
	}
	.con .li:last-child {
		border-bottom:0;
	}
	.li .label {
		min-width:60px;
		color:#666;
	}
	.li>view:nth-of-type(2) {
		flex:1;
		text-align:right;
		
	}
	.li input {
		outline:none;
		border:0;
		height:100%;
		width:100%;
		font-size:14px;
		text-align:right;
	}
	.li>text {
		min-width: 30px;
		font-size:16px;
		color:#666;
		text-align:right;
	}
	.li .company {
		color:#999;
		font-size:12px;
		text-align:right;
		margin-left:10px;
	}
	.check {
		padding:10px 14px;
	}
	.check label{
		margin-right: 10px;
	}
	.radio {
		display:flex;
		height:40px;
		line-height:40px;
	}
	.radio .label{
		color:#666;
	}
	.radio>view:nth-of-type(2) {
		flex:1;
		text-align:right;
	}
	.radio label{
		margin-right: 10px;
	}
	.img-box {
		padding: 10px 0;
		display:flex;
		border-bottom:1px solid #ebebeb;
	}
	.img-box .one-img {
		position:relative;
		width: 60px;
		height:60px;
		margin-right: 20px;
	}
	.img-box>view:nth-of-type(2) {
		flex:1;
		display:flex;
		justify-content: flex-end;
	}
	.img-box text {
		color:#999;
		font-size:12px;
		margin-left:10px;
	}
	.img-box .inputsInline {
		display:flex;
	}
	.img-box input {
		border-width:0!important;
		font-size:14px;
		color:#333;
		outline:none;
	}
	.one-img text {
		position:absolute;
		top: -5px;
		right:-5px;
		z-index:9;
		color:#FB5762;
		font-size:14px;
	}
	.one-img image {
		width:100%;
		height:100%;
		border-radius: 8px;
	}
	.add-img {
		background:#f4f4f4;
		text-align:center;
		display:flex;
		align-items: center;
		justify-content: center;
	}
	.add-img image {
		width: 25px;
		height:25px;
	}
	.arrow_right:after{
		content: " ";
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 1px 1px 0 0;
		border-color: #a0a0a0;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); 
		position: absolute;top: 50%; 
		margin-top: -4px; 
		right:0px;
	}
	.arrow-bottom:after{
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
		right:15px;
	}
	.arrow-top:after{
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
		right:15px;
	}
</style>