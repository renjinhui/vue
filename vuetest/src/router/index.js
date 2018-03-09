import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/login')
const Index = () => import('@/views/index')
// const Activity = () => import('@/views/activity/index')
const Activity1 = () => import('@/views/activity/Activity1')
const Activity2 = () => import('@/views/activity/Activity2')
const Activity3 = () => import('@/views/activity/Activity3')
console.log(Index)
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/main',
			component: Index,
			children: [
				{
					path: '/activity1',
					component: Activity1
				},
				{
					path: '/activity2',
					component: Activity2
				},
				{
					path: '/activity3',
					component: Activity3
				}
			]
		},
		{
			path: '/login',
			component: Login
		}

	]
})
// export default new Router({
// 	routes: [
// 		{
// 			path: '/',
// 			redirect: '/main',
// 			children: [
// 				{
// 					path: '/main',
// 					component: Index
// 				},
// 				{
// 					path: '/login',
// 					component: Login
// 				}
// 			]
// 		}

// 	]
// })
