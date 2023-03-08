<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/knowledge/Form'
export default {
  name: 'Edit',

  components: { Form },

  beforeRouteEnter (to, from, next) {
    const paramsDetail = {
      id: to.params.id,
      params: {
        include: 'categories,tags',
        fields: 'id,images,title,description,content,tags,is_published'
      }
    }
    const paramsTag = {
      perPage: 0,
      fields: 'id,title',
      'filters[type]': 'tag'
    }
    return Promise.allSettled([
      store.dispatch('postKnowledge/getKnowledgeByID', paramsDetail),
      store.dispatch('tag/getList', paramsTag)
    ]).then(_ => next())
  }
}
</script>
