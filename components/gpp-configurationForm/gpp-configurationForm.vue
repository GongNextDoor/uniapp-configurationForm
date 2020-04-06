<template>
	<view class="gpp-cf">
		<view class="gpp-cf-form" :class="{'bottomShadow': isCard}" v-for="(item, index) in formJson" :key="index">
			<view class="gpp-cf-title">{{item.tableName}}</view>
			<view class="gpp-cf-content">
				<view v-for="(detailItem, detailIndex) in item.object" :key="detailIndex">
					<view class="gpp-cf-content-item" v-if="detailItem.controlType == 'text'">
						<view class="item-name"><text class="red" v-if="detailItem.isMustfill">*</text>{{detailItem.subject}}</view>
						<view>
							<input type="text" :placeholder="detailItem.placeholder" :maxlength="detailItem.maxlength" v-model="itemValue[detailItem.textName]"/>
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
			formJson:{
				type: Array,
				default(){
					return []
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
		onLoad() {
		
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.gpp-cf{
		background: #F1F1F1;
		box-sizing: border-box;
		.gpp-cf-form{
			box-sizing: border-box;
			padding: 10px;
			background: #FFFFFF;
			margin-bottom: 10px;
			.gpp-cf-title{
				margin-bottom: 16px;
				font-size: 16px;
			}
			.gpp-cf-title:before{
				content: "";
				width: 4px;
				height: 16px;
				border-radius: 2px;
				background: #e38b5b;
				display: inline-block;
				margin-right: 5px;
				vertical-align: -2px;
			}
			.gpp-cf-content{
				box-sizing: border-box;
				font-size: 14px;
				color: #777777;
				.gpp-cf-content-item{
					margin-bottom: 10px;
					.item-name{
						margin-bottom: 3px;
					}
					.input-placeholder{
						color: #d5d5d5;
					}
				}
			}
		}
		
		.red{
			color: #f55347;
		}
		.bottomShadow{
			box-shadow: 0 2px 4px #d0cfcf;
		}
		input{
			box-sizing: border-box;
			width: 100%;
			height: 36px;
			font-size: 14px;
			padding: 0 8px;
			border: 1px solid #e8e5e6;
			border-radius: 8px;
		}
	}
</style>
