import Resource from '@/components/Resource'

export default [
  {
    path: '/contact',
    component: Resource,
    children: [
      {
        path: '',
        name: 'contact',
        component: () => import('@/views/contact/Index.vue'),
        meta: {
          title: 'CONTACT.title',
          breadcrumb: [
            { title: 'CONTACT.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/contact/edit/:id',
        name: 'contact.edit',
        component: () => import('@/views/contact/Edit'),
        meta: {
          title: 'CONTACT.title_edit',
          breadcrumb: [
            { title: 'CONTACT.title', routeName: 'contact' },
            { title: 'CONTACT.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
