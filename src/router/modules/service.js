import Resource from '@/components/Resource'

export default [
  {
    path: '/service',
    component: Resource,
    children: [
      {
        path: '',
        name: 'service',
        component: () => import('@/views/service/Index.vue'),
        meta: {
          title: 'SERVICE.title',
          breadcrumb: [
            { title: 'SERVICE.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/service/edit',
        name: 'service.edit',
        component: () => import('@/views/service/Edit'),
        meta: {
          title: 'SERVICE.title_edit',
          breadcrumb: [
            { title: 'SERVICE.title', routeName: 'service' },
            { title: 'SERVICE.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
