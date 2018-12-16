<template>
	<!--
		作者：lixiaoyi
		时间：2018-12-16
		描述：订单详情
	-->
	<div class="newPr orderInfo" id="orderInfo">
		<el-row class="borderm2">
			<el-col :span="20">
				<h4>{{$route.meta.title}}</h4>
			</el-col>
			<el-col :span="4" class="text-alginr">
				<el-button type="primary" icon="el-icon-edit" size="mini">我要留言</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col>
				<el-form class="ruleForm" label-width="150px">
					<!-- 订单信息 -->
					<el-card shadow="always" class="mb10">
						<div slot="header" class="clearfix">
							<span>订单信息</span>
						</div>
						<div class="text item">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="游客手机号:">
										<span>{{ruleForm.touristiPhone}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="游客姓名:">
										<span>{{ruleForm.touristName}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="订单状态:">
										<span>{{ruleForm.orderState}}</span>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="订单总金额:">
										<span class="red">{{ruleForm.orderTotalCash}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="支付总金额:">
										<span class="red">{{ruleForm.payTotalCash}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="退款总金额:">
										<span class="red">{{ruleForm.refundCash}}</span>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="创建渠道:">
										<span>{{ruleForm.createCannel}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="创建日期:">
										<span>{{ruleForm.createTime}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="购票日期:">
										<span>{{ruleForm.buyDate}}</span>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="收短信人姓名:">
										<span>{{ruleForm.receiveName}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="收短信手机号:">
										<span>{{ruleForm.receiveMobile}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="收短信人身份证号:">
										<span>{{ruleForm.receiveIdentityCode}}</span>
									</el-form-item>
								</el-col>
							</el-row>

						</div>
					</el-card>

					<!-- 订单明细信息 -->
					<el-card shadow="always" class="mb10">
						<div slot="header" class="clearfix">
							<span>订单明细</span>
						</div>
						<div class="text item">
							
							<el-row :gutter="20">
								<template v-for="(item,k) in order">
									<el-col :span="8" :key="k">
										<el-form-item :label="item.text">
											<template v-if="item.key == 'classId'">
												<span>{{GetClassID(item.value)}}</span>
											</template>
											<template v-else-if="item.key == 'typeId'">
												<span>{{GetTypeID(item.value)}}</span>
											</template>
											<template v-else-if="item.key == 'saleType'">
												<span>{{GetStatus(item.value)}}</span>
											</template>
											<template v-else>
												<span v-html="item.value" :class="{red:item.key == 'smallTotalCash' || item.key == 'originalPrice' || item.key == 'returnPrice' || item.key == 'settlementPrice'}"></span>
											</template>
										</el-form-item>
									</el-col>
								</template>
							</el-row>
							
						</div>
					</el-card>

					<!-- 优惠券信息 -->
					<el-card shadow="always" class="mb10">
						<div slot="header" class="clearfix">
							<span>优惠券</span>
						</div>
						<div class="text item">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="优惠卷Id:">
										<span>{{orderCoupon.couponId}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="下限金额:">
										<span class="red">{{orderCoupon.lowerCash}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="减金额:">
										<span class="red">{{orderCoupon.lessCash}}</span>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-card>
				</el-form>
			</el-col>
		</el-row>
	</div>
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
				ruleForm: {
					touristiPhone: '15267040024',
					touristName: '尤才',
					orderState: '已完成',
					orderTotalCash: '1000',
					payTotalCash: '1000',
					refundCash: '0',
					createCannel: '官网',
					createTime: '2018-12-16  10:39:00',
					buyDate: '2018-12-16 10:39:00',
					receiveName: '尤才',
					receiveMobile: '15267040024',
					receiveIdentityCode: '4325244563245624512'
				},
				orderCoupon: {
					couponId: 'inf_coupon主键',
					lowerCash: '满200',
					lessCash: '减10'
				},
				order: [{
						text: '主键',
						key:'id',
						value: '001'
					},
					{
						text: '单票状态',
						key:'singleTicketState',
						value: '0'
					},
					{
						text: '退款审核标识',
						key:'auditSign',
						value: '-1'
					},
					{
						text: '产品数量',
						key:'productCount',
						value: '1'
					},
					{
						text: '退票数量',
						key:'returnCount',
						value: '0'
					},
					{
						text: '已使用数量(已核销)',
						key:'areadyUseCount',
						value: '0'
					},
					{
						text: '金额小计',
						key:'smallTotalCash',
						value: '100'
					},
					{
						text: '门票编码',
						key:'productCode',
						value: ''
					},
					{
						text: '产品名称',
						key:'productName',
						value: ''
					},
					{
						text: '产品名称英文名',
						key:'productNameEnglish',
						value: ''
					},
					{
						text: '产品类型',
						key:'classId',
						value: '1'
					},
					{
						text: '产品分类',
						key:'typeId',
						value: '1'
					},
					{
						text: '原价',
						key:'originalPrice',
						value: '100'
					},
					{
						text: '退票价格',
						key:'returnPrice',
						value: '100',
					},
					{
						text: '结算价格',
						key:'settlementPrice',
						value: '100'
					},
					{
						text: '是否允许退票',
						key:'returnSign',
						value: '1'
					},
					{
						text: '退票日期',
						key:'returnDate',
						value: '2018-12-16 00:00:00'
					},
					{
						text: '使用开始日期时间',
						key:'useBeginDateTime',
						value: '2018-12-16 00:00:00'
					},
					{
						text: '使用结束日期时间',
						key:'useEndDateTime',
						value: '2018-12-16 00:00:00'
					},
					{
						text: '创建日期',
						key:'createDate',
						value: '2018-12-16 00:00:00'
					},
					{
						text: '单位',
						key:'unitName',
						value: ''
					},
					{
						text: '是否允许自提或邮寄',
						key:'saleType',
						value: '0'
					}
				],
				oreder:{
						id:'1',
						singleTicketState:'0',
						auditSign:'-1',
						productCount:'1',
						returnCount:'0',
						areadyUseCount:'0',
						smallTotalCash:'100',
						eCode:'314465432',
						productCode:'',
						productName:'',
						productNameEnglish:'',
						classId:'1',
						typeId:'1',
						originalPrice:'100',
						returnPrice:'100',
						settlementPrice:'100',
						returnSign:'',
						returnDate:'',
						useBeginDateTime:'',
						useEndDateTime:'',
						unitName:'单位',
						saleType:'0'
				}
			};
		},
		components: {},
		computed: {
			//从vuex获取用户数据
			...mapState(["userId", "accussToken", "typeID", "classID"])
		},
		mounted() {
			this.SetOrder(this.order);
		},
		methods: {
			SetOrder(order) {
				let data = this.oreder;
				let list = [];
				order.forEach((v,k) => {
					for(let i in data){
						if(v.key == i){
							v.value = data[i]
						}
					}
					list.push(v)
				})
				this.order = list;
			},
			GetClassID(value) {//过滤产品类型
				var string = "";
				this.classID.forEach(v => {
					if (v.id == value) {
						string = v.name;
					}
				})
				string = string == "" ? value : string;
				return string;
			},
			GetTypeID(value) {//过滤产品分类
				var string = "";
				this.typeID.forEach(v => {
					if (v.id == value) {
						string = v.name;
					}
				})
				string = string == "" ? value : string;
				return string;
			},
			GetStatus(value) { //是否判断
				return value == 1 ? '是' : '否'
			}
		}
	};
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped">
</style>
<style lang="scss" scoped="scoped">
	.red {
		color: red;
	}
</style>
