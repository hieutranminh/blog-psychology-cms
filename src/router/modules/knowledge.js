import Resource from '@/components/Resource'

export default [
  {
    path: '/knowledge',
    component: Resource,
    children: [
      {
        path: '',
        name: 'knowledge',
        component: () => import('@/views/knowledge/Index.vue'),
        meta: {
          title: 'KNOWLEDGE.title',
          breadcrumb: [
            { title: 'KNOWLEDGE.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/knowledge/create',
        name: 'knowledge.create',
        component: () => import('@/views/knowledge/Create'),
        meta: {
          title: 'KNOWLEDGE.title_create',
          breadcrumb: [
            { title: 'KNOWLEDGE.title', routeName: 'knowledge' },
            { title: 'KNOWLEDGE.title_create' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/knowledge/edit/:id',
        name: 'knowledge.edit',
        component: () => import('@/views/knowledge/Edit'),
        meta: {
          title: 'KNOWLEDGE.title_edit',
          breadcrumb: [
            { title: 'KNOWLEDGE.title', routeName: 'knowledge' },
            { title: 'KNOWLEDGE.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
