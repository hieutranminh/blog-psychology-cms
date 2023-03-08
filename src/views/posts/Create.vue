<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/posts/Form'

export default {
  name: 'Create',

  components: { Form },

  beforeRouteEnter (to, from, next) {
    const params = {
      perPage: 0,
      fields: 'id,title',
      'filters[type]': 'tag'
    }
    store.dispatch('tag/getList', params).then(_ => next())
  }
}
</script>
