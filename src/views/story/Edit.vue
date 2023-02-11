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
      <a-card
        v-for="(value, key, index) in form.value"
        :key="index"
        :title="$t(`TITLE.manage_${key}`)"
        class="mb-4">
        <a-switch  slot="extra" v-model="form.value[key].display" />

        <a-row :gutter="16">
          <a-col :span="12">
            <UploadFile :rules="form.value[key].thumbnail ? '' : 'required' + '|image'"
                        :thumbnail="form.value[key].thumbnail"
                        :field="$t('COMMON.image')"
                        :label="$t('COMMON.image')"
                        :vid="'file_'+ index"
                        @onFileSelect="form.value[key].thumbnail = $event.url"
                        @resetThumbnail="form.value[key].thumbnail = ''"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.value[key].title"
                        :vid="'title_' + index"
                        rules="required|max:150"
                        class="mb-2"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>

            <a-radio-group v-model="form.value[key].title_align"
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

            <TextAreaField v-model="form.value[key].desc"
                           :vid="'desc_' + index"
                           rules="max:2000"
                           class="mb-2"
                           :field="$t('COMMON.description')"
                           :label="$t('COMMON.description')"/>

            <a-row :gutter="16">
              <a-col span="12">
                <InputField v-model="form.value[key].btn_text"
                            :vid="'btn_text_' + index"
                            rules="max:30"
                            class="mb-2"
                            :field="$t('COMMON.txt_button')"
                            :label="$t('COMMON.txt_button')"/>
              </a-col>
              <a-col span="12">
                <InputField v-model="form.value[key].btn_link"
                            :vid="'btn_link_' + index"
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
// Store
import store from '@/store'
import { mapActions, mapGetters } from 'vuex'
// Components
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
        key: 'we_story',
        value: {
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
          },
          section_03: {
            display: false,
            thumbnail: '',
            title: '',
            title_align: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          },
          section_04: {
            display: false,
            thumbnail: '',
            title: '',
            title_align: '',
            desc: '',
            btn_text: '',
            btn_link: ''
          },
          section_05: {
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
    if (this.dataWeStory) {
      this.form.value = {
        ...this.form.value,
        ...JSON.parse(JSON.stringify(this.dataWeStory))
      }
    }
  },

  computed: {
    ...mapGetters('setting', ['dataWeStory'])
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
          this.$router.push({ name: 'story' })
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
