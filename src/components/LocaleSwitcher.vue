<template>
  <a-select
    v-model="$i18n.locale"
    class="ml-3"
    style="width: 70px"
    @change="switchLocale">
    <a-select-option
      v-for="item in OPTION_LOCALE"
      :key="item.id"
      :value="item.value">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { OPTION_LOCALE } from '@/enum/locale'
import { localeChanged } from 'vee-validate'

export default {
  name: 'LocaleSwitcher',

  data () {
    return {
      OPTION_LOCALE
    }
  },

  methods: {
    switchLocale (locale) {
      // Save localStorage
      localStorage.setItem('locale', locale)
      // Set localization changes
      localeChanged()
    }
  }
}
</script>

<style scoped>

</style>
