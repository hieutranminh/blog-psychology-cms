<template>
  <Form/>
</template>

<script>
import store from '@/store'
import Form from '@/views/news/Form'

export default {
  name: 'Edit',

  components: {
    Form
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('news/getNewsByID', to.params.id).then(_ => next())
  }
}
</script>

<style lang="scss" scoped>

</style>
