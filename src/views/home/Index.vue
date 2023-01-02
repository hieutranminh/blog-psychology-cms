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
    <a-card :title="$t('HOME.title_manage_banner')" class="mb-4">
      <HomeInfo
        title="We know the science behind your mind. Let's work together."
        description="Manage depression, reduce anxiety, assess ADHD & improve sleep with help from a Psychiatrist or Psychologist."
        btn_text="Get Help Today"
        btn_link="http://google.com.vn"
        phone="+65 69797886"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_01')" class="mb-4">
      <HomeInfo
        title="EXPERIENCED & QUALIFIED"
        description="Our Medical Lead is Dr Victor Kwok. A Stanford-trained Psychiatrist & medical doctor with over 16 years of experience, he was founding Chief of Psychiatry at a general hospital in Singapore."
        btn_text="See our credentials "
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_02')" class="mb-4">
      <HomeInfo
        title="PRIVACY"
        description="We know that privacy is important to you. It’s also part of our core values. Be assured that all psychiatric information stays at Private Space, unlinked to any public information system."
        btn_text="OUR PRIVACY POLICY"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_03')" class="mb-4">
      <HomeInfo
        title="SCIENTIFIC & HOLISTIC"
        description="Together, we will tailor a treatment plan for your psychological or psychiatric condition. We provide therapy, medications and lifestyle strategies like exercise."
        btn_text="TREATMENTS WE PROVIDE"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_04')" class="mb-4">
      <HomeInfo
        big_title="The Care You Deserve"
        title="KINDNESS & RESPECT"
        description="Our team is warm, kind and professional. We strive to deliver care which we expect for our own loved ones.
We endeavour to go the extra mile for every client. We have won many service excellence awards."
        btn_text="BOOK AN APPOINTMENT"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_05')" class="mb-4">
      <HomeInfo
        title="SAFE SPACE"
        description="Reflect, genuinely connect and tell us your story without fear of judgement.
Because we know that we may feel and act the same way if our genetic makeup, childhood experiences and social circumstances are the same as yours."
        btn_text="CONDITIONS WE TREAT"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_06')" class="mb-4">
      <HomeInfo
        title="ONGOING SUPPORT"
        description="It is easy to reach us between sessions. You can call our helpline, email or WhatsApp us. Alternatively, walk-in to see us.
You will also get exclusive access to online videos, audio files and e-guides which you can use between sessions."
        btn_text="BOOK AN APPOINTMENT"
        btn_link="http://google.com.vn"/>
    </a-card>

    <a-card :title="$t('HOME.title_manage_section_07')" class="mb-4">
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
// Component
import HomeInfo from '@/views/home/HomeInfo'

export default {
  name: 'Index',

  components: {
    HomeInfo
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
