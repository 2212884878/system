<template>
	<!-- 头部菜单 -->
	<section class="nav">
		<el-row class="header" :gutter="10">
			<el-col :span="22">
				<el-button type="text" @click="home">其他子系统</el-button>
				<el-button type="text" @click="center">个人中心</el-button>
				<el-button type="text" @click="dialogVisible = true">修改密码</el-button>
				<el-button type="text" @click="qite">注销</el-button>
			</el-col>
			<el-col :span="2">
				<el-button type="text" disabled class="name">你好，{{name}}</el-button>
			</el-col>
		</el-row>

		<el-dialog title="修改密码" :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
				<el-form-item label="密码" prop="password1">
					<el-input type="password" v-model="ruleForm.password1"></el-input>
				</el-form-item>

				<el-form-item label="确认密码" prop="password2">
					<el-input type="password" v-model="ruleForm.password2"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>

		</el-dialog>

	</section>

</template>

<script>
	export default {
		name: 'naver',
		props :{
			paths:{
				type:String,
				default: '/center'
			}
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password1) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				name: this.$store.state.userName || '管理员',
				dialogVisible: false,
				ruleForm: {
					password1: '',
					password2: ''
				},
				rules: {
					password1: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					password2: [{
						required: true,
						message: '请输入确认密码',
						trigger: 'blur'
					}, {
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		mounted() {

		},
		methods: {
			qite() {
				this.$store.commit("LOGOUT");
				this.$router.push('/');
			},
			home() {
				this.$router.push('/home');
			},
			center() {
				// console.log(this.paths)
				this.$router.push(this.paths);
			},
			handleClose() {
				this.dialogVisible = false;
				this.password1 = '';
				this.password2 = '';
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

						console.log('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.nav {
		width: 100%;

		.header {
			text-align: right;
			width: 100%;

			.name {
				color: #000;
			}
		}

	}
</style>
<style lang="scss">
	.nav {}
</style>
