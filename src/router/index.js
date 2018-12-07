import store from '@/store/store';
import Vue from 'vue'
import Router from 'vue-router'

//登陸
const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login')

//首頁
const Home = r => require.ensure([], () => r(require('@/view/home/home')), 'Home')

//子系统1
const Sub1Index = r => require.ensure([], () => r(require('@/view/Subsystems1/Sub1Index')), 'Sub1Index')
const Main = r => require.ensure([], () => r(require('@/view/Subsystems1/Main')), 'Main')
const Product = r => require.ensure([], () => r(require('@/view/Subsystems1/Product')), 'Product')
const newProduct = r => require.ensure([], () => r(require('@/view/Subsystems1/newProduct')), 'newProduct')
const editProduct = r => require.ensure([], () => r(require('@/view/Subsystems1/editProduct')), 'editProduct')

const Table = r => require.ensure([], () => r(require('@/view/Subsystems1/Table')), 'Table')
const Form = r => require.ensure([], () => r(require('@/view/Subsystems1/Form')), 'Form')

//子系统2
const Sub2Index = r => require.ensure([], () => r(require('@/view/Subsystems2/Sub2Index')), 'Sub2Index')

Vue.use(Router)

const routes = [{
		path: '/',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/Sub1Index',
		component: Sub1Index,
		meta: {
			requireAuth: true
		},
		children: [{
				path: '',
				name: 'main-default',
				component: Main,
				meta: {
					title: '主页'
				}
			},
			{
				path: '/main',
				component: Main,
				name: 'main',
				meta: {
					title: '主页'
				}
			},
			{
				path: '/Product',
				component: Product,
				name: 'Product',
				meta: {
					title: '产品信息'
				}
			},
			{
				path: '/newProduct',
				component: newProduct,
				name: 'newProduct',
				meta: {
					title: '增加产品信息'
				}
			},
			{
				path: '/editProduct',
				component: editProduct,
				name: 'editProduct',
				meta: {
					title: '修改产品信息'
				}
			}
			
		]
	},
// 	{ //没找到路由去系统登陆页
// 		path: '*',
// 		redirect: '/'
// 	}
]

if (window.localStorage.getItem('token')) {
	store.commit('INIT_USER')
}

let router = new Router({
	// mode:'history',
	routes,
	linkActiveClass: 'active'
})

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(record => record.meta.requireAuth)) {
// 		if (store.state.token) {
// 			next();
// 		} else {
// 			next({
// 				path: '/',
// 				query: {
// 					redirect: to.fullPath
// 				}
// 			})
// 		}
// 	} else {
// 		next();
// 	}
// })

// 跳转路由页面置顶
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router;
