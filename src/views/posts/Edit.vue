<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/posts/Form'
export default {
  name: 'Edit',

  components: { Form },

  beforeRouteEnter (to, from, next) {
    const paramsDetail = {
      id: to.params.id,
      params: {
        fields: 'id,images,title,description,content,tags,is_published,type,additional',
        include: 'tags'
      }
    }
    const paramsTag = {
      perPage: 0,
      fields: 'id,title',
      'filters[type]': 'tag'
    }
    return Promise.allSettled([
      store.dispatch('posts/getPostByID', paramsDetail),
      store.dispatch('tag/getList', paramsTag)
    ]).then(_ => next())
  }
}
</script>
