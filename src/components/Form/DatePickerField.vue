<template>
  <ValidationProvider tag="div"
                      :name="field"
                      :vid="vid"
                      :rules="rules"
                      v-slot="{ errors }">
    <label v-if="label"
           class="label">
      {{ $t(label) }}
      <span v-if="rules.includes('required')"
            class="required"
            v-text="'*'"/>
    </label>

    <div :class="{'has_error': errors[0]}">
      <a-date-picker
        style="width: 100%;"
        :show-time="showTime ? { format: 'HH:mm' } : false"
        :placeholder="placeholder"
        :value="getDate"
        :format="formatDate"
        @change="onChange"/>

      <!--Message Error-->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePickerField',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    formatDate: {
      type: String,
      default: 'YYYY-MM-DD'
    },

    placeholder: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    field: {
      type: String,
      default: ''
    },

    rules: {
      type: String,
      default: ''
    },

    vid: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    showTime: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getDate () {
      return this.value ? moment(this.value) : null
    }
  },

  methods: {
    onChange (date, dateString) {
      return this.$emit('change', dateString)
    }
  }
}
</script>

<style scoped>

</style>
