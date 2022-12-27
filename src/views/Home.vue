<template>
  <div class="container">
    <a-card :title="$t('HOME.title_manage_banner')" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="7">
          <div class="images">
            <img src="https://picsum.photos/500/350/?blur" alt="">
          </div>
        </a-col>
        <a-col :span="17">
          <div class="field mb-2">
            <label v-text="$t('COMMON.title')" class="mb-0"/>
            <p v-text="'Distinctio perferendis adipisicing cubilia ultrices sed pellentesque?'"/>
          </div>
          <div class="field mb-2">
            <label v-text="$t('COMMON.description')" class="mb-0"/>
            <p v-text="'necessitatibus rem curae itaque ullamco ante dictumst ea necessitatibus molestiae! Augue hymenaeos? Habitasse cubilia? Nullam turpis'"/>
          </div>
          <div class="field mb-2">
            <div class="mb-1">
              <label v-text="$t('COMMON.txt_button')" class="mb-0 mr-1 font-weight-bold"/>
              <span class="">Get help today</span>
            </div>
            <div class="mb-1">
              <label v-text="$t('COMMON.link_button')" class="mb-0 mr-1 font-weight-bold"/>
              <a href="#" style="word-break: break-all">https://google.com</a>
            </div>
            <div>
              <label v-text="$t('COMMON.phone')" class="mb-0 mr-1 font-weight-bold"/>
              <span>079 456 0287</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card :title="$t('HOME.title_manage_banner')" class="mb-4">
      <p>Card content</p>
    </a-card>
  </div>
</template>

<script>
// Store
// Component

export default {
  name: 'Index',

  components: {
  },

  data () {
    return {
    }
  }

  // beforeRouteEnter (to, from, next) {
  //   const params = {
  //     page: 1,
  //     perPage: 10,
  //     orderBy: 'title'
  //   }
  //   return Promise.allSettled([
  //     store.dispatch('dashboard/getUserStatistic'),
  //     store.dispatch('dashboard/getListOverBudget', params)
  //   ]).then(_ => next())
  //     .catch(_ => next({ name: 'error.404' }))
  // },
}
</script>

<style lang="scss" scoped>
.images {
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1.5;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
