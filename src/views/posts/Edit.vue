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
    store.dispatch('posts/getPostByID', {
      id: to.params.id,
      params: {
        fields: 'id,images,title,description,content,is_published,type'
      }
    }).then(_ => next())
  }
}
</script>
