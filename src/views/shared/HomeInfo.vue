<template>
  <a-row :gutter="16">
    <a-col v-if="image" :span="7">
      <div class="images">
        <img :src="image" alt="pic" style="border-radius: 4px">
      </div>
    </a-col>
    <a-col :span="17">
      <div v-if="big_title" class="field mb-2">
        <label v-text="$t('COMMON.big_title')+':'" class="mb-0"/>
        <p v-text="big_title"/>
      </div>
      <div v-if="title" class="field mb-2">
        <label v-text="$t('COMMON.title')+':'" class="mb-0"/>
        <p v-text="title"/>
      </div>
      <div v-if="description" class="field mb-2">
        <label v-text="$t('COMMON.description')+':'" class="mb-0"/>
        <p v-text="description"/>
      </div>
      <div class="field mb-2">
        <div v-if="btn_text" class="mb-1">
          <label v-text="$t('COMMON.txt_button')+':'" class="mb-0 mr-1 font-weight-bold"/>
          <span class="btn-link" v-text="btn_text"/>
        </div>
        <div v-if="btn_link" class="mb-1">
          <label v-text="$t('COMMON.link_button')+':'" class="mb-0 mr-1 font-weight-bold"/>
          <a :href="btn_link" style="word-break: break-all" v-text="btn_link"/>
        </div>
        <div v-if="phone">
          <label v-text="$t('COMMON.phone')+':'" class="mb-0 mr-1 font-weight-bold"/>
          <span v-text="phone"/>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'HomeInfo',

  props: {
    image: { type: String, default: '' },
    big_title: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    btn_text: { type: String, default: '' },
    btn_link: { type: String, default: '' },
    phone: { type: String, default: '' }
  }
}
</script>
