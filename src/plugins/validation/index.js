import Vue from 'vue'
import i18n from '@/plugins/i18n'
import {
  ValidationProvider, ValidationObserver, configure, extend
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('format_url', {
  validate (value) {
    // eslint-disable-next-line
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)
  }
})

extend('email', {
  validate (value) {
    return /^[a-zA-Z0-9]{1}[a-zA-Z0-9_.-]*@{1}[a-zA-Z0-9_-]{1,}(?:\.[a-zA-Z0-9_-]+)+$/.test(value)
  }
})

extend('password', {
  validate (value) {
    return /^[a-zA-Z0-9!_/`()+-=$#&@~]+$/.test(value)
  }
})

extend('phone_number', {
  validate (value) {
    return /^[0-9!-]+$/.test(value)
  }
})

extend('half_width_number', {
  validate (value) {
    return /^[0-9]+$/.test(value)
  }
})

extend('compare_date_range', {
  params: ['start', 'end'],
  validate (value, { start, end }) {
    return start !== end
  }
})

extend('note_max', {
  params: ['current'],
  validate: (value, { current }) => {
    return (value.replace(/\n/g, '\r\n').length) <= parseInt(current)
  }
})

extend('compare_user_point', {
  params: ['currentPoint', 'newPoint'],
  validate: (value, { currentPoint, newPoint }) => {
    const isNegative = Math.sign(newPoint) === -1 ? Math.abs(newPoint) : newPoint
    return !(newPoint < currentPoint && (currentPoint - isNegative) < 0)
  }
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field
    // override the field name.
    values._field_ = i18n.t(`${text}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})
