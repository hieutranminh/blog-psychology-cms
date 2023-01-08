<template>
  <div class="admin">
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

        <!--Action-->
        <template slot="action"
                  slot-scope="record">
          <router-link :to="{ name: 'admin.edit', params: {id: record.name === 'admin' ? 'not' : record.id} }"
                       custom
                       v-slot="{ navigate }">
            <a-button @click="navigate"
                      icon="edit"
                      size="small"
                      :disabled="record.name === 'admin'"
                      type="primary" class="mr-2"/>
          </router-link>
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
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Index',

  components: {
    Pagination
  },

  mixins: [FormMixin],

  data () {
    return {
      params: {
        page: 1,
        perPage: 10
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 10
    }
    store.dispatch('admin/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('admin', ['list', 'pagination']),

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
    ...mapActions('admin', ['getList', 'removeContact']),

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
