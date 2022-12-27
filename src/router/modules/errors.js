export default [
  {
    path: '/500',
    name: 'error.500',
    component: () => import('@/views/error/Error500.vue')
  },
  {
    path: '/404',
    name: 'error.404',
    component: () => import('@/views/error/Error404.vue')
  },
  {
    path: '/403',
    name: 'error.403',
    component: () => import('@/views/error/Error403.vue')
  }
]
