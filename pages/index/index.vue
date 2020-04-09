<template>
	<view>
		<gpp-configuration-form ref="form" type="fill" :formTemplate="formTemplate" :formValue="formValue" :isCard="true"></gpp-configuration-form>
		<button class="button" @click="save">保 存</button>
	</view>
</template>

<script>
	import template from "@/config/addFile.js";
	import gppConfigurationForm from '@/components/gpp-configurationForm/gpp-configurationForm.vue';
	export default {
		components: {
			gppConfigurationForm
		},
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
</script>

<style>
	.button{
		margin: 14px 10px 10px 10px;
		background-color: #6BA1FF;
		color: #FFFFFF;
	}
</style>
