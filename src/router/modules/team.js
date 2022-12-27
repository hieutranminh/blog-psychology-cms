import Resource from '@/components/Resource'
import { PERMISSION } from '@/enum/permission'

export default [
  {
    path: '/team',
    component: Resource,
    children: [
      {
        path: '/team/overview',
        name: 'team.overview',
        component: () => import('@/views/team/Overview.vue'),
        meta: {
          title: 'team_overview',
          breadcrumb: [
            { title: 'team_overview' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE
          ]
        }
      }
    ]
  }
]
