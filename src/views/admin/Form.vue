<template>
  <div class="container">
    <ValidationObserver
      ref="observer"
      tag="form"
      @submit.prevent="validateBeforeSubmit()">
      <!-- ACTIONS -->
      <div class="text-right mb-3">
        <!-- Back -->
        <a-button
          @click.prevent="$router.go(-1)"
          type="default"
          class="font-weight-bold"
          icon="rollback">
          {{$t('BUTTON.back')}}
        </a-button>

        <!-- Submit -->
        <a-button type="primary"
                  html-type="submit"
                  :icon="$route.params.id ? 'edit' : 'plus'"
                  class="ml-2 font-weight-bold">
          {{ $route.params.id ? $t('BUTTON.update') : $t('BUTTON.add') }}
        </a-button>
      </div>

      <!-- CONTAINER -->
      <a-card class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <InputField v-model="form.name"
                        vid="name"
                        rules="required|max:50"
                        class="mb-3"
                        :field="$t('COMMON.name')"
                        :label="$t('COMMON.name')"/>
          </a-col>
          <a-col :span="12">
            <InputField v-model="form.email"
                        vid="email"
                        rules="required|max:50"
                        class="mb-3"
                        :field="$t('COMMON.email')"
                        :label="$t('COMMON.email')"/>
          </a-col>
          <a-col :span="12">
            <InputField v-model="form.password"
                        type="password"
                        vid="password"
                        class="mb-3"
                        rules="min:8|max:32"
                        :field="$t('AUTH.password')"
                        :label="$t('AUTH.password')"/>
          </a-col>
          <a-col :span="12">
            <InputField v-model="form.password_confirmation"
                        type="password"
                        vid="password_confirmation"
                        class="mb-3"
                        rules="min:8|max:32|confirmed:password"
                        :field="$t('AUTH.confirm_password')"
                        :label="$t('AUTH.confirm_password')"/>
          </a-col>
        </a-row>
      </a-card>

      <!-- ACTIONS -->
      <div class="text-right">
        <!-- Back -->
        <a-button
          @click.prevent="$router.go(-1)"
          type="default"
          class="font-weight-bold"
          icon="rollback">
          {{$t('BUTTON.back')}}
        </a-button>

        <!-- Submit -->
        <a-button type="primary"
                  html-type="submit"
                  :icon="$route.params.id ? 'edit' : 'plus'"
                  class="ml-2 font-weight-bold">
          {{ $route.params.id ? $t('BUTTON.update') : $t('BUTTON.add') }}
        </a-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
// Store
import { mapActions, mapState } from 'vuex'
// Components
import InputField from '@/components/Form/InputField'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    InputField
  },

  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  created () {
    if (this.$route.name === 'admin.edit') {
      this.form = {
        ...this.form,
        ...this.detail
      }
    }
  },

  computed: {
    ...mapState('admin', ['detail'])
  },

  methods: {
    ...mapActions('admin', ['updateAdmin']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.handleUpdate()
    },

    handleUpdate () {
      this.updateAdmin({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if ('status' in result && result.status === 204) {
          this.$router.push({ name: 'admin' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
