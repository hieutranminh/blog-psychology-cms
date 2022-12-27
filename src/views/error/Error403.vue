<template>
  <div id="error">
    <h2>Error 403</h2>

    <router-link :to="{ name: 'Index' }"
                 custom
                 v-slot="{ navigate }">
      <a-button @click="navigate"
                type="primary"
                v-text="$t('btn_back_dashboard')"/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Error403'
}
</script>

<style lang="scss" scoped>
</style>
