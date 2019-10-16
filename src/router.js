import Vue from 'vue'
import Router from 'vue-router'
import baseLayout from './views/baseLayout.vue' 
import news from './views/news.vue'
import joke from './views/joke.vue'
import collect from './views/collect.vue'
import personal from './views/personal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: () => import('./views/baseLayout.vue'),
      children:[
        {
          path: 'news',
          component: () => import('@/views/news.vue'),
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
