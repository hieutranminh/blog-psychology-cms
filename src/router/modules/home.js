import Resource from '@/components/Resource'

export default [
  {
    path: '/home',
    component: Resource,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/Index.vue'),
        meta: {
          title: 'HOME.title',
          breadcrumb: [
            { title: 'HOME.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/home/edit',
        name: 'home.edit',
        component: () => import('@/views/home/Edit'),
        meta: {
          title: 'HOME.title_edit',
          breadcrumb: [
            { title: 'HOME.title', routeName: 'home' },
            { title: 'HOME.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
