<template>
  <div class="container">
    <div class="text-right mb-3">
      <router-link
        :to="{name: 'home.edit'}">
        <a-button
          type="primary"
          class="font-weight-bold"
          icon="edit">
          {{$t('BUTTON.edit')}}
        </a-button>
      </router-link>
    </div>

    <a-card :title="$t('TITLE.manage_banner')" class="mb-4">
      <HomeInfo
          :title="dataHome.banner.title"
          :description="dataHome.banner.desc"
          :btn_text="dataHome.banner.btn_text"
          :btn_link="dataHome.banner.btn_link"
          :phone="dataHome.banner.phone"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_01')" class="mb-4">
      <a-tag slot="extra" :color="dataHome.section_01.display ? '#87d068' : 'orange'" class="font-weight-bold mr-0">
        {{ dataHome.section_01.display ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
      </a-tag>

      <HomeInfo
          :image="dataHome.section_01.thumbnail"
          :title="dataHome.section_01.title"
          :title_align="dataHome.section_01.title_align"
          :description="dataHome.section_01.desc"
          :btn_text="dataHome.section_01.btn_text"
          :btn_link="dataHome.section_01.btn_link"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_02')" class="mb-4">
      <a-tag slot="extra" :color="dataHome.section_02.display ? '#87d068' : 'orange'" class="font-weight-bold mr-0">
        {{ dataHome.section_02.display ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
      </a-tag>

      <HomeInfo
          :image="dataHome.section_02.thumbnail"
          :title="dataHome.section_02.title"
          :title_align="dataHome.section_02.title_align"
          :description="dataHome.section_02.desc"
          :btn_text="dataHome.section_02.btn_text"
          :btn_link="dataHome.section_02.btn_link"/>
    </a-card>

    <div class="text-right mb-3">
      <router-link
          :to="{name: 'home.edit'}">
        <a-button
            type="primary"
            class="font-weight-bold"
            icon="edit">
          {{$t('BUTTON.edit')}}
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
// Store
import store from '@/store'
// Component
import HomeInfo from '@/views/shared/HomeInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',

  components: {
    HomeInfo
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('setting/getSetting').then(_ => {
      next()
    })
  },

  computed: {
    ...mapGetters('setting', ['dataHome'])
  }
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
