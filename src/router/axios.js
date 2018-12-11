// http拦截判断token是否失效 暂不引入
import axios from 'axios'
import store from '../store/store'
import router from './index'

// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = $core.use('http'); //确认协议和地址
axios.defaults.withCredentials = true; // axios 默认不发送cookie，需要全局设置true发送cookie

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  data => {
    return data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('LOGOUT')
          router.push({
            path: '/'
          })
      }
    }
    return Promise.reject(error.response.data)
  })

export default axios