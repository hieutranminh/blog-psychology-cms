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
                  icon="edit"
                  class="ml-2 font-weight-bold"
                  :loading="isSubmit">
          {{ $t('BUTTON.update') }}
        </a-button>
      </div>

      <!-- FORM SECTION 01 -->
      <a-card :title="$t('TITLE.manage_section_01')" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <UploadFile :rules="form.home.section_01.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.home.section_01.thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        vid="file_01"
                        @onFileSelect="form.home.section_01.thumbnail = $event"
                        @resetThumbnail="form.home.section_01.thumbnail = ''"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.home.section_01.title"
                        vid="title_01"
                        rules="required|max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <TextAreaField v-model="form.home.section_01.desc"
                           vid="desc_01"
                           rules="required|max:250"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.home.section_01.btn_text"
                            vid="btn_text_01"
                            rules="required|max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.home.section_01.btn_link"
                            vid="btn_link_01"
                            rules="required"
                            class="mb-2"
                            :field="$t('COMMON.link_button')"
                            :label="$t('COMMON.link_button')"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>

      <!-- FORM SECTION 02 -->
      <a-card :title="$t('TITLE.manage_section_02')" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <UploadFile :rules="form.home.section_02.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.file"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        vid="file_02"
                        @onFileSelect="form.home.section_02.thumbnail = $event"
                        @resetThumbnail="form.home.section_02.thumbnail = ''"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.home.section_02.title"
                        vid="title_02"
                        rules="required|max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <TextAreaField v-model="form.home.section_02.desc"
                           vid="desc_02"
                           rules="required|max:250"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.home.section_02.btn_text"
                            vid="btn_text_02"
                            rules="required|max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.home.section_02.btn_link"
                            vid="btn_link_02"
                            rules="required"
                            class="mb-2"
                            :field="$t('COMMON.link_button')"
                            :label="$t('COMMON.link_button')"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>

      <!-- ACTIONS -->
      <div class="text-right ">
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
                  icon="edit"
                  class="ml-2 font-weight-bold"
                  :loading="isSubmit">
          {{ $t('BUTTON.update') }}
        </a-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'
import UploadFile from '@/components/Form/UploadFile'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Edit',

  components: {
    UploadFile,
    TextAreaField,
    InputField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        home: {
          banner: {
            title: '',
            desc: '',
            btn_text: '',
            btn_link: '',
            phone: ''
          },
          section_01: {
            thumbnail: '',
            title: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          },
          section_02: {
            thumbnail: '',
            title: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          }
        }
      },
      isSubmit: false
    }
  },

  methods: {
    ...mapActions('setting', ['getSetting', 'updateSetting']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.updateSetting(this.form).then(result => {
        if (result) {
          this.$router.push({ name: 'home' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.title_fail'))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
