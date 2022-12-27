<template>
  <div class="container">
    <!--Action top-->
    <div class="top d-flex justify-content-between border-bottom pb-3">
      <router-link :to="{ name: 'news' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>

      <router-link v-if="roleName !== 'viewer'"
                   :to="{ name: 'news.edit', params: {id: detail.id} }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.edit')"/>
      </router-link>
    </div>

    <!--Detail-->
    <div class="form-container">
      <div class="field mb-4">
        <label v-text="$t('COMMON.title')"/>

        <p v-html="detail.title"/>
      </div>

      <div class="field mb-4">
        <label v-text="$t('NEWS.category')"/>
        <p v-text="$t(OBJECT_CATEGORY_ID[detail.category_id])"/>
      </div>

      <div class="field mb-4">
        <label v-text="$t('COMMON.public_flag')"/>
        <p v-text="$t(OBJECT_PUBLIC_STATUS[detail.status])"/>
      </div>

      <div class="field mb-4">
        <label v-text="$t('COMMON.public_period')"/>
        <p><span>{{ detail.start_datetime | formatDate('YYYY/MM/DD HH:mm') }}</span> ~ <span>{{ detail.end_datetime | formatDate('YYYY/MM/DD HH:mm') }}</span></p>
      </div>

      <div class="field mb-4">
        <label v-text="$t('NEWS.transition')"/>
        <p v-text="$t(OBJECT_DESTINATION[detail.destination_type])"/>
      </div>

      <div v-if="detail.destination_type === 1"
           class="field">
        <label v-text="$t('NEWS.content')"/>
        <p v-html="handleSanitizeHtml(detail.description)"/>
      </div>

      <div v-else
           class="field">
        <label v-text="$t('COMMON.transition_url')"/>
        <p v-html="detail.redirect_url"/>
      </div>
    </div>

    <!--Action bottom-->
    <div class="bottom d-flex justify-content-between border-top pt-3 text-center">
      <router-link :to="{ name: 'news' }"
                   custom
                   v-slot="{ navigate }">
        <a-button @click="navigate"
                  type="primary"
                  v-text="$t('BUTTON.return')"/>
      </router-link>

      <a-popconfirm v-if="roleName !== 'viewer'"
                    :title="$t('COMMON.alert_delete_content')"
                    :ok-text="$t('COMMON.tooltip_delete')"
                    :cancel-text="$t('COMMON.tooltip_cancel')"
                    placement="topLeft"
                    @confirm="deleteRecord">
        <a-button type="danger"
                  v-text="$t('BUTTON.delete')"/>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapGetters, mapState } from 'vuex'
// Other
import { OBJECT_CATEGORY_ID, OBJECT_DESTINATION, OBJECT_PUBLIC_STATUS } from '@/enum/option'
import { handleSanitizeHtml } from '@/utils/helpers'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Detail',

  mixins: [FormMixin],

  data () {
    return {
      OBJECT_PUBLIC_STATUS,
      OBJECT_CATEGORY_ID,
      OBJECT_DESTINATION
    }
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('news/getNewsByID', to.params.id).then(_ => next())
  },

  computed: {
    // State
    ...mapState('news', ['detail']),
    // Getter
    ...mapGetters('auth', ['roleName'])
  },

  methods: {
    ...mapActions('news', ['removeNews']),

    handleSanitizeHtml,

    deleteRecord () {
      this.removeNews(this.detail.id).then(result => {
        if (result) {
          this.onSuccess(this.$t('NOTIFICATION.completion'), this.$t('NOTIFICATION.msg_delete_success'))
          this.$router.push({ name: 'news' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .field {
    display: flex;
    align-items: flex-start;
    & > label {
      flex-shrink: 0;
      margin: 0;
      font-weight: bold;
      min-width: 150px;
    }
    p {
      flex: 1;
      margin-bottom: 0;
    }
    img {
      object-fit: cover;
      max-height: 250px;
      height: 100%;
    }
    ul {
      li {
        list-style: none;
      }
    }
  }
</style>
