<template>
  <div class="search border-bottom pb-4 mb-4">
    <!--FIELD nickname-->
    <div class="field mb-3">
      <label class="mt-1"
             v-text="$t('USER.filter_user_name')"/>

      <a-input v-model="filter.nickname"
               class="w-350"/>
    </div>

    <!--FIELD total_point_amount-->
    <div class="field mb-3">
      <label class="mt-1"
             v-text="$t('USER.filter_total_point_amount')"/>

      <div class="field-range w-350">
        <a-input v-model.number="filter.total_point_amount_from"/>
        <span class="ml-1">pt</span>
        <span class="ml-3 mr-3"
              v-text="'~'"/>
        <a-input v-model.number="filter.total_point_amount_to"/>
        <span class="ml-1">pt</span>
      </div>
    </div>

    <!--FIELD invalid_point-->
    <div class="field mb-3">
      <label class="mt-1"
             v-text="$t('USER.filter_invalid_point_period')"/>

      <a-range-picker v-model="invalidDate"
                      show-time
                      class="w-350"
                      value-format="YYYY-MM-DD HH:mm"
                      format="YYYY-MM-DD HH:mm"
                      :locale="locale"
                      :placeholder="[$t('PLACEHOLDER.start_date'), $t('PLACEHOLDER.end_date')]"/>
    </div>

    <!--FIELD is_sns-->
    <div class="field mb-3">
      <label v-text="$t('USER.filter_link_sns')"/>

      <a-checkbox-group v-model="filter.is_sns">
        <a-checkbox v-for="item in OPTION_LINK_SNS"
                    :key="item.id"
                    :value="item.value">
          {{ $t(item.name) }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <!--FIELD member_deleted-->
    <div class="field mb-3">
      <label v-text="$t('USER.filter_member_deleted')"/>

      <a-checkbox-group v-model="filter.member_delete">
        <a-checkbox v-for="item in OPTION_MEMBER_DELETED"
                    :key="item.id"
                    :value="item.value">
          {{ $t(item.name) }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <!--FIELD created_at-->
    <div class="field mb-3">
      <label class="mt-1"
             v-text="$t('USER.filter_time_registration')"/>

      <a-range-picker v-model="createdDate"
                      show-time
                      class="w-350"
                      value-format="YYYY-MM-DD HH:mm"
                      format="YYYY-MM-DD HH:mm"
                      :locale="locale"
                      :placeholder="[$t('PLACEHOLDER.start_date'), $t('PLACEHOLDER.end_date')]"/>
    </div>

    <!--FIELD is_survey_email-->
    <div class="field mb-3">
      <label v-text="$t('USER.filter_survey_mail')"/>

      <a-checkbox-group v-model="filter.is_survey_email">
        <a-checkbox v-for="item in OPTION_YES_NO"
                    :key="item.id"
                    :value="item.value">
          {{ $t(item.name) }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <!--FIELD is_transaction_email-->
    <div class="field mb-3">
      <label v-text="$t('USER.filter_transaction_mail')"/>

      <a-checkbox-group v-model="filter.is_transaction_email">
        <a-checkbox v-for="item in OPTION_YES_NO"
                    :key="item.id"
                    :value="item.value">
          {{ $t(item.name) }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <!--FIELD is_magazine_email-->
    <div class="field mb-3">
      <label v-text="$t('USER.filter_magazine_mail')"/>

      <a-checkbox-group v-model="filter.is_magazine_email">
        <a-checkbox v-for="item in OPTION_YES_NO"
                    :key="item.id"
                    :value="item.value">
          {{ $t(item.name) }}
        </a-checkbox>
      </a-checkbox-group>
    </div>

    <!--ACTION-->
    <div class="btn-group">
      <a-button @click.prevent="reset"
                type="primary"
                class="mr-2"
                v-text="$t('BUTTON.reset')"/>
      <a-button @click.prevent="search"
                type="primary"
                icon="search">
        {{ $t('BUTTON.search') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import { OPTION_LINK_SNS, OPTION_MEMBER_DELETED, OPTION_YES_NO } from '@/enum/option'
import locale from 'ant-design-vue/es/date-picker/locale/ja_JP'

export default {
  name: 'Search',

  data () {
    return {
      filter: {
        nickname: null,
        total_point_amount_from: null,
        total_point_amount_to: null,
        invalid_point_from: null,
        invalid_point_to: null,
        is_sns: [],
        member_delete: [],
        created_at_from: null,
        created_at_to: null,
        is_survey_email: [],
        is_transaction_email: [],
        is_magazine_email: []
      },
      invalidDate: [],
      createdDate: [],
      locale,
      OPTION_LINK_SNS,
      OPTION_MEMBER_DELETED,
      OPTION_YES_NO
    }
  },

  methods: {
    search () {
      this.filter.invalid_point_from = this.invalidDate[0]
      this.filter.invalid_point_to = this.invalidDate[1]
      this.filter.created_at_from = this.createdDate[0]
      this.filter.created_at_to = this.createdDate[1]

      this.$emit('filter-changed', this.filter)
    },

    reset () {
      this.invalidDate = []
      this.createdDate = []

      for (const property in this.filter) {
        if (Array.isArray(this.filter[property])) {
          this.filter[property] = []
        } else {
          this.filter[property] = null
        }
      }

      this.$emit('filter-changed', this.filter)
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
    min-width: 150px;
  }
  &-range {
    display: flex;
    align-items: center;
  }
}
</style>
