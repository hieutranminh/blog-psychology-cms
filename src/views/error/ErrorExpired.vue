<template>
  <div class="token-expired">
    <h1 v-text="$t('AUTH.msg_token_expired')"/>
    <router-link :to="{ name: 'login' }"
                 custom
                 v-slot="{ navigate }">
      <a-button @click="navigate"
                type="primary"
                v-text="$t('BUTTON.back_to_login')"/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ErrorExpired'
}
</script>

<style lang="scss" scoped>
  .token-expired {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
</style>
