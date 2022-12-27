<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="form-common"
    @submit.prevent="onSubmit">

    <div class="container">
      <!-- top control -->
      <div class="control-top">
        <a-button
          @click="$router.go(-1)"
          type="primary"
          v-text="$t('BUTTON.return')"/>
      </div>

      <!-- title -->
      <h2>{{ this.$t('ADMIN.info_basic') }}</h2>

      <!-- form info -->
      <form class="p-4">
        <!-- mail address(login_id) -->
        <div class="d-flex">
          <label class="form-label pt-1">
            {{ $t('ADMIN.mail_address') }}
            <span
              class="required"
              v-text="'*'"/>
          </label>
          <InputField v-model="form.email"
                      :placeholder="$t('PLACEHOLDER.please_enter')"
                      field="ADMIN.mail_address"
                      vid="email"
                      class="mb-3 w-30"
                      rules="required|email|max:200"/>
        </div>

        <!-- password -->
        <div class="d-flex"
             v-if="$route.name === 'admin.create'">
          <label class=" form-label pt-1">
            {{ $t('ADMIN.password') }}
            <span
              class="required"
              v-text="'*'"/>
          </label>
          <InputField v-model="form.password"
                      :placeholder="$t('PLACEHOLDER.please_enter')"
                      type="password"
                      field="ADMIN.password"
                      vid="password"
                      class="mb-3 w-30"
                      rules="required|password|min:8|max:32"/>
        </div>

        <!-- admin name -->
        <div class="d-flex">
          <label class="form-label pt-1">
            {{ $t('ADMIN.name') }}
            <span
              class="required"
              v-text="'*'"/>
          </label>
          <InputField v-model="form.name"
                      :placeholder="$t('PLACEHOLDER.please_enter')"
                      field="ADMIN.name"
                      vid="name"
                      class="mb-3 w-30"
                      rules="required|max:200"/>
        </div>

        <!-- usage status -->
        <div class="d-flex">
          <label class="form-label pt-1 mb-3">
            {{ $t('ADMIN.active_status') }}
            <span
              class="required"
              v-text="'*'"/>
          </label>

          <a-radio-group v-model="form.status">
            <a-radio :value="1" checked>
              {{ $t('COMMON.active') }}
            </a-radio>
            <a-radio :value="0">
              {{ $t('COMMON.inactive') }}
            </a-radio>
          </a-radio-group>
        </div>

        <!-- role -->
        <div class="d-flex">
          <label class="form-label pt-1">
            {{ $t('ADMIN.role') }}
            <span
              class="required"
              v-text="'*'"/>
          </label>
          <SelectField v-model="form.role"
                       :options="OPTION_ROLE"
                       :placeholder="$t('PLACEHOLDER.please_choose')"
                       field="ADMIN.role"
                       vid="role"
                       class="mb-3 w-30"
                       rules="required"/>
        </div>

        <!-- note -->
        <div class="d-flex">
          <label class="form-label pt-1">
            {{ $t('COMMON.note') }}
            <span
              class="required"/>
          </label>
          <TextAreaField v-model="form.note"
                         rules="note_max:2000"
                         :placeholder="$t('PLACEHOLDER.please_enter')"
                         field="COMMON.note"
                         vid="note"
                         class="mb-3 w-30"/>
        </div>
      </form>

      <!-- footer control -->
      <div class="control-bottom">
        <!-- button back -->
        <a-button
          @click="$router.go(-1)"
          type="primary"
          v-text="$t('BUTTON.cancel')"/>

        <!-- button confirm -->
        <a-button class="m-auto"
                  html-type="submit"
                  type="primary"
                  v-text="$t('BUTTON.submit')"/>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
// Store
import { mapActions } from 'vuex'
// Component
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'
import SelectField from '@/components/Form/SelectField'
// Other
import { OPTION_ROLE } from '@/enum/option'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Form',

  components: {
    TextAreaField,
    InputField,
    SelectField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        status: 1,
        role: '',
        note: ''
      },
      OPTION_ROLE
    }
  },

  mounted () {
    if (this.$route.name === 'admin.edit') {
      this.getAdminByID(this.$route.params.id).then(res => {
        if (res) {
          this.form = { ...this.$store.state.admin.detail }
        } else {
          console.log('error')
        }
      }).catch(error => {
        this.onError(this.$t('NOTIFICATION.title_fail'), error)
      })
    }
  },

  methods: {
    ...mapActions('admin', ['createAdmin', 'getAdminByID', 'editAdmin']),

    async onSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      if (this.$route.name === 'admin.create') return this.handleCreate()
      return this.handleUpdate()
    },

    handleCreate () {
      this.createAdmin(this.form).then((result) => {
        if (result.success) {
          this.onSuccess(this.$t('NOTIFICATION.completion'))
          this.$router.push({ name: 'admin' })
        } else {
          // set error follow API
          this.handleSetErrors(result.data.errors)
        }
      })
    },

    handleUpdate () {
      this.editAdmin([this.$route.params.id, this.form]).then(result => {
        if (result.status !== 422) {
          this.onSuccess(this.$t('NOTIFICATION.completion'))
          this.$router.push({ name: 'admin' })
        } else if (result.status === 422) {
          // set error follow API
          this.handleSetErrors(result.data.errors)
          this.onError(this.$t('NOTIFICATION.title_fail'))
        }
      }).catch(error => {
        this.onError(this.$t('NOTIFICATION.title_fail'), error)
      })
    },

    handleSetErrors (errors) {
      errors.forEach(x => (
        this.$refs.observer.setErrors({
          [x.field]: x.message
        })
      ))
    }
  }
}
</script>

<style lang="scss" scoped>
.form-label {
  width: 230px;
  font-weight: bold;
}
.control-top {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
h2 {
  font-size: 18px;
  color: #000000;
  font-weight: bold;
}
.control-bottom {
  padding-top: 20px;
  border-top: 1px solid #e6e6e6;
  display: flex;
}
</style>
