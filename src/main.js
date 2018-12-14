// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"
//
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//Vue中引入jquery bootstarp bootstarp-table
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

import Axios from './router/axios'
Vue.prototype.$axios = Axios



// 注册一个data对象转换字符串方法
Vue.prototype.StringDat = function(data) {
	let ret = ''
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return ret
}
// 基于Quill、适用于Vue2的富文本编辑器。
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false

//安装vuex
import store from './store/store'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: {
		App
	},
	template: '<App/>'
})
