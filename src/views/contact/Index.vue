<template>
  <div class="contact">
    <div class="container mb-3">
      <Search @filter-changed="onFilterChange($event)"/>
    </div>

    <div class="container">
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
          <img :src="record.images[0].url | imageEmpty"
               alt="pic"
               loading="lazy"
               style="border-radius: 50%; aspect-ratio: 4/3;">
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
          <a-tag :color="record.status === 'new' ? 'orange' : '#BBBBBB'" class="font-weight-bold mr-0 mb-2">
            {{ OBJECT_CONTACT[record.status] }}
          </a-tag>
        </template>

        <!--Action-->
        <template slot="action"
                  slot-scope="record">
          <router-link :to="{ name: 'contact.edit', params: {id: record.id} }"
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
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState } from 'vuex'
// Components
import Pagination from '@/components/Pagination'
import Search from '@/views/contact/Search'
import FormMixin from '@/mixins/form.mixin'
import { OBJECT_CONTACT } from '@/enum/option'

export default {
  name: 'Index',

  components: {
    Search,
    Pagination
  },

  mixins: [FormMixin],

  data () {
    return {
      params: {
        page: 1,
        perPage: 10
      },
      OBJECT_CONTACT
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 10
    }
    store.dispatch('contact/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('contact', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('COMMON.name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('COMMON.email'),
          dataIndex: 'email'
        },
        {
          title: this.$t('COMMON.phone'),
          dataIndex: 'phone_number',
          width: 100
        },
        {
          title: this.$t('COMMON.note'),
          dataIndex: 'note',
          width: 250
        },
        {
          title: this.$t('COMMON.status'),
          width: 160,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('COMMON.date'),
          width: 160,
          scopedSlots: { customRender: 'date' }
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
    ...mapActions('contact', ['getList', 'removeContact']),

    onFilterChange ($event) {
      const filter = {}
      for (const property in $event) {
        filter[`filters[${property}]`] = $event[property]
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
      this.removeContact(id).then(result => {
        if (result) {
          this.onSuccess(this.$t('NOTIFICATION.title_completion'), this.$t('NOTIFICATION.msg_delete_success'))
          this.fetchList(this.params)
        } else {
          this.onSuccess(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.msg_delete_fail'))
        }
      })
    },

    // FETCH
    fetchList (params = {}) {
      this.getList(params)
    }
  }
}
</script>
