<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/admin/Form'
export default {
  name: 'Edit',
  components: { Form },
  beforeRouteEnter (to, from, next) {
    store.dispatch('admin/getAdminByID', {
      id: to.params.id
    }).then(_ => next())
  }
}
</script>

<style lang="scss" scoped>

</style>
