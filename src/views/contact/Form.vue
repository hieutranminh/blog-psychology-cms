<template>
  <div class="container">
    <ValidationObserver
        ref="observer"
        tag="form"
        @submit.prevent="validateBeforeSubmit()">
      <!-- ACTIONS -->
      <div class="text-right mb-3">
        <!-- Status -->
        <div style="float: left; font-weight: bold">
          <label class="font-weight-bold mb-0 mr-3"
                 v-text="$t('COMMON.status') + ':'"/>

          <a-radio-group v-model="form.is_published">
            <a-radio :value="1">
              {{$t('COMMON.enabled')}}
            </a-radio>
            <a-radio :value="0">
              {{$t('COMMON.disabled')}}
            </a-radio>
          </a-radio-group>
        </div>

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
          <a-col :span="24">
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
            <InputField v-model="form.phone_number"
                        vid="phone_number"
                        rules="required|max:11"
                        class="mb-3"
                        :field="$t('COMMON.phone')"
                        :label="$t('COMMON.phone')"/>
          </a-col>
          <a-col :span="24">
            <TextAreaField v-model="form.note"
                           vid="note"
                           rules="max:200"
                           class="mb-3"
                           :field="$t('COMMON.note')"
                           :label="$t('COMMON.note')"/>
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
import TextAreaField from '@/components/Form/TextAreaField'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    InputField,
    TextAreaField
  },

  data () {
    return {
      form: {
        name: '',
        email: '',
        phone_number: '',
        note: '',
        status: ''
      }
    }
  },

  created () {
    if (this.$route.name === 'contact.edit') {
      this.form = {
        ...this.form,
        ...this.detail
      }
    }
  },

  computed: {
    ...mapState('contact', ['detail'])
  },

  methods: {
    ...mapActions('contact', ['updateContact']),

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
      this.updateContact({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if ('status' in result && result.status === 204) {
          this.$router.push({ name: 'contact' })
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
