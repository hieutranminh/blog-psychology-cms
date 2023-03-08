import Resource from '@/components/Resource'

export default [
  {
    path: '/tag',
    component: Resource,
    children: [
      {
        path: '',
        name: 'tag',
        component: () => import('@/views/tag/Index.vue'),
        meta: {
          title: 'TAG.title',
          breadcrumb: [
            { title: 'TAG.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/tag/create',
        name: 'tag.create',
        component: () => import('@/views/tag/Create'),
        meta: {
          title: 'TAG.title_create',
          breadcrumb: [
            { title: 'TAG.title', routeName: 'tag' },
            { title: 'TAG.title_create' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/tag/edit/:id',
        name: 'tag.edit',
        component: () => import('@/views/tag/Edit'),
        meta: {
          title: 'TAG.title_edit',
          breadcrumb: [
            { title: 'TAG.title', routeName: 'tag' },
            { title: 'TAG.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
