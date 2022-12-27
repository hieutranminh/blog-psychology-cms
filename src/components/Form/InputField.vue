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

    <!-- css inline hard code to fix UI input field moving when have errors message -->
    <div :class="{ 'has_error': errors[0] }">
      <!-- Field -->
      <template v-if="!showPassword">
        <a-input
          :type="type"
          :disabled="disabled"
          :value="value"
          :maxLength="maxlength ? maxlength : null"
          :placeholder="placeholder"
          :readOnly="!autofill || readonly"
          @input="handleType($event)"
          @focus="handleFocus"
          @keypress="type === 'number' ? preventE($event) : ''"
        >
          <a-icon v-if="prefixIcon"
                  slot="prefix"
                  :type="prefixIcon" />
        </a-input>
      </template>

      <template v-else>
        <a-input-password
          :disabled="disabled"
          :value="value"
          :placeholder="placeholder"
          :readOnly="!autofill || readonly"
          @input="handleType($event)"
          @focus="handleFocus"
          @keypress="type === 'number' ? preventE($event) : ''"
        >
          <a-icon v-if="prefixIcon"
                  slot="prefix"
                  :type="prefixIcon" />
        </a-input-password>
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
  name: 'InputField',

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
    placeholder: { type: String, default: '' },
    hiddenAsterisk: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    showPassword: { type: Boolean, default: false },
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
