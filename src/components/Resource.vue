<template>
  <section>
    <h1 class="title">{{ $t($route.meta.title) }}</h1>

    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'Resource'
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
  }
</style>
