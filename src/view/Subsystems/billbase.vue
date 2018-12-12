<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：库存详情
    -->
	<section class="newPr">
		<el-row class="borderm2">
			<el-col :span="20">
				<h4>{{$route.meta.title}}</h4>
			</el-col>
			<el-col :span="4" class="text-alginr">
				<el-button type="primary" size="mini" @click="go">返回</el-button>
				<el-button type="primary" icon="el-icon-edit" size="mini">我要留言</el-button>
			</el-col>
		</el-row>

		<!--表单-->
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="主键">
						<el-input v-model="ruleForm.Id" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品Id">
						<el-input v-model="ruleForm.productId" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="第三库存标识" prop="thirdPartySign">
						<el-input v-model="ruleForm.thirdPartySign"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="库存日期(游玩日期)" prop="dataBaseDate">
						<!--<el-input v-model="ruleForm.dataBaseDate"></el-input>-->
						<el-date-picker v-model="ruleForm.dataBaseDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="logTimeChange">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="星期数" prop="weekIndex">
						<el-input v-model="ruleForm.weekIndex"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="节假日类型" prop="holIdayType">
						<el-select v-model="ruleForm.holIdayType" placeholder="请选择产品类型">
							<template v-for="item in DayType">
								<el-option :label="item.name" :value="item.name"></el-option>
							</template>
						</el-select>
						
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="当天总库存数" prop="dataBaseTotalCount">
						<el-input v-model="ruleForm.dataBaseTotalCount"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="已售出库存数" prop="dataBaseTotalCount">
						<el-input v-model="ruleForm.alreadyUseCount"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="已占用库存数" prop="dataBaseTotalCount">
						<el-input v-model="ruleForm.occupationCount"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="已退款库存数" prop="dataBaseTotalCount">
						<el-input v-model="ruleForm.returnCount"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="已改签库存数" prop="dataBaseTotalCount">
						<el-input v-model="ruleForm.editCount"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">

				</el-col>
			</el-row>

			<!-- 价格 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="原价" prop="originalPrice">
						<el-input v-model="ruleForm.originalPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="退票价格" prop="originalPrice">
						<el-input v-model="ruleForm.returnPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="结算价格" prop="originalPrice">
						<el-input v-model="ruleForm.settlementPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="销售价格" prop="originalPrice">
						<el-input v-model="ruleForm.salePrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否在网页上显示">
						<el-checkbox-group v-model="ruleForm.bs">
							<el-checkbox label="是" name="bs" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否在app上显示">
						<el-checkbox-group v-model="ruleForm.app">
							<el-checkbox label="是" name="app" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否在公众号上显示">
						<el-checkbox-group v-model="ruleForm.weiXin">
							<el-checkbox label="是" name="weiXin" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>

				</el-col>
				<el-col :span="12">
					<el-form-item label="是否在小程序上显示">
						<el-checkbox-group v-model="ruleForm.samllProgress">
							<el-checkbox label="是" name="samllProgress" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否启动卖票">
						<el-checkbox-group v-model="ruleForm.enableSign">
							<el-checkbox label="是" name="enableSign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否为节假日">
						<el-checkbox-group v-model="ruleForm.holIdaySign">
							<el-checkbox label="是" name="holIdaySign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 说明 -->
			<el-row class="el-form-item">
				<el-col :span="24">
					<el-tabs v-model="activeName" type="border-card">
						<el-tab-pane label="说明" name="first">
							<el-form-item label="使用说明" class="lhn">
								<quill-editor ref="content" v-model="ruleForm.content" :options="editorOption" @change="alertValue($event,ruleForm.content,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="备注" name="fourth">
							<el-form-item label="备注" class="lhn">
								<quill-editor ref="remark" v-model="ruleForm.remark" :options="editorOption" @change="alertValue($event,ruleForm.remark,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>

			<!-- 使用说明（英文） -->
			<el-row class="el-form-item">
				<el-col :span="24">
					<el-tabs v-model="activeName2" type="border-card">
						<el-tab-pane label="Directions for use" name="first">
							<el-form-item label="Directions for use" class="lhn">
								<quill-editor ref="contentEnglish" v-model="ruleForm.contentEnglish" :options="editorOption" @change="alertValue($event,ruleForm.contentEnglish,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="note" name="fourth">
							<el-form-item label="note" class="lhn">
								<quill-editor ref="remarkEnglisn" v-model="ruleForm.remarkEnglisn" :options="editorOption" @change="alertValue($event,ruleForm.remarkEnglisn,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>

	</section>
</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('不能为空'));
				} else {
					if(!(/^\d+\.?\d{0,2}$/.test(value))) {
						callback(new Error('数字或2位小数点'));
					}
					callback();
				}
			};
			var checkAge = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('不能为空'));
				} else {
					let test = "^[1-9][0-9]*$";
					if(!(new RegExp(test).test(value))) {
						callback(new Error('请输入数字值'));
					}
					callback();
				}
			};
			// 工具栏配置
			var toolcontext = [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				[{
					'header': 1
				}, {
					'header': 2
				}], // custom button values
				[{
					'list': 'ordered'
				}, {
					'list': 'bullet'
				}],
				[{
					'indent': '-1'
				}, {
					'indent': '+1'
				}], // outdent/indent
				[{
					'direction': 'rtl'
				}], // text direction
				[{
					'color': []
				}, {
					'background': []
				}], // dropdown with defaults from theme

				[{
					'align': []
				}],
				['link'],
				['clean']
			];
			return {
				editorOption: { //富文本编辑器
					modules: {
						toolbar: toolcontext
					},
					placeholder: '最多输入2000字节'
				},
				activeName: 'first', //tab切换标识
				activeName2: 'first',
				ruleForm: { //产品库存表单
					Id: "",
					productId: "",
					thirdPartySign: "YK",
					dataBaseDate: "",
					holIdaySign: 0,
					weekIndex: "",
					holIdayType: "周末双休",
					dataBaseTotalCount: "",
					alreadyUseCount: 0,
					occupationCount: 0,
					returnCount: 0,
					editCount: 0,
					originalPrice: "",
					returnPrice: "",
					settlementPrice: "",
					salePrice: "",
					enableSign: 1,
					bs: 1,
					app: 0,
					weiXin: 1,
					samllProgress: 0,
					content: "",
					remark: "",
					contentEnglish: "",
					remarkEnglisn: ""
				},
				rules: { //表单验证
					thirdPartySign: [{
							required: true,
							message: '请输入第三库存标识',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 2,
							message: '长度在 1 到 2 个字符',
							trigger: 'blur'
						}
					],
					dataBaseDate: [{
						required: true,
						message: '请选择库存日期',
						trigger: 'blur'
					}],
					weekIndex: [{
						required: true,
						message: '请选择库存日期',
						trigger: 'blur'
					}, {
						min: 1,
						max: 3,
						message: '长度在 1 到 3 个字符',
						trigger: 'blur'
					}],
					weekIndex: [{
						required: true,
						message: '请输入星期数',
						trigger: 'blur'
					}, {
						min: 1,
						max: 3,
						message: '长度在 1 到 3 个字符',
						trigger: 'blur'
					}],
					holIdayType: [{
						required: true,
						message: '请输入节假日类型',
						trigger: 'blur'
					}, {
						min: 1,
						max: 20,
						message: '长度在 1 到 20 个字符',
						trigger: 'blur'
					}],
					dataBaseTotalCount: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}, {
						min: 1,
						max: 1000,
						message: '长度在 1 到 1000 个字符',
						trigger: 'blur'
					}, {
						validator: checkAge,
						trigger: 'blur'
					}],
					originalPrice: [{
							required: true,
							message: '请输入原价'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],

				}
			};
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["uid", "token","DayType"]),
		},
		mounted() {

		},
		methods: {
			go() { //返回
				this.$router.push({
					path: '/updateBillBase'
				})
			},
			logTimeChange(val) { // 获取开始时间
				console.log(val)
				this.ruleForm.dataBaseDate = val;
			},
			alertValue(e, strValue, decimalNum) { // vue-quill-editor设置长度限制的提示
				var realLength = 0,
					len = strValue.length,
					charCode = -1,
					matchWords = 0;
				for(var i = 0; i < len; i++) {
					charCode = strValue.charCodeAt(i);
					if(charCode >= 0 && charCode <= 128)
						realLength += 1;
					else
						realLength += 2;
				}
				if(realLength < decimalNum) {
					matchWords = strValue.trim().length;
				}
				if(realLength > decimalNum) {
					e.quill.deleteText(matchWords, 1, strValue); //保留 strValue 的 前 decimalNum 位字符
				}
			},
			submitForm(formName) { // 提交表单
				console.log(this.ruleForm);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) { //重置表单
				this.ruleForm.enableSign = 1;
				this.ruleForm.bs = 1;
				this.ruleForm.app = 0;
				this.ruleForm.weiXin = 1;
				this.ruleForm.samllProgress = 0;
				this.ruleForm.content = "";
				this.ruleForm.remark = "";
				this.ruleForm.contentEnglish = "";
				this.ruleForm.remarkEnglisn = "";
				this.ruleForm.holIdaySign = "";
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped"></style>
<style lang="scss">
	.lhn .el-form-item__content {
		line-height: normal;
	}
	
	.w400 {
		.el-input {
			width: 399px;
		}
	}
	
	.newPr .quill-editor {
		.ql-container {
			.ql-editor {
				min-height: 100px;
			}
		}
	}
</style>