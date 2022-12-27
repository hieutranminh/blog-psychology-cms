<template>
  <a-layout-sider
    v-if="NAVIGATIONS.length"
    v-model="collapsed"
    :trigger="null"
    width="240">
    <div
      class="logo"
      v-text="$t('COMMON.logo')"/>
    <a-menu
      theme="dark"
      mode="inline"
      :default-open-keys="['team']">
      <template v-for="item in NAVIGATIONS">
        <a-sub-menu v-if="item.dropdownItems"
                    :key="item.id">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span v-text="$t(item.title)"/>
          </span>

          <template v-for="children in item.dropdownItems">
            <router-link :to="{ name: children.routeName }"
                         :key="children.id"
                         class="ant-menu-item"
                         style="padding-left: 48px"
                         active-class="ant-menu-item-selected"
                         v-text="$t(children.title)" />
          </template>
        </a-sub-menu>

        <router-link v-else
                     :key="item.id"
                     :to="{ name: item.routeName }"
                     custom
                     v-slot="{ navigate, isActive }">
          <li @click="navigate"
              role="menuitem"
              class="ant-menu-item"
              style="padding-left: 24px"
              :class="[isActive && 'ant-menu-item-selected']">
            <a-icon :type="item.icon" />
            <span v-text="$t(item.title)"/>
          </li>
        </router-link>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { NAVIGATIONS } from '@/enum/navigations'
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',

  props: {
    collapsed: { type: Boolean, required: true, default: false }
  },

  data () {
    return {
      NAVIGATIONS
    }
  },

  computed: {
    ...mapState('auth', ['profile'])
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    height: auto!important;
    padding: 5px 0;
    font-weight: bold;
  }
</style>
