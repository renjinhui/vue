import Vue from 'vue'
import Router from 'vue-router'

const Demo = () => import('@/demo/hello')
const Login = () => import('@/views/login')
const Index = () => import('@/views/index')
import {Activity1,Activity2,Activity3} from '@/views/activity/index'
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
		children: [
			{
				path: '/main/activity1',
				component: Activity1
			},
			{
				path: '/main/activity2',
				component: Activity2
			},
			{
				path: '/main/activity3',
				component: Activity3
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