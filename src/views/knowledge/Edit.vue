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
    store.dispatch('postTeam/getKnowledgeByID', to.params.id).then(_ => next())
  }
}
</script>
