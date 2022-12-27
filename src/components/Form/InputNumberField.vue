<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
    v-slot="{ errors }">
    <!--Label-->
    <label
      v-if="label"
      class="mb-2">
      {{ label }}
      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'"
      />
    </label>

    <div :class="{ 'has_error': errors[0] }">
      <div>
        <!--Field-->
        <a-input-number
          :value="value"
          :disabled="disabled"
          :min="minNumber"
          :max="maxNumber"
          :formatter="value => `${value}`.replace(formatterRegex, separator)"
          :parser="value => value.replace(parserRegex, '')"
          @change="onChange"
          @blur="onBlur"/>
        <span v-if="digitText"
              class="ml-1"
              v-text="digitText"/>
      </div>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputNumberField',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: [String, Object], default: '' },
    disabled: { type: Boolean, default: false },
    minNumber: { type: Number, default: 0 },
    maxNumber: { type: Number, default: 99999999 },
    formatterRegex: { type: RegExp, default: () => null },
    parserRegex: { type: RegExp, default: () => null },
    separator: { type: String, default: ',' },
    digitText: { type: String, default: '' }
  },

  methods: {
    onChange (value) {
      this.$emit('change', value)
    },

    onBlur (value) {
      this.$emit('blur', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    margin-bottom: 4px;
    font-weight: bold;
    color: #222222;
  }
</style>
