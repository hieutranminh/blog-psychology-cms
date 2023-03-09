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
                    vid="file"
                    class="mb-3 rectangle-image"
                    @onFileSelect="onUploadImage($event)"
                    @resetThumbnail="form.thumbnail = ''"/>

        <a-row :gutter="16">
          <a-col :span="12">
            <InputField v-model="form.title"
                        vid="title"
                        rules="required|max:200"
                        class="mb-3"
                        :field="$t('COMMON.title')"
                        :label="$t('COMMON.title')"/>
          </a-col>

          <a-col :span="12">
            <InputField v-model="form.additional.author"
                        vid="author"
                        rules="required|max:200"
                        class="mb-3"
                        :field="$t('COMMON.author')"
                        :label="$t('COMMON.author')"/>
          </a-col>

          <a-col :span="12">
            <SelectField v-model="form.type"
                         class="mb-3"
                         rules="required"
                         :placeholder="$t('COMMON.chose_option')"
                         :field="$t('COMMON.type_post')"
                         :label="$t('COMMON.type_post')"
                         :options="OPTION_POST_TYPE"
                         @change="form.additional.is_popular = false"/>

            <div v-if="form.type === 'news'" class="field mb-3">
              <label
                class="mb-1"
                v-text="$t('POSTS.popular')"/>

              <div>
                <a-switch v-model="form.additional.is_popular" />
              </div>
            </div>
          </a-col>

          <a-col :span="12">
            <SelectFieldDynamic v-model="form.tags"
                                vid="tag"
                                class="mb-3"
                                mode="multiple"
                                :field="$t('TAG.name')"
                                :label="$t('TAG.name')"
                                :options="this.optionTags"/>
          </a-col>
        </a-row>

        <TextAreaField v-model="form.description"
                       vid="description"
                       rules="required|max:500"
                       class="mb-3"
                       :field="$t('COMMON.description')"
                       :label="$t('COMMON.description')"/>

        <EditorTinyMCE v-model="form.content"
                       vid="content"
                       :field="$t('COMMON.content')"
                       :label="$t('COMMON.content')"/>
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
import EditorTinyMCE from '@/components/Form/EditorTinyMCE'
import SelectField from '@/components/Form/SelectField'
import FormMixin from '@/mixins/form.mixin'
import { OPTION_POST_TYPE } from '@/enum/option'
import SelectFieldDynamic from '@/components/Form/SelectFieldDynamic'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    SelectFieldDynamic,
    SelectField,
    EditorTinyMCE,
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
        category: '',
        content: '',
        tags: [],
        thumbnail: '',
        fileIds: [],
        is_published: 1,
        additional: {
          author: '',
          is_popular: false
        }
      },
      OPTION_POST_TYPE
    }
  },

  created () {
    if (this.$route.name === 'posts.edit') {
      this.form.title = this.detail.title
      this.form.description = this.detail.description
      this.form.type = this.detail.type
      this.form.content = this.detail.content
      this.form.tags = this.detail.tags.map(tag => tag.id)
      this.form.thumbnail = this.detail.images[0].url
      this.form.fileIds = [this.detail.images[0].id]
      this.form.is_published = this.detail.is_published ? 1 : 0
      this.form.additional.is_popular = this.detail.additional.is_popular
      this.form.additional.author = this.detail.additional.author
    }
  },

  computed: {
    ...mapState('posts', ['detail']),
    ...mapState('tag', ['list']),

    optionTags () {
      return {
        list: this.list,
        id: 'id',
        name: 'title'
      }
    }
  },

  methods: {
    ...mapActions('posts', ['createPost', 'updatePost']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      return this.$route.name === 'posts.create'
        ? this.handleCreate()
        : this.handleUpdate()
    },

    handleCreate () {
      this.createPost(this.form).then(result => {
        if ('status' in result && result.status === 201) {
          this.$router.push({ name: 'posts' })
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
          this.$router.push({ name: 'posts' })
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
