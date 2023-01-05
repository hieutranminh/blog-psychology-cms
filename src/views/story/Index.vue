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
        title="EXPERIENCED & QUALIFIED"
        description="Our Medical Lead is Dr Victor Kwok. A Stanford-trained Psychiatrist & medical doctor with over 16 years of experience, he was founding Chief of Psychiatry at a general hospital in Singapore."
        btn_text="See our credentials "
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_02')" class="mb-4">
      <HomeInfo
        title="PRIVACY"
        description="We know that privacy is important to you. It’s also part of our core values. Be assured that all psychiatric information stays at Private Space, unlinked to any public information system."
        btn_text="OUR PRIVACY POLICY"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('TITLE.manage_section_03')" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card>
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <a-card-meta title="Card title" description="This is the description"/>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <a-card-meta title="Card title" description="This is the description"/>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <a-card-meta title="Card title" description="This is the description"/>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
// Store
import store from '@/store'
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
    const params = {
      'filters[key]': 'global_links'
    }
    store.dispatch('setting/getSetting', params).then(_ => {
      next()
    })
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
