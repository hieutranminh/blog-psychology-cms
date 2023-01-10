<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
    v-slot="{ errors }">
    <!-- Label -->
    <label
        v-if="label"
        class="mb-1">
      {{ label }}
      <span
          v-if="rules.includes('required')"
          class="required"
          v-text="'*'"
      />
    </label>

    <div :class="{ 'has_error': errors[0] }">
      <!--Editor-->
      <Editor :value="value"
              :api-key="apiKeyMCE"
              :init="settingEditor"
              @input="onInput($event)"/>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]"/>
    </div>
  </ValidationProvider>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { uploadImage } from '@/services/uploads.service'

export default {
  name: 'EditorTinyMCE',

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    Editor
  },

  props: {
    label: { type: String, default: '' },
    vid: { type: String, default: '' },
    value: { type: String, default: '' },
    field: { type: String, default: '' },
    rules: { type: String, default: '' }
  },

  data () {
    return {
      apiKeyMCE: process.env.VUE_APP_KEY_API_TINYMCE,
      settingEditor: {
        height: 500,
        width: '100%',
        deprecation_warnings: false,
        plugins: 'print preview paste code fullscreen image link table hr pagebreak anchor toc insertdatetime lists wordcount',
        menubar: 'file edit view insert format tools table tc help',
        toolbar: 'undo redo | image table | fontselect fontsizeselect | formatselect | lineheight bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        file_picker_types: 'image',
        images_file_types: 'jpeg,jpg,png,gif,webp',
        images_upload_handler: this.handleUploadImage,
        language: 'en'
      }
    }
  },

  methods: {
    uploadImage,

    onInput (value) {
      this.$emit('change', value)
    },

    handleUploadImage (blobInfo, success, failure, progress) {
      const formData = new FormData()
      formData.append('files[]', blobInfo.blob(), blobInfo.filename())
      formData.append('type', 'thumbnail')

      this.uploadImage(formData)
        .then(res => success(res.data[0].url))
        .catch(err => {
          if (err.response.data.code === 422) {
            failure(err.response.data.errors[0].message)
          } else {
            failure('Error')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 4px;
  font-weight: bold;
  color: #222222;
}
</style>
