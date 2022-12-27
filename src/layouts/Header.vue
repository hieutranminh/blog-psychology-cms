<template>
  <a-layout-header class="header">
    <!-- button collapse sidebar -->
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click.prevent="toggleSidebar"/>

    <!-- Change language -->
    <!--<LocaleSwitcher/>-->

    <div class="header__container">
      <!--Breadcrumb-->
      <Breadcrumb/>

      <!--Action-->
      <div class="header__action">
        <a-dropdown :trigger="['click']"
                    placement="bottomRight">
          <div class="profile">
            <p v-text="(profile && profile.name) || 'ADMIN'"
               class="mr-2"/>

            <a-button type="default"
                      icon="user" />
          </div>

          <a-menu slot="overlay">
            <a-menu-item @click="handleLogout"
                         key="0">
              <a-icon type="logout" />{{$t('BUTTON.logout')}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
// Store
import { mapActions, mapState } from 'vuex'
// Component
import Breadcrumb from '@/components/Breadcrumb'
// import LocaleSwitcher from '@/components/LocaleSwitcher'
// Other
import FormMixin from '@/mixins/form.mixin'

export default {
  name: 'Header',

  components: {
    // LocaleSwitcher,
    Breadcrumb
  },

  props: ['collapsed'],

  mixins: [FormMixin],

  data () {
    return {
      visible: false
    }
  },

  computed: {
    // STATE
    ...mapState('auth', ['profile'])
  },

  methods: {
    // ACTION
    ...mapActions('auth', ['userLogout']),

    toggleSidebar () {
      this.$emit('update:collapsed', !this.$props.collapsed)
    },

    handleLogout () {
      this.userLogout().then(result => {
        if (result) {
          this.onSuccess(this.$t('NOTIFICATION.title_completion'), this.$t('NOTIFICATION.msg_logout_success'))
          this.$router.push({ name: 'login' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__container {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 20px;
  }
  &__action {
    display: flex;
    align-items: center;
    margin-left: auto;
    p {
      font-size: 12px;
      margin-bottom: 0;
    }
    .profile {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        button {
          background-color: #001525;
          color: #ffffff;
          border: 1px solid #001525;
        }
      }
    }
  }
}
</style>
