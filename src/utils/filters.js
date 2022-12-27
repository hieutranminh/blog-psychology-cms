import Vue from 'vue'
import moment from 'moment'
import i18n from '@/plugins/i18n'

Vue.filter('formatDate', function (value, format = 'YYYY/MM/DD HH:mm') {
  if (value) {
    return moment(value).locale('ja').format(format)
  }
  return ''
})

Vue.filter('numberWithCommas', function (num, sign = ',', unit = '') {
  if (!num && num !== 0) {
    return '-'
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sign) + (unit !== '%' ? ' ' + unit : unit)
})

Vue.filter('formatNumberCommas', function (num) {
  if (!num) {
    return '-'
  }
  return Intl.NumberFormat('en-US').format(num)
})

Vue.filter('imageEmpty', value => {
  return value || require('../assets/images/img-default.jpeg')
})

Vue.filter('getNameFromEnum', (value, options) => {
  if (value !== null) {
    let dataReturn = ''
    options.forEach(element => {
      if (element.value === value) {
        dataReturn = element.name
      }
    })
    return i18n.t(dataReturn)
  }
  return ''
})

Vue.filter('numberToFixed', function (num) {
  if (num % 1 === 0) {
    return num
  } else {
    const fixedLength = num.toString().split('.')[1].length
    const numFixed = fixedLength < 3 ? fixedLength : 3
    return num.toFixed(numFixed)
  }
})
