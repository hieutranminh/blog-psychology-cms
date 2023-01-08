import Resource from '@/components/Resource'

export default [
  {
    path: '/admin',
    component: Resource,
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('@/views/admin/Index.vue'),
        meta: {
          title: 'ADMIN.title',
          breadcrumb: [
            { title: 'ADMIN.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/admin/edit/:id',
        name: 'admin.edit',
        component: () => import('@/views/admin/Edit'),
        meta: {
          title: 'ADMIN.title_edit',
          breadcrumb: [
            { title: 'ADMIN.title', routeName: 'admin' },
            { title: 'ADMIN.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
