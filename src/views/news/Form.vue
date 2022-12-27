<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="form-common"
    @submit.prevent="validateBeforeSubmit()">

    <!--Action top-->
    <div class="top border-bottom pb-3">
      <router-link :to="{ name: 'news' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>
    </div>

    <!--FORM-->
    <div class="form-container">

      <!--title-->
      <div class="field mb-4">
        <label class="mt-1">
          {{$t('COMMON.title')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <InputField v-model="form.title"
                    class="w-350"
                    rules="required|max:200"
                    field="COMMON.title"
                    vid="title"/>
      </div>

      <!--category_id-->
      <div class="field mb-4">
        <label class="mt-1">
          {{$t('NEWS.category')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <SelectField v-model="form.category_id"
                     class="w-350"
                     rules="required"
                     field="NEWS.category"
                     vid="category_id"
                     :options="OPTION_CATEGORY_ID"/>
      </div>

      <!--is_published-->
      <div class="field mb-4">
        <label>
          {{$t('COMMON.public_flag')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <a-radio-group v-model="form.is_published">
          <a-radio v-for="item in OPTION_PUBLIC_FLAG"
                   :key="item.id"
                   :value="item.value">
            {{ $t(item.name) }}
          </a-radio>
        </a-radio-group>
      </div>

      <!--public_period-->
      <div class="field mb-4">
        <label class="mt-1">
          {{$t('COMMON.public_period')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <DatePickerRangeField v-model="public_period"
                              field="COMMON.public_period"
                              vid="public_period"
                              :rules="{ required: true, compare_date_range: {start: public_period[0], end: public_period[1]} }"/>
      </div>

      <!--destination_type-->
      <div class="field mb-4">
        <label>
          {{$t('NEWS.transition')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <a-radio-group v-model="form.destination_type"
                       @change="changeDestinationType">
          <a-radio v-for="item in OPTION_DESTINATION"
                   :key="item.id"
                   :value="item.value">
            {{ $t(item.name) }}
          </a-radio>
        </a-radio-group>
      </div>

      <!--description-->
      <div v-if="form.destination_type === 1"
           class="field mb-4">
        <label class="mt-1">
          {{$t('NEWS.content')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <EditorTinyMCE v-model="form.description"
                       rules="required|note_max:50000"
                       field="NEWS.content"
                       vid="description"/>
      </div>

      <!--redirect_url-->
      <div v-else
           class="field mb-4">
        <label class="mt-1">
          {{$t('COMMON.transition_url')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <InputField v-model="form.redirect_url"
                    class="w-350"
                    rules="required|max:200"
                    field="COMMON.transition_url"
                    vid="redirect_url"/>
      </div>
    </div>

    <!--Action bottom-->
    <div class="bottom position-relative border-top pt-3 text-center">
      <router-link :to="{ name: 'news' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  class="position-absolute left-0"
                  v-text="$t('BUTTON.cancel')"/>
      </router-link>

      <a-button type="primary"
                html-type="submit"
                class="m-auto"
                v-text="$t('BUTTON.submit')"/>
    </div>
  </ValidationObserver>
</template>

<script>
// Store
import { mapActions, mapState } from 'vuex'
// Component
import InputField from '@/components/Form/InputField'
import SelectField from '@/components/Form/SelectField'
import DatePickerRangeField from '@/components/Form/DatePickerRangeField'
import EditorTinyMCE from '@/components/Form/EditorTinyMCE'
// Other
import { OPTION_CATEGORY_ID, OPTION_PUBLIC_FLAG, OPTION_DESTINATION } from '@/enum/option'
import FormMixin from '@/mixins/form.mixin'
import moment from 'moment'

export default {
  name: 'Form',

  components: {
    EditorTinyMCE,
    InputField,
    SelectField,
    DatePickerRangeField
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        title: '',
        category_id: '',
        is_published: 0,
        start_datetime: '',
        end_datetime: '',
        destination_type: 1,
        redirect_url: '',
        description: ''
      },
      public_period: [],
      OPTION_CATEGORY_ID,
      OPTION_PUBLIC_FLAG,
      OPTION_DESTINATION
    }
  },

  created () {
    if (this.$route.name === 'news.edit') {
      // Merge detail for form
      this.form = {
        ...this.form,
        ...this.detail
      }

      // Format YYYY-MM-DD HH:mm
      this.public_period = [
        moment(this.detail.start_datetime).format('YYYY-MM-DD HH:mm'),
        moment(this.detail.end_datetime).format('YYYY-MM-DD HH:mm')
      ]
    }
  },

  computed: {
    ...mapState('news', ['detail'])
  },

  methods: {
    // Action
    ...mapActions('news', ['createNews', 'updateNews']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      if (this.$route.name === 'news.create') return this.handleCreate()
      return this.handleUpdate()
    },

    handleCreate () {
      this.form.start_datetime = this.public_period[0]
      this.form.end_datetime = this.public_period[1]
      this.form.destination_type === 1
        ? delete this.form.redirect_url
        : delete this.form.description

      this.createNews(this.form).then(result => {
        if (result.success) {
          this.onSuccess(this.$t('NOTIFICATION.completion'), this.$t('NOTIFICATION.msg_create_success'))
          this.$router.push({ name: 'news' })
        } else {
          this.handleSetErrors(result.errors)
        }
      })
    },

    handleUpdate () {
      this.form.start_datetime = this.public_period[0]
      this.form.end_datetime = this.public_period[1]
      this.form.destination_type === 1
        ? delete this.form.redirect_url
        : delete this.form.description

      this.updateNews({
        id: this.detail.id,
        body: this.form
      }).then(result => {
        if (result.status === 204) {
          this.onSuccess(this.$t('NOTIFICATION.completion'), this.$t('NOTIFICATION.msg_update_success'))
          this.$router.push({ name: 'news' })
        } else {
          this.handleSetErrors(result.errors)
        }
      })
    },

    handleSetErrors (errors) {
      errors.forEach(x => (
        this.$refs.observer.setErrors({
          [x.field]: x.message
        })
      ))
    },

    changeDestinationType () {
      this.form.description = ''
      this.form.redirect_url = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .field {
    display: flex;
    align-items: flex-start;
    & > label {
      flex-shrink: 0;
      margin: 0;
      font-weight: bold;
      min-width: 150px;
    }
  }
</style>
