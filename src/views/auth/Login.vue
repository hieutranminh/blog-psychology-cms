<template>
  <section class="auth d-flex justify-content-center align-items-center flex-column">
    <!--Login title-->
    <h1 v-text="$t('AUTH.login')"/>

    <!--Form login-->
    <ValidationObserver
      ref="observer"
      tag="form"
      class="auth_container"
      @submit.prevent="validateBeforeSubmit()">

      <InputField v-model="form.email"
                  field="FIELD.email"
                  vid="email"
                  prefix-icon="user"
                  rules="required|max:200"
                  class="mb-3"
                  placeholder="user@gmail.com"
                  :autofill="false"
                  :label="$t('AUTH.login_id')"/>

      <InputField v-model="form.password"
                  field="FIELD.password"
                  vid="password"
                  type="password"
                  prefix-icon="lock"
                  rules="required|min:8|max:32"
                  show-password
                  class="mb-3"
                  placeholder="********"
                  :label="$t('AUTH.password')"/>

      <div class="d-flex align-items-center mb-3">
        <!--Submit login-->
        <a-button type="primary"
                  html-type="submit"
                  class="ml-auto font-weight-bold"
                  :loading="isSubmit">
          {{ $t('BUTTON.login') }}
        </a-button>
      </div>

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
  name: 'Login',

  components: {
    InputField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isSubmit: false
    }
  },

  methods: {
    // ACTION
    ...mapActions('auth', ['userLogin']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true

      // handle API LOGIN
      this.userLogin(this.form).then(result => {
        if (result.status === 200) {
          this.onSuccess(this.$t('NOTIFICATION.title_completion'), this.$t('NOTIFICATION.msg_login_success'))
          this.$router.push({ name: 'home' })
          this.isSubmit = false
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_login_fail'))
          this.isSubmit = false
        }
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
