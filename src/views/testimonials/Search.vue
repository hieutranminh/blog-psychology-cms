<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <InputField v-model="filter.title"
                  vid="title"
                  class="mb-3"
                  :field="$t('TESTIMONIALS.name')"
                  :label="$t('TESTIMONIALS.name')"/>
    </a-col>

    <a-col :span="12">
      <SelectField v-model="filter.rate"
                   class="mb-3"
                   class-option="rating"
                   :field="$t('TESTIMONIALS.rate')"
                   :label="$t('TESTIMONIALS.rate')"
                   :options="OPTION_RATING"/>

      <!--ACTION-->
      <div class="text-right">
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
import SelectField from '@/components/Form/SelectField'
import { OPTION_RATING } from '@/enum/option'

export default {
  name: 'Search.vue',

  components: {
    SelectField,
    InputField
  },

  data () {
    return {
      filter: {
        title: null,
        rate: null
      },
      OPTION_RATING
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
