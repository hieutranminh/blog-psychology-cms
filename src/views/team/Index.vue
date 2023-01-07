<template>
  <div class="container">
    <!-- ACTIONS -->
    <div class="text-right mb-3">
      <router-link
          :to="{name: 'team.create'}">
        <a-button
            type="primary"
            class="font-weight-bold"
            icon="plus">
          {{$t('BUTTON.create')}}
        </a-button>
      </router-link>
    </div>

    <!--PAGINATION-->
    <Pagination :show-size-changer="false"
                :total="pagination.total"
                :current-page="pagination.currentPage"
                :page-size="pagination.perPage"
                @changePage="changePage"
                class="text-right mb-3"/>

    <!-- TABLE -->
    <a-table :columns="columns"
             :data-source="list"
             :locale="{emptyText: $t('COMMON.empty_data')}"
             :pagination="false"
             rowKey="id"
             bordered>
      <!--image-->
      <template slot="image"
                slot-scope="record">
        <img :src="record.images[0].url | imageEmpty" alt="pic" style="border-radius: 50%;">
      </template>

      <!--date-->
      <template slot="date"
                slot-scope="record">
        <div class="mb-1">
          <p v-text="$t('COMMON.created_at')+':'" class="mb-0 font-weight-bold" style="font-size: 12px"/>
          <span>{{ record.created_at | formatDate() }}</span>
        </div>
        <div>
          <p v-text="$t('COMMON.updated_at')+':'" class="mb-0 font-weight-bold" style="font-size: 12px"/>
          <span>{{ record.updated_at | formatDate() }}</span>
        </div>
      </template>

      <!--status-->
      <template slot="status"
                slot-scope="text">
        <a-tag :color="text ? '#87d068' : '#BBBBBB'" class="font-weight-bold mr-0">
          {{ text ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
        </a-tag>
      </template>

      <!--Action-->
      <template slot="action"
                slot-scope="record">
        <router-link :to="{ name: 'team.edit', params: {id: record.id} }"
                     custom
                     v-slot="{ navigate }">
          <a-button @click="navigate"
                    icon="edit"
                    size="small"
                    type="primary" class="mr-2"/>
        </router-link>

        <a-popconfirm :title="$t('NOTIFICATION.msg_delete_confirm')"
                      :ok-text="$t('BUTTON.delete')"
                      :cancel-text="$t('BUTTON.back')"
                      placement="topLeft"
                      @confirm="handleDelete">
          <a-button type="danger"
                    size="small"
                    icon="delete"/>
        </a-popconfirm>
      </template>
    </a-table>

    <!--PAGINATION-->
    <Pagination :show-size-changer="false"
                :total="pagination.total"
                :current-page="pagination.currentPage"
                :page-size="pagination.perPage"
                @changePage="changePage"
                class="text-right mt-3" />

    <!-- ACTIONS -->
    <div class="text-right mt-3">
      <router-link
          :to="{name: 'team.create'}">
        <a-button
            type="primary"
            class="font-weight-bold"
            icon="plus">
          {{$t('BUTTON.create')}}
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState } from 'vuex'
// Components
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',

  components: { Pagination },

  data () {
    return {
      params: {
        page: 1,
        perPage: 15,
        'filters[type]': 'team'
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 15,
      'filters[type]': 'team'
    }
    store.dispatch('postTeam/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('postTeam', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('COMMON.image'),
          scopedSlots: { customRender: 'image' },
          width: '100px'
        },
        {
          title: this.$t('COMMON.name'),
          dataIndex: 'title'
        },
        {
          title: this.$t('COMMON.position'),
          dataIndex: 'description'
        },
        {
          title: this.$t('COMMON.date'),
          width: 160,
          scopedSlots: { customRender: 'date' }
        },
        {
          title: this.$t('COMMON.status'),
          dataIndex: 'is_published',
          width: 100,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('COMMON.action'),
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    // Action
    ...mapActions('postTeam', ['getList']),

    changePage (num) {
      this.params = {
        ...this.params,
        page: num
      }
      this.fetchList(this.params)
    },

    handleDelete () {
      // this.removeBanner(this.detail.id).then(result => {
      //   if (result) {
      //     this.onSuccess(this.$t('completion'), this.$t('delete_message_successfully'))
      //     this.$router.push({ name: 'banner' })
      //   }
      // })
    },

    // FETCH
    fetchList (params = {}) {
      this.getList(params)
    }
  }
}
</script>
