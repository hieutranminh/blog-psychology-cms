<template>
  <div class="admin">
    <!-- list admin -->
    <div class="container">
      <!-- header list -->
      <div class="d-flex justify-content-between mb-4">
        <router-link :to="{name: 'admin.create'}">
          <a-button
            type="primary"
            v-text="$t('BUTTON.create')"/>
        </router-link>

        <!-- control table list -->
        <Pagination v-if="list.length"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.perPage"
                    :total="pagination.total"
                    @changePage="changePage"
                    @changePageSize="pageSizeChange"/>
      </div>

      <!-- table -->
      <a-table :columns="columns"
               :data-source="list"
               :locale="{emptyText: $t('COMMON.empty_data')}"
               size="small"
               class="table-common"
               :pagination="false"
               rowKey="id"
               bordered>
        <!-- show status -->
        <template slot="showStatus" slot-scope="text">
          {{ $t(OBJECT_STATUS_ADMIN[text]) }}
        </template>

        <!-- show role -->
        <template slot="role" slot-scope="text">
          {{ $t(OBJECT_ROLE[text]) }}
        </template>

        <!--End date-->
        <template slot="last_login_at" slot-scope="date">
          {{ date | formatDate('YYYY/MM/DD HH:mm')}}
        </template>

        <!-- action -->
        <template slot="action" slot-scope="record">
          <router-link :to="{ name: 'admin.detail', params: {id: record.id} }"
                       v-slot="{ navigate }"
                       custom>
            <a-button type="primary"
                      @click="navigate"
                      size="small"
                      v-text="$t('BUTTON.detail')"/>
          </router-link>
        </template>
      </a-table>

      <!-- pagination footer -->
      <Pagination v-if="list.length"
                  :show-size-changer="false"
                  :current-page="pagination.currentPage"
                  :page-size="pagination.perPage"
                  :total="pagination.total"
                  @changePage="changePage"
                  @changePageSize="pageSizeChange"
                  class="mt-4 text-right" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapState } from 'vuex'
import store from '@/store'
import { OBJECT_ROLE, OBJECT_STATUS_ADMIN } from '@/enum/option'

export default {
  name: 'Index',

  components: { Pagination },

  data () {
    return {
      params: {
        page: 1,
        perPage: 20,
        orderBy: 'created_at',
        sortedBy: 'asc'
      },
      OBJECT_ROLE,
      OBJECT_STATUS_ADMIN
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 20,
      orderBy: 'created_at',
      sortedBy: 'asc'
    }
    store.dispatch('admin/getLists', params).then(_ => next())
  },

  computed: {
    ...mapState('admin', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('TABLE_ADMIN.admin_name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('TABLE_ADMIN.active_status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'showStatus' }
        },
        {
          title: this.$t('TABLE_ADMIN.role'),
          dataIndex: 'role',
          scopedSlots: { customRender: 'role' }
        },
        {
          title: this.$t('TABLE_ADMIN.time_login_last'),
          dataIndex: 'last_login_at',
          scopedSlots: { customRender: 'last_login_at' }
        },
        {
          align: 'center',
          width: 90,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    // ACTIONS
    ...mapActions('admin', ['getLists']),

    pageSizeChange (pageSize) {
      this.params = {
        ...this.params,
        perPage: pageSize,
        page: 1
      }

      this.fetchList(this.params)
    },

    changePage (pageNumber) {
      this.params = {
        ...this.params,
        page: pageNumber
      }
      this.fetchList(this.params)
    },

    fetchList (params) {
      this.getLists(params)
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
