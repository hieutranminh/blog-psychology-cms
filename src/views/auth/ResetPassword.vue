<template>
  <section class="auth d-flex justify-content-center align-items-center flex-column">
    <!--Login title-->
    <h1 v-text="$t('AUTH.reset_password')"/>

    <!--Form login-->
    <ValidationObserver
      ref="observer"
      tag="form"
      class="auth_container"
      @submit.prevent="validateBeforeSubmit()">

      <InputField v-model="form.password"
                  type="password"
                  field="FIELD.new_password"
                  vid="password"
                  rules="required|password|min:8|max:16"
                  show-password
                  class="mb-3"
                  :placeholder="$t('PLACEHOLDER.new_password')"/>

      <InputField v-model="form.password_confirmation"
                  type="password"
                  field="FIELD.new_password_confirm"
                  vid="password_confirmation"
                  rules="required|password|min:8|max:16|confirmed:password"
                  show-password
                  class="mb-4"
                  :placeholder="$t('PLACEHOLDER.new_password_confirm')"/>

      <a-button type="primary"
                html-type="submit"
                v-text="$t('BUTTON.setting_password')"
                :loading="isSubmit"
                block/>
    </ValidationObserver>
  </section>
</template>

<script>
// Store
import { mapActions } from 'vuex'
// Component
import InputField from '@/components/Form/InputField'
// Other
import FormMixin from '@/mixins/form.mixin'
import store from '@/store'

export default {
  name: 'ResetPassword',

  components: {
    InputField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        token: '',
        password: '',
        password_confirmation: ''
      },
      isSubmit: false
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      token: to.params.token
    }

    store.dispatch('auth/checkTokenExpired', params).then(result => {
      if (result.status === 204) {
        next()
      } else {
        next({ name: 'ErrorExpired' })
      }
    })
  },

  created () {
    this.form.token = this.$route.params.token
  },

  methods: {
    // Action
    ...mapActions('auth', ['resetPassword']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true

      // handle API RESET PASSWORD
      this.resetPassword(this.form).then(result => {
        if (result.status === 200) {
          this.onSuccess(this.$t('NOTIFICATION.title_completion'), this.$t('NOTIFICATION.msg_reset_password_success'))
          this.$router.push({ name: 'home' })
        } else {
          result.errors.forEach(x => (
            this.$refs.observer.setErrors({
              [x.field]: x.message
            })
          ))
        }
        this.isSubmit = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth {
    min-height: 100vh;
    h1 {
      font-size: 30px;
      font-weight: bold;
    }
    &_container {
      width: 100%;
      max-width: 30rem;
      padding: 40px 20px;
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    }
  }
</style>
