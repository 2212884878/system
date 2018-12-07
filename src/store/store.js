import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入 axios
import axios from 'axios'

const store = new Vuex.Store({
	state: {
		token: '',
		uid: '',
		visitedViews: [], //存放所有浏览过的且不重复的路由数据
		cachedViews: []
	},
	getters: {
		visitedViews: state => state.visitedViews
	},
	mutations: {
		//初始化用户信息
		INIT_USER(state) {
			if(localStorage.getItem('token')) {
				state.token = localStorage.getItem('token')
				state.uid = localStorage.getItem('uid')
			}
		},
		//存储用户id
		SAVE_USERID(state, data) {
			state.uid = data
			localStorage.setItem('uid', data)
		},
		//存储token
		SAVE_TOKEN(state, data) {
			localStorage.setItem('token', data)
			state.token = data
		},
		//注销
		LOGOUT(state) {
			state.token = ''
			state.uid = ''
			state.visitedViews = [];
			state.cachedViews = [];
			localStorage.removeItem("token");
			localStorage.removeItem("uid");
		},
		ADD_VISITED_VIEWS: (state, view) => {
			if(state.visitedViews.some(v => v.path === view.path)) return
			state.visitedViews.push(Object.assign({}, view, {
				title: view.meta.title || 'no-name'
			}))
			if(!view.meta.noCache) {
				state.cachedViews.push(view.name)
			}
		},
		DEL_VISITED_VIEWS: (state, view) => {
			for(const [i, v] of state.visitedViews.entries()) {
				if(v.path === view.path) {
					state.visitedViews.splice(i, 1)
					break
				}
			}
			for(const i of state.cachedViews) {
				if(i === view.name) {
					const index = state.cachedViews.indexOf(i)
					state.cachedViews.splice(index, 1)
					break
				}
			}
		},
		DEL_OTHERS_VIEWS: (state, view) => {
			for(const [i, v] of state.visitedViews.entries()) {
				if(v.path === view.path) {
					state.visitedViews = state.visitedViews.slice(i, i + 1)
					break
				}
			}
			for(const i of state.cachedViews) {
				if(i === view.name) {
					const index = state.cachedViews.indexOf(i)
					state.cachedViews = state.cachedViews.slice(index, i + 1)
					break
				}
			}
		},
		DEL_ALL_VIEWS: (state) => {
			state.visitedViews = []
			state.cachedViews = []
		}
	},
	actions: { //调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
		addVisitedViews({
			commit
		}, view) {
			commit('ADD_VISITED_VIEWS', view)
		},
		delVisitedViews({
			commit,
			state
		}, view) {
			return new Promise((resolve) => {
				commit('DEL_VISITED_VIEWS', view)
				resolve([...state.visitedViews])
			})
		},
		delOthersViews({
			commit,
			state
		}, view) {
			return new Promise((resolve) => {
				commit('DEL_OTHERS_VIEWS', view)
				resolve([...state.visitedViews])
			})
		},
		delAllViews({
			commit,
			state
		}) {
			return new Promise((resolve) => {
				commit('DEL_ALL_VIEWS')
				resolve([...state.visitedViews])
			})
		}

	}
})

export default store