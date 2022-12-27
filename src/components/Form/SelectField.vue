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
        :value="value ? value : undefined"
        :mode="mode"
        :disabled="disabledSelect"
        :placeholder="placeholder"
        :class="classSelect"
        @change="handleChange"
      >
        <template v-for="(option, index) in options">
          <a-select-option
            :key="index"
            :disabled="disabledOption === +(option.id) || disabledOption === option.name"
            :value="option.value">
            {{ $t(option.name) }}
          </a-select-option>
        </template>

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
  name: 'SelectField',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number, Array], default: '' },
    options: { type: [Array, Object], default: () => [] },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    classSelect: { type: String, default: '' },
    classContainer: { type: String, default: '' },
    // All types: default, multiple, tags
    mode: { type: String, default: 'default' },
    disabledSelect: { type: Boolean, default: false },
    disabledOption: { type: [String, Number], default: '' }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
  .label {
    margin-bottom: 4px;
    font-weight: bold;
    color: #222222;
  }
  .ant-select {
    width: 100%;
    .ant-select-selection--multiple {
      .ant-select-selection__choice__remove {
        bottom: 10%
      }
    }
  }
</style>
