import Resource from '@/components/Resource'

export default [
  {
    path: '/testimonials',
    component: Resource,
    children: [
      {
        path: '',
        name: 'testimonials',
        component: () => import('@/views/testimonials/Index.vue'),
        meta: {
          title: 'TESTIMONIALS.title',
          breadcrumb: [
            { title: 'TESTIMONIALS.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/testimonials/create',
        name: 'testimonials.create',
        component: () => import('@/views/testimonials/Create'),
        meta: {
          title: 'TESTIMONIALS.title_create',
          breadcrumb: [
            { title: 'TESTIMONIALS.title', routeName: 'testimonials' },
            { title: 'TESTIMONIALS.title_create' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/testimonials/edit/:id',
        name: 'testimonials.edit',
        component: () => import('@/views/testimonials/Edit'),
        meta: {
          title: 'TESTIMONIALS.title_edit',
          breadcrumb: [
            { title: 'TESTIMONIALS.title', routeName: 'testimonials' },
            { title: 'TESTIMONIALS.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
