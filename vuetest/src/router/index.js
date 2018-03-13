import Vue from 'vue'
import Router from 'vue-router'

const Demo = () => import('@/demo/hello')
const Login = () => import('@/views/login')
const Index = () => import('@/views/index')
import { Activity,Luckdraw,Turntable } from '@/views/activity/index'
import { Depot } from '@/views/depot/index'
import { Point } from '@/views/point/index'
Vue.use(Router)


let route = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/main',
		component: Index,
		redirect: '/main/activity/',
		children: [
			{
				path: '/main/activity',
				component: Activity,
				redirect: '/main/activity/luckdraw',
				children: [
					{
						path: '/main/activity/luckdraw',
						component: Luckdraw
					},
					{
						path: '/main/activity/turntable',
						component: Turntable
					}
				]
			},
			{
				path: '/main/depot',
				component: Depot
			},
			{
				path: '/main/point',
				component: Point
			}
		]
	}
];
let demoRoute = [
	{
		path: '/main/demo',
		component: Demo
	}
];
if(process.env.NODE_ENV === "development"){
	route[2].children = route[2].children.concat(demoRoute)
}
export default new Router({
	routes: route
})