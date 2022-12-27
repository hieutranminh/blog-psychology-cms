import Resource from '@/components/Resource'
import { PERMISSION } from '@/enum/permission'

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
          title: 'ADMIN.list',
          breadcrumb: [
            { title: 'ADMIN.title' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE
          ]
        }
      },
      {
        path: '/admin/create',
        name: 'admin.create',
        component: () => import('@/views/admin/Create.vue'),
        meta: {
          title: 'ADMIN.create',
          breadcrumb: [
            { title: 'ADMIN.title', routeName: 'admin' },
            { title: 'ADMIN.create' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE
          ]
        }
      },
      {
        path: '/admin/edit/:id',
        name: 'admin.edit',
        component: () => import('@/views/admin/Edit.vue'),
        meta: {
          title: 'ADMIN.edit',
          breadcrumb: [
            { title: 'ADMIN.title', routeName: 'admin' },
            { title: 'ADMIN.edit' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE
          ]
        }
      },
      {
        path: '/admin/detail/:id',
        name: 'admin.detail',
        component: () => import('@/views/admin/Detail.vue'),
        meta: {
          title: 'ADMIN.detail',
          breadcrumb: [
            { title: 'ADMIN.title', routeName: 'admin' },
            { title: 'ADMIN.detail' }
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
