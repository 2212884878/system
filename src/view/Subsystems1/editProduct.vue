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
				<!-- <table id="table" data-striped="true" data-pagination="true" class="table table-bordered" data-filter-control="true"
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
				</table> -->

				<el-table :data="list" border highlight-current-row v-loading="loading" style="width: 100%" stripe size="mini" :row-class-name="tableRowClassName">
					<el-table-column type="index" label="序号" width="60" align="center">
						<el-table-column></el-table-column>
					</el-table-column>
					<el-table-column prop="id" label="ID" width="300" align="center">
						<el-table-column></el-table-column>
					</el-table-column>
					<el-table-column width="300" prop="productName" label="产品名称" align="center">
						<!-- <el-table-column></el-table-column> -->
						<el-table-column>
							<template slot="header" slot-scope="scope">
								<el-input v-model="productName" size="small" placeholder="输入关键字搜索" @keyup.enter.native="search" />
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="typeId" label="产品分类" align="center" :formatter="formatTypeId">
						<el-table-column>
							<template slot="header" slot-scope="scope">
								<el-select v-model="typeId" size="small" placeholder="请选择" @change="search">
									<el-option v-for="item in json" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="classId" label="产品类型" align="center" :formatter="formatClassId">
						<el-table-column>
							<template slot="header" slot-scope="scope">
								<el-select v-model="classId" size="small" placeholder="请选择" @change="search">
									<el-option v-for="item in json2" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<el-table-column></el-table-column>
						<template slot-scope="scope">
							<router-link :to="{path:'/Product/' + scope.row.id,query:{status:'edit'}}">编辑</router-link>
							<el-tooltip content="下架该产品" placement="top">
								<el-switch v-model="scope.row.stopSign" active-color="#409EFF" active-value="true" inactive-value="false"
								 @change="switchs($event,scope.row)">
								</el-switch>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>

				<section class="pages">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="PageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
					</el-pagination>
				</section>
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
				json: '',//下拉select json
				json2: '',
				currentPage: 1,//分页标识 至PageSizes
				count: 0,
				PageSize: 2,
				PageSizes: [2, 20, 30, 40, 50, 100],
				productName: '',//3个过滤字段
				typeId: '',
				classId: ''
			};
		},
		created() {
			document.title = "修改产品";
		},
		mounted() {
			this.getGoodsList();
			this.getGoodsList2();
			this.SetList(this.currentPage, this.PageSize);
		},
		methods: {
			search() { //搜索
				this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId)
			},
			switchs(val,row) { //下架
				console.log(val);
				if (val) {
					this.$confirm('此操作将下架该产品, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.delete("http://192.168.2.38:5010/product/delete/1").then(res => {
							if (res.data.code == 200) {
								this.$message({
									message: res.data.message,
									type: 'success'
								});
							} else {
								this.$message({
									message: res.data.message,
									type: 'warning'
								});
							}
						}).catch(error => {
							console.log(error)
						})
					}).catch(() => {
						row.stopSign = false;
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			formatTypeId(row, column) { //过滤产品分类
				var string = "";
				this.json.forEach(v => {
					if (v.id == row.typeId) {
						string = v.name;
					}
				})
				string = string == "" ? '未知' : string;
				return string;
			},
			formatClassId(row, column) { //过滤产品类型
				var string = "";
				this.json2.forEach(v => {
					if (v.id == row.classId) {
						string = v.name;
					}
				})
				string = string == "" ? '未知' : string;
				return string;
			},
			handleSizeChange(val) {
				this.PageSize = val;
				this.SetList(this.currentPage, this.PageSize);
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.SetList(this.currentPage, this.PageSize);
				console.log(`当前页: ${val}`);
			},
			getGoodsList() { //获取产品类型
				this.$axios.get('../../../static/classId.json').then(res => {
					this.json = res.data.data;
				}).catch(error => {
					console.log(error)
				})
			},
			getGoodsList2() { //获取产品类型
				this.$axios.get('../../../static/typeId.json').then(res => {
					this.json2 = res.data.data;
				}).catch(error => {
					console.log(error)
				})
			},
			SetList(num, size, n = '', t = 0, c = 0) {//查询列表
				let data = {
					pageNum: num,
					pageSize: size,
					classId: c,
					typeId: t,
					productName: n
				}
				this.$axios.get("http://192.168.2.38:5010/product/findProduct", {
					params: data
				}).then(res => {
					if (res.data.code == 0) {
						this.list = res.data.data.list || [];
						console.log(this.list)
						this.count = res.data.data.total || 0;
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					console.log(error)
				})
			},
			tableRowClassName({
				row,
				rowIndex
			}) { //把每一行的索引放进row
				row.index = rowIndex;
			},
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

		.pages {
			height: 32px;
			text-align: center;
			margin-top: 20px;
		}
	}
</style>
<style lang="scss">
	.edit {
		.el-table th div.el-input {
			padding-left: 0;
			padding-right: 0;
		}

		.el-table th div.cell {
			height: 40px;
			line-height: 40px;
		}
	}
</style>
