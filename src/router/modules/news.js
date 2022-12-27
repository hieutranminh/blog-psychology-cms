import Resource from '@/components/Resource'
import { PERMISSION } from '@/enum/permission'

export default [
  {
    path: '/news',
    component: Resource,
    children: [
      {
        path: '',
        name: 'news',
        component: () => import('@/views/news/Index.vue'),
        meta: {
          title: 'NEWS.list',
          breadcrumb: [
            { title: 'NEWS.list' }
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
        path: '/news/create',
        name: 'news.create',
        component: () => import('@/views/news/Create.vue'),
        meta: {
          title: 'NEWS.create',
          breadcrumb: [
            { title: 'NEWS.list', routeName: 'news' },
            { title: 'NEWS.create' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE,
            PERMISSION.OPERATOR
          ]
        }
      },
      {
        path: '/news/edit/:id',
        name: 'news.edit',
        component: () => import('@/views/news/Edit.vue'),
        meta: {
          title: 'NEWS.edit',
          breadcrumb: [
            { title: 'NEWS.list', routeName: 'news' },
            { title: 'NEWS.edit' }
          ],
          scrollTop: true,
          permissions: [
            PERMISSION.FULL_ROLE,
            PERMISSION.OPERATOR
          ]
        }
      },
      {
        path: '/news/detail/:id',
        name: 'news.detail',
        component: () => import('@/views/news/Detail.vue'),
        meta: {
          title: 'NEWS.detail',
          breadcrumb: [
            { title: 'NEWS.list', routeName: 'news' },
            { title: 'NEWS.detail' }
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
