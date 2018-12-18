// http拦截判断token是否失效 暂不引入
import axios from 'axios'
import store from '../store/store'
import router from './index'
import {
	Message,
	MessageBox
} from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; // axios 默认不发送cookie，需要全局设置true发送cookie

// http request 拦截器
axios.interceptors.request.use(
	config => {
		if (store.state.accussToken) {
			config.headers.Authorization = `accussToken ${store.state.accussToken}`;
		}
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
	error => {
		//     if (error.response) {
		//       switch (error.response.status) {
		//         case 401:
		//           // 401 清除token信息并跳转到登录页面
		//           store.commit('LOGOUT')
		//           router.push({
		//             path: '/'
		//           })
		//       }
		//     }
		//     return Promise.reject(error.response.data)
		console.debug("err" + error) // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 3 * 1000
		})
		return Promise.reject(error)
	})

export default axios
