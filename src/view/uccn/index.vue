<template>
	<!--
		作者：lixiaoyi
		时间：2018-12-19
		描述：官网管理子系统首页
	-->
	<div class="newPr" id="index">
		<el-row class="borderm2">
			<el-col :span="20">
				<h4>官网管理</h4>
			</el-col>
			<el-col :span="4" class="text-alginr">
				<el-button type="primary" icon="el-icon-edit" size="mini">我要留言</el-button>
			</el-col>
		</el-row>

		<div class="new-button">
			<el-button size="small" type="primary" @click="insert" class="mb10" v-if="status">新增</el-button>
			<el-button size="small" type="primary" @click="save" class="mb10" v-if="!status">保存</el-button>
			<el-input placeholder="请输入页面标识名称" v-model="ruleForm.sname" class="sname">
				<template slot="prepend">名称</template>
			</el-input>
		</div>

		<el-card class="box-card mb10">
			<div slot="header" class="clearfix">
				<span>主体内容</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>

			<!-- 富文本上传图片 element-ui控件 -->
			<el-upload class="avatar-uploaders" :action="importFileUrl" :show-file-list="false" :on-success="handleSuccess"
			 :format="['jpg','jpeg','png','gif']" :max-size="2048" multiple v-show="true">
				<button icon="ios-cloud-upload-outline"></button>
			</el-upload>

			<div class="text item">
				<el-form label-width="150px" ref="from1" class="demo-ruleForm">
					<el-form-item label="头部">
						<quill-editor v-model="ruleForm.content0" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容一">
						<quill-editor v-model="ruleForm.content1" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容二">
						<quill-editor v-model="ruleForm.content2" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容三">
						<quill-editor v-model="ruleForm.content3" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容四">
						<quill-editor v-model="ruleForm.content4" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容五">
						<quill-editor v-model="ruleForm.content5" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容六">
						<quill-editor v-model="ruleForm.content6" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容七">
						<quill-editor v-model="ruleForm.content7" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容八">
						<quill-editor v-model="ruleForm.content8" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="页面内容九">
						<quill-editor v-model="ruleForm.content9" :options="editorOption" @focus="_vueQuill($event)">
						</quill-editor>
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>页面轮播图</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>
			<div class="text item">
				<el-form label-width="150px" ref="from2" class="demo-ruleForm">
					<template v-for="(item,key) in ruleForm.pictures">
						<el-form-item label="图片">
							<el-input placeholder="请上传图片" v-model="item.imgID" disabled>
								<template slot="append">
									<el-upload :action="importFileUrl" :show-file-list="false" :on-success="(res) => { return handleSuccesss(res,key)} "
									:format="['jpg','jpeg','png','gif']" :max-size="2048" multiple>
										<i class="el-icon-circle-plus">上传图片</i>
									</el-upload>
								</template>
							</el-input>
						</el-form-item>
					</template>
				</el-form>
			</div>
		</el-card>

	</div>
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
	import {
		GetImages
	} from '@/utils/quill'
	export default {
		data() {
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
				['clean'],
				['image','video']
			];
			return {
				importFileUrl: 'http://101.201.101.138:2600/staticResource-mucon/uploadFile', //上传图片地址
				status:false,
				loading: false,
				vuequillref: '', //富文本ref标识
				editorOption: { //富文本编辑器
					modules: {
						toolbar: {
							container: toolcontext, // 工具栏
							handlers: {
								'image': function(value) {
									if (value) {
										// alert('自定义图片')
										document.querySelector('.avatar-uploaders input').click()
									} else {
										this.quill.format('image', false);
									}
								},
								'video':(value) => {
									console.log(value)
								}
							}
						}
					},
					placeholder: '请输入内容'
				},
				ruleForm: {
					id:this.$route.params.id,
					sname: '',
					content0: '',
					content1: '',
					content2: '',
					content3: '',
					content4: '',
					content5: '',
					content6: '',
					content7: '',
					content8: '',
					content9: '',
					pictures: [{
						imgID: ''
					}, {
						imgID:''
					}, {
						imgID:''
					}, {
						imgID:''
					}, {
						imgID:''
					}, {
						imgID:''
					}]
				}
			}
		},
		created() {
			document.title = "官网子系统首页";
		},
		components: {
			quillEditor
		},
		computed: {
			
		},
		mounted() {
			// console.log(this.ruleForm.pic[0].key)
			this.id = this.$route.params.id;
			this.find();
		},
		methods: {
			handleSuccesss(res, obj) { //上传图片
				this.ruleForm.pictures[obj].imgID = res.data.id;
			},
			_vueQuill(str) {
				this.vuequillref = str;
			},
			handleSuccess(res) { //富文本上传图片
				// 获取富文本组件实例
				let quill = this.vuequillref;
				// 如果上传成功
				if (res.code == 200) {
					// 获取光标所在位置
					let length = quill.getSelection().index;
					this.$axios.get("http://101.201.101.138:2600/staticResource-mucon/selectFileById?id=" + res.data.id).then(res => { //获取图片地址
						if (res.data.code == 200) {
							// 插入图片，res为服务器返回的图片链接地址
							quill.insertEmbed(length, 'image', GetImages(res.data.data.fileName))
							// 调整光标到最后
							quill.setSelection(length + 1)
						}
					})
				} else {
					// 提示信息，需引入Message
					this.$message.error('图片插入失败')
				}
			},
			save() {//修改
				console.log(this.ruleForm);
				this.$axios.post("http://192.168.2.28:2679/pagecontent-mucon/secondary/update",this.ruleForm).then(res => {
					if(res.data.code === 200) {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.find();
					}else{
						this.$message.error(res.data.message);
					}
				})

			},
			insert() {//新增
				this.$axios.post("http://192.168.2.28:2679/pagecontent-mucon/secondary/save",this.ruleForm).then(res => {
					if(res.data.code === 200) {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.find();
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			find(){//根据ID查询
				this.$axios.post("http://192.168.2.28:2679/pagecontent-mucon/secondary/get",this.StringDat({id:this.id})).then(res => {
					if(res.data.code === 200) {
						let data = res.data.data;
						if(data){
							this.status = false;
							this.SetObject(data);
						}else{
							this.status = true;
						}
						
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			SetObject(data = '') {//设置表单值
				this.ruleForm.sname = data.sname;
				this.ruleForm.content0 = data.content0 || '';
				this.ruleForm.content1 = data.content1 || '';
				this.ruleForm.content2 = data.content2 || '';
				this.ruleForm.content3 = data.content3 || '';
				this.ruleForm.content4 = data.content4 || '';
				this.ruleForm.content5 = data.content5 || '';
				this.ruleForm.content6 = data.content6 || '';
				this.ruleForm.content7 = data.content7 || '';
				this.ruleForm.content8 = data.content8 || '';
				this.ruleForm.content9 = data.content9 || '';
				if(data){
					for (let i = 0; i < 6; i++) {
						this.ruleForm.pictures[i].imgID = data.pictures[i].imgID  || '';
					}
				}else{
					for (let i = 0; i < 6; i++) {
						this.ruleForm.pictures[i].imgID = '';
					}
				}
				console.log(this.ruleForm)
			}
		},
		watch:{
			$route() {
				this.id = this.$route.params.id;
				this.SetObject();
				this.find();
			}
		}
	}
</script>

<style lang="scss" src="../../assets/scss/product.scss" scoped="scoped"></style>
<style lang="scss">
	#index {
		.el-form-item__content {
			line-height: 0;
		}

		.quill-editor {
			.ql-container {
				.ql-editor {
					min-height: 200px;
				}

			}
		}
	}
</style>
