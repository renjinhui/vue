import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/demo/hello'

const Login = () => import('@/views/login')
const Index = () => import('@/views/index')

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/main',
			component: Index
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
