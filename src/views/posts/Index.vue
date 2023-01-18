<template>
  <div class="posts">
    <div class="container mb-3">
      <Search @filter-changed="onFilterChange($event)"/>
    </div>

    <div class="container">
    <!-- ACTIONS -->
    <div class="text-right mb-3">
      <router-link
          :to="{name: 'posts.create'}">
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
        <img :src="record.images[0].url | imageEmpty"
             alt="pic"
             loading="lazy"
             style="aspect-ratio: 4/3;">
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
          <a-tag color="orange" class="font-weight-bold mr-0 mb-2">
            {{ OBJECT_POST_TYPE[record.type] }}
          </a-tag>
        </div>
        <div>
          <a-tag :color="record.is_published ? '#87d068' : '#BBBBBB'" class="font-weight-bold mr-0">
            {{ record.is_published ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
          </a-tag>
        </div>
      </template>

      <!--Action-->
      <template slot="action"
                slot-scope="record">
        <a-tooltip placement="topRight">
          <template slot="title">
            <span>{{ `${URL_CLIENT}/${OBJECT_SLUG_POST_TYPE[record.type]}/${record.slug}` }}</span>
          </template>
          <a-button @click.prevent="copyClipboard(`${URL_CLIENT}/${OBJECT_SLUG_POST_TYPE[record.type]}/${record.slug}`)"
                    icon="link"
                    size="small"
                    class="mr-1"/>
        </a-tooltip>

        <router-link :to="{ name: 'posts.edit', params: {id: record.id} }"
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
          :to="{name: 'posts.create'}">
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
import Search from '@/views/posts/Search'
import FormMixin from '@/mixins/form.mixin'
import { OBJECT_POST_TYPE, OBJECT_SLUG_POST_TYPE } from '@/enum/option'

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
        fields: 'id,images,title,description,type,created_at,updated_at,is_published,slug',
        'filters[type]': 'news,research-development,single'
      },
      OBJECT_POST_TYPE,
      OBJECT_SLUG_POST_TYPE,
      URL_CLIENT: process.env.VUE_APP_URL_CLIENT
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      perPage: 10,
      fields: 'id,images,title,description,type,created_at,updated_at,is_published,slug',
      'filters[type]': 'news,research-development,single'
    }
    store.dispatch('posts/getList', params).then(_ => next())
  },

  computed: {
    // State
    ...mapState('posts', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('COMMON.image'),
          scopedSlots: { customRender: 'image' },
          width: '100px'
        },
        {
          title: this.$t('COMMON.title'),
          dataIndex: 'title',
          width: '250px'
        },
        {
          title: this.$t('COMMON.description'),
          dataIndex: 'description'
        },
        {
          title: this.$t('COMMON.date'),
          width: 160,
          scopedSlots: { customRender: 'date' }
        },
        {
          title: this.$t('COMMON.type_post') + '/' + '\r\n' + this.$t('COMMON.status'),
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
    ...mapActions('posts', ['getList', 'removePost']),

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
