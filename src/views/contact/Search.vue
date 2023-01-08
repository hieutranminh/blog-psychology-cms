<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <InputField v-model="filter.name"
                  vid="name"
                  class="mb-2"
                  :field="$t('COMMON.name')"
                  :label="$t('COMMON.name')"/>

      <InputField v-model="filter.email"
                  vid="email"
                  class="mb-2"
                  :field="$t('COMMON.email')"
                  :label="$t('COMMON.email')"/>
    </a-col>

    <a-col :span="12">
      <InputField v-model="filter.phone_number"
                  vid="phone_number"
                  class="mb-3"
                  :field="$t('COMMON.phone')"
                  :label="$t('COMMON.phone')"/>

      <!--ACTION-->
      <div class="text-right pt-3">
        <a-button @click.prevent="reset"
                  type="default"
                  class="mr-2 font-weight-bold"
                  icon="retweet">
          {{ $t('BUTTON.reset') }}
        </a-button>
        <a-button @click.prevent="search"
                  class="font-weight-bold"
                  type="primary"
                  icon="search">
          {{ $t('BUTTON.search') }}
        </a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import InputField from '@/components/Form/InputField'

export default {
  name: 'Search.vue',

  components: {
    InputField
  },

  data () {
    return {
      filter: {
        name: null,
        email: null,
        phone_number: null
      }
    }
  },

  methods: {
    search () {
      this.$emit('filter-changed', this.filter)
    },

    reset () {
      for (const property in this.filter) {
        if (Array.isArray(this.filter[property])) {
          this.filter[property] = []
        } else {
          this.filter[property] = null
        }
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
