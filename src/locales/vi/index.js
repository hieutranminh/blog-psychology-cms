import validationMessagesVI from 'vee-validate/dist/locale/vi'
import dictionary from './dictionary.json'

// Custom message validate ( add {_field_} to change name field )
const customValidate = {}

export default {
  ...dictionary,
  validation: {
    ...validationMessagesVI.messages,
    ...customValidate
  }
}
