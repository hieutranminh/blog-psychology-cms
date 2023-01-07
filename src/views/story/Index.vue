<template>
  <div class="container">
    <div class="text-right mb-3">
      <router-link
        :to="{name: 'story.edit'}">
        <a-button
          type="primary"
          class="font-weight-bold"
          icon="edit">
          {{$t('BUTTON.edit')}}
        </a-button>
      </router-link>
    </div>

    <a-card :title="$t('TITLE.manage_section_01')" class="mb-4">
      <HomeInfo
          :image="dataWeStory.section_01.thumbnail"
          :title="dataWeStory.section_01.title"
          :description="dataWeStory.section_01.desc"
          :btn_text="dataWeStory.section_01.btn_text"
          :btn_link="dataWeStory.section_01.btn_link"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_02')" class="mb-4">
      <HomeInfo
          :image="dataWeStory.section_02.thumbnail"
          :title="dataWeStory.section_02.title"
          :description="dataWeStory.section_02.desc"
          :btn_text="dataWeStory.section_02.btn_text"
          :btn_link="dataWeStory.section_02.btn_link"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_02')" class="mb-4">
      <HomeInfo
          :image="dataWeStory.section_03.thumbnail"
          :title="dataWeStory.section_03.title"
          :description="dataWeStory.section_03.desc"
          :btn_text="dataWeStory.section_03.btn_text"
          :btn_link="dataWeStory.section_03.btn_link"/>
    </a-card>

    <div class="text-right mb-3">
      <router-link
          :to="{name: 'story.edit'}">
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
import { mapGetters } from 'vuex'
// Component
import HomeInfo from '@/views/shared/HomeInfo'

export default {
  name: 'Index',

  components: {
    HomeInfo
  },

  data () {
    return {
    }
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('setting/getSetting').then(_ => {
      next()
    })
  },

  computed: {
    ...mapGetters('setting', ['dataWeStory'])
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
