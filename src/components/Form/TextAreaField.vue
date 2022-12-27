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
      class="mb-2">
      {{ label }}
      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'"
      />
    </label>

    <div :class="{ 'has_error': errors[0] }">
      <!-- Field -->
      <template>
        <a-textarea
          :rows="rows"
          :disabled="disabled"
          :type="type"
          :value="value"
          :maxLength="maxlength ? maxlength : null"
          :placeholder="placeholder"
          :readOnly="!autofill || readonly"
          @input="handleType($event)"
          @focus="handleFocus"
          @keypress="type === 'number' ? preventE($event) : ''"
          :auto-size="{ minRows: 4, maxRows: 5 }"
        >
          <a-icon v-if="prefixIcon"
                  slot="prefix"
                  :type="prefixIcon" />
        </a-textarea>
      </template>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextAreaField',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    type: { type: String, default: 'text' },
    rows: { type: Number, default: 4 },
    placeholder: { type: String, default: '' },
    hiddenAsterisk: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    prefixIcon: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    autofill: { type: Boolean, default: true },
    maxlength: { type: [String, Number], default: '' }
  },

  methods: {
    preventE ($event) {
      if (($event.which !== 8 && $event.which !== 0) &&
        ($event.which < 48 || $event.which > 57)) {
        $event.preventDefault()
      }
    },

    handleType ($event) {
      this.$emit('change', $event.target.value)
    },

    handleFocus ($event) {
      if (!this.autofill) {
        $event.target.removeAttribute('readonly')
      }
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
