webpackJsonp([12],{"7OJl":function(e,t){},QrHb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),l=a.n(n),s=a("NYxO"),r={data:function(){return{list:[],loading:!1,currentPage:1,count:0,PageSize:10,PageSizes:[10,20,30,40,50,100],productName:"",typeId:"",classId:""}},computed:l()({},Object(s.b)(["userId","accussToken","typeID","classID"])),created:function(){document.title="下架产品"},mounted:function(){this.SetList(this.currentPage,this.PageSize)},methods:{handleDelete:function(e){this.$router.push({path:"/Product",query:{id:e,status:"del"}})},search:function(){console.log(this.currentPage,this.PageSize,this.productName,this.typeId,this.classId),this.SetList(this.currentPage,this.PageSize,this.productName,this.typeId,this.classId)},formatTypeId:function(e,t){var a="";return this.typeID.forEach(function(t){t.id==e.typeId&&(a=t.name)}),a=""==a?e.typeId:a},formatClassId:function(e,t){var a="";return this.classID.forEach(function(t){t.id==e.classId&&(a=t.name)}),a=""==a?e.classId:a},handleSizeChange:function(e){this.PageSize=e,this.SetList(this.currentPage,this.PageSize),console.log("每页 "+e+" 条")},handleCurrentChange:function(e){this.currentPage=e,this.SetList(this.currentPage,this.PageSize),console.log("当前页: "+e)},SetList:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=this,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s={pageNum:e,pageSize:t,classId:arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",typeId:l,productName:a};this.$axios.get("http://192.168.2.38:5010/product/findProduct",{params:s}).then(function(e){200==e.data.code?(n.list=e.data.data.list||[],console.log(n.list),n.count=e.data.data.total||0):n.$message.error(e.data.message)}).catch(function(e){console.log(e)})},tableRowClassName:function(e){var t=e.row,a=e.rowIndex;t.index=a}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"edit"},[a("el-row",{staticClass:"borderm2"},[a("el-col",{attrs:{span:20}},[a("h4",[e._v(e._s(e.$route.meta.title))])]),e._v(" "),a("el-col",{staticClass:"text-alginr",attrs:{span:4}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"}},[e._v("我要留言")])],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"text-alginr mb10",attrs:{span:24}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",size:"mini",round:""},on:{click:e.search}},[e._v("刷新表格")])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"","highlight-current-row":"",height:"537","element-loading-text":"拼命加载数据中","element-loading-spinner":"el-icon-loading",size:"mini","row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"60",align:"center"}},[a("el-table-column",{attrs:{type:"index",align:"center"}})],1),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}},[a("el-table-column",{attrs:{prop:"id",align:"center",width:"400"}})],1),e._v(" "),a("el-table-column",{attrs:{prop:"productName",label:"产品名称",align:"center"}},[a("el-table-column",{attrs:{width:"300",prop:"productName",align:"center"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-input",{attrs:{size:"small",placeholder:"输入关键字搜索"},on:{change:e.search},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.productName,callback:function(t){e.productName=t},expression:"productName"}})]}}])})],1),e._v(" "),a("el-table-column",{attrs:{prop:"typeId",label:"产品分类",align:"center"}},[a("el-table-column",{attrs:{prop:"typeId",align:"center",formatter:e.formatTypeId},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-select",{attrs:{size:"small",placeholder:"请选择"},on:{change:e.search},model:{value:e.typeId,callback:function(t){e.typeId=t},expression:"typeId"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.typeID,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})],2)]}}])})],1),e._v(" "),a("el-table-column",{attrs:{prop:"classId",label:"产品类型",align:"center"}},[a("el-table-column",{attrs:{prop:"classId",align:"center",formatter:e.formatClassId},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-select",{attrs:{size:"small",placeholder:"请选择"},on:{change:e.search},model:{value:e.classId,callback:function(t){e.classId=t},expression:"classId"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.classID,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})],2)]}}])})],1),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"}},[a("el-table-column",{attrs:{prop:"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row.id)}}},[e._v("下架")])]}}])})],1)],1),e._v(" "),a("section",{staticClass:"pages"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.PageSizes,"page-size":e.PageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,i,!1,function(e){a("7OJl"),a("x//4")},"data-v-086bd3ae",null);t.default=o.exports},"x//4":function(e,t){}});