import Resource from '@/components/Resource'

export default [
  {
    path: '/story',
    component: Resource,
    children: [
      {
        path: '',
        name: 'story',
        component: () => import('@/views/story/Index.vue'),
        meta: {
          title: 'STORY.title',
          breadcrumb: [
            { title: 'STORY.title' }
          ],
          scrollTop: true
        }
      },
      {
        path: '/story/edit',
        name: 'story.edit',
        component: () => import('@/views/story/Edit'),
        meta: {
          title: 'STORY.title_edit',
          breadcrumb: [
            { title: 'STORY.title', routeName: 'story' },
            { title: 'STORY.title_edit' }
          ],
          scrollTop: true
        }
      }
    ]
  }
]
