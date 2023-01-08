import Resource from '@/components/Resource'

export default [
  {
    path: '/posts',
    component: Resource,
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('@/views/posts/Index.vue'),
        meta: {
          title: 'POSTS.title',
          breadcrumb: [
            { title: 'POSTS.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/posts/create',
        name: 'posts.create',
        component: () => import('@/views/posts/Create'),
        meta: {
          title: 'POSTS.title_create',
          breadcrumb: [
            { title: 'POSTS.title', routeName: 'posts' },
            { title: 'POSTS.title_create' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/posts/edit/:id',
        name: 'posts.edit',
        component: () => import('@/views/posts/Edit'),
        meta: {
          title: 'POSTS.title_edit',
          breadcrumb: [
            { title: 'POSTS.title', routeName: 'posts' },
            { title: 'POSTS.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
