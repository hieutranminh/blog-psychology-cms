<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/contact/Form'
export default {
  name: 'Edit',
  components: { Form },
  beforeRouteEnter (to, from, next) {
    store.dispatch('contact/getContactByID', {
      id: to.params.id
    }).then(_ => next())
  }
}
</script>
