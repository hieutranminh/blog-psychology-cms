<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/testimonials/Form'
export default {
  name: 'Edit',
  components: { Form },
  beforeRouteEnter (to, from, next) {
    store.dispatch('postTestimonial/getPostByID', {
      id: to.params.id,
      params: {
        fields: 'id,title,description,is_published,type,additional'
      }
    }).then(_ => next())
  }
}
</script>
