<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="form-common"
    @submit.prevent="validateBeforeSubmit()">

    <!--Action top-->
    <div class="top border-bottom pb-3">
      <router-link :to="{ name: 'user.detail', params: {id: detail.id} }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>
    </div>

    <div class="form-container pl-0 pr-0">
      <h2 class="mb-4"
          v-text="$t('USER.info_basic_user')"/>

      <div class="field mb-4">
        <label class="ml-4"
               v-text="$t('USER.owned_point')"/>

        <p>{{ detail.total_point_amount | numberWithCommas(',', 'pt') }}</p>
      </div>

      <div class="field mb-4">
        <label class="ml-4"
               v-text="$t('USER.name')"/>

        <p v-text="detail.nickname"/>
      </div>

      <div class="field mb-4">
        <label class="ml-4"
               v-text="$t('USER.email')"/>

        <p v-text="detail.email"/>
      </div>

      <h2 class="mb-4"
          v-text="$t('USER.give_erase_point')"/>

      <div class="field field-point mb-4">
        <label class="mt-1 ml-4">
          {{$t('COMMON.point')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <InputNumberField v-model.number="form.point"
                          class="w-350"
                          digit-text="pt"
                          vid="point"
                          field="COMMON.point"
                          :rules="{ required: true, compare_user_point: {currentPoint: detail.total_point_amount, newPoint: form.point }}"
                          :minNumber="-Infinity"
                          :formatter-regex="/\B(?=(\d{3})+(?!\d))/g"
                          :parser-regex="/[^-+?0-9]*/g"/>
      </div>

      <div class="field mb-4">
        <label class="mt-1 ml-4">
          {{$t('FIELD.field')}}
          <span class="required"
                v-text="'*'"/>
        </label>

        <InputField v-model="form.item_name"
                    class="w-350"
                    rules="required|max:200"
                    field="FIELD.field"
                    vid="field"
                    :maxlength="200"/>
      </div>

      <div class="field mb-4">
        <label class="mt-1 ml-4"
               v-text="$t('FIELD.note')"/>

        <TextAreaField v-model="form.note"
                       rules="note_max:2000"
                       class="w-350"
                       vid="note"
                       :field="$t('FIELD.note')"
                       :maxlength="2000"/>
      </div>
    </div>

    <!--Action bottom-->
    <div class="bottom position-relative border-top pt-3 text-center">
      <router-link :to="{ name: 'user.detail', params: {id: detail.id}} "
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  class="position-absolute left-0"
                  v-text="$t('BUTTON.cancel')"/>
      </router-link>

      <a-popconfirm :title="$t('COMMON.alert_setting_user_content')"
                    :ok-text="$t('BUTTON.submit')"
                    :cancel-text="$t('COMMON.tooltip_cancel')"
                    placement="top"
                    @confirm="validateBeforeSubmit">
        <a-button type="primary"
                  class="m-auto"
                  v-text="$t('BUTTON.submit')"/>
      </a-popconfirm>
    </div>
  </ValidationObserver>
</template>

<script>
// Store
import { mapState, mapActions } from 'vuex'
// Components
import InputField from '@/components/Form/InputField'
import InputNumberField from '@/components/Form/InputNumberField'
import TextAreaField from '@/components/Form/TextAreaField'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Form',

  mixins: [FormMixin],

  components: {
    TextAreaField,
    InputNumberField,
    InputField
  },

  data () {
    return {
      form: {
        point: '',
        item_name: '',
        note: ''
      }
    }
  },

  created () {
    if (this.$route.name === 'user.edit') {
      // this.form.point = this.detail.total_point_amount
    }
  },

  computed: {
    ...mapState('user', ['detail'])
  },

  methods: {
    ...mapActions('user', ['updatePointUser']),

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleUpdate()
      }
    },

    handleUpdate () {
      this.updatePointUser([this.detail.id, this.form]).then(result => {
        if (result) {
          this.$router.push({ name: 'user.detail', params: { id: this.detail.id } })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_update_fail'))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 18px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 0;
}
.field {
  display: flex;
  align-items: flex-start;
  & > label {
    flex-shrink: 0;
    margin: 0;
    font-weight: bold;
    min-width: 230px;
  }
  p {
    flex: 1;
    margin-bottom: 0;
  }
}
</style>
