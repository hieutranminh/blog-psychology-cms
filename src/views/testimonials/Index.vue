<template>
  <div class="posts">
    <div class="container mb-3">
      <Search @filter-changed="onFilterChange($event)"/>
    </div>

    <div class="container">
    <!-- ACTIONS -->
    <div class="text-right mb-3">
      <router-link
          :to="{name: 'testimonials.create'}">
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
      <!--rate-->
      <template slot="rate"
                slot-scope="text">
        <Rating :star="text"/>
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
                slot-scope="record">
        <div>
          <a-tag :color="record.is_published ? '#87d068' : '#BBBBBB'" class="font-weight-bold mr-0">
            {{ record.is_published ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
          </a-tag>
        </div>
      </template>

      <!--Action-->
      <template slot="action"
                slot-scope="record">

        <router-link :to="{ name: 'testimonials.edit', params: {id: record.id} }"
                     custom
                     v-slot="{ navigate }">
          <a-button @click="navigate"
                    icon="edit"
                    size="small"
                    type="primary" class="mr-1"/>
        </router-link>

        <a-popconfirm :title="$t('NOTIFICATION.msg_delete_confirm')"
                      :ok-text="$t('BUTTON.delete')"
                      :cancel-text="$t('BUTTON.back')"
                      placement="topLeft"
                      @confirm="deleteRecord(record.id)">
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
          :to="{name: 'testimonials.create'}">
        <a-button
            type="primary"
            class="font-weight-bold"
            icon="plus">
          {{$t('BUTTON.create')}}
        </a-button>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState } from 'vuex'
// Components
import Rating from '@/components/Rating'
import Pagination from '@/components/Pagination'
import Search from '@/views/testimonials/Search'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Index',

  components: {
    Search,
    Pagination,
    Rating
  },

  mixins: [FormMixin],

  data () {
    return {
      params: {
        page: 1,
        perPage: 10,
        fields: 'id,title,description,created_at,updated_at,is_published,additional',
        'filters[type]': 'testimonials'
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 10,
      fields: 'id,title,description,created_at,updated_at,is_published,additional',
      'filters[type]': 'testimonials'
    }
    store.dispatch('postTestimonial/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('postTestimonial', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('TESTIMONIALS.name'),
          dataIndex: 'title'
        },
        {
          title: this.$t('COMMON.content'),
          dataIndex: 'description'
        },
        {
          title: this.$t('TESTIMONIALS.rate'),
          dataIndex: 'additional.star',
          scopedSlots: { customRender: 'rate' }
        },
        {
          title: this.$t('COMMON.date'),
          width: 160,
          scopedSlots: { customRender: 'date' }
        },
        {
          title: this.$t('COMMON.status'),
          width: 140,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('COMMON.action'),
          align: 'center',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    // Action
    ...mapActions('postTestimonial', ['getList', 'removePost']),

    onFilterChange ($event) {
      const filter = {}
      for (const property in $event) {
        if (property === 'type') {
          filter[`filters[${property}]`] = $event[property] ? $event[property] : 'news,research-development,single'
        } else {
          filter[`filters[${property}]`] = $event[property]
        }
      }

      this.params = {
        ...this.params,
        ...filter,
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

    deleteRecord (id) {
      this.removePost(id).then(result => {
        if (result) {
          this.onSuccess(this.$t('NOTIFICATION.title_completion'), this.$t('NOTIFICATION.msg_delete_success'))
          this.fetchList(this.params)
        } else {
          this.onSuccess(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_delete_fail'))
        }
      })
    },

    copyClipboard (link) {
      navigator.clipboard.writeText(link)
    },

    // FETCH
    fetchList (params = {}) {
      this.getList(params)
    }
  }
}
</script>
