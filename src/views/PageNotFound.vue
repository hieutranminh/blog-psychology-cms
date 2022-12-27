<template>
  <div>
    <h1>Page Not Found</h1>
    <router-link :to="{ name: 'login' }"
                 custom
                 v-slot="{ navigate }">
      <a-button @click="navigate"
                type="primary"
                v-text="$t('btn_back_login')"/>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'PageNotFound'
}
</script>

<style scoped>

</style>
