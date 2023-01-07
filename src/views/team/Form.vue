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
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card :title="$t('TITLE.manage_information')" class="mb-4">
            <UploadFile :rules="form.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        vid="file_01"
                        class="mb-2 square-image"
                        @onFileSelect="form.thumbnail = $event"
                        @resetThumbnail="form.thumbnail = ''"/>

            <InputField v-model="form.title"
                        vid="name"
                        rules="required|max:50"
                        class="mb-2"
                        :field="$t('COMMON.name')"
                        :label="$t('COMMON.name')"/>

            <InputField v-model="form.description"
                        vid="position"
                        rules="required|max:100"
                        :field="$t('COMMON.position')"
                        :label="$t('COMMON.position')"/>
          </a-card>

          <a-card :title="$t('TITLE.manage_category_01')" class="mb-4">
            <InputField v-model="form.additional.profile.care_id.title"
                        vid="name_category_01"
                        rules="max:50"
                        class="mb-2"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <TextAreaField v-model="form.additional.profile.care_id.content"
                           vid="content_01"
                           rules="max:2000"
                           :field="$t('COMMON.content')"
                           :label="$t('COMMON.content')"/>
          </a-card>

          <a-card :title="$t('TITLE.manage_category_02')" class="mb-4">
            <InputField v-model="form.additional.profile.biography.title"
                        vid="name_category_02"
                        rules="max:50"
                        class="mb-2"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <TextAreaField v-model="form.additional.profile.biography.content"
                           vid="content_02"
                           rules="max:2000"
                           :field="$t('COMMON.content')"
                           :label="$t('COMMON.content')"/>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :title="$t('TITLE.manage_category_03')" class="mb-4">
            <pre>{{form.additional.profile.experience}}</pre>
            <InputField v-model="form.additional.profile.experience.title"
                        vid="name_category_03"
                        rules="max:50"
                        class="mb-2"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>
            <div class="text-center mt-3">
              <a-button @click.prevent="addLine('experience')"
                        type="primary"
                        icon="plus"/>
            </div>
          </a-card>
        </a-col>
      </a-row>

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
import UploadFile from '@/components/Form/UploadFile'
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'

export default {
  name: 'Form',

  components: {
    TextAreaField,
    InputField,
    UploadFile
  },

  data () {
    return {
      form: {
        title: '',
        description: '',
        thumbnail: '',
        additional: {
          profile: {
            care_id: {
              title: '',
              content: ''
            },
            biography: {
              title: '',
              content: ''
            },
            experience: {
              title: '',
              content: []
            },
            education: {
              title: '',
              content: []
            },
            scientific_publications: {
              title: '',
              content: []
            },
            language_proficiency: {
              title: '',
              content: ''
            }
          }
        }
      }
    }
  },

  methods: {
    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      console.log(this.form)
    },

    addLine (type) {
      if (type === 'experience') {
        this.form.additional.profile[type].content.push('')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
