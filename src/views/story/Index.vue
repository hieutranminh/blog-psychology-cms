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

    <a-card v-for="(value, key, index) in dataWeStory"
            :key="index"
            :title="$t(`TITLE.manage_${key}`)"
            class="mb-4">
      <a-tag slot="extra" :color="dataWeStory[key].display ? '#87d068' : 'orange'" class="font-weight-bold mr-0">
        {{ dataWeStory[key].display ? $t('COMMON.status_enabled') : $t('COMMON.status_disabled')}}
      </a-tag>

      <HomeInfo
          :image="dataWeStory[key].thumbnail"
          :title="dataWeStory[key].title"
          :description="dataWeStory[key].desc"
          :btn_text="dataWeStory[key].btn_text"
          :btn_link="dataWeStory[key].btn_link"/>
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
