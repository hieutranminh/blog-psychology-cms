<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <InputField v-model="filter.title"
                  vid="title"
                  class="mb-3"
                  :field="$t('COMMON.title')"
                  :label="$t('COMMON.title')"/>
    </a-col>

    <a-col :span="12">
      <SelectField v-model="filter.category_slug"
                   class="mb-3"
                   :field="$t('COMMON.type_category')"
                   :label="$t('COMMON.type_category')"
                   :options="OPTION_FILTER_KNOWLEDGE"/>

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
import { OPTION_FILTER_KNOWLEDGE } from '@/enum/option'

export default {
  name: 'Search',

  components: {
    SelectField,
    InputField
  },

  data () {
    return {
      filter: {
        title: null,
        category_slug: null
      },
      OPTION_FILTER_KNOWLEDGE
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
