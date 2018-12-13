<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：现产品维护
    -->
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
			<el-col :span='24' class="text-alginr mb10">
				<el-button type="primary" icon="el-icon-refresh" size="mini" round @click="search">刷新表格</el-button>
			</el-col>
			<el-col :span='24'>
				<el-table :data="list" border highlight-current-row height="537" v-loading="loading" element-loading-text="拼命加载数据中"
				 element-loading-spinner="el-icon-loading" style="width: 100%" size="mini" :row-class-name="tableRowClassName">
					<el-table-column type="index" label="序号" width="60" align="center">
						<el-table-column type="index" align="center"></el-table-column>
					</el-table-column>
					<el-table-column prop="id" label="ID" width="400" align="center">
						<el-table-column prop="id" align="center" width="400"></el-table-column>
					</el-table-column>
					<el-table-column width="300" prop="productName" label="产品名称" align="center">
						<!-- <el-table-column></el-table-column> -->
						<el-table-column width="300" prop="productName" align="center">
							<template slot="header" slot-scope="scope">
								<el-input v-model.lazy="productName" size="small" placeholder="输入关键字搜索" @keyup.enter.native="search" @change="search" />
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="typeId" label="产品分类" align="center">
						<el-table-column prop="typeId" align="center" :formatter="formatTypeId">
							<template slot="header" slot-scope="scope">
								<el-select v-model="typeId" size="small" placeholder="请选择" @change="search">
									<el-option value="" label="全部"></el-option>
									<el-option v-for="item in typeID" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="classId" label="产品类型" align="center">
						<el-table-column prop="classId" align="center" :formatter="formatClassId">
							<template slot="header" slot-scope="scope">
								<el-select v-model="classId" size="small" placeholder="请选择" @change="search">
									<el-option value="" label="全部"></el-option>
									<el-option v-for="item in classID" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<el-table-column prop="" align="center">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
								<el-tooltip content="是否停用该产品" placement="top">
									<el-switch v-model="scope.row.stopSign" active-color="#409EFF" :active-value="1" :inactive-value="0" @change="switchs($event,scope.row)"
									 name='switch'>
									</el-switch>
								</el-tooltip>
							</template>
						</el-table-column>
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
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				list: [],
				loading: false,
				currentPage: 1, //分页标识 至PageSizes
				count: 0,
				PageSize: 10,
				PageSizes: [10, 20, 30, 40, 50, 100],
				productName: '', //3个过滤字段
				typeId: '',
				classId: ''
			};
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["userId", "accussToken", "typeID", "classID"]),
		},
		created() {
			document.title = "修改产品";
		},
		mounted() {
			this.SetList(this.currentPage, this.PageSize);
		},
		methods: {
			handleEdit(id) { //去产品详情
				this.$router.push({
					path: '/Product',
					query: {
						id: id,
						status: 'edit'
					}
				})
			},
			search() { //搜索
				console.log(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId);
				this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId)
			},
			switchs(val, row) { //下架
				let data = {
					id: row.id,
					stopSign: row.stopSign
				}
				this.$axios.put("http://192.168.2.38:5010/product/update", data).then(res => {
					if (res.data.code == 200) {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId); //更新后刷新数据
					} else {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				}).catch(error => {
					console.log(error)
				})

			},
			formatTypeId(row, column) { //过滤产品分类
				var string = "";
				// console.log(this.json)
				this.typeID.forEach(v => {
					if (v.id == row.typeId) {
						string = v.name;
					}
				})
				string = string == "" ? row.typeId : string;
				return string;
			},
			formatClassId(row, column) { //过滤产品类型
				var string = "";
				// console.log(this.json2)
				this.classID.forEach(v => {
					if (v.id == row.classId) {
						string = v.name;
					}
				})
				string = string == "" ? row.classId : string;
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
			SetList(num, size, n = '', t = '', c = '') { //查询列表
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
					if (res.data.code == 200) {
						this.list = res.data.data.list || [];
						console.log(this.list)
						this.count = res.data.data.total || 0;
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					this.list = [];
					this.count = 0;
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
		.mb10{
			margin-bottom: 10px;
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

		.el-table th div.cell,
		.el-table td div.cell {
			height: 40px;
			line-height: 40px;
		}

		.el-table th div.el-input {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
