import Resource from '@/components/Resource'

export default [
  {
    path: '/team',
    component: Resource,
    children: [
      {
        path: '',
        name: 'team',
        component: () => import('@/views/team/Index.vue'),
        meta: {
          title: 'TEAM.title',
          breadcrumb: [
            { title: 'TEAM.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/team/create',
        name: 'team.create',
        component: () => import('@/views/team/Create'),
        meta: {
          title: 'TEAM.title_create',
          breadcrumb: [
            { title: 'TEAM.title', routeName: 'team' },
            { title: 'TEAM.title_create' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/team/edit/:id',
        name: 'team.edit',
        component: () => import('@/views/team/Edit'),
        meta: {
          title: 'TEAM.title_edit',
          breadcrumb: [
            { title: 'TEAM.title', routeName: 'team' },
            { title: 'TEAM.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
