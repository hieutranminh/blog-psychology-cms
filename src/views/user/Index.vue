<template>
  <div class="user">
    <div class="container">
      <!--SEARCH-->
      <Search v-if="openSearch"
              @filter-changed="onFilterChange($event)"/>

      <!--TOP-->
      <div class="d-flex align-items-center flex-wrap justify-content-between mb-4">
        <div class="btn-group">
          <!--Open Search-->
          <a-button @click.prevent="openSearch = !openSearch"
                    type="primary"
                    v-text="openSearch ? $t('BUTTON.close_search') : $t('BUTTON.open_search')"/>

          <!--Download CSV-->
          <a-button @click.prevent="handleDownloadCSV"
                    class="ml-2"
                    type="primary"
                    v-text="$t('BUTTON.download')"
                    :disabled="!ids.length"/>
        </div>

        <!--PAGINATION-->
        <Pagination v-if="list.length"
                    :total="pagination.total"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.perPage"
                    @changePage="changePage"
                    @changePageSize="pageSizeChange"/>
      </div>

      <!--TABLE-->
      <a-table :row-selection="{ selectedRowKeys: ids, onSelect: onSelect, onSelectAll: onSelectAll, onChange: onSelectChange }"
               :columns="columns"
               :data-source="list"
               :locale="{emptyText: $t('COMMON.empty_data')}"
               :pagination="false"
               :scroll="{ x: 1100 }"
               class="table-common"
               rowKey="id"
               size="small"
               bordered
               @change="handleTableChange">
        <!-- ownership_point -->
        <template slot="total_point_amount"
                  slot-scope="record">
          {{ record | numberWithCommas(',', 'pt') }}
        </template>

        <!--Last login date-->
        <template slot="last_login_at"
                  slot-scope="date">
          {{ date | formatDate('YYYY/MM/DD HH:mm')}}
        </template>

        <!--Action-->
        <template slot="action"
                  slot-scope="record">
          <!--Detail-->
          <router-link :to="{ name: 'user.detail', params: {id: record.id} }"
                       custom
                       v-slot="{ navigate }">
            <a-button @click="navigate"
                      type="primary"
                      size="small"
                      v-text="$t('BUTTON.detail')"/>
          </router-link>
        </template>
      </a-table>

      <!--PAGINATION-->
      <Pagination v-if="list.length"
                  :show-size-changer="false"
                  :total="pagination.total"
                  :current-page="pagination.currentPage"
                  :page-size="pagination.perPage"
                  @changePage="changePage"
                  @changePageSize="pageSizeChange"
                  class="mt-4 text-right" />
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState } from 'vuex'

// Components
import Search from '@/views/user/Search'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  name: 'Index',

  components: {
    Pagination,
    Search
  },

  data () {
    return {
      params: {
        page: 1,
        perPage: 20,
        orderBy: 'created_at',
        sortedBy: 'desc',
        'filters[advertise_id]': store.state.adv.advId
      },
      ids: [],
      is_check_all: false,
      check_user: {
        single_check_user_id: [],
        ignore_check_user_id: [],
        params: null
      },
      openSearch: false
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 20,
      orderBy: 'created_at',
      sortedBy: 'desc',
      'filters[advertise_id]': store.state.adv.advId
    }

    store.dispatch('user/getList', params).then(_ => next())
  },

  beforeRouteLeave (to, from, next) {
    store.commit('adv/SET_ID_ADV', null)
    next()
  },

  computed: {
    // State
    ...mapState('user', ['list', 'pagination', 'userIds']),
    ...mapState('adv', ['advId']),

    columns () {
      return [
        {
          title: this.$t('TABLE_USER.id'),
          dataIndex: 'id',
          width: 250,
          sorter: true
        },
        {
          title: this.$t('TABLE_USER.user_name'),
          dataIndex: 'nickname',
          width: 150
        },
        {
          title: this.$t('TABLE_USER.ownership_point'),
          dataIndex: 'total_point_amount',
          scopedSlots: { customRender: 'total_point_amount' }
        },
        {
          title: this.$t('TABLE_USER.email'),
          dataIndex: 'email',
          width: 200
        },
        {
          title: this.$t('TABLE_USER.time_login_last'),
          dataIndex: 'last_login_at',
          sorter: true,
          scopedSlots: { customRender: 'last_login_at' }
        },
        {
          align: 'center',
          fixed: 'right',
          width: 90,
          scopedSlots: { customRender: 'action' }
        }
      ]
    },

    formatDateFile () {
      return moment().format('YYYYMMDDHHmmss')
    }
  },

  methods: {
    // Action
    ...mapActions('user', ['getList', 'downloadCSV']),

    onSelectChange (selectedRowKeys) {
      this.ids = selectedRowKeys

      if (!this.is_check_all) {
        this.check_user.single_check_user_id = selectedRowKeys
      }
    },

    onSelect (record, selected) {
      if (this.is_check_all) {
        const index = this.check_user.ignore_check_user_id.findIndex(id => id === record.id)

        selected
          ? this.check_user.ignore_check_user_id.splice(index, 1)
          : this.check_user.ignore_check_user_id.push(record.id)
      } else {

      }
    },

    onSelectAll (selected) {
      this.is_check_all = selected
      this.check_user.single_check_user_id = []
      this.check_user.ignore_check_user_id = []

      if (!selected) this.ids = []
    },

    handleTableChange (pagination, filters, sorter) {
      this.params = {
        ...this.params,
        orderBy: sorter.order ? sorter.field : 'created_at',
        sortedBy: sorter.order ? sorter.order.slice(0, -3) : 'desc'
      }

      this.fetchList(this.params)
    },

    handleDownloadCSV () {
      const searchParams = new URLSearchParams()
      const searchKeys = Object.keys(this.params)
      searchKeys.forEach(key => {
        if (this.params[key] && this.params[key].length) {
          if (Array.isArray(this.params[key])) {
            for (let i = 0; i < this.params[key].length; i++) {
              searchParams.append(key + '[]', this.params[key][i])
            }
          } else {
            searchParams.append(key, this.params[key])
          }
        }
      })

      this.check_user = {
        ...this.check_user,
        params: searchParams.toString()
      }

      this.downloadCSV(this.check_user).then(result => {
        this.actionDownload(result)
      })
    },

    actionDownload (result) {
      const link = document.createElement('a')
      const newFileNameExport = ['ユーザー一覧', this.formatDateFile].join('_')
      link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(result))
      link.setAttribute('download', newFileNameExport + '.csv')
      document.body.appendChild(link)
      link.click()
    },

    onFilterChange ($event) {
      this.ids = []
      this.check_user.single_check_user_id = []
      this.check_user.ignore_check_user_id = []
      this.is_check_all = false

      const filter = {}
      for (const property in $event) {
        filter[`filters[${property}]`] = $event[property]
      }

      this.params = {
        ...this.params,
        ...filter,
        page: 1,
        'filters[advertise_id]': null
      }
      this.fetchList(this.params)
    },

    pageSizeChange (size) {
      this.params = {
        ...this.params,
        perPage: size,
        page: 1
      }
      this.fetchList(this.params)
    },

    changePage (num) {
      this.params = {
        ...this.params,
        page: num
      }
      this.fetchList(this.params)
    },

    // FETCH LIST
    fetchList (params = {}) {
      this.getList(params).then(_ => {
        if (this.is_check_all) {
          const newArr = this.userIds.filter(id => !this.check_user.ignore_check_user_id.includes(id))

          this.ids = Array.from(new Set([...this.ids, ...newArr]))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-list {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 0 20px;
  margin-bottom: 20px;
}
</style>
