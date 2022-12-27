<template>
  <a-breadcrumb v-if="$route.meta.breadcrumb"
                id="breadcrumb"
                separator="/">
    <template v-for="(link, index) in $route.meta.breadcrumb">
      <a-breadcrumb-item :key="index">
        <router-link v-if="link.routeName"
                     :to="{ name: link.routeName }"
                     v-text="$t(link.title)" />
        <span v-else v-text="$t(link.title)"/>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb'
}
</script>

<style lang="scss" scoped>
  #breadcrumb {
    background: white;
    font-size: 14px;
  }
</style>
