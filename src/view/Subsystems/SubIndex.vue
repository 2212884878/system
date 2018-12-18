<template>
	<!--
    	作者：lixiaoyi
    	时间：2018-12-12
    	描述：票务管理子系统
    -->
	<div id="Sub1Index">
		<el-container>
			<!--导航-->
			<el-aside width="200px">
				<div class="loge">{{systemName}}</div>
				<!--
              	作者：lixiaoyi
              	时间：2018-11-19
              	描述：菜单
             -->
				<el-menu :show-timeout="200" :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleopen"
				 @close="handleclose" @select="handleselect" unique-opened router>
					<template v-for="(item,index) in NewList">
						<el-submenu :index="index+''">
							<template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
							<el-menu-item v-for="child in item[0]" :index="child.url" :key="child.url"><i class="el-icon-setting"></i>{{child.text}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>

			</el-aside>
			<el-container>
				<el-header>
					<!--你好，黎孝義<span class="logout" @click="qite">退出登录</span>-->
					<navs></navs>
				</el-header>
				<el-main class="pt0" :style="{height: height + 'px'}">
					<!--
                	作者：lixiaoyi
                	时间：2018-11-19
                	描述：主體
                -->
					<section class="content-container">
						<div class="grid-content bg-purple-light">
							<el-col :span="24" class="breadcrumb-container">
								<!--标签导航-->
								<tags-view class="mb10"></tags-view>
							</el-col>
							<el-col :span="24" class="content-wrapper">
								<!-- {{NewList}} -->
								<transition name="slide-fade" mode="out-in">
									<router-view></router-view>
								</transition>
							</el-col>
						</div>
					</section>
				</el-main>
				<el-footer>版权信息</el-footer>
			</el-container>
		</el-container>

	</div>
</template>

<script>
	import TagsView from "@/components/TagsView.vue";
	import navs from "@/components/naver.vue";
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				items: [],
				height: 0,
				systemName: ''
			}
		},
		components: {
			TagsView,
			navs
		},
		computed: {
			//从vuex获取用户数据
			...mapState(["userId", "accussToken"]),
			NewList() { //处理返回导航数据
				var oldArr = this.items;
				let newArr = [],
					tempArr = [],
					list = [];
				oldArr.push({})
				for (let i = 0; i < oldArr.length - 1; i++) {
					if (oldArr[i].grouptext === oldArr[i + 1].grouptext) {
						tempArr.push(oldArr[i]);
					} else {
						tempArr.push(oldArr[i]);
						newArr.push(tempArr.slice(0));
						tempArr.length = 0;
					}
				}
				newArr.forEach((v, k) => {
					list[k] = Array(v);
					list[k]['title'] = v[0].grouptext;
				})
				console.log(list)
				return list;
			},
			defaultActive() {
				if (this.$route.path.split('/').reverse().length == 3) {
					var u = this.$route.path.split('/').reverse();

					return `/${u[1]}/${u[0]}`;
				}
				return '/' + this.$route.path.split('/').reverse()[0];
			}
		},
		mounted() {
			if (sessionStorage.getItem("systemName") == 'undefined' || sessionStorage.getItem("systemName") == null ||
				sessionStorage.getItem("systemName") == "") {
				sessionStorage.setItem("systemName", this.$route.query.name);
			}

			this.systemName = sessionStorage.getItem("systemName");
			this.height = document.documentElement.clientHeight - 120;
			const that = this;
			window.onresize = function temp() {
				that.height = document.documentElement.clientHeight - 120;
			};

			this.getNav();
			this.$store.dispatch('SetTypeID')
			this.$store.dispatch('SetClassID')
			this.$store.dispatch('SetDayType')
		},
		methods: {

			handleopen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleclose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleselect(a, b) {
				// console.log(a, b);
			},
			getNav() {
				if (this.userId && this.systemName) { //获取导航菜单
					let data = {
						userId: this.userId,
						systemName: this.systemName
					}
					this.$axios.get("http://192.168.2.29:2080/theMenu/findNav", {
						params: data
					}).then((res) => {
						if (res.data.code === 200) {
							this.items = res.data.data;
						} else {
							this.$message.error("出错");
							return;
						}
					}).catch(error => {
						console.log(error)
					})
				} else {
					this.$message.error("没登录");
				}
			}
		},

	}
</script>

<style scoped lang="scss">
	span.logout {
		display: block;
		float: right;
		margin-right: 20px;
		cursor: pointer;

	}

	.breadcrumb-container {
		.title {
			width: 200px;
			float: left;
			color: #475669;
		}

		.breadcrumb-inner {
			float: right;
		}
	}

	.el-aside .loge {
		height: 60px;
		line-height: 60px;
		font-size: 22px;
		padding-left: 20px;
		padding-right: 20px;
		border-bottom: 1px solid #B3C0D1;
		color: #FFFFFF;
	}

	.mb10 {
		margin-bottom: 10px;
	}

	.pt0 {
		padding: 0;
		background: #eee;
	}
</style>
<style lang="scss">
	#Sub1Index {

		.el-header,
		.el-footer {
			background-color: #fff;
			color: #000;
			border-bottom: 1px solid #e6e6e6;
			text-align: center;
			line-height: 60px;
		}

		.el-footer {
			border-top: 1px solid #e6e6e6;
		}

		.el-aside {
			background: #545c64;
			color: #333;
			text-align: center;
			line-height: 200px;
		}

		.el-main {
			background-color: #eee;
			color: #333;
		}

		body>.el-container {
			margin-bottom: 40px;
		}

		.el-container:nth-child(5) .el-aside,
		.el-container:nth-child(6) .el-aside {
			line-height: 260px;
		}

		.el-container:nth-child(7) .el-aside {
			line-height: 320px;
		}

		#Sub1Index .el-menu {
			background: #D3DCE6;
		}

		#Sub1Index .el-menu.el-menu--inline {
			background: #fff;
		}

		.el-submenu__title {
			text-align: left;
		}
	}
</style>
