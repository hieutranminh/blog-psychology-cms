<template>
  <div class="container">
    <!--Action top-->
    <div class="top d-flex justify-content-between border-bottom pb-3">
      <router-link :to="{ name: 'user' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>
    </div>

    <!--BLOCK-->
    <div class="block-info border-bottom">
      <!--Notify user delete-->
      <template v-if="detail.deleted_at">
        <h2 class="pt-3 mark-delete">{{ $t('USER.user_delete') }}</h2>

        <div class="p-4 pb-2">
          <div class="d-flex">
            <label class="form-label mb-0"
                   v-text="$t('USER.time_delete_account')"/>
            <p class="mb-0">
              {{ detail.deleted_at | formatDate('YYYY/MM/DD HH:mm') }}
            </p>
          </div>
        </div>
      </template>

      <!--Notify user inactive-->
      <h2 v-if="!detail.deleted_at && detail.status === 0"
          class="pt-3 mark-delete">{{ $t('USER.user_inactive') }}</h2>

      <!--Title-->
      <h2 class="pt-3">{{ $t('USER.info') }}</h2>

      <!--Info-->
      <div class="form-info p-4">
        <!--nickname-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.name')"/>
          <p v-text="detail.nickname"/>
        </div>

        <!--email-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.email')"/>
          <p v-text="detail.email"/>
        </div>

        <!--is_sns-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.link_sns')"/>
          <p>{{ detail.is_sns | getNameFromEnum(OPTION_LINK_SNS) }}</p>
        </div>

        <!--last_login_at-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.time_login_last')"/>
          <p>{{ detail.last_login_at | formatDate('YYYY/MM/DD HH:mm') }}</p>
        </div>

        <!--invite_friend_amount-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.invited_friend')"/>
          <p v-text="detail.invite_friend_amount || 0 + '人'"/>
        </div>

        <!--career-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.career')"/>
          <p>{{ detail.career | getNameFromEnum(OPTION_CAREER) }}</p>
        </div>

        <!--income_of_family-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.income_of_family')"/>
          <p>{{ detail.income_of_family | getNameFromEnum(OPTION_INCOME_OF_FAMILY) }}</p>
        </div>

        <!--marriage_status-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.marriage_status')"/>
          <p>{{ detail.marriage_status | getNameFromEnum(OPTION_MARRIAGE_STATUS) }}</p>
        </div>

        <!--person_living_together-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.person_living_together')"/>
          <p v-if="detail.person_living_together"
             v-text="detail.person_living_together + '人'"/>
        </div>

        <!--residence_status-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.residence_status')"/>
          <p>{{ detail.residence_status | getNameFromEnum(OPTION_RESIDENCE_STATUS) }}</p>
        </div>

        <!--interest-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.interest')"/>
          <p>{{ detail.interest | getNameFromEnum(OPTION_INTEREST) }}</p>
        </div>
      </div>
    </div>

    <!--BLOCK-->
    <div class="block-info border-bottom">
      <h2 class="pt-3">{{ $t('USER.email_reception_settings') }}</h2>

      <div class="form-info p-4">
        <!--is_survey_email-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.survey_mail')"/>
          <p>{{ detail.is_survey_email | getNameFromEnum(OPTION_YES_NO) }}</p>
        </div>

        <!--is_transaction_email-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.transaction_mail')"/>
          <p>{{ detail.is_transaction_email | getNameFromEnum(OPTION_YES_NO) }}</p>
        </div>

        <!--is_magazine_email-->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.magazine_mail')"/>
          <p>{{ detail.is_magazine_email | getNameFromEnum(OPTION_YES_NO) }}</p>
        </div>
      </div>
    </div>

    <!--BLOCK point detail -->
    <div class="block-info border-bottom pb-3">
      <div class="d-flex align-items-center justify-content-between mb-3 pt-3">
        <h2>{{ $t('USER.point_details') }}</h2>

        <template v-if="!detail.deleted_at && roleName !== 'viewer'">
          <router-link v-if="detail.status !== 0"
                       :to="{ name: 'user.edit', params: {id: detail.id} }"
                       custom
                       v-slot="{ navigate }">
            <a-button @click="navigate"
                      type="primary"
                      v-text="$t('BUTTON.edit_manual')"/>
          </router-link>
        </template>
      </div>

      <div class="form-info">
        <!-- current point -->
        <div class="d-flex">
          <label class="form-label mb-3"
                 v-text="$t('USER.current_point')"/>
          <p>{{ detail.total_point_amount | numberWithCommas(',', 'pt') }}</p>
        </div>

        <!-- point expiration date -->
        <div class="d-flex">
          <label class="form-label mb-3 font-weight-normal"
                 v-text="$t('USER.point_expiration_date')"/>
          <p v-if="(detail.total_point_amount > 0) && detail.valid_point_to">
            {{ detail.valid_point_to | formatDate('YYYY/MM/DD') }}
          </p>
          <p v-else>
            -
          </p>
        </div>

        <!-- TABLE -->
        <a-table :columns="columnPointDetail"
                 :data-source="pointDetail.data"
                 :locale="{emptyText: $t('COMMON.empty_data')}"
                 :pagination="false"
                 class="table-common"
                 rowKey="id"
                 size="small"
                 bordered>
          <!--status-->
          <template slot="status"
                    slot-scope="status">
            {{ status | getNameFromEnum(OPTION_STATUS_POINT_DETAIL) }}
          </template>

          <!--used_datetime-->
          <template slot="used_datetime"
                    slot-scope="record">
            {{ (record.transaction_type === 6 ? record.updated_at : record.created_at) | formatDate('YYYY/MM/DD HH:mm') }}
          </template>

          <!--approval_date-->
          <template slot="approval_date"
                    slot-scope="date">
            {{ date | formatDate('YYYY/MM/DD HH:mm')}}
          </template>

          <!--transaction_type-->
          <template slot="transaction_type"
                    slot-scope="record">
            {{ getTransactionType(record) }}
          </template>

          <!--pointback_amount-->
          <template slot="pointback_amount"
                    slot-scope="text">
            {{ (text > 0 ? '+' : '') + text | numberWithCommas(',', 'pt')}}
          </template>
        </a-table>

        <!--PAGINATION-->
        <Pagination v-if="pointDetail.data.length"
                    class="mt-4 text-right"
                    :total="pointDetail.pagination.total"
                    :current-page="pointDetail.pagination.currentPage"
                    :page-size="pointDetail.pagination.perPage"
                    :show-size-changer="false"
                    @changePage="changePage('point-detail', $event)"/>
      </div>
    </div>

    <!--BLOCK point exchange history -->
    <div class="block-info border-bottom pb-3">
      <h2 class="pt-3 mb-3">{{ $t('USER.point_exchange_history') }}</h2>

      <!-- table point detail -->
      <a-table :columns="columnPointExchangeHistory"
               :data-source="pointExchange.data"
               :locale="{emptyText: $t('COMMON.empty_data')}"
               :pagination="false"
               class="table-common"
               rowKey="id"
               size="small"
               bordered>

        <!--status-->
        <template slot="status"
                  slot-scope="status">
          {{ status | getNameFromEnum(OPTION_STATUS_POINT_DETAIL) }}
        </template>

        <!--created_at-->
        <template slot="created_at"
                  slot-scope="date">
          {{ date | formatDate('YYYY/MM/DD HH:mm')}}
        </template>

        <!--approval_date-->
        <template slot="approval_date"
                  slot-scope="date">
          {{ date | formatDate('YYYY/MM/DD HH:mm')}}
        </template>

        <!--exchange_service_id-->
        <template slot="exchange_service_id"
                  slot-scope="serviceId">
          {{ parseInt(serviceId) | getNameFromEnum(OPTION_SERVICE_TYPE)}}
        </template>

        <!--exchange_point_amount-->
        <template slot="exchange_point_amount"
                  slot-scope="text">
          {{text | numberWithCommas(',', 'pt')}}
        </template>
      </a-table>

      <!--PAGINATION-->
      <Pagination v-if="pointExchange.data.length"
                    class="mt-4 text-right"
                    :total="pointExchange.pagination.total"
                    :current-page="pointExchange.pagination.currentPage"
                    :page-size="pointExchange.pagination.perPage"
                    :show-size-changer="false"
                    @changePage="changePage('point-exchange', $event)"/>
    </div>

    <!--BLOCK Point edit history -->
    <div class="block-info pb-3">
      <h2 class="pt-3 mb-3">{{ $t('USER.point_edit_history') }}</h2>

      <!-- table point detail -->
      <a-table :columns="columnPointEditHistory"
               :data-source="pointEdit.data"
               :locale="{emptyText: $t('COMMON.empty_data')}"
               :pagination="false"
               class="table-common"
               rowKey="id"
               size="small"
               bordered>

        <!--created_at-->
        <template slot="created_at"
                  slot-scope="date">
          {{ date | formatDate('YYYY/MM/DD HH:mm')}}
        </template>

        <!--pointback_amount-->
        <template slot="pointback_amount"
                  slot-scope="text">
          {{ (text > 0 ? '+' : '') + text | numberWithCommas(',', 'pt')}}
        </template>
      </a-table>

      <!--PAGINATION-->
      <Pagination v-if="pointEdit.data.length"
                    class="mt-4 text-right"
                    :total="pointEdit.pagination.total"
                    :current-page="pointEdit.pagination.currentPage"
                    :page-size="pointEdit.pagination.perPage"
                    :show-size-changer="false"
                    @changePage="changePage('point-edit', $event)"/>
    </div>

    <!--Action bottom-->
    <div class="bottom d-flex justify-content-between border-top pt-3 text-center">
      <router-link :to="{ name: 'user' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>

      <div v-if="roleName !== 'viewer'">
        <!--Delete & Cancel delete-->
        <a-popconfirm :title="!detail.deleted_at ? $t('COMMON.alert_delete_user') : $t('COMMON.alert_cancel_delete')"
                      :ok-text="$t('COMMON.tooltip_setting')"
                      :cancel-text="$t('COMMON.tooltip_cancel')"
                      placement="topLeft"
                      @confirm="!detail.deleted_at ? deleteAccount() : cancelDeleteAccount()">
          <a-button type="danger"
                    v-text="!detail.deleted_at ? $t('BUTTON.delete_account') : $t('BUTTON.cancel_delete_account')"/>
        </a-popconfirm>

        <!--Deactivate & Reactive-->
        <a-popconfirm v-if="!detail.deleted_at"
                      :title="detail.status === 1 ? $t('COMMON.alert_deactivate_user') : $t('COMMON.alert_reactive_user')"
                      :ok-text="$t('COMMON.tooltip_setting')"
                      :cancel-text="$t('COMMON.tooltip_cancel')"
                      placement="topLeft"
                      @confirm="handleActiveUser">
          <a-button :type="detail.status === 1 ? 'danger' : 'primary'"
                    class="ml-2"
                    v-text="detail.status === 1 ? $t('BUTTON.inactive') : $t('BUTTON.reactive_user')"/>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState, mapGetters } from 'vuex'
// Components
import Pagination from '@/components/Pagination'
// Other
import {
  OPTION_INCOME_OF_FAMILY,
  OPTION_LINK_SNS,
  OPTION_MARRIAGE_STATUS,
  OPTION_RESIDENCE_STATUS,
  OPTION_INTEREST,
  OPTION_CAREER,
  OPTION_YES_NO,
  OPTION_STATUS_POINT_DETAIL, OPTION_SERVICE_TYPE
} from '@/enum/option'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Detail',

  mixins: [FormMixin],

  components: { Pagination },

  data () {
    return {
      params: {
        'filters[user_id]': this.$route.params.id,
        page: 1,
        perPage: 10,
        orderBy: 'created_at',
        sortedBy: 'desc'
      },
      OPTION_LINK_SNS,
      OPTION_CAREER,
      OPTION_MARRIAGE_STATUS,
      OPTION_INCOME_OF_FAMILY,
      OPTION_RESIDENCE_STATUS,
      OPTION_INTEREST,
      OPTION_YES_NO,
      OPTION_STATUS_POINT_DETAIL,
      OPTION_SERVICE_TYPE
    }
  },

  beforeRouteEnter (to, from, next) {
    const paramsFunc = (arrType, include = '') => {
      return {
        'filters[user_id]': to.params.id,
        'filters[type]': arrType,
        page: 1,
        perPage: 10,
        orderBy: 'created_at',
        sortedBy: 'desc',
        with: include
      }
    }

    return Promise.allSettled([
      store.dispatch('user/getUserByID', [to.params.id, {}]),
      store.dispatch('transaction/getPointDetail', paramsFunc([1, 5, 6, 8], 'advertise')),
      store.dispatch('transaction/getPointExchangeHistory', paramsFunc([2])),
      store.dispatch('transaction/getPointEditHistory', paramsFunc([5], 'admin'))
    ]).then(_ => next())
  },

  computed: {
    // State
    ...mapState('user', ['detail']),
    ...mapState('transaction', ['pointDetail', 'pointExchange', 'pointEdit']),
    // Getter
    ...mapGetters('auth', ['roleName']),

    columnPointDetail () {
      return [
        {
          title: this.$t('TABLE_POINT_DETAIL.status_user'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('TABLE_POINT_DETAIL.used_datetime'),
          scopedSlots: { customRender: 'used_datetime' }
        },
        {
          title: this.$t('TABLE_POINT_DETAIL.earned_datetime'),
          dataIndex: 'approval_date',
          scopedSlots: { customRender: 'approval_date' }
        },
        {
          title: this.$t('TABLE_POINT_DETAIL.given_from'),
          scopedSlots: { customRender: 'transaction_type' }
        },
        {
          title: this.$t('TABLE_POINT_DETAIL.point'),
          dataIndex: 'pointback_amount',
          scopedSlots: { customRender: 'pointback_amount' }
        }
      ]
    },

    columnPointExchangeHistory () {
      return [
        {
          title: this.$t('TABLE_POINT_EXCHANGE_HISTORY.status_user'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('TABLE_POINT_EXCHANGE_HISTORY.application_datetime'),
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'created_at' }
        },
        {
          title: this.$t('TABLE_POINT_EXCHANGE_HISTORY.exchange_completion_datetime'),
          dataIndex: 'approval_date',
          scopedSlots: { customRender: 'approval_date' }
        },
        {
          title: this.$t('TABLE_POINT_EXCHANGE_HISTORY.exchange_service_name'),
          dataIndex: 'exchange_service_id',
          scopedSlots: { customRender: 'exchange_service_id' }
        },
        {
          title: this.$t('TABLE_POINT_EXCHANGE_HISTORY.point'),
          dataIndex: 'exchange_point_amount',
          scopedSlots: { customRender: 'exchange_point_amount' }
        }
      ]
    },

    columnPointEditHistory () {
      return [
        {
          title: this.$t('TABLE_POINT_EDIT_HISTORY.date_edit'),
          dataIndex: 'created_at',
          width: 150,
          scopedSlots: { customRender: 'created_at' }
        },
        {
          title: this.$t('TABLE_POINT_EDIT_HISTORY.point'),
          dataIndex: 'pointback_amount',
          width: 150,
          scopedSlots: { customRender: 'pointback_amount' }
        },
        {
          title: this.$t('TABLE_POINT_EDIT_HISTORY.field'),
          width: 150,
          dataIndex: 'item_name'
        },
        {
          title: this.$t('TABLE_POINT_EDIT_HISTORY.operator'),
          width: 150,
          dataIndex: 'admin.name'
        },
        {
          title: this.$t('TABLE_POINT_EDIT_HISTORY.note'),
          dataIndex: 'note'
        }
      ]
    }
  },

  methods: {
    // ACTION
    ...mapActions('user', ['getUserByID', 'removeUser', 'cancelRemoveUser', 'uploadStatusUser']),
    ...mapActions('transaction', ['getPointDetail', 'getPointExchangeHistory', 'getPointEditHistory']),

    changePage (type, num) {
      this.params = {
        ...this.params,
        page: num
      }

      this.fetchList(type, this.params)
    },

    deleteAccount () {
      this.removeUser(this.detail.id).then(result => {
        if (result) {
          this.fetchDetail()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    },

    cancelDeleteAccount () {
      this.cancelRemoveUser(this.detail.id).then(result => {
        if (result) {
          this.fetchDetail()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    },

    handleActiveUser () {
      const params = {
        status: this.detail.status === 1 ? 0 : 1
      }

      this.uploadStatusUser([this.detail.id, params]).then(result => {
        if (result.success) {
          this.fetchDetail()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_update_fail'))
        }
      })
    },

    getTransactionType (record) {
      let text = ''
      switch (record.transaction_type) {
        case 1:
          text = record.advertise ? record.advertise.title : ''
          break
        case 5:
          text = record.item_name
          break
        case 6:
          text = '友達紹介キャンペーン'
          break
        case 8:
          text = 'シェア'
          break
      }

      return text
    },

    // FETCH DETAIL
    fetchDetail (params = {}) {
      this.getUserByID([this.detail.id, params])
    },

    // FETCH LIST
    fetchList (type, params = {}) {
      type === 'point-detail' && this.getPointDetail({ ...params, 'filters[type]': [1, 5, 6, 8], with: 'advertise' })
      type === 'point-exchange' && this.getPointExchangeHistory({ ...params, 'filters[type]': [2] })
      type === 'point-edit' && this.getPointEditHistory({ ...params, 'filters[type]': [5], with: 'admin' })
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
.form-label {
  width: 230px;
  font-weight: bold;
}

.mark-delete {
  color: #ff0000;
}
</style>
