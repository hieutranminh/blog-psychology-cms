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
        <UploadFile :rules="form.thumbnail ? '' : 'required' + '|image'"
                    :thumbnail="form.thumbnail"
                    :field="$t('COMMON.image')"
                    :label="$t('COMMON.image')"
                    vid="file_01"
                    class="mb-3 rectangle-image"
                    @onFileSelect="onUploadImage($event)"
                    @resetThumbnail="form.thumbnail = ''"/>

        <InputField v-model="form.title"
                    vid="name"
                    rules="required|max:50"
                    class="mb-3"
                    :field="$t('COMMON.name')"
                    :label="$t('COMMON.name')"/>

        <TextAreaField v-model="form.description"
                       vid="position"
                       rules="required|max:100"
                       class="mb-3"
                       :field="$t('COMMON.description')"
                       :label="$t('COMMON.description')"/>
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
import UploadFile from '@/components/Form/UploadFile'
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    InputField,
    TextAreaField,
    UploadFile
  },

  data () {
    return {
      form: {
        title: '',
        description: '',
        type: '',
        content: '',
        thumbnail: '',
        fileIds: [],
        is_published: 1
      }
    }
  },

  created () {
    if (this.$route.name === 'team.edit') {
      this.form.title = this.detail.title
      this.form.description = this.detail.description
      this.form.thumbnail = this.detail.images[0].url
      this.form.is_published = this.detail.is_published ? 1 : 0
      this.form.fileIds = [this.detail.images[0].id]
      this.form.type = 'team'
      this.form.additional = {
        ...this.form.additional,
        ...JSON.parse(JSON.stringify(this.detail.additional))
      }
    }
  },

  computed: {
    ...mapState('postTeam', ['detail'])
  },

  methods: {
    ...mapActions('postTeam', ['createTeam', 'updateTeam']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.form.additional.profile.experience.content = this.form.additional.profile.experience.content.filter(Boolean)
      this.form.additional.profile.education.content = this.form.additional.profile.education.content.filter(Boolean)
      this.form.additional.profile.scientific_publications.content = this.form.additional.profile.scientific_publications.content.filter(Boolean)
      this.form.additional.profile.language_proficiency.content = this.form.additional.profile.language_proficiency.content.filter(Boolean)

      return this.$route.name === 'team.create'
        ? this.handleCreate()
        : this.handleUpdate()
    },

    handleCreate () {
      this.createTeam(this.form).then(result => {
        if ('status' in result && result.status === 201) {
          this.$router.push({ name: 'team' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    },

    handleUpdate () {
      this.updateTeam({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if ('status' in result && result.status === 204) {
          this.$router.push({ name: 'team' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_fail'))
        }
      })
    },

    addLine (type) {
      this.form.additional.profile[type].content.push('')
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
