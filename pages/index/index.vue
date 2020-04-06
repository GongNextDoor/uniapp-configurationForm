<template>
	<view>
		<gpp-configuration-form :formJson="formJson"></gpp-configuration-form>
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
				formJson: template,
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
