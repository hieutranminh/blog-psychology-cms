<template>
  <div id="app">
    <router-view />

    <Loading v-if="loading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading'
import { localeChanged } from 'vee-validate'

export default {
  name: 'App',

  components: {
    Loading
  },

  created () {
    this.initLocale()
  },

  computed: {
    ...mapState('loader', ['loading'])
  },

  methods: {
    initLocale () {
      this.$i18n.locale = localStorage.getItem('locale')
      localeChanged()
    }
  }
}
</script>
