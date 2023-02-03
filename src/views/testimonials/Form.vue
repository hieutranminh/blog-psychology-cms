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
        <InputField v-model="form.title"
                    vid="title"
                    rules="required|max:200"
                    class="mb-3"
                    :field="$t('COMMON.name')"
                    :label="$t('COMMON.name')"/>

        <TextAreaField v-model="form.description"
                       vid="description"
                       rules="required|max:500"
                       class="mb-3"
                       :field="$t('COMMON.content')"
                       :label="$t('COMMON.content')"/>

        <InputRate v-model="form.additional.star"
                   vid="rate"
                   rules="required"
                   class="mb-3"
                   :field="$t('TESTIMONIALS.rate')"
                   :label="$t('TESTIMONIALS.rate')"/>
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
import InputRate from '@/components/Form/InputRate'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    InputRate,
    InputField,
    TextAreaField
  },

  data () {
    return {
      form: {
        title: '',
        description: '',
        type: 'testimonials',
        is_published: 1,
        additional: {
          star: null
        }
      }
    }
  },

  created () {
    if (this.$route.name === 'testimonials.edit') {
      this.form.title = this.detail.title
      this.form.description = this.detail.description
      this.form.type = this.detail.type
      this.form.is_published = this.detail.is_published ? 1 : 0
      this.form.additional.star = this.detail.additional.star
    }
  },

  computed: {
    ...mapState('postTestimonial', ['detail'])
  },

  methods: {
    ...mapActions('postTestimonial', ['createPost', 'updatePost']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      return this.$route.name === 'testimonials.create'
        ? this.handleCreate()
        : this.handleUpdate()
    },

    handleCreate () {
      this.createPost(this.form).then(result => {
        if ('status' in result && result.status === 201) {
          this.$router.push({ name: 'testimonials' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    },

    handleUpdate () {
      this.updatePost({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if ('status' in result && result.status === 204) {
          this.$router.push({ name: 'testimonials' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    },

    onUploadImage (event) {
      this.form.thumbnail = event.url
      this.form.fileIds = [event.id]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
