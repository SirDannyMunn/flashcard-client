import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateFlashcard from '../views/flashcards/CreateFlashcard.vue'
import {baseUrl} from "@/config";
// import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/flashcard/create',
    name: 'createFlashcard',
    component: CreateFlashcard
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
