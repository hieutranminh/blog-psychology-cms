import Resource from '@/components/Resource'
import { PERMISSION } from '@/enum/permission'

export default [
  {
    path: '/home',
    component: Resource,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'HOME.title',
          breadcrumb: [
            { title: 'HOME.title' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE,
            PERMISSION.OPERATOR,
            PERMISSION.VIEWER
          ]
        }
      }
    ]
  }
]
