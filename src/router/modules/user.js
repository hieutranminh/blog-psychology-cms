import Resource from '@/components/Resource'
import { PERMISSION } from '@/enum/permission'

export default [
  {
    path: '/user',
    component: Resource,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/user/Index.vue'),
        meta: {
          title: 'USER.list',
          breadcrumb: [
            { title: 'USER.list' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE,
            PERMISSION.OPERATOR,
            PERMISSION.VIEWER
          ]
        }
      },
      {
        path: '/user/edit/:id',
        name: 'user.edit',
        component: () => import('@/views/user/Edit.vue'),
        meta: {
          title: 'USER.edit',
          breadcrumb: [
            { title: 'USER.list', routeName: 'user' },
            { title: 'USER.detail', routeName: 'user.detail' },
            { title: 'USER.edit' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE,
            PERMISSION.OPERATOR
          ]
        }
      },
      {
        path: '/user/detail/:id',
        name: 'user.detail',
        component: () => import('@/views/user/Detail.vue'),
        meta: {
          title: 'USER.detail',
          breadcrumb: [
            { title: 'USER.list', routeName: 'user' },
            { title: 'USER.detail' }
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
