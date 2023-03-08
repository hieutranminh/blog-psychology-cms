<template>
  <div class="tag">
    <div class="container mb-3">
      <Search @filter-changed="onFilterChange($event)"/>
    </div>

    <div class="container">
    <!-- ACTIONS -->
    <div class="text-right mb-3">
      <router-link
          :to="{name: 'tag.create'}">
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
      <!--Action-->
      <template slot="action"
                slot-scope="record">

        <router-link :to="{ name: 'tag.edit', params: {id: record.id} }"
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
          :to="{name: 'tag.create'}">
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
import Pagination from '@/components/Pagination'
import Search from '@/views/tag/Search'
import FormMixin from '@/mixins/form.mixin'

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
        perPage: 10,
        fields: 'id,title',
        'filters[type]': 'tag'
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 10,
      fields: 'id,title',
      'filters[type]': 'tag'
    }
    store.dispatch('tag/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('tag', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('TAG.name'),
          dataIndex: 'title'
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
    ...mapActions('tag', ['getList', 'removeTag']),

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
      this.removeTag(id).then(result => {
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
