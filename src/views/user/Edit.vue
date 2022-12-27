<template>
  <Form/>
</template>

<script>
// Store
import store from '@/store'
// Components
import Form from '@/views/user/Form'

export default {
  name: 'Edit',

  components: {
    Form
  },

  beforeRouteEnter (to, from, next) {
    if (!store.state.user.detail) {
      return store.dispatch('user/getUserByID', [to.params.id, {}])
        .then(result => {
          if (result.success) {
            (result.data.deleted_at || result.data.status === 0)
              ? next({ name: 'error.403' })
              : next()
          } else {
            next({ name: 'error.403' })
          }
        })
    }
    return next()
  }
}
</script>

<style lang="scss" scoped>

</style>
