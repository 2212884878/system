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
			<el-col :span='8'>
				<el-input placeholder="请输入产品ID" v-model="productNames" size="mini">
					<el-button slot="append" icon="el-icon-download" @click="dialogVisible = true,SetList(currentPage,PageSize)"></el-button>
				</el-input>
			</el-col>
			<el-col :span='16'>
				<el-date-picker v-model="valueDate" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="valueDates" :picker-options="pickerOptions0">
				</el-date-picker>
			</el-col>
		</el-row>
		<!--表格-->
		<el-row>
			<el-col :span='24' class="mb10">
				<el-button type="primary" icon="el-icon-refresh" size="mini" round @click="createPriceCalendar">刷新表格</el-button>
				<el-button type="primary" icon="el-icon-upload2" size="mini" round @click="createPriceCalendar">生成</el-button>
				<el-button type="primary" icon="el-icon-check" size="mini" round @click="editBill">提交</el-button>
				<el-button type="primary" icon="el-icon-delete" size="mini" round @click="del">清空条件</el-button>
			</el-col>

			<el-col :span='24' class="tabs">
				<el-table  class="from" :data="data" border highlight-current-row height="500" :header-cell-style="tableHeaderColor" v-loading="loading1" element-loading-text="拼命加载数据中" element-loading-spinner="el-icon-loading" style="width: 100%" size="mini" ref="multipleTable" @selection-change="handleSelectionChange">
					<el-table-column fixed prop="id" label="ID" align="center"></el-table-column>

					<el-table-column type="selection" fixed width="55" align="center">
					</el-table-column>
					<!-- <el-table-column fixed prop="productId" label="产品Id" align="center" min-width="280"></el-table-column> -->
					<el-table-column prop="dataBaseDate" min-width="100" label="库存日期" align="center"></el-table-column>
					<el-table-column prop="holidaySign" label="节假日" align="center" :formatter="IsTrue"></el-table-column>
					<el-table-column prop="weekIndex" label="星期数" align="center"></el-table-column>
					<el-table-column prop="holidayType" min-width="100" label="节假日类型" align="center"></el-table-column>
					<el-table-column prop="dataBaseTotalCount" min-width="100" label="当天总库存数" align="right"></el-table-column>
					<el-table-column prop="alreadyUseCount" min-width="100" label="已售出库存数" align="right"></el-table-column>
					<el-table-column prop="occupationCount" min-width="100" label="已占用库存数" align="right"></el-table-column>
					<el-table-column prop="originalPrice" label="原价" align="right" min-width="100">
						<template slot-scope="scope">
							<el-input size="mini" v-model.number="scope.row.originalPrice" align="right"></el-input>
							<el-tag size="medium">{{ scope.row.originalPrice }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="returnPrice" label="退票价格" align="right" min-width="100">
						<template slot-scope="scope">
							<el-input size="mini" v-model.number="scope.row.returnPrice" align="right"></el-input>
							<el-tag size="medium">{{ scope.row.returnPrice }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="settlementPrice" label="结算价格" align="right" min-width="100">
						<template slot-scope="scope">
							<el-input size="mini" v-model.number="scope.row.settlementPrice"></el-input>
							<el-tag size="medium">{{ scope.row.settlementPrice }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="salePrice" label="销售价格" align="right"></el-table-column>
					<el-table-column prop="enableSign" label="是否启动卖票" align="center" min-width="100">
						<template slot-scope="scope">
							<!--<el-checkbox-group v-model="scope.row.enableSign">
								<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
							</el-checkbox-group>-->
							<template v-if="scope.row.enableSign == 1">
								<el-tag size="medium" type="success">是</el-tag>
							</template>
							<template v-else>
								<el-tag size="medium" type="danger">否</el-tag>
							</template>
						</template>
					</el-table-column>
					<el-table-column prop="createDate" label="创建日期" align="center" min-width="150"></el-table-column>
					<el-table-column prop="bs" label="PC网页" align="center">
						<template slot-scope="scope">
							<el-checkbox-group v-model="scope.row.bs">
								<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
							</el-checkbox-group>
						</template>
					</el-table-column>
					<el-table-column prop="app" label="APP" align="center">
						<template slot-scope="scope">
							<el-checkbox-group v-model="scope.row.app">
								<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
							</el-checkbox-group>
						</template>
					</el-table-column>
					<el-table-column prop="weiXin" min-width="100" label="微信公众号" align="center">
						<template slot-scope="scope">
							<el-checkbox-group v-model="scope.row.weiXin">
								<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
							</el-checkbox-group>
						</template>
					</el-table-column>
					<el-table-column prop="samllProgress" min-width="100" label="微信小程序" align="center">
						<template slot-scope="scope">
							<el-checkbox-group v-model="scope.row.samllProgress">
								<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
							</el-checkbox-group>
						</template>
					</el-table-column>
				</el-table>

				<section class="pages">
					<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="PageSizes" :page-size="PageSize2" layout="total, sizes, prev, pager, next, jumper" :total="count2">
					</el-pagination>
				</section>
			</el-col>
		</el-row>

		<el-dialog title="产品信息列表" :visible.sync="dialogVisible" width="80%" center>
			<div v-loading="loading" class="tabs click">
				<el-table :data="list" border highlight-current-row style="width: 100%" size="medium" @row-click="openDetails" :row-class-name="tableRowClassName" height="500">

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
				</el-table>

				<section class="pages">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="PageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
					</el-pagination>
				</section>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="SetRuleForm">确 定</el-button>
			</span>
		</el-dialog>

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
				loading1: true,
				list: [],
				currentPage: 1, //分页标识 至PageSizes
				count: 0,
				PageSize: 10,
				PageSizes: [10, 20, 30, 40, 50, 100],
				currentPage2: 1, //分页标识 至PageSizes
				count2: 0,
				PageSize2: 10,
				productName: '', //3个过滤字段
				typeId: '',
				classId: '',
				productNames: '',
				StringProductId: '',
				valueDate: '',
				sData: '',
				eData: '',
				multipleSelection: [],
				dialogVisible: false,
				data: [],
				pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now();
		          }
		        },
			};
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["userId", "accussToken", "typeID", "classID"]),
		},
		created() {
			document.title = "维护库存信息";
		},
		mounted() {
			this.createPriceCalendar();
		},
		methods: {
			valueDates(val) { //开始结束时间处理
				if(val) {
					this.sData = this.valueDate[0];
					this.eData = this.valueDate[1];
				} else {
					this.sData = "";
					this.eData = "";
				}
			},
			IsTrue(row, column, cellValue, index) { //是否是节假日过滤
				let status = cellValue ? 1 : 0;
				row.holidaySign = status;
				let text = cellValue ? '是' : '否';
				return text;
			},
			editBill() { //批量修改信息
				var list = this.multipleSelection;
				this.$axios.put("http://192.168.2.42:6030/stock/updateBatchPrice", list).then(res => {
					if(res.data.code == 200) {
						this.$message({
							message: `更新了${list.length} 条数据`,
							type: 'success'
						});
						this.createPriceCalendar();
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					console.log(error)
				})

			},
			createPriceCalendar() { //获取库存列表
				let data = {
					pageNum: this.currentPage2,
					pageSize: this.PageSize2,
					productId: this.productNames,
					beginDate: this.sData,
					endDate: this.eData
				}
				this.loading1 = true;
				this.data = [];
				this.$axios.get("http://192.168.2.42:6030/stock/createPriceCalendar", {
					params: data
				}).then(res => {
					this.loading1 = false;
					if(res.data.code == 200) {
						this.data = res.data.data.list || [];
						console.log(this.data)
						this.count2 = res.data.data.total || 0;
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					this.data = [];
					this.count2 = 0;
					this.loading1 = false;
					console.log(error)
				})
			},
			SetId() { //生成
				if(this.isEmpty(this.productNames) || this.isEmpty(this.sData) || this.isEmpty(this.eData)){
					this.$message.error("产品ID和开始结束时间不能为空");
					return;
				}
				let data = {
					productId: this.productNames,
					beginDate: this.sData,
					endDate: this.eData
				}
				this.loading1 = true;
				this.data = [];
				this.$axios.get("http://192.168.2.42:6030/stock/addStock", {
					params: data
				}).then(res => {
					this.loading1 = false;
					if(res.data.code == 200) {
						this.data = res.data.data.list || [];
						this.count2 = res.data.data.total || 0;
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					this.loading1 = false;
					console.log(error)
				})
			},
			del() { //清空
				this.productNames = '';
				this.valueDate = '';
				this.valueDates(false);
				this.createPriceCalendar();
			},
			handleSelectionChange(val) { //库存table选中
				console.log(val)
				this.multipleSelection = val;
			},
			search() { //搜索
				console.log(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId);
				this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId)
			},
			formatTypeId(row, column) { //过滤产品分类
				var string = "";
				// console.log(this.json)
				this.typeID.forEach(v => {
					if(v.id == row.typeId) {
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
					if(v.id == row.classId) {
						string = v.name;
					}
				})
				string = string == "" ? row.classId : string;
				return string;
			},
			handleSizeChange(val) { //产品选择每页 ${val} 条
				this.PageSize = val;
				this.SetList(this.currentPage, this.PageSize);
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) { //产品选择当前页: ${val}
				this.currentPage = val;
				this.SetList(this.currentPage, this.PageSize);
				console.log(`当前页: ${val}`);
			},
			handleSizeChange2(val) { //库存选择每页 ${val} 条
				this.PageSize2 = val;
				this.createPriceCalendar();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange2(val) { //库存选择当前页: ${val}
				this.currentPage2 = val;
				this.createPriceCalendar();
				console.log(`当前页: ${val}`);
			},
			SetList(num, size, n = '', t = '', c = '') { //查询产品列表
				let data = {
					pageNum: num,
					pageSize: size,
					classId: c,
					typeId: t,
					productName: n
				}
				this.loading = true;
				this.$axios.get("http://192.168.2.38:5010/product/findProduct", {
					params: data
				}).then(res => {
					this.loading = false;
					if(res.data.code == 200) {
						this.list = res.data.data.list || [];
						console.log(this.list)
						this.count = res.data.data.total || 0;
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					this.list = [];
					this.count = 0;
					this.loading = false;
					console.log(error)
				})
			},
			tableRowClassName({
				row,
				rowIndex
			}) { //把每一行的索引放进row
				row.index = rowIndex;
			},
			tableHeaderColor({
				row,
				column,
				rowIndex,
				columnIndex
			}) { // 修改table header的背景色
				if(rowIndex === 0) {
					return 'background-color: #f5f7fa;color: #909399;font-weight: 700;'
				}
			},
			openDetails(row, event, column) { //单击表格一行获取数据
				console.log(row.id)
				//document.getElementsByName("radio")[row.index].setAttribute("checked", true)
				this.StringProductId = row.id;
			},
			SetRuleForm() { //选中行赋值
				if(this.StringProductId != "") {
					this.productNames = this.StringProductId;
					this.dialogVisible = false;
				} else {
					this.$message({
						message: '请选中一条数据',
						type: 'warning'
					});
				}

			}
		},
		watch: {
			dialogVisible(val) { //弹框关闭清空选中值
				if(!val) {
					this.StringProductId = "";
				}
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
	
	.tabs.click .el-table__body tr.current-row>td {
		background: #66B1FF;
	}
	.tabs tr>td .el-tag {
		min-width: 77px;
	}
	
	.tabs .from .el-input {
		display: none
	}
	
	.tabs .from .current-row .el-input {
		display: block
	}
	
	.tabs .from .current-row .el-input+span {
		display: none
	}
</style>