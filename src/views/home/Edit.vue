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

      <!-- FORM BANNER -->
      <a-card :title="$t('TITLE.manage_banner')" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="24">
            <InputField v-model="form.value.banner.title"
                        vid="title"
                        rules="max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <TextAreaField v-model="form.value.banner.desc"
                           vid="desc"
                           rules="max:250"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.value.banner.btn_text"
                            vid="btn_text"
                            rules="max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.value.banner.btn_link"
                            vid="btn_link"
                            class="mb-2"
                            :field="$t('COMMON.link_button')"
                            :label="$t('COMMON.link_button')"/>
              </a-col>
            </a-row>

            <InputField v-model="form.value.banner.phone"
                        vid="phone"
                        rules="numeric|max:11"
                        class="mb-2"
                        :field="$t('COMMON.phone')"
                        :label="$t('COMMON.phone')"/>
          </a-col>
        </a-row>
      </a-card>

      <!-- FORM SECTION 01 -->
      <a-card :title="$t('TITLE.manage_section_01')" class="mb-4">
        <a-switch  slot="extra" v-model="form.value.section_01.display" />

        <a-row :gutter="16">
          <a-col :span="12">
            <UploadFile :rules="form.value.section_01.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.value.section_01.thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        class="auto-image"
                        vid="file_01"
                        @onFileSelect="form.value.section_01.thumbnail = $event.url"
                        @resetThumbnail="form.value.section_01.thumbnail = ''"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.value.section_01.title"
                        vid="title_01"
                        rules="required|max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <a-radio-group v-model="form.value.section_01.title_align"
                           class="mb-2"
                           default-value="left">
              <a-radio value="left">
                {{$t('COMMON.align_left')}}
              </a-radio>
              <a-radio value="center">
                {{$t('COMMON.align_center')}}
              </a-radio>
              <a-radio value="right">
                {{$t('COMMON.align_right')}}
              </a-radio>
            </a-radio-group>

            <TextAreaField v-model="form.value.section_01.desc"
                           vid="desc_01"
                           rules="required|max:2000"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.value.section_01.btn_text"
                            vid="btn_text_01"
                            rules="max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.value.section_01.btn_link"
                            vid="btn_link_01"
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
        <a-switch  slot="extra" v-model="form.value.section_02.display" />

        <a-row :gutter="16">
          <a-col :span="12">
            <UploadFile :rules="form.value.section_02.thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.value.section_02.thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        class="auto-image"
                        vid="file_02"
                        @onFileSelect="form.value.section_02.thumbnail = $event.url"
                        @resetThumbnail="form.value.section_02.thumbnail = ''"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.value.section_02.title"
                        vid="title_02"
                        rules="required|max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <a-radio-group v-model="form.value.section_02.title_align"
                           class="mb-2"
                           default-value="left">
              <a-radio value="left">
                {{$t('COMMON.align_left')}}
              </a-radio>
              <a-radio value="center">
                {{$t('COMMON.align_center')}}
              </a-radio>
              <a-radio value="right">
                {{$t('COMMON.align_right')}}
              </a-radio>
            </a-radio-group>

            <TextAreaField v-model="form.value.section_02.desc"
                           vid="desc_02"
                           rules="required|max:2000"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.value.section_02.btn_text"
                            vid="btn_text_02"
                            rules="max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.value.section_02.btn_link"
                            vid="btn_link_02"
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
import { mapActions, mapGetters } from 'vuex'
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'
import UploadFile from '@/components/Form/UploadFile'
import FormMixin from '@/mixins/form.mixin'
import store from '@/store'

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
        key: 'home',
        value: {
          banner: {
            title: '',
            desc: '',
            btn_text: '',
            btn_link: '',
            phone: ''
          },
          section_01: {
            display: false,
            thumbnail: '',
            title: '',
            title_align: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          },
          section_02: {
            display: false,
            thumbnail: '',
            title: '',
            title_align: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          }
        }
      },
      isSubmit: false
    }
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('setting/getSetting').then(_ => {
      next()
    })
  },

  created () {
    if (this.dataHome) {
      this.form.value = {
        ...this.form.value,
        ...JSON.parse(JSON.stringify(this.dataHome))
      }
    }
  },

  computed: {
    ...mapGetters('setting', ['dataHome'])
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
      this.updateSetting([this.form]).then(result => {
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
