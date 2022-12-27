<template>
  <section class="auth d-flex justify-content-center align-items-center flex-column">
    <!--Login title-->
    <h1 v-text="$t('AUTH.forgot_password')"/>

    <!--Form login-->
    <ValidationObserver
      ref="observer"
      tag="form"
      class="auth_container"
      @submit.prevent="validateBeforeSubmit()">

      <p v-text="$t('AUTH.email_registered')"/>

      <InputField v-model="form.email"
                  field="FIELD.email"
                  vid="email"
                  rules="required|max:200"
                  class="mb-4"
                  :placeholder="$t('PLACEHOLDER.email')"/>

      <a-button type="primary"
                html-type="submit"
                v-text="$t('BUTTON.send_email')"
                :loading="isSubmit"
                block/>

      <router-link :to="{ name: 'login' }"
                   custom
                   v-slot="{ navigate }">
        <a @click="navigate"
           class="d-inline-block mt-3"
           v-text="$t('BUTTON.back_to_login')"/>
      </router-link>
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

export default {
  name: 'ForgotPassword',

  components: {
    InputField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        email: null
      },
      isSubmit: false
    }
  },

  methods: {
    // Action
    ...mapActions('auth', ['forgotPassword']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true

      // handle API SEND MAIL PASSWORD
      this.forgotPassword(this.form).then(result => {
        if (result.success) {
          this.form.email = null
          this.onSuccess(this.$t('NOTIFICATION.completion'), result.data.messages)
          this.$refs.observer.reset()
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
