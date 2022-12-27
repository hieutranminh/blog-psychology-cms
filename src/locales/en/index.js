import validationMessagesEN from 'vee-validate/dist/locale/en'
import customValidate from './customValidate.json'
import dictionary from './dictionary.json'
import table from './table.json'

export default {
  ...dictionary,
  ...table,
  validation: {
    ...validationMessagesEN.messages,
    ...customValidate
  }
}
