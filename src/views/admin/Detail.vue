<template>
  <div class="detail-admin">
    <!-- content -->
    <div class="container">
      <!-- button back -->
      <div class="control-top">
        <a-button
          @click="$router.go(-1)"
          type="primary"
          v-text="$t('BUTTON.return')"/>

        <router-link
          :to="{name: 'admin.edit', params: {id: detail.id}}">
          <a-button
            type="primary"
            v-text="$t('BUTTON.edit')"/>
        </router-link>
      </div>

      <!-- form -->
      <div class="p-4">
        <!-- mail address(login_id) -->
        <div class="d-flex">
          <label class="form-label mb-3">
            {{ $t('ADMIN.mail_address') }}
          </label>

          <p>{{ detail.email }}</p>
        </div>

        <!-- name-->
        <div class="d-flex">
          <label class="form-label mb-3">
            {{ $t('ADMIN.name') }}
          </label>

          <p>{{ detail.name }}</p>
        </div>

        <!-- usage status -->
        <div class="d-flex">
          <label class="form-label mb-3">
            {{ $t('ADMIN.active_status') }}
          </label>

          <p>{{ $t(OBJECT_STATUS_ADMIN[detail.status]) }}</p>
        </div>

        <!-- permission -->
        <div class="d-flex">
          <label class="form-label mb-3">
            {{ $t('ADMIN.role') }}
          </label>

          <p>{{ $t(OBJECT_ROLE[detail.role]) }}</p>
        </div>

        <!-- note -->
        <div class="d-flex">
          <label class="form-label mb-3">
            {{ $t('COMMON.note') }}
          </label>

          <p>{{ detail.note }}</p>
        </div>
      </div>

      <div class="control-bottom d-flex justify-content-end">
        <!-- btn delete admin -->
        <a-popconfirm :title="$t('COMMON.alert_delete_content')"
                      :ok-text="$t('COMMON.tooltip_delete')"
                      :cancel-text="$t('COMMON.tooltip_cancel')"
                      placement="topLeft"
                      @confirm="handleDeleteAdmin">
          <!-- button confirm -->
          <a-button class="ml-2"
                    type="danger"
                    v-text="$t('BUTTON.delete')"/>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
import { mapActions, mapState } from 'vuex'
// Other
import { OBJECT_ROLE, OBJECT_STATUS_ADMIN } from '@/enum/option'
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Detail',

  beforeRouteEnter (to, from, next) {
    store.dispatch('admin/getAdminByID', to.params.id).then(_ => next())
  },

  mixins: [FormMixin],

  computed: {
    ...mapState('admin', ['detail'])
  },

  data () {
    return {
      OBJECT_ROLE,
      OBJECT_STATUS_ADMIN
    }
  },

  methods: {
    ...mapActions('admin', ['deleteAdmin']),

    handleDeleteAdmin () {
      this.deleteAdmin(this.$route.params.id).then(result => {
        if (result) {
          this.onSuccess(this.$t('NOTIFICATION.completion'), this.$t('NOTIFICATION.msg_delete_success'))
          this.$router.push({ name: 'admin' })
        } else {
          this.onError(this.$t('NOTIFICATION.title_fail'), this.$t('NOTIFICATION.title_fail'))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.control-top {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  font-size: 18px;
  color: #000000;
  font-weight: bold;
}
.form-label {
  width: 230px;
  font-weight: bold;
}
.control-bottom {
  padding-top: 20px;
  border-top: 1px solid #e6e6e6;
}
</style>
