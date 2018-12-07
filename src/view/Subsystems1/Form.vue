<template>
	<section class="table-responsive">
		<table id="table" data-striped="true" data-pagination="true" class="table table-hover" data-filter-control="true">
			<thead>
				<!--<tr>
					<th data-field="id" data-filter-control="select" data-align="center">角色名称</th>
					<th data-field="name" data-filter-control="input" data-align="center">角色描述</th>
					<th data-field="price" data-filter-control="input" data-align="center">角色默认页面</th>
				</tr>-->
				<tr>
					<th data-colspan="5">洗衣机统计表</th>
				</tr>
				<tr>
					<th data-colspan = "1" data-rowspan = "2">功能分组</th>
					<th data-colspan = "2">美的</th>
					<th data-colspan = "2">松下</th>
				</tr>
				<tr>
					<th data-filter-control="input">数量</th>
					<th data-filter-control="input">占比</th>
					<th data-filter-control="input">数量</th>
					<th data-filter-control="input">占比</th>
				</tr>
			</thead>
		</table>
	</section>
</template>

<script>
	import '@/assets/filter-control/bootstrap-table-filter-control.js'
	export default {
		data() {
			return {
				data: [{
					id: 1,
					name: '1',
					price: "2"
				}]
			}
		},
		mounted() {
			this.$nextTick(() => {
				$("#table").bootstrapTable({
					//					columns: [{
					//						field: 'id',
					//						title: 'Item ID',
					//						footerFormatter: (value) => {
					//							return '总计'
					//						}
					//					}, {
					//						field: 'name',
					//						title: 'Item Name'
					//					}, {
					//						field: 'price',
					//						title: 'Item Price',
					//						sortable : true,
					//						footerFormatter: function(rows){
					//	                        var sum = 0;
					//	                        for (var i=0;i<rows.length;i++) {
					//	                            sum += parseInt(rows[i].price)
					//	                        }
					//	                        return "$"+sum;
					//	                    }
					//					}],
					columns: [
						[{
							"title": "洗衣机统计表",
							"halign": "center",
							"align": "center",
							"colspan": 5
						}],
						[{
								field: 'name',
								title: "功能分组",
								valign: "middle",
								align: "center",
								colspan: 1,
								rowspan: 2,
								footerFormatter: (value) => {
									return '总计'
								}
							},
							{
								title: "美的",
								valign: "middle",
								align: "center",
								colspan: 2,
								rowspan: 1

							},
							{
								title: "松下",
								valign: "middle",
								align: "center",
								colspan: 2,
								rowspan: 1
							}
						],
						[{
								field: 'mideaNum',
								title: '数量',
								valign: "middle",
								align: "center",
								footerFormatter: function(rows) {
									var sum = 0;
									for(var i = 0; i < rows.length; i++) {
										sum += parseInt(rows[i].mideaNum)
									}
									return sum;
								}
							},
							{
								field: 'mideaPercent',
								title: '占比',
								valign: "middle",
								align: "center",
								footerFormatter: function(rows) {
									var sum = 0;
									for(var i = 0; i < rows.length; i++) {
										sum += parseInt(rows[i].mideaPercent)
									}
									return sum+'%';
								}
							},
							{
								field: 'panasonicNum',
								title: '数量',
								valign: "middle",
								align: "center",
								footerFormatter: function(rows) {
									var sum = 0;
									for(var i = 0; i < rows.length; i++) {
										sum += parseInt(rows[i].panasonicNum)
									}
									return sum;
								}
							},
							{
								field: 'panasonicPercent',
								title: '占比',
								valign: "middle",
								align: "center",
								footerFormatter: function(rows) {
									var sum = 0;
									for(var i = 0; i < rows.length; i++) {
										sum += parseInt(rows[i].panasonicPercent)
									}
									return sum+'%';
								}
							}
						]
					],
					data: [{
							"name": "滚筒",
							"mideaNum": "10",
							"mideaPercent": "29%",
							"panasonicNum": "10",
							"panasonicPercent": "29%"
						},
						{
							"name": "波轮",
							"mideaNum": "9",
							"mideaPercent": "28%",
							"panasonicNum": "10",
							"panasonicPercent": "29%"
						}
					],
					showFooter: true,
					pagination: true,
					pageNumber: 1, //初始化加载第一页，默认第一页
					pageSize: 5, //每页的记录行数（*）
					pageList: [5, 10], //可供选择的每页的行数（*）
					sortable: true
				})
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>