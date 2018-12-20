<template>
	<!--
		作者：lixiaoyi
		时间：2018-12-16
		描述：个人中心
	-->
	<div class="newPr conter" id="conter">
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
				<el-card shadow="hover">
					<el-form>
						<el-form-item label="姓名:">
							{{$store.state.userName}}
						</el-form-item>
						<el-form-item label="手机号码:">
							10010
						</el-form-item>
						
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false
        };
    },
    components: {},
    computed: {},
    mounted() {},
    methods: {
        GetList() {}
    }
};
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped">
</style>
<style lang="scss" scoped="scoped">
</style>
