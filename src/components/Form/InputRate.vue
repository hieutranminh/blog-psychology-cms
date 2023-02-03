<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
    v-slot="{ errors }">
    <!-- Label -->
    <label
      v-if="label"
      class="mb-1">
      {{ label }}
      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'"
      />
    </label>

    <!-- css inline hard code to fix UI input field moving when have errors message -->
    <div :class="{ 'has_error': errors[0] }">
      <!-- Field -->
      <a-rate :value="value"
              @change="onChange"/>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputRate',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    field: { type: [String], default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' }
  },

  methods: {
    onChange (value) {
      this.$emit('change', value)
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
