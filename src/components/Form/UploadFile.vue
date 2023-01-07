<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors }"
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules">
    <!--Label-->
    <label
      v-if="label"
      class="label mb-1">
      {{ label }}

      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'" />
    </label>

    <!--Field-->
    <div
      :class="{'has_error': errors[0]}">
      <!--Upload-->
      <div class="upload-image">
        <div v-if="previewUrl || thumbnail"
             class="preview mb-2">
          <!--img-->
          <img
            :src="previewUrl || thumbnail"
            alt="picture">
        </div>

        <div class="upload-action">
          <input
            :id="vid"
            :accept="accept"
            ref="upload"
            type="file"
            @change="handleFileChange">

          <button
            class="btn-select-file"
            @click.prevent="$refs.upload.click()">
            {{ $t('COMMON.select_file') }}
          </button>
        </div>
      </div>

      <!--Message Error-->
      <span
        v-if="errors[0]"
        class="errors">
        {{ errors[0] }}
      </span>
    </div>
  </ValidationProvider>
</template>

<script>
import { uploadImage } from '@/services/uploads.service'

export default {
  name: 'UploadFile',

  props: {
    label: {
      type: String,
      default: ''
    },

    field: {
      type: String,
      default: ''
    },

    rules: {
      type: String,
      default: ''
    },

    vid: {
      type: String,
      default: ''
    },

    accept: {
      type: String,
      default: 'image/*'
    },

    deleteButton: {
      type: Boolean,
      default: false
    },

    thumbnail: {
      type: [String, File],
      default: ''
    }
  },

  data () {
    return {
      previewUrl: null
    }
  },

  methods: {
    async handleFileChange (event) {
      const { valid } = await this.$refs.provider.validate(event)

      if (valid) {
        const file = event.target.files[0]

        if (file) {
          this.previewUrl = URL.createObjectURL(file)
        }

        const formData = new FormData()
        formData.append('files[]', file)
        formData.append('type', 'thumbnail')

        // Call API Upload
        await uploadImage(formData).then(res => {
          if (res.status === 200) {
            // Emit data outside ( maybe include fileId & fileUrl )
            this.$emit('onFileSelect', res.data[0])
          }
        }).catch(err => {
          console.log('err', err.response.data)
        })
      } else {
        this.previewUrl = null
        this.$emit('resetThumbnail')
      }
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
  .upload-image {
    .preview {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      aspect-ratio: 16/9;
      overflow: hidden;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
    .btn-select-file {
      padding: 4px 20px;
      background: #f3f3f3;
      border: 1px solid;
      color: #222222;
      font-weight: bold;
      &:hover {
        background: #e6e6e6;
      }
    }
    input {
      display: none;
    }
  }
</style>
