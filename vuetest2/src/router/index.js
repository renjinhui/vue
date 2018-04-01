import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Act = () => import('@/views/activity/activity')
const Act1 = () => import('@/views/activity/activity1')
const Act2 = () => import('@/views/activity/activity2')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Act',
      component: Act,
      children: [
      	{
      		path: '/activity1',
      		component: Act1
      	},
      	{
      		path: '/activity2',
      		component: Act2
      	}
      ]
    }
  ]
})
