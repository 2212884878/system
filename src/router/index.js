import store from '@/store/store';
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
//登陸
const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login')

//首頁
const Home = r => require.ensure([], () => r(require('@/view/home/home')), 'Home')
const Center = r => require.ensure([], () => r(require('@/view/center/center')), 'Center')

//票务管理子系统子系统
const SubIndex = r => require.ensure([], () => r(require('@/view/Subsystems/SubIndex')), 'SubIndex')
//票务管理子系统首页
const Main = r => require.ensure([], () => r(require('@/view/Subsystems/Main')), 'Main')

//产品相关
const Product = r => require.ensure([], () => r(require('@/view/Subsystems/Product')), 'Product')
const newProduct = r => require.ensure([], () => r(require('@/view/Subsystems/newProduct')), 'newProduct')
const editProduct = r => require.ensure([], () => r(require('@/view/Subsystems/editProduct')), 'editProduct')
const delProduct = r => require.ensure([], () => r(require('@/view/Subsystems/delProduct')), 'delProduct')

//库存相关
const billbase = r => require.ensure([], () => r(require('@/view/Subsystems/billbase')), 'billbase')
const updateBillBase = r => require.ensure([], () => r(require('@/view/Subsystems/updateBillBase')), 'updateBillBase')
const closeSale = r => require.ensure([], () => r(require('@/view/Subsystems/closeSale')), 'closeSale')
const holiday = r => require.ensure([], () => r(require('@/view/Subsystems/holiday')), 'holiday')

//订单相关
const orderList = r => require.ensure([], () => r(require('@/view/Subsystems/orderList')), 'orderList')
const orderInfo = r => require.ensure([], () => r(require('@/view/Subsystems/orderInfo')), 'orderInfo')

Vue.use(Router)

const routes = [{
		path: '/',
		component: Login
	},
	{ //子系统选择页面
		path: '/home',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{ //票务管理子系统
		path: '/SubIndex',
		component: SubIndex,
		children: [{
				path: '',
				component: Main,
				name: 'main-defa',
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
			{ //个人中心
				path: '/center',
				component: Center,
				name:'Center',
				meta: {
					title: '个人中心'
				}
			},
			{
				path: '/Product',
				component: Product,
				name: 'Product',
				meta: {
					title: '产品详情'
				}
			},
			{
				path: '/newProduct',
				component: newProduct,
				name: 'newProduct',
				meta: {
					title: '新产品上架'
				}
			},
			{
				path: '/editProduct',
				component: editProduct,
				name: 'editProduct',
				meta: {
					title: '现产品维护'
				}
			},
			{
				path: '/deleteProduct',
				component: delProduct,
				name: 'delProduct',
				meta: {
					title: '旧产品下架'
				}
			},
			{
				path: '/updateBillBase',
				component: updateBillBase,
				name: 'updateBillBase',
				meta: {
					title: '维护库存信息'
				}
			},
			{
				path: '/closeSale',
				component: closeSale,
				name: 'closeSale',
				meta: {
					title: '暂时关闭售票'
				}
			},
			{
				path: '/holiday',
				component: holiday,
				name: 'holiday',
				meta: {
					title: '节假日维护'
				}
			},
			{
				path: '/billbase',
				component: billbase,
				name: 'billbase',
				meta: {
					title: '库存详情'
				}
			},
			{
				path: '/orderList/:type',
				component: orderList,
				name: 'orderList',
				meta: {
					title: window.sessionStorage.getItem('order') || '订单综合查询 '
				}
			},
			{
				path:'/orderInfo/:id',
				component: orderInfo,
				name:'orderInfo',
				meta:{
					title:'订单详情'
				}
			}
		]
	},
	{ //没找到路由去系统登陆页
		path: '*',
		redirect: '/home'
	}
]

if(window.localStorage.getItem('accussToken')) {
	store.commit('INIT_USER')
}

let router = new Router({
	// mode:'history',
	routes,
	linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
	// 每次切换页面时，调用进度条
    NProgress.start();
	if(store.state.accussToken) {
		next();
	} else {
		if(to.fullPath === '/login') {
			next()
		} else {
			next('/login')
		}
	}
	if(to.fullPath === '/login') {
		if(store.state.accussToken) {
			next({
				path: from.fullPath
			})
		} else {
			next();
		}
	}
})
// 跳转路由页面置顶
router.afterEach((to, from, next) => {
	NProgress.done(); // 在即将进入新的页面组件前，关闭掉进度条
	window.scrollTo(0, 0)
})

export default router;