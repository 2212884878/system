<template>
	<section class="edit">
		<el-row class="borderm2">
			<el-col :span="20">
				<h4>{{$route.meta.title}}</h4>
			</el-col>
			<el-col :span="4" class="text-alginr">
				<el-button type="primary" icon="el-icon-edit" size="mini">我要留言</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span='24'>
				<table id="table" data-striped="true" data-pagination="true" class="table table-bordered" data-filter-control="true"
				 data-locale="zh-CN" v-loading="loading" element-loading-text="拼命加载数据中" element-loading-spinner="el-icon-loading">
					<thead>
						<tr>
							<th data-align="center"></th>
							<th data-field="id" data-align="center" data-valign="middle">ID</th>
							<th data-field="productName" data-filter-control="input" data-align="center" data-valign="middle">产品名称</th>
							<th data-field="typeId" data-filter-control="select" data-align="center" data-valign="middle">产品分类</th>
							<th data-field="classId" data-filter-control="select" data-align="center" data-valign="middle">产品类型</th>
							<th data-align="center" data-valign="middle">操作</th>
						</tr>
					</thead>
				</table>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import '@/assets/filter-control/bootstrap-table-filter-control.js'
	export default {
		data() {
			return {
				list: [],
				loading: false,
				json: [],
				json2: []
			};
		},
		created() {
			document.title = "产品下架";
		},
		mounted() {
			this.getList();
		},
		methods: {
			getGoodsList() { //获取产品类型
				this.$axios.get('../../../static/classId.json').then(res => {
					this.json = res.data.data;
				})
			},
			getGoodsList2() { //获取产品类型
				this.$axios.get('../../../static/typeId.json').then(res => {
					this.json2 = res.data.data;
				})
			},
			getList() { //获取产品信息列表
				var that = this;
				$("#table").bootstrapTable({
					// url: '/Home/GetDepartment', //请求后台的URL（*）
					method: 'get', //请求方式（*）
					sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
					pagination: true,
					pageNumber: 1, //初始化加载第一页，默认第一页
					pageSize: 10, //每页的记录行数（*）
					pageList: [10, 25, 50], //可供选择的每页的行数（*）
					striped: true, //是否显示行间隔色
					cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					sortable: true, //是否启用排序
					sortOrder: "asc", //排序方式
					showRefresh: true, //是否显示刷新按钮
					clickToSelect: true, //是否启用点击选中行
					uniqueId: "ID", //每一行的唯一标识，一般为主键列
					queryParams: function(params) {
						//这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
						var temp = {
							rows: params.limit, //页面大小
							page: (params.offset / params.limit) + 1, //页码
							sort: params.sort, //排序列名  
							sortOrder: params.order //排位命令（desc，asc） 
						};
						return temp;
					},
					columns: [{
							radio: true
						},
						{
							field: 'id',
							title: 'ID'
						},
						{
							field: 'productName',
							title: '产品名称'
						},
						{
							field: 'typeId',
							title: '产品分类',
							formatter: (value) => {
								var string = "";
								that.json.forEach(v => {
									if (v.id == value) {
										string = v.name;
									}
								})
								string = string == "" ? value : string;
								return string;
							}
						},
						{
							field: 'classId',
							title: '产品类型',
							formatter: (value) => {
								var string = "";
								that.json2.forEach(v => {
									if (v.id == value) {
										string = v.name;
									}
								})
								string = string == "" ? value : string;
								return string;
							}
						},
						{
							field: 'id',
							title: '操作',
							width: 120,
							align: 'center',
							valign: 'middle',
							formatter: (v, r, i) => {
								var id = v;
								var result = `<a href='javascript:;' class='btn btn-xs blue' @clcik="ToRoute(${id})" title='下架'><span class='glyphicon glyphicon-pencil'></span></a>`;
								return result;
							}
						}
					],
				})
			},
			ToRoute(id) {
				this.$route.push({path:`/Product/${id}`,query:{status:'del'}})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.edit {
		margin: 40px auto;
		width: 1200px;
		min-height: 700px;
		padding: 40px 20px;
		background: #fff;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

		.borderm2 {
			border-bottom: 2px solid #000;
			padding-bottom: 10px;
			margin-bottom: 20px;
		}

		.text-alginr {
			text-align: right;
		}
	}
</style>
