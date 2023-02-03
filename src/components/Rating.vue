<template>
  <div class="star">
    <div
      class="empty-stars"
      style="" />
    <div
      class="full-stars"
      :style="{ width: (star * 100) / 5 + '%' }" />
  </div>
</template>

<script>
export default {
  name: 'Rating',

  props: {
    star: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .star {
    display: inline-block;
    position: relative;
    .empty-stars {
      color: #999999;
      &:before {
        content: "★★★★★";
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
    .full-stars {
      position: absolute;
      top: 0;
      left: 0;
      color: #f0ad4e;
      white-space: nowrap;
      overflow: hidden;
      &:before {
        content: "★★★★★";
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
  }
</style>
