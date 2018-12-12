<template>
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
					<el-form-item label="产品名称" prop="productName" v-if="status == 'edit'">
						<el-input v-model="ruleForm.productName"></el-input>
					</el-form-item>
					<el-form-item label="产品名称" prop="productName" v-else>
						<el-input v-model="ruleForm.productName" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品名称英文名" prop="productNameEnglish" v-if="status == 'edit'">
						<el-input v-model="ruleForm.productNameEnglish"></el-input>
					</el-form-item>
					<el-form-item label="产品名称英文名" prop="productNameEnglish" v-else>
						<el-input v-model="ruleForm.productNameEnglish" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>



			<!-- 产品类型 -->
			<el-row :gutter="20" class="w400">
				<el-col :span="12">
					<el-form-item label="产品类型" prop="classId" style="width: 100%;" v-if="status == 'edit'">
						<el-select v-model="ruleForm.classId" placeholder="请选择产品类型">
							<template v-for="item in json">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="产品类型" prop="classId" style="width: 100%;" v-else>
						<el-select v-model="ruleForm.classId" placeholder="请选择产品类型" disabled>
							<template v-for="item in json">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品分类" prop="typeId" v-if="status == 'edit'">
						<el-select v-model="ruleForm.typeId" placeholder="请选择产品分类">
							<template v-for="item in json2">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="产品分类" prop="typeId" v-else>
						<el-select v-model="ruleForm.typeId" placeholder="请选择产品分类" disabled>
							<template v-for="item in json2">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- 图片 -->
			<!-- <el-form-item label="图片资料ID" prop="pictureId">
				<el-input v-model="ruleForm.pictureId" disabled></el-input>
				<el-upload class="avatar-uploader" :action="importFileUrl" :show-file-list="false" :on-success="handleAvatarSuccess3"
				 :before-upload="beforeAvatarUpload" v-if="status == 'edit'">
					<i class="el-icon-circle-plus">上传图片</i>
				</el-upload>
			</el-form-item> -->

			<!-- 子图片Id -->
			<!-- <el-form-item label="子图片ID">
				<el-input v-model="imgs" disabled></el-input>
				<el-upload class="avatar-uploader" :action="importFileUrl" :show-file-list="false" :on-success="handleAvatarSuccess2"
				 :before-upload="beforeAvatarUpload" :limit="3" :on-exceed="PictureIdz" multiple v-if="status == 'edit'">
					<i class="el-icon-circle-plus">上传图片</i>
				</el-upload>
			</el-form-item> -->

			<!-- 价格 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="原价" prop="originalPrice" v-if="status == 'edit'">
						<el-input v-model="ruleForm.originalPrice" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="原价" prop="originalPrice" v-else>
						<el-input v-model="ruleForm.originalPrice" maxlength="18" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="退票价格" prop="returnPrice" v-if="status == 'edit'">
						<el-input v-model="ruleForm.returnPrice" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="退票价格" prop="returnPrice" v-else>
						<el-input v-model="ruleForm.returnPrice" maxlength="18" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="结算价格" prop="settlementPrice" v-if="status == 'edit'">
						<el-input v-model="ruleForm.settlementPrice" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="结算价格" prop="settlementPrice" v-else>
						<el-input v-model="ruleForm.settlementPrice" maxlength="18" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="销售价格" prop="salePrice" v-if="status == 'edit'">
						<el-input v-model="ruleForm.salePrice" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="销售价格" prop="salePrice" v-else>
						<el-input v-model="ruleForm.salePrice" maxlength="18" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>



			<!-- 天数 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="预订天数" prop="scheduledDays" v-if="status == 'edit'">
						<el-input v-model="ruleForm.scheduledDays"></el-input>
					</el-form-item>
					<el-form-item label="预订天数" prop="scheduledDays" v-else>
						<el-input v-model="ruleForm.scheduledDays" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="使用最后有效天数" prop="effectiveDays" v-if="status == 'edit'">
						<el-input v-model="ruleForm.effectiveDays"></el-input>
					</el-form-item>
					<el-form-item label="使用最后有效天数" prop="effectiveDays" v-else>
						<el-input v-model="ruleForm.effectiveDays" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="退票天数限制" prop="returnDays" v-if="status == 'edit'">
						<el-input v-model="ruleForm.returnDays"></el-input>
					</el-form-item>
					<el-form-item label="退票天数限制" prop="returnDays" v-else>
						<el-input v-model="ruleForm.returnDays" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="单位(张)" prop="unitName" v-if="status == 'edit'">
						<el-input v-model="ruleForm.unitName"></el-input>
					</el-form-item>
					<el-form-item label="单位(张)" prop="unitName" v-else>
						<el-input v-model="ruleForm.unitName" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>


			<!-- 时间 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="使用开始时间" required>
						<el-form-item prop="useBeginTime" v-if="status == 'edit'">
							<el-time-picker arrow-control v-model="ruleForm.useBeginTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="开始时间" @change="logTimeChange1">
							</el-time-picker>
						</el-form-item>

						<el-form-item prop="useBeginTime" v-else>
							<el-time-picker arrow-control v-model="ruleForm.useBeginTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="开始时间" @change="logTimeChange1" disabled>
							</el-time-picker>
						</el-form-item>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="使用结束时间" required>
						<el-form-item prop="useEndTime" v-if="status == 'edit'">
							<el-time-picker arrow-control v-model="ruleForm.useEndTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="结束时间" @change="logTimeChange2">
							</el-time-picker>
						</el-form-item>

						<el-form-item prop="useEndTime" v-else>
							<el-time-picker arrow-control v-model="ruleForm.useEndTime" :picker-options="{selectableRange: '06:00:00 - 20:00:00'}"
							 format="HH:mm:ss" value-format="HH:mm:ss" placeholder="结束时间" @change="logTimeChange2" disabled>
							</el-time-picker>
						</el-form-item>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 是否允许自提或邮寄 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="手机号最多可购张数" prop="effectiveDays" v-if="status == 'edit'">
						<el-input v-model="ruleForm.commitCount"></el-input>
					</el-form-item>

					<el-form-item label="手机号最多可购张数" prop="effectiveDays" v-else>
						<el-input v-model="ruleForm.commitCount" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否允许自提或邮寄">
						<el-checkbox-group v-model="ruleForm.saleType" v-if="status == 'edit'">
							<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>

						<el-checkbox-group v-model="ruleForm.saleType" v-else>
							<el-checkbox label="是" name="saleType" :true-label="1" :false-label="0" disabled></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否允许退票" prop="returnSign">
						<el-checkbox-group v-model="ruleForm.returnSign" v-if="status == 'edit'">
							<el-checkbox label="是" name="returnSign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="ruleForm.returnSign" v-else>
							<el-checkbox label="是" name="returnSign" :true-label="1" :false-label="0" disabled></el-checkbox>
						</el-checkbox-group>
					</el-form-item>

				</el-col>
				<el-col :span="12">
					<el-form-item label="是否允许重复进出" prop="repeatUseSign">
						<el-checkbox-group v-model="ruleForm.repeatUseSign" v-if="status == 'edit'">
							<el-checkbox label="是" name="repeatUseSign" :true-label="1" :false-label="0"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="ruleForm.repeatUseSign" v-else>
							<el-checkbox label="是" name="repeatUseSign" :true-label="1" :false-label="0" disabled></el-checkbox>
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
								<quill-editor ref="UseContent" v-model="ruleForm.useContent" :options="editorOption" @change="alertValue($event,ruleForm.useContent,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="退款说明" name="second">
							<el-form-item label="退款说明" class="lhn">
								<quill-editor ref="returnContent" v-model="ruleForm.returnContent" :options="editorOption" @change="alertValue($event,ruleForm.returnContent,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<!-- <el-tab-pane label="改签说明" name="third">
							<el-form-item label="改签说明" class="lhn">
								<quill-editor ref="editContent" v-model="ruleForm.editContent" :options="editorOption" @change="alertValue($event,ruleForm.editContent,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane> -->
						<el-tab-pane label="备注" name="fourth">
							<el-form-item label="备注" class="lhn">
								<quill-editor ref="remark" v-model="ruleForm.remark" :options="editorOption" @change="alertValue($event,ruleForm.remark,2000)"
								 @ready="onEditorReady($event)">
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
								<quill-editor ref="useContentEnglish" v-model="ruleForm.useContentEnglish" :options="editorOption" @change="alertValue($event,ruleForm.useContentEnglish,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="Refund instructions" name="second">
							<el-form-item label="Refund instructions" class="lhn">
								<quill-editor ref="returnContentEnglish" v-model="ruleForm.returnContentEnglish" :options="editorOption"
								 @change="alertValue($event,ruleForm.returnContentEnglish,2000)" @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
						<!-- <el-tab-pane label="Endorsed to illustrate" name="third">
							<el-form-item label="Endorsed to illustrate" class="lhn">
								<quill-editor ref="editContentEnglish" v-model="ruleForm.editContentEnglish" :options="editorOption" @change="alertValue($event,ruleForm.editContentEnglish,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane> -->
						<el-tab-pane label="note" name="fourth">
							<el-form-item label="note" class="lhn">
								<quill-editor ref="remarkEnglisn" v-model="ruleForm.remarkEnglisn" :options="editorOption" @change="alertValue($event,ruleForm.remarkEnglisn,2000)"
								 @ready="onEditorReady($event)">
								</quill-editor>
							</el-form-item>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>

			<el-form-item>
				<template v-if="status == 'edit'">
					<el-button type="primary" @click="submitFormEdit('ruleForm')">保存修改</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</template>
				<template v-else>
					<el-button type="primary" @click="submitFormDel(id)">产品下架</el-button>
				</template>

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
				id: this.$route.query.id, //产品ID
				status: this.$route.query.status, //修改标识
				loading: false,
				activeName: 'first', //下面说明tab切换标识
				activeName2: 'first',
				json: '', //下拉select json
				json2: '',
				importFileUrl: 'http://192.168.2.34:2600/staticResource/uploadFile', //上传图片地址
				editorOption: { //富文本编辑器
					modules: {
						toolbar: toolcontext
					},
					placeholder: '最多输入2000字节'
				},
				imgs: '',
				list: [],
				ruleForm: { //表单
					id:this.$route.query.id,
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
					// pictureId: '',
					scheduledDays: 30,
					effectiveDays: 1,
					returnSign: 0,
					returnDays: 3,
					useBeginTime: '09:00:00',
					useEndTime: '18:00:00',
					repeatUseSign: 0,
					unitName: '1',
					useContent: "",
					returnContent: "",
					// editContent: "",
					remark: "",
					useContentEnglish: "",
					returnContentEnglish: "",
					// editContentEnglish: "",
					remarkEnglisn: "",
					saleType: 0,
					commitCount: 2000,
					// subPictureIdList: '' //子图片ID
				},
				rules: {
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
// 					pictureId: [{
// 						required: true,
// 						message: '请输入图片资料ID',
// 						trigger: 'change'
// 					}],
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
			};
		},
		components: {
			quillEditor
		},
		methods: {
			go() {//返回
				if(this.status === 'edit') {
					this.$router.push({path:'/editProduct'})
				}else if(this.status === 'del') {
					this.$router.push({path:'/delProduct'})
				}
			},
			onEditorReady(editor) { //富文本禁用
				this.status == 'del' ? editor.enable(false) : '';
			},
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
			logTimeChange1(val) {// 时间
				console.log(val)
				this.ruleForm.useBeginTime = val;
			},
			logTimeChange2(val) {
				console.log(val)
				this.ruleForm.useEndTime = val;
			},
			alertValue(e, strValue, decimalNum) {// vue-quill-editor设置长度限制的提示
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
			submitFormEdit(formName) { // 产品修改
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm);
						this.$axios.put("http://192.168.2.38:5010/product/update", this.ruleForm).then(res => {
							if (res.data.code == 200) {
								this.$message({
									message: res.data.message,
									type: 'success'
								});
								this.$router.push("/editProduct");
							} else {
								this.$message({
									message: res.data.message,
									type: 'warning'
								});
							}
						}).catch(error => {
							console.log(error)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitFormDel(id) { //删除产品（下架）
				console.log(id)
				this.$axios.delete("http://192.168.2.38:5010/product/delete/" + id).then(res => {
					if (res.data.code == 200) {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.$router.push({path:'/delProduct'})
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					console.log(error)
				})
			},
			GetFinnd() { //根据产品ID查询
				this.$axios.get("http://192.168.2.38:5010/product/finnd/" + this.id).then(res => {
					if (res.data.code == 200) {
						this.list = res.data.data;
						this.setFrom();
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(error => {
					console.log(error)
				})
			},
			setFrom() { //赋值查询出来的数据
				var list = this.list;
				this.ruleForm.parkId=list.parkId
				this.ruleForm.parkName=list.parkName
				this.ruleForm.productCode=list.productCode
				this.ruleForm.productName=list.productName
				this.ruleForm.productNameEnglish=list.productNameEnglish
				this.ruleForm.classId=list.classId
				this.ruleForm.originalPrice=list.originalPrice
				this.ruleForm.returnPrice=list.returnPrice
				this.ruleForm.settlementPrice=list.settlementPrice
				this.ruleForm.salePrice=list.salePrice
				this.ruleForm.typeId=list.typeId
				// this.ruleForm.pictureId=list.pictureId
				this.ruleForm.scheduledDays=list.scheduledDays
				this.ruleForm.effectiveDays=list.effectiveDays
				this.ruleForm.returnSign=list.returnSign
				this.ruleForm.returnDays=list.returnDays
				this.ruleForm.useBeginTime=list.useBeginTime
				this.ruleForm.useEndTime=list.useEndTime
				this.ruleForm.repeatUseSign=list.repeatUseSign
				this.ruleForm.unitName=list.unitName
				this.ruleForm.useContent=list.useContent
				this.ruleForm.returnContent=list.returnContent
				// this.ruleForm.editContent=list.editContent
				this.ruleForm.remark=list.remark
				this.ruleForm.useContentEnglish=list.useContentEnglish
				this.ruleForm.returnContentEnglish=list.returnContentEnglish
				// this.ruleForm.editContentEnglish=list.editContentEnglish
				this.ruleForm.remarkEnglisn=list.remarkEnglisn
				this.ruleForm.saleType=list.saleType
				this.ruleForm.commitCount=list.commitCount
				// this.ruleForm.subPictureIdList=list.subPictureIdList
			}
		},
		mounted() {
			this.getGoodsList();
			this.getGoodsList2();
			this.GetFinnd();
			console.log(`状态:${this.status} ID:${this.id}`)
		},
		created() {
			document.title = "产品详情";
		},
		watch: {

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
