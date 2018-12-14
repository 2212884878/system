<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：新产品上架
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

		<div class="new-button">
			<el-button size="small" type="primary" @click="GetList">拉取数据</el-button>
			<el-button size="small" type="primary" @click="dialogVisible = true">载入数据</el-button>
		</div>

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

			<!-- 产品基本信息 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="景区ID">
						<el-input v-model="ruleForm.parkId" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="门票编码">
						<el-input v-model="ruleForm.productCode" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 产品名称 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="产品名称" prop="productName">
						<el-input v-model="ruleForm.productName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品名称英文名" prop="productNameEnglish">
						<el-input v-model="ruleForm.productNameEnglish"></el-input>
					</el-form-item>
				</el-col>
			</el-row>



			<!-- 产品类型 -->
			<el-row :gutter="20" class="w400">
				<el-col :span="12">
					<el-form-item label="产品类型" prop="classId" style="width: 100%;">
						<el-select v-model="ruleForm.classId" placeholder="请选择产品类型">
							<template v-for="item in classID">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品分类" prop="typeId">
						<el-select v-model="ruleForm.typeId" placeholder="请选择产品分类">
							<template v-for="item in typeID">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- 图片 -->
			<el-form-item label="图片资料ID" prop="pictureId">
				<el-input v-model="ruleForm.pictureId" disabled></el-input>
				<el-upload class="avatar-uploader" :action="importFileUrl" :show-file-list="false" :on-success="handleAvatarSuccess3"
				 :before-upload="beforeAvatarUpload">
					<i class="el-icon-circle-plus">上传图片</i>
				</el-upload>
			</el-form-item>

			<!-- 子图片Id -->
			<el-form-item label="子图片ID">
				<el-input v-model="imgs" disabled></el-input>
				<el-upload class="avatar-uploader" :action="importFileUrl" :show-file-list="false" :on-success="handleAvatarSuccess2"
				 :before-upload="beforeAvatarUpload" :limit="3" :on-exceed="PictureIdz" multiple>
					<i class="el-icon-circle-plus">上传图片</i>
				</el-upload>
			</el-form-item>

			<!-- 价格 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="原价" prop="originalPrice">
						<el-input v-model="ruleForm.originalPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="退票价格" prop="returnPrice">
						<el-input v-model="ruleForm.returnPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="结算价格" prop="settlementPrice">
						<el-input v-model="ruleForm.settlementPrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="销售价格" prop="salePrice">
						<el-input v-model="ruleForm.salePrice" maxlength="18"></el-input>
					</el-form-item>
				</el-col>
			</el-row>



			<!-- 天数 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="预订天数" prop="scheduledDays">
						<el-input v-model="ruleForm.scheduledDays"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="使用最后有效天数" prop="effectiveDays">
						<el-input v-model="ruleForm.effectiveDays"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="退票天数限制" prop="returnDays">
						<el-input v-model="ruleForm.returnDays"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="单位(张)" prop="unitName">
						<el-input v-model="ruleForm.unitName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


			<!-- 时间 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="使用开始时间" required>
						<el-form-item prop="useBeginTime">
							<el-time-picker arrow-control v-model="ruleForm.useBeginTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="开始时间" @change="logTimeChange1">
							</el-time-picker>
						</el-form-item>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="使用结束时间" required>
						<el-form-item prop="useEndTime">
							<el-time-picker arrow-control v-model="ruleForm.useEndTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="结束时间" @change="logTimeChange2">
							</el-time-picker>
						</el-form-item>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 是否允许自提或邮寄 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="手机号最多可购张数" prop="effectiveDays">
						<el-input v-model="ruleForm.commitCount"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否允许自提或邮寄">
						<el-checkbox-group v-model="ruleForm.saleType">
							<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否允许退票" prop="returnSign">
						<el-checkbox-group v-model="ruleForm.returnSign">
							<el-checkbox label="是" name="returnSign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>

				</el-col>
				<el-col :span="12">
					<el-form-item label="是否允许重复进出" prop="repeatUseSign">
						<el-checkbox-group v-model="ruleForm.repeatUseSign">
							<el-checkbox label="是" name="repeatUseSign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 说明 -->
			<el-row class="el-form-item">
				<el-col :span="24">
					<el-tabs v-model="activeName" type="border-card">
						<el-tab-pane label="使用说明" name="first">
							<el-form-item label="使用说明" class="lhn">
								<quill-editor ref="UseContent" v-model="ruleForm.useContent" :options="editorOption" @change="alertValue($event,ruleForm.useContent,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="退款说明" name="second">
							<el-form-item label="退款说明" class="lhn">
								<quill-editor ref="returnContent" v-model="ruleForm.returnContent" :options="editorOption" @change="alertValue($event,ruleForm.returnContent,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<!-- <el-tab-pane label="改签说明" name="third">
							<el-form-item label="改签说明" class="lhn">
								<quill-editor ref="editContent" v-model="ruleForm.editContent" :options="editorOption" @change="alertValue($event,ruleForm.editContent,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane> -->
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
								<quill-editor ref="useContentEnglish" v-model="ruleForm.useContentEnglish" :options="editorOption" @change="alertValue($event,ruleForm.useContentEnglish,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="Refund instructions" name="second">
							<el-form-item label="Refund instructions" class="lhn">
								<quill-editor ref="returnContentEnglish" v-model="ruleForm.returnContentEnglish" :options="editorOption"
								 @change="alertValue($event,ruleForm.returnContentEnglish,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<!-- <el-tab-pane label="Endorsed to illustrate" name="third">
							<el-form-item label="Endorsed to illustrate" class="lhn">
								<quill-editor ref="editContentEnglish" v-model="ruleForm.editContentEnglish" :options="editorOption" @change="alertValue($event,ruleForm.editContentEnglish,2000)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane> -->
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


		<el-dialog title="银科产品信息" :visible.sync="dialogVisible" width="80%" center>
			<div v-loading="loading" class="tab">
				<el-table :data="list" border highlight-current-row style="width: 100%" stripe size="medium" @row-click="openDetails"
				 :row-class-name="tableRowClassName">
					<el-table-column label="选择" align="center">
						<el-table-column prop="status" align="center" width="60">
							<template slot-scope="scope">
								<input type="radio" name="radio" ref="radio">
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="parkID" label="景区ID" width="100" align="center">
						<el-table-column prop="parkID" width="100" align="center"></el-table-column>
					</el-table-column>
					<el-table-column prop="parkName" label="景区名称" align="center">
						<el-table-column align="center">
							<template slot="header" slot-scope="scope">
								<el-input v-model.lazy="parkName" size="small" placeholder="输入关键字搜索" @keyup.enter.native="search(currentPage,PageSize,parkName,productName)"
								 @change="search(currentPage,PageSize,parkName,productName)" />
							</template>
							<template slot-scope="scope">    
								                   <span class="col-cont" v-html="showDate(scope.row.parkName)"></span>
								              </template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="productType" width="100" label="门票类型" align="center">
						<el-table-column prop="productType" width="100" align="center"></el-table-column>
					</el-table-column>
					<el-table-column prop="productId" width="150" label="门票ID" align="center">
						<el-table-column prop="productId" width="150" align="center"></el-table-column>
					</el-table-column>
					<el-table-column prop="productName" label="门票名称" align="center">
						<el-table-column align="center">
							<template slot="header" slot-scope="scope">
								<el-input v-model.lazy="productName" size="small" placeholder="输入关键字搜索" @keyup.enter.native="search(currentPage,PageSize,parkName,productName)"
								 @change="search(currentPage,PageSize,parkName,productName)" />
							</template>
							<template slot-scope="scope">    
								                   <span class="col-cont" v-html="showDate(scope.row.productName)"></span>
								              </template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="isTheatre" width="100" label="剧场票" align="center">
						<el-table-column prop="isTheatre" width="100" align="center"></el-table-column>
					</el-table-column>
					<el-table-column prop="productCode" label="门票编码" align="center">
						<el-table-column prop="productCode" align="center"></el-table-column>
					</el-table-column>
				</el-table>


				<section class="pages">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="PageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
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
				if (value === '') {
					callback(new Error('不能为空'));
				} else {
					if (!(/^\d+\.?\d{0,2}$/.test(value))) {
						callback(new Error('数字或2位小数点'));
					}
					callback();
				}
			};
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				} else {
					let test = "^[1-9][0-9]*$";
					if (!(new RegExp(test).test(value))) {
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
				productName: '', //列表过滤字段
				parkName: '',
				currentPage: 1, //分页信息
				count: 0,
				PageSize: 10,
				PageSizes: [10, 20, 30, 40, 50, 100],
				radio: false,
				activeName: 'first', //下面说明tab切换标识
				activeName2: 'first',
				loading: true,
				list: [], //列表数据
				rows: [], //列表点击选择的数据
				importFileUrl: 'http://192.168.2.34:2600/staticResource/uploadFile', //上传图片地址
				editorOption: { //富文本编辑器
					modules: {
						toolbar: toolcontext
					},
					placeholder: '最多输入2000字节'
				},
				imgs: '',
				dialogVisible: false, //显示载入弹框
				ruleForm: { //表单
					parkId: '',
					parkName: '',
					productCode: '',
					productName: '',
					productNameEnglish: '',
					classId: '',
					originalPrice: '',
					returnPrice: '',
					settlementPrice: '',
					salePrice: '',
					typeId: '',
					pictureId: '',
					scheduledDays: 30,
					effectiveDays: 1,
					returnSign: 1,
					returnDays: 3,
					useBeginTime: '09:00:00',
					useEndTime: '18:00:00',
					repeatUseSign: 1,
					unitName: '1',
					useContent: "",
					returnContent: "",
					// editContent: "",
					remark: "",
					useContentEnglish: "",
					returnContentEnglish: "",
					// editContentEnglish: "",
					remarkEnglisn: "",
					saleType: 1,
					commitCount: 2000,
					subPictureIdList: '' //子图片ID
				},
				rules: { //表单验证规则
					productName: [{
							required: true,
							message: '请输入产品名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 100,
							message: '长度在 2 到 100 个字符',
							trigger: 'blur'
						}
					],
					productNameEnglish: [{
							required: true,
							message: '请输入产品英文名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 100,
							message: '长度在 2 到 100 个字符',
							trigger: 'blur'
						}
					],
					classId: [{
						required: true,
						message: '请选择产品类型',
						trigger: 'change'
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
					returnPrice: [{
							required: true,
							message: '请输入退票价格',
							trigger: 'change'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					settlementPrice: [{
							required: true,
							message: '请输入结算价格',
							trigger: 'change'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					salePrice: [{
							required: true,
							message: '请输入销售价格',
							trigger: 'change'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					typeId: [{
						required: true,
						message: '请选择产品分类',
						trigger: 'change'
					}],
					pictureId: [{
						required: true,
						message: '请输入图片资料ID',
						trigger: 'change'
					}],
					scheduledDays: [{
						required: true,
						message: '不能为空'
					}, {
						validator: checkAge,
						trigger: 'blur'
					}],
					effectiveDays: [{
						required: true,
						message: '不能为空'
					}, {
						validator: checkAge,
						trigger: 'blur'
					}],
					returnDays: [{
						required: true,
						message: '退票天数不能为空'
					}, {
						validator: checkAge,
						trigger: 'blur'
					}],
					useBeginTime: [{
						required: true,
						message: '开始时间不能为空'
					}],
					useEndTime: [{
						required: true,
						message: '结束时间不能为空'
					}],
					unitName: [{
						required: true,
						message: '单位不能为空'
					}]
				}
			}
		},
		computed:{
			//从vuex获取用户数据
			...mapState(["userId", "accussToken","typeID","classID"]),
		},
		components: {
			quillEditor
		},
		mounted() {
			
		},
		methods: {
			// 筛选变色
			showDate(val) {
				val = val + '';
				if ((val.indexOf(this.parkName) !== -1 && this.parkName !== '') || (val.indexOf(this.productName) !== -1 && this.productName !==
						'')) {
					if (this.parkName !== '') {
						return val.replace(this.parkName, '<font color="#409EFF">' + this.parkName + '</font>')
					} else if (this.productName !== '') {
						return val.replace(this.productName, '<font color="#409EFF">' + this.productName + '</font>')
					}
				} else {
					return val
				}
			},
			search(i, z, Prn, Pkn) { //列过滤
				this.Get();
			},
			handleSizeChange(val) {
				this.PageSize = val;
				this.Get();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.Get();
				console.log(`当前页: ${val}`);
			},
			logTimeChange1(val) { // 获取开始时间
				console.log(val)
				this.ruleForm.useBeginTime = val;
			},
			logTimeChange2(val) { // 获取结束时间
				console.log(val)
				this.ruleForm.useEndTime = val;
			},
			alertValue(e, strValue, decimalNum) { // vue-quill-editor设置长度限制的提示
				var realLength = 0,
					len = strValue.length,
					charCode = -1,
					matchWords = 0;
				for (var i = 0; i < len; i++) {
					charCode = strValue.charCodeAt(i);
					if (charCode >= 0 && charCode <= 128)
						realLength += 1;
					else
						realLength += 2;
				}
				if (realLength < decimalNum) {
					matchWords = strValue.trim().length;
				}
				if (realLength > decimalNum) {
					e.quill.deleteText(matchWords, 1, strValue); //保留 strValue 的 前 decimalNum 位字符
				}
			},
			GetList() { //拉取接口
				this.$axios.post("http://192.168.2.28:5009/cashinterface/pull").then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data;
						this.$message({
							message: `恭喜你，拉取到${this.count}条数据`,
							type: 'success'
						});
					} else {
						this.$message.errer(res.data.message);
						return;
					}
				}).catch(error => {
					console.log(error)
				})
			},
			SetRuleForm() { //载入弹框确认
				var that = this.rows;
				this.ruleForm.parkId = that.parkID; //景区ID
				this.ruleForm.parkName = that.parkName;
				this.ruleForm.productCode = that.productCode; //门票编码
				this.ruleForm.productName = that.productName; //产品名称

				this.ruleForm.originalPrice = that.productPrice; //4个价格
				this.ruleForm.returnPrice = that.productPrice;
				this.ruleForm.settlementPrice = that.productPrice;
				this.ruleForm.salePrice = that.productPrice;

				this.ruleForm.classId = that.productType == '00' ? 0 : '';
				this.ruleForm.typeId = that.isTheatre == '1' ? 6 : 0;

				this.parkName = '';
				this.productName = '';

				this.dialogVisible = false;
			},
			submitForm(formName) { // 提交表单
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm);
						this.$axios.post("http://192.168.2.38:5010/product/save", this.ruleForm, {
							headers: {
								'Content-type': 'application/json'
							}
						}).then(res => {
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

						console.log('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) { //重置表单
				this.ruleForm.parkID = "";
				this.ruleForm.productCode = "";
				this.ruleForm.parentId = "";
				this.ruleForm.pictureId = "";
				this.ruleForm.useContent = "";
				this.ruleForm.returnContent = "";
				// this.ruleForm.editContent = "";
				this.ruleForm.remark = "";
				this.ruleForm.useContentEnglish = "";
				this.ruleForm.returnContentEnglish = "";
				// this.ruleForm.editContentEnglish = "";
				this.ruleForm.remarkEnglisn = "";
				this.parkName = '';
				this.productName = '';
				this.imgs = "";
				this.ruleForm.subPictureId = "";
				this.$refs[formName].resetFields();
			},
			PictureIdz(files, fileList) {
				this.$message({
					message: "最多上传3个图片",
					type: 'warning'
				});
			},
			handleAvatarSuccess2(res, file) { //上传子图片
				console.log(file)
				var Zid = file.response.data.id;
				var subId = this.ruleForm.subPictureIdList;
				this.imgs = subId.length > 0 ? this.imgs + ',' + Zid : Zid;
				this.ruleForm.subPictureIdList = this.imgs;
				console.log(this.ruleForm.subPictureIdList)
			},
			handleAvatarSuccess3(res, file) { //上传图片
				this.ruleForm.pictureId = file.response.data.id;
				console.log(this.ruleForm.pictureId)
			},
			beforeAvatarUpload(file) { //上传图片大小限制
				const extension = file.name.split('.')[1] === 'jpg'
				const extension2 = file.name.split('.')[1] === 'gif'
				const extension3 = file.name.split('.')[1] === 'bmp'
				const extension4 = file.name.split('.')[1] === 'png'
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!extension && !extension2 && !extension3 && !extension4) {
					this.$message.error('上传照片只能是 jpg、gif、bmp、png 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return extension || extension2 || extension3 || extension4 && isLt2M
			},
			Get() { //获取表格数据
				let data = {
					pageNum: this.currentPage,
					pageSize: this.PageSize,
					productName: this.productName || '',
					parkName: this.parkName || ''
				}
				this.$axios.post("http://192.168.2.28:5009/cashinterface/unbind", this.StringDat(data)).then(res => {
					if (res.data.code == 200) {
						this.list = res.data.data.list;
						this.count = res.data.data.total;
						console.log(this.list);
					} else {
						this.$message.error(res.data.message);
						return;
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
		},
		watch: {
			dialogVisible(val) { //载入产品信息表
				if (val) {
					this.Get();
					setTimeout(() => {
						this.loading = false;
					}, 1000);
				} else {
					this.loading = true;
					this.parkName = '';
					this.productName = '';
				}
			}
		},
		created() {
			document.title = "新增产品";
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

	.tab .el-table th div.cell,
	.tab .el-table td div.cell {
		height: 40px;
		line-height: 40px;
	}

	.tab .el-table th div.el-input {
		padding-left: 0;
		padding-right: 0;
		// line-height: 28px;
	}
</style>
