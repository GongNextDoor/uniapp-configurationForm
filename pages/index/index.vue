<template>
	<view>
		<gpp-configuration-form ref="form" :formTemplate="formTemplate" :isCard="true" themeColor="#e48a5b"></gpp-configuration-form>
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
		background-color: #e48a5b;
		color: #FFFFFF;
		border-color: #e48a5b;
	}
</style>
