<template>
	<section>
		<el-col :span="24" class="table-top">
			<el-table :data="tableData3" height="500" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%" show-summary stripe size="mini">
				<el-table-column type="index" label="序號" width="60" align="center">
				</el-table-column>
				<el-table-column type="selection" width="60" align="center">
				</el-table-column>
				<el-table-column prop="date" label="日期" width="150" sortable>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="150">
				</el-table-column>
				<el-table-column prop="momey" label="金额" width="100" sortable>
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button round size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button round type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		
	
			<el-col class="page" :span="24">
				<el-pagination layout="prev, pager, next" :total="50" style="float:right;">
				</el-pagination>
			</el-col>
		</el-col>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				listLoading: false,
				sels: [],//列表选中列
				tableData3: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 140
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 240
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 340
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					momey: 40
				}]
			}
		},
		computed: {
			total(){
				let list = this.tableData3;
				var count = 0;
				list.forEach((v,k) => {
					count += v.momey;
				})
				return count;
			}
		},
		methods: {
			selsChange(sels) {
				this.sels = sels;
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDel(index, row) {
				console.log(index, row);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		background: #D3DCE6;
	    padding: 10px;
	    margin: 10px 0;
	}
	.total{
		width: 100%;
		background: #fff;
		height: 48px;
		line-height: 48px;
		text-align: center;
		span{
			color: red;
		}
	}
</style>