<template>
	<div class="bg-home">
		<div class="bg-home-color">
			<div class="containers">
				<ul>
					<!-- <li v-for="item in list">
						<router-link :to="{path:'/Sub1Index'}"><img :src="item.picPath" :alt="item.systemname"/><p>{{item.systemname}}</p></router-link>
					</li> -->
					<li><router-link :to="{path:'/SubIndex',query:{name:'票务管理子系统'}}"><img src="../../assets/active-bg1.png"/><p>票务管理子系统</p></router-link></li>
					<li><router-link :to="{path:'/home'}"><img src="../../assets/active-bg1.png"/><p>微信管理子系统</p></router-link></li>
					<li><router-link :to="{path:'/home'}"><img src="../../assets/active-bg1.png"/><p>APP管理子系统</p></router-link></li>
					<li><router-link :to="{path:'/home'}"><img src="../../assets/active-bg1.png"/><p>用户管理子系统</p></router-link></li>
					<li><router-link :to="{path:'/home'}"><img src="../../assets/active-bg1.png"/><p>报表子管理</p></router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			//系统菜单
			GetFindSystemNameAll() {
				this.$axios.get("http://192.168.2.29:2520/systemName/findSystemNameAll").then(res => {
					if(res.data.code === 200) {
						this.list = res.data.data;
					}else{
						this.$message.error("加载数据出错");
						this.$store.commit("LOGOUT");
					}
				})
			}
		},
		created() {
			// this.GetFindSystemNameAll();
		},
		mounted() {
			this.$store.dispatch('delAllViews');
		}
	}
</script>

<style lang="scss" scoped>
	.containers {
		width: 1200px;
		margin: 0 auto;
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
	
	.bg-home {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
		.bg-home-color{
			width: 100%;
			padding: 20px 0;
			float: left;
			clear: both;
			background: #66B1FF;
			margin-top: 250px;
			position: relative;
			li{
				width: 300px;
				float: left;
				text-align: center;
				margin-bottom: 10px;
				img{
					width: 147px;
					height: 167px;
					display: inline-block;
					transition: all 1s;
					&:hover{
						transform: rotateY(360deg);
					}
				}
				p{
					height: 24px;
					line-height: 24px;
					font-size: 14px;
					color: #000;
				}
			}
			&:before,&:after{
				content: "";
				width: 600px;
				height: 40px;
				background: #F37B3A;
				display: block;
				position: absolute;
				left: 50%;
				margin-left: -300px;
			}
			&:before{
				top: -40px;
			}
			&:after{
				bottom: -40px;
			}
		}
	}
</style>