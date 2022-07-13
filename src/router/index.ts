import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Videos from '../views/Videos.vue'
import Settings from '../views/Settings.vue'
import {baseUrl} from "@/config";
// import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/videos',
    name: 'videos',
    component: Videos
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/callback',
    name: 'callback',
    beforeEnter: (to, from, next) => {
      console.log('call function')
      // appConfig.$auth.handleRedirectCallback()
      next()
    },
    redirect: baseUrl
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
