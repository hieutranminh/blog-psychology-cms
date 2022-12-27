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

    <div :class="{'has_error': errors[0]}">
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        :locale="locale"
        :format="format"
        :value="getDate || null"
        :valueFormat="valueFormat"
        :placeholder="[$t(startTime), $t(endTime)]"
        :disabled-date="disabledDate"
        @change="onChange">
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/ja_JP'

export default {
  name: 'DatePickerRangeField',

  data () {
    return {
      locale
    }
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: Array, default: () => [] },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: [String, Object], default: '' },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    valueFormat: { type: String, default: 'YYYY-MM-DD HH:mm' },
    startTime: { type: String, default: 'PLACEHOLDER.start_date' },
    endTime: { type: String, default: 'PLACEHOLDER.end_date' },
    startDateDisable: { type: String, default: '' },
    endDateDisable: { type: String, default: '' }
  },

  computed: {
    getDate () {
      if (this.value && this.value.length && this.value[0] && this.value[1]) {
        return [moment(this.value[0], this.format), moment(this.value[1], this.format)]
      }
      return ''
    }
  },

  methods: {
    onChange (date, dateString) {
      return this.$emit('change', dateString)
    },

    disabledDate (current) {
      const disableDate = current < moment(this.startDateDisable) || current > moment(this.endDateDisable)
      return disableDate
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
