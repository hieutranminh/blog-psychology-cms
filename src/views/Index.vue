<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar :collapsed="collapsed" />

    <a-layout>
      <!-- HEADER -->
      <Header :collapsed.sync="collapsed"/>

      <!-- Content -->
      <a-layout-content>
        <router-view/>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script>
import Header from '@/layouts/Header'
import Sidebar from '@/layouts/Sidebar'

export default {
  name: 'Index',

  components: {
    Sidebar,
    Header
  },

  data () {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="scss">
#components-layout-demo-custom-trigger {
  min-height: 100vh;
  .trigger {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
.ant-layout-content {
  padding: 20px 15px;
}
</style>
