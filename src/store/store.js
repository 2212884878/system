import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入 axios
import axios from 'axios'

const store = new Vuex.Store({
	state: {
		accussToken: '',
		userId: '',
		visitedViews: [], //存放所有浏览过的且不重复的路由数据
		cachedViews: [],
		typeID: '',
		classID: '',
		DayType: ''
	},
	getters: {
		visitedViews: state => state.visitedViews
	},
	mutations: {
		//初始化用户信息
		INIT_USER(state) {
			if (localStorage.getItem('accussToken')) {
				state.accussToken = localStorage.getItem('accussToken')
				state.userId = localStorage.getItem('userId')
			}
		},
		//存储用户id
		SAVE_USERID(state, data) {
			state.userId = data
			localStorage.setItem('userId', data)
		},
		//存储token
		SAVE_TOKEN(state, data) {
			localStorage.setItem('accussToken', data)
			state.accussToken = data
		},
		//注销
		LOGOUT(state) {
			state.accussToken = ''
			state.userId = ''
			state.visitedViews = [];
			state.cachedViews = [];
			localStorage.removeItem("accussToken");
			localStorage.removeItem("userId");
		},
		GetTypeId(state, data) { //产品分类
			localStorage.setItem('typeID', data)
			state.typeID = data
		},
		GetClassId(state, data) { //产品类型
			localStorage.setItem('classID', data)
			state.classID = data
		},
		GetDayType(state, data) { //节假日类型
			localStorage.setItem('DayType', data)
			state.DayType = data
		},
		ADD_VISITED_VIEWS: (state, view) => {
			if (state.visitedViews.some(v => v.path === view.path)) return
			state.visitedViews.push(Object.assign({}, view, {
				title: view.meta.title || 'no-name'
			}))
			if (!view.meta.noCache) {
				state.cachedViews.push(view.name)
			}
		},
		DEL_VISITED_VIEWS: (state, view) => {
			for (const [i, v] of state.visitedViews.entries()) {
				if (v.path === view.path) {
					state.visitedViews.splice(i, 1)
					break
				}
			}
			for (const i of state.cachedViews) {
				if (i === view.name) {
					const index = state.cachedViews.indexOf(i)
					state.cachedViews.splice(index, 1)
					break
				}
			}
		},
		DEL_OTHERS_VIEWS: (state, view) => {
			for (const [i, v] of state.visitedViews.entries()) {
				if (v.path === view.path) {
					state.visitedViews = state.visitedViews.slice(i, i + 1)
					break
				}
			}
			for (const i of state.cachedViews) {
				if (i === view.name) {
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
		},
		SetTypeID(context) {
			axios({
				method: 'get',
				url: '../../../static/typeId.json'
			}).then((res) => {
				let list = res.data.data;
				context.commit('GetTypeId', list);
			});
		},
		SetClassID(context) {
			axios({
				method: 'get',
				url: '../../../static/classId.json'
			}).then((res) => {
				let list = res.data.data;
				context.commit('GetClassId', list);
			});
		},
		SetDayType(context) {
			axios({
				method: 'get',
				url: '../../../static/DayType.json'
			}).then((res) => {
				let list = res.data.data;
				context.commit('GetDayType', list);
			});
		},
	}
})

export default store
