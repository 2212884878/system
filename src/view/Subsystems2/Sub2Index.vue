<template>
	<div id="Sub1Index">
		<el-container>
			<!--導航-->
		  <el-aside width="200px">
		  	<div class="loge">VUEADMIN</div>
		  	<!--
              	作者：lixiaoyi
              	时间：2018-11-19
              	描述：菜單
             -->
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
				 unique-opened router v-show="!collapsed">
				<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
					<el-submenu :index="index+''" v-if="!item.leaf">
						<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
						<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
				</template>
			</el-menu>
		  	
		  	
		  </el-aside>
		  <el-container>
		    <el-header>你好，黎孝義<span class="logout" @click="qite">退出登录</span></el-header>
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
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
		    	
		    </el-main>
		    <el-footer>版權信息</el-footer>
		  </el-container>
		</el-container>
		
	</div>
</template>

<script>
	import TagsView from "@/components/TagsView.vue";
	export default {
		data() {
			return {
				items: [],
				collapsed:false,
				height:0
			}
		},
		components: {
			TagsView
		},
		mounted() {
//			this.getNav();
this.height = document.documentElement.clientHeight - 120;
		},
		methods: {
			qite() {
				this.$store.commit("LOGOUT");
				this.$router.push('/');
			},
			handleopen(key, keyPath) {
	        	console.log(key, keyPath);
	        },
	        handleclose(key, keyPath) {
	        	console.log(key, keyPath);
	        },
	        handleselect(a, b) {
			},
	        //獲取導航菜單
	        getNav() {
	        	this.$http.get("../../static/Index.json").then((res) => {
	        		console.log(res);
	        		if(res.status === 200){
	        			this.items = res.data.nva;
	        		}else{
	        			this.items = [];
	        			this.$message.error("獲取導航菜單失敗");
	        		}
	        	})
	        }
		}
	}
</script>

<style scoped lang="scss">
	span.logout{
		display: block;
		float: right;
		margin-right: 20px;
		cursor: pointer;
		&:hover{
			color: #66B1FF;
		}
	}
	.breadcrumb-container{
		.title{
			width: 200px;
		    float: left;
		    color: #475669;
		}
		.breadcrumb-inner{
			float: right;
		}
		
	}
	.el-aside .loge{
		height: 60px;
		line-height: 60px;
	    font-size: 22px;
	    padding-left: 20px;
	    padding-right: 20px;
	    border-bottom: 1px solid #B3C0D1;
	}
	.mb10{
		margin-bottom: 10px;
	}
	.pt0{
		padding-top: 0;
	}
</style>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #Sub1Index .el-menu{
  	background: #D3DCE6;
  }
  #Sub1Index .el-menu.el-menu--inline{
  	background: #fff;
  }
</style>