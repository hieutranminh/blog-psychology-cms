<template>
  <div class="container">
    <ValidationObserver
        ref="observer"
        tag="form"
        @submit.prevent="validateBeforeSubmit()">
      <!-- CONTAINER -->
      <InputField v-model="form.title"
                  vid="title"
                  rules="required|max:200"
                  class="mb-4"
                  :field="$t('TAG.name')"
                  :label="$t('TAG.name')"/>

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
        title: '',
        type: 'tag',
        is_published: 1
      }
    }
  },

  created () {
    if (this.$route.name === 'tag.edit') {
      this.form = { ...this.form, ...this.detail }
    }
  },

  computed: {
    ...mapState('tag', ['detail'])
  },

  methods: {
    ...mapActions('tag', ['createTag', 'updateTag']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      return this.$route.name === 'tag.create'
        ? this.handleCreate()
        : this.handleUpdate()
    },

    handleCreate () {
      this.createTag(this.form).then(result => {
        if ('status' in result && result.status === 201) {
          this.$router.push({ name: 'tag' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    },

    handleUpdate () {
      this.updateTag({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if ('status' in result && result.status === 204) {
          this.$router.push({ name: 'tag' })
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
