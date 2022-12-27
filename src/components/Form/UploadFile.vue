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
      class="label">
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
      default: ''
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

        // const formData = new FormData()
        // formData.append('file', file)

        // Call API Upload
        // formData file => binary

        // Emit data outside ( maybe include fileId & fileUrl )
        this.$emit('onFileSelect', file)
        this.$emit('onPreview', this.previewUrl)
      } else {
        this.previewUrl = null
        this.thumbnail = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-image {
    .preview {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
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
      padding: 2px 20px;
      background: #f3f3f3;
      border: 1px solid;
      &:hover {
        background: #e6e6e6;
      }
    }
    input {
      display: none;
    }
  }
</style>
