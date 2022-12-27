<template>
  <div class="news">
    <!-- list news -->
    <div class="container">
      <!-- header list -->
      <div class="d-flex justify-content-between mb-4">
        <div class="btn-group">
          <router-link v-if="roleName !== 'viewer'"
                       :to="{name: 'news.create'}">
            <a-button
              type="primary"
              v-text="$t('BUTTON.create')"/>
          </router-link>
        </div>

        <!--PAGINATION-->
        <Pagination v-if="list.length"
                    :total="pagination.total"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.perPage"
                    @changePage="changePage"
                    @changePageSize="pageSizeChange"/>
      </div>

      <!-- table -->
      <a-table :columns="columns"
               :data-source="list"
               :locale="{emptyText: $t('COMMON.empty_data')}"
               :pagination="false"
               class="table-common"
               rowKey="id"
               size="small"
               bordered>
        <!--start_datetime-->
        <template slot="destination_type"
                  slot-scope="text">
          {{ text === 1 ? $t('NEWS.radio_screen_detail') : $t('NEWS.radio_description_url') }}
        </template>

        <!--status-->
        <template slot="status"
                  slot-scope="text">
          {{ $t(OBJECT_PUBLIC_STATUS[text])  }}
        </template>

        <!--is_published-->
        <template slot="is_published"
                  slot-scope="text">
          {{ text ? $t('COMMON.public') : $t('COMMON.private')  }}
        </template>

        <!--start_datetime-->
        <template slot="start_datetime"
                  slot-scope="text">
          {{ text | formatDate('YYYY/MM/DD HH:mm') }}
        </template>

        <!--end_datetime-->
        <template slot="end_datetime"
                  slot-scope="text">
          {{ text | formatDate('YYYY/MM/DD HH:mm') }}
        </template>

        <!-- detail -->
        <template slot="detail"
                  slot-scope="_, record">
          <router-link :to="{name: 'news.detail', params: {id: record.id}}">
            <a-button type="primary"
                      size="small"
                      v-html="$t('BUTTON.detail')"/>
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
import Pagination from '@/components/Pagination'
import store from '@/store'
import { mapActions, mapGetters, mapState } from 'vuex'
import { OBJECT_PUBLIC_STATUS } from '@/enum/option'

export default {
  name: 'Index',

  components: { Pagination },

  data () {
    return {
      params: {
        page: 1,
        perPage: 20
      },
      OBJECT_PUBLIC_STATUS
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 20
    }

    store.dispatch('news/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('news', ['list', 'pagination']),
    // Getter
    ...mapGetters('auth', ['roleName']),

    columns () {
      return [
        {
          title: this.$t('COMMON.title'),
          dataIndex: 'title'
        },
        {
          title: this.$t('TABLE_NEWS.transition'),
          dataIndex: 'destination_type',
          width: 100,
          scopedSlots: { customRender: 'destination_type' }
        },
        {
          title: this.$t('COMMON.public_status'),
          dataIndex: 'status',
          width: 100,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('COMMON.public_flag'),
          dataIndex: 'is_published',
          width: 100,
          scopedSlots: { customRender: 'is_published' }
        },
        {
          title: this.$t('COMMON.public_start_date'),
          dataIndex: 'start_datetime',
          width: 140,
          scopedSlots: { customRender: 'start_datetime' }
        },
        {
          title: this.$t('COMMON.public_end_date'),
          dataIndex: 'end_datetime',
          width: 140,
          scopedSlots: { customRender: 'end_datetime' }
        },
        {
          align: 'center',
          width: 90,
          scopedSlots: { customRender: 'detail' }
        }
      ]
    }
  },

  methods: {
    // Action
    ...mapActions('news', ['getList']),

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
      this.getList(params)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
