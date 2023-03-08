<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/tag/Form'
export default {
  name: 'Edit',
  components: { Form },
  beforeRouteEnter (to, from, next) {
    store.dispatch('tag/getTagByID', {
      id: to.params.id,
      params: {
        fields: 'id,title'
      }
    }).then(_ => next())
  }
}
</script>
