<template>
  <div id="app">
    <router-view />

    <Loading v-if="loading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading'

export default {
  name: 'App',

  components: {
    Loading
  },

  computed: {
    ...mapState('loader', ['loading'])
  }
}
</script>
