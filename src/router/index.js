import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoginGuard, AuthGuard, ResolveGuard } from '@/router/guards'

// Route Module
import AuthRoute from './modules/auth'
import HomeRoute from './modules/home'
import StoryRoute from './modules/story'
import TeamRoute from './modules/team'
import KnowledgeRoute from './modules/knowledge'
import PostsRoute from './modules/posts'
import ContactRoute from './modules/contact'
import AdminRoute from './modules/admin'
import ErrorsRoute from './modules/errors'

Vue.use(VueRouter)

const routes = [
  // Auth
  {
    path: '/auth',
    name: 'Auth',
    redirect: 'login',
    component: () => import('@/views/Auth.vue'),
    children: [
      ...AuthRoute
    ],
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Main
  {
    path: '/',
    redirect: 'home',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    children: [
      ...HomeRoute,
      ...StoryRoute,
      ...TeamRoute,
      ...KnowledgeRoute,
      ...PostsRoute,
      ...ContactRoute,
      ...AdminRoute,
      ...ErrorsRoute
    ],
    beforeEnter: ResolveGuard([AuthGuard])
  },

  // Page not found
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound.vue')
  },
  // Token expired
  {
    path: '/token-expired',
    name: 'ErrorExpired',
    component: () => import('@/views/error/ErrorExpired.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.scrollTop) {
      scroll.x = 0
      scroll.y = 0
    }
    return scroll
  },
  base: '/cms/'
})

export default router
