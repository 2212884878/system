// http拦截判断token是否失效 暂不引入
import axios from 'axios'
import store from '../store/store'
import router from './index'
import {
	Message,
	MessageBox
} from 'element-ui'

// axios 配置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = 'http://';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; // axios 默认不发送cookie，需要全局设置true发送cookie

// http request 拦截器
axios.interceptors.request.use(
	config => {
		if (store.state.accussToken) {
			config.headers.Authorization = `accussToken ${store.state.accussToken}`;
		}
// 		if (config.method == 'post') {
// 			config.data = {
// 				...config.data,
// 				_t: Date.parse(new Date()) / 1000,
// 			}
// 		} else if (config.method == 'get') {
// 			config.params = {
// 				_t: Date.parse(new Date()) / 1000,
// 				...config.params
// 			}
// 		}
		return config
	},
	err => {
		console.log(err)
		return Promise.reject(err)
	})

// http response 拦截器
axios.interceptors.response.use(
	response => {
		/**
		 * code为非200是抛错 可结合自己业务进行修改
		 */
		const res = response.data
		if (res.code !== 200) {
			Message({
				message: res.message,
				type: 'error',
				duration: 3 * 1000
			})

			// 401:未登录;
			if (res.code === 401 || res.code === 403) {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('FedLogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				})
			}
			return Promise.reject('error')
		} else {
			return response
		}
	},
	err => {
		// 		Message({
		// 			message: err.response.data.message,
		// 			type: 'err',
		// 			duration: 3 * 1000
		// 		})
		// 		return Promise.reject(err)
		if (err.response.status == 504 || err.response.status == 404) {
			Message.error({
				message: `服务器被吃了⊙﹏⊙∥  状态码:${err.response.status}`
			});
		} else if (err.response.status == 403) {
			Message.error({
				message: `权限不足,请联系管理员!  状态码:${err.response.status}`
			});
		} else {
			Message.error({
				message: `未知错误!   状态码:${err.response.status}`
			});
		}
		return Promise.resolve(err);
	})

export default axios
