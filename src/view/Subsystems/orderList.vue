<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：订单
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
				<el-date-picker v-model="valueDate" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="valueDates">
				</el-date-picker>
			</el-col>
			<el-col :span='9'>
				<el-button type="primary" icon="el-icon-upload2" size="mini" round @click="search">生成</el-button>
			</el-col>
		</el-row>
		<!--表格-->
		<el-row>
			<!--订单主表-->
			<el-col :span='24' class="tabs">
				<el-table :data="list" border highlight-current-row height="485" :header-cell-style="tableHeaderColor" v-loading="loading" element-loading-text="拼命加载数据中" element-loading-spinner="el-icon-loading" style="width: 100%" size="mini">
					<el-table-column fixed prop="Id" label="ID" align="center" width="50"></el-table-column>
					<el-table-column prop="orderTotalCash" label="订单总金额" align="center"></el-table-column>
					<el-table-column prop="payTotalCash" label="支付总金额" align="center"></el-table-column>
					<el-table-column prop="refundCash" label="退款总金额" align="center"></el-table-column>
					<el-table-column prop="couponCash" label="优惠卷总金额" align="center"></el-table-column>
					<el-table-column prop="createCannel" label="创建渠道" align="center"></el-table-column>
					<el-table-column prop="" label="游客手机号" align="center"></el-table-column>
					<el-table-column prop="" label="游客姓名" align="center"></el-table-column>
					<el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
					<el-table-column prop="buyDate" label="购票日期" align="center"></el-table-column>
					<el-table-column prop="receiveName" label="收短信人姓名" align="center" width="100"></el-table-column>
					<el-table-column prop="receiveMobile" label="收短信手机号" align="center" width="100"></el-table-column>
					<el-table-column prop="receiveIdentityCode" label="收短信人身份证号" align="center" width="100"></el-table-column>
				</el-table>

				<section class="pages">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="PageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
					</el-pagination>
				</section>
			</el-col>

			<el-col :span="24" class="tabs mt40">
				<el-tabs type="border-card">
					<!--订单明细表-->
					<el-tab-pane label="订单明细">
						<el-table :data="list" border highlight-current-row height="200" :header-cell-style="tableHeaderColor" style="width: 100%" size="mini">
							<el-table-column fixed prop="Id" label="ID" align="center" width="50"></el-table-column>
							<el-table-column prop="singleTicketState" label="单票状态" align="center"></el-table-column>
							<el-table-column prop="auditSign" label="退款审核标识" align="center"></el-table-column>
							<el-table-column prop="productCount" label="产品数量" align="center"></el-table-column>

							<el-table-column prop="returnCount" label="退票数量" align="center"></el-table-column>
							<el-table-column prop="areadyUseCount" label="已使用数量" align="center"></el-table-column>
							<el-table-column prop="smallTotalCash" label="金额小计" align="center"></el-table-column>
							<el-table-column prop="productCode" label="门票编码" align="center"></el-table-column>
							<el-table-column fixed prop="productName" label="产品名称" align="center"></el-table-column>
							<el-table-column prop="productNameEnglish" label="产品名称英文名" align="center" min-width="120"></el-table-column>
							<el-table-column prop="classId" label="产品类型" align="center"></el-table-column>
							<el-table-column prop="typeId" label="产品分类" align="center"></el-table-column>
							<el-table-column prop="originalPrice" label="原价" align="center"></el-table-column>
							<el-table-column prop="returnPrice" label="退票价格" align="center"></el-table-column>
							<el-table-column prop="settlementPrice" label="结算价格" align="center"></el-table-column>

							<el-table-column prop="returnSign" label="是否允许退票" align="center"></el-table-column>
							<el-table-column prop="returnDate" label="退票日期" align="center"></el-table-column>
							<el-table-column prop="useBeginDateTime" label="使用开始日期时间" align="center"></el-table-column>
							<el-table-column prop="useEndDateTime" label="使用结束日期时间" align="center"></el-table-column>
							<el-table-column prop="createDate" label="创建日期" align="center"></el-table-column>

							<el-table-column prop="unitName" label="单位" align="center"></el-table-column>
							<el-table-column prop="saleType" label="是否允许自提或邮寄" align="center"></el-table-column>
							<el-table-column prop="createTime" label="创建日期2" align="center"></el-table-column>
						</el-table>
					</el-tab-pane>
					<!--订单优惠券表-->
					<el-tab-pane label="订单优惠">
						<el-table :data="list" border highlight-current-row height="200" :header-cell-style="tableHeaderColor" style="width: 100%" size="mini">
							<el-table-column fixed prop="Id" label="ID" align="center" width="50"></el-table-column>
							<el-table-column prop="couponId" label="优惠卷Id" align="center"></el-table-column>
							<el-table-column prop="lowerCash" label="下限金额" align="center"></el-table-column>
							<el-table-column prop="lessCash" label="减金额" align="center"></el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
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
				valueDate: "",
				sData: '',
				eData: '',

			};
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["userId", "accussToken", "typeID", "classID"]),
		},
		created() {

		},
		mounted() {
			this.SetList(this.currentPage, this.PageSize);
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
			search() { //搜索
				this.SetList(this.currentPage, this.PageSize, this.productName, this.typeId, this.classId)
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
					if(res.data.code == 200) {
						this.list = res.data.data.list || [];
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
			},
			tableHeaderColor({
				row,
				column,
				rowIndex,
				columnIndex
			}) {// 修改table header的背景色
				if(rowIndex === 0) {
					return 'background-color: #f5f7fa;color: #909399;font-weight: 700;'
				}
			}

		},
		watch: {

		}
	}
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped"></style>
<style lang="scss" src="../../assets/scss/table.scss"></style>
<style lang="scss">
	.inputname {
		width: 200px;
	}
	
	.mt40 {
		margin-top: 40px;
	}
</style>