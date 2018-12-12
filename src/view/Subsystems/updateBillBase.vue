<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：维护库存信息
    -->
	<section class="newPr">
		<el-row class="borderm2">
			<el-col :span="20">
				<h4>{{$route.meta.title}}</h4>
			</el-col>
			<el-col :span="4" class="text-alginr">
				<el-button type="primary" icon="el-icon-edit" size="mini">我要留言</el-button>
			</el-col>
		</el-row>


		<el-row class="mb10" :gutter="20">
			<el-col :span='4'>
				<el-input placeholder="请输入产品名称" v-model="productNames" size="mini">
					<el-button slot="append" icon="el-icon-download"></el-button>
				</el-input>
			</el-col>
			<el-col :span='20'>
				<el-date-picker v-model="valueDate" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-col>
		</el-row>
		<!--表格-->
		<el-row>
			<el-col :span='24' class="mb10">
				<el-button type="primary" icon="el-icon-refresh" size="mini" round @click="search">刷新表格</el-button>
				<el-button type="primary" icon="el-icon-upload2" size="mini" round @click="create">生成</el-button>
				<el-button type="primary" icon="el-icon-check" size="mini" round @click="create">提交</el-button>
			</el-col>

			<el-col :span='24' class="tabs">
				<el-table :data="list" border highlight-current-row height="537" v-loading="loading" element-loading-text="拼命加载数据中"
				 element-loading-spinner="el-icon-loading" style="width: 100%" size="mini" ref="multipleTable" @selection-change="handleSelectionChange">
					<el-table-column fixed prop="Id" label="ID" align="center"></el-table-column>
					<el-table-column type="selection" fixed width="55" align="center">
					</el-table-column>
					<el-table-column prop="dataBaseDate" label="库存日期" align="center"></el-table-column>
					<el-table-column prop="holIdaySign" label="节假日" align="center"></el-table-column>
					<el-table-column prop="weekIndex" label="星期数" align="center"></el-table-column>
					<el-table-column prop="holIdayType" min-width="100" label="节假日类型" align="center"></el-table-column>
					<el-table-column prop="dataBaseTotalCount" min-width="100" label="当天总库存数" align="center"></el-table-column>
					<el-table-column prop="alreadyUseCount" min-width="100" label="已售出库存数" align="center"></el-table-column>
					<el-table-column prop="occupationCount" min-width="100" label="已占用库存数" align="center"></el-table-column>
					<el-table-column prop="originalPrice" label="原价" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.originalPrice"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="returnPrice" label="退票价格" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.returnPrice"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="settlementPrice" label="结算价格" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.settlementPrice"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="salePrice" label="销售价格" align="center"></el-table-column>
					<el-table-column prop="enableSign" label="是否启动卖票" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.enableSign"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="createDate" label="创建日期" align="center"></el-table-column>
					<el-table-column prop="bs" label="PC网页" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.bs"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="app" label="APP" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.app"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="weiXin" min-width="100" label="微信公众号" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.weiXin"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="samllProgress" min-width="100" label="微信小程序" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.samllProgress"></el-input>
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
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				loading: false,
				list: [],
				currentPage: 1, //分页标识 至PageSizes
				count: 0,
				PageSize: 10,
				PageSizes: [10, 20, 30, 40, 50, 100],
				productName: '', //3个过滤字段
				typeId: '',
				classId: '',
				productNames: '',
				valueDate: '',
				multipleSelection: []
			};
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["uid", "token", "typeID", "classID"]),
		},
		created() {
			document.title = "维护库存信息";
		},
		mounted() {
			this.SetList(this.currentPage, this.PageSize);
		},
		methods: {
			create() {
				console.log(this.productNames, this.valueDate[1])
			},
			handleSelectionChange(val) { //table checkbox
				this.multipleSelection = val;
			},
			handleEdit(id) { //去产品详情
				this.$router.push({
					path: '/billbase',
					query: {
						id: id
					}
				})
			},
			search() { //搜索
				console.log(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId);
				this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId)
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
					console.log(error)
				})
			},
			tableRowClassName({
				row,
				rowIndex
			}) { //把每一行的索引放进row
				row.index = rowIndex;
			},
			openDetails(row, event, column) { //单击表格一行获取数据
				console.log(row.index)
				document.getElementsByName("radio")[row.index].setAttribute("checked", true)
				this.rows = row;
			}
		}
	}
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped"></style>
<style lang="scss" src="../../assets/scss/table.scss"></style>
<style lang="scss">
	.inputname {
		width: 200px;
	}
</style>
