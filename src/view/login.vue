<template>
	<div>
		<div class="header">
			<div class="container">
				<div class="loge"><img src="../assets/mine-logo.png" /></div>
			</div>
		</div>
		<div class="container">
			<div class="car">
				<el-carousel indicator-position="outside">
					<el-carousel-item v-for="item in 4" :key="item">
						<img src="http://t2.hddhhn.com/uploads/tu/201811/9999/e42daa022d.jpg" />
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="r-info">
				<div class="title">登 陆</div>
				<div class="login-input">
					<span>姓    名：</span>
					<el-input v-model="token" placeholder="请输入姓名"></el-input>
				</div>
				<div class="login-input">
					<span>密    码：</span>
					<el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
				</div>
				<movebox></movebox>
				<div class="tip" v-if="showTip">{{tip}}</div>
				<div class="primary-button" @click="getLogin">
					登陆
				</div>
			</div>
		</div>

	</div>

</template>
<script>
	import movebox from "@/components/movebox";
	export default {
		components: {
			movebox
		},
		data() {
			return {
				token: '',
				password: '',
				tip: '',
				showTip: false
			}
		},
		created() {

		},
		methods: {
			getLogin() {
				if(sessionStorage.getItem("move")) {
					if(!this.token) {
						this.$message.error("请填姓名");
						return;
					} else if(!this.password) {
						this.$message.error("请填密码");
						return;
					}
					// 条件
					let data = {
						userName: this.token,
						userPwd: this.password
					}
					
					this.$axios.post('http://192.168.2.29:2060/user/isLogIn',this.StringDat(data)).then((res) => {
						var data = res.data.data;
						if(res.data.code === 200) {
							this.$store.commit("SAVE_TOKEN", data.accussToken);  
							this.$store.commit("SAVE_USERID", data.userId);
							this.$store.commit("SAVE_USERNAME", data.name);
							let redirect = decodeURIComponent(this.$route.query.redirect || "/home");
							console.log(redirect)
							this.$router.push({
								path: redirect
							});
							sessionStorage.removeItem("move")
						} else {
							this.tip = res.data.message;
							this.showTip = true;
						}
					})

				} else {
					this.$message.error("请先验证通过");
					return;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		width: 1200px;
		margin: 0 auto;
	}
	
	.header {
		width: 100%;
		padding: 30px 0;
		height: 90px;
		background: #0764E9;
		line-height: 30px;
		clear: both;
		.loge {
			float: left;
			width: 105px;
			height: 30px;
			img {
				width: 100%;
			}
		}
	}
	.car{
		img{
			width: 100%;
			// height: 100%;
			display: inline-block;
		}
	}
	
	.car,
	.r-info {
		width: 500px;
		margin-top: 20px;
		padding: 24px;
		border: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
		float: left;
	}
	
	.r-info {
		width: 400px;
		min-height: 376px;
		float: right;
		padding: 24px;
		.title {
			font-size: 20px;
			text-align: center;
			width: 100%;
			margin-bottom: 20px;
			font-weight: bold;
			color: #0764E9;
		}
		.login-input {
			margin-bottom: 10px;
			span {
				display: block;
				width: 100%;
				font-size: 14px;
				margin-bottom: 10px;
			}
		}
		div.movebox {
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.primary-button {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #fff;
			background: #409eff;
			border-radius: 5px;
			cursor: pointer;
			&:hover {
				background: #66b1ff;
			}
		}
		.tip {
			color: red;
			font-size: 12px;
			text-align: center;
			width: 100%;
			margin-bottom: 10px;
		}
	}
</style>