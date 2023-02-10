<template>
  <div class="container">
    <ValidationObserver
        ref="observer"
        tag="form"
        @submit.prevent="validateBeforeSubmit()">
      <!-- ACTIONS -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <!-- Status -->
          <div>
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

          <!-- Pick display home -->
          <div class="ml-5">
            <label class="font-weight-bold mb-0 mr-3"
                   v-text="$t('TEAM.pick_display_home') + ':'"/>

            <a-switch v-model="form.additional.is_home_page" />
          </div>
        </div>

        <div>
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
      </div>

      <!-- CONTAINER -->
      <a-row :gutter="16">
        <!-- Left -->
        <a-col :span="12">
          <a-card :title="$t('TITLE.manage_information')" class="mb-4">
            <UploadFile :rules="form.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        vid="file_01"
                        class="mb-2 square-image"
                        @onFileSelect="onUploadImage($event)"
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

        <!-- Right -->
        <a-col :span="12">
          <!-- Category 03 -->
          <a-card :title="$t('TITLE.manage_category_03')" class="mb-4">
            <InputField v-model="form.additional.profile.experience.title"
                        vid="name_category_03"
                        rules="max:50"
                        class="mb-4"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <!--Line-->
            <template v-if="form.additional.profile.experience.content.length">
              <label class="font-weight-bold mb-1"
                     v-text="$t('COMMON.line_content')"/>

              <InputField v-for="(_, index) in form.additional.profile.experience.content"
                          v-model="form.additional.profile.experience.content[index]"
                          :key="index"
                          :vid="'line' + index"
                          :placeholder="$t('COMMON.line') + ' ' + (index + 1)"
                          :field="$t('COMMON.line') + ' ' + (index + 1)"
                          rules="max:150"
                          class="mb-2"/>
            </template>

            <!--Add-->
            <div class="text-center mt-3">
              <a-button @click.prevent="addLine('experience')"
                        type="primary"
                        icon="plus"
                        :disabled="form.additional.profile.experience.content.length >= 10"/>
            </div>
          </a-card>

          <!-- Category 04 -->
          <a-card :title="$t('TITLE.manage_category_04')" class="mb-4">
            <InputField v-model="form.additional.profile.education.title"
                        vid="name_category_04"
                        rules="max:50"
                        class="mb-4"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <!--Line-->
            <template v-if="form.additional.profile.education.content.length">
              <label class="font-weight-bold mb-1"
                     v-text="$t('COMMON.line_content')"/>

              <InputField v-for="(_, index) in form.additional.profile.education.content"
                          v-model="form.additional.profile.education.content[index]"
                          :key="index"
                          :vid="'line_education' + index"
                          :placeholder="$t('COMMON.line') + ' ' + (index + 1)"
                          :field="$t('COMMON.line') + ' ' + (index + 1)"
                          rules="max:150"
                          class="mb-2"/>
            </template>

            <!--Add-->
            <div class="text-center mt-3">
              <a-button @click.prevent="addLine('education')"
                        type="primary"
                        icon="plus"
                        :disabled="form.additional.profile.education.content.length >= 10"/>
            </div>
          </a-card>

          <!-- Category 05 -->
          <a-card :title="$t('TITLE.manage_category_05')" class="mb-4">
            <InputField v-model="form.additional.profile.scientific_publications.title"
                        vid="name_category_05"
                        rules="max:50"
                        class="mb-4"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <!--Line-->
            <template v-if="form.additional.profile.scientific_publications.content.length">
              <label class="font-weight-bold mb-1"
                     v-text="$t('COMMON.line_content')"/>

              <InputField v-for="(_, index) in form.additional.profile.scientific_publications.content"
                          v-model="form.additional.profile.scientific_publications.content[index]"
                          :key="index"
                          :vid="'line_scientific_publications' + index"
                          :placeholder="$t('COMMON.line') + ' ' + (index + 1)"
                          :field="$t('COMMON.line') + ' ' + (index + 1)"
                          rules="max:150"
                          class="mb-2"/>
            </template>

            <!--Add-->
            <div class="text-center mt-3">
              <a-button @click.prevent="addLine('scientific_publications')"
                        type="primary"
                        icon="plus"
                        :disabled="form.additional.profile.scientific_publications.content.length >= 10"/>
            </div>
          </a-card>

          <!-- Category 06 -->
          <a-card :title="$t('TITLE.manage_category_06')" class="mb-4">
            <InputField v-model="form.additional.profile.language_proficiency.title"
                        vid="name_category_06"
                        rules="max:50"
                        class="mb-2"
                        :field="$t('COMMON.name_category')"
                        :label="$t('COMMON.name_category')"/>

            <!--Line-->
            <label class="font-weight-bold mb-1"
                   v-text="$t('COMMON.content')"/>

            <a-select v-model="form.additional.profile.language_proficiency.content"
                      mode="tags"
                      :token-separators="[',']">
              <!--NOT FOUND CONTENT-->
              <template #notFoundContent>
                {{ $t('COMMON.empty_data') }}
              </template>
            </a-select>
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
        is_published: 1,
        additional: {
          is_home_page: false,
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
              content: []
            }
          }
        },
        fileIds: [],
        type: 'team'
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
