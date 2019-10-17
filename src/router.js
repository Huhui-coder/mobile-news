import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      redirect:'/news',
      component: () => import('./views/baseLayout.vue'),
      children:[
        {
          path: 'news',
          component: () => import('@/views/news/App.vue'),
          name: 'news',
          meta: {
            title: 'news Page',
          }
        },{
          path: 'joke',
          component: () => import('@/views/joke.vue'),
          name: 'joke',
          meta: {
            title: 'joke Page',
          }
        },{
          path: 'collect',
          component: () => import('@/views/collect.vue'),
          name: 'collect',
          meta: {
            title: 'collect Page',
          }
        },{
          path: 'personal',
          component: () => import('@/views/personal.vue'),
          name: 'personal',
          meta: {
            title: 'personal Page',
          }
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')

    }
  ]
})
