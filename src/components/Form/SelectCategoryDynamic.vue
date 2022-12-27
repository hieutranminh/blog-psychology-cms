<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
    :class="classContainer"
    v-slot="{ errors }">
    <!-- Label -->
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'"
      />
    </label>
    <div :class="{ 'has_error': errors[0] }">
      <!-- Field -->
      <a-select
        :show-search="showSearch"
        :filter-option="filterOption"
        :value="value ? value : undefined"
        :disabled="disabledSelect"
        :placeholder="placeholder"
        :class="classSelect"
        @change="handleChange">
        <a-select-option
          v-for="(item, index) in options"
          :key="index"
          :disabled="disabledOption"
          :value="item.id">
          {{ item.title }}
        </a-select-option>

        <!--NOT FOUND CONTENT-->
        <template #notFoundContent>
          {{ $t('COMMON.empty_data') }}
        </template>
      </a-select>
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'SelectCategoryDynamic',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number, Array], default: '' },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    classSelect: { type: String, default: '' },
    classContainer: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    // All types: default, multiple, tags
    disabledSelect: { type: Boolean, default: false },
    disabledOption: { type: Boolean, default: false },
    showSearch: { type: Boolean, default: false }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    },

    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style scoped>

</style>
